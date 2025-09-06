from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login, logout
from .models import Reader
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib import messages
# Create your views here.

# def login_view(request):
#     if request.method == 'POST':
#         form = AuthenticationForm(data=request.POST)
#         if form.is_valid():
#             login(request, form.get_user())
#             print("b")
#             return redirect('core:dashboard')
#     else:
#         form = AuthenticationForm()  
#     return render(request, 'users/login.html', {'form': form})  # Note the users/ prefix

# def register_view(request):
#     if request.method == 'POST':
#         form = UserCreationForm(request.POST)
#         if form.is_valid():
            
#             new_user = form.save()
#             login(request, form.save())
#             email = request.POST.get('email')
            
#             Reader.objects.create(
#                 user = new_user,
#                 email = email,
#                 password = new_user.password
#             )
#             print("New user register successfully")
            
#             return redirect('core:dashboard')
#     else:
#         form = UserCreationForm()
#     return render(request, 'users/register.html', {'form': form})  # Note the users/ prefix

# def logout_view(request):
#     if request.method == 'POST':
#         logout(request)
#         return redirect('core:homepage')
#     return render(request, 'users/logout.html')  # Note the users/ prefix

@login_required
def settings_view(request):
    if request.method == 'POST':
        
        user = request.user #get current user (User model)
        reader = user.reader # get the coressponding reader (Reader model)
        
        new_username = request.POST.get('username')
        if new_username and new_username != user.username:
            # check if username is taken
            if User.objects.filter(username=new_username).exclude(pk=user.pk).exists():
                messages.error(request, 'Username already taken.')
            else:
                user.username = new_username
                user.save()
                print("new username: " + user.username)    

        birthday = request.POST.get('birthday')
        if birthday == '':
            reader.birthday = None
        else:
            reader.bbirthday = birthday 
        
        reader.firstname = request.POST.get('firstname')
        reader.lastname = request.POST.get('lastname')
        reader.email = request.POST.get('email')
        reader.phone_no = request.POST.get('phone_no')
        reader.gender = request.POST.get('gender')
        reader.bio = request.POST.get('bio')
        reader.address = request.POST.get('address')
        reader.save()
        #messages.success(request, 'Username updated successfully.')
        
    return render(request, 'users/settings.html')