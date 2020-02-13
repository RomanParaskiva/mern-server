const {Schema, model} = require('mongoose');

const schema = new Schema({
    id: { type: Number, unique: true, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    tags: { type: Object },
    imgs: {type: Object},
    pathToFile: {type: String, required: true},
    likes: {type: Number},
    downloads: {type: Number}
});

module.exports = model('Item', schema);