from django.http import HttpResponse
from django.shortcuts import render

def home(request):
    return HttpResponse("Welcome to the Members App!")  # New home view

def members(request):
    return render(request, 'index.html')  # Render the existing index.html template
