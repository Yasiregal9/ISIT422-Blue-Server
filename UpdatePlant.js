const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UpdatePlantSchema = new Schema ({
    updateDate: {
        type: String
    }, 
    updateCurrentHeight: {
        type: Number,
        required: true
    }, 
    updateCurrentWidth: {
        type: Number,
        required: true
    },
    updateCurrentHealth: {
        type: Number
    },    
    updateComment: {
        type: String
    }
});

module.exports = mongoose.model("UpdatePlant", UpdatePlantSchema);