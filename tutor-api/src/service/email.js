const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: false, // use SSL
    port: 25, // port for secure SMTP
    auth: {
        user: "sasithornsupamarkpukdee@gmail.com",
        pass: "48711062"
    },
    tls: {
        rejectUnauthorized: false
    }
})

async function sendMail({email, subject, html}) {
    // setup email data
    let mailOptions = {
      from: '"Codecamp 👻" <foo@example.com>', // sender address
      to: email, // list of receivers
      subject: subject, // Subject line  'Hello ✔'
    //text: content, // plain text body
      html: html // html body '<b>Hello world?</b>'
    }
      const result = await transporter.sendMail(mailOptions)
      console.log('Message sent: %s', result.messageId)
      return result.messageId;
   
   }
   
   module.exports = {
    sendMail
  }
