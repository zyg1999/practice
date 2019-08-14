window.onload = function(){
    var picBox = document.getElementById('pic-box');
    var showBox = document.getElementsByClassName('show-box')[0];
    var points = document.getElementsByTagName('span');
    var left = document.getElementById('leftbuttom');
    var right = document.getElementById('rightbuttom');
    var num = 1;
    var lock = true;

   
  //动画函数
      function animate(offset){
        var speed = offset/30;
        lock = false;  //关锁
        var s = picBox.offsetLeft + offset;//计算目标位置
        function roll(){   
            if(picBox.offsetLeft == s){ //递归出口：到达目标位置
                lock = true;  //开锁
               if(s>-600){
                  picBox.style.left = -3000 + "px";
               }else if(s<-3000){
                  picBox.style.left = -600 + "px";
               }
            }     
            else{
              picBox.style.left = picBox.offsetLeft +speed +"px";
                setTimeout(roll,10);
            }
        } 
        roll();
    }

    //改变点的样式
    function showpoints(){
        for(var i=0;i<points.length;i++){
            if(points[i].className=="open"){//关
                points[i].className = "";
                break;
            }
        }
        points[num-1].className = "open";//开
      } 

    //点击小圆点
    for(var i =0;i<points.length;i++){
        points[i].onclick = function(){
            if(this.className == "open"){
                return;
            }
            var pointIndex = parseInt(this.getAttribute('index'));
            var offset = -600 *(pointIndex-num);
            num = pointIndex;//更新num
            showpoints();
            animate(offset);
        }
    }

   //左按钮函数
   function moveLeft(){
       if(lock){
        if(num == 1){
            num = 5;
        }else{
            num--;
        }
        showpoints();
        animate(600);
       }
    }

    //右按钮函数
    function moveRight(){
        if(lock){
            if(num == 5){
                num = 1;
            }else{
                num++;
            }
            showpoints();
            animate(-600);
        }
       
    }

    //自动播放
    function automatic (){
        timer = setInterval(moveRight,2400);
    }
    automatic();

    //按钮出现
    function show(){
        left.style.display = "inline-block";
        right.style.display = "inline-block";
        clearInterval(timer);
    }

    //按钮隐藏
   function hidden(){
        left.style.display = "none";
        right.style.display = "none";
        automatic();
    }   

    //事件触发时调用函数
    left.onclick = moveLeft;
    right.onclick = moveRight;
    showBox.onmouseover = show;
    showBox.onmouseout =hidden;
}

