from django.http import HttpResponse, HttpResponseNotFound, HttpResponseBadRequest, HttpResponseForbidden, JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.http import Http404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from .models import User, Community, Post, Comment, Yeah, Profile, Notification, Complaint, FriendRequest, Friendship
from .util import get_mii, recaptcha_verify
from closedverse import settings
import re
from django.urls import reverse
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
		'PROD': settings.PROD,
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
		location = '/'
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
		if not re.compile(r'^[A-Za-z0-9-._]{4,32}$').match(request.POST['username']):
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
	user = get_object_or_404(User, username=username)
	if user.is_me(request):
		title = 'My profile'
	else:
		title = '{0}\'s profile'.format(user.nickname)
	profile = user.profile()
	posts = user.get_posts(3, 0, request)
	yeahed = user.get_yeahed(0, 3)
	for yeah in yeahed:
		yeah.post.has_yeah, yeah.post.can_yeah, yeah.post.is_mine = yeah.post.has_yeah(request), yeah.post.can_yeah(request), yeah.post.is_mine(request)
	fr = None
	if request.user.is_authenticated:
		user.friend_state = user.friend_state(request.user)
		if user.friend_state == 2:
			fr = user.get_fr(request.user)[0]

	return render(request, 'closedverse_main/user_view.html', {
		'title': title,
		'classes': ['profile-top'],
		'user': user,
		'profile': profile,
		'posts': posts,
		'yeahed': yeahed,
		'fr': fr,
	})

def user_posts(request, username):
	user = get_object_or_404(User, username=username)
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
	user = get_object_or_404(User, username=username)
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
	user = get_object_or_404(User, username=username)
	if user.is_me(request):
		title = 'My follows'
	else:
		title = '{0}\'s follows'.format(user.nickname)
	profile = user.profile()

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
			return render(request, 'closedverse_main/elements/profile-user-list.html', {
			'users': following,
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
	user = get_object_or_404(User, username=username)
	if user.is_me(request):
		title = 'My followers'
	else:
		title = '{0}\'s followers'.format(user.nickname)
	profile = user.profile()

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
			return render(request, 'closedverse_main/elements/profile-user-list.html', {
			'users': followers,
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
	user = get_object_or_404(User, username=username)
	if user.is_me(request):
		title = 'My friends'
	else:
		title = '{0}\'s friends'.format(user.nickname)
	profile = user.profile()

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
	if request.META.get('HTTP_X_AUTOPAGERIZE'):
			return render(request, 'closedverse_main/elements/profile-user-list.html', {
			'users': friends,
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
	profile = request.user.profile()
	user = request.user
	if request.method == 'POST':
		if len(request.POST.get('screen_name')) > 32 or not request.POST.get('screen_name'):
			return json_response('Nickname is too long or too short (length '+str(len(request.POST.get('screen_name')))+', max 32)')
		if len(request.POST.get('profile_comment')) > 2200:
			return json_response('Profile comment is too long (length '+str(len(request.POST.get('profile_comment')))+', max 2200)')
		if len(request.POST.get('country')) > 255:
			return json_response('Region is too long (length '+str(len(request.POST.get('country')))+', max 255)')
		if len(request.POST.get('website')) > 255:
			return json_response('Web URL is too long (length '+str(len(request.POST.get('website')))+', max 255)')
		if len(request.POST.get('avatar')) > 255:
			return json_response('Avatar is too long (length '+str(len(request.POST.get('avatar')))+', max 255)')
		profile.avatar = request.POST.get('avatar')
		profile.country = request.POST.get('country')
		profile.weblink = request.POST.get('website')
		profile.comment = request.POST.get('profile_comment')
		profile.relationship_visibility = (request.POST.get('relationship_visibility') or 0)
		profile.id_visibility = (request.POST.get('id_visibility') or 0)
		user.nickname = request.POST.get('screen_name')
		profile.save()
		user.save()
		return HttpResponse()
	return render(request, 'closedverse_main/profile-settings.html', {
		'title': 'Profile settings',
		'user': user,
		'profile': profile,
	})

def special_community_tag(request, tag):
	communities = get_object_or_404(Community, tags=tag)
	return redirect(reverse('main:community-view', args=[communities.id]))

def community_view(request, community):
	communities = get_object_or_404(Community, id=community)
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
		})
@login_required
def post_create(request, community):
	if request.method == 'POST':
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
			return json_response({
			1: "Your post is too long ("+str(len(request.POST['body']))+" characters, 2200 max).",
			2: "The image you've uploaded is invalid.",
			}.get(new_post))
		return render(request, 'closedverse_main/elements/community_post.html', { 'post': new_post })
	else:
		raise Http404()

def post_view(request, post):
	post = get_object_or_404(Post, id=post)
	post.has_yeah, post.can_yeah, post.is_mine = post.has_yeah(request), post.can_yeah(request), post.is_mine(request)
	if post.is_mine:
		title = 'Your post'
	else:
		title = '{0}\'s post'.format(post.creator.nickname)
	all_comment_count = post.get_comments().count()
	if all_comment_count > 20:
		comments = post.get_comments(request, None, all_comment_count - 20)
	else:
		comments = post.get_comments(request)
	return render(request, 'closedverse_main/post-view.html', {
		'title': title,
		'post': post,
		'yeahs': post.get_yeahs(request),
		'comments': comments,
		'all_comment_count': all_comment_count,
	})
@login_required
def post_add_yeah(request, post):
	the_post = get_object_or_404(Post, id=post)
	the_post.give_yeah(request)
	# Give the notification!
	Notification.give_notification(request.user, 0, the_post.creator, the_post)
	return HttpResponse()
@login_required
def post_delete_yeah(request, post):
	the_post = get_object_or_404(Post, id=post)
	the_post.remove_yeah(request)
	return HttpResponse()
@login_required
def post_comments(request, post):
	post = get_object_or_404(Post, id=post)
	if request.method == 'POST':
		# Method of Post
		new_post = post.create_comment(request)
		if not new_post:
			return HttpResponseBadRequest()
		if isinstance(new_post, int):
			return json_response({
			1: "Your comment is too long ("+str(len(request.POST['body']))+" characters, 2200 max).",
			2: "The image you've uploaded is invalid.",
			}.get(new_post))
		# Give the notification!
		if post.is_mine(request):
			users = []
			all_comment_count = post.get_comments().count()
			if all_comment_count > 20:
				comments = post.get_comments(request, None, all_comment_count - 20)
			else:
				comments = post.get_comments(request)
			for comment in comments:
				if comment.creator not in users and not comment.creator == request.user:
					users.append(comment.creator)
			for user in users:
				Notification.give_notification(request.user, 3, user, post)
		else:
			Notification.give_notification(request.user, 2, post.creator, post)
		return render(request, 'closedverse_main/elements/post-comment.html', { 'comment': new_post })
	else:
		comment_count = post.get_comments().count()
		if comment_count > 20:
			comments = post.get_comments(request, comment_count - 20, 0)
			return render(request, 'closedverse_main/elements/post_comments.html', { 'comments': comments })
		else:
			return render(request, 'closedverse_main/elements/post_comments.html', { 'comments': post.get_comments(request) })

def comment_view(request, comment):
	comment = get_object_or_404(Comment, id=comment)
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
	the_post = get_object_or_404(Comment, id=comment)
	the_post.give_yeah(request)
	# Give the notification!
	Notification.give_notification(request.user, 1, the_post.creator, None, the_post)
	return HttpResponse()
@login_required
def comment_delete_yeah(request, comment):
	the_post = get_object_or_404(Comment, id=comment)
	the_post.remove_yeah(request)
	return HttpResponse()
@login_required
def user_follow(request, username):
	user = get_object_or_404(User, username=username)
	user.follow(request.user)
	# Give the notification!
	Notification.give_notification(request.user, 4, user)
	return HttpResponse()
@login_required
def user_unfollow(request, username):
	user = get_object_or_404(User, username=username)
	user.unfollow(request.user)
	return HttpResponse()
@login_required
def user_friendrequest_create(request, username):
	user = get_object_or_404(User, username=username)
	if user.friend_state(request.user) == 0:
		if request.POST.get('body'):
			if len(request.POST['body']) > 2200:
				return json_response('Sorry, but you can\'t send that many characters in a friend request ('+str(len(request.POST['body']))+' sent, 2200 max)\nYou can send more characters in a message once you friend them though.')
			user.send_fr(request.user, request.POST['body'])
		else:
			user.send_fr(request.user)
	return HttpResponse()
@login_required
def user_friendrequest_accept(request, username):
	user = get_object_or_404(User, username=username)
	user.accept_fr(request.user)
	return HttpResponse()
@login_required
def user_friendrequest_reject(request, username):
	user = get_object_or_404(User, username=username)
	user.reject_fr(request.user)
	return HttpResponse()
@login_required
def user_friendrequest_cancel(request, username):
	user = get_object_or_404(User, username=username)
	user.cancel_fr(request.user)
	return HttpResponse()
@login_required
def user_friendrequest_delete(request, username):
	user = get_object_or_404(User, username=username)
	user.delete_friend(request.user)
	return HttpResponse()

def check_notifications(request):
	if not request.user.is_authenticated:
		return JsonResponse({'success': True})
	n_count = request.user.notification_count()
	all_count = request.user.get_frs_notif() + n_count
	# n for notifications icon, msg for messages icon
	return JsonResponse({'success': True, 'n': all_count, 'msg': 0})
@login_required
def notification_setread(request):
	update = request.user.notification_read()
	if request.GET.get('fr'):
		request.user.read_fr()
	return HttpResponse()
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

@login_required
def notifications(request):
	notifications = request.user.get_notifications()
	frs = request.user.get_frs_notif()
	return render(request, 'closedverse_main/notifications.html', {
		'title': 'My notifications',
		'notifications': notifications,
		'frs': frs,
	})
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
def activity_feed(request):
	if request.GET.get('my'):
		if request.GET['my'] == 'n':
			request.session['activity_no_my'] = False
		else:
			request.session['activity_no_my'] = True
	if not request.META.get('HTTP_X_REQUESTED_WITH') or request.META.get('HTTP_X_PJAX'):
		return render(request, 'closedverse_main/activity-loading.html', {
			'title': 'Activity Feed',
		})
	if request.session.get('activity_no_my'):
		has_friend = True
	else:
		has_friend = False
	if request.GET.get('offset'):
		posts = request.user.get_activity(20, int(request.GET['offset']), False, has_friend, request)
	else:
		posts = request.user.get_activity(20, 0, False, has_friend, request)
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

def set_lighting(request):
	if not request.session.get('lights', False):
		request.session['lights'] = True
	else:
		request.session['lights'] = False
	return HttpResponse()
@login_required
def help_complaint(request):
	if not request.POST.get('b'):
		return HttpResponseBadRequest()
	if len(request.POST['b']) > 5000:
		# I know that concatenating like this is a bad habit at this point, or I should simply just use formatting, but..
		return json_response('Please do not send that many characters ('+str(len(request.POST['b']))+' characters)')
	if Complaint.has_past_sent(request.user):
		return json_response('Please do not send complaints that quickly (very very sorry, but there\'s a 5 minute wait to prevent spam)')
	save = request.user.complaint_set.create(type=int(request.POST['a']), body=request.POST['b'])
	print(save)
	return HttpResponse()

def help_faq(request):
	return render(request, 'closedverse_main/help/faq.html', {'title': 'FAQ'})
def help_legal(request):
	if not settings.PROD:
		return HttpResponseForbidden()
	return render(request, 'closedverse_main/help/legal.html', {})