from django.conf.urls import url

from . import views

app_name = 'main'
urlpatterns = [
	url(r'^^$|^communities$|^index.*$$', views.community_list, name='community-list'),
	url(r'^login/$', views.login_page, name='login'),
	url(r'^signup/$', views.signup_page, name='signup'),
	url(r'^logout/$', views.logout_page, name='logout'),
	url(r'^activity/?$', views.activity_feed, name='activity'),
	url(r'^settings/profile$', views.profile_settings, name='profile-settings'),
	url(r'^users/(?P<username>[A-Za-z0-9-._]+)\.follow\.json$', views.user_follow, name='user-follow'),
	url(r'^users/(?P<username>[A-Za-z0-9-._]+)\.unfollow\.json$', views.user_unfollow, name='user-unfollow'),
	url(r'^users/(?P<username>[A-Za-z0-9-._]+)$', views.user_view, name='user-view'),
	url(r'^users/(?P<username>[A-Za-z0-9-._]+)/posts$', views.user_posts, name='user-posts'),
	url(r'^users/(?P<username>[A-Za-z0-9-._]+)/yeahs$', views.user_yeahs, name='user-yeahs'),
	url(r'^users/(?P<username>[A-Za-z0-9-._]+)/following$', views.user_following, name='user-following'),
	url(r'^users/(?P<username>[A-Za-z0-9-._]+)/followers$', views.user_followers, name='user-followers'),
	url(r'users/(?P<username>[A-Za-z0-9-._]+)/friends', views.user_friends, name='user-friends'),
	
	url(r'users/(?P<username>[A-Za-z0-9-._]+)/friend.new', views.user_friendrequest_create, name='user-fr-create'),
	url(r'users/(?P<username>[A-Za-z0-9-._]+)/friend.accept', views.user_friendrequest_accept, name='user-fr-accept'),
	url(r'users/(?P<username>[A-Za-z0-9-._]+)/friend.reject', views.user_friendrequest_reject, name='user-fr-reject'),
	url(r'users/(?P<username>[A-Za-z0-9-._]+)/friend.cancel', views.user_friendrequest_cancel, name='user-fr-cancel'),
	url(r'users/(?P<username>[A-Za-z0-9-._]+)/friend.delete', views.user_friendrequest_delete, name='user-fr-delete'),
	
	url(r'^communities/(?P<community>[0-9]+)$', views.community_view, name='community-view'),
	url(r'^communities/(?P<tag>[a-z]+)$', views.special_community_tag, name='special-community-tag'),
	url(r'^communities/(?P<community>[0-9]+)/posts$', views.post_create, name='post-create'),
	# Some of these NAMES (not patterns) are hardcoded into models.py
	url(r'^posts/(?P<post>[0-9]+)$', views.post_view, name='post-view'),
	url(r'^posts/(?P<post>[0-9]+)/yeah$', views.post_add_yeah, name='post-add-yeah'),
	url(r'^posts/(?P<post>[0-9]+)/yeah\.delete$', views.post_delete_yeah, name='post-delete-yeah'),
	url(r'^posts/(?P<post>[0-9]+)/comments$', views.post_comments, name='post-comments'),
	url(r'^posts/(?P<post>[0-9]+)/comments$', views.post_comments, name='post-comments'),
	url(r'^comments/(?P<comment>[0-9]+)$', views.comment_view, name='comment-view'),
	url(r'^comments/(?P<comment>[0-9]+)/yeah$', views.comment_add_yeah, name='comment-add-yeah'),
	url(r'^comments/(?P<comment>[0-9]+)/yeah\.delete$', views.comment_delete_yeah, name='comment-delete-yeah'),

	url(r'notif_count\.json$', views.check_notifications, name='check-notifications'),
	url(r'notifications/?$', views.notifications, name='notifications'),
	url(r'notifications/friend_requests/?$', views.friend_requests, name='friend-requests'),
	url(r'notifications/set_read', views.notification_setread, name='set-read'),
	url(r'notifications/(?P<notification>[0-9a-f\-]+)\.rm', views.notification_delete, name='notification-delete'),
	
	url(r'lights', views.set_lighting, name='set-lighting'),
	url(r'complaints', views.help_complaint, name='complaints'),
	url(r'help/faq/?$', views.help_faq, name='help-faq'),
	url(r'help/legal/?$', views.help_legal, name='help-legal'),
]
