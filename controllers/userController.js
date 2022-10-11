const User = require('../models/User');
const Thought = require('../models/Thought');

module.exports = {
  //find all users
  getUsers(req, res) {
    User.find({})
      .then((users) => res.json(users))
      .catch((err) => console.log(err));
  },
  //find single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  //update existing user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
    //remove a user
    //TODO: test this
    removeUser(req, res) {
      User.findOneAndRemove({ _id: req.params.userId })
        .then((user) => {
          if (!user) {
            res.status(404).json({ message: 'No user with this id!' })
          }
          else {
            Thought.deleteMany ({username: user.username});
            res.json({ message: 'User and associated thoughts successfully deleted!' });
          }
        }
          // !user
          //   ? res.status(404).json({ message: 'No user with this id!' })
          //   : res.json({ message: 'User successfully deleted!' })
        )
        // .catch((err) => res.status(500).json(err));
        .catch(err => console.log(err))
    },
  //add a friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      {_id: req.params.userId},
      {$push: {friends: req.params.friendId}},
      { new: true, runValidators: true}
    )
    .then( (user) => {
      !user 
        ? res.status(404).json({ message: 'No user with this id!' })
        : res.json(user)
    })
    .catch((err) => res.status(500).json(err));
  },
  //remove a friend
  removeFriend(req, res) {
    User.findOneAndUpdate(
      {_id: req.params.userId},
      {$pull: { friends: req.params.friendId}},
      {new: true}
    )
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
  }
};