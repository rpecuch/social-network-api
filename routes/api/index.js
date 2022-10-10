const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;

//TODO:
    //get all users works but none of them have associated thoughts and id is showing up twice
    //create user works but id is showing up twice
    //single user works but id is showing up twice
    //delete reaction needs to be fixed

    //need to add friend and remove friend

    //delete thought works but see if you can figure out how to remove from associated user


//update and remove user good
//get all thoughts, sinlge thought, new thought, update thought good
//new reaction good
