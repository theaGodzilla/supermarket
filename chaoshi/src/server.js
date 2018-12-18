//nodejs模块化开发
// 基于配置的开发环境
// const express = require('express');

// // 引入配置文件
// const {port,host,root} = require('./config');

// // 引入路由文件
// const Router = require('./router');
// // console.log(Router);

// let app = express();

// // 利用中间件实现静态资源服务器
// app.use(express.static(root));

// // 路由
// app.use(Router);

// app.listen(port,()=>{
//     console.log(`成功运行 http://${host}:${port}`);
// })

//引入模块
const express = require('express');
const mongodb = require('mongodb');
const bodyparser = require('body-parser');
const thmail = require ('./js/theemail');

//获取mongo客户端
const MongoClient = mongodb.MongoClient;

let app = express();

//静态资源服务器
app.use(express.static('./'));

//路由
//注册
app.post('/reg',bodyparser.urlencoded({extended:false}),(req,res)=>{
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
})

//登录
app.post('/login',bodyparser.urlencoded({extended:false}),(req,res)=>{
    console.log(req.body);
    let {username,password} = req.body;
    MongoClient.connect('mongodb://localhost:27017',(err,database)=>{
        if(err) throw err;
        let db = database.db('supermarket');
        let user = db.collection('user');
        user.findOne({name:username,password:password},(err,result)=>{
            if(err) throw err;
            if( result ){
                //有账号
                res.send({
                    code:0,
                    data:[],
                    msg:'ok'
                })
            }else{
                //没有账号
                res.send({
                    code:1,
                    data:[],
                    msg:'no'
                })
            }
        })
    })
})

//检测用户名
app.get('/checkname',(req,res)=>{
    //获取传来的用户名
    let {username} = req.query;
    //连接数据库
    MongoClient.connect('mongodb://localhost:27017',(err,database)=>{
        //连接成功后执行回调函数
        //如果有错误就抛出错误
        if(err) throw err;

        //使用某个数据库，没有就自动创建一个
        let db = database.db('supermarket');

        //使用数据库里面的集合（表）
        let user = db.collection('user');

        //查询是否存在数据
        user.findOne({name:username},(err,result)=>{
            if(err) throw err;
            // console.log(result);//若存在，则出现信息，如不存在则出现null
            if( result ){
                //已有用户名，不可注册
                res.send({
                    code:0,
                    data:[],
                    msg:'该邮箱已被注册'
                })
            }else{
                //可以注册
                res.send({
                    code:1,
                    data:[],
                    msg:'该邮箱可被注册'
                })
            }
        })
        //关闭数据库,避免资源浪费
        database.close();
    })
})

//邮箱
app.get('/email',async (req,res)=>{
    let {username} = req.query;
    let code = await createSixNum();
    let date = new Date();//获取当前时间
    var mail = {
        // 发件人
        from: '464843022@qq.com',
        // 主题
        subject: 'OZ超市管理后台注册验证',//邮箱主题
        // 收件人
        to:{username},//前台传过来的邮箱
        // 邮件内容，HTML格式
        text: '验证码为：'+code//发送验证码
    };
    await thmail(mail);//发送邮件
})

//随机生成验证码
function createSixNum(){
    var Num="";
    for(var i=0;i<6;i++){
        Num+=Math.floor(Math.random()*10);
    }
    return Num;
}


//监听端口
app.listen(1717,()=>{
    console.log('成功运行，http://localhost:1717')
})