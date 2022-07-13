// get all users
// get a single user by its _id and populated thought and friend data
// post a new user
// put to update a user by its _id
// delete to remove user by its _id

// /api/users/:userId/friends/:friendId
    //POST to add a new friend to a user's friend list
    //DELETE to remove a friend from a user's friend list

    const router = require('express').Router();

    const {
        allUsersGet,
        idUsersGet,
        usersCreate,
        idUsersUpdate,
        idUsersDelete,
        friendAdd,
        friendDelete
    
    } = require('../../controllers/users-controller');
    
    // get all users
    // post a new user
    router
      .route('/')
      .get(allUsersGet)
      .post(usersCreate);
    
    // get a single user by its _id and populated thought and friend data
    // put to update a user by its _id
    // delete to remove user by its _id
    router
      .route('/:id')
      .get(idUsersGet)
      .put(idUsersUpdate)
      .delete(idUsersDelete);

    //POST to add a new friend to a user's friend list
    //DELETE to remove a friend from a user's friend list
    router 
        .route('/:id/friends/:friendId')
        .post(friendAdd)
        .delete(friendDelete);
    
    module.exports = router;