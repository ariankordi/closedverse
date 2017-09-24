from lxml import html
import urllib.request, urllib.error
import json
import time
from PIL import Image, ExifTags
from datetime import datetime
from math import floor
from hashlib import md5
#import cloudinary
#import cloudinary.uploader
#import cloudinary.api
import io
from uuid import uuid4
import imghdr
import base64
from closedverse import settings

def HumanTime(date, full=False):
	now = time.time()
	if ((now - date) >= 345600) or full:
		return datetime.fromtimestamp(date).strftime('%m/%d/%Y %l:%M %p')
	interval = (now - date) or 1
	if interval <= 59:
		return 'Less than a minute ago'
	intvals = [86400, 3600, 60, ]
	for i in intvals:
		if interval < i:
			continue
		nounits = floor(interval / i)
		text = {86400: 'day', 3600: 'hour', 60: 'minute', }.get(i)
		if nounits > 1:
			text += 's'
		return str(nounits) + ' ' + text + ' ago';


def get_mii(nnid):
	try:
		page = urllib.request.urlopen('https://miiverse.nintendo.net/users/{0}/favorites'.format(nnid)).read()
	except urllib.error.HTTPError:
		return False
	ftree = html.fromstring(page)
	miihash = ftree.xpath('//*[@id="sidebar-profile-body"]/div/a/img/@src')[0].split('.net/')[1].split('_n')[0]
	screenname = ftree.xpath('//*[@id="sidebar-profile-body"]/a/text()')[0]
	ou_check = ftree.xpath('//*[@id="sidebar-profile-body"]/div/@class')
	if ou_check and 'official-user' in ou_check[0]:
		return False
	if "img/anonymous-mii.png" in miihash:
		miihash = settings.STATIC_URL + '/img/anonymous-mii.png'
	
	return [miihash, screenname, nnid]

def recaptcha_verify(request, key):
	if not request.POST.get('g-recaptcha-response'):
		return False
	re_request = urllib.request.urlopen('https://www.google.com/recaptcha/api/siteverify?secret={0}&response={1}'.format(key, request.POST['g-recaptcha-response']))
	jsond = json.loads(re_request.read().decode())
	if not jsond['success']:
		return False
	return True


def image_upload(img):
	if img == 'iVBORw0KGgoAAAANSUhEUgAAAUAAAAB4CAYAAACDziveAAADi0lEQVR4Xu3UAQ0AMAwCwc2/aJbMxl8dcDTcbTuOAAECQYFrAIOti0yAwBcwgB6BAIGsgAHMVi84AQIG0A8QIJAVMIDZ6gUnQMAA+gECBLICBjBbveAECBhAP0CAQFbAAGarF5wAAQPoBwgQyAoYwGz1ghMgYAD9AAECWQEDmK1ecAIEDKAfIEAgK2AAs9ULToCAAfQDBAhkBQxgtnrBCRAwgH6AAIGsgAHMVi84AQIG0A8QIJAVMIDZ6gUnQMAA+gECBLICBjBbveAECBhAP0CAQFbAAGarF5wAAQPoBwgQyAoYwGz1ghMgYAD9AAECWQEDmK1ecAIEDKAfIEAgK2AAs9ULToCAAfQDBAhkBQxgtnrBCRAwgH6AAIGsgAHMVi84AQIG0A8QIJAVMIDZ6gUnQMAA+gECBLICBjBbveAECBhAP0CAQFbAAGarF5wAAQPoBwgQyAoYwGz1ghMgYAD9AAECWQEDmK1ecAIEDKAfIEAgK2AAs9ULToCAAfQDBAhkBQxgtnrBCRAwgH6AAIGsgAHMVi84AQIG0A8QIJAVMIDZ6gUnQMAA+gECBLICBjBbveAECBhAP0CAQFbAAGarF5wAAQPoBwgQyAoYwGz1ghMgYAD9AAECWQEDmK1ecAIEDKAfIEAgK2AAs9ULToCAAfQDBAhkBQxgtnrBCRAwgH6AAIGsgAHMVi84AQIG0A8QIJAVMIDZ6gUnQMAA+gECBLICBjBbveAECBhAP0CAQFbAAGarF5wAAQPoBwgQyAoYwGz1ghMgYAD9AAECWQEDmK1ecAIEDKAfIEAgK2AAs9ULToCAAfQDBAhkBQxgtnrBCRAwgH6AAIGsgAHMVi84AQIG0A8QIJAVMIDZ6gUnQMAA+gECBLICBjBbveAECBhAP0CAQFbAAGarF5wAAQPoBwgQyAoYwGz1ghMgYAD9AAECWQEDmK1ecAIEDKAfIEAgK2AAs9ULToCAAfQDBAhkBQxgtnrBCRAwgH6AAIGsgAHMVi84AQIG0A8QIJAVMIDZ6gUnQMAA+gECBLICBjBbveAECBhAP0CAQFbAAGarF5wAAQPoBwgQyAoYwGz1ghMgYAD9AAECWQEDmK1ecAIEDKAfIEAgK2AAs9ULToCAAfQDBAhkBQxgtnrBCRAwgH6AAIGsgAHMVi84AQIG0A8QIJAVMIDZ6gUnQMAA+gECBLICBjBbveAECDyPXt6oD5NyewAAAABJRU5ErkJggg==':
		return 1
	try:
		decodedimg = base64.b64decode(img)
	except binascii.Error:
		return 1
	what = imghdr.what('', decodedimg)
	if not what:
		return 1
	
	im = Image.open(io.BytesIO(decodedimg))
	if hasattr(im, '_getexif'):
		for orientation in ExifTags.TAGS.keys():
			if ExifTags.TAGS[orientation] == 'Orientation':
				break 
			e = im._getexif()
			if not e is None:
				orientation = dict(e.items()).get(orientation)
		if orientation == 3:   im = im.transpose(Image.ROTATE_180)
		elif orientation == 6: im = im.transpose(Image.ROTATE_270)
		elif orientation == 8: im = im.transpose(Image.ROTATE_90)
	im.thumbnail((1280, 1280), Image.ANTIALIAS)
	floc = str(uuid4()) + '.png'
	im.save(settings.MEDIA_ROOT + floc, 'PNG')
	return settings.MEDIA_URL + floc

def get_gravatar(email):
	try:
		page = urllib.request.urlopen('https://gravatar.com/avatar/'+ md5(email.encode('utf-8').lower()).hexdigest() +'?d=404&s=128')
	except:
		return False
	return page.geturl()

def filterchars(str):
	if "\u202e" in str:
		return str.split("\u202e")[1]
	return str