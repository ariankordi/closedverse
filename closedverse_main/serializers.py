import json
class CommunitySerializer():
	"""
	Serializes communities for use with JSON
	"""
	@staticmethod
	def single(community):
		"""
		Return one dict for a community, meant to be used in community pages, etc
		"""
		return {
				'id': community.id,
				'unique_id': str(community.unique_id),
				'name': community.name,
				'icon': (community.icon() or None),
				'banner': (community.banner or None),
				'description': community.description,
				'type': community.type,
				'platform': community.platform,
				'allowed_users': json.loads(community.allowed_users) if community.allowed_users else None,
				'creator': community.creator_id
            }
	@staticmethod
	def many(queryset):
		"""
		Return a community meant to be used in a bigger list, etc
		"""
		return [
			{
				'id': community.id,
				'name': community.name,
				'icon': (community.icon() or None),
				'banner': (community.banner or None),
				'type': community.type,
				'platform': community.platform
			} for community in queryset
		]