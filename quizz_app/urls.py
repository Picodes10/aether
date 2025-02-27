# URL configuration for Quizz App

from django.contrib import admin
from django.urls import path
from django.http import HttpResponse

urlpatterns = [
    path('admin/', admin.site.urls),
    path('welcome/', lambda request: HttpResponse("Welcome to the Quizz App!")),  # Example route
    # Add your application URLs here
]
