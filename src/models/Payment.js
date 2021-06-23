const {Schema, model} = require('mongoose');

const PaymentSchema = new Schema({
    id_jobs: {type: String, required: true},
    id_applicant: {type: String, required: true},
    email_applicant: {type: String},
    monto_pago: {type: String},
    email_employe: {type: String},
    payed_user: {type: String},
    payed: { type: Boolean, default: false},
    tipo_cuenta: {type: String, default:'Empresa'},
    },
    {
        timestamps: true
    }
    );

module.exports = model('Payments', PaymentSchema);