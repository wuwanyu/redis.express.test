/**
 * Created by wuwy on 2016/3/17.
 */

//var redisClient = require("../database/index.js").init();  //方法二
var redis = require("../database/redis.js"); //方法三

module.exports = {
    //增加
    save: function(params, next){
        var uid = params.uid;
        //redisClient.hmset("user:"+uid ,{uid:uid,name:"wuwanyu",age:"21"},next);  //方法一，方法二
        redis.setObject("user:"+uid ,{uid:uid,name:"wuwanyu",age:"21"},next);  //方法三

    },

    //获取一条
    findOne:function(params, next){
        var uid = params.uid;
        //redisClient.hgetall("user:"+uid,next); //方法一，方法二
        redis.getObject("user:"+uid,next);  //方法三
    },
    //删除
    delete:function(req, res, next){
        next();
    },
    //修改
    update:function(req, res, next){
        next();
    },


    //查询全部
    find: function(req, res, next){
        var url = api_request_url + "service/list";
        var params = req.query;
        agent
            .get(url)
            .query(params)
            .end(function (err, response) {
                if (err) {
                    throw err;
                } else {
                    req.list = response.text;
                    next();
                }
            });
    },

    //查询数量
    count:function(req,res,next){
        next();
    }
};