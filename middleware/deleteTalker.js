const fs = require('fs/promises');

const deleteTalker = async (req, res) => {
  const talkers = await fs.readFile('./talker.json', 'utf8');
  const talkersParsed = JSON.parse(talkers);
  const { id } = req.params;

  const talkerIndex = talkersParsed.findIndex((talker) => talker.id === Number(id));

  talkersParsed.splice(talkerIndex, 1);

  await fs.writeFile('./talker.json', JSON.stringify(talkersParsed));

  return res.status(204).json();
};

module.exports = deleteTalker;