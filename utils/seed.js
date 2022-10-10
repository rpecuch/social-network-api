const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomThought, getRandomName, getReactions } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  //drop existing thoughts and users
  await Thought.deleteMany({});
  await User.deleteMany({});

  const thoughts = [];
  for (let i=0; i<3; i++) {
    const reactions = getReactions(2);
    const thoughtText = getRandomThought();
    const username = getRandomName();

    thoughts.push({
      thoughtText,
      username,
      reactions
    })
  }

  // await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughts);

  await User.collection.insertOne({
    username: 'rpecuch',
    email: 'rpecuch@comcast.net'
  })

  await User.collection.insertOne({
    username: 'aljones',
    email: 'aljones@comcast.net'
  })

  console.info('Seeding complete! 🌱');
  process.exit(0);
});