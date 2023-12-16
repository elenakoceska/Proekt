const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true,
        unique: true,
    },

    fullName: {
        type: String,
        require: true,
    },
    card_num: {
        type: Number,
        require: true,
        unique: true,
    },
    expires: {
        type: Number,
        require: true,
    },
    pin: {
       type: Number,
       require: true,
       unique: true,
   }
    
});

module.exports = mongoose.card("card", cardSchema)