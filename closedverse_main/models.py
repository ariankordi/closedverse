from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import BaseUserManager
from django.utils import timezone
from datetime import datetime, timedelta
from passlib.hash import bcrypt_sha256
from closedverse import settings
import uuid, json
from django.urls import reverse

class UserManager(BaseUserManager):
	def create_user(self, username, password):
		#if not email:
		#	raise ValueError('Users must have an email address')

		user = self.model(
			username=username,
		)
		user.set_password(password)
		user.save(using=self._db)
		return user

	def closed_create_user(self, username, password, addr, nick, nn):
		user = self.model(
		username = username,
		nickname = nick,
		addr = addr,
		)
		if nn:
			user.avatar = nn[0]
			user.origin_id = nn[2]
			user.origin_info = json.dumps(nn)
		user.set_password(password)
		user.save(using=self._db)
		return user
		
	def create_superuser(self, username, password):
		user = self.create_user(
			username=username,
			password=password,
		)
		user.staff = True
		user.save(using=self._db)
		return user
	def authenticate(self, username, password):
		try:
			user = self.get(username=username)
		except User.DoesNotExist:
			return None
		if not user.check_password(password):
			return None
		return user

class User(models.Model):
	unique_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
	id = models.AutoField(primary_key=True)
	username = models.CharField(max_length=32, unique=True)
	nickname = models.CharField(max_length=32, null=True)
	password = models.CharField(max_length=128)
	email = models.CharField(max_length=255, blank=True)
	avatar = models.CharField(max_length=1200, blank=True)
	level = models.SmallIntegerField(default=0)
	addr = models.GenericIPAddressField(null=True)

	origin_id = models.CharField(max_length=16, null=True, blank=True)
	origin_info = models.CharField(max_length=255, null=True, blank=True)

	#confirm_code = models.CharField(max_length=32, null=True, blank=True)
	#confirm_finished = models.BooleanField(default=False)
	
	staff = models.BooleanField(default=False)
	active = models.BooleanField(default=True)
	
	is_anonymous = False
	is_authenticated = True
	
	last_login = models.DateTimeField(auto_now=True)
	created = models.DateTimeField(auto_now=True)
	USERNAME_FIELD = 'username'
	EMAIL_FIELD = 'email'
	REQUIRED_FIELDS = []
	
	objects = UserManager()
	
	def __str__(self):
		return self.username
	def get_full_name(self):
		return "{0} ({1})".format(self.nickname, self.username)
	def get_short_name(self):
		return self.nickname
	def get_username(self):
		return self.username
	def has_module_perms(self, a):
		return True
	def has_perm(self, a):
		return self.staff
	def is_staff(self):
		return self.staff
	def is_active(self):
		return self.active
	def set_password(self, raw_password):
		self.password = bcrypt_sha256.using(rounds=13).hash(raw_password)
	def check_password(self, raw_password):
		return bcrypt_sha256.using(rounds=13).verify(raw_password, hash=self.password)
	def profile(self):
		return self.profile_set.get(user=self)
	def get_class(self):
			first = {
			5: 'openverse',
			10: 'developer',
			}.get(self.level, '')
			second = {
			5: "O-PHP-enverse Man",
			10: "Friendship ended with PHP / Now PYTHON is my best friend",
			}.get(self.level, '')
			return [first, second]
	def is_me(self, request):
		if request.user.is_authenticated:
			return (self.unique_id == request.user.unique_id)
		else:
			return False
	def num_yeahs(self):
		return self.yeah_set.filter(by=self).count()
	def num_posts(self):
		return self.post_set.filter(creator=self).count()
	def num_following(self):
		return self.follow_source.filter().count()
	def num_followers(self):
		return self.follow_target.filter().count()
	def is_following(self, me):
		if not me.is_authenticated:
			return False
		if self == me:
			return True
		return self.follow_target.filter(source=me).count() > 0
	def follow(self, source):
		if self.is_following(source) or source == self:
			return False
		return self.follow_target.create(source=source, target=self)
	def unfollow(self, source):
		if not self.is_following(source) or source == self:
			return False
		return self.follow_target.get(source=source, target=self).delete()
	def get_posts(self, limit=50, offset=0, request=None):
		posts = self.post_set.filter().order_by('-created')[offset:offset + limit]
		if request:
				for post in posts:
					post.has_yeah = post.has_yeah(request)
					post.can_yeah = post.can_yeah(request)
					post.is_mine = post.is_mine(request)
		return posts
	def get_yeahed(self, type=0, limit=20, offset=0):
		# 0 - post, 1 - comment, 2 - any
		if type == 2:
			yeahs = self.yeah_set.filter().order_by('-created')[offset:offset + limit]
		else:
			yeahs = self.yeah_set.filter(type=type).order_by('-created')[offset:offset + limit]
		return yeahs
	def get_following(self, limit=50, offset=0, request=None):
		return self.follow_source.filter().order_by('-created')[offset:offset + limit]
	def get_followers(self, limit=50, offset=0, request=None):
		return self.follow_target.filter().order_by('-created')[offset:offset + limit]
	def notification_count(self):
		return self.notification_to.filter(read=False, merged_with=None).count()
	def notification_read(self):
		return self.notification_to.filter(read=False).update(read=True)
	def get_notifications(self):
		return self.notification_to.filter(merged_with=None).order_by('-latest')[0:64]

class Community(models.Model):
	unique_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
	id = models.AutoField(primary_key=True)
	name = models.CharField(max_length=255)
	description = models.TextField(blank=True, default="")
	ico = models.URLField(blank=True)
	banner = models.URLField(blank=True)
	# Type: 0 - general, 1 - game, 2 - special 
	type = models.SmallIntegerField(default=0, choices=((0, 'general'), (1, 'game'), (2, 'special')))
	# Platform - 0/none, 1/3DS, 2/Wii U, 3/both
	platform = models.SmallIntegerField(default=0, choices=((0, 'none'), (1, '3ds'), (2, 'wii u'), (3, 'both')))
	tags = models.CharField(blank=True, null=True, max_length=255, choices=(('announcements', 'main announcement community'), ('changelog', 'main changelog')))
	created = models.DateTimeField(auto_now=True)
	updated = models.DateTimeField(auto_now=True)
	creator = models.ForeignKey(User, blank=True, null=True)
	def __str__(self):
		return self.name
	def icon(self):
		if not self.ico:
			return settings.STATIC_URL + "/img/title-icon-default.png"
		return self.ico
	def type_txt(self):
		if self.type == 1:
			return {
			0: "",
			1: "3DS Games",
			2: "Wii U Games",
			3: "Wii U Games\u30FB3DS Games",
			}.get(self.platform)
		else:
			return {
			0: "General community",
			1: "Game community",
			2: "Special community",
			}.get(self.type)
	def type_platform(self):
		thing = {
			0: "",
			1: "3ds",
			2: "wiiu",
			3: "wiiu-3ds",
			}.get(self.platform)
		if thing == "":
			return None
		return "img/platform-tag-" + thing + ".png"

	def get_posts(self, limit=50, offset=0, request=None):
		posts = Post.objects.filter(community_id=self.id).order_by('-created')[offset:offset + limit]
		if request:
				for post in posts:
					post.has_yeah = post.has_yeah(request)
					post.can_yeah = post.can_yeah(request)
					post.is_mine = post.is_mine(request)
		return posts
		
	def create_post(self, request):
		if len(request.POST['body']) > 2200:
			return 1
		new_post = self.post_set.create(body=request.POST['body'], creator=request.user, community=self, feeling=int(request.POST['feeling_id']), spoils=bool(request.POST.get('is_spoiler')))
		new_post.is_mine = True
		return new_post

# Links between communities for "related" communities
class CommunityClink(models.Model):
	# root/also order doesn't matter, time does though
	root = models.ForeignKey(Community, related_name='one')
	also = models.ForeignKey(Community, related_name='two')
	created = models.DateTimeField(auto_now=True)
	# type: related (f) / sub (t)
	kind = models.BooleanField(default=False)

class Post(models.Model):
	unique_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
	id = models.AutoField(primary_key=True)
	community = models.ForeignKey(Community)
	feeling = models.SmallIntegerField(default=0, choices=((0, 'normal'), (1, 'happy'), (2, 'wink'), (3, 'surprised'), (4, 'frustrated'), (5, 'confused')))
	body = models.TextField(null=True)
	drawing = models.CharField(max_length=200, null=True, blank=True)
	screenshot = models.URLField(max_length=1200, blank=True, default="")
	url = models.URLField(max_length=1200, blank=True, default="")
	spoils = models.BooleanField(default=False)
	created = models.DateTimeField(auto_now=True)
	edited = models.DateTimeField(auto_now=True)
	status = models.SmallIntegerField(default=0)
	creator = models.ForeignKey(User)

	def __str__(self):
		return self.body[:50] + "..."
	def is_reply(self):
		return False
	def trun(self):
		if self.drawing:
			return '(drawing)'
		else:
			return self.body
	def is_mine(self, request):
		if request.user.is_authenticated:
			return (self.creator.unique_id == request.user.unique_id)
		else:
			return False
	def yeah_notification(self, request):
		Notification.give_notification
	def number_yeahs(self):
		return self.yeah_set.filter(post=self).count()
	def has_yeah(self, request):
		if request.user.is_authenticated:
			return self.yeah_set.filter(post=self, by=request.user).count() > 0
		else:
			return False
	def can_yeah(self, request):
		if request.user.is_authenticated:
			return not self.is_mine(request)
		else:
			return False
	def give_yeah(self, request):
		if self.has_yeah(request):
			return True
		if not self.can_yeah(request):
			return False
		return self.yeah_set.create(by=request.user, post=self)
	def remove_yeah(self, request):
		if not self.has_yeah(request):
			return True
		return self.yeah_set.filter(post=self, by=request.user).delete()
	def number_comments(self):
		return self.comment_set.filter(original_post=self).count()
	def get_yeahs(self, request):
		return Yeah.objects.filter(type=0, post=self).order_by('-created')[0:30]
	def get_comments(self, request=None):
		comments = self.comment_set.filter(original_post=self).order_by('created')
		if request:
				for post in comments:
					post.has_yeah = post.has_yeah(request)
					post.can_yeah = post.can_yeah(request)
					post.is_mine = post.is_mine(request)
		return comments
	def create_comment(self, request):
		if len(request.POST['body']) > 2200:
			return 1
		new_post = self.comment_set.create(body=request.POST['body'], creator=request.user, community=self.community, original_post=self, feeling=int(request.POST['feeling_id']), spoils=bool(request.POST.get('is_spoiler')))
		new_post.is_mine = True
		return new_post
	def recent_comment(self):
		comments = self.comment_set.filter(spoils=False).exclude(creator=self.creator).order_by('-created')[:1]
		if comments.count < 1:
			return False
		return comments[0]

class Comment(models.Model):
	unique_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
	id = models.AutoField(primary_key=True)
	original_post = models.ForeignKey(Post)
	community = models.ForeignKey(Community)
	feeling = models.SmallIntegerField(default=0, choices=((0, 'normal'), (1, 'happy'), (2, 'wink'), (3, 'surprised'), (4, 'frustrated'), (5, 'confused')))
	body = models.TextField(null=True)
	screenshot = models.URLField(max_length=1200, blank=True, default="")
	drawing = models.CharField(max_length=200, null=True, blank=True)
	spoils = models.BooleanField(default=False)
	created = models.DateTimeField(auto_now=True)
	edited = models.DateTimeField(auto_now=True)
	status = models.SmallIntegerField(default=0)
	creator = models.ForeignKey(User, blank=True, null=True)
	
	def __str__(self):
		return self.body[:50] + "..."
	def is_reply(self):
		return True
	def trun(self):
		if self.drawing:
			return '(drawing)'
		else:
			return self.body
	def is_mine(self, request):
		if request.user.is_authenticated:
			return (self.creator.unique_id == request.user.unique_id)
		else:
			return False
	def number_yeahs(self):
		return self.yeah_set.filter(comment=self, type=1).count()
	def has_yeah(self, request):
		if request.user.is_authenticated:
			return self.yeah_set.filter(comment=self, type=1, by=request.user).count() > 0
		else:
			return False
	def can_yeah(self, request):
		if request.user.is_authenticated:
			return not self.is_mine(request)
		else:
			return False
	def give_yeah(self, request):
		if self.has_yeah(request):
			return True
		if not self.can_yeah(request):
			return False
		return self.yeah_set.create(by=request.user, type=1, comment=self)
	def remove_yeah(self, request):
		if not self.has_yeah(request):
			return True
		return self.yeah_set.filter(comment=self, type=1, by=request.user).delete()
	def get_yeahs(self, request):
		return Yeah.objects.filter(type=1, comment=self).order_by('-created')[0:30]
	def owner_post(self):
		return (self.creator == self.original_post.creator)
	
class Yeah(models.Model):
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
	by = models.ForeignKey(User)
	# 0 - post, 2 - comment
	type = models.SmallIntegerField(default=0, choices=((0, 'post'), (1, 'comment'), ))
	post = models.ForeignKey(Post, null=True, blank=True)
	comment = models.ForeignKey(Comment, null=True, blank=True)
	created = models.DateTimeField(auto_now=True)

	def __str__(self):
		a = "from " + self.by.username + " to "
		if self.post:
			a += str(self.post.unique_id)
		elif self.comment:
			a += str(self.comment.unique_id)
		return a

class Profile(models.Model):
	unique_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
	id = models.AutoField(primary_key=True)
	user = models.ForeignKey(User)
	comment = models.TextField(blank=True, default="")
	country = models.CharField(max_length=120, blank=True, default="")
	birthday = models.DateField(null=True, blank=True)
	# 0 - show, 1 - friends only, 2 - hide
	id_visibility = models.SmallIntegerField(default=0, choices=((0, 'show'), (1, 'friends only'), (2, 'hide'), ))
	relation_visibility = models.SmallIntegerField(default=0, choices=((0, 'show'), (1, 'friends only'), (2, 'hide'), ))
	weblink = models.CharField(max_length=1200, blank=True, default="")
	gameskill = models.SmallIntegerField(default=0)
	favorite = models.ForeignKey(Post, blank=True, null=True)
	
	def __str__(self):
		return "profile " + str(self.unique_id) + " for " + self.user.username
	def origin_id(self):
		# TODO friends only here
		if not self.id_visibility == 0:
			return 0
		if not self.user.origin_id:
			return None
		return self.user.origin_id

class Follow(models.Model):
	unique_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
	id = models.AutoField(primary_key=True)
	source = models.ForeignKey(User, related_name='follow_source')
	target = models.ForeignKey(User, related_name='follow_target')
	created = models.DateTimeField(auto_now=True)
	
	def __str__(self):
		return "follow: from " + self.source.username + " to " + self.target.username

class Notification(models.Model):
	unique_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
	
	to = models.ForeignKey(User, related_name='notification_to')
	source = models.ForeignKey(User, related_name='notification_sender')
	read = models.BooleanField(default=False)
	type = models.PositiveSmallIntegerField(choices=(
	(0, 'Yeah on post'),
	(1, 'Yeah on comment'),
	(2, 'Comment on my post'),
	(3, 'Comment on others\' post'),
	(4, 'Follow to me'),
	))
	merged_with = models.ForeignKey('self', related_name='merged', null=True, blank=True)
	context_post = models.ForeignKey(Post, null=True, blank=True)
	context_comment = models.ForeignKey(Comment, null=True, blank=True)
	
	created = models.DateTimeField(auto_now=True)
	latest = models.DateTimeField(auto_now=True)

	def __str__(self):
		return 'Notification from ' + str(self.source) + ' to ' + str(self.to) + ' with type ' + str(self.type)
	def url(self):
		what_type = {
			0: 'main:post-view',
			1: 'main:comment-view',
			2: 'main:post-view',
			3: 'main:post-view',
			4: 'main:user-view',
		}.get(self.type)
		if self.type == 0 or self.type == 2 or self.type == 3:
			what_id = self.context_post.id
		elif self.type == 1:
			what_id = self.context_comment.id
		elif self.type == 4:
			what_id = self.source.username
		return reverse(what_type, args=[what_id])
	def merge(self, user):
		self.latest = timezone.now()
		self.read = False
		self.save()
		return self.merged.create(source=user, to=self.to, type=self.type, context_post=self.context_post, context_comment=self.context_comment)
	def set_unread(self):
		self.read = False
		self.latest = timezone.now()
		return self.save()
	def all_users(self):
		arr = []
		arr.append(self.source)
		merges = self.merged.filter()
		for merge in merges:
			arr.append(merge.source)
		return arr
	# In the future, please put giving notifications for classes into their respective classes (right now they're in views)
	def give_notification(user, type, to, post=None, comment=None):
		# Just keeping this simple for now, might want to make it better later
		# If the user sent a notification to this user at least 5 seconds ago, return False
		# Or if user is to
		if user == to or user.notification_sender.filter(created__gt=timezone.now() - timedelta(seconds=5), to=to):
			return False
		# Search for my own notifiaction. If it exists, set it as unread.
		merge_own = user.notification_sender.filter(created__gt=timezone.now() - timedelta(hours=8), to=to, type=type, context_post=post, context_comment=comment)
		print(merge_own)
		if merge_own:
			print('Oops we\'ve run into our own notif')
			# If it's merged, don't unread that one, but unread what it's merging.
			if merge_own[0].merged_with:
				print('It was merged')
				return merge_own[0].merged_with.set_unread()
			else:
				print('Actually it\'s just normal')
				return merge_own[0].set_unread()
		# Search for a notification already there so we can merge with it if it exists
		merge_s = Notification.objects.filter(created__gt=timezone.now() - timedelta(hours=8), to=to, type=type, context_post=post, context_comment=comment, merged_with=None)
		# If it exists, merge with it. Else, create a new notification.
		if merge_s:
			return merge_s[0].merge(user)
		else:
			return user.notification_sender.create(source=user, type=type, to=to, context_post=post, context_comment=comment)