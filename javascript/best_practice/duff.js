// speed up ur loop

var INIT_NUM = 10000000 // how many number of init array
var CHUNK_NUM = 8 // the chunk number

var values = Array.from(Array(INIT_NUM), function (_, i) {return i})
/* test start */
var startTime = new Date()
var length = values.length
var iterations = Math.floor(length / CHUNK_NUM)
var leftover = iterations % CHUNK_NUM
var i = 0 // index for iterations

// some processer
function process (data) {
  data = data + ''
}

/* duff */
if (leftover > 0) {
  do {
    process(values[i++])
  } while (i < leftover)
}
if (iterations > 0) {
  do {
    process(values[i++])
  } while (i < length)
}
var endTime = new Date()
console.log(endTime.getTime() - startTime.getTime() + 'ms')

console.log('')

var startTime = new Date()
/* for-loop */
var length = values.length
for (var i = 0; i < length; i++) {
  process(values[i])
}
var endTime = new Date()
console.log(endTime.getTime() - startTime.getTime() + 'ms')

/* result */
/*
INIT_NUM        duff        for-loop
10000000        934ms         1059ms
1000000         93ms          94ms
100000          12ms          11ms
10000           3ms           0ms
 */
