const router = require('express').Router();
const apiRoutes = require('./api');
// use imported api routes
router.use('/api', apiRoutes);
// otherwise wrong route
router.use((req, res) => {
  return res.send('Wrong route!');
});

module.exports = router;