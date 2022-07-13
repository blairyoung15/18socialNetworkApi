const router = require('express').Router();

const routesUser = require('./users');
const routesThoughts = require('./thoughts');

router.use('/users', routesUser);
router.use('/thoughts', routesThoughts);

module.exports = router;