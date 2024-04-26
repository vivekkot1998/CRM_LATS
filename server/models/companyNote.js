const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const companyNoteSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    },
    createdBy:  {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    }
});

module.exports = mongoose.model('CompanyNote', companyNoteSchema);