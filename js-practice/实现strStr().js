/* 实现 strStr() 函数。

给定一个 haystack 字符串和一个 needle 字符串，在 haystack 字符串中找出 needle 字符串出现的第一个位置 (从0开始)。如果不存在，则返回  -1。 */
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
// indexOf
var strStr = function(haystack, needle) {
    if(!needle)
        return 0
    return haystack.indexOf(needle)
};

//for循环匹配
var strStr = function(haystack, needle) {
    if(!needle)
        return 0
    for(let i=0;i<haystack.length;i++){
        if(haystack[i]===needle[0]&&haystack.slice(i,i+needle.length)===needle){
            return i
        }
    }
    return -1
};