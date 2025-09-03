from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login, logout
from django.contrib.auth.models import User
from django.contrib import messages
from users.models import Reader

# Create your views here.
def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            login(request, form.get_user())
            print("login succesfully")
            return redirect('core:dashboard')
    else:
        form = AuthenticationForm()  
    return render(request, 'authen_sys/login.html', {'form': form})  # Note the authen_sys/ prefix

def register_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        username = request.POST.get('username')
        
        if User.objects.filter(username=username).exists():
            messages.error(request, 'This username is already taken.')
            return render(request, 'authen_sys/register.html', {'form': form})
        
        if form.is_valid():
            
            new_user = form.save()
            email = request.POST.get('email')
            
            Reader.objects.create(
                user = new_user,
                email = email,
                password = new_user.password
            )
            login(request, new_user)
            print("New user register successfully")
            
            return redirect('core:dashboard')
    else:
        form = UserCreationForm()
    return render(request, 'authen_sys/register.html', {'form': form})  # Note the authen_sys/ prefix

def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return redirect('core:homepage')
    return redirect('core:dashboard') #need new exception handling 