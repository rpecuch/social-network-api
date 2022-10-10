const { Schema, Types } = require('mongoose');
const Reaction = require('./Reaction');
const moment = require('moment');

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
      get: formatDate
    },
    username: {
        type: String,
        required: true
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

// const date = 'Sep 16 2011 19:05:17';

//use a getter method to format the timestamp on query
function formatDate(date) {
  const formattedDate = moment(date, 'MMM DD YYYY hh:mm:ss').format('MM-DD-YYYY [at] hh:mm A');
  // return formattedDate;
  console.log(formattedDate);
}

// formatDate(date);

// Virtual property that counts the number of reactions for the thought
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;