const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email,name) => {
    sgMail.send({
        to:email,
        from:'katoch.anuj92@gmail.com',
        subject:"Welcome to the app again",
        text:`Hi ${name}.Welcome to the app. Hope you have a great atime on the app`
    })
};

const sendCancelationEmail = (email,name) => {
    sgMail.send({
        to:email,
        from:'katoch.anuj92@gmail.com',
        subject:"gooDbye",
        text:`Hi ${name}.Hope to see you back on the app very soon`
    })
};

module.exports ={
    sendWelcomeEmail,
    sendCancelationEmail
}
