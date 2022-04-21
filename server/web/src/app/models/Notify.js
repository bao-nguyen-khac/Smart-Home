const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Notify = new Schema({
    key: { type: String },
    data: { type: String },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notify', Notify);
