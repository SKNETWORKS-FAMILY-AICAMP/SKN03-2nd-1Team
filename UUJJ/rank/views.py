from django.shortcuts import render

# Create your views here.
def rank(request):
    return render(request, 'rank/rank.html')