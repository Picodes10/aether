from django.urls import include, path\n\nurlpatterns = [\n    path('api_app/', include('api_app.urls')),\n]
