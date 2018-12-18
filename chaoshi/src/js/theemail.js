const nodemailer = require('nodemailer');
// const thmail = require('../server.js');

//创建一个smtp服务器

const config = {
    servers: 'qq',//邮箱的服务商
    port: 465,//SMTP端口
    secureConnection: true,
    auth: {
        user: '464843022@qq.com', //默认的邮箱账号
        pass: 'inmblcnanrnfcbci' //邮箱的授权码
    }
};

const transporter = nodemailer.createTransport(config);

module.exports = function (mail){
    transporter.sendMail(mail, function(error, info){
        if(error) {
            return console.log(error);
        }
        console.log('mail sent:', info.response);
    });
};