const nodemailer = require("nodemailer");

let sendMail = function (to) {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "codeforcesitachi@gmail.com",
      pass: "ken22092002",
    },
  });

  let mailDetails = {
    from: "codeforcesitachi@gmail.com",
    to: to,
    subject: "Thanks for subscribing us",
    text: "We will let you know if there is any new blog",
  };

  mailTransporter.sendMail(mailDetails, (err, data) => {
    if (err) console.log(err);
  });
};

module.exports = {
  sendMail,
};
