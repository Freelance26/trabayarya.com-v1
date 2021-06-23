//Modulos requeridos
const express = require('express');
const router = express.Router();

//Controlador
const  { renderBlog, 
         renderBlogDetalles,
         renderPoliticaDePrivacidad,
         renderTerminosYCondiciones,
         renderPoliticasDeFreelance26 } = require('../controllers/blog.controller');

//Ruta Blogs
router.get('/blog', renderBlog);

//Ruta Blog
router.get('/blog/article/:id', renderBlogDetalles);

//Ruta Política de privacidad
router.get('/blog/politica-de-privacidad', renderPoliticaDePrivacidad);

//Ruta Términos y condiciones
router.get('/blog/terminos-y-condiciones', renderTerminosYCondiciones);

//Ruta Políticas de freelance26
router.get('/blog/politicas-de-freelance26', renderPoliticasDeFreelance26);

//Exportando modulo
module.exports = router;