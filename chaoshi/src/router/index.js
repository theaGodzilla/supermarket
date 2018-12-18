//把路由封装成模块
const express = require('express');

// 引入单独路由模块
const checkrouter = require('./checkname');
const regrouter = require('./reg');

let Router = express.Router();

// 检测用户名
Router.use('/checkname',checkrouter);

// 注册
Router.use('/reg',regrouter);

module.exports = Router;