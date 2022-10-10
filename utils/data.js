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

//generate user data
const generateUser = (names) => {
    let results = [];
    for (let i=0; i<names.length; i++) {
        results.push({
            username: names[i],
            email: `${names[i]}@gmail.com`
        })
    }
    return results;
}

// Function to generate random thoughts to add to database (includes reactions)
const getRandomThoughts = (int) => {
    let results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        thoughtText: getRandomArrItem(thoughts),
        username: getRandomArrItem(names),
        reactions: [...getReactions(2)],
      });
    }
    return results;
  };

// Create the reactions that will be added to each video
const getReactions = (int) => {
    let results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        reactionBody: getRandomArrItem(possibleReactions),
        username: getRandomArrItem(names),
      });
    }
    return results;
  };

  module.exports = { names, generateUser, getRandomThoughts };

