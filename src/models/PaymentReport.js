const {Schema, model} = require('mongoose');

const PaymentSchema = new Schema({
    // id_payment: {type: String, required: true},
    token: {type: String, required: true},
    id_payer: {type: String},
    monto: {type: String},
    email: {type: String},
    id_user: {type: String},
    tipo_cuenta: {type: String},
    
    
    },
    {
        timestamps: true
    }
    );

module.exports = model('PaymentReport', PaymentSchema);