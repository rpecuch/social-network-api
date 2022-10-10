const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function(v) {
        return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
        }
     }
    },
    thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'thought',
        },
      ],
    //array of _id values referencing user model (self-reference)
    // friends: [
    //     {
    //       type: Schema.Types.ObjectId,
    //       ref: 'user',
    //     },
    //   ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Virtual property that counts the number of friends for the user
// userSchema.virtual('friendCount').get(function () {
//     return this.friends.length;
//   });

const User = model('user', userSchema);

module.exports = User;