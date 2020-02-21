const {Schema, model} = require('mongoose');

const schema = new Schema({
    title: { type: String, required: true , unique: true,},
    description: { type: String, required: true },
    price: { type: Number, required: true },
    tags: { type: Array },
    imgs: {type: Array},
    pathToFile: {type: String},
    likes: {type: Number},
    date: {type: Date, default: Date.now}
});

module.exports = model('Item', schema);