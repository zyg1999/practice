const http = require('http');
const urlLib = require('url');
const fs = require('fs');
const querystring = require('querystring');

var users = { "aaa": "123", "bbb": "456" };
var server = http.createServer(function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS"); 
    
    //解析数据
    var str = "";
    req.on('data', function (data) {
        str += data;
    });
    req.on('end', function () {
        console.log(req.url);
        var obj = urlLib.parse(req.url, true);
        const url = obj.pathname;// user
        const GET = obj.query;// 对象
       // const POST = querystring.parse(str);
        
        //区分接口文件
        if (url == "/user") {
           // console.log(users,users[GET.user],GET.user);
            switch (GET.act) {
                case 'reg':
                    //检查用户是否存在
                    if (users[GET.user]) {
                        res.write('{"ok":false,"msg":"该用户已注册"}');
                        
                    } else {//简易
                        users[GET.user] = GET.pass;
                        res.write('{"ok":true,"msg":"注册成功"}')
                    }
                    break;
                case 'login':
                    //检查用户是否存在，密码是否正确
                    console.log(users[GET.user],GET.pass);
                    if (users[GET.user]==null) {
                        res.write('{"ok":false,"msg":"该用户未注册"}');
                    } else if (users[GET.user] != GET.pass) {
                        res.write('{"ok":false,"msg":"用户名或密码错误"}');
                    } else {
                        res.write('{"ok":true,"msg":"登录成功"}')
                    }
                    break;
                default:
                    res.write('{"ok":false,"msg":"未知act"}');
            }
            res.end();
        } else {
            //读取文件返回
            var fileName = "./www" + url;
            fs.readFile(fileName, function(err,data) {
                if (err) {
                    res.write('404');
                } else {
                    res.write(data);
                }
            });
        }

    });

});
server.listen(8080);