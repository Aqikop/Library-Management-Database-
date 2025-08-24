from django.db import models
from django.contrib.auth.models import User
from users.models import Reader 
from books.models import Book
# Create your models here.
class Report(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    reg_no = models.CharField(max_length=50)
    issue_return = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Report for {self.user} - {self.book}"