#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Minify closedverse.js, closedverse.css files"""
#pip3 install requests
import requests

import os

adir = '%s/static/closedverse.' % os.getcwd()
url = 'https://javascript-minifier.com/raw'
urlcss = 'https://cssminifier.com/raw'
try:
	js_response = requests.post(url, data={'input': open('{}js'.format(adir), 'rb').read()}).text
	open('%smin.js' % adir, 'w').write(js_response)

	csstxt = open('%smin.css' % adir, 'r').read()
	css_response = requests.post(urlcss, {'input': csstxt}).text
	#open('%smin.css' % adir, 'w').write(css_response)
except Exception as e:
	print("Aw.\n" + str(e))
print("Minified.")
