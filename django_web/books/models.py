from django.db import models
from django.contrib.auth.models import User
from users.models import Reader
# Create your models here.
class Publisher(models.Model):
    name = models.CharField(max_length=100)
    year_of_publication = models.IntegerField()
    publisher_id = models.AutoField(primary_key=True)

    def __str__(self):
        return self.name

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    isbn = models.CharField(max_length=13, unique=True)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    category = models.CharField(max_length=100)
    edition = models.CharField(max_length=50)
    publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE)
    year_of_publication = models.IntegerField()
    auth_no = models.CharField(max_length=50)

    def __str__(self):
        return self.title

class ReserveReturn(models.Model):
    reader = models.ForeignKey(Reader, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    reserve_date = models.DateField()
    return_date = models.DateField(null=True, blank=True)
    due_date = models.DateField()

    def __str__(self):
        return f"{self.reader} reserved {self.book}"
