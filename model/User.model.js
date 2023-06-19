import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  usuario: {
    type: String,
    required: [true, 'Por favor forneça um usuário único.'],
    unique: [true, 'Usuário já existente.'],
  },
  senha: {
    type: String,
    required: [true, 'Por favor forneça um senha.'],
    unique: false,
  },
  email: {
    type: String,
    required: [true, 'Por favor forneça um email.'],
    unique: true,
  },
  nome: { type: String },
  sobrenome: { type: String },
  celular: { type: Number },
  perfil: { type: String },
  verified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    default: '',
  },
});

export default mongoose.model.Users ||
  mongoose.model('User', userSchema);
