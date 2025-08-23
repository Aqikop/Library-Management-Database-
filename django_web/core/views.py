from django.shortcuts import render, redirect

# Create your views here.
def homepage(request):
    return render(request, 'core/homepage.html')  # Note the core/ prefix

def dashboard_view(request):
    if not request.user.is_authenticated:
        return redirect('accounts:login')  # Use namespaced URL name
    return render(request, 'core/dashboard.html')  # Note the core/ prefix