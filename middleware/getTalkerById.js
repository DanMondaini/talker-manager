const fs = require('fs/promises');

const getTalkerById = async (req, res) => {
  const talkers = await fs.readFile('./talker.json', 'utf8');
  const { id } = req.params;

  const talkerFound = JSON.parse(talkers).find((talker) => talker.id === Number(id));

  console.log(talkerFound);

  if (!talkerFound) res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(talkerFound);
};

module.exports = getTalkerById;