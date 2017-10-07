import os
import closedverse
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "closedverse.settings")
import django
django.setup()
import closedverse_main
from closedverse_main import models
import re

for user in models.User.objects.filter():
	profile = user.profile()
	profile.origin_id = user.origin_id
	profile.origin_info = user.origin_info
	profile.save()
	user.origin_id = None
	user.origin_info = None
	if bool(re.compile(r'^[a-z0-9]{11,13}$').match(user.avatar)):
		user.has_mh = True
	else:
		user.has_mh = False
	user.save()
