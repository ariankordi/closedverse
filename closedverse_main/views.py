from django.http import HttpResponse, HttpResponseNotFound, HttpResponseBadRequest, HttpResponseForbidden, JsonResponse
from django.shortcuts import render, redirect
from django.http import Http404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from .models import User, Community, Post, Comment, Yeah, Profile
from .util import get_mii, recaptcha_verify
from closedverse import settings
import re
from json import dumps

def json_response(msg='', code=0, httperr=400):
	thing = {
	'success': False,
	'errors': [
			{
			'message': msg,
			'error_code': code,
			}
		],
	'code': httperr,
	}
	return JsonResponse(thing, safe=False, status=400)

def community_list(request):
	obj = Community.objects
	if request.user.is_authenticated:
		classes = ['guest-top']
	else:
		classes = []
	return render(request, 'closedverse_main/community_list.html', {
		'title': 'Communities',
		'classes': classes,
		'general': obj.filter(type=0).order_by('-created')[0:6],
		'game': obj.filter(type=1).order_by('-created')[0:6],
		'special': obj.filter(type=2).order_by('-created')[0:6],
	})

def login_page(request):
	if request.method == 'POST':
		# If we don't have all of the POST parameters we want..
		if not (request.POST['username'] and request.POST['password']): 
		# then return that.
			return HttpResponseBadRequest("You didn't fill in all of the fields.")
		# Now let's authenticate.
		user = authenticate(username=request.POST['username'], password=request.POST['password'])
		if not user:
			return HttpResponse("Invalid username or password.", status=401)
		if not user.is_active():
			return HttpResponseForbidden("This user isn't active.")
		login(request, user)
		
		# Then, let's get the referrer and either return that or the root.
		# Actually, let's not for now.
		#if request.META['HTTP_REFERER'] and "login" not in request.META['HTTP_REFERER'] and request.META['HTTP_HOST'] in request.META['HTTP_REFERER']:
		#	location = request.META['HTTP_REFERER']
		#else:
		location = "/"
		return HttpResponse(location)
	else:
		return render(request, 'closedverse_main/login_page.html', {
			'title': 'Log in',
			'classes': ['no-login-btn']
		})
def signup_page(request):
	if request.method == 'POST':
		if settings.recaptcha_pub:
			if not recaptcha_verify(request, settings.recaptcha_priv):
				return HttpResponse("The reCAPTCHA validation has failed.", status=402)
		if not (request.POST['username'] and request.POST['password'] and request.POST['password_again']):
			return HttpResponseBadRequest("You didn't fill in all of the required fields.")
		if not re.compile('^[A-Za-z0-9-._]{4,32}$').match(request.POST['username']):
			return HttpResponseBadRequest("Your username either contains invalid characters or is too long.")
		try:
			al_exist = User.objects.get(username=request.POST['username'])
		except User.DoesNotExist:
			al_exist = None
		if al_exist:
			return HttpResponseBadRequest("A user with that username already exists.")
		if not request.POST['password'] == request.POST['password_again']:
			return HttpResponseBadRequest("Your passwords don't match.")
		if not (request.POST['nickname'] or request.POST['origin_id']):
			return HttpResponseBadRequest("You didn't fill in an NNID, so you need a nickname.")
		if request.POST['nickname'] and len(request.POST['nickname']) > 32:
			return HttpResponseBadRequest("Your nickname is either too long or too short (4-16 characters)")
		if request.POST['origin_id'] and (len(request.POST['origin_id']) > 16 or len(request.POST['origin_id']) < 6):
			return HttpResponseBadRequest("The NNID provided is either too short or too long.")
		if request.POST['origin_id']:
			mii = get_mii(request.POST['origin_id'])
			if not mii:
				return HttpResponseBadRequest("The NNID provided doesn't exist.")
			nick = mii[1]
		else:
			nick = request.POST['nickname']
			mii = None
		make = User.objects.closed_create_user(request.POST['username'], request.POST['password'], request.META['REMOTE_ADDR'], nick, mii)
		Profile.objects.create(user=make)
		login(request, make)
		return HttpResponse("/")
	else:
		if not settings.recaptcha_pub:
			settings.recaptcha_pub = None
		return render(request, 'closedverse_main/signup_page.html', {
			'title': 'Sign up',
			'recaptcha': settings.recaptcha_pub,
			'classes': ['no-login-btn'],
		})

def logout_page(request):
	logout(request)
	return redirect('/')

def user_view(request, username):
	try:
		user = User.objects.get(username=username)
	except User.DoesNotExist:
		raise Http404()
	if user.is_me(request):
		title = 'My profile'
	else:
		title = '{0}\'s profile'.format(user.nickname)
	profile = user.profile()
	posts = user.get_posts(3, 0, request)
	yeahed = user.get_yeahed(0, 3)
	for yeah in yeahed:
		yeah.post.has_yeah, yeah.post.can_yeah, yeah.post.is_mine = yeah.post.has_yeah(request), yeah.post.can_yeah(request), yeah.post.is_mine(request)
	return render(request, 'closedverse_main/user_view.html', {
		'title': title,
		'classes': ['profile-top'],
		'user': user,
		'profile': profile,
		'posts': posts,
		'yeahed': yeahed,
	})

def user_posts(request, username):
	try:
		user = User.objects.get(username=username)
	except User.DoesNotExist:
		raise Http404()
	if user.is_me(request):
		title = 'My posts'
	else:
		title = '{0}\'s posts'.format(user.nickname)
	profile = user.profile()
	
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
		})
def user_yeahs(request, username):
	try:
		user = User.objects.get(username=username)
	except User.DoesNotExist:
		raise Http404()
	if user.is_me(request):
		title = 'My yeahs'
	else:
		title = '{0}\'s yeahs'.format(user.nickname)
	profile = user.profile()
	
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
			posts.append(yeah.comment)
		else:
			posts.append(yeah.post)
	for post in posts:
		post.has_yeah, post.can_yeah, post.is_mine = post.has_yeah(request), post.can_yeah(request), post.is_mine(request)
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

def user_following(request, username):
	try:
		user = User.objects.get(username=username)
	except User.DoesNotExist:
		raise Http404()
	if user.is_me(request):
		title = 'My follows'
	else:
		title = '{0}\'s follows'.format(user.nickname)
	profile = user.profile()
	# Todo user_follows.html
def user_followers(request, username):
	try:
		user = User.objects.get(username=username)
	except User.DoesNotExist:
		raise Http404()
	if user.is_me(request):
		title = 'My followers'
	else:
		title = '{0}\'s followers'.format(user.nickname)
	profile = user.profile()
	followers = profile.get_followers()
	return render(request, 'closedverse_main/user_followers.html', {
			'user': user,
			'title': title,
			'profile': profile,
			'followers': followers,
		})
	# Todo user_follows.html

@login_required
def profile_settings(request):
	profile = request.user.profile()
	if request.method == 'POST':
		return HttpResponseBadRequest('cock suck')
	return render(request, 'closedverse_main/profile-settings.html', {
		'title': 'Profile settings',
		'user': request.user,
		'profile': profile,
	})

def community_view(request, community):
	try:
		communities = Community.objects.get(id=community)
	except Community.DoesNotExist:
		raise Http404()
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
			'community': communities,
			'posts': posts,
			'next': next_offset,
		})
@login_required
def post_create(request, community):
	if request.method == 'POST':
		if not (request.POST['community'] and request.POST['body'] and request.POST['feeling_id']):
			return HttpResponseBadRequest('')
		try:
			community = Community.objects.get(id=community, unique_id=request.POST['community'])
		except (Community.DoesNotExist, ValueError):
			return HttpResponseNotFound('')
		# Method of Community
		new_post = community.create_post(request)
		if not new_post:
			return HttpResponseBadRequest('')
		if isinstance(new_post, int):
			return json_response({
			1: "Your post is too long ("+str(len(request.POST['body']))+" characters, 2200 max).",
			}.get(new_post))
		return render(request, 'closedverse_main/elements/community_post.html', { 'post': new_post })
	else:
		raise Http404()

def post_view(request, post):
	try:
		post = Post.objects.get(id=post)
	except (Post.DoesNotExist, ValueError):
		raise Http404()
	post.has_yeah, post.can_yeah, post.is_mine = post.has_yeah(request), post.can_yeah(request), post.is_mine(request)
	if post.is_mine:
		title = 'Your post'
	else:
		title = '{0}\'s post'.format(post.creator.nickname)
	comments = post.get_comments(request)
	return render(request, 'closedverse_main/post-view.html', {
		'title': title,
		'post': post,
		'yeahs': post.get_yeahs(request),
		'comments': comments,
	})
@login_required
def post_add_yeah(request, post):
	try:
		the_post = Post.objects.get(id=post)
	except (Post.DoesNotExist, ValueError):
		return HttpResponseNotFound('')
	the_post.give_yeah(request)
	return HttpResponse('')
@login_required
def post_delete_yeah(request, post):
	try:
		the_post = Post.objects.get(id=post)
	except (Post.DoesNotExist, ValueError):
		return HttpResponseNotFound('')
	the_post.remove_yeah(request)
	return HttpResponse('')
@login_required
def post_comments(request, post):
	if request.method == 'POST':
		if not (request.POST['body'] and request.POST['feeling_id']):
			return HttpResponseBadRequest('')
		try:
			post = Post.objects.get(id=post)
		except (Post.DoesNotExist, ValueError):
			return HttpResponseNotFound('')
		# Method of Post
		new_post = post.create_comment(request)
		if not new_post:
			return HttpResponseBadRequest('')
		if isinstance(new_post, int):
			return json_response({
			1: "Your comment is too long ("+str(len(request.POST['body']))+" characters, 2200 max).",
			}.get(new_post))
		return render(request, 'closedverse_main/elements/post-comment.html', { 'comment': new_post })
	else:
		raise Http404()

def comment_view(request, comment):
	try:
		comment = Comment.objects.get(id=comment)
	except (Comment.DoesNotExist, ValueError):
		raise Http404()
	comment.has_yeah, comment.can_yeah, comment.is_mine = comment.has_yeah(request), comment.can_yeah(request), comment.is_mine(request)
	if comment.is_mine:
		title = 'Your comment'
	else:
		title = '{0}\'s comment'.format(comment.creator.nickname)
	if comment.original_post.is_mine(request):
		title += ' on your post'
	else:
		title += ' on {0}\'s post'.format(comment.original_post.creator.nickname)
	return render(request, 'closedverse_main/comment-view.html', {
		'title': title,
		'comment': comment,
		'yeahs': comment.get_yeahs(request),
	})
@login_required
def comment_add_yeah(request, comment):
	try:
		the_post = Comment.objects.get(id=comment)
	except (Comment.DoesNotExist, ValueError):
		return HttpResponseNotFound('')
	the_post.give_yeah(request)
	return HttpResponse('')
@login_required
def comment_delete_yeah(request, comment):
	try:
		the_post = Comment.objects.get(id=comment)
	except (Comment.DoesNotExist, ValueError):
		return HttpResponseNotFound('')
	the_post.remove_yeah(request)
	return HttpResponse('')
@login_required
def user_follow(request, username):
	try:
		user = User.objects.get(username=username)
	except User.DoesNotExist:
		return HttpResponseNotFound('')
	user.follow(request.user)
	return HttpResponse('')
@login_required
def user_unfollow(request, username):
	try:
		user = User.objects.get(username=username)
	except User.DoesNotExist:
		return HttpResponseNotFound('')
	user.unfollow(request.user)
	return HttpResponse('')




def test_page(request):
	number = int(request.session.get("no", 0)) + 1
	request.session['no'] = number
	return HttpResponse("""
	""" + str(number) + """<br><br>
	<img src="/s/img/menu-logo.png">
	""")
