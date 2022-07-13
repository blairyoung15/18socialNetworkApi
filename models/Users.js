const { Schema, model } = require('mongoose');


const UsersSchema = new Schema(
    {
        // string, unique, required, trimmed
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        // string, required, unique, must match a valid email address
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
        },
        thoughts: [
            {
            type: Schema.Types.ObjectId,
            ref: 'Thoughts'
        }
    ],
        friends: [
            {
            type: Schema.Types.ObjectId,
            ref: 'Users'
        }
    ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
    }
);

// get total count of friends and replies on retrieval
UsersSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const Users = model('Users', UsersSchema);

module.exports = Users;
