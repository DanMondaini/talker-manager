const fs = require('fs/promises');

const getTalker = async (req, res) => {
  const talker = await fs.readFile('./talker.json', 'utf8');

  if (talker.length === 0) return res.status(200).send([]);

  return res.status(200).send(JSON.parse(talker));
};

module.exports = getTalker;