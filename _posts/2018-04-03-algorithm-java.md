---
layout: post
title: codeplus - 프로그래밍 대회에서 사용하는 Java
tags: [Algorithm]
---

프로그래밍 대회에서 많이 사용하는 Java 문법들을 정리해보자

### java에서 입/출력을 하는 방법

- Scanner
- BufferedReader
- StringTokenizer
- StringBuilder

### Collections

- ArrayList
- LinkedList
- Stack
- Set
- Map
- Queue
- PriorityQueue

### java에서 정렬하는 방법

- Comparator
- Comparable

### 큰 수를 다루는

- BigInteger
- BigDecimal




------


### JAVA

```
class NoOvertime {
	public int noOvertime(int no, int[] works) {
		int result = 0;
    int i,j;
    int max = 0;
    int num = 0;

    for(i=0; i<no; i++){
    	for(j=0; j<works.length; j++){
      	if(max <= works[j]){
        	max = works[j];
         	num = j;
        }
      }
      works[num] = works[num]-1;
      max = works[num];
    }

    for(i=0;i<works.length;i++){
      System.out.println(works[i]);
    	result = result + works[i] * works[i];
    }

		return resu lt;
	}
	public static void main(String[] args) {
		NoOvertime c = new NoOvertime();
		int []test = {4,3,3};
		System.out.println(c.noOvertime(4,test));
	}
}
```

> 참조 <br />
> <https://code.plus/course/3>
