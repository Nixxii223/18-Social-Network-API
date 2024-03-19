const { User } = require('../models');

module.exports = {
    async getAllUsers(req, res) {
        try {
            const users = await User.find({});
            res.json(users);
            console.log(users);
        } catch (err) {
            console.error(err);
            res.status(400).json(err);
        }
    },

    async getUserById({ params }, res) {
        try {
            const user = await User.findOne({ _id: params.id });
            res.json(user);
            console.log(user);
        } catch (err) {
            console.error(err);
            res.status(400).json(err);
        }
    },

    async createUser({ body }, res) {
        try {
            const user = await User.create(body);
            res.json(user);
            console.log(user);
        } catch (err) {
            console.error(err);
            res.status(400).json(err);
        }
    },
    
    async deleteUser({ params }, res) {
        try {
            const user = await User.findOneAndDelete({ _id: params.id });
            res.json(user);
            console.log(user);
        } catch (err) {
            console.error(err);
            res.status(400).json(err);
        }
    },

    async updateUser({ params, body }, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: params.id },
                body, { new: true, runValidators: true });
            res.json(user);
            console.log(user);
        } catch (err) {
            console.error(err);
            res.status(400).json(err);
        }
    },

    async addFriend({ params }, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: params.userId },
                { $addToSet: { friends: params.friendId } },
                { new: true }
            );
            res.json(user);
            console.log(user);
        } catch (err) {
            console.error(err);
            res.status(400).json(err);
        }
    },

    async deleteFriend({ params }, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { friends: params.friendId } },
                { new: true }
            );
    
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
    
            res.json(user);
            console.log(user);
        } catch (err) {
            console.error(err);
            res.status(400).json(err);
        }
    }
};    
