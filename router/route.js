import { Router } from 'express';
const router = Router();

/** importar todos os controllers */
import * as controller from '../controllers/appController.js';
import { registerMail } from '../controllers/mailer.js';
import Auth, { localVariables } from '../middleware/auth.js';

/** POST Methods */
router.route('/register').post(controller.register); // Registrar o usuário.
router.route('/authenticate').post(controller.verificarUsuario, (req, res) => res.end()); // Autenticar usuário
router.route('/registerMail').post(registerMail); // Enviar email.
router.route('/login').post(controller.verificarUsuario, controller.login); // Logar na aplicação.

/** GET Methods */
router.route('/user/:usuario').get(controller.getUser); // usuário com username.
router.route('/generateOTP').get(controller.verificarUsuario, localVariables, controller.generateOTP); // Gerar um OTP aleatório.
router.route('/verifyOTP').get(controller.verifyOTP); // Verificar OTP criado.
router.route('/verifyEmail').get(controller.verifyEmail); // Verificar Token
router.route('/createResetSession').get(controller.createResetSession); // resetar todas as variaveis.

/** PUT Methods */
router.route('/updateUser').put(Auth, controller.updateUser); // Usado para atualizar o perfil do usuário.
router.route('/resetPassword').put(controller.verificarUsuario, controller.resetPassword); // Usado para resetar a senha.

export default router;