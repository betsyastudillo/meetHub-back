const nodemailer = require("nodemailer");

const userGmail = "securekali85@gmail.com";
const passAppGmail = "gcsw kcxw rhrd klwy";

// Configura transporter de nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: userGmail,
    pass: passAppGmail,
  },
});

// Define una ruta para enviar emails
// Configurar opciones de email
const mailOptions = {
  from: userGmail,
  to: userGmail,
  subject: "Prueba para email",
  text: "This is a test email from Node.js!",
};

// Enviar email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  }
  console.log("Email sent: " + info.response);
});