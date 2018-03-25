---
layout: post
title: ROR(Ruby On Rails)
tags: [DoYouKnowAbout...]
---

Rails로 쉽고 빠른 웹 사이트 만들기
> https://www.inflearn.com/course-status-2/

## Ruby

### Ruby란 무엇인가?
- 루비로는 거의 모든 것을 할 수 있다
- 루비는? 개발자가 기쁨(joy)를 느낄 수 있는 언어 (=인간 친화적인 언어)
- 루비는 반복수를 따지는 경향이 있다
- 루비는 영어 문장처럼 쓰는데 그 자체가 명령문임
- 변수에 대한 타입을 명시하지 않아도 변수로 쓸 수 있음

### 개발 환경 구축하기
- Cloud9이 aws와 통합됨
- goorm IDE 를 사용하여서 빠르게 프로젝트를 구성해보자
- [goorm IDE](https://ide.goorm.io/)
- 프로젝트 기본 이미지 <br />
  - Ubuntu 14.04 LTS
  - Ruby 2.4.0
  - rvm 1.29.1
  - Rails 5.0.1
  - Sinatra 1.4.7
- 프로젝트 구동 완료!!!
<center>
<img src="{{ "/assets/img/ror_set.png" | absolute_url }}" alt="" width="80%"/>
</center>

### 변수와 상수
- 변수란? 변하는 값
- 상수란? 변하지 않는 값
- 변수의 종류
  - 지역변수? 자신이 선언된 스코프에서만 사용이 가능함
    ```
    foo = 'foo in top level'
    ```
  - 전역변수? 어디서 선언하든, 어느곳에서나 불러올 수 있음
    ```
    $foo = 'foo in whole'
    ```
  - 인스턴스 변수? 클래스 내에 있는 인스턴스에서 불러올 수 있음
    ```
    @foo = 'foo in instance'
    ```
  - 클래스 변수? 클래스 내에 어디에서든 불러올 수 있음
    ```
    @@foo = 'foo in class'
    ```

### 연산자
- 연산자란? 특정한 작업을 하기 위해서 사용하는 기호
- 연산자의 종류
  - 대입 연산자 =
  - 산술 연산자 +, -, *, **, /, %
  - 비교 연산자 ==, !=, <, <=. >, >=
  - 논리 연산자 ```&&, ||, !```

### 기본적인 제어 구조
- 대표적인 제어 구조
  - 조건문
    - if문 : 만약 ~라면
    - unless문 : 만약 ~가 아니라면
  - 반복문
    - while문
    - for..., do... : ...동안 ...를 하라
      ```
      for i in 0..10
        puts
      end
      ```
      배열도 할 수 있음
      ```
      array = ["hi","hello",3]
      for i in array
        puts i
      end
      => ["hi","hello",3]]
      ```
      **0..2 는 0,1,2** <br />
      **0...2 는 0,1**

### 메소드란?
모든 문장은 명사와 동사로 이루어져 있다. <br />
루비의 세계에서는 객체(Object)가 명사이고 메소드(Method)가 동사이다.
```
def peel_banana(banana)
  yummy_banana = banana.peel
  return yummy_banana
end
```
```
def is_even? (number)
  if number%2 == 0
    puts "even"
  else
    puts "odd"
  end
end
=> is_even?

is_even?(71)
=> "odd"

is_even?(74)
=> "even"
```

## Ruby on Rails : 기본 수업

### Rails란 무엇인가?
- aka DHH가 만듬
- 만들고자 하는 웹 어플리케이션을 빠르고 쉽게 만들어주는 오픈소스 웹 프레임워크
- MVC? 모델은 비즈니스 로직 데이터 및 데이터베이스 작업, 뷰는 사용자의 요청에 따른 결과물이 표현되는 부분으로써 화면에 표출되는 방식에 대한 로직과 데이터를 다루고, 컨트롤러 모델과 뷰를 연결시켜주고 사용자의 입력을 받아 모델을 조작하는 등 데이터의 흐름을 제어하는 역할을 함.
- CoC? Convention Over Configuration Rails는 최선의 방법으로 일을 처리하게 해주는 디폴트/소프트웨어 디자인 패러다임. 또한 개발자가 내려야 할 수많은 결정들을 줄여줌. 이로써 끊임없는 컴퓨터 구성 파일을 설정하는 일보다 코딩하는 일에 더 많은 시간을 투자할 수 있음.
- DRY? Don't Repeat Yourself 코드에 반복성을 줄이기 위한 소프트웨어 이름. 이로써 더 쉽게 관리하고 확장할 수 있고 버그를 줄일 수 있습니다.

### 기본 구조 파악하기
- 레일지는 웹 사이트를 만들기 위한 하나의 거대한 툴
- 브라우저와 서버간에는 데이터 교환이 일어난다
- 브라우저는 서버가 보내준 HTML, CSS파일을 읽은 후 사용자가 보기 좋게 화면에 띄워준다. JSP 파일을 실행시켜서 화면을 동적으로 구성한당
- 서버는 처음에 **routes.rb** 라는 파일을 읽어서 실행시킴. 요청된 URL이 어느 컨트롤러와 연결되어있는지 확인하고 **컨트롤러**에게 일을 보냄

### 페이지 생성하기
- routes.rb -> Controller -> View 3단계로 처리해보장
- 세 가지가 모두 정상 작동해야 페이지가 생성된다
- 컨트롤러를 만들면 뷰파일은 자동으로 만들어짐
```
root@goorm:/workspace/rainbow# rails generate controller home
```
  - 이러케 하면 **app > controllers home_controller.rb**라는 파일이 생김
  - home이라는 컨트롤러를 만들었기 때문에 views폴더에는 home이라는 폴더가 자동으로 생김
- **<% 루비 문법은 여기 안에 씀 %>**
- 그런데 컨트롤러에 있는 변수를 view에 출력할때는 <% @message %> 이런식으로 하면 안됨. <%**=** @message %> 이케하자
- 총 세 가지의 파일을 수정했다
  - routes.rb
    ```
    Rails.application.routes.draw do
    	# 주소로 처음 들어가면 HomeController에서 index 액션에 연결해주세요
    	get '/' => 'home#index'
    	get '/home' => 'home#hi'
      # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    end
    ```
  - home_controller.rb
    ```
    class HomeController < ApplicationController
    	def index
    	end

    	def hi
    		@show_message = true
    		@message = "도망쳐"
    	end
    end
    ```
  - hi.erb
    ```
    <% if @show_message %>
    <p><%= @message%></p>
    <% end %>
    ```
