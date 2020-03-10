const {Schema, model} = require('mongoose');

const schema = new Schema({
    title: { type: String, required: true , unique: true},
    src: {type: String, required: true, unique: true }
});

module.exports = model('CI', schema);