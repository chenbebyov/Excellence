var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'excellence.school.il@gmail.com',
    pass: 'eexafkfjsolnenad'
  }
});


const sendEmail = (toAddress, subject, content, isText) => {
    var mailOptions = {
        from: 'excellence.school.il@gmail.com',
        to: toAddress,
        subject: subject
    };
    if(isText){
        mailOptions.text = content;
    }
    else {
        mailOptions.html = content
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports  = sendEmail;