/**
 * Created by wuwy on 2016/3/17.
 */

//var redisClient = require("../database/index.js").init();  //������
var redis = require("../database/redis.js"); //������

module.exports = {
    //����
    save: function(params, next){
        var uid = params.uid;
        //redisClient.hmset("user:"+uid ,{uid:uid,name:"wuwanyu",age:"21"},next);  //����һ��������
        redis.setObject("user:"+uid ,{uid:uid,name:"wuwanyu",age:"21"},next);  //������

    },

    //��ȡһ��
    findOne:function(params, next){
        var uid = params.uid;
        //redisClient.hgetall("user:"+uid,next); //����һ��������
        redis.getObject("user:"+uid,next);  //������
    },
    //ɾ��
    delete:function(req, res, next){
        next();
    },
    //�޸�
    update:function(req, res, next){
        next();
    },


    //��ѯȫ��
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

    //��ѯ����
    count:function(req,res,next){
        next();
    }
};