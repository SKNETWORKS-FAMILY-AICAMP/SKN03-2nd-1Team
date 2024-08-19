from django.db import models
# Create your models here.
import pymysql
import pandas as pd
import os
from dotenv import load_dotenv

# .env 파일 로드
load_dotenv()

def db_connect():
    # 데이터베이스 연결 설정
    con = pymysql.connect(
        host=os.getenv('DB_HOST'),
        user=os.getenv('DB_USER'),
        password=os.getenv('DB_PASSWORD'),
        db=os.getenv('DB_NAME'),
        port=int(os.getenv('DB_PORT', '3306')),  # 기본값 3306
        charset='utf8'
    )
    # DictCursor를 사용하여 커서 생성
    cur = con.cursor(pymysql.cursors.DictCursor)
    
    try:
        # 데이터 조회
        place_tb = "SELECT * FROM place_tb"
        cur.execute(place_tb)
        rows_place_tb = cur.fetchall()
        df_place_tb = pd.DataFrame(rows_place_tb)

        # code_tb 조회
        code_tb = "SELECT * FROM code_tb"
        cur.execute(code_tb)
        rows_code_tb = cur.fetchall()
        df_code_tb = pd.DataFrame(rows_code_tb)

        # 카테고리 별로 데이터프레임 생성
        df_spa = df_place_tb[df_place_tb['category_cd'] == 'CA00']
        df_arboretum = df_place_tb[df_place_tb['category_cd'] == 'CA01']
        df_sauna = df_place_tb[df_place_tb['category_cd'] == 'CA02']
        df_gallery = df_place_tb[df_place_tb['category_cd'] == 'CA03']
        
        return df_spa, df_arboretum, df_sauna, df_gallery, df_code_tb
        
    finally:
        # 커서와 연결을 종료
        cur.close()
        con.close()

def get_city_name(city_cd, df_code_tb):
    city_name = df_code_tb[df_code_tb['code'] == city_cd]['code_name'].values
    return city_name[0] if len(city_name) > 0 else city_cd

def top5():
    # db_connect 호출로 데이터프레임 가져오기
    df_spa, df_arboretum, df_sauna, df_gallery, df_code_tb = db_connect()
    
    # 상위 5개 도시 추출
    top_5_df_spa = df_spa["city_cd"].value_counts().head(5)
    top_5_df_arboretum = df_arboretum["city_cd"].value_counts().head(5)
    top_5_df_sauna = df_sauna["city_cd"].value_counts().head(5)
    top_5_df_gallery = df_gallery["city_cd"].value_counts().head(5)
    
    # 도시 코드를 도시 이름으로 변환하는 함수
    def convert_to_city_names(top_5_df):
        return [[get_city_name(city_cd, df_code_tb), count] for city_cd, count in top_5_df.items()]
    
    # 리스트로 변환하고 도시 이름으로 변경
    top_5_spa_list = convert_to_city_names(top_5_df_spa)
    top_5_arboretum_list = convert_to_city_names(top_5_df_arboretum)
    top_5_sauna_list = convert_to_city_names(top_5_df_sauna)
    top_5_gallery_list = convert_to_city_names(top_5_df_gallery)
    
        
    return top_5_spa_list, top_5_arboretum_list, top_5_sauna_list, top_5_gallery_list


def only_city_list(top_5_spa, top_5_arboretum, top_5_sauna, top_5_gallery):
    # 각 카테고리의 상위 5개 도시 이름만 추출하여 리스트에 저장
    spa_city_list = [city[0] for city in top_5_spa]
    arboretum_city_list = [city[0] for city in top_5_arboretum]
    sauna_city_list = [city[0] for city in top_5_sauna]
    gallery_city_list = [city[0] for city in top_5_gallery]
    
    return spa_city_list, arboretum_city_list, sauna_city_list, gallery_city_list

