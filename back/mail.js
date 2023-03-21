const nodemailer = require('nodemailer');
const senderInfo = require('./config').mailer;

let mailSender = {
  sendGmail(param) {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: senderInfo.user,
        pass: senderInfo.password
      }
    });
    
    let mailOptions = {
      from: senderInfo.user,
      to: param.toEmail,
      subject: param.subject,
      text: param.text
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`메일 발송: ${info.response}`);
      }
    });
  }
};

module.exports = mailSender;