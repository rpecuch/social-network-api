const router = require('express').Router();
// import specific api routes
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');
// /api/
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;
