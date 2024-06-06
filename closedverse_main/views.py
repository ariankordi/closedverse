from django.http import HttpResponse, HttpResponseNotFound, HttpResponseBadRequest,  HttpResponseServerError, HttpResponseForbidden, JsonResponse
from django.template import loader
from django.shortcuts import render, redirect, get_object_or_404
from django.http import Http404
#from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from django.core.validators import EmailValidator
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import update_session_auth_hash
from django.db.models import Q, Count, Exists, OuterRef
from django.db.models.functions import Now
from .models import *
from .util import *
from closedverse import settings
import re
from django.urls import reverse
from random import getrandbits
import json
import traceback
from datetime import datetime, timedelta
from django.utils import timezone
from django.contrib.auth.hashers import identify_hasher

#from silk.profiling.profiler import silk_profile

# client-side mii fetch GET endpoint (like pf2m.com/hash if it supported cors)
mii_endpoint = 'https://nnidlt.murilo.eu.org/api.php?output=hash_only&env=production&user_id='
#mii_endpoint = '/origin?a='
if hasattr(settings, 'mii_endpoint'):
	mii_endpoint = settings.mii_endpoint

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
	#popularity = Community.popularity
	obj = Community.objects
	if request.user.is_authenticated:
		classes = ['guest-top']
		favorites = request.user.community_favorites()
	else:
		classes = []
		favorites = None

	availableads = Ads.ads_available()
	if(availableads):
		ad = Ads.get_one()
	else:
		ad = "no ads"

	WelcomeMSG = welcomemsg.objects.filter(show=True).order_by('-order', '-id')
	# announcements within the past week-ish
	announcements = Post.objects.filter(community__tags='announcements', created__gte=Now()-timedelta(days=5)).order_by('-created')[:6]
	if request.user.is_authenticated:
		my_communities = obj.filter(creator=request.user).order_by('-created')[0:12]
	else:
		my_communities = None
	return render(request, 'closedverse_main/community_list.html', {
		'title': 'Communities',
		'ad': ad,
		'announcements': announcements,
		'WelcomeMSG': WelcomeMSG,
		'availableads': availableads,
		'classes': classes,
		'general': obj.filter(type=0).order_by('-created')[0:12],
		'game': obj.filter(type=1).order_by('-created')[0:12],
		'special': obj.filter(type=2).order_by('-created')[0:12],
		'user_communities': sorted(obj.filter(type=3), key=lambda x: x.popularity(), reverse=True)[0:12],
		'my_communities': my_communities,
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

def community_all(request, category):
	"""All communities, with pagination"""
	try:
		offset = int(request.GET.get('offset', '0'))
	except ValueError:
		offset = 0
	if request.user.is_authenticated:
		classes = ['guest-top']
	else:
		classes = []
	g = [0, "General Communities"]
	category_enum = {
		'gen': g,
		'game': [1, "Game Communities"],
		'special': [2, "Special Communities"],
		'usr': [3, "User Communities"],
	}.get(category, g)
	category_type = category_enum[0]
	communities = Community.get_all(category_type, offset)
	# Closedverse was NEVER meant to have 20000000 communities.
	if communities.count() > 11:
		has_next = True
	else:
		has_next = False
	if communities.count() < 1:
		has_back = True
	else:
		has_back = False
	back = offset - 12
	next = offset + 12
	return render(request, 'closedverse_main/community_all.html', {
		'title': 'All Communities',
		'classes': classes,
		'communities': communities,
		'category': category,
		'text': category_enum[1],
		'has_next': has_next,
		'has_back': has_back,
		'next': next,
		'back': back,
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
	location = '/'
	if request.user.is_authenticated:
		return redirect(location)
	if request.method == 'POST':
		# If we don't have all of the POST parameters we want..
		if not (request.POST['username'] and request.POST['password']):
		# then return that.
			return HttpResponseBadRequest("You didn't fill in all of the fields.")
		# Now let's authenticate.
		# Wait, first check if the user exists. Remove spaces from the username, because some people do that.
		# Hold up, first we need to check proxe.

		# Uncomment this if you want users to be forbidden from logging in with a proxy.
		#if settings.CLOSEDVERSE_PROD and settings.DISALLOW_PROXY and iphub(request.META['REMOTE_ADDR']):
		#	return HttpResponseNotFound("The user doesn't exist.")
		user = User.objects.authenticate(username=request.POST['username'], password=request.POST['password'])
		# None = doesn't exist, False = invalid password.
		if user is None:
			return HttpResponseNotFound("The user doesn't exist.")
		else:
			# Todo: I might want to do some things relating to making models take care of object stuff like this instead of the view, it's totally messed up now.
			successful = False if user[1] is False or not user[0].is_active() else True
			LoginAttempt.objects.create(user=user[0], success=successful, user_agent=request.META.get('HTTP_USER_AGENT'), addr=request.META.get('REMOTE_ADDR'))
			if user[1] == False:
				# check if a hasher could not be identified due to moving from passlib
				try:
					# will throw a ValueError if no hasher is found
					identify_hasher(user[0].password)
				except ValueError as e:
					# error says "Unknown password hashing algorithm ''......", meaning that the password is not converted
					if '\'\'' in str(e):
						return HttpResponseBadRequest("The password is either encoded in an unsupported format, or the passwords haven't been updated yet. As part of a recent update, passwords need to be converted - sorry about that. If password resets work, you can use that to make your account usable immediately.")
					else:
						return HttpResponseBadRequest("The password is either encoded in an unsupported format, or the settings haven't been updated yet. Please add - or direct the server owner to add - hashers_passlib.bcrypt_sha256 to settings.PASSWORD_HASHERS, and then install django-hashers-passlib. I'm sorry for the inconvenience! If password resets work, you can use that immediately.")
				else:
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
		if request.GET.get('next'):
			location = request.GET['next']
		if request.headers.get('x-requested-with') == 'XMLHttpRequest':
			# because if you respond to an ajax with a redirect, the response will just be the page, you can't get the redirect value from js
			return HttpResponse(location)
		return redirect(location)
	else:
		return render(request, 'closedverse_main/login_page.html', {
			'title': 'Log in',
			'allow_signups': settings.allow_signups,
			'reset_supported': settings.DEBUG or hasattr(settings, 'EMAIL_HOST_USER'),
			#'classes': ['no-login-btn']
		})
def signup_page(request):
	"""Signup page, lots of checks here"""
	# Redirect the user to / if they're logged in, forcing them to log out
	if not settings.allow_signups:
		return render(request, 'closedverse_main/signups-blocked.html', {
			'title': 'Log in',
			#'classes': ['no-login-btn']
		})

	if request.user.is_authenticated:
		return redirect('/')
	if request.method == 'POST':
		if settings.RECAPTCHA_PUBLIC_KEY:
			if not recaptcha_verify(request, settings.RECAPTCHA_PRIVATE_KEY):
				return HttpResponse("The reCAPTCHA validation has failed.", status=402)
		if not (request.POST.get('username') and request.POST.get('password') and request.POST.get('password_again')):
			return HttpResponseBadRequest("You didn't fill in all of the required fields.")

		invited = False
		invite = None
		if settings.invite_only:
			invite_code = request.POST.get('invite_code')
			if not invite_code:
				return HttpResponseBadRequest("An invite code is required to sign up.")
			try:
				invite = Invites.objects.get(code=invite_code)
			except Invites.DoesNotExist:
				return HttpResponseBadRequest("The provided invite code does not exist.")
			if not invite.is_valid():
				return HttpResponseBadRequest("The provided invite code has been used or is void. Please ask for another code.")
				invited = True



		if not re.compile(r'^[A-Za-z0-9-._]{1,32}$').match(request.POST['username']) or not re.compile(r'[A-Za-z0-9]').match(request.POST['username']):
			return HttpResponseBadRequest("Your username either contains invalid characters or is too long (only letters + numbers, dashes, dots and underscores are allowed")

		# forbidden keywords
		groups = [
			[
				'admin', 'admln', 'adrnin', 'admn', 'closedverse',
				'arian', 'kordi', 'windowscj', 'gab', 'term',
				'penis', 'nazi', 'hitler', 'hitlre', 'ihtler', 'heil', 'kkk'
				'nigg', 'niger', 'fag',
				'smf9', 'dakux', 'dacucks', 'adrian'
			],
			['adam', 'nintendotom'],
			['funny'],
			['doeggs', 'do_eggs', 'do-eggs', 'do.eggs'],
		]
		messages = [
			"That username isn't funny. Please pick a funny username.",
			"Adam, no.",
			"I'm laughing so hard right now!! No seriously. Pick a better username.",
			"the world may never know",
		]
		for id in range(len(groups)):
			for keyword in groups[id]:
				if keyword in request.POST['username'].lower() or keyword in request.POST['nickname'].lower():
					# perhaps warn admins at a later time
					return HttpResponseForbidden(messages[id])

		# this is such a miniscule amount of NNIDs that either an admin or a person could
		# claim all of them, in which case they could not be reused
		#for keyword in ['windowscj', 'gabalt']:
		#	if keyword in request.POST['origin_id'].lower():
		#		return HttpResponseForbidden("You're very funny. Unfortunately your funniness blah blah blah fuck off.")

		# end of forbidden keywords

		conflicting_user = User.objects.filter(Q(username__iexact=request.POST['username']) | Q(username__iexact=request.POST['username'].replace(' ', '')))
		if conflicting_user:
			return HttpResponseBadRequest("A user with that username already exists.")
		if not request.POST['password'] == request.POST['password_again']:
			return HttpResponseBadRequest("Your passwords don't match.")
		# do the length check
		#if len(request.POST['password']) < settings.minimum_password_length:
		#	return HttpResponseBadRequest('The password must be at least ' + str(settings.minimum_password_length) + ' characters long.')
		# use native django password validators, which can include length check
		try:
			# todo if you include the user object here it would help validate against some user attributes however this form is not the one that actually makes the account sooo not really doable unless a dummy user object is created for the sole purpose of this check which would be dumb
			validate_password(request.POST['password'])
		except ValidationError as error:
			return HttpResponseBadRequest(error)
		if not request.POST['nickname']:
			return HttpResponseBadRequest("You need a nickname. What else are we gonna call you????? Ghosty?")
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
		check_othersban = User.objects.filter(addr=request.META['REMOTE_ADDR'], active=False).exists()
		if check_othersban:
			return HttpResponseBadRequest("You cannot sign up while banned.")
		check_signupban = User.objects.filter(signup_addr=request.META['REMOTE_ADDR'], active=False).exists()
		if check_signupban:
			return HttpResponseBadRequest("Get on your hands and knees")
		if iphub(request.META['REMOTE_ADDR']):
			if settings.DISALLOW_PROXY:
				return HttpResponseBadRequest("please do not use a vpn ok thanks")
		if request.POST.get('origin_id'):
			if not request.POST.get('mh'):
			  return HttpResponseBadRequest("sorry didn't get the mii image attribute. you might need to wait or just refresh, sorry")
			if User.nnid_in_use(request.POST['origin_id']):
				return HttpResponseBadRequest("That Nintendo Network ID is already in use, that would cause confusion.")
			#mii = get_mii(request.POST['origin_id'])
			#if not mii:
			#	return HttpResponseBadRequest("The NNID provided doesn't exist.")
			#nick = mii[1]
			nick = request.POST['nickname']
			mii = [request.POST.get('mh'), 'if you see this then something is wrong', request.POST['origin_id']]
			gravatar = False
		else:
			nick = request.POST['nickname']
			mii = None
			gravatar = True
		make = User.objects.closed_create_user(username=request.POST['username'], password=request.POST['password'], email=request.POST.get('email'), addr=request.META['REMOTE_ADDR'], user_agent=request.META['HTTP_USER_AGENT'], signup_addr=request.META['REMOTE_ADDR'], nick=nick, nn=mii, gravatar=gravatar)
		if invited == True:
			invite.used = True
			invite.used_by = make
			invite.save()

		LoginAttempt.objects.create(user=make, success=True, user_agent=request.META.get('HTTP_USER_AGENT'), addr=request.META.get('REMOTE_ADDR'))
		login(request, make)
		request.session['passwd'] = make.password
		if request.headers.get('x-requested-with') == 'XMLHttpRequest':
			return HttpResponse('/')
		return redirect('/')
	else:
		if not settings.RECAPTCHA_PUBLIC_KEY:
			settings.RECAPTCHA_PUBLIC_KEY = None
		return render(request, 'closedverse_main/signup_page.html', {
			'title': 'Sign up',
			'recaptcha': settings.RECAPTCHA_PUBLIC_KEY,
			'invite_only': settings.invite_only,
			'age': settings.age_allowed,
			'mii_domain': mii_domain,
			'mii_endpoint': mii_endpoint,
			#'classes': ['no-login-btn'],
		})

def forgot_passwd(request):
	"""Password email page / post endpoint."""
	if request.method == 'POST' and request.POST.get('email'):
		try:
			user = User.objects.get(email=request.POST['email'])
		except (User.DoesNotExist, ValueError):
			return HttpResponseNotFound("The email address could not be found.")
		try:
			user.password_reset_email(request)
		except Exception as error:
			return HttpResponseBadRequest("There was an error submitting that, sorry! Here's why: " + str(error))
		return HttpResponse("Success! Check your emails, it should have been sent from \"{0}\".".format(settings.DEFAULT_FROM_EMAIL))
	if request.GET.get('token'):
		user = User.get_from_passwd(request.GET['token'])
		if not user:
			raise Http404()
		if request.method == 'POST':
			if not request.POST['password'] == request.POST['password_again']:
				return HttpResponseBadRequest("Your passwords don't match.")
			try:
				validate_password(request.POST['password'], user=user)
			except ValidationError as error:
				return HttpResponseBadRequest(error)
			user.set_password(request.POST['password'])
			user.save()
			return HttpResponse("Success! Now you can log in with your new password!")
		return render(request, 'closedverse_main/forgot_reset.html', {
			'title': 'Reset password for ' + user.username,
			'user': user,
			#'classes': ['no-login-btn'],
		})
	return render(request, 'closedverse_main/forgot_page.html', {
		'title': 'Reset password',
		'reset_supported': settings.DEBUG or hasattr(settings, 'EMAIL_HOST_USER'),
		#'classes': ['no-login-btn'],
	})

def logout_page(request):
	"""Password email page / post endpoint."""
	if not request.user.is_authenticated or not request.user.is_active():
		if not request.user.is_authenticated:
			logout(request)
			r = HttpResponseForbidden("You are not logged in, so how can you possibly log out? You will be redirected to Wario Land 4 momentarily.", content_type='text/plain')
		else:
			r = HttpResponseForbidden("You can't log out while you're inactive. According to me and God, you'll just have to sit here and suffer for now. Go contemplate your actions. You will be redirected to Wario Land 4 momentarily.", content_type='text/plain')
		r['Refresh'] = '7; url=https://gba.js.org/player#warioland4'
		return r
	logout(request)
	if request.GET.get('next'):
		return redirect(request.GET['next'])
	return redirect('/')

def user_view(request, username):
	"""The user view page, has recent posts/yeahs."""
	user = get_object_or_404(User, username__iexact=username)
	# if this user doesn't have a profile then the page won't work anyway
	#if user.username == "ClosedverseAdmin":
	#	raise Http404()
	if user.is_me(request):
		title = 'My profile'
	else:
		if request.user.is_authenticated and not user.can_view(request.user):
			raise Http404()
		title = '{0}\'s profile'.format(user.nickname)
	profile = user.profile()
	profile.setup(request)
	if hasattr(profile, 'is_blocked'):
		return render(request, 'closedverse_main/user_blocked.html', {
			'classes': ['profile-top'],
			'user': user,
			'profile': profile,
		})
	if request.user.is_authenticated:
		profile.can_friend = profile.can_friend(request.user)
		#user.can_follow = user.can_follow(request.user)
		#user.can_block = user.can_block(request.user)
		#user.is_blocked = UserBlock.find_block(user, request.user)

	if request.method == 'POST' and request.user.is_authenticated:
		user = request.user
		profile = user.profile()
		profile.setup(request)
		comment_old = profile.comment
		nickname_old = user.nickname
		if profile.cannot_edit:
			return json_response("Not allowed.")
		if request.POST.get('screen_name') is None or len(request.POST['screen_name']) > 32:
			return json_response('Nickname is too long or too short (length '+str(len(request.POST.get('screen_name')))+', max 32)')
		if len(request.POST.get('profile_comment')) > 2200:
			return json_response('Profile comment is too long (length '+str(len(request.POST.get('profile_comment')))+', max 2200)')
		if len(request.POST.get('country')) > 255:
			return json_response('Region is too long (length '+str(len(request.POST.get('country')))+', max 255)')
		if len(request.POST.get('website')) > 255:
			return json_response('Web URL is too long (length '+str(len(request.POST.get('website')))+', max 255)')
		if len(request.POST.get('bg_url')) > 300:
			return json_response('Background URL is too long (length '+str(len(request.POST.get('bg_url')))+', max 300)')
		if len(request.POST.get('whatareyou')) > 300:
			return json_response('"What Are You" is too long (length '+str(len(request.POST.get('whatareyou')))+', max 300)')
		if len(request.POST.get('external')) > 255:
			return json_response('Discord Tag is too long (length '+str(len(request.POST.get('external')))+', max 300)')
		if len(request.POST.get('email')) > 500:
			return json_response('Email is too long (length '+str(len(request.POST.get('email')))+', max 500)')
		# Kinda unneeded but gdsjkgdfsg
		if request.POST.get('website') == 'Web URL' or request.POST.get('country') == 'Region':
			return json_response("I'm laughing right now.")

		if len(request.POST.get('avatar')) > 255:
			return json_response('Avatar is too long (length '+str(len(request.POST.get('avatar')))+', max 255)')
		if request.POST.get('email') and not request.POST.get('email') == 'None':
			if User.email_in_use(request.POST['email'], request):
				return HttpResponseBadRequest("That email address is already in use, that can't happen.")
			try:
				EmailValidator()(value=request.POST['email'])
			except ValidationError:
				return json_response("Your e-mail address is invalid. Input an e-mail address, or input nothing.")
		if User.nnid_in_use(request.POST.get('origin_id'), request):
			return json_response("That Nintendo Network ID is already in use, that would cause confusion.")
		#if user.has_plain_avatar():
		#	user.avatar = request.POST.get('avatar') or ''
		# custom handler
		if request.POST.get('avatar') == '2':
			if request.FILES.get('screen'):
				if not request.user.has_freedom():
					return json_response("Not allowed.")
				upload = None
				if request.FILES.get('screen'):
					# worth noting that the file for the avatar is never cleaned up after the user changes it
					upload = util.image_upload(request.FILES['screen'], True, avatar=True)
					if upload == 1:
						return json_response("sorry, we are racist to the image you uploaded, you have to choose another one")
				user.avatar = upload
				user.has_mh = False
		elif request.POST.get('avatar') == '1':
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
				if not request.POST.get('mh'):
				  return json_response('i think you gotta wait for the nnid to retrieve')
				user.has_mh = True
				#getmii = get_mii(request.POST.get('origin_id'))
				#if not getmii:
				#	return json_response('NNID not found')
				user.avatar = request.POST.get('mh')
				#profile.origin_id = getmii[2]
				profile.origin_id = request.POST['origin_id']
				profile.origin_info = json.dumps([request.POST.get('mh'), 'if you see this then something is wrong', request.POST['origin_id']])
		elif request.POST.get('avatar') == '3':
			if not request.POST.get('origin_id'):
				user.has_mh = False
				profile.origin_id = None
				profile.origin_info = None
				user.avatar =  ('s' if getrandbits(1) else '')
			else:
				user.has_mh = True
				user.avatar = request.POST['studio_code']
		# set the username color
		if request.POST.get('color'):
			try:
				validate_color(request.POST['color'])
			except ValidationError:
				user.color = None
			else:
				dark = True if user.color == '#000000' else False
				light = True if user.color == '#ffffff' else False
				if dark:
					return json_response("Too dark")
				elif light:
					user.color = None
				else:
					if request.POST['color'] == '#ffffff':
						user.color = None
					else:
						user.color = request.POST['color']
		else:
			user.color = None

		# set the theme
		if request.POST.get('theme'):
			reset_theme = False if request.POST.get('reset-theme') is None else True
			try:
				validate_color(request.POST['theme'])
			except ValidationError:
				user.theme = None
			else:
				light = True if request.POST['theme'] == '#ffffff' else False
				if light:
					user.theme = None
				elif reset_theme:
					user.theme = None
				else:
					user.theme = request.POST['theme']
		else:
			user.theme = None
		if request.POST.get('email') == 'None':
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
		profile.whatareyou = request.POST.get('whatareyou')
		profile.relationship_visibility = (request.POST.get('relationship_visibility') or 0)
		profile.id_visibility = (request.POST.get('id_visibility') or 0)
		profile.yeahs_visibility = (request.POST.get('yeahs_visibility') or 0)
		profile.pronoun_is = (request.POST.get('pronoun_dot_is') or 0)
		profile.gender_is = (request.POST.get('gender_select') or 0)
		profile.comments_visibility = (request.POST.get('comments_visibility') or 0)
		profile.let_friendrequest = (request.POST.get('let_friendrequest') or 0)
		user.bg_url = (request.POST.get('bg_url') or None)
		user.nickname = filterchars(request.POST.get('screen_name'))
		# Maybe todo?: Replace all "not .. == .." with ".. != .." etc
		# If the user cannot edit and their nickname/avatar is different than what they had, don't let it happen.

		if request.POST.get('profile_comment') != comment_old or request.POST.get('screen_name') != nickname_old:
			ProfileHistory.objects.create(user=user,
			old_nickname=nickname_old,
			old_comment=comment_old,
			new_nickname=request.POST.get('screen_name'),
			new_comment=request.POST.get('profile_comment'))
		if not user.email:
			profile.email_login = 1
		else:
			profile.email_login = (request.POST.get('email_login') or 1)

		profile.save()
		user.save()
		return HttpResponse()
	posts = user.get_posts(3, 0, request, timezone.now())
	yeahed = user.get_yeahed(0, 3, 0, request.user)
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
	if hasattr(profile, 'is_blocked'):
		return render(request, 'closedverse_main/user_blocked.html', {
			'classes': ['profile-top'],
			'user': user,
			'profile': profile,
		})

	offset = int(request.GET.get('offset', 0))
	if request.GET.get('offset_time'):
		offset_time = datetime.fromisoformat(request.GET['offset_time'])
	else:
		offset_time = timezone.now()

	posts = user.get_posts(50, offset, request, offset_time)
	next_offset = None
	if posts.count() > 49:
		next_offset = offset + 50

	if request.META.get('HTTP_X_AUTOPAGERIZE'):
		return render(request, 'closedverse_main/elements/u-post-list.html', {
			'posts': posts,
			'next': next_offset,
			'time': offset_time.isoformat(),
		})
	else:
		return render(request, 'closedverse_main/user_posts.html', {
			'user': user,
			'title': title,
			'posts': posts,
			'profile': profile,
			'next': next_offset,
			'time': offset_time.isoformat(),
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
	if hasattr(profile, 'is_blocked'):
		return render(request, 'closedverse_main/user_blocked.html', {
			'classes': ['profile-top'],
			'user': user,
			'profile': profile,
		})

	if not profile.yeahs_visible:
		raise Http404()

	yeahs = user.get_yeahed(2, 20, int(request.GET.get('offset', 0)), request.user)
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
	if hasattr(profile, 'is_blocked'):
		return render(request, 'closedverse_main/user_blocked.html', {
			'classes': ['profile-top'],
			'user': user,
			'profile': profile,
		})

	if not profile.comments_visible:
		raise Http404()

	offset = int(request.GET.get('offset', 0))
	if request.GET.get('offset_time'):
		offset_time = datetime.fromisoformat(request.GET['offset_time'])
	else:
		offset_time = timezone.now()
	posts = user.get_comments(20, offset, request, offset_time)
	next_offset = None
	if posts.count() > 19:
		next_offset = offset + 20

	if request.META.get('HTTP_X_AUTOPAGERIZE'):
			return render(request, 'closedverse_main/elements/u-post-list.html', {
			'posts': posts,
			'next': next_offset,
			'time': offset_time.isoformat(),
		})
	else:
		return render(request, 'closedverse_main/user_comments.html', {
			'user': user,
			'title': title,
			'posts': posts,
			'profile': profile,
			'next': next_offset,
			'time': offset_time.isoformat(),
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
	if hasattr(profile, 'is_blocked'):
		return render(request, 'closedverse_main/user_blocked.html', {
			'classes': ['profile-top'],
			'user': user,
			'profile': profile,
		})

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
	if hasattr(profile, 'is_blocked'):
		return render(request, 'closedverse_main/user_blocked.html', {
			'classes': ['profile-top'],
			'user': user,
			'profile': profile,
		})

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
	if hasattr(profile, 'is_blocked'):
		return render(request, 'closedverse_main/user_blocked.html', {
			'classes': ['profile-top'],
			'user': user,
			'profile': profile,
		})

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
		'settings': settings,
		'mii_domain': mii_domain,
		'mii_endpoint': mii_endpoint,
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
	can_edit = communities.can_edit_community(request)
	if not communities.clickable():
		return HttpResponseForbidden()
	if not request.user.is_authenticated and communities.require_auth:
		return render(request, 'com_locked.html')
	offset = int(request.GET.get('offset', 0))
	if request.GET.get('offset_time'):
		offset_time = datetime.fromisoformat(request.GET['offset_time'])
	else:
		offset_time = timezone.now()

	posts = communities.get_posts(50, offset, request, offset_time)
	next_offset = None
	if posts.count() > 49:
		next_offset = offset + 50

	if request.META.get('HTTP_X_AUTOPAGERIZE'):
			return render(request, 'closedverse_main/elements/post-list.html', {
			'posts': posts,
			'next': next_offset,
			'time': offset_time.isoformat(),
		})
	else:
		return render(request, 'closedverse_main/community_view.html', {
			'title': communities.name,
			'classes': ['community-top'],
			'community': communities,
			'posts': posts,
			'next': next_offset,
			'time': offset_time.isoformat(),
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
	if not the_community.type == 4:
		the_community.favorite_add(request)
	return HttpResponse()
@require_http_methods(['POST'])
@login_required
def community_favorite_rm(request, community):
	the_community = get_object_or_404(Community, id=community)
	the_community.favorite_rm(request)
	return HttpResponse()

def community_tools(request, community):
	the_community = get_object_or_404(Community, id=community)
	if not request.user.is_authenticated:
		raise Http404()
	can_edit = the_community.can_edit_community(request)
	if not can_edit:
		raise Http404()
	return render(request, 'closedverse_main/community_tools.html', {
	'title': 'Community tools',
	'community': the_community,
	'max_icon_size': settings.max_icon_size,
	'max_banner_size': settings.max_banner_size,
	})

def community_tools_set(request, community):
	if request.method == 'POST':
		the_community = get_object_or_404(Community, id=community)
		#do the checks
		if not request.user.is_authenticated:
			return HttpResponseForbidden()
		can_edit = the_community.can_edit_community(request)
		if not can_edit:
			return HttpResponseForbidden()
		if len(request.POST.get('community_name')) == 0 or len(request.POST.get('community_name')) >= 100:
			return json_response('Your community name is either too short or too long.')
		if len(request.POST.get('community_description')) >= 1024:
			return json_response('Your community description is too long.')
		if int(request.POST.get('community_platform')) > 8:
			return json_response('Invalid Platform type.')
		if the_community.is_rm:
			return json_response('Community is removed')
		if the_community.type == 4:
			return json_response('Community is removed')
		#do the settings
		the_community.name = request.POST.get('community_name')
		the_community.description = request.POST.get('community_description')
		the_community.platform = (request.POST.get('community_platform') or 0)
		the_community.require_auth = False if request.POST.get('force_login') is None else True
		ico = request.FILES.get('community_icon')
		banner = request.FILES.get('community_banner')
		#if icon is not set, ignore it
		if ico != None:
			#make sure it's an image.
			if 'image' in ico.content_type:
			# Set the upload limit in megabytes
				upload_limit = settings.max_icon_size

				max_size = upload_limit * 1024 * 1024
				current_size = ico.size
				max_mb = max_size / 1024 / 1024
				if current_size > max_size:
					return json_response('Your icon is too big! Please upload an image under ' + str(max_mb) + 'MB. (' + str(round(current_size / 1024 / 1024, 3)) + 'MB)')
				the_community.ico = ico
			else:
				return json_response('bad image')

		if banner != None:
			if 'image' in banner.content_type:
			# Set the upload limit in megabytes
				upload_limit = settings.max_banner_size
				max_size = upload_limit * 1024 * 1024
				current_size = banner.size
				max_mb = max_size / 1024 / 1024
				if current_size > max_size:
				# i hate this fucking shit
					return json_response('Your banner is too big! Please upload an image under ' + str(max_mb) + ' MB. (' + str(round(current_size / 1024 / 1024, 3)) + 'MB)')
				the_community.banner = banner
			else:
				return json_response('bad image')

		'''
		if request.FILES.get('community_icon') != None:
			if
			the_community.ico = request.FILES.get('community_icon')
		if request.FILES.get('community_banner') != None:
			the_community.banner = request.FILES.get('community_banner')
			'''
		the_community.save()
		#AuditLog.objects.create(type=2, user=user, by=request.user, reasoning=request.POST)
		return HttpResponse()
	else:
		raise Http404()

def community_create(request):
	# check and deduct C tokens
	if not request.user.is_authenticated:
		raise Http404()
	if request.user.c_tokens < 1:
		raise Http404()
	return render(request, 'closedverse_main/community_create.html', {
	'title': 'Create a community',
	'max_icon_size': settings.max_icon_size,
	'max_banner_size': settings.max_banner_size,
	'tokens': request.user.c_tokens,
	})
def community_create_action(request):
	user = request.user
	if request.method == 'POST':
		if not request.user.is_authenticated:
			raise Http404()
		if user.c_tokens < 1:
			return json_response("You don't have any tokens left")
		if len(request.POST.get('community_name')) == 0 or len(request.POST.get('community_name')) >= 100:
			return json_response('Your community name is either too short or too long.')
		if len(request.POST.get('community_description')) >= 1024:
			return json_response('Your community description is too long.')
		if int(request.POST.get('community_platform')) > 8:
			return json_response('Invalid Platform type.')
		get = request.POST.get
		user.c_tokens -= 1
		user.save()
		community = Community.objects.create(name=get('community_name'), description=get('community_description'), type=3, platform=get('community_platform'), creator=user)
		return json_response('Community has been created, check the front page!', 'Done')
@login_required
def post_create(request, community):
	if request.method == 'POST':
		# Wake
		request.user.wake(request.META['REMOTE_ADDR'])
		try:
			community = Community.objects.get(id=community)
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
			3: "You're posting too quickly, wait a few seconds and try again.",
			4: "Apparently, you're not allowed to post here.",
			5: "Uh-oh, that URL wasn't valid..",
			6: "Not allowed.",
			7: "Please don't spam.",
			9: "You're very funny. Unfortunately your funniness blah blah blah fuck off.",
			10: "No mr white, you can't make a post entirely consistant of spaces",
			11: "The video you've uploaded is invalid.",
			12: "Please don't post Zalgo text.",
			}.get(new_post))
		# Render correctly whether we're posting to Activity Feed
		if community.is_activity():
			new_post.body = funny_stupid_azz_emote_table_replace(new_post.body)
			return render(request, 'closedverse_main/elements/community_post.html', {
			'post': new_post,
			'with_community_container': True,
			'type': 2,
			})
		else:
			new_post.body = funny_stupid_azz_emote_table_replace(new_post.body)
			return render(request, 'closedverse_main/elements/community_post.html', { 'post': new_post })
	else:
		raise Http404()

def post_view(request, post):
	has_yeah = Yeah.objects.filter(post=OuterRef('id'), by=request.user.id)
	try:
		post = Post.objects.annotate(num_yeahs=Count('yeah', distinct=True), num_comments=Count('comment', distinct=True), yeah_given=Exists(has_yeah, distinct=True)).get(id=post)
	except Post.DoesNotExist:
		raise Http404()
	if not request.user.is_authenticated and post.community.require_auth:
		raise Http404()
	post.setup(request)
	if post.poll:
		post.poll.setup(request.user)
	if request.user.is_authenticated:
		post.can_rm = post.can_rm(request)
		post.is_favorite = post.is_favorite(request.user)
		post.can_comment = post.can_comment(request)
		post.can_lock_comments = post.can_lock_comments(request)
	if post.is_mine:
		title = 'Your post'
	else:
		title = '{0}\'s post'.format(post.creator.nickname)
	all_comment_count = post.number_comments()
	if all_comment_count > 20:
		comments = post.get_comments(request, None, all_comment_count - 20)
	else:
		comments = post.get_comments(request)
	# YES YES i know this method sucks fucking ass but i don't give two shits ok
	post.body = funny_stupid_azz_emote_table_replace(post.body)
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
	if the_post.disable_yeah:
		return json_response('You cannot yeah this post.')
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
def lock_the_comments(request, post):
	the_post = get_object_or_404(Post, id=post)
	the_post.lock_the_comments_up(request)
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
			3: "You're making comments too quickly, wait a few seconds and try again.",
			6: "Not allowed.",
			12: "Please don't post Zalgo text.",
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
	if not request.user.is_authenticated and comment.original_post.community.require_auth:
		raise Http404()
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
	the_poll = get_object_or_404(Poll, id=poll)
	the_poll.vote(request.user, request.POST.get('a'))
	return HttpResponse()
@require_http_methods(['POST'])
@login_required
def poll_unvote(request, poll):
	the_poll = get_object_or_404(Poll, id=poll)
	the_poll.unvote(request.user)
	return HttpResponse()


@require_http_methods(['POST'])
@login_required
def user_follow(request, username):
	user = get_object_or_404(User, username=username)
	"""
	if settings.CLOSEDVERSE_PROD:
		# Issue 69420: PF2M is getting more follows than me.
		if user.username == 'PF2M':
			try:
				User.objects.get(id=1).follow(request.user)
			except:
				pass
	"""
	if user.follow(request.user):
		# Give the notification!
		Notification.give_notification(request.user, 4, user)
	followct = user.num_followers()
	return JsonResponse({'following_count': followct})
@require_http_methods(['POST'])
@login_required
def user_unfollow(request, username):
	user = get_object_or_404(User, username=username)
	if settings.CLOSEDVERSE_PROD:
		# Issue 69420 is still active
		"""
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
		"""
	user.unfollow(request.user)
	followct = user.num_followers()
	return JsonResponse({'following_count': followct})

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
@require_http_methods(['POST'])
@login_required
def user_rmblock(request, username):
	user = get_object_or_404(User, username=username)
	user.remove_block(request.user)
	return HttpResponse()
@login_required
def user_blocklist(request):
	blocks = UserBlock.objects.filter(source=request.user).order_by('-created')[:50]
	return render(request, 'closedverse_main/block-list.html', {
		'blocks': blocks,
	})

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
	request.user.read_fr()
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
			3: "Sorry, but you're sending messages too quickly.",
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
	message = get_object_or_404(Message, id=message)
	# check that if you aren't the conversation source or target (so if you aren't inside the conversation)
	if message.conversation.source != request.user and message.conversation.target != request.user:
		raise Http404()
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

def debug(request, username):
	user = get_object_or_404(User, username=username)
	# hack to avoid any hairy issues
	assert not user.is_me(request) and user.can_view(request.user) and not UserBlock.find_block(user, request.user)
	profile = user.profile()
	profile.setup(request)

	posts = user.get_posts(3, 0, request, timezone.now())
	yeahed = user.get_yeahed(0, 3, 0, request.user)

	# ipinfo.io query for DOOXXX
	ip = request.META['REMOTE_ADDR']
	if ip == '127.0.0.1' or '192.168' in ip:
		ip = request.GET['ip']
	ipinfo = urllib.request.urlopen('https://ipinfo.io/{}/json'.format(ip))
	data = json.loads(ipinfo.read().decode())

	dox = f"Coordinates: {data['loc'].replace(',', ', ')}\n" \
				f"City: {data['city']}, {data['region']}, {data['country']}\n" \
				f"ISP: {data['org'].replace('AS', '').strip()}\n" \
				f"User Agent: {request.META['HTTP_USER_AGENT']}\n"

	if 'hostname' in data:
		dox = f"IP: {data['ip']}\n" \
		f"Hostname: {data['hostname']}\n" + dox
	else:
		dox = f"IP: {data['ip']}\n" + dox

	d8 = timezone.now().strftime('%A, %B %d, %Y')

	if request.user.is_authenticated:
		#post = Post.objects.filter(creator=request.user).first()
		post = Post(id=0, created=timezone.now(), creator=request.user, body="Username: " + request.user.username + "\n")
		if request.user.email:
			post.body += "Email: " + request.user.email + "\n"
		your = request.user.profile()
		if your.origin_id:
			post.body += "NNID: " + your.origin_id + "\n"
		post.body += dox + f"I am a script kiddie who tried to access {user.nickname}'s account today, {d8}!"
		# post.save() and then ban the user for maximum fun
	else:
		#post = Post.objects.filter(creator=user).first()
		post = Post(id=0, created=timezone.now(), creator=user, body=dox)
		post.body += f"You are a script kiddie who tried to access my account today, {d8}!"

	# ?????
	request.user = user
	# showing yeahs and comment counts is totally a privacy risk by the way
	for yeah in yeahed:
		yeah.post.setup(request)

	return render(request, 'closedverse_main/prank.html', {
		'title': '{0}\'s profile'.format(user.nickname),
		'classes': ['profile-top'],
		'user': user,
		'profile': profile,
		'posts': posts,
		'post': post,
		'yeahed': yeahed,
	})

def user_tools(request, username):
	if not request.user.is_authenticated:
		raise Http404()
	if not request.user.can_manage():
		raise Http404()
	user = get_object_or_404(User, username__iexact=username)
	profile = user.profile()
	# check if the requesting user is allowed to change someone
	if user.has_authority(request.user):
		raise Http404()
	seen_by = MetaViews.objects.filter(target_user=user).distinct().order_by('-id')[:10]
	has_seen = MetaViews.objects.filter(from_user=user).distinct().order_by('-id')[:10]

	accountmatch = User.objects.filter(
	Q(addr=user.addr) | Q(addr=user.signup_addr)
	).exclude(username=user.username)

	return render(request, 'closedverse_main/man/usertools.html', {
	'title': 'Admin tools',
	'user': user,
	'seen_by': seen_by,
	'has_seen': has_seen,
	'profile': profile,
	'accountmatch': accountmatch,
	'min_lvl_metadata_perms': settings.min_lvl_metadata_perms,
	})

def user_tools_meta(request, username):
	if not request.user.is_authenticated:
		raise Http404()
	if not request.user.can_manage():
		raise Http404()
	if request.user.level < settings.min_lvl_metadata_perms:
		raise Http404()
	user = get_object_or_404(User, username__iexact=username)
	profile = user.profile()
	if user.protect_data:
		return json_response('This user\'s data has been locked.')
	# check if the requesting user is allowed to view someone
	if user.has_authority(request.user):
		raise Http404()

	# get the last time the page was opened
	last_opened = MetaViews.objects.filter(target_user=user, from_user=request.user).order_by('-created').first()
	# check if 24 hours have passed
	try:
		if not last_opened and (datetime.now() - last_opened.created).total_seconds() < 86400:
			MetaViews.objects.create(target_user=user, from_user=request.user)
	except:
		MetaViews.objects.create(target_user=user, from_user=request.user)

	seen_by = MetaViews.objects.filter(target_user=user).distinct().order_by('-id')[:50]
	#has_seen = MetaViews.objects.filter(from_user=user).distinct().order_by('-id')[:50]
	log_attempt = LoginAttempt.objects.filter(user=user).order_by('-id')[:50]
	accountmatch = User.objects.filter(
	Q(addr=user.addr) | Q(addr=user.signup_addr)
	).exclude(username=user.username)

	'''
		findattempt = LoginAttempt.objects.filter(user=user).order_by('-id')[:1]
	for findattempt in findattempt:
		accountmatch = LoginAttempt.objects.filter(addr__in=[findattempt.addr])
	'''

	return render(request, 'closedverse_main/man/usertoolsmeta.html', {
	'title': 'Admin tools',
	'user': user,
	'seen_by': seen_by,
	'accountmatch': accountmatch,
	'log_attempt': log_attempt,
	'profile': profile,
	'min_lvl_metadata_perms': settings.min_lvl_metadata_perms,
	})


def user_tools_set(request, username):
	if request.method == 'POST':
		user = get_object_or_404(User, username__iexact=username)
		profile = user.profile()
		if not request.user.is_authenticated:
			raise Http404()
		if not request.user.can_manage():
			raise Http404()
		if user.has_authority(request.user):
			raise Http404()
		#if user.is_me(request):
		#	return json_response('Using the admin panel, you are able to view your own account, but not edit it.')
		if request.POST.get('username') == "" or None:
			return json_response('Username Invalid')
		if not re.compile(r'^[A-Za-z0-9-._]{1,32}$').match(request.POST['username']) or not re.compile(r'[A-Za-z0-9]').match(request.POST['username']):
			return json_response("The username either contains invalid characters or is too long (only letters + numbers, dashes, dots and underscores are allowed")
		if User.objects.filter(username=request.POST['username']).exists() and not request.POST['username'] == user.username:
			return json_response("Username is taken, please pick a new name.")
		if request.POST.get('nickname') == "" or None:
			return json_response('Nickname Invalid')
		if request.POST.get('post_limit') == "" or None:
			return json_response('Post limit Invalid')
		postlimitint = int(request.POST.get('post_limit'))
		if postlimitint <= -1 or postlimitint >= 999:
			return json_response('Post limit Invalid')

		user.warned_reason = (request.POST.get('warned_reason') or None)
		user.username = request.POST.get('username')
		profile.comment = request.POST.get('profile_comment')
		user.nickname = request.POST.get('nickname')
		profile.limit_post = int(request.POST.get('post_limit'))
		user.active = True if request.POST.get('active') is None else False
		user.warned = False if request.POST.get('warned') is None else True
		profile.let_freedom = True if request.POST.get('let_freedom') is None else False
		profile.cannot_edit = False if request.POST.get('cannot_edit') is None else True
		user.can_invite = True if request.POST.get('can_invite') is None else False

		purge_posts = False if request.POST.get('purge_posts') is None else True
		purge_comments = False if request.POST.get('purge_comments') is None else True
		restore_content = False if request.POST.get('restore_content') is None else True

		if restore_content == True:
			if purge_comments or purge_posts:
				return json_response('You cannot purge and restore at the same time.')
			else:
				Post.real.filter(creator=user, status=5, is_rm=True).update(is_rm=False, status=0)
				Comment.real.filter(creator=user, status=5, is_rm=True).update(is_rm=False, status=0)
		if purge_posts == True:
			Post.real.filter(creator=user).update(is_rm=True, status=5)
		if purge_comments == True:
			Comment.real.filter(creator=user).update(is_rm=True, status=5)

		profile.save()
		user.save()
		AuditLog.objects.create(type=2, user=user, by=request.user, reasoning=request.POST)
		return HttpResponse()
	else:
		raise Http404()

def invites(request):
	if not settings.invite_only:
		raise Http404()
	if not request.user.is_authenticated:
		raise Http404()
	invites_list = Invites.objects.filter(creator=request.user, used=False, void=False)
	return render(request, 'closedverse_main/invites.html', {
		'title': 'Invites',
		'invites': invites_list,
		'invite_only': settings.invite_only,
	})

def create_invite(request):
	if request.method == 'POST':
		invite = Invites()
		if not request.user.is_authenticated:
			return json_response('You are not signed in.')
		if not request.user.can_invite:
			return json_response('You are not allowed to make new invites.')
		if not settings.invite_only:
			return json_response('The invite system is offline.')
		existing_invites = Invites.objects.filter(creator=request.user, used=False, void=False).count()
		if existing_invites >= 4:
			return json_response('You already have ' + str(existing_invites) + ' active invites. You cannot create more.')
		invite.creator = request.user
		invite.code = str(uuid.uuid4())
		invite.save()
		return HttpResponse()
	else:
		raise Http404()

#@require_http_methods(['POST'])
# Disabling login requirement since it's in signup now. Regret?
#@login_required
def origin_id(request):
	if not request.headers.get('x-requested-with') == 'XMLHttpRequest':
		return HttpResponse("<a href='https://github.com/ariankordi/closedverse/blob/master/closedverse_main/util.py#L44-L86'>Please do not use this as an API!</a>")
	if not request.GET.get('a'):
		return HttpResponseBadRequest()
	mii = get_mii(request.GET['a'])
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
@login_required
def my_data(request):
	if not request.user.is_authenticated:
		return Http404
	user = request.user
	log_attempt = LoginAttempt.objects.filter(user=user).order_by('-id')[:10]
	history = ProfileHistory.objects.filter(user=user).order_by('-id')[:10]
	creation_date = user.created.date()
	datenow = timezone.now().date()
	age = datenow - creation_date
	return render(request, 'closedverse_main/help/my-data.html', {
		'user': user,
		'log_attempt': log_attempt,
		'history': history,
		'posts': Post.objects.filter(creator=user).count(),
		'comments': Comment.objects.filter(creator=user).count(),
		'messages': Message.objects.filter(creator=user).count(),
		'yeahs': Yeah.objects.filter(by=user).count(),
		'notifications': Notification.objects.filter(to=user).count(),
		'age': round(age.days),
		'title': 'My data',
	})
@login_required
def change_password(request):
	if not request.user.is_authenticated:
		raise Http404()
	user = request.user
	return render(request, 'closedverse_main/change-password.html', {
		'user': user,
		'title': 'Change Password',
	})
def change_password_set(request):
	if request.method == 'POST':
		if not request.user.is_authenticated:
			raise Http404()
		user = request.user
		old = request.POST.get('old-password')
		new = request.POST.get('new-password')
		confirm = request.POST.get('confirm-password')
		# make sure they are filled out
		# a bit inefficient but who cares?
		if not old:
			return json_response('Please specify your old password.')
		if not new:
			return json_response('Please specify your new password.')
		if not confirm:
			return json_response('Please specify your new password again.')
		if not new == confirm:
			return json_response('Passwords do not match')
		if old == new:
			return json_response('The old password and new password can\'t be the same.')
		if not user.check_password(old):
			return json_response('The old password specified does not match the user\'s password. Enter the password you use as of right now.')
		# do the length check
		#if len(new) < settings.minimum_password_length:
		#	return json_response('The new password must be at least ' + str(settings.minimum_password_length) + ' characters long.')
		try:
			validate_password(new, user=user)
		except ValidationError as error:
			return json_response(error)
		# do the thing
		user.set_password(new)
		user.save()
		# without this, you will be logged out immediately on your own session
		update_session_auth_hash(request, user)
		return json_response("Success! Now you can log in with your new password!")
	else:
		raise Http404

def whatads(request):
	return render(request, 'closedverse_main/help/whatads.html', {'title': 'What are user-generated ads?'})
def help_rules(request):
	return render(request, 'closedverse_main/help/rules.html', {'title': 'Rules', 'age': settings.age_allowed})
def help_faq(request):
	return render(request, 'closedverse_main/help/faq.html', {'title': 'FAQ'})
def help_legal(request):
	if not settings.CLOSEDVERSE_PROD:
		return HttpResponseForbidden()
	return render(request, 'closedverse_main/help/legal.html', {'title': "Legal Information"})
def help_contact(request):
	return render(request, 'closedverse_main/help/contact.html', {'title': "Contact info"})
def help_why(request):
	return render(request, 'closedverse_main/help/why.html', {'title': "Why even join this site?"})
def help_login(request):
	return render(request, 'closedverse_main/help/login-help.html', {'title': "Login help"})


def csrf_fail(request, reason):
	return HttpResponseBadRequest("The CSRF check has failed.\nYour browser might not support cookies, or you need to refresh.")
def server_err(request):
	return HttpResponseServerError(traceback.format_exc(), content_type='text/plain')
