# from django.contrib.auth.forms import UserCreationForm
# from django.contrib.auth.models import User
# from django.http import HttpResponse
# from django.shortcuts import render, redirect

# def homepage(request):
#     return render(request, 'homepage.html')

# def login_view(request):
#     return render(request, 'login.html')

# def register_view(request):
#     if request.method == 'POST':
#         form = UserCreationForm(request.POST)
#         if form.is_valid():
#             form.save()
#             return redirect('login')
#     else:
#         form = UserCreationForm()
#     return render(request, 'register.html', {'form': form})

# def dashboard_view(request):
#     if not request.user.is_authenticated:
#         return redirect('login')
#     return render(request, 'dashboard.html')