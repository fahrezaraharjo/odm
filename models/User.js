const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
            match: /.+\@.+\..+/
        },
        todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }]
    },
    {
        timestamps: true
    });

module.exports = mongoose.model('User', userSchema);