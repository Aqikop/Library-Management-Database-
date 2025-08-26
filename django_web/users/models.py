from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Reader(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    password = models.CharField(max_length=128)
    # firstname = models.CharField(max_length=100)
    # lastname = models.CharField(max_length=100)
    email = models.EmailField(blank=True)
    phone_no = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)

    def __str__(self):
        return f"{self.user} Profile"
    
# create user for username, pass, email first, add them to reader field
# other can be create s
# pass yourpassword123