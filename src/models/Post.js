const {Schema, model} = require('mongoose');

const PostSchema = new Schema({
    fecha: { type: Date, required: true},
    id_user: { type: String, required: true},
    title: { type: String, required: true},
    categoria: { type: String, required: true},
    contenido: { type: String, required: true},
    id_user: {type: String, required: true}

    },
    {
        timestamps: true
    }
    );

module.exports = model('Post', PostSchema)