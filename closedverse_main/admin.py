from django.contrib import admin
#from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group

from . import models

admin.site.unregister(Group)

admin.site.register(models.User)
admin.site.register(models.Profile)
admin.site.register(models.Community)
admin.site.register(models.Post)
admin.site.register(models.Comment)
admin.site.register(models.Complaint)

admin.site.register(models.Yeah)
admin.site.register(models.Follow)
admin.site.register(models.FriendRequest)
admin.site.register(models.Friendship)
admin.site.register(models.Notification)