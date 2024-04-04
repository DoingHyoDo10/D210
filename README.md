# README.md

# D210(효도하기 10조) 특화 프로젝트

# 🐣WALKWALK - 블록체인을 활용한 운동 격려 서비스🐣

<div align="center">
 <img src="/uploads/574743d219fbbcd65b7a0423a1d1e020/Untitled.png" width="50%"> 
</div>


WALKWALK 링크: https://j10d210.p.ssafy.io/
<br><br><br>

## 서비스 개요


운동을 안 해 걱정인 주변인이 있다면 용돈을 수단으로 삼아 운동을 시킬 수 있습니다.

운동과 용돈 지급 내역은 블록체인으로 투명하게 운영됩니다.
<br><br><br>

## 주요 기능

- 미션
    - 운동을 시키는 사람은 할리, 운동을 할 사람은 갈리로 나뉘어 앱을 사용하게 됩니다.
    - 할리와 갈리 매칭을 해두면, 할리는 갈리에게 미션을 걸 수 있습니다.
    - 하루 최소 운동(걸음) 시간을 설정하고, 이를 달성하면 용돈을 지급합니다.

- 응원
    - 운동 시작 버튼을 누르면 할리에게 알림이 갑니다.
    - 그때, 할리는 갈리에게 응원 메시지를 보낼 수 있습니다.

- 리포트
    - 운동하기 버튼을 눌러 진행한 운동은 블록체인에 저장이 됩니다.
    - 이 데이터를 토대로 월별 리포트를 제공합니다.

- 랭킹
    - 친구들 사이에서 내 순위를 확인할 수 있습니다.
    - 순위는 걸음 수 기준 일, 주, 월별, 스트릭(운동을 꾸준히 한 기간) 기준으로 제공됩니다.
    - 가상 맵으로도 이를 확인할 수 있습니다.

- 자가 미션
    - 자기 자신에게도 최소 운동 기준을 설정할 수 있습니다.
    - 초기에는 WHO의 연령대별 기준으로 초기화되어 있습니다.
    - 자가 미션을 기준으로 스트릭이 산정됩니다.
<br><br><br>

## 프로젝트 기간

2024/02/19 ~ 2024/04/03 (45일간 진행)

SSAFY 10기 2학기 특화 프로젝트 - WALKWALK 
<br><br><br>

## 주요 기술 및 개발 환경

### Frontend

- Visual Studio Code
- HTML5, CSS3, JavaScript(ES6)
- React
- Stompjs
- zustand
- Nodejs
- Vite
- Tailwind CSS
- 사용한 외부 API
    - Web Speech API
    - Google Fitness API
    - Google geoLocation API
    - Google Map React API

### Backend

- IntelliJ
- JVM Open JDK
- Spring Boot
    - Spring Data JPA
    - Spring Security
    - SSE Emitter
- JWT
- OAuth2.0
- STOMP-WEB-SOCKET
- REDIS Lettuce
- REDIS
- Gradle
- AWS S3 Bucket Cloud
- AWS Transcribe
- AWS Lambda
- Spring Batch
- Google TTS Cloud AI
- 사용한 외부 API
    - Google fitness API

### BLOCKCHAIN

- Solidity
- Remix IDE
- MetaMask
- Ethereum
- Sepolia TestNet
- ethersjs
- Web3j
- Klaytn API Service

### CI/CD

- AWS EC2
- Docker
- Jenkins
<br><br><br>

## 협업 툴

- GitLab - 코드 버전 관리 및 MR과 리뷰
- Jira - 매주 목표량 설정, 프로젝트 진행도 확인
- Notion - 회의록 작성, 기술 레퍼런스 공유, 프로젝트 산출물 관리
- Figma - 목업, 와이어프레임, 디자인 공유
- MatterMost - 자료 및 api 현황과 요청사항 공유
- Code With Me - 실시간 협업 코딩
<br><br><br>
## 포팅 메뉴얼


[포팅 메뉴얼 링크!](https://lab.ssafy.com/s10-blockchain-contract-sub2/S10P22D210/-/blob/d182195b6dea4772f0d6107ca9456296be04a571/exec/%ED%8F%AC%ED%8C%85%20%EB%A9%94%EB%89%B4%EC%96%BC%20WALK_WALK.pdf)
<br><br><br>

# 효도하기 10조의 팀원들을 소개합니다!

| 이름 | 역할 | 개발 내용 |
| --- | --- | --- |
| 전수민 | 팀장<br/>Back<br/>Front | - DB 설계<br/>- 회원, Spring Security & JWT &  OAuth2.0<br/>- 채팅 및 tts, 응원 메시지 구현<br/>- 화면 설계 |
| 한채연 | Back<br/>Blockchain | - DB 설계<br/>- 지갑 관리 및 카카오페이 연동<br/>- 블록체인 |
| 최지수 | Back | - DB 설계<br/>- 운동 데이터, 기준 및 운동 도메인 api<br/>- 스프링 배치 및 스케줄링을 통한 대용량 데이터 처리 서버 구현<br/>- 랭킹 도메인 페이저블 구현 |
| 심규영 | Front<br/>Blockchain | - 화면 설계<br/>- 블록체인<br/>- 회원관리 & OAuth2.0<br/>- 결제 |
| 김세현 | Front<br/>Back | - DB 설계<br/>- 서버 EC2 배포<br/>- CI/CD with Jenkins<br/>- 친구, 할리갈리 관리<br/>- SSE 알림 서비스<br/>- 메인화면, 할리갈리, 친구 페이지 구현 |
| 김규리 | Front | - Figma를 이용한 화면 디자인 설계<br/>- 메인, 랭킹, 친구, 할리갈리 미션 설정, 상점, 응원메시지, 보물찾기 화면 구현<br/>- axios로 API 연결<br/>- Zustand로 상태관리 |

<br><br><br>
## 주요 서비스 화면

### 회원 가입 및 로그인

<div align="center">
 <img src="/uploads/236e4873c27e9a5a69bfab77fb00eff8/스크린샷_2024-04-03_211351.png" width="50%"> 
</div>

### 메인 화면

<div align="center">
 <img src="/uploads/bac538d5fa61a2e3c5b5c3aae6e37534/j10d210.p.ssafy.io_main_Samsung_Galaxy_S20_Ultra___1_.png" width="50%"> 
</div>

### 랭킹

<div align="center">
 <img src="/uploads/b037ba389d9dcf5a30ba6eca26c76f5d/j10d210.p.ssafy.io_main_Samsung_Galaxy_S20_Ultra___5_.png" width="50%"> 
</div>

### 운동 페이지

<div align="center">
 <img src="/uploads/878093d1381368bb9296be897d386c4d/j10d210.p.ssafy.io_main_Samsung_Galaxy_S20_Ultra___6_.png" width="50%"> 
</div>

### 응원 메시지

<div align="center">
 <img src="/uploads/344a716df6a480720972f4e4482d4c38/j10d210.p.ssafy.io_main_Samsung_Galaxy_S20_Ultra___8_.png" width="50%"> 
</div>

### 응원 메시지 보관함

<div align="center">
 <img src="/uploads/9e8ec93f45ec80e67c0523088a1d16f8/j10d210.p.ssafy.io_main_Samsung_Galaxy_S20_Ultra___9_.png" width="50%"> 
</div>

### 응원 메시지 보내기

<div align="center">
 <img src="/uploads/fedfbd3d2fd763ece021a647c570c62d/j10d210.p.ssafy.io_voice_sendvoice_Samsung_Galaxy_S20_Ultra_.png" width="50%"> 
</div>

### 친구 목록

<div align="center">
 <img src="/uploads/89f295dcb94f3e7fd438950836de55a0/j10d210.p.ssafy.io_main_Samsung_Galaxy_S20_Ultra_.png" width="50%"> 
</div>

### 친구 검색

<div align="center">
 <img src="/uploads/f134cc65c308cb3363a52df95e570911/j10d210.p.ssafy.io_main_Samsung_Galaxy_S20_Ultra___2_.png" width="50%"> 
</div>

### 친구 신청

<div align="center">
 <img src="/uploads/efdf427b1118fa9193ef3bf6cc039619/j10d210.p.ssafy.io_main_Samsung_Galaxy_S20_Ultra___3_.png" width="50%"> 
</div>

### 마이페이지

<div align="center">
 <img src="/uploads/0c6fd0fd1b972a46e77c4f7f2cbbc896/j10d210.p.ssafy.io_main_Samsung_Galaxy_S20_Ultra___4_.png" width="50%"> 
</div>
