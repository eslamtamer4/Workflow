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
    name = models.CharField(max_length=100)
    address = models.TextField()
    application_date = models.DateField()
    date_of_birth = models.DateField()
    place_of_birth = models.CharField(max_length=100)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    military_service = models.CharField(max_length=50, choices=MILITARY_SERVICE_CHOICES)
    father_occupation = models.CharField(max_length=100)
    marital_status = models.CharField(max_length=20, choices=MARITAL_STATUS_CHOICES)
    num_of_kids = models.PositiveIntegerField()
    spouse_occupation = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    email = models.EmailField()
    position_applying_for = models.ForeignKey(Position, on_delete=models.CASCADE)
    current_employer_benefits = models.TextField()
    education = models.TextField()
    references = models.TextField()
    referred_by = models.CharField(max_length=50)
    expected_salary = models.DecimalField(max_digits=10, decimal_places=2)
    notice_period = models.CharField(max_length=20)
    
    def __str__(self):
        return self.name

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