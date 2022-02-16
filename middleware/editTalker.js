const fs = require('fs/promises');

const editTalker = async (req, res) => {
  try {
    const talkers = await fs.readFile('./talker.json', 'utf8');
    const talkersParsed = JSON.parse(talkers);
    const talker = req.body;
    const { id } = req.params;

    const talkerIndex = talkersParsed.findIndex((talk) => talk.id === Number(id));

    talkersParsed[talkerIndex] = { id: Number(id), ...talker };

    await fs.writeFile('./talker.json', JSON.stringify(talkersParsed));

    return res.status(200).json(talkersParsed[talkerIndex]);
  } catch (error) {
    console.error(error);
  }
};
module.exports = editTalker;