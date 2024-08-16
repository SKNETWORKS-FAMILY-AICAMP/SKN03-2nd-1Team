from django.urls import path
from .views import rank

urlpatterns = [
    path('', rank, name='rank_spa'),  # 기본 페이지
    path('<str:category>/', rank, name='rank_category'),  # 다른 카테고리 페이지
]