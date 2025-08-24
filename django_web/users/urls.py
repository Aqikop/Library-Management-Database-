from django.urls import path
from .views import track_activity

urlpatterns = [
    path("track-activity/", track_activity, name="track_activity"),
]
