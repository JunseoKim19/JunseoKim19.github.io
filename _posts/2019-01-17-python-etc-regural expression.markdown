---
layout: post
title: 정규식 표현에 대하여 알아보기
date: 2019-01-17 18:43:00
img: python/etc/re/re.jpg
categories: [python-etc] 
tags: [python, 정규식, regular expression, re] # add tag
---

정규 표현식에 대하여 알아보도록 하겠습니다. 정규 표현식을 이용하면 상당히 유연하게 문자열 매칭을 할 수 있습니다.

## 파이썬에서 정규식 표현 사용

먼저 `import re`를 통하여 정규식을 사용할 수 있게 import 해줍니다.

```python
re.findall(정규식 문법, 대상 문장)
```

<br>

위 코드를 이용하여 대상 문장에서 `정규식 문법`에 해당하는 문자들을 찾을 수 있습니다.

+ 정규식 문법 변수 : regex 
+ 대상 문장 : search_target

```python
import re

regex = r"정규식 문법"
search_target = "Hello, I am gaussian37. My e-mail is gaussian1137@gmail. My phone number is 010-1234-1234"

result = re.findall(regex, search_target)
print(" ".join(result))
```

<br><br>

## 정규식 표현 규칙

<br>

### 대표 문자

+ `\d`는 숫자를 대표하는 정규표현식입니다. 이때 d는 digit을 뜻합니다. <br>
    ```python
    regex = r"\d"
    >> 3 7 1 1 3 7 0 1 0 1 2 3 4 1 2 3 4
   ``` 
   <br>
   
+ `\w`는 글자를 대표하는 정규표현식입니다.
    + a, b, c, 가, 나, 다, 1, 2와 같은 문자와 숫자를 포함합니다.
    + 특수문자는 포함하지 않지만 _(언더스코어)는 포함합니다. <br>
    ```python
    regex = r"\w"
    >> H e l l o I a m g a u s s i a n 3 7 M y e m a i l i s ...
    ```
    <br> 

<br><br>

### 횟수 정하기
    
+ `+`는 하나 혹은 그 이상 **연결된** 이라는 뜻입니다.
    +  `\d+`는 숫자 하나 혹은 그 이상 연결된 뜻입니다. <br>
    ```python
    regex = r"\d+"
    >> 37 1137 010 1234 1234  
    ```
    <br>
    
+ `*`는 0개 이상이라는 뜻입니다.
+ \[1-9\]는 1 ~ 9 사이라는 뜻입니다.
    + `[1-9]\d*` 이라고 하면 첫 숫자는 0이 아닌 1 ~ 9 의 숫자로 시작하고 그 다음에는 1개 이상의 숫자가 나오게 됩니다. <br>
    ```python
     regex = r"[1-9]\d*"
    >> 37 1137 10 1234 1234
    ```
    <br>
    
    + 여기서 010이 아니라 10으로 처리된 것을 보면 이해할 수 있습니다.
+ `-`는 포함할 수도 있고 안 포함할 수도 있는 문자 앞에 사용할 수 있습니다.
    + 전화번호는 `010-1234-1234`처럼 표현할 수도 있고 `01012341234`로 표현할 수도 있습니다. <br>
    ```python
    regex = r"\d+-?\d+-?\d+"
    >> 1137 010-1234-1234
    ```
    <br>
    
+ 만약 있거나 없는 조건을 여러개 주고 싶으면 `[ ]?`을 이용하여 리스트를 만들어 주면 됩니다.
+ `[- ]?` 라고 하면 `-` 또는 ` `(공백문자)가 있거나 또는 없거나 입니다.
    + 전화번호를 `01012341234` 또는 `010-1234-1234` 또는 `010 1234 1234`로 주고 싶다면 다음과 같습니다. <br>
    ```python
    regex = r"\d+[- ]?\d+[- ]?\d+"
    >> 1137 010-1234-1234  
    ```
    <br>

+ {숫자}는 `숫자`번 반복한다는 뜻입니다.
    + \d{2}는 숫자가 연속 두 번 나온다는 뜻입니다. <br>
    ```python
    regex = r"\d{3}[- ]?\d{4}[- ]?\d{4}"
    >> 010-1234-1234
    ```
   <br>
   
+ {숫자1, 숫자2}는 숫자1부터 숫자2까지 반복한다는 뜻입니다. 예를 들어, \w{2,3}는 문자가 2 ~ 3번 나온다는 뜻입니다.
+ search_target을 아래와 같이 수정해 보았습니다.

    ```python
    search_target = "Hello, I am gaussian37. My e-mail is gaussian1137@gmail. My phone number is 010-1234-1234 and 02 123 1234."
    ```   

    <br>
    
    + 전화 번호가 `010-1234-1234`과 `02 123 1234` 라는 2가지 패턴이 있으므로 2가지 패턴을 아우루는 정규식 표현을 작성해 보겠습니다.
    
    ```python
    regex = r"\d{2,3}[- ]?\d{3,4}[- ]?\d{4}"
    >> 010-1234-1234 02 123 1234
    ```

<br><br>       
 
### 범위에서 고르기

+ 알파벳 중에 `모음`만 입력하고 싶을 땐 어떻게 하면 좋을까요?
    + `[aeiou]`로 정규식을 작성하시면 모음만 검출하게 됩니다.
+ `소문자 알파벳`만 검색하고 싶으면 어떻게 하면 될까요?
    + `[abcdefghijklmnopqrlstuvwxyz]` 와 같이 모두 나열해도 되지만
    + `[a-z]` 와 같이 사용하여도 됩니다.
+ `연속된 소문자 알파벳`을 찾고 싶으면 어떻게 하면 될까요? 앞에서 배운 것을 응용해 봅시다.
    + `[a-z]+` 라고 사용하면 됩니다.
+ `한글`을 찾고 싶으면 한글의 시작과 끝을 입력하면 됩니다.
    + `[가-힣]+` 라고 사용하면 됩니다.
    + 단, 이렇게 검색할 시에는 ㄱ,ㄴ,ㄷ 또는 ㅏ,ㅑ,ㅓ,ㅕ 같은 낱글자는 찾을 수 없습니다.
   
<br><br>

### 기타 사항

+ 숫자(\d)나 글자(\w)이외에도 다양한 대표 문자가 있습니다.
+ 주의할 점은 여집합에 해당하는 것이 소문자와 대문자의 관계로 이루어져 있습니다.
    + \s 공백 문자(스페이스, 탭, 뉴라인)
    + \S 공백 문자를 제외한 문자
    + \D 숫자를 제외한 문자
    + \W 글자 대표 문자를 제외한 글자들(특수문자, 공백 등)
    

참고 자료 : https://programmers.co.kr/learn/courses/11

<br><br>

<iframe src="//partners.coupang.com/cdn/redirect?url=customjs%2Faffiliate%2Fsearch-bar%2F0.0.3%2Flogo-01.html%3FtrackingCode%3DAF1042200" width="100%" height="85" frameborder="0" scrolling="no"></iframe>    


