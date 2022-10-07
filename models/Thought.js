const { Schema, Types } = require('mongoose');
const Reaction = require('./Reaction');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //use a getter method to format the timestamp on query
    },
    username: {
        type: String,
        required: true
    },
    reactions: [Reaction]
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false
  }
);

// Virtual property that counts the number of reactions for the thought
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;