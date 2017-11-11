from django import template
from closedverse_main.models import User
from closedverse_main.util import HumanTime
from closedverse import settings
import re

register = template.Library()

@register.simple_tag
def avatar(user, feeling=0):
	return user.do_avatar(feeling)
@register.simple_tag
def miionly(mh):
	if not mh:
		return settings.STATIC_URL + '/img/anonymous-mii.png'
	else:
		return 'https://mii-secure.cdn.nintendo.net/{0}_normal_face.png'.format(mh)
@register.simple_tag
def time(stamp, full=False):
	return HumanTime(stamp.timestamp(), full) or "Less than a minute ago"
@register.simple_tag
def user_class(user):
	return user.get_class()[0]
@register.simple_tag
def user_level(user):
	return user.get_class()[1]
@register.inclusion_tag('closedverse_main/elements/user-icon-container.html')
def user_icon_container(user, feeling=0, status=False):
	return {
	'uclass': user_class(user),
	'user': user,
	'status': status,
	'url': avatar(user, feeling),
	}
@register.inclusion_tag('closedverse_main/elements/no-content.html')
def nocontent(text='', style=''):
	return {
        'text': text,
        'style': style,
    }
@register.simple_tag
def empathy_txt(feeling=0, has=False):
	if has:
		return 'Unyeah'
	return {
	0: 'Yeah!',
	1: 'Yeah!',
	2: 'Yeah♥',
	3: 'Yeah!?',
	4: 'Yeah...',
	5: 'Yeah...',
	6: 'Nyeah~',
	69: 'olv.portal.miitoo.',
	}.get(feeling, 'Yeah!')
	# olv.portal.miitoo is going to be the only easter egg in this thing ever
@register.inclusion_tag('closedverse_main/elements/p_username.html')
def p_username(user):
	return {
		'user': user,
	}
@register.inclusion_tag('closedverse_main/elements/empathy-content.html')
def empathy_content(yeahs, request, has_yeah=False):
	for yeah in yeahs:
		if yeah.post:
			yeah.feeling = yeah.post.feeling
		else:
			yeah.feeling = yeah.comment.feeling
	return {
		'yeahs': yeahs,
		'myself': request.user,
		'has_yeah': has_yeah,
	}
@register.inclusion_tag('closedverse_main/elements/names.html')
def print_names(names):
	return {
		'nameallmn': len(names) - 4,
		'names': names,
	}
@register.inclusion_tag('closedverse_main/elements/discordapp-spinner.html')
def discordapp_spinner():
	return {
		
	}
