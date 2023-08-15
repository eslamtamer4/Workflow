from django.db import models
from Users.models import User

class Request(models.Model):
    ID = models.AutoField(primary_key=True)
    STATUS_CHOICES = (
        ('PENDING', 'Pending'),
        ('ACCEPTED', 'Accepted'),
        ('REJECTED', 'Rejected'),
        ('WITHDRAWN', 'Withdrawn'),
    )

    Submitter = models.ForeignKey(User, on_delete=models.CASCADE, related_name='submitted_requests')
    Receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_requests')
    Status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='PENDING')

    def __str__(self):
        return f"Request #{self.ID} - {self.Submitter.username} to {self.Receiver.username} ({self.Status})"
    