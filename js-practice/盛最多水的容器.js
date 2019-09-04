/**
 * @param {number[]} height
 * @return {number}
 */
//暴力循环
//复杂度 O(n^2)
var maxArea = function(height) {
    let max=0
    for(let i=0;i<height.length;i++){
        for(let j=i+1;j<height.length;j++){
            max=Math.max(max,(height[i]>height[j]?height[j]:height[i])*(j-i)) 
        }
    }
    return max
};
//双指针法 
//思路：矩形面积以最小边为基准，若最大边指针移动，面积智慧越来越小，故最小边指针移动
var maxArea = function(height){
    let max=0
    let i=0,j=height.length-1;
    while(i<j){
        max=Math.max(max,(height[i]>height[j]?height[j]:height[i])*(j-i))
        height[i]>height[j]?j--:i++
    }
    return max
}