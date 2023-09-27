const router = require('express').Router();

const userRoutes = require('./user-routes');
const dataRoutes = require('./data_routes');

router.use('/users', userRoutes);
router.use('/db', dataRoutes);

module.exports = router;
