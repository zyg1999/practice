/*
ajax({
    url: "", //请求地址
    type: 'get',   //请求方式
    data: { name: 'zhangsan', age: '23', email: '2372734044@qq.com' }, //请求json参数
    async: false,   //是否异步
    success: function (responseText) {
        //   此处执行请求成功后的代码
    },
    fail: function (err) {

        // 此处为执行成功后的代码 
    }
}); */

function getParmer(data) {
    var arr = [];
    for (var thing in data) {
        arr.push(encodeURIComponent(thing) + '=' + encodeURIComponent(data[thing]));
    }
    return arr.join('&');
}

function Ajax(object) {
    xhr = new XMLHttpRequest();
    var message = getParmer(object.data);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var status = xhr.status;
            if (status >= 200 && status < 300) {
                object.success(xhr.responseText);
            } else {
                object.fail(xhr.status);
            }
        }
    };

    if (object.type == 'GET') {
        xhr.open("GET", object.url + "?" + message,object.async);
        xhr.send(null);
    } else if(object.type == 'POST'){
        xhr.open("POST", object.url, object.async);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(message);
    }
}
