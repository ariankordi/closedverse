from django.http import HttpResponseForbidden
class ClosedMiddleware(object):
	def __init__(self, get_response):
		self.get_response = get_response

	def __call__(self, request):
		if request.user.is_authenticated and not request.user.is_active():
			return HttpResponseForbidden()
		response = self.get_response(request)

		return response

"""
return HttpResponseForbidden("You're one sick fuck. I would never suggest removing an Inkling girl's clothes and licking her tiny body all over, nibbling her neck and kissing her adorable little nipples. Only a heartless monster would think about her cute girlish mouth and tongue wrapped around a thick cock slick with her saliva, pumping in and out of her mouth until it erupts, the cum more than her little throat can swallow. The idea of thick viscous semen overflowing, dribbling down her chin over her flat chest, her tiny hands scooping it all up and watching her suck it off her fingertips is just horrible. You're all a bunch of sick perverts, thinking of spreading her smooth slender thighs, cock poised at the entrance to her pure, tight, virginal pussy, and thrusting in deep as a whimper escapes her lips which are slippery with cum, while her small body shudders from having her cherry taken in one quick stroke. I am disgusted at how you'd get even more excited as you lean over her, listening to her quickening breath, her girlish moans and gasps while you hasten your strokes, her sweet pants warm and moist on your face and her flat chest, shiny with a sheen of fresh sweat, rising and falling rapidly to meet yours. It is truly nasty how you'd run your hands all over her tiny body while you violate her, feeling her nipples hardening against your tongue as you lick her chest, her neck and her armpits, savoring the scent of her skin and sweat while she trembles from the stimulation and as she reaches her climax, hearing her cry out softly as she has her first orgasm while that cock is buried impossibly deep inside her, pulsing violently as an intense amount of hot cum spurts forth and floods through her freshly-deflowered pussy for the first time, filling her womb only to spill out of her with a sickening squelch. And as you lie atop her flushed body, she murmurs breathlessly, \"You came so much inside of me,\" then her fingers dig into your back as she feels your cock hardening inside again.", content_type='text/plain')
"""