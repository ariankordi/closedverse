from django.conf.urls import url

from . import views

app_name = 'main'
urlpatterns = [
	url(r'^^$|^communities$$', views.community_list, name='community-list'),
	url(r'^login/$', views.login_page, name='login'),
	url(r'^signup/$', views.signup_page, name='signup'),
	url(r'^logout/$', views.logout_page, name='logout'),
	url(r'^settings/profile$', views.profile_settings, name='profile-settings'),
	url(r'^users/(?P<username>[A-Za-z0-9-._]+)\.follow\.json$', views.user_follow, name='user-follow'),
	url(r'^users/(?P<username>[A-Za-z0-9-._]+)\.unfollow\.json$', views.user_unfollow, name='user-unfollow'),
	url(r'^users/(?P<username>[A-Za-z0-9-._]+)$', views.user_view, name='user-view'),
	url(r'^users/(?P<username>[A-Za-z0-9-._]+)/posts$', views.user_posts, name='user-posts'),
	url(r'^users/(?P<username>[A-Za-z0-9-._]+)/yeahs$', views.user_yeahs, name='user-yeahs'),
	url(r'^users/(?P<username>[A-Za-z0-9-._]+)/following$', views.user_following, name='user-following'),
	url(r'^users/(?P<username>[A-Za-z0-9-._]+)/followers$', views.user_followers, name='user-followers'),
	url(r'^communities/(?P<community>[0-9]+)$', views.community_view, name='community-view'),
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
	url(r'notifications/set_read', views.notification_setread, name='set-read'),
	url(r'notifications/(?P<notification>[0-9a-f\-]+)\.rm', views.notification_delete, name='notification-delete'),
]
