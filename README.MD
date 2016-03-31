## ��express��Ŀ��ʹ��redis
 
####  ׼������

-  ��װredis

-  ��װredis����������ߣ�Redis Desktop Manager

- ��Ŀ�а�װredis��npm install redis


#### ��ʼʹ��redis
ʹ�÷����ܼ򵥣���ʼ��redis�󣬾Ϳ���ʹ���ˣ����£�

	//��ʼ��
	var redis = require("redis"),
	    client = redis.createClient();
	
	client.on("error", function (err) {
	    console.log("Error " + err);
	});
	
	
	//ʹ��
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
	

#### ����Ŀ��ʹ��redis

�������Ŀ��ʹ��redis,����ϣ����ʼ��һ�Σ��������á���������ó�ʼ�����redisClient��Ϊȫ�ֱ����������ڱ��ģ���п����ء�
##### ����һ����redisClient�洢��node��ȫ�ֶ���global��
�� ./bin/www �д���client����������ȫ�ֶ���global�У�

	global.redisClient = require("redis").createClient();
	
������redisClient�ڸ�ģ���У��������ã��������á�

��controller�㣬��Ҫʹ��redisClient�ĵط���ֱ��ʹ�� 

	redisClient.hmset("user:"+uid ,{uid:uid,name:"wuwanyu",age:"21"},next);


#### �������� ��redis��ʼ����������װ��index.js�У�Ȼ��exports��ȥ

	exports.init = function(){
	    var configs = require('../config.json');
	
	    var redis = require("redis"),
	        redisClient = redis.createClient(configs.redis);
	
	    redisClient.on("error", function (err) {
	        console.log("Error " + err);
	    });
	
	    return redisClient;
	};


ʹ��ʱ��

	var redisClient = require("../database/index.js").init();
	redisClient.hgetall("user:"+uid,next);

#### ����������init,close,hmset,hgetall��װ����
 ��ʼ��redis:

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
    
	

��װredis��hmset��hgetall�ȷ�����

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


��./bin/www ����redis.init()����,��ʼ��redis��

	async.waterfall([
	    function(cb){
		   	redis.init(cb);  //��ʼ��redis
	    },
	],function(){
	// ����node
	});

�ڸ���controller�ڵ���:

	var redis = require("../database/redis.js");
	 
	  redis.setObject("user:"+uid ,{uid:uid,name:"wuwanyu",age:"21"},next);  
	  redis.getObject("user:"+uid,next); 

