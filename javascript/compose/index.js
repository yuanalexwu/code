/**
 * Copyright (c) 2018. Suzhou DHMS Information Technology Co.,Ltd.
 * Author: Wuyuan Created:2018/7/15
 */
const add1 = value => value + 1
const multiply = value => value * 2
const subtract2 = value => value - 2

// 1.
const compose = (fn, ...rest) => rest.length === 0 ? fn : (...args) => fn(compose(...rest)(...args))
const composedFunc1 = compose(subtract2, multiply, add1)
console.log('result: ', composedFunc1(10))

// 2.
const compose2 = (...funcs) => {
    return funcs.reduce((f, g) => {
        return (...args) => f(g(...args))
    })
}
const composedFunc2 = compose2(subtract2, multiply, add1)
console.log('result2: ', composedFunc2(10))
