from django.conf.urls import url, re_path
from django.views.static import serve
#from django.conf.urls.static import static
#from django.shortcuts import redirect

from . import views
from django.conf import settings

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
	url(r'users/'+ username +'/tools/set$', views.user_tools_set, name='user-tools-set'),
	url(r'users/'+ username +'/tools$', views.user_tools, name='user-tools'),
	url(r'users/'+ username +'/tools/meta$', views.user_tools_meta, name='user-tools-meta'),
	url(r'users/'+ username +'/block$', views.user_addblock, name='user-addblock'),
	url(r'users/'+ username +'/block_rm$', views.user_rmblock, name='user-rmblock'),
	url(r'my_blacklist$', views.user_blocklist, name='block-list'),
	# Communities
	url(r'communities.search$', views.community_search, name='community-search'),
	url(r'communities/'+ community +'$', views.community_view, name='community-view'),
	url(r'communities/favorites$', views.community_favorites, name='community-favorites'),
	url(r'communities/categories/(?P<category>[a-z]+)$', views.community_all, name='community-viewall'),
	url(r'communities/(?P<tag>[a-z]+)$', views.special_community_tag, name='special-community-tag'),
	url(r'communities/'+ community +'/favorite$', views.community_favorite_create, name='community-favorite-add'),
	url(r'communities/'+ community +'/favorite_rm$', views.community_favorite_rm, name='community-favorite-rm'),
	url(r'communities/'+ community +'/posts$', views.post_create, name='post-create'),
	url(r'communities/'+ community +'/tools$', views.community_tools, name='community-tools'),
	url(r'communities/'+ community +'/tools/set$', views.community_tools_set, name='community-tools-set'),
	url(r'c/create$', views.community_create, name='community-create'),
	url(r'c/create/do$', views.community_create_action, name='community-create-action'),
	# Posts and comments
	# Some of these NAMES (not patterns) are hardcoded into models.py
	url(r'posts/'+ post +'$', views.post_view, name='post-view'),
	url(r'posts/'+ post +'/yeah$', views.post_add_yeah, name='post-add-yeah'),
	url(r'posts/'+ post +'/yeahu$', views.post_delete_yeah, name='post-delete-yeah'),
	url(r'posts/'+ post +'/comments$', views.post_comments, name='post-comments'),
	url(r'posts/'+ post +'/lock-comments$', views.lock_the_comments, name='lock-the-comments'),
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
	url(r'poll/(?P<poll>[0-9]+)/vote$', views.poll_vote, name='poll-vote'),
	url(r'poll/(?P<poll>[0-9]+)/unvote$', views.poll_unvote, name='poll-unvote'),

	# Notifications
	url(r'alive$', views.check_notifications, name='check-notifications'),
	url(r'notifications/?$', views.notifications, name='notifications'),
	url(r'notifications/friend_requests/?$', views.friend_requests, name='friend-requests'),
	url(r'notifications/(?P<notification>'+ uuidr +'+)\.rm$', views.notification_delete, name='notification-delete'),

	# User meta + messages
	url(r'activity/?$', views.activity_feed, name='activity'),
	url(r'users.search$', views.user_search, name='user-search'),
	url(r'pref$', views.prefs, name='prefs'),
	url(r'settings/profile$', views.profile_settings, name='profile-settings'),
	url(r'messages/?$', views.messages, name='messages'),
	url(r'messages/(?P<message>[0-9]+)/rm$', views.message_rm, name='message-delete'),
	url(r'messages/'+ username +'$', views.messages_view, name='messages-view'),
	url(r'messages/'+ username +'/read$', views.messages_read, name='messages-read'),

	# Help/configuration
	url(r'lights$', views.set_lighting, name='set-lighting'),
	#url(r'togglesignups$', views.set_signups, name='set-signups'),
	#url(r'togglevpn$', views.set_VPN, name='set-VPN'),
	url(r'complaints$', views.help_complaint, name='complaints'),
	url(r'invite$', views.invites, name='invites'),
	url(r'invite/create$', views.create_invite, name='create-invite'), 
	url(r'mydata$', views.my_data, name='my-data'),
	url(r'changepassword$', views.change_password, name='change-password'),
	url(r'changepassword/set$', views.change_password_set, name='change-password-set'),
	url(r'server$', views.server_stat, name='server-stat'),
	url(r'help/rules/?$', views.help_rules, name='help-rules'),
	url(r'help/faq/?$', views.help_faq, name='help-faq'),
	url(r'help/legal/?$', views.help_legal, name='help-legal'),
	url(r'help/contact/?$', views.help_contact, name='help-contact'),
	url(r'help/login/?$', views.help_login, name='help-login'),
	url(r'help/whatads/?$', views.whatads, name='what-ads'),
	#url(r'help/actclones/?$', views.active_clones, name='active-clones'),
	#url(r'help/approval/?$', views.help_approval, name='help-approval'),
	url(r'why/?$', views.help_why, name='help-why'),


	# Util, right now we are away from the primary appo
	url(r'origin$', views.origin_id, name='origin-id-get'),
	# :^)
	#url(r'openverse.png', views.openverse_logo, name='openverse-logo'),
	#url(r'media/?$', lambda request: redirect('https://cimages.termy.xyz/media/'+request.GET.get('message')), name='redir'),
	# as of 2023-08: easter egg, not backdoor
	url(r'debug/' + username + '$', views.debug, name='rickroll'),
]
# + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
# serve static and media i think???? mighTTT???????
urlpatterns += [re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT, }), ]
