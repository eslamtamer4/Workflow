# Generated by Django 4.2.4 on 2023-08-15 11:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0004_remove_user_test'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='Is_HR',
            field=models.BooleanField(default=False),
        ),
    ]
