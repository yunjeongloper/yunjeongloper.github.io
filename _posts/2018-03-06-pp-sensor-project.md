---
layout: post
title: 센서를 이용한 동물 보호 시스템 - 팀 프로젝트
tags: [portpolio, raspberry-pi]
---

- 프로젝트 기간 : 2017.10 - 2017.11 <br />
- 사용 언어 및 프레임워크 : JAVA, python3, Spring<br />
- 사용 tool : Eclipse,SQL Developer <br />
- 사용 device :Raspberry Pi3, Ultrasonic Sensor,PI Camera <br />
- OS 및 DB : Window, raspbian OS, MySQL<br />
- [프로젝트 github 링크](https://github.com/yunjeongloper/portfolio/tree/master/HCMC/views)
- 프로젝트 소개 : 라즈베리파이와 초음파 센서 카메라를 이용해서 반려동물의 움직임을 파악하고
접근제한구역을 정해 그 구역에 접근 시 알람을 울려 반려동물의 시선을 다른곳으로 유도하는 하는 시스템

삼육대학교 컴퓨터학부 프로젝트 경진대회에서 장려상을 수상하였습니다. <br />
반려동물 시장규모와 1인 가구 비중이 커지고 있습니다. 반려 동물을 키우면서 가장 신경 쓰이는 부분 1위는 대소변, 털 날림 등 위생 문제이고 2위는 혼자 두는 시간입니다. 가장 문제가 되는 상황 1,2위를 해결하기 위한 목적으로 이 프로젝트를 계획하게 되었습니다. 제가 맡은 부분은 파이 카메라 연결과 웹 페이지 레이아웃 이었습니다. 초음파 센서를 연결할 때 디지털 신호를 사용하였는데 초음파 센서의 Echo핀에서는 5V의 출력이 나오는 반명 파이는 3.3V 밖에 입력받지 못했습니다. 그래서 저항의 전압 분배법칙을 이용해야 했습니다. 다양한 회로도를 찾아 보고 적용해보며 센서를 작동시킬 수 있었습니다.

## 시스템 동작 원리
아래와 같은 구조로 이루어져 있습니다
<center>
<img src="{{ "/assets/img/sensor_info.jpg" | absolute_url }}" alt="" width="80%"/>
</center>
**특정 지역에 센서**가 울리면 아래와 같이 동작하게 됩니다
<center>
<img src="{{ "/assets/img/sensor_info2.jpg" | absolute_url }}" alt="" width="80%"/>
</center>
**모니터링 서비스**는 아래와 같이 동작합니다
<center>
<img src="{{ "/assets/img/sensor_info3.jpg" | absolute_url }}" alt="" width="80%"/>
</center>

## 실행 화면
<center>
<img src="{{ "/assets/img/sensor_screen.jpg" | absolute_url }}" alt="" width="30%"/>
<img src="{{ "/assets/img/sensor_screen2.jpg" | absolute_url }}" alt="" width="30%"/>
</center>
