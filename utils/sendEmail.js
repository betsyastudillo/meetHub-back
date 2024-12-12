const nodemailer = require("nodemailer");

const userGmail = "securekali85@gmail.com";
const passAppGmail = "gcsw kcxw rhrd klwy";

const emailHelper = async (to, text) => {
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
    to: to,
    subject: 'Confirmación de Reserva de Sala en MeetHub',
    text: text,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email enviado: " + info.response);
    return info;
  } catch (error) {
    console.error("Error enviando email:", error);
    throw error;
  }
}
module.exports = emailHelper;