from django.db import models

# Create your models here.

from django.db import models

GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
    ]
MILITARY_SERVICE_CHOICES = [
        ('exempted', 'Exempted'),
        ('serving', 'Serving'),
        ('postponed', 'Postponed'),
    ]
MARITAL_STATUS_CHOICES = [
        ('married', 'Married'),
        ('divorced', 'Divorced'),
        ('single', 'Single'),
    ]


class Position(models.Model):
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title

class On_Boarding_Request(models.Model):
    name = models.CharField(max_length=100, verbose_name='Name')
    address = models.TextField(verbose_name='Address')
    application_date = models.DateField(verbose_name='Application Date')
    date_of_birth = models.DateField(verbose_name='Date of Birth')
    place_of_birth = models.CharField(max_length=100, verbose_name='Place of Birth')
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, verbose_name='Gender')
    military_service = models.CharField(max_length=50, choices=MILITARY_SERVICE_CHOICES, verbose_name='Military Service')
    father_occupation = models.CharField(max_length=100, verbose_name='Father Occupation')
    marital_status = models.CharField(max_length=20, choices=MARITAL_STATUS_CHOICES, verbose_name='Marital Status')
    num_of_kids = models.PositiveIntegerField(verbose_name='Number of Kids')
    spouse_occupation = models.CharField(max_length=100, verbose_name='Spouse Occupation')
    phone_number = models.CharField(max_length=15, verbose_name='Phone Number')
    email = models.EmailField(verbose_name='Email')
    position_applying_for = models.ForeignKey(Position, on_delete=models.CASCADE, verbose_name='Position Applying For')
    current_employer_benefits = models.TextField(verbose_name='Current Employer Benefits')
    education = models.TextField(verbose_name='Education')
    references = models.TextField(verbose_name='References')
    referred_by = models.CharField(max_length=50, verbose_name='Referred By')
    expected_salary = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Expected Salary')
    notice_period = models.CharField(max_length=20, verbose_name='Notice Period')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'On-Boarding Request'
        verbose_name_plural = 'On-Boarding Requests'


class Experience(models.Model):
    onboarding_request = models.ForeignKey(On_Boarding_Request, on_delete=models.CASCADE, related_name='experiences')
    from_date = models.DateField()
    to_date = models.DateField()
    employer = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    gross_salary = models.DecimalField(max_digits=10, decimal_places=2)
    leave_reason = models.TextField()

    def __str__(self):
        return f"{self.title} at {self.employer}"