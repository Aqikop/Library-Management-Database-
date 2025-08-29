from django.shortcuts import render, redirect

# Create your views here.
def homepage(request):
    context = {
        'is_authenticated': request.user.is_authenticated
    }
    return render(request, 'core/homepage.html', context)  # Note the core/ prefix

def dashboard_view(request):
    context = {
        'is_authenticated': request.user.is_authenticated
    }
    return render(request, 'core/dashboard.html', context)