---
layout: post
title: codeplus - 프로그래밍 대회에서 사용하는 Java
tags: [Algorithm]
---

프로그래밍 대회에서 많이 사용하는 Java 문법들을 정리해보자

### java에서 입/출력을 하는 방법 <br>

#### Scanner
자바에서의 콘솔 입력은 골칫거리로 인식되어왔다. 그도 그럴만한 것이 숫자 하나를 입력받기 위해서는 다음과 같이 조금 부담스러운 형태의 코드 조합이 필요했기 때문이다
```
BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
String str = br.readline();
int num = Integer.parseInt(str);
```
위의 코드를 이해하기 위해서는 다음 사항들에 대해 알고이써야 한다
- 자바 I/O
- Wrapper 클래스
- String 처리
- 예외처리(Exception Handling) <br>

그러나 자바는 버전 5.0을 발표하면서 이 부분에 대한 대안을 내놓았다!!
```
Scanner kb = new Scanner(System.in);
int num = kb.nextInt();
```
Scanner을 구성하는 주요 메서드들은 다음과 같다 <br>
- public boolean nextBoolean()
- public byte nextByte()
- public short nextShort()
- public int nextInt()
- public int nextLong()
- public int nextFloat()
- public float nextFloat()
- public String nextLine()
- public double nextDouble()

BufferedReader

#### StringTokenizer

문자열 토큰 구분 클래스이다
이 클래스의 중심이되는 생성자는 다음과 같다

```public Stringg Tockenizer(String str, String delim)```

바로 예제 코드로 살펴보자

```
import java.util.StringTokenizer;

class TockenizeString {
	public static void main(Stirng[] args) {
		String strData = "11:22:33:44:55";
		StringTokenizer st = new.StringTokenizer(strData, ":");

		while(st.hasMoreTokens())
			System.out.println(st.nextToken());
	}
}
```

StringBuilder

### Collections

ArrayList
LinkedList
Stack
Set
Map
Queue
PriorityQueue

### java에서 정렬하는 방법

Comparator
Comparable

### 큰 수를 다루는

BigInteger
BigDecimal




> 참조 <br />
> 나는 정말 JAVA를 공부한 적이 없다구요
