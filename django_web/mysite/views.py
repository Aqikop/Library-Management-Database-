from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.shortcuts import render, redirect

def homepage(request):
    return render(request, 'core/homepage.html')

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = User.objects.filter(username=username).first()
        if user and user.check_password(password):
            from django.contrib.auth import login
            login(request, user)
            return redirect('dashboard')
        else:
            return render(request, 'core/login.html', {'error': 'Invalid credentials'})
    return render(request, 'core/login.html')

def settings_view(request):
    if not request.user.is_authenticated:
        return redirect('login')
    return render(request, 'core/settings.html')

def register_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
    else:
        form = UserCreationForm()
    return render(request, 'core/register.html', {'form': form})

def dashboard_view(request):
    if not request.user.is_authenticated:
        return redirect('login')
    return render(request, 'core/dashboard.html')