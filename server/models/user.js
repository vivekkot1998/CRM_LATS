const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatarUrl: {
        type: String,
        required: true
    },
    role: {
        type: String,
        ref: 'Role'
    },
    companies: {
        totalCount: {
            type:String,
            required: true
        },
        nodes: [{
            type: Schema.Types.ObjectId,
            ref: 'Company'
        }] 
    }
});

module.exports = mongoose.model('User', userSchema);