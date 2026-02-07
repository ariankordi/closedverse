# Closedverse (2023)
This was a Miiverse clone released on September 9th, 2017. Written in Python with Django. It originally ran from 2017 to 2019, with thousands of users.

The name originally mocked [Openverse](https://github.com/PF2M/Openverse) by PF2M, with the goal originally being to rewrite it to be flexible and more stable. The original code is [available in the main-2017 branch.](https://github.com/ariankordi/closedverse/tree/main-2017)

The idea for a new version came up in 2023 by [TermOfficial/parakeet-live](https://github.com/parakeet-live), and I tried to add features from other forks ("Blueverse", Cedar-Django prior to July 2023).

To be clear, I don't fully support running Miiverse clones and especially dread this old codebase by now. However, if I don't merge all of the forks together, then nobody will.

So, this repo is a place for me to keep "supporting" this (as of writing) 9 year old codebase.

The least worst alternative is [Indigo](https://github.com/PF2M/Indigo) which I've also tried to push changes to in 2023, but it has its own problems as well.

# Install/setup
_Updated January 18th, 2026_

Installs like any other Django app. If the tutorial below doesn't help, here are some other ones that accomplish the same thing:
* [Cedar-Django's readme](https://github.com/Mistake35/Cedar-Django/blob/main/README.md)
* [Minihoot's readme](https://github.com/Hoot679/closedverse-video-support/blob/main/README.md)
* [oasisclosed's readme](https://github.com/lunaisnotaboy/oasisclosed/blob/master/readme.md)

If you know what you're doing, you can skip most of the following headlines.
## Install dependencies
You'll need Python, Pip, optionally venv if your operating system needs it, and all of the dependencies.
### Install Python
First things first, make sure Python and Pip are installed on your OS.
* On Ubuntu/Debian, you can run `sudo apt install python3-pip`, and it'll install both.
* For other operating systems, pip _should_ just come from wherever you installed Python.
### Configure venv (Skippable)
You may need to use it if you come across issues while installing packages or when it comes to versions.

1. Install venv with `sudo apt install python3-venv`.
2. Afterwards, create a virtual env by running: `python3 -m venv closedverse-venv` _(You can use any name you want)_
3. After that, if you run `source closedverse-venv/bin/activate`, you will enter that environment.

When you use venv, **you will need to activate** (step 3) **every single time** you run or install packages. OK?
### Download this project
Downloading the master.zip and extracting it will work, but it's recommended to use Git.
1. Install Git with `sudo apt install git`
2. Then run the following:
`git clone https://github.com/ariankordi/closedverse -b main-2023`

Now Closedverse should be downloaded to the `closedverse` folder.
### Install from dependencies.txt
In the `closedverse` folder, run this:
* `python3 -m pip install -r requirements.txt`

If you install something with pip and see an error saying `error: externally-managed-environment`, **then you'll need to use venv.** [Set it up and activate](#configure-venv-you-can-skip-this), **then try pip after it's set up.**

* **NOTE**: Some dependencies may give you cryptic compiler errors from gcc. If this does happen, try installing problematic packages through apt, examples: `sudo apt install python3-pil python3-lxml` (_Untested within venv and may not work_)
## Configure Closedverse
If everything is installed and working fine, we can finally move on to configuring Closedverse.
1. Open up closedverse/**settings-stripped.py**.
2. You'll need to **save it as** closedverse/**settings.py**.
3. Fill in SECRET_KEY [using this site, just hit generate.](https://miniwebtool.com/django-secret-key-generator/)
4. Put the name of your domain in ALLOWED_HOSTS. _If you forget about this, Django will remind you._

Keep in mind, those are all of the _mandatory_ steps. For everything else, **configure as necessary!**
This is elaborated on in a later section called _Notes about configuration_.
### Migrate/initialize database
After saving settings.py, you can initialize the database by running the following:
1. `python3 manage.py makemigrations closedverse_main`
2. `python3 manage.py migrate`

Let's make an admin user (_you can choose to do this later_):
* `python3 manage.py createsuperuser`

NOTE: you only have to do the above **for a new database**, or if models.py is updated.

### Run with runserver
Finally, you can run the site with this command:
`python3 manage.py runserver 0.0.0.0:8000`

It will run at port 8000, but you can change the port. It won't run with https in this mode, and it's generally not recommended to do this since you won't have access logs either.

Here, you can play with the Django admin panel. Just go to /admin on your instance and you can manage pretty much everything at a low level.

## Notes about configuration
By default, the site will...
* Use SQLite by default

The database is at `closedverse.sqlite3` by default. To change this, search `DATABASES` in settings.py.

**If you want to set up MySQL, [see below](#using-mysql-as-a-database).**
* Upload images locally to `media/`

As of writing, there's no way to use another image provider, such as Cloudinary (that has been stripped out because they suck). This may pose an issue if your VPS has a low bandwidth limit.
* Users' IPs will reflect Cloudflare's servers if you host behind Cloudflare.

If you use Cloudflare, **you should fix this.** Install `django-xff` with Pip, then uncomment the line starting with `xff.middleware`... in settings.py, and confirm if IPs are correct. It's easy to mess this up, so pay attention to this.

**Please, please read settings.py** for more information. You can even change the site's name through there.
# Run with Gunicorn
I recommend running the site via Gunicorn, since it's faster and supports access logs.

**NOTE:** Set `DEBUG = False` in settings.py before you do this, or else static assets won't work.
1. Install Gunicorn: `python3 -m pip install gunicorn`
2. Test it out: `python3 -m gunicorn closedverse.wsgi --bind 0.0.0.0:8000`

You can also substitute `python3 -m gunicorn` with just `gunicorn` if that works out for you. **Remember to use your venv if you have one set up.**

Now, let's run gunicorn automatically:
## Set up systemd service (Linux only)
AKA, how to run Closedverse automatically, on boot, with error and access logging.
1. Make sure you're root, or use sudo when doing the following:
2. Copy `gunicorn-closedverse.service` to `/etc/systemd/system`.
3. Edit the file (`sudo nano /etc/systemd/system/gunicorn-closedverse.service`) and adjust it accordingly.
	* If you're using venv, make sure the PATH reflects it.
	* More importantly, change the user if you don't intend to run this as root, and change the path to the `closedverse` directory if it's not at the root of your home directory. `%h` is used as a standin for your home directory in systemd services.
	* Also adjust the port accordingly with the `bind` parameter. [Optionally enable SSL.](https://docs.gunicorn.org/en/stable/settings.html#ssl)
4. Run `sudo systemctl daemon-reload`.
	* You will need to run this every time you change the .service file, or else the changes will not persist.
* Start the service with `sudo systemctl start gunicorn-closedverse`.
* View the status with `sudo systemctl status gunicorn-closedverse`.
If there's an error, this is when you will know.

If there's no problems, make the service run at bootup by running `sudo systemctl enable gunicorn-closedverse`.

**PROTIP:** optimize and adjust Gunicorn to your liking (**you can also enable SSL!**) by following [their settings page.](https://docs.gunicorn.org/en/stable/settings.html) Either add settings to the .service file or start using a conf file.

# Using MySQL as a database
This is the "proper" database compared to SQLite. These directions are assuming you already set it up, otherwise this isn't for you.

(Look up "install mariadb and adminer on ubuntu", or whatever, and it'll get you pretty far.)

1. Replace the `DATABASES =` entry with this.
```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': '', ##< DB name
        'USER': '', ##< Username
        'PASSWORD': '', ##< User password
        'HOST': '127.0.0.1',
        'PORT': '', ##< Default port = 3306.
    }
}
```
2. Put in your DB/user/password info where you see `##<`
3. Follow the same setup as before: [Migrate/initialize database](#migrate-initialize-database)

# Troubleshooting
Make sure to file GitHub issues if any of this doesn't work, or if there's common issues I should document. Thanks.

* Q: The password reset password feature doesn't work.
  - This requires special setup with your own SMTP email service.
  - Look at the end of `settings.py` for directions.

# Copyright
Copyright 2017 Arian Kordi, all rights reserved to their respective owners. (Nintendo, Hatena Co Ltd.)

[![forthebadge](https://forthebadge.com/images/badges/made-with-python.svg)](https://forthebadge.com)

[![forthebadge](https://forthebadge.com/images/badges/you-didnt-ask-for-this.svg)](https://forthebadge.com)
