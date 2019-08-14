var isPalindrome = function(x) {
    if(x<0||(x%10==0&&x!=0))
        return false
    let  res=0
    while(x>res){
        res=res*10+(x%10)
        x=parseInt(x/10) 
    }
    return x==res||x==parseInt(res/10)
};
console.log(isPalindrome(121))