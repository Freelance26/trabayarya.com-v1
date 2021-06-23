const {Schema, model} = require('mongoose');

const CategoriasSchema = new Schema({
    nombre: { type: String, required: true}
});

module.exports = model('Categorias', CategoriasSchema)
