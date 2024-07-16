const nodemailer = require("nodemailer");
const expressAsyncHandler = require("express-async-handler");

const sendEmail = expressAsyncHandler(async (data, req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "5b69483f3e9317",
        pass: "7d89ab711752d3",
      },
    });

    const info = await transporter.sendMail({
      from: '"hey there 👻" <valdona@ethereal.email>', // sender address
      to: data.to, // list of receivers
      subject: data.subject, // Subject line
      text: data.text, // plain text body
      html: data.htm, // html body
    });

    console.log(data.to);

    console.log(info);

    // console.log("Message sent: %s", info.messageId);
    // console.log("provider url: %s", nodemailer.getTestMessageUrl(info));
    // res.json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    // res.status(500).json({ message: "Error sending email" });
  }
});

module.exports = sendEmail;
