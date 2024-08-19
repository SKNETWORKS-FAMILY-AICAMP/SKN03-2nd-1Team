from django.contrib import admin
from django.urls import path
from .views import city_view

# app.url.py -> request & view를 연결해줌
urlpatterns = [
    # localhost
    path('admin/', admin.site.urls),
    path('',city_view,name="city-city_view"),
]