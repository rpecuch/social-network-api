const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;

//TODO:
    //get all users works but none of them have associated thoughts or friends
    //delete reaction needs to be fixed

    //delete thought works but see if you can figure out how to remove from associated user


//update user, remove user, create user, single user good
//add friend, remove friend good
//get all thoughts, sinlge thought, new thought, update thought good
//new reaction good
