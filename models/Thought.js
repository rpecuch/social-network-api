const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');
const moment = require('moment');

// Schema to create thought model
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
      // format date for display
      get: (createdAtVal) => moment(createdAtVal).format('MMM DD YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        required: true,
        ref: 'user'
    },
    reactions: [Reaction]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
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