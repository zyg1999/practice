(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var html = document.documentElement;    
        var windowWidth = html.clientWidth;    
        html.style.fontSize = windowWidth / 6.2 + 'px';// 等价于html.style.fontSize = windowWidth / 620 * 100 + 'px';
    }, false);
})();

const spanHeight= document.getElementsByClassName('btn')[0].offsetHeight/5;
const span = document.getElementsByTagName('span');
for(let i=0;i<span.length;i++){
    span[i].style.lineHeight = spanHeight+'px';
    span[i].style.height = spanHeight+'px';
}
/*insertAfter 参数1需要插入的节点，参数2参考节点*/
Element.prototype.insertAfter = function (targetNode, afterNode) {
    var nextNode = afterNode.nextElementSibling;
    if (nextNode == null) {
        this.appendChild(targetNode);
    } else {
        this.insertBefore(targetNode, nextNode);
    }
}

var  front = document.getElementsByClassName("front")[0];
var  inputBox = document.getElementsByClassName("inputbox")[0];
var  numBtns = document.getElementsByClassName("numBtn");
var numNum=0;
var fontCont=1;
var flag=0;
/*数字键处理，控制15位*/
for(var i=0;i<numBtns.length;i++){
    (function(i){
        numBtns[i].onclick = function(){ 
            if(numNum>=15){
                alert("已达上限15位");
                return;
            }
            var inputc=document.createElement("span");
            inputc.innerHTML = numBtns[i].innerText;
            inputBox.appendChild(inputc);
            numNum++;
            if (inputBox.scrollWidth > front.clientWidth) {
                inputBox.scrollTo(inputBox.scrollWidth,0);
                
            }
            flag=0;
        }  
    })(i);
}

/*操作符处理*/
var  operatBtns = document.getElementsByClassName("operationBtn");
for(var i = 0;i<operatBtns.length;i++){
    (function(i){
        operatBtns[i].onclick=function(){
            if(flag==1||operatBtns[i]=="-"){
                inputBox.lastChild.innerHTML=operatBtns[i].innerText;
            }else{
                var inputc=document.createElement("span");
                inputc.innerHTML = operatBtns[i].innerText;
                inputBox.appendChild(inputc);
                numNum=0;
            }
            flag=1;
        }
    })(i);
}
var  operatBtns2 = document.getElementsByClassName("operationBtn2");
for(var i = 0;i<operatBtns2.length;i++){
    (function(i){
        operatBtns2[i].onclick=function(){
            var inputc=document.createElement("span");
            inputc.innerHTML = operatBtns2[i].innerText;
            inputBox.appendChild(inputc);
            numNum=0;  
        }
    })(i);

}
/*清屏*/
var clear = document.getElementById("clear");
clear.onclick=function(){
    while(inputBox.hasChildNodes())//当inputBox下还存在子节点时 循环继续
    {
        inputBox.removeChild(inputBox.firstChild);
    }
}
/*删除最后一位*/
var Del = document.getElementById("delete");
Del.onclick=function(){
    inputBox.removeChild(inputBox.lastChild);
}
var spans = inputBox.getElementsByTagName("span");
var total = document.getElementById("total");
var expression="";
total.onclick=function(){
    numNum=0;
    expression = inputBox.innerText;
    while(inputBox.hasChildNodes())//当inputBox下还存在子节点时 循环继续
    {
        inputBox.removeChild(inputBox.firstChild);
    }
    let value;
    value = eval(expression);
    var p = Math.floor(Math.log(value)/Math.LN10);
    var n = new Array(50);
    n = ""+value * Math.pow(10, -p)+"";
    n=n.slice(0,8);//科学计数法保留8位
    if(p>=8){
        value = n + 'e' + p;
    }
    var inputc=document.createElement("span");
    inputc.innerHTML = value;
    inputBox.appendChild(inputc);
    if (inputBox.scrollWidth > front.clientWidth) {
        let num=1;
        inputBox.style.fontSize =  1-0.1*num+'rem';    
        num++;   
    }
}