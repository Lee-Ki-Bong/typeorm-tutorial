# 랜덤 데이터 생성 함수

이 문서는 다양한 랜덤 데이터 생성 함수에 대한 정보를 제공합니다.

## 랜덤힌 사람이름 생성

랜덤한 사람이름을 생성하려면 `fullName()` 함수를 사용하세요.

```javascript
const fullName = BongFaker.fullName(); // 세 글자로 구성된 랜덤한 성명을 반환합니다
```

## 랜덤힌 상품명 생성

흥미로운 상품명을 생성하려면 product() 함수를 사용하세요.

```javascript
const interestingProductName = BongFaker.product(); // 랜덤한 흥미로운 상품명을 반환합니다
```

가능한 출력: "좌절한 로봇청소기", "마법같은 화장실선반", "킹받는 TV"

## 랜덤힌 형용사 생성

긍정적이거나 부정적인 형용사를 생성하려면 adjective() 함수를 사용하세요.

```javascript
const positiveAdjective = BongFaker.adjective(); // 랜덤한 부정적이거나 긍정적인 형용사를 반환합니다
const negativeAdjective = BongFaker.adjective('negative'); // 랜덤한 부정적인 형용사를 반환합니다
const negativeAdjective = BongFaker.adjective('positive'); // 랜덤한 긍정적인 형용사를 반환합니다
```

## 숫자 생성

랜덤한 숫자를 생성하려면 number() 함수를 사용하세요.

```javascript
const randomNumber = BongFaker.number(자리수:number); // 1자리 부터 지정된 자릿수의 랜덤한 숫자를 반환합니다
```

```javascript
const randomNumberInRange = BongFaker.number(최소자리수:number, 최대자리수:number); // 지정된 범위 내의 랜덤한 숫자를 반환합니다
```

## 깔끔한 숫자 생성

상품 가격과 같은 숫자들은 경우에 따라 8237가 아닌 8000과 같은 숫자형태가 필요할 것입니다.
깔끔한 가격을 생성하려면 clearPrice() 함수를 사용하세요. number() 함수와 비슷하게 동작합니다.

```javascript
const cleanPrice = BongFaker.clearPrice(자리수:number); // 1자리 부터 지정된 자릿수의 랜덤한 숫자를 반환합니다
```

```javascript
const randomNumberInRange = BongFaker.number(최소자리수:number, 최대자리수:number); // 지정된 범위 내의 랜덤한 숫자를 반환합니다
```

예제 출력: 1000, 3000, 50000

## 영어 아이디 생성

영어 아이디를 생성하려면 englishId() 함수를 사용하세요.

```javascript
const englishIdentifier = BongFaker.englishId(뒤에붙일숫자 자리수:number); // 뒤에 지정한 자릿수의 랜덤한 영어 아이디를 반환합니다
```

예제 출력: "barret953"

## 이메일 주소 생성

이메일 주소를 생성하려면 email() 함수를 사용하세요. 매개변수를 지정하지 않으면 랜덤한 이메일을 생성합니다.

```javascript
const randomEmail = BongFaker.email(영어아이디:string); // 지정한 영어 아이디와 함께 이메일 주소를 생성합니다
```

```javascript
const randomEmail = BongFaker.email(); // 매개변수를 지정하지 않으면 랜덤한 이메일을 생성합니다.
```
