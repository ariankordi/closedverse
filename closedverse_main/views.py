from django.http import HttpResponse, HttpResponseNotFound, HttpResponseBadRequest,  HttpResponseServerError, HttpResponseForbidden, JsonResponse
from django.template import loader
from django.shortcuts import render, redirect, get_object_or_404
from django.http import Http404
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from django.core.validators import EmailValidator
from django.core.exceptions import ValidationError
from django.db.models import Q, Count, Exists, OuterRef
from .models import *
from .util import *
from .serializers import CommunitySerializer
from closedverse import settings
import re
from django.urls import reverse
from random import getrandbits
from random import choice
from json import dumps, loads
import sys, traceback
from subprocess import Popen, PIPE
from datetime import datetime
import django.utils.dateformat
from binascii import hexlify
from os import urandom

#from silk.profiling.profiler import silk_profile

def json_response(msg='', code=0, httperr=400):
	thing = {
	# success would be false, but 0 is faster I think (Miiverse used 0 because Perl doesn't have bools)
	# it also should be removed
	'success': 0,
	'errors': [
			{
			# We should drop this Miiverse formatting at some point
			'message': msg,
			'error_code': code,
			}
		],
	'code': httperr,
	}
	return JsonResponse(thing, safe=False, status=httperr)

def community_list(request):
	"""Lists communities / main page."""
	if 'json' in request.META.get('HTTP_ACCEPT', ''):
		cs = CommunitySerializer
		response = {
			'general': cs.many(Community.objects.filter(type=0).order_by('-created')),
			'game': cs.many(Community.objects.filter(type=1).order_by('-created')),
			'special': cs.many(Community.objects.filter(type=2).order_by('-created'))
		}
		return JsonResponse(response)
	obj = Community.objects
	if request.user.is_authenticated:
		classes = ['guest-top']
		favorites = request.user.community_favorites()
	else:
		classes = []
		favorites = None
	return render(request, 'closedverse_main/community_list.html', {
		'title': 'Communities',
		'classes': classes,
		'general': obj.filter(type=0).order_by('-created')[0:8],
		'game': obj.filter(type=1).order_by('-created')[0:8],
		'special': obj.filter(type=2).order_by('-created')[0:8],
		'feature': obj.filter(is_feature=True).order_by('-created'),
		'favorites': favorites,
		'settings': settings,
		'ogdata': {
				'title': 'Community List',
				'description': "Openverse is a social network: designed by PF2M, programmed by Arian Kordi. With Miiverse DNA, style and familiar assets such as Miiverse's interface and Miis, you're sure to have fun here!",
				'date': 'None',
				'image': request.build_absolute_uri(settings.STATIC_URL + 'img/favicon.png'),
			},
	})
def community_all(request):
	"""All communities, with pagination"""
	try:
		offset = int(request.GET.get('offset', '0'))
	except ValueError:
		offset = 0
	if request.user.is_authenticated:
		classes = ['guest-top']
	else:
		classes = []
	gen = Community.get_all(0, offset)
	game = Community.get_all(1, offset)
	special = Community.get_all(2, offset)
	if gen.count() > 11 or game.count() > 11 or special.count() > 11:
		has_next = True
	else:
		has_next = False
	if gen.count() < 1 or game.count() < 1:
		has_back = True
	else:
		has_back = False
	back = offset - 12
	next = offset + 12
	return render(request, 'closedverse_main/community_all.html', {
		'title': 'All Communities',
		'classes': classes,
		'general': gen,
		'game': game,
		'special': special,
		'has_next': has_next,
		'next': next,
	})

def community_search(request):
	"""Community searching"""
	query = request.GET.get('query')
	if not query or len(query) < 2:
		raise Http404()
	if request.GET.get('offset'):
		communities = Community.search(query, 20, int(request.GET['offset']), request)
	else:
		communities = Community.search(query, 20, 0, request)
	if communities.count() > 19:
		if request.GET.get('offset'):
			next_offset = int(request.GET['offset']) + 20
		else:
			next_offset = 20
	else:
		next_offset = None
	return render(request, 'closedverse_main/community-search.html', {
		'classes': ['search'],
		'query': query,
		'communities': communities,
		'next': next_offset,
	})

@login_required
def community_favorites(request):
	"""Favorite communities, can be used for self by default or other users"""
	user = request.user
	has_other = False
	if request.GET.get('u'):
		user = get_object_or_404(User, username=request.GET['u'])
		has_other = True
		profile = user.profile()
		profile.setup(request)
		communities = user.community_favorites(True)
	else:
		communities = request.user.community_favorites(True)
		profile = user.profile()
		profile.setup(request)
	return render(request, 'closedverse_main/community_favorites.html', {
		'title': 'Favorite communities',
		'favorites': communities,
		'user': user,
		'profile': profile,
		'other': has_other,
	})

def login_page(request):
	"""Login page! using our own user objects."""
	# Redirect the user to / if they're logged in, forcing them to log out
	if request.user.is_authenticated:
		return redirect('/')
	if request.method == 'POST':
		# If we don't have all of the POST parameters we want..
		if not (request.POST['username'] and request.POST['password']): 
		# then return that.
			return HttpResponseBadRequest("You didn't fill in all of the fields.")
		# Now let's authenticate.
		# Wait, first check if the user exists. Remove spaces from the username, because some people do that.
		# Hold up, first we need to check proxe.
		# Never mind
		"""
		if settings.CLOSEDVERSE_PROD:
			if iphub(request.META['REMOTE_ADDR']):
				spamuser = True
				if settings.DISALLOW_PROXY:
					# This was for me, a server error will email admins of course.
					raise ValueError
		"""
		user = User.objects.authenticate(username=request.POST['username'], password=request.POST['password'])
		# None = doesn't exist, False = invalid password.
		if user is None:
			return HttpResponseNotFound("The user doesn't exist.")
		else:
			# Todo: I might want to do some things relating to making models take care of object stuff like this instead of the view, it's totally messed up now.
			successful = False if user[1] is False or not user[0].is_active() else True
			LoginAttempt.objects.create(user=user[0], success=successful, addr=request.META.get('REMOTE_ADDR'))
			if user[1] is False:
				return HttpResponse("Invalid password.", status=401)
			elif user[1] == 2:
				return HttpResponse("This account's password needs to be reset. Contact an admin or reset by email.", status=400)
			elif not user[0].is_active():
				return HttpResponseForbidden("This account was disabled.")
		request.session['passwd'] = user[0].password
		login(request, user[0])
		
		# Then, let's get the referrer and either return that or the root.
		# Actually, let's not for now.
		#if request.META['HTTP_REFERER'] and "login" not in request.META['HTTP_REFERER'] and request.META['HTTP_HOST'] in request.META['HTTP_REFERER']:
		#	location = request.META['HTTP_REFERER']
		#else:
		location = '/'
		if request.GET.get('next'):
			location = request.GET['next']
		return HttpResponse(location)
	else:
		return render(request, 'closedverse_main/login_page.html', {
			'title': 'Log in',
			#'classes': ['no-login-btn']
		})
def signup_page(request):
	"""Signup page, lots of checks here"""
	# Redirect the user to / if they're logged in, forcing them to log out
	if request.user.is_authenticated:
		return redirect('/')
	if request.method == 'POST':
		if settings.RECAPTCHA_PUBLIC_KEY:
			if not recaptcha_verify(request, settings.RECAPTCHA_PRIVATE_KEY):
				return HttpResponse("The reCAPTCHA validation has failed.", status=402)
		if not (request.POST.get('username') and request.POST.get('password') and request.POST.get('password_again')):
			return HttpResponseBadRequest("You didn't fill in all of the required fields.")
		if not re.compile(r'^[A-Za-z0-9-._]{1,32}$').match(request.POST['username']) or not re.compile(r'[A-Za-z0-9]').match(request.POST['username']):
			return HttpResponseBadRequest("Your username either contains invalid characters or is too long (only letters + numbers, dashes, dots and underscores are allowed")
		if settings.CLOSEDVERSE_PROD:
			for keyword in ['admin', 'admln', 'adrnin', 'admn', ]:
				if keyword in request.POST['username'].lower():
					return HttpResponseForbidden("You aren't funny. Please use a funny name.")
		conflicting_user = User.objects.filter(Q(username__iexact=request.POST['username']) | Q(username__iexact=request.POST['username'].replace(' ', '')))
		if conflicting_user:
			return HttpResponseBadRequest("A user with that username already exists.")
		if not request.POST['password'] == request.POST['password_again']:
			return HttpResponseBadRequest("Your passwords don't match.")
		if not (request.POST['nickname'] or request.POST['origin_id']):
			return HttpResponseBadRequest("You didn't fill in an NNID, so you need a nickname.")
		if request.POST['nickname'] and len(request.POST['nickname']) > 32:
			return HttpResponseBadRequest("Your nickname is either too long or too short (1-32 characters)")
		if request.POST.get('origin_id') and (len(request.POST['origin_id']) > 16 or len(request.POST['origin_id']) < 6):
			return HttpResponseBadRequest("The NNID provided is either too short or too long.")
		if request.POST.get('email'):
			if User.email_in_use(request.POST['email']):
				return HttpResponseBadRequest("That email address is already in use, that can't happen.")
			try:
				EmailValidator()(value=request.POST['email'])
			except ValidationError:
				return HttpResponseBadRequest("Your e-mail address is invalid. Input an e-mail address, or input nothing.")
		check_others = Profile.objects.filter(user__addr=request.META['REMOTE_ADDR'], let_freedom=False).exists()
		if check_others:
			return HttpResponseBadRequest("Unfortunately, you cannot make any accounts at this time. This restriction was set for a reason, please contact the administration. Please don't bypass this, as if you do, you are just being ignorant. If you have not made any accounts, contact the administration and this restriction will be removed for you.")
		if request.POST.get('origin_id'):
			if User.nnid_in_use(request.POST['origin_id']):
				return HttpResponseBadRequest("That Nintendo Network ID is already in use, that would cause confusion.")
			mii = get_mii(request.POST['origin_id'])
			if not mii:
				return HttpResponseBadRequest("The NNID provided doesn't exist.")
			nick = mii[1]
			gravatar = False
		else:
			nick = request.POST['nickname']
			mii = None
			gravatar = True
		make = User.objects.closed_create_user(username=request.POST['username'], password=request.POST['password'], email=request.POST.get('email'), addr=request.META['REMOTE_ADDR'], nick=nick, nn=mii, gravatar=gravatar)
		LoginAttempt.objects.create(user=make, success=True, addr=request.META.get('REMOTE_ADDR'))
		login(request, make)
		request.session['passwd'] = make.password
		return HttpResponse("/")
	else:
		if not settings.RECAPTCHA_PUBLIC_KEY:
			settings.RECAPTCHA_PUBLIC_KEY = None
		return render(request, 'closedverse_main/signup_page.html', {
			'title': 'Sign up',
			'recaptcha': settings.RECAPTCHA_PUBLIC_KEY,
			#'classes': ['no-login-btn'],
		})
def forgot_passwd(request):
	"""Password email page / post endpoint."""
	if request.method == 'POST' and request.POST.get('email'):
		try:
			user = User.objects.get(email=request.POST['email'])
		except (User.DoesNotExist, ValueError):
			return HttpResponseNotFound("There isn't a user with that email address.")
		try:
			user.password_reset_email(request)
		except:
			return HttpResponseBadRequest("There was an error submitting that.")
		return HttpResponse("Success! Check your emails, it should have been sent from \"{0}\".".format(settings.DEFAULT_FROM_EMAIL))
	if request.GET.get('token'):
		user = User.get_from_passwd(request.GET['token'])
		if not user:
			raise Http404()
		if request.method == 'POST':
			if not request.POST['password'] == request.POST['password_again']:
				return HttpResponseBadRequest("Your passwords don't match.")
			user.set_password(request.POST['password'])
			user.save()
			return HttpResponse("Success! Now you can log in with your new password!")
		return render(request, 'closedverse_main/forgot_reset.html', {
			'title': 'Reset password for ' + user.username,
			#'classes': ['no-login-btn'],
		})
	return render(request, 'closedverse_main/forgot_page.html', {
		'title': 'Reset password',
		#'classes': ['no-login-btn'],
	})

def logout_page(request):
	"""Password email page / post endpoint."""
	logout(request)
	if request.GET.get('next'):
		return redirect(request.GET['next'])
	return redirect('/')

def user_view(request, username):
	"""The user view page, has recent posts/yeahs."""
	user = get_object_or_404(User, username__iexact=username)
	if user.is_me(request):
		title = 'My profile'
	else:
		if request.user.is_authenticated and not user.can_view(request.user):
			raise Http404()
		title = '{0}\'s profile'.format(user.nickname)
	profile = user.profile()
	profile.setup(request)
	if request.user.is_authenticated:
		profile.can_friend = profile.can_friend(request.user)
	if request.method == 'POST' and request.user.is_authenticated:
		user = request.user
		profile	= user.profile()
		profile.setup(request)
		if profile.cannot_edit:
			nick_old = user.nickname
			avatar_old = user.avatar
		if request.POST.get('screen_name') is None or len(request.POST['screen_name']) > 32 and not request.user.is_staff():
			return json_response('Nickname is too long or too short (length '+str(len(request.POST.get('screen_name')))+', max 32)')
		if len(request.POST.get('profile_comment')) > 2200:
			return json_response('Profile comment is too long (length '+str(len(request.POST.get('profile_comment')))+', max 2200)')
		if len(request.POST.get('country')) > 255:
			return json_response('Region is too long (length '+str(len(request.POST.get('country')))+', max 255)')
		if len(request.POST.get('website')) > 255:
			return json_response('Web URL is too long (length '+str(len(request.POST.get('website')))+', max 255)')
		# Kinda unneeded but gdsjkgdfsg
		if request.POST.get('website') == 'Web URL' or request.POST.get('country') == 'Region' or request.POST.get('external') == 'DiscordTag':
			return json_response("I'm laughing right now.")
		
		if len(request.POST.get('avatar')) > 255:
			return json_response('Avatar is too long (length '+str(len(request.POST.get('avatar')))+', max 255)')
		if request.POST.get('email'):
			if User.email_in_use(request.POST['email'], request):
				return HttpResponseBadRequest("That email address is already in use, that can't happen.")
			try:
				EmailValidator()(value=request.POST['email'])
			except ValidationError:
				return json_response("Your e-mail address is invalid. Input an e-mail address, or input nothing.")
		if User.nnid_in_use(request.POST.get('origin_id'), request):
			return json_response("That Nintendo Network ID is already in use, that would cause confusion.")
		if user.has_plain_avatar():
			user.avatar = request.POST.get('avatar') or ''
		if request.POST.get('avatar') == '1':
			if not request.POST.get('origin_id'):
				user.has_mh = False
				profile.origin_id = None
				profile.origin_info = None
				user.avatar =  ('s' if getrandbits(1) else '')
			user.avatar = get_gravatar(user.email) or ('s' if getrandbits(1) else '')
			user.has_mh = False
		elif request.POST.get('avatar') == '0':
			if not request.POST.get('origin_id'):
				user.has_mh = False
				profile.origin_id = None
				profile.origin_info = None
				user.avatar =  ('s' if getrandbits(1) else '')
			else:
				user.has_mh = True
				getmii = get_mii(request.POST.get('origin_id'))
				if not getmii:
					return json_response('NNID not found')
				user.avatar = getmii[0]
				profile.origin_id = getmii[2]
				profile.origin_info = dumps(getmii)
		if not request.POST.get('color'):
			user.color = None
		else:
			try:
				validate_color(request.POST['color'])
			except ValidationError:
				return json_response("Invalid color")
			else:
				if request.POST['color'] == '#000000' or request.POST['color'] == '#ffffff':
					user.color = None
				else:
					user.color = request.POST['color']
		if not request.POST.get('email'):
			user.email = None
		else:
			user.email = request.POST.get('email')
		profile.country = request.POST.get('country')
		website = request.POST.get('website')
		if ' ' in website or not '.' in website:
			profile.weblink = ''
		else:
			profile.weblink = website
		profile.comment = request.POST.get('profile_comment')
		profile.external = request.POST.get('external')
		profile.relationship_visibility = (request.POST.get('relationship_visibility') or 0)
		profile.id_visibility = (request.POST.get('id_visibility') or 0)
		profile.yeahs_visibility = (request.POST.get('yeahs_visibility') or 0)
		profile.pronoun_is = (request.POST.get('pronoun_dot_is') or 0)
		profile.comments_visibility = (request.POST.get('comments_visibility') or 0)
		profile.let_friendrequest = (request.POST.get('let_friendrequest') or 0)
		user.nickname = filterchars(request.POST.get('screen_name'))
		# Maybe todo?: Replace all "not .. == .." with ".. != .." etc
		# If the user cannot edit and their nickname/avatar is different than what they had, don't let it happen.
		if profile.cannot_edit and (user.nickname != nick_old or user.avatar != avatar_old):
			return json_response("Not allowed.")
		if not user.email:
			profile.email_login = 1
		else:
			profile.email_login = (request.POST.get('email_login') or 1)
		profile.save()
		user.save()
		return HttpResponse()
	posts = user.get_posts(3, 0, request)
	yeahed = user.get_yeahed(0, 3)
	for yeah in yeahed:
		if user.is_me(request):
			yeah.post.yeah_given = True
		yeah.post.setup(request)
	fr = None
	if request.user.is_authenticated:
		user.friend_state = user.friend_state(request.user)
		if user.friend_state == 2:
			fr = user.get_fr(request.user).first()

	return render(request, 'closedverse_main/user_view.html', {
		'title': title,
		'classes': ['profile-top'],
		'user': user,
		'profile': profile,
		'posts': posts,
		'yeahed': yeahed,
		'fr': fr,
		'ogdata': {
				'title': title,
				# Todo: fix all concatenations like these and make them into strings with format() since that's cleaner and better
				'description': profile.comment,
				'date': str(user.created),
				'image': user.do_avatar(),
			},
	})

def user_posts(request, username):
	"""User posts page"""
	user = get_object_or_404(User, username__iexact=username)
	if user.is_me(request):
		title = 'My posts'
	else:
		if request.user.is_authenticated and not user.can_view(request.user):
			raise Http404()
		title = '{0}\'s posts'.format(user.nickname)
	profile = user.profile()
	profile.setup(request)
	
	if request.GET.get('offset'):
		posts = user.get_posts(50, int(request.GET['offset']), request)
	else:
		posts = user.get_posts(50, 0, request)
	if posts.count() > 49:
		if request.GET.get('offset'):
			next_offset = int(request.GET['offset']) + 50
		else:
			next_offset = 50
	else:
		next_offset = None

	if request.META.get('HTTP_X_AUTOPAGERIZE'):
			return render(request, 'closedverse_main/elements/u-post-list.html', {
			'posts': posts,
			'next': next_offset,
		})
	else:
		return render(request, 'closedverse_main/user_posts.html', {
			'user': user,
			'title': title,
			'posts': posts,
			'profile': profile,
			'next': next_offset,
			# Copied from the above, if you change the last ogdata occurrence then change this one
			'ogdata': {
				'title': title,
				'description': profile.comment,
				'date': str(user.created),
			},
		})
def user_yeahs(request, username):
	"""User's Yeahs page"""
	user = get_object_or_404(User, username__iexact=username)
	if user.is_me(request):
		title = 'My yeahs'
	else:
		if request.user.is_authenticated and not user.can_view(request.user):
			raise Http404()
		title = '{0}\'s yeahs'.format(user.nickname)
	profile = user.profile()
	profile.setup(request)
	
	if not profile.yeahs_visible:
		raise Http404()
	
	if request.GET.get('offset'):
		yeahs = user.get_yeahed(2, 20, int(request.GET['offset']))
	else:
		yeahs = user.get_yeahed(2, 20, 0)
	if yeahs.count() > 19:
		if request.GET.get('offset'):
			next_offset = int(request.GET['offset']) + 20
		else:
			next_offset = 20
	else:
		next_offset = None
	posts = []
	for yeah in yeahs:
		if yeah.type == 1:
			if user.is_me(request):
				yeah.comment.yeah_given = True
			posts.append(yeah.comment)
		else:
			if user.is_me(request):
				yeah.post.yeah_given = True
			posts.append(yeah.post)
	for post in posts:
		post.setup(request)
	if request.META.get('HTTP_X_AUTOPAGERIZE'):
			return render(request, 'closedverse_main/elements/u-post-list.html', {
			'posts': posts,
			'next': next_offset,
		})
	else:
		return render(request, 'closedverse_main/user_yeahs.html', {
			'user': user,
			'title': title,
			'posts': posts,
			'profile': profile,
			'next': next_offset,
		})
def user_comments(request, username):
	"""User's comments page"""
	user = get_object_or_404(User, username__iexact=username)
	if user.is_me(request):
		title = 'My comments'
	else:
		if request.user.is_authenticated and not user.can_view(request.user):
			raise Http404()
		title = '{0}\'s comments'.format(user.nickname)
	profile = user.profile()
	profile.setup(request)
	
	if not profile.comments_visible:
		raise Http404()
	
	if request.GET.get('offset'):
		posts = user.get_comments(50, int(request.GET['offset']), request)
	else:
		posts = user.get_comments(50, 0, request)
	if posts.count() > 19:
		if request.GET.get('offset'):
			next_offset = int(request.GET['offset']) + 20
		else:
			next_offset = 20
	else:
		next_offset = None
	if request.META.get('HTTP_X_AUTOPAGERIZE'):
			return render(request, 'closedverse_main/elements/u-post-list.html', {
			'posts': posts,
			'next': next_offset,
		})
	else:
		return render(request, 'closedverse_main/user_comments.html', {
			'user': user,
			'title': title,
			'posts': posts,
			'profile': profile,
			'next': next_offset,
		})

def user_following(request, username):
	"""User following page"""
	user = get_object_or_404(User, username__iexact=username)
	if user.is_me(request):
		title = 'My follows'
	else:
		if request.user.is_authenticated and not user.can_view(request.user):
			raise Http404()
		title = '{0}\'s follows'.format(user.nickname)
	profile = user.profile()
	profile.setup(request)

	if request.GET.get('offset'):
		following_list = user.get_following(20, int(request.GET['offset']))
	else:
		following_list = user.get_following(20, 0)
	if following_list.count() > 19:
		if request.GET.get('offset'):
			next_offset = int(request.GET['offset']) + 20
		else:
			next_offset = 20
	else:
		next_offset = None
	following = []
	for follow in following_list:
		following.append(follow.target)
	if request.META.get('HTTP_X_AUTOPAGERIZE'):
			for user in following:
				user.is_following = user.is_following(request.user)
			return render(request, 'closedverse_main/elements/profile-user-list.html', {
			'users': following,
			'request': request,
			'next': next_offset,
		})
	else:
		return render(request, 'closedverse_main/user_following.html', {
			'user': user,
			'title': title,
			'following': following,
			'profile': profile,
			'next': next_offset,
		})
def user_followers(request, username):
	"""User followers page"""
	user = get_object_or_404(User, username__iexact=username)
	if user.is_me(request):
		title = 'My followers'
	else:
		if request.user.is_authenticated and not user.can_view(request.user):
			raise Http404()
		title = '{0}\'s followers'.format(user.nickname)
	profile = user.profile()
	profile.setup(request)

	if request.GET.get('offset'):
		followers_list = user.get_followers(20, int(request.GET['offset']))
	else:
		followers_list = user.get_followers(20, 0)
	if followers_list.count() > 19:
		if request.GET.get('offset'):
			next_offset = int(request.GET['offset']) + 20
		else:
			next_offset = 20
	else:
		next_offset = None
	followers = []
	for follow in followers_list:
		followers.append(follow.source)
	if request.META.get('HTTP_X_AUTOPAGERIZE'):
			for user in followers:
				user.is_following = user.is_following(request.user)
			return render(request, 'closedverse_main/elements/profile-user-list.html', {
			'users': followers,
			'request': request,
			'next': next_offset,
		})
	else:
		return render(request, 'closedverse_main/user_followers.html', {
			'user': user,
			'title': title,
			'followers': followers,
			'profile': profile,
			'next': next_offset,
		})

def user_friends(request, username):
	"""User friends list page - uses some special math I think"""
	user = get_object_or_404(User, username__iexact=username)
	if user.is_me(request):
		title = 'My friends'
	else:
		if request.user.is_authenticated and not user.can_view(request.user):
			raise Http404()
		title = '{0}\'s friends'.format(user.nickname)
	profile = user.profile()
	profile.setup(request)

	if request.GET.get('offset'):
		friends_list = Friendship.get_friendships(user, 20, int(request.GET['offset']))
	else:
		friends_list = Friendship.get_friendships(user, 20, 0)
	if friends_list.count() > 19:
		if request.GET.get('offset'):
			next_offset = int(request.GET['offset']) + 20
		else:
			next_offset = 20
	else:
		next_offset = None
	friends = []
	for friend in friends_list:
		friends.append(friend.other(user))
	del(friends_list)
	if request.META.get('HTTP_X_AUTOPAGERIZE'):
			for user in friends:
				user.is_following = user.is_following(request.user)
			return render(request, 'closedverse_main/elements/profile-user-list.html', {
			'users': friends,
			'request': request,
			'next': next_offset,
		})
	else:
		return render(request, 'closedverse_main/user_friends.html', {
			'user': user,
			'title': title,
			'friends': friends,
			'profile': profile,
			'next': next_offset,
		})

@login_required
def profile_settings(request):
	"""Profile settings, POSTs to user_view"""
	profile = request.user.profile()
	profile.setup(request)
	user = request.user
	user.mh = user.mh()
	return render(request, 'closedverse_main/profile-settings.html', {
		'title': 'Profile settings',
		'user': user,
		'profile': profile,
	})

def special_community_tag(request, tag):
	"""For community URIs such as /communities/changelog"""
	communities = get_object_or_404(Community, tags=tag)
	return redirect(reverse('main:community-view', args=[communities.id]))

#@silk_profile(name='Community view')
def community_view(request, community):
	"""View an individual community"""
	communities = get_object_or_404(Community, id=community)
	communities.setup(request)
	if not communities.clickable():
		return HttpResponseForbidden()
	if request.GET.get('offset'):
		posts = communities.get_posts(50, int(request.GET['offset']), request)
	else:
		posts = communities.get_posts(50, 0, request)
	if posts.count() > 49:
		if request.GET.get('offset'):
			next_offset = int(request.GET['offset']) + 50
		else:
			next_offset = 50
	else:
		next_offset = None

	if request.META.get('HTTP_X_AUTOPAGERIZE'):
			return render(request, 'closedverse_main/elements/post-list.html', {
			'posts': posts,
			'next': next_offset,
		})
	else:
		return render(request, 'closedverse_main/community_view.html', {
			'title': communities.name,
			'classes': ['community-top'],
			'community': communities,
			'posts': posts,
			'next': next_offset,
			'ogdata': {
				'title': communities.name,
				'description': communities.description,
				'date': str(communities.created),
				'image': communities.icon,
			},
		})

@require_http_methods(['POST'])
@login_required
def community_favorite_create(request, community):
	the_community = get_object_or_404(Community, id=community)
	if not the_community.type == 3:
		the_community.favorite_add(request)
	return HttpResponse()
@require_http_methods(['POST'])
@login_required
def community_favorite_rm(request, community):
	the_community = get_object_or_404(Community, id=community)
	the_community.favorite_rm(request)
	return HttpResponse()

@require_http_methods(['POST'])
@login_required
def post_create(request, community):
	if request.method == 'POST':
		# Wake
		request.user.wake(request.META['REMOTE_ADDR'])
		# Required
		if not (request.POST.get('community')):
			return HttpResponseBadRequest()
		try:
			community = Community.objects.get(id=community, unique_id=request.POST['community'])
		except (Community.DoesNotExist, ValueError):
			return HttpResponseNotFound()
		# Method of Community
		new_post = community.create_post(request)
		if not new_post:
			return HttpResponseBadRequest()
		if isinstance(new_post, int):
			# If post limit 
			if new_post == 8:
				# then do meme
				return json_response("You have already exceeded the number of posts that you can contribute in a single day. Please try again tomorrow.", 1215919)
			return json_response({
			1: "Your post is too long ("+str(len(request.POST['body']))+" characters, 2200 max).",
			2: "The image you've uploaded is invalid.",
			3: "You're making posts too fast, wait a few seconds and try again.",
			4: "Apparently, you're not allowed to post here.",
			5: "Uh-oh, that URL wasn't valid..",
			6: "Not allowed.",
			7: "Please don't spam.",
			}.get(new_post))
		# Render correctly whether we're posting to Activity Feed
		if community.is_activity():
			return render(request, 'closedverse_main/elements/community_post.html', { 
			'post': new_post,
			'with_community_container': True,
			'type': 2,
			})
		else:
			return render(request, 'closedverse_main/elements/community_post.html', { 'post': new_post })
	else:
		raise Http404()

def post_view(request, post):
	has_yeah = Yeah.objects.filter(post=OuterRef('id'), by=request.user.id)
	try:
		post = Post.objects.annotate(num_yeahs=Count('yeah', distinct=True), num_comments=Count('comment', distinct=True), yeah_given=Exists(has_yeah, distinct=True)).get(id=post)
	except Post.DoesNotExist:
		raise Http404()
	post.setup(request)
	if post.poll:
		post.poll.setup(request.user)
	if request.user.is_authenticated:
		post.can_rm = post.can_rm(request)
		post.is_favorite = post.is_favorite(request.user)
		post.can_comment = post.can_comment(request)
	if post.is_mine:
		title = 'Your post'
	else:
		title = '{0}\'s post'.format(post.creator.nickname)
	all_comment_count = post.number_comments()
	if all_comment_count > 20:
		comments = post.get_comments(request, None, all_comment_count - 20)
	else:
		comments = post.get_comments(request)
	return render(request, 'closedverse_main/post-view.html', {
		'title': title,
		#CSS might not be that friendly with this / 'classes': ['post-permlink'],
		'post': post,
		'yeahs': post.get_yeahs(request),
		'comments': comments,
		'all_comment_count': all_comment_count,
		'ogdata': {
				'title': title,
				'description': post.trun(),
				'date': str(post.created),
				'image': post.creator.do_avatar(post.feeling),
			},
	})
@require_http_methods(['POST'])
@login_required
def post_add_yeah(request, post):
	the_post = get_object_or_404(Post, id=post)
	if the_post.give_yeah(request):
		# Give the notification!
		Notification.give_notification(request.user, 0, the_post.creator, the_post)
	return HttpResponse()
@require_http_methods(['POST'])
@login_required
def post_delete_yeah(request, post):
	the_post = get_object_or_404(Post, id=post)
	the_post.remove_yeah(request)
	return HttpResponse()
@require_http_methods(['POST'])
@login_required
def post_change(request, post):
	the_post = get_object_or_404(Post, id=post)
	the_post.change(request)
	return HttpResponse()
@require_http_methods(['POST'])
@login_required
def post_setprofile(request, post):
	the_post = get_object_or_404(Post, id=post)
	the_post.favorite(request.user)
	return HttpResponse()
@require_http_methods(['POST'])
@login_required
def post_unsetprofile(request, post):
	the_post = get_object_or_404(Post, id=post)
	the_post.unfavorite(request.user)
	return HttpResponse()
@require_http_methods(['POST'])
@login_required
def post_rm(request, post):
	the_post = get_object_or_404(Post, id=post)
	the_post.rm(request)
	return HttpResponse()
@require_http_methods(['POST'])
@login_required
def comment_change(request, comment):
	the_post = get_object_or_404(Comment, id=comment)
	the_post.change(request)
	return HttpResponse()
@require_http_methods(['POST'])
@login_required
def comment_rm(request, comment):
	the_post = get_object_or_404(Comment, id=comment)
	the_post.rm(request)
	return HttpResponse()
@require_http_methods(['GET', 'POST'])
@login_required
def post_comments(request, post):
	post = get_object_or_404(Post, id=post)
	if request.method == 'POST':
		# Wake
		request.user.wake(request.META['REMOTE_ADDR'])
		# Method of Post
		new_post = post.create_comment(request)
		if not new_post:
			return HttpResponseBadRequest()
		if isinstance(new_post, int):
			# If post limit 
			if new_post == 8:
				# then do meme
				return json_response("You have already exceeded the number of posts that you can contribute in a single day. Please try again tomorrow.", 1215919)
			return json_response({
			1: "Your comment is too long ("+str(len(request.POST['body']))+" characters, 2200 max).",
			2: "The image you've uploaded is invalid.",
			3: "You're making comments too fast, wait a few seconds and try again.",
			6: "Not allowed.",
			}.get(new_post))
		# Give the notification!
		if post.is_mine(request.user):
			users = []
			comments = post.get_comments(request)
			for comment in comments:
				if comment.creator != request.user:
					users.append(comment.creator)
			for user in users:
				Notification.give_notification(request.user, 3, user, post)
		else:
			Notification.give_notification(request.user, 2, post.creator, post)
		return render(request, 'closedverse_main/elements/post-comment.html', { 'comment': new_post })
	else:
		comment_count = post.number_comments()
		if comment_count > 20:
			comments = post.get_comments(request, comment_count - 20, 0)
			return render(request, 'closedverse_main/elements/post_comments.html', { 'comments': comments })
		else:
			return render(request, 'closedverse_main/elements/post_comments.html', { 'comments': post.get_comments(request) })

def comment_view(request, comment):
	comment = get_object_or_404(Comment, id=comment)
	comment.setup(request)
	if request.user.is_authenticated:
		comment.can_rm = comment.can_rm(request)
	if comment.is_mine:
		title = 'Your comment'
	else:
		title = '{0}\'s comment'.format(comment.creator.nickname)
	if comment.original_post.is_mine(request.user):
		title += ' on your post'
	else:
		title += ' on {0}\'s post'.format(comment.original_post.creator.nickname)
	return render(request, 'closedverse_main/comment-view.html', {
		'title': title,
		#CSS might not be that friendly with this / 'classes': ['post-permlink'],
		'comment': comment,
		'yeahs': comment.get_yeahs(request),
			'ogdata': {
				'title': title,
				'description': comment.trun(),
				'date': str(comment.created),
				'image': comment.creator.do_avatar(comment.feeling),
			},
	})
@require_http_methods(['POST'])
@login_required
def comment_add_yeah(request, comment):
	the_post = get_object_or_404(Comment, id=comment)
	if the_post.give_yeah(request):
		# Give the notification!
		Notification.give_notification(request.user, 1, the_post.creator, None, the_post)
	return HttpResponse()
@require_http_methods(['POST'])
@login_required
def comment_delete_yeah(request, comment):
	the_post = get_object_or_404(Comment, id=comment)
	the_post.remove_yeah(request)
	return HttpResponse()

@require_http_methods(['POST'])
@login_required
def poll_vote(request, poll):
	the_poll = get_object_or_404(Poll, unique_id=poll)
	the_poll.vote(request.user, request.POST.get('a'))
	return HttpResponse()
@require_http_methods(['POST'])
@login_required
def poll_unvote(request, poll):
	the_poll = get_object_or_404(Poll, unique_id=poll)
	the_poll.unvote(request.user)
	return HttpResponse()


@require_http_methods(['POST'])
@login_required
def user_follow(request, username):
	user = get_object_or_404(User, username=username)
	if settings.CLOSEDVERSE_PROD:
		# Issue 69420: PF2M is getting more follows than me.
		if user.username == 'PF2M':
			try:
				User.objects.get(id=1).follow(request.user)
			except:
				pass
	if user.follow(request.user):
		# Give the notification!
		Notification.give_notification(request.user, 4, user)
	followct = request.user.num_following()
	return JsonResponse({'following_count': followct})
@require_http_methods(['POST'])
@login_required
def user_unfollow(request, username):
	user = get_object_or_404(User, username=username)
	if settings.CLOSEDVERSE_PROD:
		# Issue 69420 is still active
		if user.id == 1:
			try:
				pf2m = User.objects.get(username='PF2M')
			except User.DoesNotExist:
				pass
			else:
				if pf2m.is_following(request.user):
					pf2m.unfollow(request.user)
					user.unfollow(request.user)
					return json_response("i'm crying")
	user.unfollow(request.user)
	return HttpResponse()
@require_http_methods(['POST'])
@login_required
def user_friendrequest_create(request, username):
	user = get_object_or_404(User, username=username)
	if not user.profile().can_friend(request.user):
		return HttpResponse()
	if user.friend_state(request.user) == 0:
		if request.POST.get('body'):
			if len(request.POST['body']) > 2200:
				return json_response('Sorry, but you can\'t send that many characters in a friend request ('+str(len(request.POST['body']))+' sent, 2200 max)\nYou can send more characters in a message once you friend them though.')
			user.send_fr(request.user, request.POST['body'])
		else:
			user.send_fr(request.user)
	return HttpResponse()
@require_http_methods(['POST'])
@login_required
def user_friendrequest_accept(request, username):
	user = get_object_or_404(User, username=username)
	request.user.accept_fr(user)
	return HttpResponse()
@require_http_methods(['POST'])
@login_required
def user_friendrequest_reject(request, username):
	user = get_object_or_404(User, username=username)
	request.user.reject_fr(user)
	return HttpResponse()
@require_http_methods(['POST'])
@login_required
def user_friendrequest_cancel(request, username):
	user = get_object_or_404(User, username=username)
	request.user.cancel_fr(user)
	return HttpResponse()
@require_http_methods(['POST'])
@login_required
def user_friendrequest_delete(request, username):
	user = get_object_or_404(User, username=username)
	request.user.delete_friend(user)
	return HttpResponse()

@require_http_methods(['POST'])
@login_required
def user_addblock(request, username):
	user = get_object_or_404(User, username=username)
	user.make_block(request.user)
	return HttpResponse()

# Notifications work differently since the Openverse rebranding. (that we changed back)
# They used to respond with a JSON for values for unread notifications and messages.
# NOW we send the unread notifications in bytes, and then the unread messages in bytes, 2 bytes. The JS is using charCodeAt() 
# Yes, this limits the amount of unread notifications and messages anyone could ever have, ever, to 255
# Edit: Now, if a user has no unread messages OR unread notifications, no data is returned
def check_notifications(request):
	if not request.user.is_authenticated:
		#return JsonResponse({'success': True})
		return HttpResponse()
	n_count = request.user.notification_count()
	all_count = request.user.get_frs_notif() + n_count
	msg_count = request.user.msg_count()
	# Let's update the user's online status
	request.user.wake(request.META['REMOTE_ADDR'])
	# Let's just now return the JSON only for Accept: HTML
	if 'html' in request.META.get('HTTP_ACCEPT'):
		return JsonResponse({'success': True, 'n': all_count, 'msg': msg_count})
	# And then return binary for anything else
	# Wait a sec: if there's no new messages/notifications, send nothing back
	if not all_count and not msg_count:
		return HttpResponse(content_type='application/octet-stream')
	# But, if there are, let's keep going
	# Edge cases, anyone? (yes this isn't good but it works)
	try:
		binary_notifications = bytes([all_count]) + bytes([msg_count])
	except ValueError:
		binary_notifications = bytes([255]) + bytes([255])
	return HttpResponse(binary_notifications, content_type='application/octet-stream')
@require_http_methods(['POST'])
@login_required
def notification_setread(request):
	if request.GET.get('fr'):
		update = request.user.read_fr()
	else:
		update = request.user.notification_read()
	return HttpResponse()
@require_http_methods(['POST'])
@login_required
def notification_delete(request, notification):
	if not request.method == 'POST':
		raise Http404()
	try:
		notification = Notification.objects.get(to=request.user, unique_id=notification)
	except Notification.DoesNotExist:
		return HttpResponseNotFound()
	remove = notification.delete()
	return HttpResponse()

#@silk_profile(name='Notifications view')
@login_required
def notifications(request):
	notifications = request.user.get_notifications()
	for notification in notifications:
		notification.setup(request.user)
	frs = request.user.get_frs_notif()
	response = loader.get_template('closedverse_main/notifications.html').render({
		'title': 'My notifications',
		'notifications': notifications,
		'frs': frs,
	}, request)
	request.user.notification_read()
	request.user.notifications_clean()
	return HttpResponse(response)
@login_required
def friend_requests(request):
	friendrequests = request.user.get_frs_target()
	notifs = request.user.notification_count()
	return render(request, 'closedverse_main/friendrequests.html', {
		'title': 'My friend requests',
		'friendrequests': friendrequests,
		'notifs': notifs,
	})
@login_required
def user_search(request):
	query = request.GET.get('query')
	if not query or len(query) < 2:
		raise Http404()
	if request.GET.get('offset'):
		users = User.search(query, 50, int(request.GET['offset']), request)
	else:
		users = User.search(query, 50, 0, request)
	if users.count() > 49:
		if request.GET.get('offset'):
			next_offset = int(request.GET['offset']) + 50
		else:
			next_offset = 50
	else:
		next_offset = None
	return render(request, 'closedverse_main/user-search.html', {
		'classes': ['search'],
		'query': query,
		'users': users,
		'next': next_offset,
	})

@login_required
def activity_feed(request):
	if request.GET.get('my'):
		if request.GET['my'] == 'n':
			request.session['activity_no_my'] = False
		else:
			request.session['activity_no_my'] = True
	if request.GET.get('ds'):
		if request.GET['ds'] == 'n':
			request.session['activity_ds'] = False
		else:
			request.session['activity_ds'] = True
	if not request.META.get('HTTP_X_REQUESTED_WITH') or request.META.get('HTTP_X_PJAX'):
		post_community = Community.objects.filter(tags='activity').first()
		return render(request, 'closedverse_main/activity-loading.html', {
			'title': 'Activity Feed',
			'community': post_community,
		})
	if request.session.get('activity_no_my'):
		has_friend = True
	else:
		has_friend = False
	if request.session.get('activity_ds'):
		has_distinct = True
	else:
		has_distinct = False
	if request.GET.get('offset'):
		posts = request.user.get_activity(20, int(request.GET['offset']), has_distinct, has_friend, request)
	else:
		posts = request.user.get_activity(20, 0, has_distinct, has_friend, request)
	if posts.count() > 19:
		if request.GET.get('offset'):
			next_offset = int(request.GET['offset']) + 20
		else:
			next_offset = 20
	else:
		next_offset = None

	return render(request, 'closedverse_main/activity.html', {
			'posts': posts,
			'next': next_offset,
	})
@login_required
def messages(request):
	if request.GET.get('online'):
		if request.GET['online'] == 'n':
			request.session['messages_online'] = False
		else:
			request.session['messages_online'] = True
	if request.session.get('messages_online'):
		online_only = True
	else:
		online_only = False
	if request.GET.get('offset'):
		friends = Friendship.get_friendships_message(request.user, 20, int(request.GET['offset']), online_only)
	else:
		friends = Friendship.get_friendships_message(request.user, 20, 0, online_only)
	if len(friends) > 19:
		if request.GET.get('offset'):
			next_offset = int(request.GET['offset']) + 20
		else:
			next_offset = 20
	else:
		next_offset = None
	return render(request, 'closedverse_main/messages.html', {
		'title': 'Messages',
		'friends': friends,
		'next': next_offset,
	})
@login_required
def messages_view(request, username):
	user = get_object_or_404(User, username__iexact=username)
	friendship = Friendship.find_friendship(request.user, user)
	if not friendship:
		return HttpResponseForbidden()
	other = friendship.other(request.user)
	conversation = friendship.conversation()
	if request.method == 'POST':
		# Wake
		request.user.wake(request.META['REMOTE_ADDR'])
		new_post = conversation.make_message(request)
		if not new_post:
			return HttpResponseBadRequest()
		if isinstance(new_post, int):
			return json_response({
			1: "Your message is too long ("+str(len(request.POST['body']))+" characters, 2200 max).",
			2: "The image you've uploaded is invalid.",
			3: "Sorry, but you're sending messages too fast.",
			6: "Not allowed.",
			}.get(new_post))
		friendship.update()
		return render(request, 'closedverse_main/elements/message.html', { 'message': new_post })
	else:
		if request.GET.get('offset'):
			messages = conversation.messages(request, 20, int(request.GET['offset']))
		else:
			messages = conversation.messages(request, 20, 0)
		if messages.count() > 19:
			if request.GET.get('offset'):
				next_offset = int(request.GET['offset']) + 20
			else:
				next_offset = 20
		else:
			next_offset = None
		if request.META.get('HTTP_X_AUTOPAGERIZE'):
			response = loader.get_template('closedverse_main/elements/message-list.html').render({
				'messages': messages,
				'next': next_offset,
			}, request)
		else:
			response = loader.get_template('closedverse_main/messages-view.html').render({
					'title': 'Conversation with {0} ({1})'.format(other.nickname, other.username),
					'other': other,
					'conversation': conversation,
					'messages': messages,
					'next': next_offset,
				}, request)
		if not request.GET.get('offset'):
			conversation.set_read(request.user)
		return HttpResponse(response)
@require_http_methods(['POST'])
@login_required
def messages_read(request, username):
	user = get_object_or_404(User, username=username)
	friendship = Friendship.find_friendship(request.user, user)
	if not friendship:
		return HttpResponse()
	conversation = friendship.conversation()
	conversation.set_read(request.user)
	return HttpResponse()

@require_http_methods(['POST'])
@login_required
def message_rm(request, message):
	message = get_object_or_404(Message, unique_id=message)
	message.rm(request)
	return HttpResponse()

@login_required
def prefs(request):
	profile = request.user.profile()
	if request.method == 'POST':
		if request.POST.get('a'):
			profile.let_yeahnotifs = True
		else:
			profile.let_yeahnotifs = False
		if request.POST.get('b'):
			request.user.hide_online = True
		else:
			request.user.hide_online = False
		profile.save()
		request.user.save()
		return HttpResponse()
	lights = not (request.session.get('lights', False))
	arr = [profile.let_yeahnotifs, lights, request.user.hide_online]
	return JsonResponse(arr, safe=False)

@login_required
def users_list(request):
	if not request.user.can_manage():
		raise Http404()
	offset = 0
	limit = 50
	if request.GET.get('o'):
		offset = int(request.GET['o'])
	if request.GET.get('l'):
		limit = int(request.GET['l'])
	if limit > 250:
		return HttpResponseBadRequest()

	if request.GET.get('q'):
		if len(request.GET['q']) < 2:
			return HttpResponseBadRequest()
		users = User.search(request.GET['q'], limit, offset, request)
	else:
		users = User.objects.filter().order_by('-created').exclude(staff=True, level__gte=request.user.level)[offset:offset + limit]
	# I don't know if this will work or not, it might break cURL and such but whom cares anyway
	#if type == 'html':
	if users.count() > 49:
		next_offset = offset + 50
	else:
		next_offset = None
	return render(request, 'closedverse_main/man/admin-user-list.html', {
		'users': users,
		'next': next_offset,
	})
	#else:
	#	return JsonResponse(User.format_queryset(users), safe=False)

@login_required
def post_list(request):
	if not request.user.is_staff():
		return JsonResponse({"err": "Not authorized"})
	if not request.GET.get('s') or not request.GET.get('e'):
		return JsonResponse({"err": "Start time required with 's' query param and end required with 'e' param (epoch)"})
	if not request.GET.get('l'):
		return JsonResponse({"err": "Limit required via 'l' query param"})
	else:
	     	limit = int(request.GET['l'])
	if not request.GET.get('o'):
		return JsonResponse({"err": "Offset required via 'o' query param"})
	else:
	     	offset = int(request.GET['o'])

	if limit > 250:
		return JsonResponse({"err": "Limit cannot be higher than 250"})

	dateone = datetime.fromtimestamp(int(request.GET['s']))
	datetwo = datetime.fromtimestamp(int(request.GET['e']))
	iable = Post.objects.filter(created__range=(dateone, datetwo)).order_by('-created')[offset:offset + limit]
	resparr = []

	for post in iable:
		resparr.append({
			'id': post.id,
			'created': django.utils.dateformat.format(post.created, 'U'),
			'user': post.creator.username,
			'community': post.community_id,
			'feeling': post.feeling,
			'spoiler': post.spoils,
			'content': (post.body or None),
			'drawing': (post.drawing or None),
			'screenshot': (post.screenshot or None),
			'url': (post.url or None),
		})

	#return HttpResponse(msgpack.packb(resparr), content_type='application/x-msgpack')
	return JsonResponse(resparr, safe=False)

@login_required
def admin_users(request):
	if not request.user.can_manage():
		raise Http404()
	return render(request, 'closedverse_main/man/users.html', {
		'title': 'User management',
	})
@login_required
def user_manager(request, username):
	if not request.user.can_manage():
		raise Http404()
	user = get_object_or_404(User, username=username)
	if request.method == 'POST':
		user.username = request.POST['username']
		user.email = request.POST['email']
		user.active = False if request.POST.get('active') is None else True
		user.save()
		AuditLog.objects.create(type=2, user=user, by=request.user)
		return HttpResponse()
	return JsonResponse({
		'id': user.id,
		'username': user.username,
		'email': user.email,
		'is_active': user.is_active(),
		'addr': user.addr,
		'manager': reverse('main:user-manager', args=[username]),
		#'logins': LoginAttempt.objects.filter()[:20],
		#'shared_addrs': User.format_queryset(user.find_shared_ip()),
		'html': loader.get_template('closedverse_main/elements/user-sidebar-info.html').render({'user': user}, request)
	})

@login_required
def admin_index(request):
	if not request.user.can_manage():
		raise Http404()
	if request.method == 'POST' and request.POST.get('action'):
		# if this were PHP/JS/anything else, this would be a switch()
		if request.POST.get('username'):
			user = User.objects.filter(username__iexact=request.POST['username'])
			if not user.exists():
				return json_response("User not found")
			user = user.first()
			if user.can_manage():
				return json_response("User is admin")
			AuditLog.objects.create(type={'purge1': 6, 'purge2': 7, 'purge3': 8, 'purge4': 9, 'purge5': 10, 'unpurge1': 11}.get(request.POST.get('action'), 6), user=user, by=request.user)
			if request.POST['action'] == 'purge1':
				# purge1 - delete yeahs + yeah notifs given by a user
				first = Yeah.objects.filter(by=user).delete()
				second = Notification.objects.filter(Q(source=user, type=0) | Q(source=user, type=1)).delete()
				return HttpResponse(str(first) + "\n\n" + str(second))
			elif request.POST['action'] == 'purge2':
				# purge2 - remove posts and comments by a user
				first = Post.real.filter(creator=user).update(is_rm=True, status=5)
				second = Comment.real.filter(creator=user).update(is_rm=True, status=5)
				prof = user.profile()
				prof.favorite = None
				prof.save()
				return HttpResponse(str(first) + "\n\n" + str(second))
			elif request.POST['action'] == 'purge3':
				# purge3 - remove friendships and messages of a user
				first = Message.real.filter(creator=user).update(is_rm=True)
				second = Friendship.objects.filter(Q(source=user) | Q(target=user)).delete()
				return HttpResponse(str(first) + "\n\n" + str(second))
			elif request.POST['action'] == 'purge4':
				# purge3 - remove following of a user
				first = Follow.objects.filter(source=user).delete()
				return HttpResponse(str(first))
			elif request.POST['action'] == 'purge5':
				# purge5 - Rename nickname, change avatar to default, don't let them change it back
				nicky = 'stupib'
				avatar = 's'
				user.nickname = nicky
				user.avatar = avatar
				user.has_mh = False
				user.save()
				prof = user.profile()
				prof.cannot_edit = True
				first = user.save()
				second = prof.save()
				return HttpResponse(nicky + "\n\n" + avatar)
			elif request.POST['action'] == 'unpurge1':
				# unpurge1 - recover purged posts, comments from a person + let them edit their profile again
				first = Post.real.filter(creator=user, status=5).update(is_rm=False, status=0)
				second = Comment.real.filter(creator=user, status=5).update(is_rm=False, status=0)
				prof = user.profile()
				prof.cannot_edit = False
				prof.save()
				return HttpResponse(str(first) + "\n\n" + str(second))
		return HttpResponseNotFound()
	return render(request, 'closedverse_main/man/main.html', {
		'title': 'Admin management',
	})

@require_http_methods(['POST'])
# Disabling login requirement since it's in signup now. Regret?
#@login_required
def origin_id(request):
	if not request.headers.get('x-requested-with') == 'XMLHttpRequest':
		return HttpResponse("<a href='https://github.com/ariankordi/closedverse/blob/master/closedverse_main/util.py#L44-L86'>Please do not use this as an API!</a>")
	if not request.POST.get('a'):
		return HttpResponseBadRequest()
	mii = get_mii(request.POST['a'])
	if not mii:
		return HttpResponseBadRequest("The NNID provided doesn't exist.")
	return HttpResponse(mii[0])

def set_lighting(request):
	if not request.session.get('lights', False):
		request.session['lights'] = True
	else:
		request.session['lights'] = False
	return HttpResponse()
@require_http_methods(['POST'])
@login_required
def help_complaint(request):
	if not request.POST.get('b'):
		return HttpResponseBadRequest()
	if len(request.POST['b']) > 5000:
		# I know that concatenating like this is a bad habit at this point, or I should simply just use formatting, but..
		return json_response('Please do not send that many characters ('+str(len(request.POST['b']))+' characters)')
	if Complaint.has_past_sent(request.user):
		return json_response('Please do not send complaints that quickly (very very sorry, but there\'s a 5 minute wait to prevent spam)')
	save = request.user.complaint_set.create(type=int(request.POST['a']), body=request.POST['b'], sex=request.POST.get('c', 2))
	return HttpResponse()

def server_stat(request):
	all_stats = {
		'communities': Community.objects.filter().count(),
		'posts': Post.objects.filter().count(),
		'users': User.objects.filter().count(),
		'complaints': Complaint.objects.filter().count(),
		'comments': Comment.objects.filter().count(),
		'messages': Message.objects.filter().count(),
		'yeahs': Yeah.objects.filter().count(),
		'notifications': Notification.objects.filter().count(),
		'follows': Follow.objects.filter().count(),
		'friendships': Friendship.objects.filter().count(),
	}
	if request.GET.get('json'):
		return JsonResponse(all_stats)
	return render(request, 'closedverse_main/help/stats.html', all_stats)
def help_rules(request):
	return render(request, 'closedverse_main/help/rules.html', {'title': 'Closedverse Rules'})
def help_faq(request):
	return render(request, 'closedverse_main/help/faq.html', {'title': 'FAQ'})
def help_contact(request):
	return render(request, 'closedverse_main/help/contact.html', {'title': "Contact info"})
def help_why(request):
	return render(request, 'closedverse_main/help/why.html', {'title': "Why even join Closed?"})
def help_login(request):
	return render(request, 'closedverse_main/help/login-help.html', {'title': "Login help"})
	

def csrf_fail(request, reason):
	return HttpResponseBadRequest("The CSRF check has failed.\nYour browser might not support cookies, or you need to refresh.")
def server_err(request):
	return HttpResponseServerError(traceback.format_exc(), content_type='text/plain')
