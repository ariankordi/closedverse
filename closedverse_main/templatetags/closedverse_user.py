from django import template
register = template.Library()

@register.inclusion_tag('closedverse_main/elements/user-sidebar.html')
# 0 - main, 1 - posts, 2 - yeahs, 3 - friends, 4 - following, 5 - followers
def user_sidebar(request, user, profile, selection=0, general=False, fr=None):
	if user.is_authenticated:
		user.is_following = user.is_following(request.user)
		user.is_me = user.is_me(request)
	return {
		'request': request,
		'user': user,
		'profile': profile,
		'selection': selection,
		'general': general,
		'fr': fr,
	}
@register.inclusion_tag('closedverse_main/elements/user-sidebar-info.html')
def user_sidebar_info(user, profile=None):
	return {
		'user': user,
		'profile': profile,
	}
@register.inclusion_tag('closedverse_main/elements/fr-accept.html')
def fr_accept(fr):
	return {
		'fr': fr,
	}
@register.inclusion_tag('closedverse_main/elements/community_post.html')
def user_post(post, type=0):
	return {
	'post': post,
	'with_community_container': True,
	'type': type,
	}

@register.inclusion_tag('closedverse_main/elements/u-post-list.html')
def u_post_list(posts, next_offset=None, type=2, nf_text=''):
	text = {
	0: "This user hasn't made any posts yet.",
	1: "This user hasn't given a Yeah to any posts yet.",
	2: "No posts yet.",
	3: "This user hasn't made any comments yet.",
	}.get(type, nf_text)
	return {
		'posts': posts,
		'nf': text,
		'next': next_offset,
		'type': type,
	}
@register.inclusion_tag('closedverse_main/elements/profile-post.html')
def profile_post(post):
	return {
		'post': post,
	}
@register.inclusion_tag('closedverse_main/elements/profile-user-list.html')
def profile_user_list(users, next_offset=None, request=None):
	if request:
		for user in users:
			user.is_following = user.is_following(request.user)
	return {
		'users': users,
		'next': next_offset,
		'request': request,
	}
@register.inclusion_tag('closedverse_main/elements/profile-user.html')
def profile_user(user, request):
	return {
		'user': user,
		'request': request,
	}

@register.inclusion_tag('closedverse_main/elements/user-notification.html')
def user_notification(notification, request):
	notification.source.is_following = notification.source.is_following(request.user)
	return {
		'notification': notification,
	}
@register.inclusion_tag('closedverse_main/elements/message.html')
def message(message):
	return {
		'message': message,
	}
@register.inclusion_tag('closedverse_main/elements/message-form.html')
def message_form(request, friend):
	return {
		'user': request.user,
		'friend': friend,
	}
@register.inclusion_tag('closedverse_main/elements/message-list.html')
def message_list(messages, next=0):
	return {
		'messages': messages,
		'next': next,
	}