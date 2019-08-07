# React CRA 프로젝트에 TypeScript와 Styled-Components 적용하기

React로 사이드 프로젝트를 진행하려고 CRA를 생성했다.

    npx create-react-app side-project

그런데 문득 든 생각. 아, 어차피 사이드 프로젝트이고 처음부터 시작해야 하는 김에 그동안 도입 해보고 싶었던 것들을 모두 때려넣어볼까?

![yeah](/assets/img/yeah-175d5676-0bcc-42d7-af48-23429869e8f2.gif)

일단 typescript 무조건 넣고 styled-components도 넣어보기로 했다. Unit Test도 넣고싶었는데 현재 상태에서는 러닝 커브가 높을 것 같아서 일단 보류했다. 일단 만들어야 재미가 생기는 나이기에..

간략한 설명과 함께 CRA(create-react-app)에 적용하는 방법을 알아보자.

## TypeScript

TypeScript는 마이크로소프트에서 개발한 프로그래밍 언어이다. 자바스크립트의 typed superset이라고 한다. 무슨 뜻인지는 사용하면서 알아보도록 하자. 아마 'type'이라는 개념이 없는 자바스크립트를 typed 하게 만들어준다는 뜻인 것 같다. 나는 그간 자바스크립트로 개발하는 도중 알아내기 힘든 오류나 충돌이 생기더라도 묵묵히 제 갈길을 나아가는 거북이처럼 디버깅을 해왔다. 타입스크립트가 얼마만큼 개발 생산성을 향상시켜줄지 너무 기대되는 순간이다. 

프로젝트에 타입스크립트를 도입하는 방법은 두 가지가 있다.

1. CRA프로젝트를 생성할 때 아싸리 타입스크립트로 생성하기.
2. 기존의 프로젝트를 타입스크립트로 변환하기.

사실 여기서는 1번의 방법으로 진행할 것이다. 사실 타입스크립트 도입을 고려할 때에 1번의 방법을 선택할 수 없는 상황이 대다수일 것이다. 2번에 관하여서는 차후에 상용 프로젝트에 도입해보고 난 후에 팁이나 후기를 작성하는 방식으로 진행 해 봐야겠다.

### TypeScript로 CRA 프로젝트 생성하기

    npx create-react-app my-app --typescript

끝.

이라고 하면 좀 그러니까 생성된 프로젝트 구조를 보기로 하자.

![project-structure](/assets/img/_2019-08-07__2-68e34468-26ab-4cc0-ae0e-523c1810d04e.31.23.png)

기존의 js 파일이 전부 tsx 파일이가 되었다

## 참고

- [https://reactjs.org/docs/static-type-checking.html#typescript](https://reactjs.org/docs/static-type-checking.html#typescript)
- [**https://ahnheejong.gitbook.io/ts-for-jsdev/](https://ahnheejong.gitbook.io/ts-for-jsdev/) (추천! 한국어임)**
