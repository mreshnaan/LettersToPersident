import mongoose from 'mongoose';



const schema = new mongoose.Schema({

    facebookID: String,
    name: String,
    email: { String, unique: true, required: true },
    accessToken: String,
    Post: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    isPublic: Boolean,





}, {
    timestamps: true
})

export = mongoose.model('User', schema);
