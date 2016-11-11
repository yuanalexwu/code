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
var addTwoNumbers = function (l1, l2, overflow) {
	overflow = overflow ? overflow : 0;
	if (l1 === null && l2 === null && overflow === 0) {
		return null;
	}

	var value = (l1 ? l1.val: 0) + (l2 ? l2.val : 0) + overflow;
	var node = new ListNode(value % 10);
	node.next = addTwoNumbers(l1 ? l1.next : null, l2 ? l2.next : null, value / 10 === 1 ? 1 : 0);
	return node;
};



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





