# -*- coding: utf-8 -*-
# Generated by Django 1.10.7 on 2017-07-30 20:39
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('closedverse_main', '0015_community_url'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='community',
            name='url',
        ),
    ]