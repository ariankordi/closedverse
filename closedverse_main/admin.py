from django.contrib import admin
#from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group

from . import models

class PostAdmin(admin.ModelAdmin):
	def get_queryset(self, request):
		return models.Post.real.get_queryset()

class CommentAdmin(admin.ModelAdmin):
	def get_queryset(self, request):
		return models.Comment.real.get_queryset()

admin.site.unregister(Group)

admin.site.register(models.User)
admin.site.register(models.Profile)
admin.site.register(models.Community)
admin.site.register(models.Complaint)
admin.site.register(models.Message)


admin.site.register(models.Post, PostAdmin)
admin.site.register(models.Comment, CommentAdmin)


admin.site.register(models.Yeah)
admin.site.register(models.Follow)
admin.site.register(models.FriendRequest)
admin.site.register(models.Friendship)
admin.site.register(models.Notification)
admin.site.register(models.Conversation)