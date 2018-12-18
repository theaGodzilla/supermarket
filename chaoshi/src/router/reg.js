// 利用Express中的Router实现路由模块化
const express = require('express');
const mongodb = require('mongodb');
const bodyparser = require('body-parser');
let Router = express.Router();

const MongoClient = mongodb.MongoClient;

Router.post('/reg',bodyparser.urlencoded({extended:false}),(req,res)=>{
    console.log(req.body);
    let {username,password} = req.body;
    //连接数据库
    MongoClient.connect('mongodb://localhost:27017',(err,database)=>{
        //连接成功后执行回调函数
        //如果有错误就抛出错误
        if(err) throw err;

        //使用某个数据库，没有就自动创建一个
        let db = database.db('supermarket');

        //使用数据库里面的集合（表）
        let user = db.collection('user');

        //添加数据
        user.insert({name:username,password,thetime:Date.now()},(err,result)=>{
            console.log(result);
            if(err){
                res.send({
                    code:0,
                    data:[],
                    msg:'err'
                })
            }else{
                res.send({
                    code:1,
                    data:result,
                    msg:'注册成功!'
                })
            }
        })
        
        //关闭数据库,避免资源浪费
        database.close();
    })
});

module.exports = Router;