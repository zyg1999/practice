let fs = require('fs');
let querystring = require('querystring');
var cookieParser = require('cookie-parser');
var cookieSeesion = require('cookie-session');
let express = require('express');

app = express();
app.use(cookieParser('sign'));//为cookie添加签名，防篡改
var arr = [];
for(var i=0;i<10000;i++){
	arr.push(Math.random()*9999999+"asdasd");
}
app.use(cookieSeesion({
	name:'session_id',
    keys:arr,
	maxAge:1000*60*20,
}))

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", 'localhost'); //需要显示设置来源    *不接受cookie
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true); //带cookies7     res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.get('/Ajax.js',function(req,res){
    console.log(11);
    fs.readFile('./www'+req.url,function(err,data){
        if(err)
        {
                throw err;
        }
        else{
            res.write(data);
            res.end();
        }
    })
})
app.get('/reglogin.html',function(req,res){
    console.log(11);
    fs.readFile('./www'+req.url,function(err,data){
        if(err)
        {
                throw err;
        }
        else{
            res.write(data);
            res.end();
        }
    })
})
app.get('/', function (req, res) {
    console.log('主页GET请求');

})

app.use('/register', function (req, res) {
    if (req.method == "POST") {
        var result = "";//接收用户名和密码

        req.addListener('data', function (data) {
            result += data;
        });

        req.on('end', function () {
            let user = querystring.parse(result);
            console.log(req.url);
            console.log(user);
            if (user.username) {
                fs.readFile("db.txt", "utf-8", function (err, data) {
                    if (err) {//读取文件失败
                        fs.createReadStream('input.txt');
                        console.log("创建成功");
                    }
                    if (!data) {//如果无数据
                        let arr = [];
                        let obj = {};

                        obj.username = user.username;
                        obj.password = user.password;
                        arr.push(obj);

                        fs.writeFile("db.txt", JSON.stringify(arr), "utf-8", (error) => {
                            if (error) {
                                console.log("写入失败");
                            }
                        });
                      
                        res.end('{"ok":true,"msg":"注册成功"}');
                        return;
                    } else {//有数据
                        let arr = JSON.parse(data);//文件中的
                        for (let i = 0; i < arr.length; i++) {
                            let obj = arr[i];
                            if (obj.username == user.username) {
                                res.end('{"ok":false,"msg":"该用户已注册"}');
                                return;
                            }
                        }
                        let obj = {};
                        obj.username = user.username;
                        obj.password = user.password;
                        arr.push(obj);

                        fs.writeFileSync("db.txt", JSON.stringify(arr), "utf-8");
                        console.log('cookie');
                        req.session.a='asd';//加session

                        res.cookie('name',user.username,{ //添加cookie
                            path:'/',//访问哪一个路径的时加上cookie        
                            maxAge:20*60*1000,//cookie的存活时间,单位毫秒        
                            signed:false,//是否加签名 
                            httpOnly:true   
                        })
                        res.end('{"ok":true,"msg":"注册成功"}');
                        return;
                    }
                })
            }

        })
    }

});

app.use('/login', function (req, res) {
    if (req.method == "POST") {
        var result = "";//接收用户名和密码
        req.addListener('data', function (data) {
            result += data;
        });

        req.on('end', function () {
            let user = querystring.parse(result);
            console.log(req.url);
            console.log(user);

            if (user.username) {
                fs.readFile("db.txt", "utf-8", function (err, data) {
                    console.log(!err);
                    if (err) {//读取文件失败
                        fs.createReadStream('input.txt');
                        console.log("创建成功");
                    }
                    if (!data) {//如果无数据
                        res.end('{"ok":false,"msg":"用户未注册"}');
                        return;
                    }
                    else {//有数据
                        let arr = JSON.parse(data);//文件中的

                        for (let i = 0; i < arr.length; i++) {
                            let obj = arr[i];
                            if (obj.username == user.username) {
                                if (obj.password == user.password) {
                                    res.end('{"ok":true,"msg":"登录成功"}');
                                    return;
                                } else {
                                    res.end('{"ok":false,"msg":"密码错误"}');
                                    return;
                                }
                            }
                        }
                        res.end('{"ok":false,"msg":"该用户未注册"}');
                        return;
                    }


                })
            }

        })
    }
});

app.listen(8080);