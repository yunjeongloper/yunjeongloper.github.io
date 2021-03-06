---
layout: post
title: 코어 자바스크립트 - 1장. 데이터 타입
tags: [javascript]
---

자바스크립트가 데이터를 처리하는 과정을 살펴봄으로써 기본형 타입과 참조형 타입이 서로 다르게 동작하는 이유를 이해하는 것을 목표로 함

---

### 데이터 타입의 종류

![자바스크립트의 데이터타입](/assets/img/js/data-type.png)

- 기본형은 값이 담긴 주솟값을 바로 복제하는 반면 참조형은 값이 담긴 주소값들로 이루어진 묶음을 가리키는 주솟값을 복제한다는 점이 다름
  
---

### 데이터 타입에 관한 배경지식

#### 메모리와 데이터

- 1byte = 8bit
- 자바스크립트의 경우 숫자의 메모리 공간을 확보할 때, 정수형인지 부동소수형인지를 구분하지 않고 8바이트를 확보 <- 과거에 비해 월등히 커진 메모리 용량 덕분에
- 모든 데이터는 바이트 단위의 식별자, 더 정확하게는 메모리 주솟값을 통해 서로 구분하고 연결할 수 있음

#### 식별자(identifier)와 변수(variable)

- 변수 : 변할 수 있는 데이터
- 식별자 : 어떤 데이터를 식별하는 데 사용하는 이름. 즉, 변수명

---

### 변수 선언과 데이터 할당

#### 변수 선언

```javascript
var a;
```

#### 데이터 할당

```javascript
var a;          // 변수 선언
a = 'abc';      // 데이터 할당
```

- 데이터의 성질에 따라 '변수 영역'과 '데이터 영역'으로 구분되어서 저장됨
- 기존 문자열에 어떤 변환을 가하든 상관 없이 무조건 새로 만들어 별도의 공간에 저장

- 왜 저장 영역을 구분하는 것일까?
  - 데이터 변환을 자유롭게 할 수 있게 함
  - 메모리를 더 효율적으로 관리하기 위해
  - 중복된 데이터에 대한 처리 효율이 높아짐

---

### 기본형 데이터와 참조형 데이터

#### 불변값

기본형 데이터인 숫자, 문자열, boolean, null, undefined, Symbol은 모두 불변값. 한 번 만들어진 값은 가비지 컬렉팅을 당하지 않는 한 영~원~히~ 변하지 않음!

#### 가변값

참조형 데이터는 가변값인 경우가 많지만 설정에 따라 다르다.

- 중첩 객체(nested object): 참조형 데이터의 프로퍼티에 다시 참조형 데이터를 할당하는 경우
- 자신의 주소를 참조하는 변수의 개수를 참조 카운트라 한다.
- 참조 카운트가 0인 메모리 주소는 가비지 컬렉터의 수거 대상이 된다.
- 가비지 컬렉터가 존재한다면 이렇게 생겼을 것 같다 💛
![GC](/assets/img/js/gc.gif)

#### 변수 복사 비교

- 변수를 복사하는 과정은 기본형 데이터와 참조형 데이터 모두 같은 주소를 바라보게 되는 점에서 동일함
- 하지만 ***데이터 할당 과정에서 이미 차이가 있기 때문에*** 변수 복사 이후의 동작에서 큰 차이가 발생함
- 기본형은 주솟값을 복사하는 과정이 한 번만 이루어지고, 참조형은 한 단계를 거치게 된다는 차이가 있는 것임

참조형 데이터가 '가변값'이라고 설명할 때의 '가변'은 ?

- 참조형 데이터 자체를 변경할 경우가 아니라!
- 그 내부의 프로퍼티를 변경할 때만 성립함

---

### 불변(Immutable) 객체

#### 불변 객체를 만드는 간단한 방법

- 참조형 데이터도 데이터 자체를 변경하고자 하면 기존 데이터는 변하지 않는다.
- 그렇다면 내부 프로퍼티를 변경할 필요가 있을 때 마다 매번 새로운 객체를 만들어 재할당하거나 자동으로 새로운 객체를 만드는 도구(immutable.js, immer.js, ES6의 spread operator, Object.assign 등)을 사용하면 객체의 불변성을 확보할 수 있을 것임.

어떤 상황에서 불변 객체가 필요할까?

- 값으로 전달받은 객체에 변경을 가하더라도 원본 객체는 변하지 않아야 하는 경우!

#### 얕은 복사와 깊은 복사

- shallow copy : 바로 아래 단계의 값만 복사하는 방법
- deep copy : 내부의 모든 값들을 하나하나 찾아서 전부 복사하는 방법
- 깊은 복사를 위해서는 재귀적으로 수행을 하거나 객체를 문자열로 전환했다가 다시 JSON 객체로 바꾸는 방법 등을 활용할 수 있다.

#### undefined와 null

'없음'을 나타내는 값 두 가지 ```undefined```와 ```nul```.

- ```undefined``` : 어떤 변수에 값이 존재하지 않을 경우
- ```null``` : 사용자가 명시적으로 '없음'을 표현하기 위해 대입한 값
- '없음'을 표현하기 위해 ```undefiend```를 대입하는 것은 지양하는 것이 좋다

---

### 참고

> [코어 자바스크립트](http://www.yes24.com/Product/Goods/78586788)  
> <https://tutorial.eyehunts.com/js/javascript-data-types-and-examples/>  
> <https://blog.sessionstack.com/how-javascript-works-memory-management-how-to-handle-4-common-memory-leaks-3f28b94cfbec>  
