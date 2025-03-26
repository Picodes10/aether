from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),  # Added root URL pattern
    path('members/', views.members, name='members'),
]
