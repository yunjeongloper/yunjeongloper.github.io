---
layout: post
title: github blog (jekyll) 커스텀 하기 1 - Liquid?
tags: [jekyll]
---

블로그를 처음 만들고 간단한 이미지나 메뉴 구성은 수정하긴 했지만 좀 더 내 입맛에 맞게 블로그를 커스텀해보려고 한다. jekyll blog는 커스텀이 가능한 범위가 굉장히 넓다. 아마 전부 다 공부하는데에는 시간이 꽤 필요하겠지만 큰 구조를 먼저 이해한다면 그렇게 복잡하지 않다는 생각이 들 것이다.

지킬의 기본 구조는 아래 한글 버전의 jekyll document에서 읽어볼 수 있다.
> <https://jekyllrb-ko.github.io/docs/structure/>

### Liquid ?

Liquid는 Ruby로 작성된 오픈 소스 템플릿언어이다. Liquid 코드는 객체(Object), 태그(Tag), 필터(Filter)로 분류할 수 있다. 예를 들기 위해 현재 블로그의 _layouts/default.html 소스를 가져왔다.(제일 간단한게 생김)

{% highlight html lineno%}
{% raw %}
<html class="no-js">
  {% include head.html %}
  <body>
    {% include header.html %}
    <div class="content">
      {{ content }}
    </div>
    {% include footer.html %}
  </body>
</html>
{% endraw %}
{% endhighlight %}

저기 보면 JSP Scriptlet Tag처럼 생긴 저게 바로 Liquid 문법이다!!!

#### 객체

객체는 Ouput이다. 객체의 내용을 출력하고 싶은 곳에 사용한다. 개체 및 변수의 이름을 아래와 같이 ``` {% raw %} {{ {% endraw %} ``` 와 ``` {% raw %} }} {% endraw %}  ``` 로 감싸서 사용한다.

{% highlight html lineno%}
{% raw %}
{{ content }}
{% endraw %}
{% endhighlight %}

#### 태그

태그는 템플릿에 대한 로직과 제어흐름을 생성한다. 아래와 같이 ``` {% raw %} {% {% endraw %} ``` 와 ```{% raw %} %} {% endraw %}``` 로 감싸서 사용한다. 태그는 객체처럼 무언가를 출력할 때 사용하는게 아니다. 변수를 할당하거나 조건문이나 반복문을 제어하기 위해서 사용하는 것이다. 즉, 태그는 출력되지 않음! 블로그의 소스보다 아래의 예제가 더 이해하기 쉬울 것 같다.

{% highlight html lineno %}
{% raw %}
{% if user %}
  Hello {{ user.name }}!
{% endif %}
{% endraw %}
{% endhighlight %}

#### 필터

필터는 객체의 내용을 변환하여 출력할 때 사용한다. 필터는 객체의 출력 내에서 사용되며 객체와는 ```|``` 로 구분되어진다.

{% highlight html lineno %}
{% raw %}
{% if user %}
  {{ "/my/fancy/url" | append: ".html" }}
{% endif %}
{% endraw %}
{% endhighlight %}

위의 코드는 아래와 같이 필터링되어 출력된다.

{% highlight html lineno %}
/my/fancy/url.html
{% endhighlight %}

<br>

이렇게 Liquid의 큰 기능인 객체, 태그, 필터에 대해 간단히 알아보았다. 세부적인 기능들은 직접 블로그를 손보면서 배워보도록 하자.

<br>

<span style="font-size:0.9em; color: dimgray;">
와우 근데 하다가 알아낸건데 지금까지 코드블럭 기능을 완전히 잘못쓰고있었다!!!
지금까지 코드 블럭을 입력할 때 앞 뒤를 {% raw %} ``` {% endraw %} 으로 감싸고 사용했다. 하지만 마크다운 코드 블럭의 후진 가독성은 항상 날 화나게했었다. 검색해보니 엄청나게 쉽게 해결할 수 있었다. <b>jekyll에서 코드 블럭을 보기 좋게 바꾸려면</b> <br><br>
{% raw %} {% highlight language lineno %} 어쩌구 저쩌구 {% endhighlight %} {% endraw %} <br><br>
태그를 이용하면 된다!!! 흑백으로 이루어져있던 코드가 칼라풀하게 변경되었다. 근데 라인 넘버는 안된다 ㅎㅎ 뭔가 추가로 설정을 해줘야하는 것 같은데, 일단 쓰려던 글부터 쓰고 나중에 해야겠다. highlight 태그는 대략 60가지의 언어를 제공하고 있다. <b>jekyll에 내장된 코드블럭에 대해 자세히 알고 싶다면 [Rough](http://rouge.jneen.net/) 에 들어가 보도록 하자.</b> 마크다운을 그저 워드처럼 생각했던 나.. 바보... <br><br>
이렇게 아무것도 아닌 글을 쓰는데도 벌써 두 시간이 흘렀다. 쓰고자 하는 내용을 다 못쓴 채 마무리를 지어야 할 것 같다 ^^ (뭐지??) 충만한 지식을 전달하는 양질의 글들은 대체 어떻게 쓰여지는 걸까? 나도 열심히 노력해야겠다. 만약 누군가가 내 블로그를 와서 이런 것들을 본다고 생각하니 조금 미안하다. 저도 잘 몰라요 TT 그치만 함께 알아갑시다 TT 아참 그리고 jekyll build error message는 너무너무 친절한 것 같다. 회사에서도 이런 친절한 디버깅 메세지를 볼 수 있다면 참 좋을텐데
</span>
