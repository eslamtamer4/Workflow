# Generated by Django 4.2.3 on 2023-07-05 09:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0003_user_test'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='test',
        ),
    ]
