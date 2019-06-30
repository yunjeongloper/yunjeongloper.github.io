---
layout: post
title: React Native - Redux Store 구상하기
tags: [react-native]
---

Why do we need it?
- Components have local state, but apps have global state.
- Sometimes state needs to be shared.
- We need to save the <b>shared state</b> somewhere .
- Redux = State Container.

UselessProps
- We are sending the 'loggedUser' prop to <Post /> so later we can send it <Comment /> so then we can use it to reply to a comment.
- Everything has to be inside of <BlogContainer /> and that's not good news.

No flying Props !!

Redux is a global state Container
- The Redux Store is like a box.
- We go and grab what we need for container.

Stuff to remeber
- The whole state of your app is store in an object (Store).
- If you want to change the data inside of this object you need to 'dispatch'(send) an action.
- You will send this actions to a reducer and this reducer will change the object for you.
- 액션을 리듀서에게 전달해야함

- 리듀서는 데이터를 변경하려고 한다
- 액션을 리듀서에게 보내면 리듀서는 이를 살펴본 후에
- 만약 이것이 액션이라면 나는 이것을 할거야
  - 만약 액션이 '시작'이라면 나는 '시작'을 할거야
```javascript
function greet(lang) {
  switch(lang) {
    case 'spanish':
      return 'hola';
    case 'korea':
      return '안녕하세요';
    default:
      return '?';
  }
}
```

```javascript
// Import

// Actions

const START_TIMER = 'START_TIMER';
const RESTART_TIMER = 'RESTART_TIMER';
const ADD_SECOND = 'ADD_SECOND';

// Action Creators

function startTimer() {
  return {
    type:"START_TIMER"
  };
}

// reducer - Initial State를 만들 수 있음

const TIME_DURATION = 1500;

const initialState = {
  isPlaying: false,
  elapsedTime: 0,
  timeDuration: TIME_DURATION
}
  // 리덕스는 자동으로 액션을 리듀서로 보낸다. 디폴트임
function reducer(state = initialState, action) {
  switch(action.type) {
    case START_TIMER:
      return applyStartTimer(state);
    //reducer가 state를 줄 수 있게 디폴트를 만듬
    default:
      return state;
  }

}

// Reducer Functions

function applyStartTimer(state) {
  return {
    ...state,
    isPlaying: true
  }
}

// Export Action Creators

const actionCreators = {
  startTimer,
  restartTimer,
  addSecond
}

// Export Reducer

export default reducer;
```
store는 createStore()로 불러옴

Provider의 역할은 스토어를 복사해 칠드런 컴포넌트에 넣는것.

Connect는 컴포넌트를 스토어와 연결하는 것을 도와줌
