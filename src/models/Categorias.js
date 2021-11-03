const {Schema, model} = require('mongoose');

const CategoriasSchema = new Schema({
    nombre: { type: String, required: true},
    number: { type: String, required: true},
});

CategoriasSchema.index({ number: 1 });
module.exports = model('Categorias', CategoriasSchema)
