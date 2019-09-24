---
layout: post
title: [NomadCoders] Typescript로 블록체인 만들기
tags: [Typescript, Blockchain]
---

> 이 글은 [NomadCoders 님의 강의](https://academy.nomadcoders.co/courses/)를 수강하고 나름대로 정리하여 업로드한 글입니다

강의 하나의 분량을 5분 정도로 끊으시는데 아주 손에 땀을 쥐게 하는 5분이었다. 내 기준 굉장히 타이트했기 때문에 잠시도 한 눈을 팔 수 없었다. 중간 중간 찰진 욕을 들으면 넘 웃겨서 잠시 긴장이 풀리지만 금방 정신을 차려야 한다... 암튼 결론은 니꼴라스님 강의 최고시다 🥰 니꼬님 말투를 살려서 정리해보았다

---

그냥 js 문법대로 작성한 예시이다

```javascript
const name = "Yun Jeong",
    age = 25,
    gender = "female";

const sayHi = (name, age, gender) => {
    console.log(`Hello ${name}, you are ${age}, you are a ${gender}`);
}

sayHi(name, age, gender);

export {};
```

js에서는 함수를 호출할 때 파라미터를 선언한 대로 넣어주든 안 넣든 오류가 나지 않는다. 근데 이게 Typescript(이하 ts)라면...

```javascript
const name = "Yun Jeong",
    age = 25,
    gender = "female";

const sayHi = (name, age, gender) => {
    console.log(`Hello ${name}, you are ${age}, you are a ${gender}`);
}

sayHi(name, age);

export {};
```

똑같이 이렇게 코드를 짰을 때 오류를 빵!! 하고 보여줘. 실행 할 수가 없다. 멍청한 개발자의 실수를 미연에 방지해주는거;; js에서는 이런거 본 적 없을껄? 그냥
`Hello Yun Jeong, you are a 25, you are a undefined`가 출력되겠지

만약 sayHi의 gender를 optional하게 받고싶다면?

```javascript
const name = "Yun Jeong",
    age = 25,
    gender = "female";

const sayHi = (name, age, gender**?**) => {
    console.log(`Hello ${name}, you are ${age}, you are a ${gender}`);
}

sayHi(name, age);

export {};
```

이렇게 function을 정의할 때 **? (Optional)**를 사용하면 됨. Cool~

---

이제 function을 더 Typed 하게 만들어볼까

```javascript
const sayHi = (name:string, age:number, gender:string) => {
    console.log(`Hello ${name}, you are ${age}, you are a ${gender}`);
}

sayHi("YUMYUMYUM", 5000, "female");

export {};
```

개발자가 실수할 수 있느느 부분을 미리 방지해주는군, 더 예측 가능한 코드가 되겠어

이제는 함수의 리턴 값을 Typed 하게 바꿔보자

```javascript
const sayHi = (name: string, age: number, gender: string): void => {
    console.log(`Hello ${name}, you are ${age}, you are a ${gender}`);
}

sayHi("YUMYUMYUM", 5000, "female");

export {};
```

정확하게 어떤 값이 리턴되는지 알 수 있겠군!!

---

아니 근데 yarn start 매번 입력해야 하는지..? No!

tsc-watch라는 라이브러리가 ts의 변경사항을 보고 있다가 업데이트 해준다

`yarn add tsc-watch --dev`

로 패키지를 설치해주고 package.json의 start script를 아래처럼 변경해줌

```json
"scripts": {
    "start": "tsc-watch --onSuccess \" node dist/index.js \" "
},
```

위에 --onSuccess는 ts compile(tsc)이 성공했을 시에만 동작하라는 뜻

그리고 root에 몽땅 때려넣어진 파일들을 정리해주어야 한다

→ compile후에 생긴 js파일은 dist/ 밑으로

→ ts파일은 src/ 밑으로

파일 위치를 변경하고 난 후에는 config 옵션도 변경해주어야 한다

```json
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "ES2015",
        "sourceMap": true,
        "outDir": "dist"
    },
    "include": [
        "src/**/*"
    ],
    "exclude": [
        "node_modules"
    ]
}
```

요로케

---

만약 파라미터로 object를 넘기고싶다면 어떻게 해야할까?

```javascript
const person = {
    name: "Yun Jeong",
    age: 25,
    gender: 25
}

const sayHi = (name: string, age: number, gender: string): string => {
    return`Hello ${name}, you are ${age}, you are a ${gender}`;
}

console.log(sayHi(person));

export {};
```

이렇게 하면 될까? No. 인터페이스를 사용해보삼

```javascript
interface Human {
    name: string;
    age: number;
    gender: string;
}

const person = {
    name: "Yun Jeong",
    age: 25,
    gender: "female"
}

const sayHi = (person: Human): string => {
    return`Hello ${person.name}, you are ${person.age}, you are a ${person.gender}`;
}

console.log(sayHi(person));

export {};
```

짠, 이제 내 Object는 더 예측가능해졌음

그런데 TS는 실제로 사용해 봤을 때 그 장점이 더욱 잘 드러남

그러니 얼른 무언가를 만들어 보자!

---

interface는 js로 컴파일되지 않아. 근데 가끔 인터페이스를 js에 넣고싶을 때가 있을텐데, 이럴 때는 ^class^를 사용하면 됨

class!!!! js에서는 class에 속성들에 대해 묘사할 필요가 없는데, ts에서는 클래스가 어떤 속성을 가져야 하는지, 어떤 권한을 가져야 하는지 알려줘야 함

interface를 class로 바꿔보자

```javascript
class Human {
    public name: string;
    public age: number;
    public gender: string;
    constructor(name: string, age: number, gender: string) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
}

const me = new Human("Veronica", 25, "female");

const sayHi = (person: Human): string => {
    return`Hello ${person.name}, you are ${person.age}, you are a ${person.gender}`;
}

console.log(sayHi(me));

export {};
```

인터페이스를 쓰거나 클래스를 쓰는 것은 상황에 따라 선택해서 쓰면 된다. interface는 사실 ts에서 적용하기에 더 적합한 것이긴 하다. 하지만 react, express 등등을 사용한다면 class를 사용해야 할 것이다

ts의 private/public을 사용하여 보호해야 할 데이터를 지정 해줌으로써 더 secure한 코딩이 가능해진다. 외부에 알리고 싶지 않은 속성들을 정확히 구분하는 것임

---

You know what, F**K THEORY. 이론은 그만하고 바로 블록 구조를 만들어보자

(노마드 코인 강의 들어야겠다.... 그래야 ts의 장점을 피부로 느낄 수 있다고 한다)

```javascript
class Block {
    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;
    constructor(index: number, hash: string, previousHash: string, data: string, timestamp: number) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}

const genesisBlock: Block = new Block(0, "2020202020", "", "hello", 123456);

let blockchain: Block[] = [genesisBlock];

console.log(blockchain);

export {};
```

위의 코드가 실행되면..

```javascript
[
    Block {
    index: 0,
    hash: '2020202020',
    previousHash: '',
    data: 'hello',
    timestamp: 123456
    }
]
```

멋찌지?

게다가 ts가 blockchain에 진짜 Block만 담기는 지 검사 해 주거든

바보같이 blockchain.push("trash") 같은 게 작동할 수가 없다는 것이야!!

---

이제 진짜 hash 함수를 사용 해서 블록을 생성해보자. crypto-js라는 라이브러리를 사용 할 것임

나는 calcualteBlockHash라는 함수를 만들어서 해시값을 구하게 하고 싶은데, class 내부에서 일반적인 method 선언 문법을 사용하게 된다면 해당 method는 반드시 블록을 생성했을 때에만 사용할 수 있게 된다. 으악!!!

이럴 때는 함수를 static으로 선언하면 해결할 수 있다

static으로 선언하지 않고 함수를 호출하려고 하면 vsc에서 아래와 같은 에러를 방출한다

Property 'calculateBlockHash' does not exist on type 'typeof Block'.ts(2339)

추가적으로 util처럼 사용할 다른 함수들도 만들어 보자.

```javascript
import * as CryptoJS from 'crypto-js';

class Block {
    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;

    static calculateBlockHash = (
        index: number,
        previousHash: string,
        data: string,
        timestamp: number
    ): string => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

    constructor(index: number, hash: string, previousHash: string, data: string, timestamp: number) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}

const genesisBlock: Block = new Block(0, "2020202020", "", "hello", 123456);

let blockchain: Block[] = [genesisBlock];

const getBlockchain = () : Block[] => blockchain;

const getLatestBlock = () : Block => blockchain[blockchain.length - 1];

const getNewTimesStamp = () : number => Math.round(new Date().getTime() / 1000);

console.log(blockchain);

export {};
```

완성~!~! 아주 beautiful하고 **predictable** 하다. (predictable이 아주 중요한 ts 속성인 듯)

---

이제 새로운 블록을 만들어보자

```javascript
import * as CryptoJS from 'crypto-js'; 

class Block {
    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;

    static calculateBlockHash = (
        index: number, 
        previousHash: string, 
        data: string, 
        timestamp: number
    ): string => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

    constructor(index: number, hash: string, previousHash: string, data: string, timestamp: number) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}

const genesisBlock: Block = new Block(0, "2020202020", "", "hello", 123456);

let blockchain: Block[] = [genesisBlock];

const getBlockchain = () : Block[] => blockchain;

const getLatestBlock = () : Block => blockchain[blockchain.length - 1];

const getNewTimesStamp = () : number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string) : Block => {
    const previousBlock: Block = getLatestBlock();
    const newIndex: number = previousBlock.index + 1;
    const nextTimestamp: number = getNewTimesStamp();
    const nextHash: string = Block.calculateBlockHash(newIndex, previousBlock.hash, data, nextTimestamp);
    const newBlock: Block = new Block(newIndex, nextHash, previousBlock.hash, data, nextTimestamp);
    return newBlock;
}

console.log(createNewBlock("hello"));
console.log(createNewBlock("byebye"));
console.log(blockchain);

export {};
```

여기서 콘솔을 찍고 나면 새로 생성한 블록의 index가 전부 1로 나오는데, 이건 버그는 아니다. 아직 blockchain에 블록을 push(add)하지 않았기 때문이다

---

블록을 push하기 전에 validation을 진행해보자

비트코인 클론 강좌에서는 다양한 validation을 다루지만 이 강좌에서는 Block의 구조가 유효한지에 대해서만 검사한다

```javascript
import * as CryptoJS from 'crypto-js'; 

class Block {
    static calculateBlockHash = (
        index: number, 
        previousHash: string, 
        data: string, 
        timestamp: number
    ): string => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

    static validateStructure = (aBlock: Block): boolean =>
        typeof aBlock.index === "number" &&
        typeof aBlock.hash === "string" &&
        typeof aBlock.previousHash === "string" &&
        typeof aBlock.data ==="string" &&
        typeof aBlock.timestamp === "number";

    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;

    constructor(index: number, hash: string, previousHash: string, data: string, timestamp: number) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}

const genesisBlock: Block = new Block(0, "2020202020", "", "hello", 123456);

let blockchain: Block[] = [genesisBlock];

const getBlockchain = () : Block[] => blockchain;

const getLatestBlock = () : Block => blockchain[blockchain.length - 1];

const getNewTimesStamp = () : number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string) : Block => {
    const previousBlock: Block = getLatestBlock();
    const newIndex: number = previousBlock.index + 1;
    const nextTimestamp: number = getNewTimesStamp();
    const nextHash: string = Block.calculateBlockHash(newIndex, previousBlock.hash, data, nextTimestamp);
    const newBlock: Block = new Block(newIndex, nextHash, previousBlock.hash, data, nextTimestamp);
    return newBlock;
}

const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
    if (!Block.validateStructure(candidateBlock)) {
        return false;
    } else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    } else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    }
}

export {};
```

근데 아직 완성된 것이 아니다! validation할 때에 실제 해시값을 계산해서 검사해야 한다.

---

```javascript
import * as CryptoJS from 'crypto-js'; 

class Block {
    static calculateBlockHash = (
        index: number, 
        previousHash: string, 
        data: string, 
        timestamp: number
    ): string => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

    static validateStructure = (aBlock: Block): boolean => 
        typeof aBlock.index === "number" && 
        typeof aBlock.hash === "string" && 
        typeof aBlock.previousHash === "string" && 
        typeof aBlock.data ==="string" && 
        typeof aBlock.timestamp === "number";

    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;
    
    constructor(index: number, hash: string, previousHash: string, data: string, timestamp: number) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}

const genesisBlock: Block = new Block(0, "2020202020", "", "hello", 123456);

let blockchain: Block[] = [genesisBlock];

const getBlockchain = () : Block[] => blockchain;

const getLatestBlock = () : Block => blockchain[blockchain.length - 1];

const getNewTimesStamp = () : number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string) : Block => {
    const previousBlock: Block = getLatestBlock();
    const newIndex: number = previousBlock.index + 1;
    const nextTimestamp: number = getNewTimesStamp();
    const nextHash: string = Block.calculateBlockHash(newIndex, previousBlock.hash, data, nextTimestamp);
    const newBlock: Block = new Block(newIndex, nextHash, previousBlock.hash, data, nextTimestamp);
    return newBlock;
}

const getHashforBlock = (aBlock: Block) : string => Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.data, aBlock.timestamp);

const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
    if (!Block.validateStructure(candidateBlock)) {
        return false;
    } else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    } else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    } else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    } else {
        return true;
    }
}

const addBlock = (candidateBlock: Block) : void => {
    if(isBlockValid(candidateBlock, getLatestBlock())) {
        blockchain.push(candidateBlock);
    }
}

export {};
```

완성! 하지만 아직 새로 생성된 블록을 blockchain에 추가하는 부분이 빠져있다

새로 생성된 블록을 addBlock을 사용하여서 blockchain에 등록해보자. createNewBlock 함수를 아래처럼 수정하면 된다

```javascript
const createNewBlock = (data: string) : Block => {
    const previousBlock: Block = getLatestBlock();
    const newIndex: number = previousBlock.index + 1;
    const nextTimestamp: number = getNewTimeStamp();
    const nextHash: string = Block.calculateBlockHash(newIndex, previousBlock.hash, data, nextTimestamp);
    const newBlock: Block = new Block(newIndex, nextHash, previousBlock.hash, data, nextTimestamp);
    addBlock(newBlock);
    return newBlock;
}
```

이제 실제로 createNewBlock을 호출해보고 blockchain을 출력해보자.

호출 X 3

```javascript
createNewBlock("second block");
createNewBlock("thrid block");
createNewBlock("fourth block");
console.log(blockchain);
```

콘솔 창에 이렇게는 찍힌다. 블록 3개가 추가된 것을 확인할 수 있다. hash 값을 비교해보면 정상적으로 hash 계산이 수행되었다는 것도 알 수 있다.

```console
[
    {
        index: 0,
        hash: '2020202020',
        previousHash: '',
        data: 'hello',
        timestamp: 123456
    },
    {
        index: 1,
        hash:
            '9a2d7fbb2f3e016198489be442d1f9da5b09918d2c90ee58279ea2848ae759bf',
        previousHash: '2020202020',
        data: 'second block',
        timestamp: 1569300581
    },
    {
        index: 2,
        hash:
            'f90706bf59d0ae76c31314ef79653ef6502634966a93144a7dd0e1901c53153b',
        previousHash:
            '9a2d7fbb2f3e016198489be442d1f9da5b09918d2c90ee58279ea2848ae759bf',
        data: 'thrid block',
        timestamp: 1569300581
    },
    {
        index: 3,
        hash:
            '82c3343686313fb5ed1bba893329201b11d0fd94acddb7ef9071582deeb65e7a',
        previousHash:
            'f90706bf59d0ae76c31314ef79653ef6502634966a93144a7dd0e1901c53153b',
        data: 'fourth block',
        timestamp: 1569300581
    }
]
```

끄읏 -

이제 무슨 강좌를 들어볼까나
