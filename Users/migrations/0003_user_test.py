# Generated by Django 4.2.3 on 2023-07-05 07:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0002_employees'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='test',
            field=models.CharField(max_length=30, null=True),
        ),
    ]