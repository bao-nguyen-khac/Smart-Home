const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SmartHumi = new Schema({
    name: { type: String },
    key: { type: String },
    data: { type: String },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SmartHumi', SmartHumi);
