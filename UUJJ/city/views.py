from django.shortcuts import render
# from django.http import HttpResponse
from .services import top5, only_city_list
import json
# Create your views here.

# def city_view(request):
#     return render(request,"city/city.html")

def city_view(request):
    # top_5_spa, top_5_arboretum, top_5_sauna, top_5_gallery = top5()
    # spa_city_list, arboretum_city_list, sauna_city_list, gallery_city_list = only_city_list(top_5_spa, top_5_arboretum, top_5_sauna, top_5_gallery)
    
    # context = {
    #     'spa_city_list': spa_city_list,
    #     'arboretum_city_list': arboretum_city_list,
    #     'sauna_city_list': sauna_city_list,
    #     'gallery_city_list': gallery_city_list,
    # }
    top_5_spa_list, top_5_arboretum_list, top_5_sauna_list, top_5_gallery_list = top5()
    spa_city_list, arboretum_city_list, sauna_city_list, gallery_city_list = only_city_list(
        top_5_spa_list, top_5_arboretum_list, top_5_sauna_list, top_5_gallery_list
    )
    context = {
        'top5_spa': top_5_spa_list,
        'top5_arboretum': top_5_arboretum_list,
        'top5_sauna': top_5_sauna_list,
        'top5_gallery': top_5_gallery_list,
        'spa_city_list': spa_city_list,
        'arboretum_city_list': arboretum_city_list,
        'sauna_city_list': sauna_city_list,
        'gallery_city_list': gallery_city_list,
    }
    
    return render(request, 'city/city.html', context)
