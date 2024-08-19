from django.shortcuts import render
from .models import PlaceTb

def rank(request, category='CA00'):
    category_name_mapping = {
        'CA00': '온천',
        'CA01': '수목원',
        'CA02': '사우나',
        'CA03': '미술관'
    }

    places = PlaceTb.objects.filter(category_cd__code=category).order_by('-review_num')[:10]

    ranked_places = [
        {'rank': idx + 1, 'name': place.name, \
        'address': place.address, 'url':place.map_url, \
        'review_num' : place.review_num}
        for idx, place in enumerate(places)
    ]

    return render(request, 'rank/rank.html', {
        'places': ranked_places,
        'category': category,
        'category_name': category_name_mapping.get(category, '온천')  # 기본값 '온천'
    })
