import nodemailer from "nodemailer";

const sendEmail = async (object) => {
  console.log(object);

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "contactdomferris@gmail.com",
      pass: "Dummy2020test!",
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"no-reply" <sending@address.com>', // sender address
    to: "me@domferris.com", // list of receivers
    subject: `New message from ${object.name}`, // Subject line
    text: object.message, // plain text body
    html: `<p>Name: ${object.name}</p>
    <p>Email: ${object.email}</p>
    <p>${object.message}</p>`, // html body
  });

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
};

export default sendEmail;
