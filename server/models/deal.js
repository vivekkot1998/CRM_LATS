const mongoose = require('mongoose');
const company = require('./company');
const Schema = mongoose.Schema;

const dealSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: false
    },
    stageId: {
        type: String,
        required: false
    },
    companyId: {
        type: String,
        required: true
    },
    dealOwnerId: {
        type: String,
        required: true
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    },
    dealOwner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Deal', dealSchema);