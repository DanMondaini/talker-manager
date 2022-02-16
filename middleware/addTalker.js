const fs = require('fs/promises');
const validateDate = require('../utils/validateDate');

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  if (token.length < 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const talkWatchedAtAndRateNotEmpety = (req, res, next) => {
  const { talk } = req.body;

  if (!talk || !talk.watchedAt || talk.rate === undefined) {
      return res.status(400).json(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
  }

  next();
};

const validateWatchedAt = (req, res, next) => {
  const { talk } = req.body;

  if (!validateDate(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const validateRate = (req, res, next) => {
  const { talk } = req.body;

  if (!Number.isInteger(talk.rate) || talk.rate > 5 || talk.rate <= 0) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

const registerTalk = async (req, res) => {
  const talkers = await fs.readFile('./talker.json', 'utf8');
  const talkersParsed = JSON.parse(talkers);
  const talker = req.body;

  const newTalker = {
    id: talkersParsed.length + 1,
    ...talker,
  };

  talkersParsed.push(newTalker);

  await fs.writeFile('./talker.json', JSON.stringify(talkersParsed));

  return res.status(201).json(newTalker);
};

module.exports = {
  validateToken,
  validateName,
  validateAge,
  talkWatchedAtAndRateNotEmpety,
  validateWatchedAt,
  validateRate,
  registerTalk,
};