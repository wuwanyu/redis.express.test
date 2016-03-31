## 在express项目中使用redis
 
####  准备工作

-  安装redis

-  安装redis桌面管理工具：Redis Desktop Manager

- 项目中安装redis：npm install redis


#### 开始使用redis
使用方法很简单，初始化redis后，就可以使用了，如下：

	//初始化
	var redis = require("redis"),
	    client = redis.createClient();
	
	client.on("error", function (err) {
	    console.log("Error " + err);
	});
	
	
	//使用
	client.set("string key", "string val", redis.print);
	client.hset("hash key", "hashtest 1", "some value", redis.print);
	client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
	client.hkeys("hash key", function (err, replies) {
	    console.log(replies.length + " replies:");
	    replies.forEach(function (reply, i) {
	        console.log("    " + i + ": " + reply);
	    });
	    client.quit();
	});
	

#### 在项目中使用redis

如果在项目中使用redis,我们希望初始化一次，处处可用。我们如何让初始化后的redisClient成为全局变量，或者在别的模块中可用呢。
##### 方法一：将redisClient存储在node的全局对象global中
在 ./bin/www 中创建client，并保存在全局对象global中：

	global.redisClient = require("redis").createClient();
	
这样，redisClient在各模块中，不用引用，到处可用。

在controller层，需要使用redisClient的地方，直接使用 

	redisClient.hmset("user:"+uid ,{uid:uid,name:"wuwanyu",age:"21"},next);


#### 方法二： 将redis初始化方法，封装在index.js中，然后exports出去

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

#### 方法三：将init,close,hmset,hgetall封装方法
 初始化redis:

	// database/redis.js
	module.init = function(callback) {

        redisClient = redis.createClient(configs.redis);


        require('./redis/main')(redisClient, module);
        require('./redis/hash')(redisClient, module);
        require('./redis/sets')(redisClient, module);
        require('./redis/sorted')(redisClient, module);
        require('./redis/list')(redisClient, module);

        module.redisClient = redisClient;

        if(typeof callback === 'function') {
            callback();
        }
    };
    
	

封装redis的hmset，hgetall等方法：

	// database/redis/hash
	
	"use strict";

	module.exports = function(redisClient, module) {

		var helpers = module.helpers.redis;
	
		module.setObject = function(key, data, callback) {
			callback = callback || function() {};
			redisClient.hmset(key, data, function(err) {
				callback(err);
			});
		};
	
	
		module.getObject = function(key, callback) {
			redisClient.hgetall(key, callback);
		};
	};


在./bin/www 调用redis.init()方法,初始化redis；

	async.waterfall([
	    function(cb){
		   	redis.init(cb);  //初始化redis
	    },
	],function(){
	// 启动node
	});

在各个controller内调用:

	var redis = require("../database/redis.js");
	 
	  redis.setObject("user:"+uid ,{uid:uid,name:"wuwanyu",age:"21"},next);  
	  redis.getObject("user:"+uid,next); 


