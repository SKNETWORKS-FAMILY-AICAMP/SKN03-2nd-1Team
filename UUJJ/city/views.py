from django.shortcuts import render
# from django.http import HttpResponse
# Create your views here.

def city_view(request):
    return render(request, 'city/city.html')