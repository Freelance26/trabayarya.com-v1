const {Schema, model} = require('mongoose');

const TestSchema = new Schema({
    fecha: { type: Date, required: true},

    },
    {
        timestamps: true
    }
);

module.exports = model('TestDate', TestSchema)