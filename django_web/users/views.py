from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from .models import Reader
# Create your views here.

def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            login(request, form.get_user())
            print("b")
            return redirect('core:dashboard')
    else:
        form = AuthenticationForm()  
    return render(request, 'users/login.html', {'form': form})  # Note the users/ prefix

def register_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            
            new_user = form.save()
            login(request, form.save())
            email = request.POST.get('email')
            
            Reader.objects.create(
                user = new_user,
                email = email,
                password = new_user.password
            )
            print("New user register successfully")
            
            return redirect('core:dashboard')
    else:
        form = UserCreationForm()
    return render(request, 'users/register.html', {'form': form})  # Note the users/ prefix

def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return redirect('core:homepage')
    return redirect('core:dashboard')

@login_required
def settings_view(request):
    user = request.user
    return render(request, 'users/settings.html')