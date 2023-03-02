<img src="http://image.yes24.com/goods/102124327/XL" width="300">

# Effective Typescript

| Date     | Content                                                         | Description  |
|----------|-----------------------------------------------------------------|--------------|
| 23.03.02 | [Item1](#Item1-자바스크립트와-타입스크립트-관계) <br/> [Item2](#Item2-설정-이해하기) | 기본 개념, 설정 파일 |

## 1장 알아보기
타입스크립트는 사용 방식에서 독특하다. Interpreter(Python, Ruby)나 저수준 언어로 Compile(C, Java)되지 않는다.  
또 다른 고수준 언어인 자바스크립트로 Compile되며 실행 역시 타입스크립트가 아닌 자바스크립트로 이루어진다.  
자바스크립트와 타입스크립트의 관계는 필연적이며 이러한 밀접한 관계로 가끔 혼란스러운 상황이 벌어지기도 한다.  

### Item1 자바스크립트와 타입스크립트 관계
타입스크립트는 자바스크립트의 Superset이며 문법적으로도 상위 집합이다. 자바스크립트 프로그램에 문법 오류가 없다면 유효한 타입스크립트 프로그램이라고 할 수 있다. <br>
자바스크립트 프로그램의 이슈가 존재한다면 문법 오류가 아니더라도 Type Checker에 지적당할 가능성이 높다. 하지만 문법의 유효성과 동작의 이슈는 독립적인 문제다. <br>

모든 자바스크립트 프로그램이 타입스크립트라는 명제는 참이지만 반대는 성립하지 않는다. 타입스크립트 프로그램이지만 자바스크립트가 아닌 프로그램이 존재한다. <br>
이유는 타입스크립트가 Type을 명시하는 추가적인 문법을 가지는 부분이 있어서다.    

- 다음은 유효한 타입스크립트 코드이다. 
해당 코드를 구동(Node)　해보면 SyntaxError가 출력되며 ": string"은 타입스크립트 문법이므로 Type 구문을 사용하는 순간 자바스크립트는 타입스크립트 영역 안으로 들어가게 된다.
```typescript
function greet(who: stirng) {
    console.log("Hello" + who);
}
```

<br>

- 다음은 자바스크립트 코드이며 컴파일 단계가 아닌 직접 실행하는 런타임 단계에서 에러가 식별된다.
```typescript
let city = "Seoul"

city.toUppercase() // TypeError: city.toUppercase is not a function
```

<br>

- 반대로 타입스크립트는 Type Checker를 통해 컴파일 단계에서 에러를 식별하여 코드가 실행되지 않더라도 에러가 식별이 가능하다.  
타입스크립트는 정적 타입 시스템이라고도 불리며 Type System에 목표 중 하나는 런타임에 에러를 발생시킬 코드를 사전에 식별하는 부분이다.   
```typescript
let city = "Seoul"

city.toUppercase() 
// toUppercase 속성이 string 형식에 없습니다
// toUpperCase를 사용하시겠습니까
```

<br>

하지만 Type Checker가 모든 에러를 찾아내기는 쉽지　않다. 에러가 발생하지는 않지만 다음과 같이 의도와 다르게 자바스크립트 동작하는 코드가 있다.
user라는 객체　안에 "introduce"라는 속성이 없으므로 undefined가 출력된다. 
```javascript
const userList = [
    { name: "사용자 1", age: 29 },
    { name: "사용자 2", age: 30 },
]

for (const user of userList) {
    console.log(user.introduce) // undefined
}
```

반대로 타입스크립트는 다음과 같이 Type Checker를 통해 에러를 식별함과 동시에 훌륭한 해결책을 제시한다.  
```typescript
const userList = [
    { name: "사용자 1", age: 29 },
    { name: "사용자 2", age: 30 },
]

for (const user of userList) {
    console.log(user.introduce)
    // ~~~ introduce 속성이 ... 형식에 없습니다.
}
```

<br>

Type Checker는 원인을 추측할 수 있는 에러　정도는 식별하지만 항상 정확하지는 않다. 되도록이면 다음과 같은 타입 구문을 사용한다. (휴먼 에러　방지)
```typescript
interface IUserList {
    name: string;
    age: number;
}

const userList: IUserList[] = [
    { name: "사용자 1", age: 29 },
    { name: "사용자 2", age: 30 },
]
```

<br>

타입스크립트 Type System은 자바스크립트 런타임 동작을 모델링　한다.  
다음 코드는 다른 언어였다면 런타임 단계에서 에러가 발생하는 코드지만 타입스크립트 Type Checker는 정상으로 인식한다.
```typescript
const one = "2" + 3; // string
const two =  2 + 3; // string
```

<br>

반대로 정상 동작하는 코드에 에러를 표시하기도 한다. 다음과 같이 런타임 단계에서 에러가 발생하지 않지만 Type Checker는 문제점을 표시한다.  
```typescript
const a = null + 7 // ~~~ + 연산자를 ... 형식에 적용할 수 없습니다
const b = [] + 12 // ~~~ + 연산자를 ... 형식에 적용할 수 없습니다
```

<br>

자바스크립트의 런타임 동작을 모델링　하는 건 타입스크립트 Type System에 기본 원칙이다.  
단순히 동작을 모델링　하는 부분뿐만 아니라 위와 같이 사용자가 의도치 않은 이상한 코드가 에러로 이어질 수 점까지 고려해야　한다  
  
<br>

다음과 같이 타입 체크를 통과하더라도 런타임 단계에서 에러가 발생할 수 있다.  
배열이 범위 내에서 사용될　거라 가정했지만 실제로 존재하지 않는 배열의 원소에 접근해 에러가 발생했다.
```typescript
const arr = ["Seoul", "NewYork"];

console.log(arr[2].toUpperCase()) // TypeError: Cannot Property ~~~
```

<br>

에러가 발생하는 근본 원인은 타입스크립트가 이해하는 값의 타입과 실제 값에 차이가 있어 그렇다.  
타입 시스템이 정적 타입의 정확성을 보장해　줄 거 같지만 그렇지 않다.

#### 요약

    타입스크립트는 자바스크립트 상위 집합 즉 자바스크립트 프로그램은 타입스크립트 프로그램이다.  
    반대로 타입스크립트는 별도의 문법을 가지고 있으므로 일반적으로 유효한 자바스크립트 프로그램이 아니다.

    타입스크립트는 자바스크립트의 동작을 모델링　하는 타입 시스템을 가지고 있어 런타임 에러를 발생시키는 코드를 식별하려고 한다.  
    그러나 모든 에러를 찾아내리라 기대하면 안　된다. Type Checker를 통과해도 런타임 에러를 발생시키는 코드는 충분히 존재할 수 있다.

    타입 시스템은 전반적으로 자바스크립트 동작을 모델링　하지만 올바르지 않은 매개변수 개수로 함수를 호출하는 경우처럼 자바스크립트에서는 허용되지만  
    타입스크립트에서 문제가 되는 경우도 있어 이러한 문법의 엄격함은 취양 차이이며 우열을 가릴 수 없는 문제이다.

<br>

### Item2 설정 이해하기
현재 시점에서 타입스크립트 설정은 100개에 이르며 설정들은 커맨드 라인 또는 tsconfig.json 설정 파일을 통해 가능하다.  
동료들이나 다른 도구들이 알 수 있게 가급적 설정 파일을 이용하는 게 좋다.
```cmd
tsc --noImplicitAny main.ts
```

<br> 

```cmd
tsc --init
```
```json
{
  "compilerOptions": {
    "noImplicitAny": true
  }
}
```

<br>

설정 파일은 어디서 소스 파일을 찾을지 어떤 종류의 출력을 생성할지 제어하는 내용이 대부분이지만 언어 자체의 핵심 요소들을 제어하는 설정도 있다.  
대부분의 언어에서는 허용하지 않는 고수준 설계의 설정이다. 이를 어떻게 설정하는지에 따라 완전히 다른 언어처럼 느껴질 수 있다.  
  
설정들을 제대로 이해하려면 noImplicitAny와 strictNullChecks를 이해해야　한다.
noImplicitAny는 변수들이 미리 정의된 타입을 가져야 하는지를 제어하며 다음은 noImplicitAny가 false일 경우 유효한 코드다.  
```typescript
function add(a, b) {
    return a + b;
}
// 타입스크립트가 추론한 함수 타입 function add(a: any, b: any): any 
```

<br>

any 타입을 사용하면 Type Checker는 무력해진다. any를 타입에 넣지 않았지만 any 타입으로 간주되므로 이를 암시적 any 타입으로 부른다.  
이를 방지하기 위해 noImplicitAny를 설정한다면 다음 코드는 에러가 발생한다.
```typescript
function add(a, b) {
    return a + b;
}
```
> noImplicitAny 해제는 자바스크립트의 코드를 타입스크립트로 마이그레이션 할 경우 사용

<br>

strictNullChecks는 null과 undefined가 모든 타입에서 허용되는지 확인하는 설정이며 다음 코드는 strictNullChecks가 해제되었을 경우 유효한 코드다.
```typescript
const one: number = null // 정상 null은 유효한 값
```

<br>

strictNullChecks 설정했을 경우 다음 코드는 에러가 발생한다.
```typescript
const one: number = null; // null 형식은 "number" 형식에 할당할 수 없습니다
```
> strictNullChecks를 설정하려면 noImplicitAny를 먼저 설정해야 한다.  
> 프로젝트 규모가 커질수록 설정의 변경은 어려우므로 가급적 초반에 설정하는 게 좋다.

<br>

언어에 의미적으로 미치는 설정들(noImplicitThis, strictFunctionTypes)이 많지만 noImplicitAny와 strictNullChecks　만큼 중요한 건 없다.  
strict 설정을 한다면 대부분의 에러를 잡을 수 있다. 프로젝트 진행 시 동료에게 타입스크립트 예제를 공유했는데 재현되지 않는다면 설정 파일을 가장 먼저 확인해야 한다.  

#### 요약
    타입스크립트 컴파일러는 언어의 핵심 요소에 영향을 미치는 몇 가지 설정을 포함한다.
    
    타입스크립트 설정은 커맨드 라인을 이용하기보다 설정 파일을 사용하는 게 좋다. 

    자바스크립트 프로젝트를 타입스크립트로 전화하는 게 아니라면 noImplicitAny를 설정하는　게 좋다

    "undefined"는 객체가 아닙니다라는 런타임 에러를 방지하기 위해 strictNullChecks를 설정하는 게 좋다

    타입스크립트에서 엄격한 체크를 하고 싶다면 strict 설정을 고려해야 한다











































