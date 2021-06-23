const {Schema, model} = require('mongoose');

const JobsSchema = new Schema({
    id_user: {type: String, required: true},
    titulo_trabajo: { type: String, required: true},
    email: {type: String, required: true},
    tipo_trabajo: {type: String, required: true},
    ubicacion: {type: String, required: true},
    salario: {type: String, required: true},
    cat_trabajo: {type: String, required: true},
    etiqueta: { type: String },
    url: {type: String},
    descripcion: {type: String, required: true},
    perfil_img: {type: String},
    resp_: {type: String},
    resp_1: {type: String},
    resp_2: {type: String},
    resp_3: {type: String},
},
    {
        timestamps: true
    });

module.exports = model('Jobs', JobsSchema)
