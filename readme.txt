如何让 redisClient 成为全局变量

1.最简单的方法：
在 ./bin/www 中global.redisClient = require("redis").createClient();
这样，redisClient在各模块中，不用引用，到处可用。

2.将redis初始化方法，封装在index.js中，然后exports

exports.init = function(){
    var configs = require('../config.json');

    var redis = require("redis"),
        redisClient = redis.createClient(configs.redis);

    redisClient.on("error", function (err) {
        console.log("Error " + err);
    });

    return redisClient;
};


使用时：
var redisClient = require("../database/index.js").init();
redisClient.hgetall("user:"+uid,next);

3.将init,close,hmset,hgetall封装方法
在./bin/www 调用redis.init()方法,初始化redis；
在各个controller内调用redis.getObject(key,cb),redis.setObject(key,value,cb);
