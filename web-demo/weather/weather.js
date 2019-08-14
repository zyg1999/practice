var search = document.getElementById('searchinput');

var city = document.getElementById('city');
var updatetime = document.getElementById('updatetime');
var temperature = document.getElementById('temperature');
var weatherCategory = document.getElementById('weathercategory');
var windContent = document.getElementById('windcontent');
var humidityContent = document.getElementById('humiditycontent');
var pressurecontent = document.getElementById('pressurecontent');
var question;

function getAnswer(a){
    if(a.status=="202"){
        alert("城市不存在");
        return;
    }
    city.innerHTML = a.result.city;
    updatetime.innerHTML = "更新时间&nbsp" + a.result.updatetime; 
    temperature.innerHTML = a.result.temp + "℃";
    weatherCategory.innerHTML = a.result.weather;
    windContent.innerHTML=a.result.winddirect + "&nbsp" + a.result.windpower;
    humidityContent.innerHTML = "湿度&nbsp"+a.result.humidity + "％";
    pressurecontent.innerHTML = a.result.pressure+"Pa";
    console.log(1);
}
var script1 = document.createElement('script');
script1.src="http://api.jisuapi.com/weather/query?appkey=5bf01ab11abb6a36&city=西安&callback=getAnswer";
document.body.insertBefore(script1, document.body.lastChild);


function getMessage(){
    
    if(question=="搜索城市"){
        alert("请输入正确信息");
        return;
    }
    var script2 = document.createElement('script');
    script2.src="http://api.jisuapi.com/weather/query?appkey=5bf01ab11abb6a36&city="+question+"&callback=getAnswer";
    document.body.insertBefore(script2, document.body.lastChild);
    search.value = "搜索城市";
}

search.onkeypress = function(e){
    if(e.charCode == "13"){
        question = search.value;
        getMessage();
    }else{
        return;
    }
}
