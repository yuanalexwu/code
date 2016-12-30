// chunk process
function chunk (array, process, context) {
  setTimeout(function () {
    const item = array.shift()
    process.call(context, item)
    if (array.length > 0) {
        setTimeout(arguments.callee, 200);
    }
  }, 200)
}
function process(item) {
    console.log(item);
}
const arr = [1, 2, 3, 4, 5];
chunk(arr, process);