var express = require('express');
var router = express.Router();
var redis = require('redis'),
    client = redis.createClient();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



//
//
//client.auth("123", function(){
//  console.log(">> 认证通过！");
//});
//
////单值set和get
//client.on("connect",function(){
//  client.set("author","wuwanyu");
//  client.get("author",redis.print);
//});
//
//client.on('ready',function(err){
//  console.log('ready ok');
//});
//
////多值get和set
//client.on("connect",function(){
//
//  client.hmset('language', {'js':'javascript','C#':'C Sharp'});
//  client.hmset('language', 'SQL','Structured Query Language','HTML','HyperText Mark-up Language', redis.print);
//  client.hgetall("language", function(err,res){
//    if(err){ console.log('Error:'+ err);  }
//    console.dir(res);
//  });
//
//});
//
////打包执行多个命令[事务]
//client.on("connect",function(){
//  var key = "skills";
//  client.sadd(key,"c#");
//  client.sadd(key,"node");
//  client.sadd(key,"java");
//
//  client.multi()
//      .sismember(key,"#c#")
//      .smembers(key)
//      .exec(function(err,replies){
//        if(err) throw err;
//        replies.forEach(function(reply,index){
//          console.log("第 "+index +"项:"+reply);
//        });
//        client.quit();
//      });
//
//});



module.exports = router;
