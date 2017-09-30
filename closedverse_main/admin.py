from django.contrib import admin
#from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group
from closedverse import settings

from . import models

class UserAdmin(admin.ModelAdmin):
	#search_fields = ('id', 'unique_id', 'username', 'nickname', 'addr', )
	search_fields = ('id', 'unique_id', 'username', 'nickname', 'addr', 'origin_id')

class ProfileAdmin(admin.ModelAdmin):
	search_fields = ('id', 'unique_id', )
	#search_fields = ('id', 'unique_id', 'origin_id', )
	raw_id_fields = ('user', 'favorite', )

class ComplaintAdmin(admin.ModelAdmin):
	search_fields = ('id', 'unique_id', 'body', )
	raw_id_fields = ('creator', )
class ConversationAdmin(admin.ModelAdmin):
	search_fields = ('id', 'unique_id', )
	raw_id_fields = ('source', 'target', )

class PostAdmin(admin.ModelAdmin):
	raw_id_fields = ('creator', 'poll', )
	search_fields = ('id', 'unique_id', )
	def get_queryset(self, request):
		return models.Post.real.get_queryset()

class CommentAdmin(admin.ModelAdmin):
	raw_id_fields = ('creator', 'original_post', )
	search_fields = ('id', 'unique_id', )
	def get_queryset(self, request):
		return models.Comment.real.get_queryset()

class CommunityAdmin(admin.ModelAdmin):
	raw_id_fields = ('creator', )
	def get_queryset(self, request):
		return models.Community.real.get_queryset()

class MessageAdmin(admin.ModelAdmin):
	raw_id_fields = ('creator', 'conversation', )
	search_fields = ('id', 'unique_id', )
	def get_queryset(self, request):
		return models.Message.real.get_queryset()

#admin.site.unregister(Group)

admin.site.register(models.User, UserAdmin)
admin.site.register(models.Profile, ProfileAdmin)
admin.site.register(models.Community, CommunityAdmin)
admin.site.register(models.Complaint, ComplaintAdmin)
admin.site.register(models.Message, MessageAdmin)
admin.site.register(models.Conversation, ConversationAdmin)


admin.site.register(models.Post, PostAdmin)
admin.site.register(models.Comment, CommentAdmin)

if settings.DEBUG:
	admin.site.register(models.CommunityClink)
	admin.site.register(models.Yeah)
	admin.site.register(models.Follow)
	admin.site.register(models.FriendRequest)
	admin.site.register(models.Friendship, ConversationAdmin)
	admin.site.register(models.Notification)
	admin.site.register(models.Poll)
	admin.site.register(models.PollVote)
