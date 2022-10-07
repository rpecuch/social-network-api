const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser);

//api/users/:userId/:friendId
router.route('/:userId/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;