(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var html = document.documentElement;
        var windowWidth = html.clientWidth;
        html.style.fontSize = windowWidth / 6.2 + 'px';// 等价于html.style.fontSize = windowWidth / 620 * 100 + 'px';
    }, false);
})();

const spanHeight = document.getElementsByClassName('btn')[0].offsetHeight / 5;
const span = document.getElementsByTagName('span');
for (let i = 0; i < span.length; i++) {
    span[i].style.lineHeight = spanHeight + 'px';
    span[i].style.height = spanHeight + 'px';
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
var totalflag=0;
var front = document.getElementsByClassName("front")[0];
var inputBox = document.getElementsByClassName("inputbox")[0];
var numBtns = document.getElementsByClassName("numBtn");
var numNum = 0;
var fontCont = 1;
var flag = 0;
/*数字键处理，控制15位*/
for (var i = 0; i < numBtns.length; i++) {
    (function (i) {
        numBtns[i].onclick = function () {
            if (numNum >= 15) {
                alert("已达上限15位");
                return;
            }

            var inputc = document.createElement("span");
            inputc.innerHTML = numBtns[i].innerText;
            inputBox.appendChild(inputc);
            numNum++;
            if (inputBox.scrollWidth > front.clientWidth) {
                inputBox.scrollTo(inputBox.scrollWidth, 0);

            }
            flag = 0;
        }
    })(i);
}

/*操作符处理*/
var operatBtns = document.getElementsByClassName("operationBtn");
for (var i = 0; i < operatBtns.length; i++) {
    (function (i) {
        operatBtns[i].onclick = function () {
            if (flag == 1 || operatBtns[i] == "-") {
                inputBox.lastChild.innerHTML = operatBtns[i].innerText;
            } else {
                var inputc = document.createElement("span");
                inputc.innerHTML = operatBtns[i].innerText;
                inputBox.appendChild(inputc);
                numNum = 0;
            }
            flag = 1;
        }
    })(i);
}
var operatBtns2 = document.getElementsByClassName("operationBtn2");
for (var i = 0; i < operatBtns2.length; i++) {
    (function (i) {
        operatBtns2[i].onclick = function () {
            var inputc = document.createElement("span");
            inputc.innerHTML = operatBtns2[i].innerText;
            inputBox.appendChild(inputc);
            numNum = 0;
        }
    })(i);

}
/*清屏*/
var clear = document.getElementById("clear");
clear.onclick = function () {
    while (inputBox.hasChildNodes())//当inputBox下还存在子节点时 循环继续
    {
        inputBox.removeChild(inputBox.firstChild);
    }
}
/*删除最后一位*/
var Del = document.getElementById("delete");
Del.onclick = function () {
    inputBox.removeChild(inputBox.lastChild);
}
var spans = inputBox.getElementsByTagName("span");
var total = document.getElementById("total");
var expression = new Array(50);


function getweight(a) {
    var flag;
    switch (a) {
        case '(': flag = 1; break;
        case '+': flag = 2; break;
        case '-': flag = 2; break;
        case '*': flag = 3; break;
        case '/': flag = 3; break;
        case ')': flag = 1; break;
    }
    return flag;
}
var mid = new Array();//中缀表达式
var end = new Array();//后缀表达式
var anum = new Array();//操作数栈
var astr = new Array();//操作符栈


function getmid() {
    expression = inputBox.innerText;
    expression = expression.split("");//字符串转数组
    let len = expression.length;
    let endCount = 0, n = 0;
    if (expression[0] == '-') {
        end[endCount] = '#';
        endCount++;
        n = 1;
    }
    for (var i = n; i < len; i++) {
        if (expression[i] <= '9' && expression[i] >= '0' && expression[i + 1] != '.') {//&&(expression[i+1]<'0'||expression[i+1]>'9')
            end[endCount] = expression[i];
            endCount++;
            end[endCount] = ' ';
            endCount++;
        } else if ((expression[i] <= '9' && expression[i] >= '0' && ((expression[i + 1] >= '0' && expression[i + 1] <= '9') ||  expression[i + 1] == '.'))|| expression[i] == '.') {
            end[endCount] = expression[i];
            endCount++;
        } else if (expression[i - 1] == '(' && expression[i] == '-') {//对括号后面是负数进行处理
            end[endCount] = '#';
            endCount++;
        } else if ((expression[i] == '+' || expression[i] == '-' || expression[i] == '*' || expression[i] == '/') && expression[i - 1] != '(') {
            while (astr.length != 0) {
                if (getweight(astr[astr.length - 1]) >= getweight(expression[i])) {
                    end[endCount] = astr[astr.length - 1];
                    astr.pop();
                    endCount++;
                    end[endCount] = ' ';
                    endCount++;
                }
                else break;
            }
            astr.push(expression[i]);
        } else if (expression[i] == '(')
            astr.push(expression[i]);
        else if (expression[i] == ')') {
            while (1) {
                if (astr[astr.length - 1] == '(') {
                    if (astr.length != 0)
                        astr.pop();
                    break;
                } else {
                    end[endCount] = astr[astr.length - 1];
                    if (astr.length != 0)
                        astr.pop();
                    endCount++;
                    end[endCount] = ' ';
                    endCount++;
                }
            }
        } else continue;

    }
    while (astr.length != 0) {
        end[endCount] = astr[astr.length - 1];
        if (astr.length != 0)
            astr.pop();
        endCount++;
        end[endCount] = ' ';
        endCount++;
    }
    end[endCount] = '\0';
    console.log(end);
    return 0;
}
function getrResult() {
    var top, sec, ans, floatnumber;
    var i = 0, j = 0, k, x;
    var flag = 1;
    var num = new Array(50);
    for (i = 0; end[i] != '\0'; i++) {
        if (end[i] == '#') {
            flag = 0;
            j = i + 1;
        }
        if (end[i] == ' ' && end[i - 1] <= '9' && end[i - 1] >= '0') {
            for (k = j, x = 0; k <= i; k++ , x++)
                num[x] = end[k];
            let numstring = num.join("");
            floatnumber = parseFloat(numstring);//字符串转浮点型
            if (!flag) {
                floatnumber *= -1;
                flag = 1;
            }
            anum.push(floatnumber);
            num.splice(0, num.length);//清空数组
            num[0] = '';
            floatnumber = 0;
        }
        else if (end[i - 1] == ' ' && end[i] <= '9' && end[i] >= '0') j = i;
        else if (end[i] == '+' || end[i] == '-' || end[i] == '/' || end[i] == '*') {
            top = anum[anum.length-1];
            anum.pop();
            sec = anum[anum.length - 1];
            switch (end[i]) {
                case '+': ans = top + sec; break;
                case '-': ans = sec - top; break;
                case '*': ans = top * sec; break;
                case '/': ans = sec / top; break;
            }
            anum.pop();
            anum.push(ans);
        }
        else continue;
    }
    return anum[anum.length - 1];
}
total.onclick = function () {
    numNum = 0;
    expression = inputBox.innerText;
    getmid();
    while (inputBox.hasChildNodes())//当inputBox下还存在子节点时 循环继续
    {
        inputBox.removeChild(inputBox.firstChild);
    }
  
    var value = getrResult();
    /* var p = Math.floor(Math.log(value) / Math.LN10);
    var n = new Array(50);
    n = "" + value * Math.pow(10, -p) + "";
    n = n.slice(0, 8);//科学计数法保留8位
    if (p >= 8) {
        value = n + 'e' + p;
    } */
    var inputc = document.createElement("span");
    inputc.innerHTML = value;
    inputBox.appendChild(inputc);
}