//Modulos requeridos
const { Router } = require('express');
const app = require('../server');
const router = Router();

//Controladores
const { renderAnunciarTrabajo,
        crearAnuncioTrabajo,
        renderListaTrabajos,
        filtrosTrabajos,
        renderDetallesTrabajo,
        renderListaTrabajosCategorias,
        renderEditarAnuncio,
        actualizarAnuncio,
        eliminarAnuncio } = require('../controllers/jobs.controller');

//Autenticacion
const { isAuthenticated } = require('../helpers/auth')

//Anuncios de Trabajo

//Creacion de Anuncio
router.get('/anunciar-trabajo', isAuthenticated, renderAnunciarTrabajo);
router.post('/anuncio-trabajo/nuevo', isAuthenticated, crearAnuncioTrabajo);

//Editar Anuncio
router.get('/anunciar-trabajo/:id', isAuthenticated, renderEditarAnuncio);
router.put('/anunciar-trabajo/edit/:id', isAuthenticated, actualizarAnuncio);

//Eliminar Anuncio

//router.delete('/anuncio-trabajo/delete/:id', isAuthenticated, eliminarAnuncio);

//Lista de Trabajos
router.get('/lista-trabajos/:page', renderListaTrabajos);
//Lista de Trabajos con filtros
router.post('/lista-trabajos/:page', filtrosTrabajos);

//Lista de Trabajos por Categoria
router.get('/lista-trabajos/categoria/:id', renderListaTrabajosCategorias);

//Detalles de Anuncio
router.get('/detalles-trabajo/:id', renderDetallesTrabajo);

//Exportando modulo
module.exports = router;