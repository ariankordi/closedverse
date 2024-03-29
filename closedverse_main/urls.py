from django.conf.urls import url
from django.conf.urls.static import static

from django.shortcuts import redirect

from . import views

from closedverse import settings

username = r'(?P<username>[A-Za-z0-9-\'-._ ]+)'
community = r'(?P<community>[0-9]+)'
post = r'(?P<post>[0-9]+)'
comment = r'(?P<comment>[0-9]+)'
uuidr = r'[0-9a-f\-]'

app_name = 'main'

urlpatterns = [
	# Root
	url(r'^^$|^communities$|^index.*$$', views.community_list, name='community-list'),
	
	# Accounts
	url(r'login/$', views.login_page, name='login'),
	url(r'signup/$', views.signup_page, name='signup'),
	url(r'reset/$', views.forgot_passwd, name='forgot-passwd'),
	url(r'logout/$', views.logout_page, name='logout'),
	# User pages
	url(r'users/'+ username +'/manager$', views.user_manager, name='user-manager'),
	url(r'users/'+ username +'/follow$', views.user_follow, name='user-follow'),
	url(r'users/'+ username +'/unfollow$', views.user_unfollow, name='user-unfollow'),
	url(r'users/'+ username +'$', views.user_view, name='user-view'),
	url(r'users/'+ username +'/posts$', views.user_posts, name='user-posts'),
	url(r'users/'+ username +'/yeahs$', views.user_yeahs, name='user-yeahs'),
	url(r'users/'+ username +'/comments$', views.user_comments, name='user-comments'),
	url(r'users/'+ username +'/following$', views.user_following, name='user-following'),
	url(r'users/'+ username +'/followers$', views.user_followers, name='user-followers'),
	url(r'users/'+ username +'/friends$', views.user_friends, name='user-friends'),
	# User page friends
	url(r'users/'+ username +'/friend_new$', views.user_friendrequest_create, name='user-fr-create'),
	url(r'users/'+ username +'/friend_accept$', views.user_friendrequest_accept, name='user-fr-accept'),
	url(r'users/'+ username +'/friend_reject$', views.user_friendrequest_reject, name='user-fr-reject'),
	url(r'users/'+ username +'/friend_cancel$', views.user_friendrequest_cancel, name='user-fr-cancel'),
	url(r'users/'+ username +'/friend_delete$', views.user_friendrequest_delete, name='user-fr-delete'),
	
	url(r'users/'+ username +'/block$', views.user_addblock, name='user-addblock'),
	# Communities
	url(r'communities.search$', views.community_search, name='community-search'),
	url(r'communities/'+ community +'$', views.community_view, name='community-view'),
	url(r'communities/favorites$', views.community_favorites, name='community-favorites'),
	url(r'communities/all$', views.community_all, name='community-viewall'),
	url(r'communities/(?P<tag>[a-z]+)$', views.special_community_tag, name='special-community-tag'),
	url(r'communities/'+ community +'/favorite$', views.community_favorite_create, name='community-favorite-add'),
	url(r'communities/'+ community +'/favorite_rm$', views.community_favorite_rm, name='community-favorite-rm'),
	url(r'communities/'+ community +'/posts$', views.post_create, name='post-create'),
	# Posts and comments
	# Some of these NAMES (not patterns) are hardcoded into models.py
	url(r'posts/'+ post +'$', views.post_view, name='post-view'),
	url(r'posts/'+ post +'/yeah$', views.post_add_yeah, name='post-add-yeah'),
	url(r'posts/'+ post +'/yeahu$', views.post_delete_yeah, name='post-delete-yeah'),
	url(r'posts/'+ post +'/comments$', views.post_comments, name='post-comments'),
	url(r'posts/'+ post +'/comments$', views.post_comments, name='post-comments'),
	url(r'posts/'+ post +'/change$', views.post_change, name='post-change'),
	url(r'posts/'+ post +'/profile$', views.post_setprofile, name='post-set-profile'),
	url(r'posts/'+ post +'/profile_rm', views.post_unsetprofile, name='post-unset-profile'),
	url(r'posts/'+ post +'\.rm$', views.post_rm, name='post-rm'),
	url(r'comments/'+ comment +'$', views.comment_view, name='comment-view'),
	url(r'comments/'+ comment +'/yeah$', views.comment_add_yeah, name='comment-add-yeah'),
	url(r'comments/'+ comment +'/yeahu$', views.comment_delete_yeah, name='comment-delete-yeah'),
	url(r'comments/'+ comment +'/change$', views.comment_change, name='comment-change'),
	url(r'comments/'+ comment +'/rm$', views.comment_rm, name='comment-rm'),
	# Post-meta: polls
	url(r'poll/(?P<poll>'+ uuidr +'+)/vote$', views.poll_vote, name='poll-vote'),
	url(r'poll/(?P<poll>'+ uuidr +'+)/unvote$', views.poll_unvote, name='poll-unvote'),
	
	# Notifications
	url(r'alive$', views.check_notifications, name='check-notifications'),
	url(r'notifications/?$', views.notifications, name='notifications'),
	url(r'notifications/friend_requests/?$', views.friend_requests, name='friend-requests'),
	url(r'notifications/set_read$', views.notification_setread, name='set-read'),
	url(r'notifications/(?P<notification>'+ uuidr +'+)\.rm$', views.notification_delete, name='notification-delete'),
	
	# User meta + messages
	url(r'activity/?$', views.activity_feed, name='activity'),
	url(r'users.search$', views.user_search, name='user-search'),
	url(r'pref$', views.prefs, name='prefs'),
	url(r'settings/profile$', views.profile_settings, name='profile-settings'),
	url(r'messages/?$', views.messages, name='messages'),
	url(r'messages/(?P<message>'+ uuidr +'+)/rm$', views.message_rm, name='message-delete'),
	url(r'messages/'+ username +'$', views.messages_view, name='messages-view'),
	url(r'messages/'+ username +'/read$', views.messages_read, name='messages-read'),
	
	# Help/configuration
	url(r'lights$', views.set_lighting, name='set-lighting'),
	url(r'complaints$', views.help_complaint, name='complaints'),
	url(r'server$', views.server_stat, name='server-stat'),
	url(r'help/rules/?$', views.help_rules, name='help-rules'),
	url(r'help/faq/?$', views.help_faq, name='help-faq'),
	url(r'help/contact/?$', views.help_contact, name='help-contact'),
	url(r'help/login/?$', views.help_login, name='help-login'),
	url(r'why/?$', views.help_why, name='help-why'),
	
	# Manage
	url(r'man/?$', views.admin_index, name='admin-index'),
	url(r'man/users$', views.admin_users, name='admin-users'),
	url(r'man/users_list$', views.users_list, name='users-list'),
	
	
	# "API"
	url(r'posts.json$', views.post_list, name='post-list'),
	
	# Util, right now we are away from the primary appo
	url(r'origin$', views.origin_id, name='origin-id-get'),
	# :^)
	#url(r'openverse.png', views.openverse_logo, name='openverse-logo'),
	url(r'debug$', lambda request: redirect('https://youtu.be/dQw4w9WgXcQ'), name='rickroll'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
