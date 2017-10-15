from lxml import html
# Todo: move all requests to using requests instead of urllib3
import urllib.request, urllib.error
import requests
from lxml import etree

import json
import time
import os.path
from PIL import Image, ExifTags
from datetime import datetime
from math import floor
from hashlib import md5, sha1
# lol bye Cloudinary, see you another day
#import cloudinary
#import cloudinary.uploader
#import cloudinary.api
import io
from uuid import uuid4
import imghdr
import base64
from closedverse import settings
import re

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


def get_mii(id):
	# Using Miiverse off-device server
	try:
		page = urllib.request.urlopen('https://miiverse.nintendo.net/users/{0}/favorites'.format(id)).read()
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
	
	# Using AccountWS, not being used now
	"""
	dmca = {
		'X-Nintendo-Client-ID': 'a2efa818a34fa16b8afbc8a74eba3eda',
		'X-Nintendo-Client-Secret': 'c91cdb5658bd4954ade78533a339cf9a',
	}
	nnid = requests.get('https://accountws.nintendo.net/v1/api/admin/mapped_ids?input_type=user_id&output_type=pid&input=' + sys.argv[1], headers=dmca)
	nnid_dec = etree.fromstring(nnid.content)
	del(nnid)
	pid = nnid_dec[0][1].text
	if not pid:
		return False
	del(nnid_dec)
	mii = requests.get('https://accountws.nintendo.net/v1/api/miis?pids=' + pid, headers=dmca)
	try:
		mii_dec = etree.fromstring(mii.content)
	# Can't be fucked to put individual exceptions to catch here
	except:
		return False
	del(mii)
	miihash = mii_dec[0][2][0][0].text.split('.net/')[1].split('_')[0]
	screenname = mii_dec[0][3].text
	nnid = mii_dec[0][6].text
	del(mii_dec)
	"""
	
	return [miihash, screenname, id]


def recaptcha_verify(request, key):
	if not request.POST.get('g-recaptcha-response'):
		return False
	re_request = urllib.request.urlopen('https://www.google.com/recaptcha/api/siteverify?secret={0}&response={1}'.format(key, request.POST['g-recaptcha-response']))
	jsond = json.loads(re_request.read().decode())
	if not jsond['success']:
		return False
	return True


def image_upload(img, stream=False):
	if stream:
		decodedimg = img.read()
	else:
		if img == 'iVBORw0KGgoAAAANSUhEUgAAAUAAAAB4CAYAAACDziveAAADi0lEQVR4Xu3UAQ0AMAwCwc2/aJbMxl8dcDTcbTuOAAECQYFrAIOti0yAwBcwgB6BAIGsgAHMVi84AQIG0A8QIJAVMIDZ6gUnQMAA+gECBLICBjBbveAECBhAP0CAQFbAAGarF5wAAQPoBwgQyAoYwGz1ghMgYAD9AAECWQEDmK1ecAIEDKAfIEAgK2AAs9ULToCAAfQDBAhkBQxgtnrBCRAwgH6AAIGsgAHMVi84AQIG0A8QIJAVMIDZ6gUnQMAA+gECBLICBjBbveAECBhAP0CAQFbAAGarF5wAAQPoBwgQyAoYwGz1ghMgYAD9AAECWQEDmK1ecAIEDKAfIEAgK2AAs9ULToCAAfQDBAhkBQxgtnrBCRAwgH6AAIGsgAHMVi84AQIG0A8QIJAVMIDZ6gUnQMAA+gECBLICBjBbveAECBhAP0CAQFbAAGarF5wAAQPoBwgQyAoYwGz1ghMgYAD9AAECWQEDmK1ecAIEDKAfIEAgK2AAs9ULToCAAfQDBAhkBQxgtnrBCRAwgH6AAIGsgAHMVi84AQIG0A8QIJAVMIDZ6gUnQMAA+gECBLICBjBbveAECBhAP0CAQFbAAGarF5wAAQPoBwgQyAoYwGz1ghMgYAD9AAECWQEDmK1ecAIEDKAfIEAgK2AAs9ULToCAAfQDBAhkBQxgtnrBCRAwgH6AAIGsgAHMVi84AQIG0A8QIJAVMIDZ6gUnQMAA+gECBLICBjBbveAECBhAP0CAQFbAAGarF5wAAQPoBwgQyAoYwGz1ghMgYAD9AAECWQEDmK1ecAIEDKAfIEAgK2AAs9ULToCAAfQDBAhkBQxgtnrBCRAwgH6AAIGsgAHMVi84AQIG0A8QIJAVMIDZ6gUnQMAA+gECBLICBjBbveAECBhAP0CAQFbAAGarF5wAAQPoBwgQyAoYwGz1ghMgYAD9AAECWQEDmK1ecAIEDKAfIEAgK2AAs9ULToCAAfQDBAhkBQxgtnrBCRAwgH6AAIGsgAHMVi84AQIG0A8QIJAVMIDZ6gUnQMAA+gECBLICBjBbveAECBhAP0CAQFbAAGarF5wAAQPoBwgQyAoYwGz1ghMgYAD9AAECWQEDmK1ecAIEDKAfIEAgK2AAs9ULToCAAfQDBAhkBQxgtnrBCRAwgH6AAIGsgAHMVi84AQIG0A8QIJAVMIDZ6gUnQMAA+gECBLICBjBbveAECDyPXt6oD5NyewAAAABJRU5ErkJggg==':
			return 1
		try:
			decodedimg = base64.b64decode(img)
		except binascii.Error:
			return 1
	
	im = Image.open(io.BytesIO(decodedimg))
	# Taken from https://coderwall.com/p/nax6gg/fix-jpeg-s-unexpectedly-rotating-when-saved-with-pil
	if hasattr(im, '_getexif'):
		orientation = 0x0112
		exif = im._getexif()
		if exif is not None:
			orientation = exif.get(orientation)
			rotations = {
				3: Image.ROTATE_180,
				6: Image.ROTATE_270,
				8: Image.ROTATE_90
			}
			if orientation in rotations:
				im = im.transpose(rotations[orientation])
	im.thumbnail((1280, 1280), Image.ANTIALIAS)
	# I know some people have aneurysms when they see people actually using SHA1 in the real world, for anything in general.
	# Yes, we are really using it. Sorry if that offends you. It's just fast and I don't feel I need anything more random, since we are talking about IMAGES.
	imhash = sha1(im.tobytes()).hexdigest()
	floc = imhash + '.png'
	if not os.path.exists(settings.MEDIA_ROOT + floc):
		im.save(settings.MEDIA_ROOT + floc, 'PNG')
	return settings.MEDIA_URL + floc

def get_gravatar(email):
	try:
		page = urllib.request.urlopen('https://gravatar.com/avatar/'+ md5(email.encode('utf-8').lower()).hexdigest() +'?d=404&s=128')
	except:
		return False
	return page.geturl()

def filterchars(str):
	if str.isspace():
		return 'None'
	if "\u202e" in str:
		return str.split("\u202e")[1]
	return str
	
def getipintel(addr):
	# My router's IP prefix is 192.168.1.*, so this works in debug
	if settings.ipintel_email and not '192.168' in addr:
		try:
			site = urllib.request.urlopen('https://check.getipintel.net/check.php?ip={0}&contact={1}'
			.format(addr, settings.ipintel_email))
		except:
			return 0
		return float(site.read().decode())
	else:
		return 0