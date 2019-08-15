---
layout: post
title: Luniverse 개발 환경 셋팅하기
tags: [Luniverse, Blockchain]
---

루니버스(Luniverse)는 업비트를 운영하는 두나무㈜의 블록체인 연구소인 람다256이 만든 블록체인 플랫폼이다. 이 글을 시작으로 **루니버스를 사용해서 DApp 개발하기** 시리즈를 연재할 계획이다. 먼저 개발 환경 셋팅 방법을 알아보자.

## 루니버스의 공식 문서 살펴보기

[루니버스에 대하여(About Luniverse)](https://guide.luniverse.io/docs/about-luniverse)

루니버스 홈페이지에서 회원가입을 하고 나면 해당 아이디로 루니버스 콘솔에 접근할 수 있다. 루니버스에서는 한 달 간 사용할 수 있는 Free Trial 권한을 제공해 주는데, 실제 사용료는 정말 비싼 편이다. Free Trial에서 체험해 볼 수 있는 루니버스 블록체인 서비스 개발 기능으로는 Side Token, DApp 추가 등이 있다. 공식 문서의 데모 앱 체험하기([https://guide.luniverse.io/docs/demo-dapp-체험하기-1](https://guide.luniverse.io/docs/demo-dapp-%EC%B2%B4%ED%97%98%ED%95%98%EA%B8%B0-1))를 따라하면서 데모 앱을 구동시켜볼 수 있다.

## 개발 환경 구성

개발 환경 구성은 아래와 같다. 각각에 대한 설명은 아래에서 이어진다.

![env](/assets/img/1-39a8c9dd-4169-4f91-a57c-b31248f0a98a.png)

## 스마트 컨트랙트 개발 환경 (루니버스와 연동까지)

스마트 컨트랙트 배포를 위한 Solidity 개발은 어디서 해야 할까?

일반적으로 Solidity 개발 환경은 아래와 같이 구축된다.

1. 로컬 PC에 truffle + ganache를 설치하여섯 컴파일부터 테스트, 배포 환경을 직접 구축한다.
2. 웹 브라우저 기반의 통합 개발 환경 도구인 Remix IDE를 사용하는 방법도 있다. Remix IDE는 자체적으로 컴파일러 solc와 ganache를 포함하고 있다.

> Truffle을 이용한 DApp 개발환경 구성([https://medium.com/@weekly.teckle/truffle을-이용한-dapp-개발환경-구성-14a98dc49db2](https://medium.com/@weekly.teckle/truffle%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-dapp-%EA%B0%9C%EB%B0%9C%ED%99%98%EA%B2%BD-%EA%B5%AC%EC%84%B1-14a98dc49db2)) → 이 링크에 Truffle부터 Atom, Atom에서 사용할 수 있는 solidity package 설치까지 상세하게 안내되어 있다. 여기서는 위의 과정이 모두 수행 되었다고 생각하고 Atom IDE의 루니버스 package를 사용하는 방법만 소개할것이다.

## 루니버스 네트워크에 스마트 컨트랙트 배포하기

루니버스 공식 문서에서 소개해주는 스마트 컨트랙트 배포 방법은 아래와 같다. (truffle을 사용해서 배포하는 방법은 찾지 못했다)

1. 루니버스 콘솔에서 스마트 컨트랙트 배포하기 ([https://guide.luniverse.io/docs/user-contract-gui로-배포하기](https://guide.luniverse.io/docs/user-contract-gui%EB%A1%9C-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0))
2. Atom IDE로 스마트 컨트랙트 배포하기 ([https://guide.luniverse.io/docs/solidity-ide로-개발-환경-세팅하기](https://guide.luniverse.io/docs/solidity-ide%EB%A1%9C-%EA%B0%9C%EB%B0%9C-%ED%99%98%EA%B2%BD-%EC%84%B8%ED%8C%85%ED%95%98%EA%B8%B0))
3. Remix IDE로 스마트 컨트랙트 개발하기 ([https://guide.luniverse.io/docs/solidity-ide로-smart-contract-개발하여-배포하기](https://guide.luniverse.io/docs/solidity-ide%EB%A1%9C-smart-contract-%EA%B0%9C%EB%B0%9C%ED%95%98%EC%97%AC-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0))

처음엔 3번 방법인 Remix IDE를 사용해 보려고 했는데 루니버스에서 제공해주는 플러그인이 Remix IDE 현재 버전에서는 적용이 되지 않았다. 또한 소스 관리를 위해 github를 사용하려고 찾아보니 Remix에서 github 기능을 제공해 주기는 하나 사용성이 떨어진다는 느낌을 많이 받았다. 그래서 결국 2번 방법인 Atom IDE를 사용하기로 하였다.

[Atom IDE로 스마트 컨트랙트 배포하기](https://guide.luniverse.io/docs/solidity-ide로-개발-환경-세팅하기)

위의 사이트를 참고할 수 있다.

먼저 Atom IDE에 들어가서 루니버스 관련 package를 설치해주자. '**luniver-atom-plugin**'을 설치해주면 된다.

![plugin](/assets/img/2019-08-13__3-3ab80528-2a60-40e8-9878-07933caeca47.33.34.png)

![plugin-settings](/assets/img/2019-08-13__3-d6b7cbf1-eb8b-4467-b0e4-fd9bda5a16ea.35.49.png)

플러그인을 사용하기 위해 Setting 메뉴에 있는 **Lunivers Access Token**을 입력해주어야 한다.

루니버스 콘솔에서는 Access Token 발급받는 메뉴를 찾을 수 없다. 아래의 링크로 직접 들어가야 한다. 아래 링크에 들어가서 루니버스 아이디 비밀번호로 로그인하면 Access Token을 발급해준다.

[https://console.luniverse.io/auth/3rd-party/signin](https://console.luniverse.io/auth/3rd-party/signin)

![accesskey-login](/assets/img/2019-08-13__3-68dff79f-c16b-40b3-9605-5637b19d10df.39.46.png)

발급받은 Access Token을 입력해주면 나면 Atom IDE에서 루니버스 연동 셋팅 끝!

### 이제 Atom에서 개발한 컨트랙트를 나의 루니버스 블록체인 네트워크 ContractList에 곧바로 올릴 수 있다! (최종 배포는 루니버스 콘솔에서 해야 함)

![atom-solidity](/assets/img/2019-08-13__3-c139e613-db2e-431d-aa3b-03db7c3e7bc5.55.49.png)

배포하고자 하는 solidity 파일에 가서 오른쪽 버튼을 클릭하면 Compile Contract Code 메뉴를 찾을 수 있다.

![atom-menu](/assets/img/2019-08-13__3-e9c5d07d-de32-48b8-8c9b-10e1bf466e02.56.24.png)

정보를 입력하고 Apply를 누르면 배포가 진행된다.

![atom-inputs](/assets/img/2019-08-13__3-d80f8ec3-c3d3-4616-ab32-eb0cbf259adc.57.13.png)

잠시 후에 루니버스 콘솔에서 위에서 선택한 체인의 ContractList를 들어가면 아래처럼 컨트랙트가 추가된 것을 볼 수 있다. 아래 컨트랙트는 아직 배포가 준비된 상태이고, 직접 배포 버튼을 눌러야 네트워크에 배포가 완료된다.

![console](/assets/img/2019-08-13__3-5bff681f-50f4-413b-a653-11bf6393680a.59.08.png)

> [루니버스 한국 사용자 그룹 wiki(Github 저장소)](https://github.com/luniversekr/wiki)에도 업로드 된 글입니다. 루니버스 한국 사용자 그룹 wiki에서는 이 외에도 각종 루니버스에 대한 정보를 아카이브하고 있습니다.
