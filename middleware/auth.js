import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const jwt_secret = process.env.JWT_SECRET;

/** Auth middlware */
export default async function Auth(req, res, next) {
  try {
    // Acessar header autorizado para válidar request
    const token = req.headers.authorization.split(' ')[1];

    // Retomar as informações do usuário conectado
    const tokenDecodificado = await jwt.verify(token, jwt_secret);

    req.user = tokenDecodificado;

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Autenticação Falhou!' });
  }
}

export function localVariables(req, res, next) {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };
  next();
}
