/* allUsersGet,
        idUsersGet,
        usersCreate,
        idUsersUpdate,
        idUsersDelete,
        friendAdd,
        friendDelete */

const { Users } = require('../models');

const usersController = {

    // allUsersGet
    allUsersGet(req, res) {
        Users.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUsersData => res.json(dbUsersData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    //idUsersGet
    idUsersGet({params}, res) {
        Users.findOne({_id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUsersData => {
                if(!dbUsersData) {
                    res.status(404).json({message: 'No User with this ID!'});
                    return;
                }
                res.json(dbUsersData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },

    //usersCreate
    usersCreate({body}, res) {
        Users.create(body)
            .then(dbUsersData => res.json(dbUsersData))
            .catch(err => res.status(400).json(err));
    },

    //idUsersUpdate
        idUsersUpdate({params, body}, res) {
            Users.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
                .then(dbUsersData => {
                    if(!dbUsersData) {
                        res.status(404).json({message: 'No User with this ID!'});
                        return;
                    }
                    res.json(dbUserData);
                })
                .catch(err => res.json(err))
        },

    //idUsersDelete
    idUsersDelete({params}, res) {
        Users.findOneAndDelete({_id: params.id})
            .then(dbUsersData => {
                if(!dbUsersData) {
                    res.status(404).json({message: 'No User with this ID!'});
                    return;
                }
                res.json(dbUsersData);
            })
            .catch(err => res.status(400).json(err));
    },

    //friendAdd
    friendAdd({params}, res) {
        Users.findOneAndUpdate({_id: params.id}, {$push: { friends: params.friendId}}, {new: true})
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUsersData => {
                if (!dbUsersData) {
                    res.status(404).json({message: 'No User with this ID!'});
                    return;
                }
                res.json(dbUsersData);
            })
            .catch(err => res.json(err));
    },

    //friendDelete
    friendDelete({ params }, res) {
        Users.findOneAndUpdate({_id: params.id}, {$pull: { friends: params.friendId}}, {new: true})
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUsersData => {
                if(!dbUsersData) {
                    res.status(404).json({message: 'No User with this ID!'});
                    return;
                }
                res.json(dbUsersData);
            })
            .catch(err => res.status(400).json(err));
    }

};

module.exports = usersController;
