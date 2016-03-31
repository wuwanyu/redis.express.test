var express = require('express');
var router = express.Router();
var userCtl= require('../controller/user.controller.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
    userCtl.findOne(req.query,function(err,result){
        if(err){ throw err;  }else{
            res.send('get user:',result);
        }
    })
});

router.post('/',function(req, res, next) {
    userCtl.save(req.body,function(err,result){
        if(err){ throw err;  }else{
           res.send('set user ok:',result);
        }
    })

});

module.exports = router;
