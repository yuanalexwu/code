/**
 * Created by jack on 2016/11/9.
 * Given an array of integers, return indices of the two numbers such that they add up to a specific target.
 * You may assume that each input would have exactly one solution.
 * Example:
 * Given nums = [2, 7, 11, 15], target = 9,
 * Because nums[0] + nums[1] = 2 + 7 = 9,
 * return [0, 1].
 */


/**
 * @param nums
 * @param target
 */
function twoSum(nums, target) {
	for (var i = 0; i < nums.length;i++) {
		for(var j = i+1; j < nums.length; j++) {
			if (nums[i] + nums[j] == target) {
				return [i, j];
			}
		}
	}
}


// input: [1, 2, 3, 4, 5], 7
// expect: [1, 4]
var nums = [1, 2, 3, 4, 5];
var target = 7;
console.log(twoSum(nums, target));
