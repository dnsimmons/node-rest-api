const mongoose = require('mongoose');

ContactSchema = mongoose.Schema({
   name: {
     type: String,
     required: true
   },
    email: {
        type: String,
        required: true
    },
   phone: String,
    created: {
       type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
});

ContactSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

ContactSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Contacts', ContactSchema);