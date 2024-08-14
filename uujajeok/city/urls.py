from .views import city
from django.urls import path

urlpatterns = [
    path('', city),
]