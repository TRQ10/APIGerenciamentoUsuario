import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import optGenerator from 'otp-generator';
import validator from 'validator';
import UserModel from '../model/User.model.js';

dotenv.config();

const jwt_secret = process.env.JWT_SECRET;

/** middleware para verificar o usuário  */
export async function verificarUsuario(req, res, next) {
  try {
    const { usuario } = req.method == 'GET' ? req.query : req.body;

    // Checar se usuário existe
    let existe = await UserModel.findOne({ usuario });
    if (!existe)
      return res
        .status(404)
        .send({ error: 'Não foi possivel encontrar o usuário!' });
    next();
  } catch (error) {
    return res.status(404).send({ error: 'Autenticação falhou' });
  }
}

/** POST: http://localhost:8080/teste/register
 * @param : {
 * "usuario": "exemplo123",
 * "senha": "admin123",
 * "email": "exemplo123@gmail.com",
 * "nome": "tiago",
 * "sobrenome": "roque",
 * "celular": 2198603350,
 * "perfil": ""
 * }
 */

// Função que gera o registerTokne de verificação
const generateVerificationToken = () => {
  const token = jwt.sign({}, jwt_secret, { expiresIn: '24h' });
  return token;
};

export async function register(req, res) {
  try {
    const { usuario, senha, perfil, email } = req.body;

    // Checar se todos os campos estão preenchidos.
    if (!usuario || !senha || !email) {
      return res
        .status(400)
        .send({ error: 'Todos os campos devem ser preenchidos' });
    }

    // Checar se usuario já existe
    const usuarioExiste = await UserModel.findOne({ usuario });
    if (usuarioExiste) {
      return res
        .status(400)
        .send({ error: 'Por favor utilize um usuário único' });
    }

    // Checar se email já existe
    const emailExiste = await UserModel.findOne({ email });
    if (emailExiste) {
      return res
        .status(400)
        .send({ error: 'Por favor utilize um Email único' });
    }

    // Checa se o email é válido
    if (!validator.isEmail(email)) {
      return res.status(400).send({ error: 'Email inválido' });
    }

    // Checa o quão forte é a senha
    if (!validator.isStrongPassword(senha)) {
      return res.status(400).send({
        error:
          'A senha deve conter no mínimo 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial',
      });
    }

    // Cryptografar a senha
    if (senha) {
      try {
        const senhaHashed = await bcrypt.hash(senha, 10);

        const verificationToken = generateVerificationToken();
        console.log('verificationToken', verificationToken)

        const user = new UserModel({
          usuario,
          senha: senhaHashed,
          perfil: perfil || '',
          email,
          verified: false, // Inicialmente marca o email como não verificado
          verificationToken, // Guarda o token de verificação no modelo do usuário.
        });

        // Salvar o usuário e enviar uma response
        const result = await user.save();
        return res
          .status(201)
          .send({ msg: 'Usuário registrado com sucesso' });
      } catch (error) {
        return res
          .status(500)
          .send({ error: 'Habilite senha com Hash' });
      }
    }
  } catch (error) {
    return res.status(500).send({ error });
  }
}

export async function verifyEmail(req, res) {
  const { token } = req.query;

  try {
    // Verifica o verificationToken
    const decoded = jwt.verify(token, jwt_secret);

    // Encontra o usuário com o verificationToken
    const user = await UserModel.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).send({ error: 'Token de verificação inválido' });
    }

    // Atualiza os status de verificação do usuário e remove o token de verificação
    user.verified = true;
    user.verificationToken = null;
    await user.save();

    return res.status(200).send({ msg: 'Email verificado com sucesso' });
  } catch (error) {
    return res.status(400).send({ error: 'Token de verificação inválido' });
  }
}

/** POST: http://localhost:8080/teste/login
 * @param: {
 * "usuario": "exemplo123",
 * "senha": "admin123"
 * }
 */
export async function login(req, res) {
  const { usuario, senha } = req.body;

  try {
    UserModel.findOne({ usuario })
      .then((user) => {
        if (!user) {
          return res
            .status(404)
            .send({ error: 'Usuário não encontrado' });
        }

        bcrypt
          .compare(senha, user.senha)
          .then((verificadorDeSenha) => {
            if (!verificadorDeSenha) {
              return res
                .status(400)
                .send({ error: 'Senha inválida' });
            }

            // Create JWT token
            const token = jwt.sign(
              {
                userId: user._id,
                usuario: user.usuario,
              },
              jwt_secret,
              { expiresIn: '24h' }
            );

            return res.status(200).send({
              msg: 'Logado com sucesso...!',
              usuario: user.usuario,
              token,
            });
          })
          .catch((error) => {
            return res
              .status(400)
              .send({ error: 'Falha na comparação da senha' });
          });
      })
      .catch((error) => {
        return res
          .status(404)
          .send({ error: 'Usuário não encontrado' });
      });
  } catch (error) {
    return res
      .status(500)
      .send({ error: 'Não foi possível fazer o login' });
  }
}

/** GET: http://localhost:8080/teste/user/exemplo123 */
export async function getUser(req, res) {
  const { usuario } = req.params;

  try {
    if (!usuario)
      return res.status(501).send({ error: 'Usuário inválido' });

    const user = await UserModel.findOne({ usuario }).exec();
    if (!user)
      return res
        .status(501)
        .send({ error: 'Não foi possível encontrar o usuário' });

    // Remove senha do objeto user
    const { senha, verificationToken, ...rest } = user.toObject();

    // Checa se o token foi gerado com sucesso
    const tokenGenerated = !!verificationToken;
    rest.tokenGenerated = tokenGenerated;

    return res.status(201).send(rest);
  } catch (error) {
    return res
      .status(404)
      .send({ error: 'Não foi possível encontrar informações' });
  }
}

/** PUT: http://localhost:8080/teste/updateUser 
 * @param: {
 * "id": "<userid>"
 * }
 body: {
    nome: '',
    perfil: ''
 }
*/
export async function updateUser(req, res) {
  try {
    const { userId } = req.user;

    if (userId) {
      const body = req.body;

      // Atualizar dados
      await UserModel.updateOne({ _id: userId }, body).exec();

      return res
        .status(201)
        .send({ msg: 'Informações atualizadas...!' });
    } else {
      return res
        .status(401)
        .send({ error: 'Usuário não encontrado...!' });
    }
  } catch (error) {
    return res.status(401).send({ error });
  }
}

/** GET: http://localhost:8080/teste/generateOTP */
export async function generateOTP(req, res) {
  req.app.locals.OTP = await optGenerator.generate(7, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  res.status(201).send({ code: req.app.locals.OTP });
}

/** GET: http://localhost:8080/teste/verifyOTP */
export async function verifyOTP(req, res) {
  const { code } = req.query;
  if (parseInt(req.app.locals.OTP) === parseInt(code)) {
    req.app.locals.OTP = null; // Reseta o valor da OTP
    req.app.locals.resetSession = true; // Começar sessão para resetar a senha
    return res.status(200).send({ msg: 'Verificado com sucesso!' });
  }
  return res.status(400).send({ error: 'OTP inválida' });
}

// Irá redirecionar com sucesso o usúario quando OTP for válido
/** GET: http://localhost:8080/teste/createResetSession */
export async function createResetSession(req, res) {
  if (req.app.locals.resetSession) {
    return res
      .status(201)
      .send({ flag: req.app.locals.resetSession }); // Permitir acesso a essa rota apenas uma vez.
  }
  return res.status(440).send({ error: 'Sessão expirada!' });
}

// Atualiza a senha quando a sessão for válida
/** PUT: http://localhost:8080/teste/resetPassword */

export async function resetPassword(req, res) {
  try {
    if (!req.app.locals.resetSession) {
      return res.status(440).send({ error: 'Sessão expirada!' });
    }

    const { usuario, senha } = req.body;

    const user = await UserModel.findOne({ usuario });
    if (!user) {
      return res
        .status(404)
        .send({ error: 'Usuário não encontrado...' });
    }

    const senhaHashed = await bcrypt.hash(senha, 10);

    await UserModel.updateOne(
      { usuario: user.usuario },
      { senha: senhaHashed }
    );

    req.app.locals.resetSession = false; // Resetar sessão

    return res.status(201).send({ msg: 'Dados atualizados...!' });
  } catch (error) {
    return res
      .status(500)
      .send({ error: 'Falha ao redefinir senha' });
  }
}
