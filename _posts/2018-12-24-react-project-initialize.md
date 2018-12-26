---
layout: post
title: React.js 1 - 개발 환경 셋팅, CLI 실행
tags: [react]
---

React.js에서 제공해주는 CLI를 실행하려면 먼저 개발 환경을 셋팅해주어야 한다.
개발 환경 셋팅은 아래와 같은 순서로 진행된다.

>1. nvm 설치
>2. node.js 설치
>3. nvm을 이용하여 node.js 버전 셋팅
>4. yarn 설치
>5. CLI 프로젝트 생성
>6. intellij 설정
>7. CLI 프로젝트 실행

Mac OS와 Intellij IDE 기반으로 진행되지만, Window에서의 환경 셋팅 또한 크게 다르지 않다. 1번에서 nvm를 설치할때만 Window 전용 nvm인 [nvm-window](https://github.com/coreybutler/nvm-windows)를 설치해주면 된다. <br> <br>


### 1. nvm 설치
nvm(Nodejs Version Management)을 사용하면 쉽게 node.js의 버전을 관리할 수 있게 된다. Mac 에서 nvm을 사용하지 않고 node.js를 먼저 설치하게 되면 루트 계정에 설치되기 때문에 권한 문제로 node.js 다루기가 까다로워진다. 이전에 node.js를 설치한 이력이 있다면 전부 깨끗하게 삭제하고 지우는 것을 추천한다. node.js를 완전히 삭제하는 방법은 구글에 치면 자세하게 나온다.

#### 최신 버전중에서 안정된 버전의 nvm 설치하기

```bash
 nvm install lastest
```
 <br> <br>

### 2. node.js 설치
node.js는 공식 홈페이지에 들어가서 다운로드해주면 된다. Window라면 해당 홈페이지에서 다른 운영 체제 버튼을 클릭하여서 본인에게 해당되는 운영 체제의 node.js를 설치하면 된다.

#### node.js 설치 여부 확인
```bash
 node –version
```
 <br> <br>

### 3. nvm을 이용하여 node.js 버전 셋팅

다시 `nvm ls` 명령어를 입력하여 설치가 잘 되었는지 확인해보자. 설치가 잘 되었는지 확인한 후에 node.js 버전을 셋팅하는 명령어를 입력해주어야 한다. (2018/12/24 기준 latest stable 버전은 11.5.0)

#### nvm으로 node.js 설치 여부 확인하기
```bash
 nvm ls
```

#### nvm으로 node.js 사용 버전 셋팅하기
```bash
 nvm use 11.5.0
```
 <br>

### 4. yarn 설치

yarn은 npm의 업그레이드 버전이라고 생각할 수 있는데, npm보다 훨씬 쾌적한 속도를 자랑한다.

#### yarn 설치하기
```bash
 npm install yarn
```

이제 React.js CLI 프로젝트를 실행할 수 있는 개발 환경 셋팅이 완료되었다!!
 <br> <br>

### 5. CLI 설치
React CLI 설치는 [이 사이트](https://velopert.com/2037)를 참고하여서 설치하였다.

#### 설치하기
```bash
 npm install -g create-react-app
```

설치가 완료되면 프로젝트를 생성하고자 하는 위치로 이동하고 아래의 명령어를 입력하면 프로젝트가 생성된다.

#### 프로젝트생성
```bash
 npx create-react-app my-app
```
<center>
<img src="{{ "/assets/img/react-1-02.png" | absolute_url }}" alt=""/>
</center>

#### 생성된 프로젝트로 이동
```bash
 cd my-app
```

프로젝트 설치 성공!!!
 <br> <br>

### 6. intellij 설정

#### 프로젝트 열기
<center>
<img src="{{ "/assets/img/react-1-03.png" | absolute_url }}" alt=""/>
<img src="{{ "/assets/img/react-1-04.png" | absolute_url }}" alt=""/>
<img src="{{ "/assets/img/react-1-05.png" | absolute_url }}" alt=""/>
</center>

#### yarn 설정
Preference -> Languages & Frameworks -> Node.js and Npm 에서 package manager 가 yarn으로 설정 되어있는지 확인. 만약 설정이 되있지 않으면 아까 설치한 yarn의 경로로 재설정해주면 됨
<center>
<img src="{{ "/assets/img/react-1-06.png" | absolute_url }}" alt=""/>
</center>

#### 실행 환경 설정
Run -> Edit Configuration -> 왼쪽 상단의 + -> npm 추가
<center>
<img src="{{ "/assets/img/react-1-07.png" | absolute_url }}" alt=""/>
</center>
package.json의 path 확인하고 Scripts 부분에서 오른쪽 화살표를 눌러 start로 셋팅해준다. Scripts 환경은 package.json 파일에서 script 명령어로 설정되어 있는 값들로 셋팅된다.

<span style="font-size:0.9em; color: dimgray;">
react-scripts를 직접 설정하여 사용하고 싶다면  [create-react-scripts](https://www.npmjs.com/package/create-react-scripts) 이 사이트를 참고해보자.
또한, 실행 설정을 추가하거나 변경하여 사용하고 싶다면 아까 Run Configuration 화면에서 Environment를 추가해 주면 된다.
EX) 실행 브라우저를 변경하고 싶다면 아래와 같이 환경값을 추가해주면 된다.
</span>
<center>
<img src="{{ "/assets/img/react-1-environment.png" | absolute_url }}" alt="" width="70%"/>
</center>
 <br> <br>

### 7. CLI 프로젝트 실행
이제 Run을 해보자!! (우측 상단에 초록색 재생 버튼)
<center>
<img src="{{ "/assets/img/react-1-08.png" | absolute_url }}" alt=""/>
</center>
위와 같은 로그가 뜬다면 정상적으로 실행된 것이다. 로그의 링크를 클릭하거나 팝업된 브라우저를 확인해보자.
<center>
<img src="{{ "/assets/img/react-1-09.png" | absolute_url }}" alt=""/>
</center>
React.js CLI 프로젝트 실행 완료
