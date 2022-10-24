const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserPlantSchema = new Schema ({
    plantID: {
        type: String,
        required: true
    }, 
    plantUserID: {
        type: String,
        required: true
    }, 
    plantUserName: {
        type: String,
        required: true
    }, 
    plantLatinName: {
        type: String
    }, 
    plantCommonName: {
        type: String
    }, 
    plantSource: {
        type: String
    }, 
    plantStartHeight: {
        type: Number,
        required: true
    }, 
    plantCurrentHeight: {
        type: Number,
        required: true
    }, 
    plantStartWidth: {
        type: Number,
        required: true
    },
    plantCurrentWidth: {
        type: Number,
        required: true
    },
    plantStartHealth: {
        type: Number
    }, 
    plantCurrentHealth: {
        type: String
    }    
});

module.exports = mongoose.model("UserPlant", UserPlantSchema);