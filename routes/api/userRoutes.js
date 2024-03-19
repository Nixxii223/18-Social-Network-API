const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

// Route to get all users and create a new user
router.route('/')
    .get(getAllUsers)
    .post(createUser);

// Route to get, update, and delete a user by ID
router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// Route to add and delete a friend for a user
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;