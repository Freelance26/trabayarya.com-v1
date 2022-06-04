const {Schema, model} = require('mongoose');
const bcryptj = require('bcryptjs');
const mongoosePaginate = require('mongoose-paginate-v2');
const { path } = require('../server');

const UserSchema = new Schema({
    username: {type: String, required: true},
    nombre_empresa: {type: String},
    email: {type: String, required: true, unique: true},
    phone: {type: String},
    categoria: {type: String},
    password: {type: String, required: true},
    tipo_cuenta: {type: String, required: true},
    isNewUser:{type: String,default: 'basico'},
    isUser: {type: Boolean,default: true},
    approved: {type: Boolean,default: false},
    plusExpires: {type: Date,default: null},
    
    ciudad: {type: String, required: true},
    pais: {type: String, },
    acerca: {type: String},
    skill_: {type: String},
    skill_1: {type: String}, 
    skill_2: {type: String},
    skill_3: {type: String},
    cargo: {type: String},
    direccion: {type: String},
    tipoempresa: {type: String},
    salario: {type: String},
    rrss: {type: Object},
    trabajos: {type: Object},
    estudios: {type: Object},
    info:{type: Object},
    userfacebook: {type: String},
    usertwitter: {type: String},
    usergoogle: {type: String},
    userlinkedin: {type: String},
    filename:{
        type:String,
        default: 'https://i.imgur.com/0oabE7K.png',    
    },
    cvfilename:{type:String},

},
    {
        timestamps: true
    },
    { typeKey: '$type' }
    );

UserSchema.methods.encryptPassword = async password => {
    const salt = await bcryptj.genSalt(10);
    return await bcryptj.hash(password, salt);
}

UserSchema.methods.matchPassword = async function(password) {
    return await bcryptj.compare(password, this.password)
}

UserSchema.virtual('uniqueId')
    .get(function () {
        return this.filename.replace(path.extname(this.filename), '')
    })

UserSchema.plugin(mongoosePaginate);

module.exports = model('Users', UserSchema)