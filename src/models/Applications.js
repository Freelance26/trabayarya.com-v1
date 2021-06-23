const {Schema, model} = require('mongoose');

const ApplicationsSchema = new Schema({
    id_jobs: {type: String, required: true},
    id_applicant: {type: String, required: true},
    name_applicant: {type: String, required: true},
    email_applicant: {type: String},
    phone_applicant: {type: String},
    message: {type: String, required: true},
    profile_img:{type: String}
    },
    {
        timestamps: true
    }
    );

module.exports = model('Applicantions', ApplicationsSchema);