// 1. Дан большой текст, в котором для оформления прямой речи используются одинарные кавычки. Придумать
// шаблон, который заменяет одинарные кавычки на двойные.
// 2. Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная кавычка не заменялась на двойную.

let text = `He said, 'I don't have much free time.'
'I want to buy car,' she said
They said, 'We can't come to the party on Friday.'`

const regexp = /\B\'|\'\B/g

console.log(text.replace(regexp, '"'))