const names = [
    'asmith',
    'abjames',
    'owatson',
    'edkenny',
    'hpotter',
    'jenniferlo',
    'jackjohnson'
]

const thoughts = [
    'You will never believe what happened today!',
    'Feeling excited for my new job!',
    'Saw the craziest thing on my way home today!',
    'Halloween costume ideas?',
    'Ideas for resources to learn coding?',
    'What do you think of this photo?',
    'Any Instagram alternatives you would recommend?',
    'Check out this funny meme!',
    'Birthday ideas?',
    'What team are you watching this weekend?',
    'Check out this awesome video!',
]

const possibleReactions = [
    'That is crazy!',
    'No way!',
    'Message me!',
    'Tell me!',
    'What?!'
]

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomThought = () => getRandomArrItem(thoughts);

const getRandomName = () => getRandomArrItem(names);

// Create the reactions that will be added to each thought
const getReactions = (int) => {
    let results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        reactionBody: getRandomArrItem(possibleReactions),
        username: getRandomName(),
      });
    }
    return results;
  };

  module.exports = { getRandomThought, getRandomName, getReactions };

