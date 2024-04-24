const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const companySchema = new Schema({
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
    }
});


module.exports = mongoose.model('Company', companySchema);