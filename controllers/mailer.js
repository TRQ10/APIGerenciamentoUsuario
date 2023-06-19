import dotenv from 'dotenv';
import Mailgen from 'mailgen';
import nodemailer from 'nodemailer';
import UserModel from '../model/User.model.js';

dotenv.config();

const { SENHA, EMAIL, EGMAIL, SGMAIL } = process.env;

// Configurar os transporters para Gmail ou Outlook
const gmailTransporter = nodemailer.createTransport({
  // Configuração Gmail SMTP
  service: 'gmail',
  auth: {
    user: EGMAIL,
    pass: SGMAIL,
  },
});

const outlookTransporter = nodemailer.createTransport({
  // Configuração Outlook SMTP
  host: 'smtp-mail.outlook.com',
  port: 587,
  secure: false,
  auth: {
    user: EMAIL,
    pass: SENHA,
  },
});

/**
 * Determina o serviço de email baseado no endereço de email do usuário.
 * Checa se o email do usuário termina ou com "gmail.com" ou "outlook.com".
 */
function getEmailService(userEmail) {
  if (userEmail.endsWith('gmail.com')) {
    return 'gmail';
  } else if (
    userEmail.endsWith('outlook.com') ||
    userEmail.endsWith('hotmail.com')
  ) {
    return 'outlook';
  } else {
    // Gmail é o padrão caso a função não consiga determinar o serviço de email.
    return 'gmail';
  }
}

let transporter;

const MailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: 'Mailgen',
    link: 'https://mailgen.js/',
  },
});

/** POST: http://localhost:8080/teste/registerMail 
   * @param: {
    "usuario" : "example123",
    "userEmail" : "admin123",
    "texto" : "",
    "assunto" : "",
  }
  */
export const registerMail = async (req, res) => {
  const { usuario, userEmail, texto, assunto } = req.body;

  const user = await UserModel.findOne({ email: userEmail });
  if (!user || !user.verified) {
    return res.status(400).send({ error: 'Email não verificado' });
  }

  // Corpo do Email
  var email = {
    body: {
      name: usuario,
      intro:
        texto ||
        'Bem vindo a API teste, se recebeu este email é por que está funcionando.',
      outro: 'Obrigado por participar deste teste!',
    },
  };

  var emailBody = MailGenerator.generate(email);

  let message = {
    from: EMAIL,
    to: userEmail,
    subject: assunto || 'Cadastro bem sucessido',
    html: emailBody,
  };

  // Determina o serviço de email baseado no endereço de email do usuário.
  const emailService = getEmailService(userEmail);

  // Verifica se o serviço de email é suportado
  if (emailService === 'gmail') {
    transporter = gmailTransporter;
  } else if (
    emailService === 'outlook' ||
    emailService === 'hotmail'
  ) {
    transporter = outlookTransporter;
  } else {
    return res
      .status(400)
      .send({
        error:
          'Serviço de email não suportado, use Gmail ou Outlook/Hotmail',
      });
  }

  // Envia o Email
  transporter
    .sendMail(message)
    .then(() => {
      return res
        .status(200)
        .send({ msg: 'Você deve receber um email da gente.' });
    })
    .catch((error) => res.status(500).send({ error }));
};
