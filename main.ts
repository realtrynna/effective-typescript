interface NumList {
    a: number;
    b: number;
    c: number;
}

const numberList: NumList = {
    a: 1,
    b: 2,
    c: 3,
}

for (const number of Object.keys(numberList)) {
    console.log(numberList[number]);
}