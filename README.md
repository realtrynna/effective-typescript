<img src="http://image.yes24.com/goods/102124327/XL" width="300">

# Effective Typescript

| Date     | Content                                                         | Description  |
|----------|-----------------------------------------------------------------|--------------|
| 23.03.02 | [Item1](#Item1-자바스크립트와-타입스크립트-관계) <br/> [Item2](#Item2-설정-이해하기) | 기본 개념, 설정 파일 |
| 23.03.04|[Item3](#Item3-코드-생성과-타입이-관계없음을-이해하기)|런타임, 컴파일 |

## 1장 알아보기
타입스크립트는 사용 방식에서 독특하다. **_Interpreter_**(Python, Ruby)나 저수준 언어로 **_Compile_**(C, Java)되지 않는다.  
또 다른 고수준 언어인 자바스크립트로 Compile되며 실행 역시 타입스크립트가 아닌 자바스크립트로 이루어진다.  
자바스크립트와 타입스크립트의 관계는 필연적이며 이러한 **_밀접한 관계_** 로 가끔 혼란스러운 상황이 벌어지기도 한다.  

### Item1 자바스크립트와 타입스크립트 관계
타입스크립트는 자바스크립트의 **_Superset_** 이며 문법적으로도 상위 집합이다. 자바스크립트 프로그램에 문법 오류가 없다면 **~~유효한 타입스크립트~~** 프로그램이라고 할 수 있다. <br>
자바스크립트 프로그램의 이슈가 존재한다면 문법 오류가 아니더라도 `Type Checker` 에 지적당할 가능성이 높다. 하지만 문법의 유효성과 동작의 이슈는 **_독립적인_** 문제다. <br>

모든 자바스크립트 프로그램이 타입스크립트라는 명제는 참이지만 반대는 성립하지 않는다. <br> 
타입스크립트 프로그램이지만 자바스크립트가 아닌 프로그램이 존재한다. <br>
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

- 반대로 타입스크립트는 Type Checker를 통해 컴파일 단계에서 에러를 식별하여 코드가 실행되지 않더라도 에러 식별이 가능하다.  
타입스크립트는 정적 타입 시스템이라고도 불리며 Type System에 목표 중 하나는 **_런타임에 에러_** 를 발생시킬 코드를 사전에 식별하는 부분이다.   
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

Type Checker는 원인을 추측할 수 있는 에러 정도는 식별하지만 항상 정확하지는 않다. 되도록이면 다음과 같은 `타입 구문` 을 사용한다. (휴먼 에러 방지)
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

타입스크립트 Type System은 자바스크립트 런타임 동작을 `모델링` 한다.  
다음 코드는 다른 언어였다면 런타임 단계에서 에러가 발생하는 코드지만 타입스크립트 Type Checker는 정상으로 인식한다.
```typescript
const one = "2" + 3; // string
const two =  2 + 3; // string
```

<br>

반대로 정상 동작하는 코드에 에러를 표시하기도 한다. <br> 
다음과 같이 런타임 단계에서 에러가 발생하지 않지만 Type Checker는 문제점을 표시한다.  
```typescript
const a = null + 7 // ~~~ + 연산자를 ... 형식에 적용할 수 없습니다
const b = [] + 12 // ~~~ + 연산자를 ... 형식에 적용할 수 없습니다
```

<br>

자바스크립트의 런타임 동작을 모델링　하는 건 타입스크립트 **_Type System에 기본 원칙_** 이다.  
단순히 동작을 모델링　하는 부분뿐만 아니라 위와 같이 사용자가 의도치 않은 이상한 코드가 에러로 이어질 수 있는 점까지 고려해야 한다 <br>
  
<br>

다음과 같이 타입 체크를 통과하더라도 런타임 단계에서 에러가 발생할 수 있다.  
배열이 범위 내에서 사용될 거라 가정했지만 실제로 존재하지 않는 배열의 원소에 접근해 에러가 발생했다.
```typescript
const arr = ["Seoul", "NewYork"];

console.log(arr[2].toUpperCase()) // TypeError: Cannot Property ~~~
```

<br>

에러가 발생하는 근본 원인은 타입스크립트가 **_이해하는 값의 타입_** 과 **_실제 값_** 에 차이가 있어 그렇다.  
타입 시스템이 정적 타입의 정확성을 보장해 줄 거 같지만 그렇지 않다.

#### 요약

    타입스크립트는 자바스크립트 상위 집합 즉 자바스크립트 프로그램은 타입스크립트 프로그램이다.  
    반대로 타입스크립트는 별도의 문법을 가지고 있으므로 일반적으로 유효한 자바스크립트 프로그램이 아니다.

    타입스크립트는 자바스크립트의 동작을 모델링　하는 타입 시스템을 가지고 있어 런타임 에러를 발생시키는 코드를 식별하려고 한다.  
    그러나 모든 에러를 찾아내리라 기대하면 안　된다. Type Checker를 통과해도 런타임 에러를 발생시키는 코드는 충분히 존재할 수 있다.

    타입 시스템은 전반적으로 자바스크립트 동작을 모델링　하지만 올바르지 않은 매개변수 개수로 함수를 호출하는 경우처럼 자바스크립트에서는 허용되지만  
    타입스크립트에서 문제가 되는 경우도 있어 이러한 문법의 엄격함은 취양 차이이며 우열을 가릴 수 없는 문제이다.

<br>

### Item2 설정 이해하기
현재 시점에서 타입스크립트 설정은 100개에 이르며 설정들은 커맨드 라인 또는 `tsconfig.json` 설정 파일을 통해 가능하다.  
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
  
설정들을 제대로 이해하려면 `noImplicitAny` 와 `strictNullChecks` 를 이해해야 한다.
`noImplicitAny` 는 변수들이 미리 정의된 타입을 가져야 하는지를 제어하며 다음은 noImplicitAny가 false일 경우 유효한 코드다.  
```typescript
function add(a, b) {
    return a + b;
}
// 타입스크립트가 추론한 함수 타입 function add(a: any, b: any): any 
```

<br>

any 타입을 사용하면 Type Checker는 **_무력해진다._** <br> 
any를 타입에 넣지 않았지만 any 타입으로 간주되므로 이를 암시적 any 타입으로 부른다.  
이를 방지하기 위해 noImplicitAny를 설정한다면 다음 코드는 에러가 발생한다.
```typescript
function add(a, b) {
    return a + b;
}
```
> noImplicitAny 해제는 자바스크립트의 코드를 타입스크립트로 마이그레이션 할 경우 사용

<br>

`strictNullChecks` 는 null과 undefined가 모든 타입에서 허용되는지 확인하는 설정이며 다음 코드는 strictNullChecks가 해제되었을 경우 유효한 코드다.
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

언어에 의미적으로 미치는 설정들(noImplicitThis, strictFunctionTypes)이 많지만 noImplicitAny와 strictNullChecks 만큼 중요한 건 없다.  
`strict` 설정을 한다면 대부분의 에러를 잡을 수 있다. <br>
프로젝트 진행 시 동료에게 타입스크립트 예제를 공유했는데 재현되지 않는다면 설정 파일을 가장 먼저 확인해야 한다.  

#### 요약
    타입스크립트 컴파일러는 언어의 핵심 요소에 영향을 미치는 몇 가지 설정을 포함한다.
    
    타입스크립트 설정은 커맨드 라인을 이용하기보다 설정 파일을 사용하는 게 좋다. 

    자바스크립트 프로젝트를 타입스크립트로 전화하는 게 아니라면 noImplicitAny를 설정하는　게 좋다

    "undefined"는 객체가 아닙니다라는 런타임 에러를 방지하기 위해 strictNullChecks를 설정하는 게 좋다

    타입스크립트에서 엄격한 체크를 하고 싶다면 strict 설정을 고려해야 한다

<br>

### Item3 코드 생성과 타입이 관계없음을 이해하기
타입스크립트 컴파일러는 2가지의 역할을 수행한다. <br>
2가지의 역할을 완전히 **_독립적_** 이다. 타입스크립트가 자바스크립트로 변환될 시점에 코드 내의 타입에는 영향을 주지 않는다. <br>
또한 자바스크립트 실행 시점에도 타입은 영향을 미치지않는다. 

<br>

1. 최신 타입스크립트/자바스크립트를 **_브라우저에서 동작_** 할 수 있도록 구 버전의 자바스크립트로 `Transpile` 한다.

> Transpile 이란 번역(Translate)과 컴파일(Compile)의 합성어로 소스코드를 동일한 동작을 하는 다른 형태의 소스코드(다른 버전 또는 언어)로 변환하는 행위를 의미한다. <br>
> 결과물이 여전히 컴파일되어야 하는 소스코드이므로 컴파일과는 구분해서 부른다.

2. 코드의 `타입 오류` 를 체크한다. 

<br>

컴파일은 타입 체크와 **_독립적으로 동작_** 하므로 타입에 오류가 있어도 컴파일이 정상적으로 실행된다. <br>
(C나 Java는 컴파일과 타입 체크가 동시에 이루어진다) <br>

타입스크립트의 오류는 C나 Java 같은 언어들의 경고(Warning)와 동일하다. 문제가 될만한 부분을 알려주지만 빌드가 **_중단되진_** 않는다. <br>

- 컴파일과 타입 체크 <br>
    코드에 오류가 있을 경우 컴파일에 문제가 있다는 말은 기술적으로 틀린 말이다. <br>
    작성한 타입스크립트가 유효한 자바스크립트라면 타입스크립트 컴파일러는 컴파일을 해낸다. 코드 오류가 있을 경우 타입 체크에 문제가 있다는 표현이 올바른 표현이다. <br>

<br>

타입 오류가 있음에도 불구하고 컴파일되어 타입스크립트가 부실한 언어처럼 보일 수도 있다. 코드에 오류가 있더라도 컴파일된 산출물이 나오는 게 실제로 도움이 된다. <br>
Application을 만들면서 문제가 발생한 경우 타입스크립트는 여전히 컴파일된 산출물을 생성하므로 문제가 된 오류를 수정하지 않더라도 Application의 다른 부분을 테스트할 수 있다. <br>
만약 오류가 있을 시 컴파일하지 않으려면 `noEmitOnError` 를 설정하거나 빌드 도구에 동일하게 적용하면 된다. 

<br>

다음 코드와 같이 타입스크립트는 런타임 단계에서 타입 체크를 할 수 없다. <br>
instanceof 체크는 런타임에 일어나지만 Rectangle은 타입이므로 런타임 시점에 아무런 역할을 수행할 수 없다. <br>
```typescript
interface Square {
    width: number
} 

interface Rectangle extends Square {
    height: number
}

type Shape = Square | Rectangle

function area(shape: Shape) {
    if (shape instanceof Rectangle) {
        return shape.width * shape.height; // Rectangle은 형식만 참조하지만 여기서는 값으로 사용되고 있습니다.
    } else {
        return shape.width * shape.width;
    }
}
```

<br>

타입스크립트는 제거 가능(`Erasable`) 하다. 실제로 자바스크립트로 컴파일되는 과정에서 모든 Interface, Type, 타입 구문은 그냥 제거된다. <br>
타입 정보를 유지하는 또 다른 방법으로는 런타임에 접근 가능한 타입 정보를 명시적으로 저장하는 태그 기법이 있다. <br>
다음 코드에서 User 타입은 **_태그 된 유니온_**(Tagged Union)의 한 예이다. 이 기법은 런타임에 타입 정보를 손쉽게 유지할 수 있으므로 타입스크립트에서 흔하게 사용된다. <br>
```typescript
interface Meta {
    kind: "meta"
    age: number;
    gender: boolean;
}

interface Post {
    kind: "post"
    title: string;
    content: string;
}

type User = Meta | Post;

function add(user: User) {
    if (user.kind === "post") {
        return user.title;
    } else {
        return user.gender;
    }
}
```

<br>

타입을 `class` 로 만들면 **_타입_**(런타임 접근 불가)과 **_값_**(런타임 접근 가능)을 둘 다 사용할 수 있다. <br>
인터페이스는 타입으로만 사용 가능하지만 class로 선언하면 타입과 값 모두 사용할 수 있어 에러가 없다. <br>
type User = Meta | Post 부분에서 Post는 타입으로 참조되지만 user instanceof Post 부분에서는 값으로 참조된다.
```typescript
class Meta {
    age: number;
    gender: boolean;
}

class Post extends Meta {
    title: string;
    content: string;

    constructor() {
        super();

    }
}

type User = Meta | Post;

function add(user: User) {
    if (user instanceof Post) {
        return user.title
    } else {
        return user.age;
    }
}
```

<br>

- 런타임 타입은 선언된 타입과 다를 수 있다. <br>
타입스크립트는 일반적으로 죽은 코드를 찾아내지만 다음 코드는 strict 설정을 하더라도 찾아낼 수 없다. <br>
": boolean"은 타입스크립트의 타입이므로 런타임에서 제거된다. 자바스크립트였다면 실수로 "ON"으로 호출할 수도 있다. <br>  
```typescript
function lightSwitch(value: boolean) {
    switch (value) {
        case true:
            on();
            break;
        case false:
            off();
            break;
        default:
            console.log("Execute");
    }
}
```

<br>

- 타입스크립트 타입으로는 함수를 오버로드 할 수 없다. <br>
C++ 같은 언어는 동일한 이름에 매개 변수만 다른 여러 버전의 함수를 허용한다. 이를 함수 오버 로딩이라고 한다. <br>
그러나 타입스크립트는 타입과 런타임의 동작이 무관하므로 함수 오버 로딩은 불가능하다. 
 
<br>

- 타입스크립트 타입은 런타임 성능에 영향을 주지 않는다. <br>
타입과 타입 연산자는 자바스크립트 변환 시점에 제거되므로 런타임 성능에 **_아무런 영향을 주지 않는다._** <br>
타입스크립트의 **_정적 타입_** 은 실제로 비용이 전혀 들지 않는다. <br>

1. 런타임 오버헤드가 없는 대신 타입스크립트 컴파일러는 `빌드 타임 오버헤드` 가 존재한다. 컴파일은 일반적으로 매우 빠른 편이며 **_증분 빌드_** 시 더욱 체감된다. <br>
오버헤드가 커질 경우 트랜스 파일만 설정하여 타입 체크 과정을 생략할 수 있다. <br>

<br>

2. 컴파일하는 코드는 오래된 런타임 환경을 지원하기 위해 호환성을 높이고 성능 오버헤드를 감안할지 호환성을 포기하고 성능 중심의 네이티브 구현체를 선택할지 선택해야 할 수 있다. <br>

<br>

#### 요약
    코드 생성은 타입 시스템과 무관하다. 타입스크립트 타입은 런타임 동작이나 성능에 영향을 전혀 주지 않는다. 

    타입 오류가 존재하더라도 코드 생성(컴파일)은 가능하다. 

    타입스크립트 타입은 런타임에 사용할 수 없다. 런타임에 타입을 지정하려면 타입 정보 유지를 위한 별도의 방법이 필요하다.
    일반적으로 태그 된 유니온 속성 체크 방법을 사용하거나 클래스같이 타입스크립트 타입과 런타임 값 둘 다 제공하는 방법이 있다.













