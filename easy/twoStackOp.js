/**
 * Created by jack on 2016/11/10.
 * Calculate
 * Example:
 * Given (string) "((1 + ( 2 * 3)) + (5 / 2))",
 * assume each value is only one digit
 * return (int)9.5.
 */


/**
 * @param expression
 */
function calculate(expression) {
	// parse each digit into an array
	var list = expression.split('');

	var ops = [];
	var vals = [];
	var digit;
	for(var i = 0; i < list.length; i++) {
		digit = list[ i ];
		digit = digit.replace(/(^\s+)|(\s+$)/, '');
		
		if (digit == '(' || digit == '') {
			// do nothing
		} else if (digit == "+" || digit == "-" || digit == '*' || digit == '/') {
			ops.push(digit);
		} else if (digit == ')') {
			var v = vals.pop();
			var op = ops.pop();
			if (op == '+') {
				v = vals.pop() + v;
			} else if (op == '-') {
				v = vals.pop() - v;
			} else if (op == '*') {
				v = vals.pop() * v;
			} else if (op == '/') {
				v = vals.pop() / v;
			}
			vals.push(v);
		} else {
			digit = parseFloat(digit);
			vals.push(digit);
		}
	}

	return vals[0];
}


// input ((1 + ( 2 * 10)) + (10 / 2))
// output 9.5 
const input = "((1 + ( 2 * 3)) + (5 / 2))";
const output = calculate(input);
console.log(input);
console.log(output);


