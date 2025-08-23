from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm

# Create your views here.
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm

def login_view(request):
    return render(request, 'accounts/login.html')  # Note the accounts/ prefix

def register_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('accounts:login')
    else:
        form = UserCreationForm()
    return render(request, 'accounts/register.html', {'form': form})  # Note the accounts/ prefix