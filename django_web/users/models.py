from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Reader(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    firstname = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    email = models.EmailField()
    phone_no = models.CharField(max_length=20)
    address = models.TextField()

    def __str__(self):
        return f"{self.firstname} {self.lastname}"

class Staff(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    staff_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class AuthenticationSystem(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    login_id = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=128)  # Store hashed passwords

    def __str__(self):
        return self.login_id


# Models to check Activity of Users
class UserActivity(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    action = models.CharField(max_length=100) # e.g., 'login', 'logout', 'scroll '
    timestamp = models.DateTimeField(auto_now_add=True)
    page = models.CharField(max_length=200, blank=True, null=True)  # store URL

    def __str__(self):
        return f"{self.user} - {self.action} - {self.page} at {self.timestamp}"