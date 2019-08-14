// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

// 有效字符串需满足：

// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。
// 注意空字符串可被认为是有效字符串。
/**
 * @param {string} s
 * @return {boolean}
 */
//栈分情况讨论
// var isValid = function(s) {
//      let stack=[s[0]]
//      for(let i=1;i<s.length;i++)
//      {
//         const t=s[i]
//         if(stack[stack.length-1]==='('&&t===')')
//         {
//             stack.pop()
//             continue
//         }else if(stack[stack.length-1]==='['&&t===']'){
//             stack.pop()
//             continue
//         }else if(stack[stack.length-1]==='{'&&t==='}'){
//             stack.pop()
//             continue
//         }
//         stack.push(s[i])
//      }
//      if(stack.length)
//       return false
//     else 
//      return true
// };


//map
var isValid = function(s) {
    const rules={
        "{":"}",
        "[":"]",
        "(":")"
    }
    let stack=[]
    for(let i=0;i<s.length;i++){
        if(s[i]==="["||s[i]==="{"||s[i]==="("){
            stack.push(s[i])
            continue
        }else if(rules[stack[stack.length-1]] === s[i]){
            stack.pop()
            continue
        }else return false
    }
    if(stack.length)
      return false
    else 
     return true
}
console.log(isValid("]")) 