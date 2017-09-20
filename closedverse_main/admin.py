from django.contrib import admin
#from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group
from closedverse import settings

from . import models

class PostAdmin(admin.ModelAdmin):
	def get_queryset(self, request):
		return models.Post.real.get_queryset()

class CommentAdmin(admin.ModelAdmin):
	def get_queryset(self, request):
		return models.Comment.real.get_queryset()

class CommunityAdmin(admin.ModelAdmin):
	def get_queryset(self, request):
		return models.Community.real.get_queryset()

class MessageAdmin(admin.ModelAdmin):
	def get_queryset(self, request):
		return models.Message.real.get_queryset()

#admin.site.unregister(Group)

admin.site.register(models.User)
admin.site.register(models.Profile)
admin.site.register(models.Community, CommunityAdmin)
admin.site.register(models.Complaint)
admin.site.register(models.Message, MessageAdmin)
admin.site.register(models.Conversation)


admin.site.register(models.Post, PostAdmin)
admin.site.register(models.Comment, CommentAdmin)

if settings.DEBUG:
	admin.site.register(models.CommunityClink)
	admin.site.register(models.Yeah)
	admin.site.register(models.Follow)
	admin.site.register(models.FriendRequest)
	admin.site.register(models.Friendship)
	admin.site.register(models.Notification)
	admin.site.register(models.Poll)
	admin.site.register(models.PollVote)
