---
layout: post
title: Spring Framework
tags: [DoYouKnowAbout...]
---

#### 스프링 프레임 워크 왜 쓰지?

- 빠른 개발
- 쉬운 관리
- 개발자들의 역량 획일화
- 검증된 아키텍처의 재사용과 일관성 유지

라고 합니다

#### 스프링을 공부하기 전에 어느정도 그려둬야 할 개념

- POJO (Plain Old Java Object)
- Not POJO? Servlet 클래스

#### 스프링 컨테이너

스프링 프레임워크에서는 스프링 컨테이너라고 불리는 스프링 런타임 엔진을 제공합니다. 스프링 컨테이너는 객체를 생성에서 소멸까지의 라이프 사이클을 관리함

#### Springn Bean 등록

"너가 만든 객체들 중에 내가 관리해야 할 녀석들을 알려줘, java, xml, annotation 등 상관 없어 너가 편한 방식으로 나에게 메타정보를 작성해서 알려줘"

#### IoC 컨테이너

Inverse Of Control. (=제어의 역전)
스프링은 일반적인 프로그램의 흐름과는 다르게 객체가 언제 생성되고 사용되는지도 알 수 없을 뿐더러 객체의 제어위 권한 또한 개발자가 아닌 다른 곳 즉, 스프링 컨테이너에 있음. 스프링 컨테이너 내부에서 빈의 제어를 담당하는 객체를 빈 팩토리(Bean Factory)라 부름. 일반적으론 빈 팩토리의 기능을 모두 포함하고 있는 Application Context를 사용함

#### AOP

Aspect Oriented Programming. (=관점 지향 프로그래밍)
핵심사항(실제 메소드)와 공통사항들이 존재한다. 주 업무가 아닌 보조업무(로그, 트랜잭션, 보안처리)를 코드상에서 분리하는 것. 즉, 코드를 나누는 기준을 한 과정이 아닌 한 관점을 기준으로 나누어 놓는 것. 공통사항을 핵심사항과 엮는 작업을 위빙한다라고 함

"반복적으로 적용되는 횡단 관심사(Aspect)도 내가 다 적용시켜줄게. 너는 어떤 로직(advice)을 어떤 녀석(point cut)에게 붙여주면 되는지 나에게 메타정보만 작성해서 알려줘"

#### DI

Dependency Injection. (=의존성 주입)
스프링 IoC 기능의 대표적인 동작 원리. 컨테이너에 의해 객체를 사용할 수 있도록 생성 후 메서드(생성자,setter)를 통해 주입해주는것과 같다고 해서 이를 의존성 주입이라고 함.

"객체(Bean)들간의 의존성은 생성할 때 내가 다 의존성을 넣어주고 관리하도록 할게! 너는 나에게 그 메타정보만 작성해서 알려줘"

### !!!!!!

#### web.xml

```
  <servlet>
    <servlet-name>action</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <init-param>
      <param-name>contextConfigLocation</param-name>
      <param-value>/WEB-INF/config/spring/dispatcher-servlet.xml</param-value>
    </init-param>
    <load-on-startup>1</load-on-startup>
  </servlet>
  <servlet-mapping>
    <servlet-name>action</servlet-name>
    <url-pattern>/</url-pattern>
  </servlet-mapping>
```

#### dispatcher-servlet.xml

```

  <mvc:annotation-driven/>

  <mvc:resources location="/resources/" mapping="/resources/**"/>

  <context:component-scan base-package="com.devunlimit.project">
    <context:include-filter type="annotation"
      expression="org.springframework.stereotype.Controller"/>
    <context:exclude-filter type="annotation" expression="org.springframework.stereotype.Service"/>
    <context:exclude-filter type="annotation"
      expression="org.springframework.stereotype.Repository"/>
  </context:component-scan>

  <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
    <property name="prefix" value="/WEB-INF/jsp/"/>
    <property name="suffix" value=".jsp"/>
  </bean>

  <bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
    <!-- max upload size in bytes -->
    <property name="maxUploadSize" value="15728640" /> <!-- 15MB -->
    <!-- max size of file in memory (in bytes) -->
    <property name="maxInMemorySize" value="15728640" /> <!-- 15MB -->
  </bean>

  <mvc:interceptors>
    <mvc:interceptor>
      <mvc:mapping path="/**/*"/>
      <mvc:exclude-mapping path="/resources/**"/> <!-- js,css 파일 제외 -->
      <mvc:exclude-mapping path="/signup.do"/> <!-- 회원가입창 -->
      <mvc:exclude-mapping path="/loginform.do"/> <!-- 로그인화면 -->
      <mvc:exclude-mapping path="/login.do"/> <!-- 로그인 처리 주소 -->
      <mvc:exclude-mapping path="/checkId.do"/> <!-- 중복아이디 -->
      <mvc:exclude-mapping path="/logout.do"/> <!-- 로그아웃 처리 주소 -->
      <bean class="com.devunlimit.project.util.interceptor.LoginInterCeptor"/>
    </mvc:interceptor>
  </mvc:interceptors>

```



> 참조 <br />
> <https://blog.naver.com/phk707kr/220946859726> <br />
> <https://blog.naver.com/hipab84/220985891908> <br />
> <http://feco.tistory.com/111>
