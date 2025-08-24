# from django.shortcuts import render
from django.http import JsonResponse 
from django.views.decorators.csrf import csrf_exempt
import json
from .models import UserActivity
# Create your views here.
@csrf_exempt
def track_activity(request):
    if request.method == "POST" and request.user.is_authenticated:
        data = json.loads(request.body)
        action = data.get("action", "unknown")
        page = data.get("page", "")
        UserActivity.objects.create(user=request.user, action=action, page=page)
        return JsonResponse({"status": "ok"})
    return JsonResponse({"status": "error"}, status=400)