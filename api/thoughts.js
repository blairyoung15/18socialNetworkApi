// get to get all thoughts
// get to get a single thought by its _id
// POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
// PUT to update a thought by its _id
// DELETE to remove a thought by its _id

///api/thoughts/:thoughtId/reactions
//POST to create a reaction stored in a single thought's reactions array field
//DELETE to pull and remove a reaction by the reaction's reactionId value

const router = require('express').Router();

const {
    allThoughtsGet,
    idThoughtsGet,
    thoughtsCreate,
    idThoughtsUpdate,
    idThoughtsDelete,
    reactionCreate,
    reactionDelete

} = require('../../controllers/thoughts-controller');

// get to get all thoughts
router
    .route('/')
    .get(allThoughtsGet);

// get to get a single thought by its _id
// PUT to update a thought by its _id
// DELETE to remove a thought by its _id
router
    .route('/:id')
    .get(idThoughtsGet)
    .put(idThoughtsUpdate)
    .delete(idThoughtsDelete);

// POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
router
    .route('/:userId')
    .post(thoughtsCreate);

//POST to create a reaction stored in a single thought's reactions array field
router
    .route('/:thoughtId/reactions')
    .post(reactionCreate);

//DELETE to pull and remove a reaction by the reaction's reactionId value
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(reactionDelete);

module.exports = router;