![header](https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=2,3,4,5,6,7,8,9,15,30&height=200&section=header&text=망고마켓&fontSize=60&animation=twinkling)

![mango-5](https://github.com/nazzzo/rooftop-front/assets/112994137/8d131b8a-735d-4bd3-83f5-3e6766c7e76b)


https://mgmarket.store/


망고마켓은 지역기반형 물물교환 서비스 플랫폼입니다 <br>
가입자가 서비스를 이용하려면 반드시 동네 인증을 필요로 하며, <br>
근처 주민들끼리만 채팅을 통해 교환 신청 및 물물교환이 가능합니다 <br>

<br>

---

## 📋 주요기능 소개


> <h2>1. 동네 인증 </h2>

- 동네인증 기능 구현을 위해 Geolocation API와 카카오 Map API를 사용했습니다.
- 사용자가 위치한 좌표값을 DB에 저장한 뒤, MySQL에서 제공하는 ST_DISTANCE_SPHERE 함수로 반경을 계산해서 일정 범위 내에서 쓰인 게시글만 출력합니다.
(사용자가 위치한 지역에서 최대 10km 밖에서 등록된 글은 표시되지 않습니다.)

<br>

![mango-2](https://github.com/nazzzo/rooftop-front/assets/112994137/6a08ef6a-f535-484f-8144-0ef676ea5013)

<br>

> <h2>2. 장터 등록 </h2>

- 교환뭂품의 사진을 여러장 등록해서 자유롭게 썸네일을 선택할 수 있습니다.
- 가전, 디지털기기 등 다양한 카테고리 설정이 가능합니다.
- 상품의 제목과 해시태그는 검색 및 키워드 알림 기능에 활용됩니다.

<br>

![mango-3](https://github.com/nazzzo/mangomarket/assets/112994137/cec3dcae-cb5d-4b75-9e61-3c8ff25179e6)

<br>





> <h2>3. 채팅 </h2>

- 소켓 IO를 통해 구현되었습니다.
- 구매자의 유저 ID와 판매자의 게시글 인덱스를 묶어서 룸으로 설정합니다.
- 채팅 메세지에도 카카오 맵 API를 호출해서 보다 간편하게 사용자간의 거래 약속을 잡을 수 있도록 구현했습니다.

<br>

![mango-4](https://github.com/nazzzo/rooftop-front/assets/112994137/0bf3b3d8-d8d9-42c5-a30e-61035eaa227c)

<br>


---


## 🛠️ 기술 스택

### 스택
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white"> <img src="https://img.shields.io/badge/socketio-010101?style=for-the-badge&logo=socketdotio&logoColor=white"><img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white"> <img src="https://img.shields.io/badge/nodejs-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"> <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white"> <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> <img src="https://img.shields.io/badge/sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white"> <img src="https://img.shields.io/badge/githubactions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white"> <img src="https://img.shields.io/badge/amazonaws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white"> <img src="https://img.shields.io/badge/amazonec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white">


### API

<img src="https://img.shields.io/badge/GeolocationApi-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white"> <img src="https://img.shields.io/badge/kakaoMap-FFCD00?style=for-the-badge&logo=kakao&logoColor=black">

---

## 🔀 Flow Chart

### 서버 아키텍쳐

![111](https://github.com/nazzzo/mangomarket/assets/118948028/62f92ed6-fb99-4e95-8bce-a951e619bd03)

### 배포 흐름도

![image](https://github.com/nazzzo/mangomarket/assets/118948028/36849ed9-d2c0-47ff-96ed-396765b793f4)

---

## 🧑🏻‍💻 Member

### 팀장 김주형

### 팀원 김홍태

### 팀원 이정민

### 팀원 강찬수

---

![footer](https://capsule-render.vercel.app/api?type=soft&color=gradient&customColorList=1,15,30&height=120&section=header&text=Thank%20You&fontSize=60&animation=twinkling)
