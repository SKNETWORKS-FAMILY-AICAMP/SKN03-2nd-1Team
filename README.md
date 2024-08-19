## 👋🏻 팀 소개 👋🏻
### 📌 팀 명
SKN03-2nd-1Team : 유유자적 🍃

<br/><br/>

### 📌 팀 멤버
| 서민정 | 정해린 | 유혜린 | 송명신 | 김병수 |
|:--:|:--:|:--:|:--:|:--:|
| @seom-j | @junghl11 | @Lerini98 | @SongMyungshin | @BS-KIM-97 |
| ![유재석](https://github.com/user-attachments/assets/a47b9bda-3ea7-40b5-9671-19b26169efcc) | ![정형돈](https://github.com/user-attachments/assets/f3c6f945-7d91-48db-b7d6-c92451746ea1) | ![박명수](https://github.com/user-attachments/assets/47a14ae0-0841-4c73-bfe8-f1598c679078) | ![정준하](https://github.com/user-attachments/assets/b023c9d2-6244-4027-a9d6-0b34dbc5987b) | ![길](https://github.com/user-attachments/assets/b754408d-361f-4397-9624-74d5518407c4) |
| Project Leader | Data | Back-end | Back-end | Front-end |

<br/><br/><br/>
## 🍃 유유자적 🍃
### 📌 개발 기간
2024-08-16 ~ 2024-08-19 (총 4일)

<br/><br/>

### 📌 프로젝트 소개
바쁘다 바빠 현대사회에서 (살짝 & 쉽게) 벗어나기 위한 수도권 힐링 공간 시각화
 
 
<br/><br/>

### 📌 프로젝트 목표
서울과 인천 등 수도권의 청년들은 우울감과 외로움을 다른 지역보다 더 많이 경험하고 있음

이로 인해 삶의 질에 대한 만족도가 낮고, 스트레스가 쌓이기 쉬우며, 스트레스가 해소되지 않으면 심리적 불안정성과 갈등이 생길 수 있음

전문의의 도움을 받는 것도 중요하지만, 스스로 스트레스를 해소할 방법을 찾고 자신이 즐기는 활동을 통해 긴장을 푸는 것이 필요함
 
 <br/>

이에 우리는 본 프로젝트로써 **바쁘다 바빠 현대사회에서 (살짝 & 쉽게) 벗어나기 위한 수도권 힐링 공간 시각화를 통해 사용자의 힐링 정보🍃를 제공**하고자 함

( 더 나아가 개발 측면에서는 Django 프레임워크를 이해하고, Docker 및 AWS의 구조를 깊이 있게 파악하여 기술적 역량을 기르고자 함 )

<br/><br/>

### 📌 데이터 정보

**🌳 수목원 정보 (총 31곳)**
- 서울시 수목원 정보: 공공데이터포탈
- 경기도 수목원 정보: 경기데이터드림

**🛁 온천 정보 (총 19곳)**
- 서울시 온천 정보: 정보 없음
- 경기도 온천 정보: 경기데이터드림

**🫧 사우나 정보 (총 547곳)**
- 서울시 사우나 정보: 지방행정인허가데이터개방
- 경기도 사우나 정보: 지방행정인허가데이터개방

**🖼️ 미술관 정보 (총 104곳)**
- 서울시 미술관 정보: 문화빅데이터 플랫폼
- 경기도 미술관 정보: 문화빅데이터 플랫폼

**📍 장소 정보**
- 리뷰 개수 & 장소 이미지 : 네이버 지도 (크롤링)

<br/><br/>

### 📌 프로젝트 내용 가설 & 검증 
**①  ❓  가설 : 각 힐링 공간이 모여있는 스팟이 존재할 것이다.**

[ 밀집도 시각화를 통해 31개 시(군)에 얼마나 모여있는 지 파악해보자 ! ]
|온천|식물원|사우나|미술관|
|:--:|:--:|:--:|:--:|
|![spa](https://github.com/user-attachments/assets/71957694-a545-45d5-a423-4f0e1db6c555)|![arboretum](https://github.com/user-attachments/assets/358573a0-f011-44b7-9814-b46def5f15ba)|![sauna](https://github.com/user-attachments/assets/f76303a9-26a6-42e5-ba94-9cdfb8493920)|![gallery](https://github.com/user-attachments/assets/4f38dc38-3e91-4f59-96d6-f7c8bd1019b6)|

👉🏻 ❗ 참

31개 시(군)에 대하여 시각적으로 점점 감소하는 그래프를 모든 카테고리에서 확인할 수 있었다.

이에 우리는 힐링 공간이 모여있는 스팟이 존재하며, 이를 시각화를 통해 보여주기로 결정하였다.


<br/>

**② ❓  가설 : 스팟에 있는 힐링 공간들은 해당 공간의 수요가 많아 리뷰가 많을(랭킹 Top 10 안에 들) 것이다.**

[ 모여있는 스팟(상위 5개 시(군))과 카테고리별 리뷰수 상위 10개 랭킹의 시(군)을 비교해보자 ! ]

| 카테고리 | 스팟in 시(군) 중 랭킹in 장소의 수 | 랭킹in 장소 중 스팟in 장소의 수 |
|:--:|:--:|:--:|
| 미술관   | 서울특별시(7), 파주시(1)                         | 8/10 |
| 사우나   | 고양시(1), 성남시(2)                             | 3/10 |
| 식물원   | 광주시(1), 서울특별시(1), 남양주시(1)               | 3/10 |
| 온천     | 화성시(2), 이천시(2), 수원시(2), 포천시(2)              | 8/10 |

👉🏻 ❗ 거짓

미술관, 온천의 경우 대부분 포함되어 있는 것을 확인할 수 있었다. 

미술관의 경우 서울특별시인 특성이 많이 반영된 것 같으며 온천의 경우 수가 워낙 적었기에 스팟과 랭킹의 상관관계는 적을 것으로 보인다.

이에 우리는 스팟 외에도 리뷰수 상위 랭킹 정보를 제공하여 장소의 상세 정보를 제공하고, 더 나아가 네이버 지도로 연결하는 링크를 제공함으로써 사용자가 편히 찾아갈 수 있도록 하고자 한다. 

<br/><br/>


 
### 📌 프로젝트 내용
**① 힐링 공간의 카테고리별 스팟 시각화**

>  수도권 힐링 공간의 카테고리(사우나, 온천, 미술관, 수목원)가 모여있는 상위 5개 시(군) 시각화
>
>  목적 : 사용자에게 힐링 공간의 카테고리별 스팟(시(군)) 정보 제공

<br/>

**② 힐링 공간의 카테고리별 랭킹 Top 10 제공**
> 수도권 힐링 공간의 카테고리(사우나, 온천, 미술관, 수목원)별 랭킹 Top 10 정보 제공
>
> 목적 : 카테고리별 랭킹 Top 10 장소 및 세부 정보를 제공

<br/><br/>



### 📌 데이터베이스 (ERD)
![image](https://github.com/user-attachments/assets/0ddcd3f5-adec-4cc8-a294-77b2a979c023)


<br/><br/>

### 📌 시스템 아키텍쳐
![image](https://github.com/user-attachments/assets/83f64e9d-a817-4093-a776-c6252a691e47)

<br/><br/>

### 📌 사이트 플로우차트
![flowmap drawio](https://github.com/user-attachments/assets/5cc49832-2735-439f-88c7-590c5fc61fe8)

<br/><br/>

### 📌 프로젝트 결과 
| 🍃 유유자적 MAIN 🍃 |
|:--:|
| ![image](https://github.com/user-attachments/assets/219c8cb4-8b59-498d-aa8b-bd68f74576e5) | 
| **힐링 공간의 카테고리별 스팟** | 
| ![image](https://github.com/user-attachments/assets/4196282e-9cef-4081-b376-07139ff8e0d9) | 
| **힐링 공간의 카테고리별 랭킹 Top 10** |
![image](https://github.com/user-attachments/assets/be1d86b8-cc78-4f55-8d19-4a637a6b779d) |

👉🏻 이로써 우리는 목표에 부합하게 사용자에게 힐링 공간의 카테고리별 스팟(시(군)) 정보를 제공하고, 더 나아가 카테고리별 랭킹 Top 10 장소 및 세부 정보를 제공할 수 있었다.


