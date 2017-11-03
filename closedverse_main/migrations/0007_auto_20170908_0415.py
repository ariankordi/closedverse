# -*- coding: utf-8 -*-
# Generated by Django 1.10.7 on 2017-09-08 04:15
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('closedverse_main', '0006_auto_20170906_2226'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='has_gravatar',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(blank=True, default='[]', max_length=254, null=True),
        ),
    ]