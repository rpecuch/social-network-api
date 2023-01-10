const { Thought, User } = require('../models');

module.exports = {
  //find all thoughts
  getThoughts(req, res) {
    Thought.find({})
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  //get single thought by id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          // if thought found
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        // add new thought to correct user
        return User.findOneAndUpdate(
          { username: req.body.username },
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'Thought created, but found no user with that ID',
            })
            // if user found
          : res.json('Created the thought!')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //update an existing thought, find by id
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          // if thought found
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //remove a thought by id
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) => {
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          // remove from corresponding user if thought exists
          : User.findOneAndUpdate(
            {username: thought.username},
            {$pull: {thoughts: req.params.thoughtId}},
            {new: true}
          )
        })
        .then(() => {
          Thought.findOneAndDelete({_id: req.params.thoughtId});
          res.status(200).json({message: 'Thought successfully deleted and removed from associated user!'})
        })
      .catch((err) => res.status(500).json(err));
  },
  // Add a reaction to a thought, find by id
  addThoughtReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          // if thought exists
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove thought reaction using though and reaction ids
  removeThoughtReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          // if thought exists
          : res.json({ message: 'Reaction successfully deleted!' })
      )
      .catch((err) => res.status(500).json(err));
  },
};