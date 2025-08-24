from django.contrib import admin
from .models import Reader, Staff, AuthenticationSystem, UserActivity
# Register your models here.
admin.site.register(Reader)
admin.site.register(Staff)
admin.site.register(AuthenticationSystem)
admin.site.register(UserActivity)