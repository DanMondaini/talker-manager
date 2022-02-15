const fs = require('fs');

const getTalker = (req, res) => {
    const talker = fs.readFileSync('./talker.json', 'utf8');

  if (talker.length === 0) return res.status(200).send([]);

  return res.status(200).send(JSON.parse(talker));
};

module.exports = getTalker;