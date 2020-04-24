const mongoose = require('mongoose');

CompanySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    industry: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
});

CompanySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

CompanySchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Company', CompanySchema);