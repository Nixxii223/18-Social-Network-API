const { User, Thought } = require('../models');

module.exports = {
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find({});
            res.json(thoughts);
        } catch (err) {
            console.error(err);
            res.status(400).json(err);
        }
    },

    async getThoughtById({ params }, res) {
        try {
            const thought = await Thought.findOne({ _id: params.id });
            res.json(thought);
        } catch (err) {
            console.error(err);
            res.status(400).json(err);
        }
    },

    async createThought({ body }, res) {
        try {
            const thought = await Thought.create(body);
            const user = await
            User.findOneAndUpdate(thought.userId, { $push: { thoughts: thought._id } }, { new: true });
            res.json(thought);
        } catch (err) {
            console.error(err);
            res.status(400).json(err);
            }
        },

    async updateThought({ params, body }, res) {
        try {
            const thought = await Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true });
            res.json(thought);
        } catch (err) {
            console.error(err);
            res.status(400).json(err);
        }
    },

    async deleteThought({ params }, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: params.id });
            const user = await User.findOneAndUpdate(thought.userId, { $pull: { thoughts: thought._id } }, { new: true });
            res.json(thought);
        } catch (err) {
            console.error(err);
            res.status(400).json(err);
        }
    },
};