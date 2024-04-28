const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dealStageSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('DealStage', dealStageSchema);