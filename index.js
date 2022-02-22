const express = require('express');
const bodyParser = require('body-parser');
const getTalker = require('./middleware/getTalker');
const getTalkerById = require('./middleware/getTalkerById');
const { 
  verifyIfLoginAndPasswordAreNotEmpety,
  validatePassword,
  validateEmailMid,
  login,
} = require('./middleware/login');
const {
  validateToken,
  validateName,
  validateAge,
  talkWatchedAtAndRateNotEmpety,
  validateWatchedAt,
  validateRate,
  registerTalk,
} = require('./middleware/addTalker');

const editTalker = require('./middleware/editTalker');

const deleteTalker = require('./middleware/deleteTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', getTalker);

app.get('/talker/:id', getTalkerById);

app.post('/login', verifyIfLoginAndPasswordAreNotEmpety, validatePassword, validateEmailMid, login);

app.post('/talker',
  validateToken,
  validateName,
  validateAge,
  talkWatchedAtAndRateNotEmpety,
  validateWatchedAt,
  validateRate,
  registerTalk);

  app.put('/talker/:id',
  validateToken,
  validateName,
  validateAge,
  talkWatchedAtAndRateNotEmpety,
  validateWatchedAt,
  validateRate,
  editTalker);

  app.delete('/talker/:id', validateToken, deleteTalker);
app.listen(PORT, () => {
  console.log('Online');
});
