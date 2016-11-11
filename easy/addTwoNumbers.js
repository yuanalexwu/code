/**
 * Created by jack on 2016/11/11.
 * link: https://leetcode.com/problems/add-two-numbers/
 * You are given two linked lists representing two non-negative numbers.
 * The digits are stored in reverse order and each of their nodes contain a single digit.
 * Add the two numbers and return it as a linked list.
 * Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
 * Output: 7 -> 0 -> 8
 */


/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */


function ListNode(val) {
	this.val = val;
	this.next = null;
}


/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
	var loop = true;
	var out_node; // return result
	var prev_node; // keep the preview node;
	var prev_sum_digit; // keep the digit result of current  looping

	while (loop) {
		var val1 = NaN;
		var val2 = NaN;
		if (l1) {
			val1 = parseInt(l1.val);
			l1 = l1.next;
		}
		if (l2) {
			val2 = parseInt(l2.val);
			l2 = l2.next;
		}
		if (isNaN(val1) && isNaN(val2)) {
			if (prev_sum_digit.carry_digit !== 0) {
				if (prev_node) {
					prev_node.next = new ListNode(prev_sum_digit.carry_digit);
				}
			}
			loop = false;
			continue;
		}

		// raw sum result
		var sum;
		if (isNaN(val1)) {
			sum = val2;
			if (prev_sum_digit) {
				sum += prev_sum_digit.carry_digit
			}
		} else if (isNaN(val2)) {
			sum = val1;
			if (prev_sum_digit) {
				sum += prev_sum_digit.carry_digit
			}
		} else {
			sum = val1 + val2;
			if (prev_sum_digit) {
				sum += prev_sum_digit.carry_digit
			}
		}
		sum = sum + '';

		// parsed sum result
		var sumDigit = parseDigit(sum);


		// create a new node for the current loop
		var current_node = new ListNode(sumDigit.current_digit);

		// point the prev's next to current node
		if (prev_node) {
			prev_node.next = current_node;
		}

		// save the preview node for the further use
		prev_node = current_node;
		// save the preview digit result for the further use
		prev_sum_digit = sumDigit;

		// save the first node for output
		if (out_node === undefined) {
			out_node = current_node;
		}
	}

	return out_node;
};


function parseDigit(sum) {
	var current_digit;
	var carry_digit = 0;
	var digit_list = sum.split('');
	if (digit_list.length == 1) {
		current_digit = parseInt(digit_list[ 0 ]);
		carry_digit = 0;
	} else {
		current_digit = parseInt(digit_list[ 1 ]);
		carry_digit = parseInt(digit_list[ 0 ]);
	}

	return {
		current_digit: current_digit,
		carry_digit: carry_digit
	};
}


// test
function createNodeList(list) {
	var out;
	var prev_node;
	for (var i = 0; i < list.length; i++) {
		var current_node = new ListNode(list[ i ]);
		if (prev_node) {
			prev_node.next = current_node;
		}
		// save prev
		prev_node = current_node;
		if (out === undefined) {
			out = current_node;
		}
	}

	return out;
}

function loopNodeList(node) {
	while (node) {
		console.log(node.val);
		node = node.next;
	}
}

/*
 * Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
 * Output: 7 -> 0 -> 8
 * */
var l1 = createNodeList([ 1 ]);
loopNodeList(l1);
console.log('-------------------');

var l2 = createNodeList([ 9, 9 ]);
loopNodeList(l2);
console.log('-------------------');

var l_result = addTwoNumbers(l1, l2);
loopNodeList(l_result);





