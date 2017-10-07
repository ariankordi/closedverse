from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import BaseUserManager
from django.db.models import Q, QuerySet, Max, F
from django.utils import timezone
from django.forms.models import model_to_dict
from django.utils.dateformat import format
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError
from datetime import timedelta
from passlib.hash import bcrypt_sha256
from closedverse import settings
from . import util
from random import getrandbits
import uuid, json, base64
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.urls import reverse
import re

feelings = ((0, 'normal'), (1, 'happy'), (2, 'wink'), (3, 'surprised'), (4, 'frustrated'), (5, 'confused'), (69, 'easter egg'), )
post_status = ((0, 'ok'), (1, 'delete by user'), (2, 'delete by authority'), (3, 'delete by mod'), (4, 'delete by admin'))

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

	def closed_create_user(self, username, password, email, addr, nick, nn, gravatar):
		user = self.model(
		username = username,
		nickname = util.filterchars(nick),
		addr = addr,
		email = email,
		)
		profile = Profile.objects.model()
		if nn:
			user.avatar = nn[0]
			profile.origin_id = nn[2]
			profile.origin_info = json.dumps(nn)
			user.has_mh = True
		else:
			user.avatar = util.get_gravatar(email) or ('s' if getrandbits(1) else '')
			
			user.has_mh = False
		user.set_password(password)
		user.save(using=self._db)
		if util.getipintel(addr) > 0.994:
			profile.let_freedom = False
		else:
			profile.let_freedom = True
		profile.user = user
		profile.save()
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

class PostManager(models.Manager):
	def get_queryset(self):
		return super(PostManager, self).get_queryset().filter(is_rm=False)

class User(models.Model):
	unique_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
	id = models.AutoField(primary_key=True)
	username = models.CharField(max_length=32, unique=True)
	nickname = models.CharField(max_length=64, null=True)
	password = models.CharField(max_length=128)
	email = models.EmailField(null=True, blank=True, default='')
	has_mh = models.BooleanField(default=False)
	avatar = models.CharField(max_length=1200, blank=True, default='')
	level = models.SmallIntegerField(default=0, choices=((0, 'normal'), (1, 'urapp'), (2, 'moderator'), (3, 'admin'), (5, 'pf2m'), (10, 'master')))
	addr = models.CharField(max_length=64, null=True, blank=True)

	# Remove these
	origin_id = models.CharField(max_length=16, null=True, blank=True)
	origin_info = models.CharField(max_length=255, null=True, blank=True)
	# //
	
	hide_online = models.BooleanField(default=False)
	
	staff = models.BooleanField(default=False)
	active = models.BooleanField(default=True)
	
	is_anonymous = False
	is_authenticated = True
	
	last_login = models.DateTimeField(auto_now=True)
	created = models.DateTimeField(auto_now_add=True)
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
	def gravatar(self):
		g = util.get_gravatar(self.email)
		if not g:
			return settings.STATIC_URL + '/img/anonymous-mii.png'
		return g
	def mh(self):
		if not self.profile().origin_info:
			return None
		try:
			infodecode = json.loads(self.origin_info)
		except:
			return None
		return infodecode[0]
	def get_class(self):
			first = {
			1: 'urapp',
			2: 'moderator',
			3: 'admin',
			5: 'openverse',
			10: 'developer',
			}.get(self.level, '')
			second = {
			1: "cave story official #1 fan",
			2: "Moderator",
			3: "Admin",
			5: "O-PHP-enverse Man",
			10: "Friendship ended with PHP / Now PYTHON is my best friend",
			}.get(self.level, '')
			if first:
				first = 'official ' + first
			return [first, second]
	def is_me(self, request):
		if request.user.is_authenticated:
			return (self == request.user)
		else:
			return False
	def has_freedom(self):
		return self.profile().let_freedom	
	# This is the coolest one
	def online_status(self, force=False):
	# Okay so this returns True if the user's offline, 2 if they're AFK, False if they're offline and None if they hide it
		#if not force and not self.profile().let_presence_view:
		#	return None
		if self.hide_online:
			return None
		if (timezone.now() - timedelta(seconds=48)) > self.last_login:
			return False
		elif (timezone.now() - timedelta(seconds=32)) > self.last_login:
			return 2
		else:
			return True
		

	def num_yeahs(self):
		return self.yeah_set.filter(by=self).count()
	def num_posts(self):
		return self.post_set.filter(creator=self).count()
	def num_following(self):
		return self.follow_source.filter().count()
	def num_followers(self):
		return self.follow_target.filter().count()
	def num_friends(self):
		return self.friend_source.filter().count() + self.friend_target.filter().count()
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
					post.setup(request)
					post.recent_comment = post.recent_comment()
					post.comment_count = post.get_comments().count()
		return posts
	def get_yeahed(self, type=0, limit=20, offset=0):
		# 0 - post, 1 - comment, 2 - any
		if type == 2:
			yeahs = self.yeah_set.filter().order_by('-created')[offset:offset + limit]
		else:
			yeahs = self.yeah_set.filter(type=type, post__is_rm=False).order_by('-created')[offset:offset + limit]
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
	# Admin can-manage
	def can_manage(self):
		if (self.level >= 2) or self.is_staff():
			return True	
		return False
	def friend_state(self, other):
		# Todo: return -1 for cannot, 0 for nothing, 1 for my friend pending, 2 for their friend pending, 3 for friends
		query1 = other.fr_source.filter(target=self, finished=False).exists()
		if query1:
			return 1
		query2 = self.fr_source.filter(target=other, finished=False).exists()
		if query2:
			return 2
		query3 = Friendship.find_friendship(self, other)
		if query3:
			return 3
		return 0
	def get_fr(self, other):
		return FriendRequest.objects.filter(Q(source=self) & Q(target=other) | Q(target=self) & Q(source=other)).exclude(finished=True)
	def get_frs_target(self):
		return FriendRequest.objects.filter(target=self, finished=False).order_by('-created')
	def get_frs_notif(self):
		return FriendRequest.objects.filter(target=self, finished=False, read=False).count()
	def reject_fr(self, target):
		fr = self.get_fr(target)
		if fr:
			fr.first().finish()
	def send_fr(self, source, body=None):
		if not self.get_fr(source):
			return FriendRequest.objects.create(source=source, target=self, body=body)
	def accept_fr(self, target):
		fr = self.get_fr(target)
		if fr:
			fr.first().finish()
			return Friendship.objects.create(source=self, target=target)
	def cancel_fr(self, target):
		fr = target.get_fr(self)
		if fr:
			fr.first().finish()
	def read_fr(self):
		return self.get_frs_target().update(read=True)
	def delete_friend(self, target):
		fr = Friendship.find_friendship(self, target)
		if fr:
			fr.conversation().all_read()
			fr.delete()
	def get_activity(self, limit=20, offset=0, distinct=False, friends_only=False, request=None):
		#Todo: make distinct work; combine friends and following, but then get posts from them
		friends = Friendship.get_friendships(self, 0)
		friend_ids = []
		for friend in friends:
			friend_ids.append(friend.other(self))
		follows = self.follow_source.filter().values_list('target', flat=True)
		if not friends_only:
			friend_ids.append(self.id)
		for thing in follows:
			friend_ids.append(thing)
		if distinct:
			posts = Post.objects.annotate(max_created=Max('creator__post__created')).filter(created=F('max_created')).filter(creator__in=friend_ids).order_by('-created')[offset:offset + limit]
		else:
			posts = Post.objects.filter(creator__in=friend_ids).order_by('-created')[offset:offset + limit]
		if request:
				for post in posts:
					post.setup(request)
					post.recent_comment = post.recent_comment()
					post.comment_count = post.get_comments().count()
		return posts
	def community_favorites(self, all=False):
		if not all:
			favorites = self.communityfavorite_set.order_by('-created')[:8]
		else:
			favorites = self.communityfavorite_set.order_by('-created')
		communities = []
		for fav in favorites:
			communities.append(fav.community)
		del(favorites)
		return communities
	def wake(self, addr=None):
		if addr and not addr == self.addr:
			self.addr = addr
			return self.save(update_fields=['addr', 'last_login'])
		return self.save(update_fields=['last_login'])

	def has_postspam(self, body, screenshot=None, drawing=None):
		latest_post = self.post_set.filter().order_by('-created')[:1]
		if not latest_post:
			return False
		latest_post = latest_post.first()
		if drawing and latest_post.drawing:
			if drawing == latest_post.drawing:
				return True
		elif latest_post.screenshot and screenshot and not drawing:
			if latest_post.screenshot == screenshot and latest_post.body == body:
				return True
		elif latest_post.body and body and not latest_post.screenshot and not latest_post.drawing:
			if latest_post.body == body:
				return True
		return False
		
	def get_latest_msg(self, me):
		conversation = Conversation.objects.filter(Q(source=self) & Q(target=me) | Q(target=self) & Q(source=me)).order_by('-created')[:1].first()
		if not conversation:
			return False
		return conversation.latest_message(me)
	def conversations(self):
		return Conversation.objects.filter(Q(source=self) | Q(target=self)).order_by('-created')
	def msg_count(self):
		conversations = self.conversations()
		count = 0
		for conversation in conversations:
			count += conversation.unread(self).count()
		return count
	def password_reset_email(self, request):
		htmlmsg = render_to_string('closedverse_main/help/email.html', {
			'menulogo': request.build_absolute_uri(settings.STATIC_URL + 'img/menu-logo.png'),
			'contact': request.build_absolute_uri(reverse('main:help-contact')),
			'link': request.build_absolute_uri(reverse('main:forgot-passwd')) + "?token=" + base64.urlsafe_b64encode(bytes(self.password, 'utf-8')).decode(),
		})
		subj = 'Openverse password reset for "{0}"'.format(self.username)
		return send_mail(subject=subj, message="Bro, do you even HTML E-Mail?", html_message=htmlmsg, from_email="Closedverse not Openverse <{0}>".format(settings.DEFAULT_FROM_EMAIL), recipient_list=[self.email], fail_silently=False)
		return EmailMessage(subj, htmlmsg, to=(self.email)).send()
	def find_shared_ip(self):
		return User.objects.filter(addr=self.addr).exclude(id=self.id)

	def search(query='', limit=50, offset=0, request=None):
		return User.objects.filter(Q(username__icontains=query) | Q(nickname__icontains=query)).order_by('-created')[offset:offset + limit]
	def email_in_use(addr, request=None):
		if not addr:
			return False
		if request:
			return User.objects.filter(email=addr).exclude(id=request.user.id).exists()
		else:
			return User.objects.filter(email=addr).exists()
	def nnid_in_use(id, request=None):
		if not id:
			return False
		if request:
			return User.objects.filter(origin_id=id).exclude(id=request.user.id).exists()
		else:
			return User.objects.filter(origin_id=id).exists()
	def get_from_passwd(passwd):
		try:
			user = User.objects.get(password=base64.urlsafe_b64decode(passwd))
		except:
			return False
		return user
	
	def do_avatar(avatar, feeling=0):
		if bool(re.compile(r'^[a-z0-9]{11,13}$').match(avatar)):
			feeling = {
			0: 'normal',
			1: 'happy',
			2: 'like',
			3: 'surprised',
			4: 'frustrated',
			5: 'puzzled',
			}.get(feeling, "normal")
			url = 'https://mii-secure.cdn.nintendo.net/{0}_{1}_face.png'.format(avatar, feeling)
			return url
		elif not avatar:
			return settings.STATIC_URL + '/img/anonymous-mii.png'
		elif avatar == 's':
			return settings.STATIC_URL + '/img/anonymous-mii-sad.png'
		else:
			return avatar
	def format_queryset(users):
		user_list = []
		for user in users:
			user_dict = model_to_dict(user)
			del(user_dict['password'], user_dict['staff'], user_dict['origin_id'])
			user_dict['online_status'] = user.online_status(force=True)
			try:
				user_dict['origin_info'] = loads(user.profile().origin_info)
			except:
				user_dict['origin_info'] = None
			user_dict['unique_id'] = str(user.unique_id)
			user_dict['created'] = user.created
			user_dict['last_login'] = user.last_login
			user_dict['avatar'] = User.do_avatar(user_dict['avatar'])
			user_dict['num_posts'] = [user.num_posts(), reverse('main:user-posts', args=[user.id]), ]
			user_list.append(user_dict)
			del(user_dict)
		return user_list

class Community(models.Model):
	unique_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
	id = models.AutoField(primary_key=True)
	name = models.CharField(max_length=255)
	description = models.TextField(blank=True, default='')
	ico = models.CharField(max_length=255, blank=True)
	banner = models.CharField(max_length=255, blank=True)
	# Type: 0 - general, 1 - game, 2 - special 
	type = models.SmallIntegerField(default=0, choices=((0, 'general'), (1, 'game'), (2, 'special'), (3, 'hide')))
	# Platform - 0/none, 1/3DS, 2/Wii U, 3/both
	platform = models.SmallIntegerField(default=0, choices=((0, 'none'), (1, '3ds'), (2, 'wii u'), (3, 'both')))
	tags = models.CharField(blank=True, null=True, max_length=255, choices=(('announcements', 'main announcement community'), ('changelog', 'main changelog'), ('activity', 'Activity Feed posting community')))
	created = models.DateTimeField(auto_now_add=True)
	updated = models.DateTimeField(auto_now=True)
	is_rm = models.BooleanField(default=False)
	is_feature = models.BooleanField(default=False)
	allowed_users = models.TextField(null=True, blank=True)
	creator = models.ForeignKey(User, blank=True, null=True)

	objects = PostManager()
	real = models.Manager()

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
	def is_activity(self):
		return self.tags == 'activity'
	def clickable(self):
		return not self.is_activity() and not self.type == 3
	def get_posts(self, limit=50, offset=0, request=None, favorite=False):
		posts = Post.objects.filter(community_id=self.id).order_by('-created')[offset:offset + limit]
		if request:
			for post in posts:
				post.setup(request)
				post.recent_comment = post.recent_comment()
				post.comment_count = post.get_comments().count()
		return posts
	def post_perm(self, request):
		if self.allowed_users:
			allows = self.allowed_users.split(',')
			if not request.user.is_authenticated or str(request.user.id) not in allows:
				return False
			return True
		else:
			return True
	
	def has_favorite(self, request):
		if request.user.communityfavorite_set.filter(community=self).exists():
			return True
		return False
	def favorite_add(self, request):
		if not self.has_favorite(request):
			return request.user.communityfavorite_set.create(community=self)
	def favorite_rm(self, request):
		if self.has_favorite(request):
			return request.user.communityfavorite_set.get(community=self).delete()


	def setup(self, request):
		if request.user.is_authenticated:
			self.post_perm = self.post_perm(request)
			self.has_favorite = self.has_favorite(request)

	def create_post(self, request):
		if not self.post_perm(request):
			return 4
		if Post.real.filter(creator=request.user, created__gt=timezone.now() - timedelta(seconds=10)).exists():
			return 3
		if request.POST.get('url'):
			try:
				URLValidator()(value=request.POST['url'])
			except ValidationError:
				return 5
		if not request.user.has_freedom() and (request.POST.get('url') or request.FILES.get('screen')):
			return 6
		if len(request.POST['body']) > 2200 or (len(request.POST['body']) < 1 and not request.POST.get('_post_type') == 'painting'):
			return 1
		upload = None
		drawing = None
		if request.FILES.get('screen'):
			upload = util.image_upload(request.FILES['screen'], True)
			if upload == 1:
				return 2
		if request.POST.get('painting') and request.POST.get('_post_type') == 'painting':
			drawing = util.image_upload(request.POST['painting'])
			if drawing == 1:
				return 2
		# Check for spam using our OWN ALGO!!!!!!!!!
		if request.user.has_postspam(request.POST.get('body'), upload, drawing):
			return 7
		new_post = self.post_set.create(body=request.POST.get('body'), creator=request.user, community=self, feeling=int(request.POST.get('feeling_id', 0)), spoils=bool(request.POST.get('is_spoiler')), screenshot=upload, drawing=drawing, url=request.POST.get('url'))
		new_post.is_mine = True
		return new_post

	def search(query='', limit=50, offset=0, request=None):
		return Community.objects.filter(Q(name__icontains=query) | Q(description__contains=query)).exclude(type=3).order_by('-created')[offset:offset + limit]

	def get_all(type=0, offset=0, limit=12):
		return Community.objects.filter(type=type).order_by('-created')[offset:offset + limit]
		
	class Meta:
		verbose_name_plural = "communities"

# Links between communities for "related" communities
class CommunityClink(models.Model):
	# root/also order doesn't matter, time does though
	root = models.ForeignKey(Community, related_name='one')
	also = models.ForeignKey(Community, related_name='two')
	created = models.DateTimeField(auto_now_add=True)
	# type: related (f) / sub (t)
	kind = models.BooleanField(default=False)

# Do this, or not
class CommunityFavorite(models.Model):
	id = models.AutoField(primary_key=True)
	by = models.ForeignKey(User)
	community = models.ForeignKey(Community)
	created = models.DateTimeField(auto_now_add=True)
	
	def __str__(self):
		return "Community favorite by " + str(self.by) + " for " + str(self.community)

class Post(models.Model):
	unique_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
	id = models.AutoField(primary_key=True)
	community = models.ForeignKey(Community, null=True)
	feeling = models.SmallIntegerField(default=0, choices=feelings)
	body = models.TextField(null=True)
	drawing = models.CharField(max_length=200, null=True, blank=True)
	screenshot = models.CharField(max_length=1200, null=True, blank=True, default='')
	url = models.URLField(max_length=1200, null=True, blank=True, default='')
	spoils = models.BooleanField(default=False)
	created = models.DateTimeField(auto_now_add=True)
	edited = models.DateTimeField(auto_now=True)
	befores = models.TextField(null=True, blank=True)
	poll = models.ForeignKey('Poll', null=True, blank=True)
	has_edit = models.BooleanField(default=False)
	is_rm = models.BooleanField(default=False)
	status = models.SmallIntegerField(default=0, choices=post_status)
	creator = models.ForeignKey(User)

	objects = PostManager()
	real = models.Manager()

	def __str__(self):
		return self.body[:250]
	def is_reply(self):
		return False
	def trun(self):
		if self.is_rm:
			return 'deleted'
		if self.drawing:
			return 'drawing'
		else:
			return self.body
	def yt_vid(self):
		try:
			thing = re.search('(https?://)?(www\.)?(youtube|youtu|youtube-nocookie)\.(com|be)/(watch\?v=|embed/|v/|.+\?v=)?([^&=%\?]{11})', self.url).group(6)
		except:
			return False
		return thing
	def is_mine(self, user):
		if user.is_authenticated:
			return (self.creator == user)
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
			return not self.is_mine(request.user)
		else:
			return False
	def can_rm(self, request):
		return request.user.level > 0
	def give_yeah(self, request):
		if not request.user.has_freedom() and Yeah.objects.filter(by=request.user, created__gt=timezone.now() - timedelta(seconds=5)).exists():
			return False
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
	def get_comments(self, request=None, limit=0, offset=0):
		if limit:
			comments = self.comment_set.filter(original_post=self).order_by('created')[offset:offset + limit]
		elif offset:
			comments = self.comment_set.filter(original_post=self).order_by('created')[offset:]
		else:
			comments = self.comment_set.filter(original_post=self).order_by('created')
		if request:
			for post in comments:
				post.setup(request)
		return comments
	def create_comment(self, request):
		if not self.is_mine(request.user) and Comment.real.filter(creator=request.user, created__gt=timezone.now() - timedelta(seconds=10)).exists():
			return 3
		if not request.user.has_freedom() and (request.POST.get('url') or request.FILES.get('screen')):
			return 6
		if len(request.POST['body']) > 2200 or (len(request.POST['body']) < 1 and not request.POST.get('_post_type') == 'painting'):
			return 1
		upload = None
		drawing = None
		if request.FILES.get('screen'):
			upload = util.image_upload(request.FILES['screen'], True)
			if upload == 1:
				return 2
		if request.POST.get('painting') and request.POST.get('_post_type') == 'painting':
			drawing = util.image_upload(request.POST['painting'])
			if drawing == 1:
				return 2
		new_post = self.comment_set.create(body=request.POST.get('body'), creator=request.user, community=self.community, original_post=self, feeling=int(request.POST.get('feeling_id', 0)), spoils=bool(request.POST.get('is_spoiler')), drawing=drawing, screenshot=upload)
		new_post.is_mine = True
		return new_post
	def recent_comment(self):
		comments = self.comment_set.filter(spoils=False).exclude(creator=self.creator).order_by('-created')[:1]
		if comments.count() < 1:
			return False
		return comments.first()
	def change(self, request):
		if not self.is_mine(request.user) or self.has_edit:
			return 1
		if not request.POST.get('body') or len(request.POST['body']) > 2200:
			return 1
		if not self.befores:
			befores_json = []
		else:
			befores_json = json.loads(self.befores)
		befores_json.append(self.body)
		self.befores = json.dumps(befores_json)
		self.body = request.POST['body']
		self.spoils = request.POST.get('is_spoiler', False)
		self.feeling = request.POST.get('feeling_id', 0)
		if not timezone.now() < self.created + timezone.timedelta(minutes=5):
			self.has_edit = True
		return self.save()
	def is_favorite(self, user):
		profile = user.profile()
		if profile.favorite == self:
			return True
		else:
			return False
	def favorite(self, user):
		if not self.is_mine(user):
			return False
		profile = user.profile()
		if profile.favorite == self:
			return False
		profile.favorite = self
		return profile.save()
	def unfavorite(self, user):
		if not self.is_mine(user):
			return False
		profile = user.profile()
		if profile.favorite == self:
			profile.favorite = None
		return profile.save()
	def rm(self, request):
		if request and not self.is_mine(request.user) and not self.can_rm(request):
			return False
		if self.is_favorite(request.user):
			self.unfavorite(request.user)
		self.is_rm = True
		if self.is_mine(request.user):
			self.status = 1
		else:
			self.status = 2
		self.save()
	def setup(self, request):
		self.has_yeah = self.has_yeah(request)
		self.can_yeah = self.can_yeah(request)
		self.is_mine = self.is_mine(request.user)
	
class Comment(models.Model):
	unique_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
	id = models.AutoField(primary_key=True)
	original_post = models.ForeignKey(Post)
	community = models.ForeignKey(Community)
	feeling = models.SmallIntegerField(default=0, choices=feelings)
	body = models.TextField(null=True)
	screenshot = models.CharField(max_length=1200, null=True, blank=True, default='')
	drawing = models.CharField(max_length=200, null=True, blank=True)
	spoils = models.BooleanField(default=False)
	created = models.DateTimeField(auto_now_add=True)
	edited = models.DateTimeField(auto_now=True)
	befores = models.TextField(null=True, blank=True)
	has_edit = models.BooleanField(default=False)
	is_rm = models.BooleanField(default=False)
	status = models.SmallIntegerField(default=0, choices=post_status)
	creator = models.ForeignKey(User, blank=True, null=True)

	objects = PostManager()
	real = models.Manager()

	def __str__(self):
		return self.body[:250]
	def is_reply(self):
		return True
	def trun(self):
		if self.is_rm:
			return 'deleted'
		if self.drawing:
			return '(drawing)'
		else:
			return self.body
	def is_mine(self, user):
		if user.is_authenticated:
			return (self.creator == user)
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
			return not self.is_mine(request.user)
		else:
			return False
	def can_rm(self, request):
		if request.user.level > 0 or self.original_post.is_mine(request.user):
			return True
	def give_yeah(self, request):
		if not request.user.has_freedom() and Yeah.objects.filter(by=request.user, created__gt=timezone.now() - timedelta(seconds=5)).exists():
			return False
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
	def change(self, request):
		if not self.is_mine(request.user) or self.has_edit:
			return 1
		if not request.POST.get('body') or len(request.POST['body']) > 2200:
			return 1
		if not self.befores:
			befores_json = []
		else:
			befores_json = json.loads(self.befores)
		befores_json.append(self.body)
		self.befores = json.dumps(befores_json)
		self.body = request.POST['body']
		self.spoils = request.POST.get('is_spoiler', False)
		self.feeling = request.POST.get('feeling_id', 0)
		if not timezone.now() < self.created + timezone.timedelta(minutes=5):
			self.has_edit = True
		return self.save()
	def rm(self, request):
		if request and not self.is_mine(request.user) and not self.can_rm(request):
			return False
		self.is_rm = True
		if self.is_mine(request.user):
			self.status = 1
		else:
			self.status = 2
		return self.save()
	def setup(self, request):
		self.has_yeah = self.has_yeah(request)
		self.can_yeah = self.can_yeah(request)
		self.is_mine = self.is_mine(request.user)

class Yeah(models.Model):
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
	by = models.ForeignKey(User)
	# 0 - post, 2 - comment
	type = models.SmallIntegerField(default=0, choices=((0, 'post'), (1, 'comment'), ))
	post = models.ForeignKey(Post, null=True, blank=True)
	comment = models.ForeignKey(Comment, null=True, blank=True)
	created = models.DateTimeField(auto_now_add=True)

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

	origin_id = models.CharField(max_length=16, null=True, blank=True)
	origin_info = models.CharField(max_length=255, null=True, blank=True)

	comment = models.TextField(blank=True, default='')
	country = models.CharField(max_length=120, blank=True, default='')
	#birthday = models.DateField(null=True, blank=True)
	# 0 - show, 1 - friends only, 2 - hide
	id_visibility = models.SmallIntegerField(default=0, choices=((0, 'show'), (1, 'friends only'), (2, 'hide'), ))
	#relationship_visibility = models.SmallIntegerField(default=0, choices=((0, 'show'), (1, 'friends only'), (2, 'hide'), ))
	weblink = models.CharField(max_length=1200, blank=True, default='')
	#gameskill = models.SmallIntegerField(default=0)
	external = models.CharField(max_length=255, blank=True, default='')
	favorite = models.ForeignKey(Post, blank=True, null=True)
	let_yeahnotifs = models.BooleanField(default=True)
	let_freedom = models.BooleanField(default=True)
	adopted = models.ForeignKey(User, null=True, blank=True, related_name='children')
	
	def __str__(self):
		return "profile " + str(self.unique_id) + " for " + self.user.username
	def origin_id_public(self, user=None):
		if user == self.user:
			return self.user.origin_id
		if self.id_visibility == 2:
			return 1
		elif self.id_visibility == 1:
			if not Friendship.find_friendship(self.user, user):
				return 1
			return self.user.origin_id
		elif not self.user.origin_id:
			return None
		return self.user.origin_id
	def got_fullurl(self):
		if self.weblink:
			try:
				URLValidator()(value=self.weblink)
			except ValidationError:
				return False
			return True
		return False
	def setup(self, request):
		self.origin_id_public = self.origin_id_public(request.user)

class Follow(models.Model):
	unique_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
	id = models.AutoField(primary_key=True)
	source = models.ForeignKey(User, related_name='follow_source')
	target = models.ForeignKey(User, related_name='follow_target')
	created = models.DateTimeField(auto_now_add=True)
	
	def __str__(self):
		return "follow: from " + self.source.username + " to " + self.target.username

class Notification(models.Model):
	unique_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
	
	to = models.ForeignKey(User, related_name='notification_to')
	source = models.ForeignKey(User, related_name='notification_sender')
	read = models.BooleanField(default=False)
	type = models.SmallIntegerField(choices=(
	(0, 'Yeah on post'),
	(1, 'Yeah on comment'),
	(2, 'Comment on my post'),
	(3, 'Comment on others\' post'),
	(4, 'Follow to me'),
	))
	merged_with = models.ForeignKey('self', related_name='merged', null=True, blank=True)
	context_post = models.ForeignKey(Post, null=True, blank=True)
	context_comment = models.ForeignKey(Comment, null=True, blank=True)
	
	created = models.DateTimeField(auto_now_add=True)
	latest = models.DateTimeField(auto_now=True)

	def __str__(self):
		return "Notification from " + str(self.source) + " to " + str(self.to) + " with type \"" + self.get_type_display() + "\""
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
		merges = self.merged.filter().order_by('created')
		for merge in merges:
			arr.append(merge.source)
		return arr
	# In the future, please put giving notifications for classes into their respective classes (right now they're in views)
	def give_notification(user, type, to, post=None, comment=None):
		# Just keeping this simple for now, might want to make it better later
		# If the user sent a notification to this user at least 5 seconds ago, return False
		# Or if user is to
		# Or if yeah notifications are off and this is a yeah notification
		user_is_self_unk = (not type == 3 and user == to)
		is_notification_too_fast = user.notification_sender.filter(created__gt=timezone.now() - timedelta(seconds=5), to=to)
		user_no_yeahnotif = (not to.profile().let_yeahnotifs and (type == 0 or type == 1))
		if user_is_self_unk or is_notification_too_fast or user_no_yeahnotif:
			return False
		# Search for my own notifiaction. If it exists, set it as unread.
		merge_own = user.notification_sender.filter(created__gt=timezone.now() - timedelta(hours=8), to=to, type=type, context_post=post, context_comment=comment)
		if merge_own:
			# If it's merged, don't unread that one, but unread what it's merging.
			if merge_own.first().merged_with:
				return merge_own.first().merged_with.set_unread()
			else:
				return merge_own.first().set_unread()
		# Search for a notification already there so we can merge with it if it exists
		merge_s = Notification.objects.filter(created__gt=timezone.now() - timedelta(hours=8), to=to, type=type, context_post=post, context_comment=comment, merged_with=None)
		# If it exists, merge with it. Else, create a new notification.
		if merge_s:
			return merge_s.first().merge(user)
		else:
			return user.notification_sender.create(source=user, type=type, to=to, context_post=post, context_comment=comment)

class Complaint(models.Model):
	unique_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
	id = models.AutoField(primary_key=True)
	creator = models.ForeignKey(User)
	type = models.SmallIntegerField(choices=(
	(0, 'Bug report'),
	(1, 'Suggestion'),
	(2, 'Want'),
	))
	body = models.TextField(blank=True, default='')
	sex = models.SmallIntegerField(null=True, choices=((0, 'girl'), (1, 'privileged one'), (2, '(none)'),
	))
	created = models.DateTimeField(auto_now_add=True)
	
	def __str__(self):
		return "\"" + str(self.body) + "\" from " + str(self.creator) + " as a " + str(self.get_sex_display())
	def has_past_sent(user):
		return user.complaint_set.filter(created__gt=timezone.now() - timedelta(minutes=5)).exists()

class FriendRequest(models.Model):
	unique_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
	id = models.AutoField(primary_key=True)
	source = models.ForeignKey(User, related_name='fr_source')
	target = models.ForeignKey(User, related_name='fr_target')
	body = models.TextField(blank=True, null=True, default='')
	read = models.BooleanField(default=False)
	finished = models.BooleanField(default=False)
	created = models.DateTimeField(auto_now_add=True)
	
	def __str__(self):
		return "friend request ("+str(self.finished)+"): from " + str(self.source) + " to " + str(self.target)
	def finish(self):
		self.finished = True
		self.save()

class Friendship(models.Model):
	unique_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
	id = models.AutoField(primary_key=True)
	source = models.ForeignKey(User, related_name='friend_source')
	target = models.ForeignKey(User, related_name='friend_target')
	created = models.DateTimeField(auto_now_add=True)
	latest = models.DateTimeField(auto_now=True)
	
	def __str__(self):
		return "friendship with " + str(self.source) + " and " + str(self.target)
	def update(self):
		return self.save(update_fields=['latest'])
	def other(self, user):
		if self.source == user:
			return self.target
		return self.source
	def conversation(self):
		conv = Conversation.objects.filter(Q(source=self.source) & Q(target=self.target) | Q(target=self.source) & Q(source=self.target)).order_by('-created')
		if not conv:
			return Conversation.objects.create(source=self.source, target=self.target)
		return conv.first()

	def get_friendships(user, limit=50, offset=0, latest=False):
		if not limit:
			return Friendship.objects.filter(Q(source=user) | Q(target=user)).order_by('-created')
		if latest:
			return Friendship.objects.filter(Q(source=user) | Q(target=user)).order_by('-latest')[offset:offset + limit]
		else:
			return Friendship.objects.filter(Q(source=user) | Q(target=user)).order_by('-created')[offset:offset + limit]
	def find_friendship(first, second):
		return Friendship.objects.filter(Q(source=first) & Q(target=second) | Q(target=first) & Q(source=second)).order_by('-created').first()
	def get_friendships_message(user, limit=20, offset=0):
		friends_list = Friendship.get_friendships(user, limit, offset, True)
		friends = []
		for friend in friends_list:
			friends.append(friend.other(user))
		del(friends_list)
		for friend in friends:
			friend.get_latest_msg = friend.get_latest_msg(user)
		return friends

class Conversation(models.Model):
	unique_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
	id = models.AutoField(primary_key=True)
	source = models.ForeignKey(User, related_name='conv_source')
	target = models.ForeignKey(User, related_name='conv_target')
	created = models.DateTimeField(auto_now_add=True)
	
	def __str__(self):
		return "conversation with " + str(self.source) + " and " + str(self.target)
	def latest_message(self, user):
		msgs = Message.objects.filter(conversation=self).order_by('-created')[:5]
		if not msgs:
			return False
		message = msgs.first()
		message.mine = message.mine(user)
		return message
	def unread(self, user):
		return self.message_set.filter(read=False).exclude(creator=user).order_by('-created')
	def set_read(self, user):
		return self.unread(user).update(read=True)
	def all_read(self):
		return self.message_set.filter().update(read=True)
	def messages(self, request, limit=50, offset=0):
		msgs = self.message_set.filter().order_by('-created')[offset:offset + limit]
		for msg in msgs:
			msg.mine = msg.mine(request.user)
		return msgs
	def make_message(self, request):
		if not request.user.has_freedom() and (request.POST.get('url') or request.FILES.get('screen')):
			return 6
		if Message.real.filter(creator=request.user, created__gt=timezone.now() - timedelta(seconds=2)).exists():
			return 3
		if len(request.POST['body']) > 50000 or (len(request.POST['body']) < 1 and not request.POST.get('_post_type') == 'painting'):
			return 1
		upload = None
		drawing = None
		if request.FILES.get('screen'):
			upload = util.image_upload(request.FILES['screen'], True)
			if upload == 1:
				return 2
		if request.POST.get('painting') and request.POST.get('_post_type') == 'painting':
			drawing = util.image_upload(request.POST['painting'])
			if drawing == 1:
				return 2
		new_post = self.message_set.create(body=request.POST.get('body'), creator=request.user, feeling=int(request.POST.get('feeling_id', 0)), drawing=drawing, screenshot=upload)
		new_post.mine = True
		return new_post
class Message(models.Model):
	unique_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
	id = models.AutoField(primary_key=True)
	conversation = models.ForeignKey(Conversation)
	feeling = models.SmallIntegerField(default=0, choices=feelings)
	body = models.TextField(null=True)
	drawing = models.CharField(max_length=200, null=True, blank=True)
	screenshot = models.CharField(max_length=1200, null=True, blank=True, default='')
	url = models.URLField(max_length=1200, null=True, blank=True, default='')
	created = models.DateTimeField(auto_now_add=True)
	read = models.BooleanField(default=False)
	is_rm = models.BooleanField(default=False)
	creator = models.ForeignKey(User)

	objects = PostManager()
	real = models.Manager()

	def __str__(self):
		return self.body[:250]
	def trun(self):
		if self.is_rm:
			return 'deleted'
		if self.drawing:
			return '(drawing)'
		else:
			return self.body
	def mine(self, user):
		if self.creator == user:
			return True
		return False
	def rm(self, request):
		if self.conversation.source == request.user or self.conversation.target == request.user:
			self.is_rm = True
			return self.save()

	def makeopt(ls):
		if len(ls) < 1:
			raise ValueError
		return json.dumps(ls)

class Poll(models.Model):
	unique_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
	id = models.AutoField(primary_key=True)
	able_vote = models.BooleanField(default=True)
	choices = models.TextField(default="[]")
	created = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return "A poll created at " + str(self.created)
	def num_votes(self):
		return self.pollvote_set.count()
	def vote(self, user, opt):
		ex_query = self.pollvote_set.filter(by=user)
		if ex_query.exists():
			ex_query.first().delete()
		self.pollvote_set.create(by=user, choice=opt)
	def unvote(self, user):
		vote = self.pollvote_set.filter(by=user).first()
		if vote:
			vote.delete()
	def setup(self):
		self.choices = json.loads(self.choices)
		self.num_votes = self.num_votes()
class PollVote(models.Model):
	id = models.AutoField(primary_key=True)
	done = models.DateTimeField(auto_now_add=True)
	choice = models.SmallIntegerField(default=0)
	poll = models.ForeignKey(Poll)
	by = models.ForeignKey(User)
	
	def __str__(self):
		return "A vote on option " + str(self.choice) + " for poll \"" + str(self.poll) + "\" by " + str(self.by)

class RedFlag(models.Model):
	id = models.AutoField(primary_key=True)
	created = models.DateTimeField(auto_now_add=True)
	post = models.ForeignKey(Post, blank=True, null=True)
	comment = models.ForeignKey(Comment, blank=True, null=True)
	user = models.ForeignKey(User, blank=True, null=True)
	type = models.SmallIntegerField(choices=((0, 'Post'), (1, 'Comment'), (2, 'User'), ))
	reason = models.SmallIntegerField(choices=((0, "Actual harassment"), (1, "Spam"), (2, "I don't like this"), (3, "Personal info"), (4, "Obscene use of swearing"), (5, "NSFW where not allowed"), (6, "Overly advertising/spam"), (7, "Please delete this")))
	reasoning = models.TextField(default='', null=True, blank=True)
	
	def __str__(self):
		return "Report on a " + self.get_type_display() + " for " + self.get_reason_display() + ": " + str(self.reasoning)
	
# Fun
class ThermostatTouch(models.Model):
	id = models.AutoField(primary_key=True)
	created = models.DateTimeField(auto_now_add=True)
	who = models.ForeignKey(User, blank=True, null=True)
	lvl = models.IntegerField(default=1)
	
	def __str__(self):
		return str(created) + " touched the thermostat, setting it to " + str(lvl) + " degrees celsius"
