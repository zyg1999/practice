const expresss = require('express');
const cheerio = require('cheerio');
const superagent = require('superagent');

const server = expresss();

server.get('/',function(req,res,next){
    superagent.get('http://news.baidu.com/')//请求页面地址
        .end(function(err,sres){
            if(err){
                return next(err);
            }
            
            var $ = cheerio.load(sres.text);//用cheerio解析页面数据
                var arr=[];
                $('.ulist.focuslistnews li').each(function(index,element){//获取名为ulist.focuslistnews标签，在每个里面运用function方法
                    var $eleItem = $(element).find('a');//获取bold-item 下的a
                    //var $elementSon = $(element).find('.bold-item ~ li a');//获取li下的a
                    console.log($eleItem.length);
                    arr.push(
                        {
                            title: $eleItem.text(),
                            herf: $eleItem.attr('href'),///设置属性值
                           /* item:{
                                title:$elementSon.text(),
                                herf: $elementSon.attr('href'),
                            }*/
                            
                        }
                        
                    );
                });
                res.send(arr);
        });
});
server.listen(8080);