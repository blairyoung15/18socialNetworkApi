const { Schema, model, Types } = require('mongoose');
const dateFormat = require('moment');

// Reactions schema (reactiondid, reactionBody, username, createdAt)

const ReactionsSchema = new Schema(
  {
    // set custom id to avoid confusion with parent comment _id; objectId, default value is set to a new ObjectId
    reactionID: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    // string, required, 280 character maximum
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    // string, required
    username: {
      type: String,
      required: true,
    },
    // date, set default value to current time stamp, use getter method to format the timestamp query
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);


const ThoughtsSchema = new Schema(
  {
      // string, required, must be between 1 and 280 characters
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    // date, set default value to current timestamp, use getter method to format timestamp
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
      // string, required
      username: {
        type: String,
        required: true,
      },
    // use reactionSchema to validate data for a reply
    reactions: [ReactionsSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

ThoughtsSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;