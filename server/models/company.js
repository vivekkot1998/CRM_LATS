const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const companySchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        require: true
    },
    avatarUrl: {
        type: String,
        required: true
    },
    salesOwner: {
        type: Schema.Types.ObjectId,
        //type: String,
        ref: 'User'
    },
    address: {
        type: String,
        required: false
    },
    address1: {
        type: String,
        required: false
    },
    address2: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    postcode: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: false
    },
    notes: {
        totalCount: {
            type: String,
            required: false
        },
        nodes: [{
            type: Schema.Types.ObjectId,
            ref: 'CompanyNote'
        }]
    },
    deals: {
        totalCount: {
            type: String,
            required: false
        },
        nodes: [{
            type: Schema.Types.ObjectId,
            ref: 'Deal'
        }]
    }
});


module.exports = mongoose.model('Company', companySchema);