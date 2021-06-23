//Creacion del controlador
const blogCtrl = {};

//Vista general de los blogs
blogCtrl.renderBlog = (req, res) => {
    if (req.user){
        if (req.user.tipo_cuenta === 'Empresa'){
            const empresa = req.user.tipo_cuenta;
            res.render('./blog/blog', {empresa})        
        }

    }
    res.render('./blog/blog')
};

//Vista de detalle de blog
blogCtrl.renderBlogDetalles = (req, res) => {
    if (req.user){
        if (req.user.tipo_cuenta === 'Empresa'){
            const empresa = req.user.tipo_cuenta;
            res.render('./blog/detalles-blog', {empresa})        
        }

    }
    res.render('./blog/detalles-blog')
};

//Vista términos y condiciones
blogCtrl.renderTerminosYCondiciones = (req, res) => {
    if (req.user){
        if (req.user.tipo_cuenta === 'Empresa'){
            const empresa = req.user.tipo_cuenta;
            res.render('./blog/terminos-y-condiciones', {empresa})        
        }

    }
    res.render('./blog/terminos-y-condiciones')
};

//Vista políticas de privacidad
blogCtrl.renderPoliticaDePrivacidad = (req, res) => {
    if (req.user){
        if (req.user.tipo_cuenta === 'Empresa'){
            const empresa = req.user.tipo_cuenta;
            res.render('./blog/politica-de-privacidad', {empresa})        
        }

    }
    res.render('./blog/politica-de-privacidad')
};


//Vista políticas de freelance26
blogCtrl.renderPoliticasDeFreelance26 = (req, res) => {
    if (req.user){
        if (req.user.tipo_cuenta === 'Empresa'){
            const empresa = req.user.tipo_cuenta;
            res.render('./blog/politicas-de-freelance26', {empresa})        
        }

    }
    res.render('./blog/politicas-de-freelance26')
};

//Exportando modulo
module.exports = blogCtrl;