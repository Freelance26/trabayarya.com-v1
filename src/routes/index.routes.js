//Modulos requeridos
const express = require('express');
const router = express.Router();

//Controladore
const { renderIndex,
        renderContacto } = require('../controllers/index.controller')

//Ruta Index
router.get('/', renderIndex);

//Ruta Contacto
router.get('/contacto', renderContacto);

//Exportando modulo
module.exports = router;