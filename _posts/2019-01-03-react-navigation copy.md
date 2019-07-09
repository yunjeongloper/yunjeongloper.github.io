---
layout: post
title: 리액트 네이티브의 네비게이션 - RN, RNN
tags: [react-native]
---

> 참고 <br>
> <https://jsdev.kr/t/react-native-1-navigation/2617>

react-native 프로젝트를 진행하면서 네비게이션 라이브러를 결정하는 과정에서 가장 자주 언급되는 두 가지 라이브러리를 선정했다.

<hr>
[React-navigation](https://reactnavigation.org/) : js기반, navigation의 ui를 view와 애니메이션으로 직접 구현

[React-native-navigation](https://github.com/wix/react-native-navigation) : 네이티브 기반, os에서 제공하는 navigation관련 네이티브 컴포넌트를 사용
<hr>

React-native-navigation(이하 RNN)은 이름 그대 JS bridge와 함께 사용하는 네이티브 모듈이다. 그렇기 때문에 퍼포먼스 성능이 더 좋다.

React-navigation(이하 RN)은 리액트 네이티브에서 제공하는 단순하고 강력한 라이브러리이다. 완전히 JS로 쓰여졌지만 마치 네이티브가 동작하는 것 처럼 보이게 만들어졌다. npm-intall을 실행하는 것 만으로 사용할 수 있다.

<b>
만약 전부 다 자바스크립트로 구현하길 원한다면 RN을 사용하고, 네비게이션의 퍼포먼스가 더 중요한 사람이라면 RNN을 사용하는 것을 추천한다
</b> <br>

추가로 두 라이브러리들은 모두 활발하게 버전업이 이루어지고 있다. RN은 현재 v3까지 버전업이 되면서 더 나은 안정성과 성능을 확보하였다. RNN의 퍼포먼스를 따라갈 수는 없겠지만, 그 차이는 사용하기에 큰 문제가 없는 수준이라고 한다. 또한 RN은 참고할 수 있는 레퍼런스가 많다는게 큰 장점이라고 생각한다.
