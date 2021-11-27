const mongoose = require('mongoose');

const schemaUser = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    puesto: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Cliente', schemaUser);