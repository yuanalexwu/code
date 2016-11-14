/**
 * Created by jack on 2016/11/13.
 *
 * https://leetcode.com/problems/longest-substring-without-repeating-characters/
 * Given a string, find the length of the longest substring without repeating characters.
 * Examples:
 * Given "abcabcbb", the answer is "abc", which the length is 3.
 * Given "bbbbb", the answer is "b", with the length of 1.
 * Given "pwwkew", the answer is "wke", with the length of 3.
 * Note that the answer must be a substring, "pwke" is a subsequence and not a substring.
 */


/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
	// loop the characters
	var list = s.split('');
	var length = list.length;
	if (length === 0) {
		return 0;
	}
	// eg. 'abc'
	var max_list = []; // hold the max length list for each loop. [3, 2, 1]
	var substring_list = []; // hold substring for each loop. [[abc], [bc], [c]]
	var max_index; // hold max length index of max_list. 0
	var ignore_idx_list = []; // hold the ignored substring_list index. It means duplicated character occurs
	for (var i = 0; i < length; i++) {
		var current = list[ i ];
		for (var j = 0; j <= i; j++) {
			if (substring_list.length - 1 < j) {
				// init substring_list for the current loop
				substring_list.push([]);
				// init max_list for the current loop
				max_list.push(0);
			}
			
			if (in_array(j, ignore_idx_list)) {
				continue;
			}
			
			if (in_array(current, substring_list[ j ])) {
				ignore_idx_list.push(j);
			} else {
				// push into substring list
				substring_list[ j ].push(current);
				// add the max_list number
				max_list[ j ] += 1;
				// get the max length
				var max_length = max_index === undefined ? 0 : max_list[ max_index ];
				if (max_list[ j ] > max_length) {
					max_index = j;
				}
			}
		}
	}

	return max_list[ max_index ];
};


function in_array(needle, match_array) {
	var match;
	for (var idx in match_array) {
		match = match_array[idx];
		if (match === needle) {
			return true;
		}
	}
	return false;
}


// expect 10
console.log(lengthOfLongestSubstring("gblzwvqnfzqitttaoxjkbaxcyarfxynfzygxvwkaxdjtyetobeyeewheyamxz"));
