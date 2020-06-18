"""
Local settings for Closedverse.

Everything set here overrides the values set in settings_default.py.

View that file for information on what these keys are for.
"""

# This line imports default settings and is required.
from .settings_default import *

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# The secret key is set by a "SECRET_KEY" environment variable
# example: ... SECRET_KEY=my-secret ./manage.py runserver
SECRET_KEY = os.environ.get('SECRET_KEY')

DEBUG = True

# This is just a default value for testing
# Do not include 127.0.0.1 or localhost
# in production for security reasons.
ALLOWED_HOSTS = [
    '127.0.0.1',
]

# Test app
#INSTALLED_APPS += 'silk'

#MIDDLEWARE += 'silk.Middleware.SilkyMiddleware'

# Database definition
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'closedverse.sqlite3'),
    }
}

TIME_ZONE = 'EST'

