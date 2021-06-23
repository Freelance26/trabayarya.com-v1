const helpers = {};
const User = require('../models/Users')
const Payment = require('../models/Payment')
const PaymentReport = require('../models/PaymentReport')




helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()){
        return next();
    }
    req.flash('error:msg', 'Debe Logearse primero');
    res.redirect('/');
}

helpers.renderPanel = async (req,res) => {
    // const users = await User.find({tipo_cuenta: "Freelancer"}).sort({_id: -1}).limit(3);
    // res.render('administracion', {users});

    if (req.query.buscar_free) {
        if (req.user) {
            const tipo_cuenta = req.user.tipo_cuenta;
            const buscar_free = req.query.buscar_free;
            const xPage = 6;
            const page = req.params.page || 1;
            const applicant = await User.find({ username: { $regex: '.*' + buscar_free + '.*', $options: 'i' }, tipo_cuenta: 'Freelancer' }, function (error, applicant) {
                if (error) {
                    console.log('error en el find')
                }
            })
                .skip((xPage * page) - xPage).limit(xPage).exec((err, applicant) => {
                    User.count({tipo_cuenta: 'Freelancer'}, (err, count) => {
                        if (err) {
                            console.log('error en el conteo')
                        } else {
                            res.render('administracion', { tipo_cuenta, applicant, current: page, pages: Math.ceil(count / xPage) })
                        }
                    })
                })
        } else {
            const buscar_free = req.query.buscar_free;
            const xPage = 6;
            const page = req.params.page || 1;
            const applicant = await User.find({ username: { $regex: '.*' + buscar_free + '.*', $options: 'i' }, tipo_cuenta: 'Freelancer' }, function (error, applicant) {
                if (error) {
                    console.log('error en el find')
                }
            })
                .skip((xPage * page) - xPage).limit(xPage).exec((err, applicant) => {
                    User.count({tipo_cuenta: 'Freelancer'}, (err, count) => {
                        if (err) {
                            console.log('error en el conteo')
                        } else {
                            res.render('administracion', { applicant, current: page, pages: Math.ceil(count / xPage) })
                        }
                    })
                })
        }
    }
    if (req.user) {
        const tipo_cuenta = req.user.tipo_cuenta;
        const xPage = 6;
        const page = req.params.page || 1;
        const applicant = await User.find({ tipo_cuenta: 'Freelancer' }).skip((xPage * page) - xPage).limit(xPage).exec((error, applicant) => {
            User.count({tipo_cuenta: 'Freelancer'}, (error, count) => {
                if (error) {
                    console.log('error1')
                } else {
                    res.render('administracion', {
                        tipo_cuenta, applicant, current: page, pages: Math.ceil(count / xPage)
                    })
                }
            })
        })
    } else {
        const xPage = 4;
        const page = req.params.page || 1;
        const applicant = await User.find({ tipo_cuenta: 'Freelancer' }).skip((xPage * page) - xPage).limit(xPage).exec((error, applicant) => {
            User.count({tipo_cuenta: 'Freelancer'}, (error, count) => {
                if (error) {
                    console.log('error1')
                } else {
                    res.render('administracion', {
                        applicant, current: page, pages: Math.ceil(count / xPage)
                    })
                }
            })
        })
    }

}


helpers.renderPanelPagos = async (req,res) => {
    // const users = await User.find({tipo_cuenta: "Freelancer"}).sort({_id: -1}).limit(3);
    // res.render('administracion', {users});

    if (req.query.buscar_free) {
        if (req.user) {
            const tipo_cuenta = req.user.tipo_cuenta;
            const buscar_free = req.query.buscar_free;
            const xPage = 6;
            const page = req.params.page || 1;
            const payment = await Payment.find({ username: { $regex: '.*' + buscar_free + '.*', $options: 'i' }, tipo_cuenta: 'Empresa' }, function (error, applicant) {
                if (error) {
                    console.log('error en el find')
                }
            })
                .skip((xPage * page) - xPage).limit(xPage).exec((err, applicant) => {
                    Payment.count({tipo_cuenta: 'Empresa'}, (err, count) => {
                        if (err) {
                            console.log('error en el conteo')
                        } else {
                            console.log('aaaaaaaaaaaaaaaaaaaa');
                            res.render('administracion', { tipo_cuenta, applicant, current: page, pages: Math.ceil(count / xPage) })
                        }
                    })
                })
        } else {
            const buscar_free = req.query.buscar_free;
            const xPage = 6;
            const page = req.params.page || 1;
            const payment = await Payment.find({ username: { $regex: '.*' + buscar_free + '.*', $options: 'i' }, tipo_cuenta: 'Empresa' }, function (error, applicant) {
                if (error) {
                    console.log('error en el find')
                }
            })
                .skip((xPage * page) - xPage).limit(xPage).exec((err, applicant) => {
                    Payment.count({tipo_cuenta: 'Empresa'}, (err, count) => {
                        if (err) {
                            console.log('error en el conteo')
                        } else {
                            console.log('c');
                            res.render('administracion', { applicant, current: page, pages: Math.ceil(count / xPage) })
                        }
                    })
                })
        }
    }
    if (req.user) {
        const tipo_cuenta = req.user.tipo_cuenta;
        const xPage = 6;
        const page = req.params.page || 1;
        const applicant = await Payment.find({ tipo_cuenta: 'Empresa' }).skip((xPage * page) - xPage).limit(xPage).exec((error, applicant) => {
            Payment.count({tipo_cuenta: 'Empresa'}, (error, count) => {
                if (error) {
                    console.log('error1')
                } else {
                    console.log('b');
                    res.render('administracion', {
                        tipo_cuenta, applicant, current: page, pages: Math.ceil(count / xPage)
                    })
                }
            })
        })
    } else {
        const xPage = 4;
        const page = req.params.page || 1;
        const applicant = await User.find({ tipo_cuenta: 'Freelancer' }).skip((xPage * page) - xPage).limit(xPage).exec((error, applicant) => {
            User.count({tipo_cuenta: 'Freelancer'}, (error, count) => {
                if (error) {
                    console.log('error1')
                } else {
                    console.log('a');
                    res.render('administracion', {
                        applicant, current: page, pages: Math.ceil(count / xPage)
                    })
                }
            })
        })
    }

}


helpers.renderPanelReportesPagos = async (req,res) => {
    // const users = await User.find({tipo_cuenta: "Freelancer"}).sort({_id: -1}).limit(3);
    // res.render('administracion', {users});

    if (req.query.buscar_free) {
        if (req.user) {
            const tipo_cuenta = req.user.tipo_cuenta;
            const buscar_free = req.query.buscar_free;
            const xPage = 6;
            const page = req.params.page || 1;
            const paymentReport = await PaymentReport.find({ username: { $regex: '.*' + buscar_free + '.*', $options: 'i' }, tipo_cuenta: 'Empresa' }, function (error, applicant) {
                if (error) {
                    console.log('error en el find')
                }
            })
                .skip((xPage * page) - xPage).limit(xPage).exec((err, applicant) => {
                    PaymentReport.count({tipo_cuenta: 'Empresa'}, (err, count) => {
                        if (err) {
                            console.log('error en el conteo')
                        } else {
                            console.log('aaaaaaaaaaaaaaaaaaaa');
                            res.render('administracion', { tipo_cuenta, applicant, current: page, pages: Math.ceil(count / xPage) })
                        }
                    })
                })
        } else {
            const buscar_free = req.query.buscar_free;
            const xPage = 6;
            const page = req.params.page || 1;
            const paymentReport = await PaymentReport.find({ username: { $regex: '.*' + buscar_free + '.*', $options: 'i' }, tipo_cuenta: 'Empresa' }, function (error, applicant) {
                if (error) {
                    console.log('error en el find')
                }
            })
                .skip((xPage * page) - xPage).limit(xPage).exec((err, applicant) => {
                    PaymentReport.count({tipo_cuenta: 'Empresa'}, (err, count) => {
                        if (err) {
                            console.log('error en el conteo')
                        } else {
                            console.log('c');
                            res.render('administracion', { applicant, current: page, pages: Math.ceil(count / xPage) })
                        }
                    })
                })
        }
    }
    if (req.user) {
        const tipo_cuenta = req.user.tipo_cuenta;
        const xPage = 6;
        const page = req.params.page || 1;
        const applicant = await PaymentReport.find({ tipo_cuenta: 'Empresa' }).skip((xPage * page) - xPage).limit(xPage).exec((error, applicant) => {
            PaymentReport.count({tipo_cuenta: 'Empresa'}, (error, count) => {
                if (error) {
                    console.log('error1')
                } else {
                    console.log('b');
                    res.render('administracion-report', {
                        tipo_cuenta, applicant, current: page, pages: Math.ceil(count / xPage)
                    })
                }
            })
        })
    } else {
        const xPage = 4;
        const page = req.params.page || 1;
        const applicant = await User.find({ tipo_cuenta: 'Freelancer' }).skip((xPage * page) - xPage).limit(xPage).exec((error, applicant) => {
            User.count({tipo_cuenta: 'Freelancer'}, (error, count) => {
                if (error) {
                    console.log('error1')
                } else {
                    console.log('a');
                    res.render('administracion', {
                        applicant, current: page, pages: Math.ceil(count / xPage)
                    })
                }
            })
        })
    }

}


helpers.eliminarUsuario = async (req,res)=> {
    const {id}=req.params;
    console.log(id);

    try {
        const userDelete = await User.findByIdAndDelete(id)
        res.redirect('/candidatos/1')
        
    } catch (error) {
        console.log(error);
    }
}
helpers.eliminarUsuarioPago = async (req,res)=> {
    const {id}=req.params;
    console.log(id);

    try {
        const payDelete = await Payment.findByIdAndDelete(id)
        res.redirect('/administracion/pagos')
        
    } catch (error) {
        console.log(error);
    }


}

module.exports = helpers;

