const generateToken = require('../utils/generateToken');
const validateEmail = require('../utils/validateEmail');

const verifyIfLoginAndPasswordAreNotEmpety = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const message = !email
      ? 'O campo "email" é obrigatório' : 'O campo "password" é obrigatório';
    return res.status(400).json({ message });
  }

  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

const validateEmailMid = (req, res, next) => {
  const { email } = req.body;
  const validEmail = validateEmail(email);
  if (!validEmail) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const login = (_req, res) => {
  const token = generateToken();

  res.status(200).json({ token });
};

module.exports = {
  verifyIfLoginAndPasswordAreNotEmpety,
  validatePassword,
  validateEmailMid,
  login,
};