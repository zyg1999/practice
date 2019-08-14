/**
 * @param {number} x
 * @return {number}
 */
/* var reverse = function(x){
  let flag=1
  let res=0
  if(x<0){
    flag=-1;
    x=-1*x;
  }
  while(x){
    res=res*10+(x%10)
    x=parseInt(x/10) 
  }
  res=res*flag
  console.log(res)
  if(res>Math.pow(2,31)&&res>0) return 0
  else if(res<0&&res<Math.pow(-2,31)) return 0
  return res
} */

//效率更快
var reverse = function(x) {
    let str= x.toString();
    if(x>=0){
      let res =parseInt(str.split("").reverse().join("")) 
      if(res>Math.pow(2,31)) return 0
      return res 
    }else{
      str=str.split("-")[1]
      let res=-parseInt(str.split("").reverse().join(""))
      if(res<Math.pow(-2,31)) return 0
      return res
    }
};

