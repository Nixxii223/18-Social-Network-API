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
            const thought = await Thought.findOne({ _id: params.thoughtId });
            res.json(thought);
        } catch (err) {
            console.error(err);
            res.status(400).json(err);
        }
    },

    async createThought({ body }, res) {
        try {
            const thought = await Thought.create(body);
            await User.findOneAndUpdate({ _id: thought.userId }, { $push: { thoughts: thought._id } }, { new: true });
            res.json(thought);
        } catch (err) {
            console.error(err);
            res.status(400).json(err);
        }
    },

    async updateThought({ params, body }, res) {
        try {
            const thought = await Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true, runValidators: true });
            res.json(thought);
        } catch (err) {
            console.error(err);
            res.status(400).json(err);
        }
    },

    async deleteThought({ params }, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: params.thoughtId });
    
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
    
            await User.findOneAndUpdate({ _id: thought.userId }, { $pull: { thoughts: thought._id } }, { new: true });
    
            return res.json(thought);
        } catch (err) {
            console.error(err);
            return res.status(400).json(err);
        }
    },
    
    async addReaction({ params, body }, res) {
        console.log('params:', params);
        console.log('body:', body);
    
        try {
            const thought = await Thought.findOne({ _id: params.thoughtId });
            console.log('Fetched thought:', thought);
    
            if (!thought) {
                console.log('No thought found with this id:', params.thoughtId);
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
    
            const updatedThought = await Thought.findOneAndUpdate({ _id: params.thoughtId }, { $push: { reactions: body } }, { new: true, runValidators: true });
            console.log('Updated thought:', updatedThought);
            res.json(updatedThought);
        } catch (err) {
            console.error('Error:', err);
            res.status(400).json(err);
        }
    },

    async deleteReaction({ params }, res) {
        try{
            const thought = await Thought.findOneAndUpdate({ _id: params.thoughtId }, { $pull: { reactions: { reactionId: params.reactionId } } }, { new: true });
            res.json(thought);
        } catch (err) {
            console.error(err);
            res.status(400).json(err);
        } 
    }
};