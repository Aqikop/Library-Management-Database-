from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Reader(models.Model):
    
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
        ('N', 'Prefer not to say'),
    ]
    
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    password = models.CharField(max_length=128)
    firstname = models.CharField(max_length=100, blank=True)
    lastname = models.CharField(max_length=100, blank=True)
    birthday = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, null=True, blank=True)
    bio = models.CharField(max_length=100, null=True, blank=True)
    email = models.EmailField(blank=True)
    phone_no = models.CharField(max_length=20, blank=True)
    address = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.user} Profile"
    
# create user for username, pass, email first, add them to reader field
# other can be create s
# pass yourpassword123