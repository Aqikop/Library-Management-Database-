from django.urls import path, reverse_lazy
from django.contrib.auth import views as auth_views
from django.contrib.auth.models import User
from users.models import Reader
from . import views

app_name = 'auth_sys'

class CustomPasswordResetView(auth_views.PasswordResetView):
    def get_users(self, email):
        """
        Given an email, return matching user(s) who should receive a reset.
        """
        active_users = []
        
        # Check Reader model
        readers = Reader.objects.filter(email=email)
        if readers.exists():
            active_users.extend([reader.user for reader in readers if reader.user.is_active])
            
        # Check User model
        users = User.objects.filter(email=email, is_active=True)
        active_users.extend(users)
        
        # Remove duplicates
        return list(set(active_users))


urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('logout/', views.logout_view, name='logout'),
    
    path('password-reset/', 
        CustomPasswordResetView.as_view(
            template_name='authen_sys/password_reset_form.html',
            email_template_name='authen_sys/password_reset_email.html',
            success_url=reverse_lazy('authen_sys:password_reset_done')
        ),
        name='password_reset'),
    
    path('password-reset/done/', 
        auth_views.PasswordResetDoneView.as_view(
            template_name='authen_sys/password_reset_done.html'
        ),
        name='password_reset_done'),
    
    path('reset/<uidb64>/<token>/', 
        auth_views.PasswordResetConfirmView.as_view(
            template_name='authen_sys/password_reset_confirm.html',
            success_url=reverse_lazy('authen_sys:password_reset_complete')
        ),
        name='password_reset_confirm'),
    
    path('reset/complete/', 
        auth_views.PasswordResetCompleteView.as_view(
            template_name='authen_sys/password_reset_complete.html'
        ),
        name='password_reset_complete'),
]