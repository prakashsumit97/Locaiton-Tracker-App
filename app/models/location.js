var mongoose = require('mongoose');
Schema = mongoose.Schema;

var LocationSchema = new mongoose.Schema({
    locationName: {
        type: String,
        required: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    locationAddress: {
        type: String
    },
    fullAddress: {
        type: String,
        required: true
    },
    coordinates: {
        latitude: {
            type: Number
        },
        longitude: {
            type: Number
        }
    },
    createdOn: {
        type: Date,
        default: Date.now()
    }
});

var Location = mongoose.model('Location', LocationSchema);
module.exports = Location;
