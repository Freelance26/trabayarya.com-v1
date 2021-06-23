const {Schema, model} = require('mongoose');
const bcryptj = require('bcryptjs');
const mongoosePaginate = require('mongoose-paginate-v2');
const { path } = require('../server');

const AdminSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean,default: true}
},
    {
        timestamps: true
    },
    { typeKey: '$type' }
    );

    AdminSchema.methods.encryptPassword = async password => {
    const salt = await bcryptj.genSalt(10);
    return await bcryptj.hash(password, salt);
}

AdminSchema.methods.matchPassword = async function(password) {
    return await bcryptj.compare(password, this.password)
}

AdminSchema.virtual('uniqueId')
    .get(function () {
        return this.filename.replace(path.extname(this.filename), '')
    })

    AdminSchema.plugin(mongoosePaginate);

module.exports = model('Admins', AdminSchema)