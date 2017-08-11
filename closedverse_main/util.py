from lxml import html
import urllib.request, urllib.error
import json
import time
from datetime import datetime
from math import floor

def HumanTime(date, full=False):
	now = time.time()
	if ((now - date) >= 345600) or full:
		return datetime.fromtimestamp(date).strftime('%m/%d/%Y %l:%M %p')
	interval = (now - date)
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
	
	return [miihash, screenname, nnid]
def recaptcha_verify(request, key):
	if not request.POST['g-recaptcha-response']:
		return False
	re_request = urllib.request.urlopen('https://www.google.com/recaptcha/api/siteverify?secret={0}&response={1}'.format(key, request.POST['g-recaptcha-response']))
	jsond = json.loads(re_request.read().decode())
	if not jsond['success']:
		return False
	return True