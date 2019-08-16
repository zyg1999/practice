/**
 * @param {number[]} nums
 * @return {number}
 */
/* 实例
给定数组 nums = [1,1,2], 

函数应该返回新的长度 2, 并且原数组 nums 的前两个元素被修改为 1, 2。 

你不需要考虑数组中超出新长度后面的元素。 */


var removeDuplicates = function(nums) {
    let len=1;
    for(let i=1;i<nums.length;i++){
        //与前一位比较，若不相等写入，只要把不重复的元素提到数组前几位即可
        if(nums[i] != nums[i-1])
            nums[len++]=nums[i]
    }
    return nums
};
console.log(removeDuplicates([1,1,2]))