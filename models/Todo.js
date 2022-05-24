const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    title: String,
    complete: {
        type: Boolean,
        default: false
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Todo', todoSchema);