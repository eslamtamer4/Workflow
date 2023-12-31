# Generated by Django 4.2.4 on 2023-08-15 11:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Experience',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('from_date', models.DateField()),
                ('to_date', models.DateField()),
                ('employer', models.CharField(max_length=100)),
                ('title', models.CharField(max_length=100)),
                ('gross_salary', models.DecimalField(decimal_places=2, max_digits=10)),
                ('leave_reason', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Position',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='On_Boarding_Request',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('address', models.TextField()),
                ('application_date', models.DateField()),
                ('date_of_birth', models.DateField()),
                ('place_of_birth', models.CharField(max_length=100)),
                ('gender', models.CharField(choices=[('male', 'Male'), ('female', 'Female')], max_length=10)),
                ('military_service', models.CharField(choices=[('exempted', 'Exempted'), ('serving', 'Serving'), ('postponed', 'Postponed')], max_length=50)),
                ('father_occupation', models.CharField(max_length=100)),
                ('marital_status', models.CharField(choices=[('married', 'Married'), ('divorced', 'Divorced'), ('single', 'Single')], max_length=20)),
                ('num_of_kids', models.PositiveIntegerField()),
                ('spouse_occupation', models.CharField(max_length=100)),
                ('phone_number', models.CharField(max_length=15)),
                ('email', models.EmailField(max_length=254)),
                ('current_employer_benefits', models.TextField()),
                ('education', models.TextField()),
                ('references', models.TextField()),
                ('referred_by', models.CharField(max_length=50)),
                ('expected_salary', models.DecimalField(decimal_places=2, max_digits=10)),
                ('notice_period', models.CharField(max_length=20)),
                ('job_experience', models.ManyToManyField(to='Onboarding.experience')),
                ('position_applying_for', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Onboarding.position')),
            ],
        ),
    ]
