from django.contrib import admin
#from django.contrib.auth.admin import UserAdmin

from . import models

admin.site.register(models.User)
admin.site.register(models.Profile)
admin.site.register(models.Community)
admin.site.register(models.Post)
admin.site.register(models.Comment)


admin.site.register(models.Yeah)
admin.site.register(models.Follow)
admin.site.register(models.Notification)