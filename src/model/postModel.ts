import mongoose from 'mongoose';



const schema = new mongoose.Schema({


    title: String,
    isPublic: Boolean,
    note: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },




}, {
    timestamps: true
})

export = mongoose.model('Post', schema);
