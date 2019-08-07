---
layout: post
title: 스프링부트에서 AWS S3에 파일 업로드하기
tags: [Spring, AWS]
---

리액트 네이티브 프로젝트에서 S3 이미지 업로드 기능을 추가했다. 처음에 나는 javascript SDK를 사용하여서 브라우저에서 바로 전송하려고 했는데, 전송될 이미지가 신분증 사진같은 민감한 개인 정보이기 때문에 클라이언트 사이드가 아닌 서버 사이드에서 이미지를 전송해주는 방식으로 변경하기로 했다.

## Java용 AWS SDK 사용하기

공식문서는 [Java용 AWS SDK 개발자 안내서](https://docs.aws.amazon.com/ko_kr/sdk-for-java/v1/developer-guide/welcome.html)에서 확인할 수 있다.

### Postman 설정하기

API 테스트로는 Postman을 사용하였다. React Native에서 앨범에 있는 파일을 선택하여 FormData(Multipart)파일로 넘겨주기 때문에 Postman에서도 동일한 형식의 formData 파일을 넘겨주도록 해야한다. 엔드포인트 url를 입력해준 후에 Body부분을 아래처럼 설정해주면 된다. 나는 키값을 "file"로 설정해놓았기 때문에, 뒤에서 실제로 파일을 받아올 때 "file"이라는 값을 사용하는 것을 볼 수 있을 것이다.

![걸스인텍메인](/assets/img/S3Upload/postman-formdata.png)

### 스프링 부트 설정하기

현재 Maven을 사용중이기에 pom.xml에 아래의 디펜던시들을 추가해주었다.

> SpringBoot 프로젝트에서는 SpringCloud가 복잡한 AWS 환경 설정을 자동화해준다. LOVE

```xml
<!-- aws dependency - 시작 -->
    <dependency>
      <groupId>org.springframework.cloud</groupId>
      <artifactId>spring-cloud-aws-context</artifactId>
      <version>2.1.2.RELEASE</version>
    </dependency>

    <dependency>
      <groupId>org.springframework.cloud</groupId>
      <artifactId>spring-cloud-aws-autoconfigure</artifactId>
      <version>2.1.2.RELEASE</version>
    </dependency>

    <dependency>
      <groupId>com.amazonaws</groupId>
      <artifactId>aws-java-sdk-s3</artifactId>
      <version>1.11.415</version>
    </dependency>
<!-- aws dependency - 끝 -->
```

#### application-local.yml

디펜던시를 추가해준 후에는 yml 설정 파일에 로컬 테스트에서 사용할 정보를 추가해주어야 한다. local 환경에서의 aws 설정을 위해 aws credentials 정보를 추가해주어야 한다.

```yml
cloud:
  aws:
    s3:
      bucket: 버킷 이름
    region:
      static: ap-northeast-2
    stack:
      auto: false
    credentials:
      instanceProfile: true
```

#### application-aws.yml

aws 정보는 git에 올라가지 않고 테스트시에만 사용된다. aws credentials 정보는 S3FullAccess 정책을 가지고 있는 역할이나 사용자의 정보면 된다. **배포된 서버의 설정 정보는 SpringCloud에서 자동으로 찾아준다.** 중요한 정보가 담긴 파일이므로 .gitignore 파일에 추가해주자.

```yml
cloud:
  aws:
    credentials:
      accessKey: A*************
      secretKey: a***************************
```

#### .gitignore

```git
application-aws.yml
```

#### IntelliJ 실행 환경 설정

또한 aws 설정 파일 정보를 사용하기 위해 intellij의 local 실행 환경에 aws profile을 추가해주어야 한다.

![IntelliJ 실행 환경 설정](/assets/img/S3Upload/intellij-profiles.png)

### Multipart 파일을 받을 Controller 생성

Multipart 타입을 파라미터로 받는 컨트롤러를 생성해주자. 업로드 후에는 업로드 된 url을 사용해서 DB에 넣어주어야 하므로 HashMap에 url값을 넣어서 반환해주었다.

```java

private final S3Uploader s3Uploader;

@Override
@ResponseBody
@PostMapping(value = "/image")
public HashMap<String, Object> uploadImage(MultipartFile file) throws IOException {
    HashMap<String, Object> result = new LinkedHashMap<>();
    result.put("uploadedUrl",  s3Uploader.upload(file, "idVerificationExample"));
    return result;
}
```

## 삽질

로컬에서는 업로드가 되는데 EC2 환경에 배포된 이후에는 진짜 아무리해도 업로드가 안되었었다. aws 권한문제인줄 알고 EB에 키체인을 추가하여서 EC2 ssh에 접속해서 권한을 건드려보기도 했다. 계속 삽질하며 체크했던 것들은

1. CircleCI AWS 계정의 S3 권한 확인 -> 결론 : EC2 환경에서의 S3 업로드 권한과는 아무 상관 없음
2. EC2의 IAM Role에 "AmazonFullAccess" Policy가 선택되었는지 확인 -> 100번정도 확인 함
3. 해당 EC2의 ssh에 접속하여서
```aws configure list```로 계정 타입이 iam-role인것을 확인 -> ssh를 접속하기 위해서 프로덕션 서버를 건드려야 했다.. 사용자가 없었는데도 손떨리는 작업이었음

ssh까지 전부 확인하고 난 후에야(이것 저것 해보고 며칠이 흐른 후에야) 권한 문제가 아닐 수도 있다는 생각이 들었고 코드의 실행라인 한줄 한줄 로그를 전부 찍어보았다. INFO 단계로 로그를 찍어서 배포하였고 이유를 찾았다.. 이유는 Multipart 파일을 변환하는 과정에서 FileOutputStream 메서드가 동작하지 않아서였다. 로컬에서는 되는데 왜 EC2 환경에서 안되었을까 ㅠㅠ

## 참고

https://medium.com/@hozacho/%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80%EC%97%90%EC%84%9C-%EB%B0%94%EB%A1%9C-aws-s3%EC%97%90-%ED%8C%8C%EC%9D%BC-%EC%97%85%EB%A1%9C%EB%93%9C%ED%95%98%EA%B8%B0-637dde104bcc

https://jojoldu.tistory.com/300
