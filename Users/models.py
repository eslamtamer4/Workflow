from django.utils import timezone
from django.db import models
from django.template.defaultfilters import slugify
from django.contrib.auth.models import AbstractUser

# Remove the custom User model definition

class User(AbstractUser):
    ID = models.AutoField(primary_key=True)
    Firstname = models.CharField(max_length=30, null=False)
    Lastname = models.CharField(max_length=30, null=False)
    E_mail = models.EmailField(unique=True, null=False)
    Is_active = models.BooleanField(default=True, null=False)
    Created_date = models.DateTimeField(default=timezone.now)
    Modified_date = models.DateTimeField(auto_now=True)

User._meta.get_field('groups').remote_field.related_name = 'custom_user_set'
User._meta.get_field('user_permissions').remote_field.related_name = 'custom_user_set'

class Employees(models.Model):
    ID = models.AutoField(primary_key=True)
    Manager = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="employees_managed"
    )
    Employee = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="managers"
    )
    Relationship_description = models.CharField(max_length=100)
    
    def __str__(self):
        return f"{self.Manager} manages {self.Employee} ({self.Relationship_description})"


