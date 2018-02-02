let mongoose = require('mongoose');
let validator = require('validator');
let AutoIncrement = require('mongoose-sequence')(mongoose);

let HeroSchema = new mongoose.Schema({
    no: {
        type: Number,
        default: 0
    },
    name: {
        type: String ,
        required: true
    }
});

HeroSchema.plugin(AutoIncrement, {inc_field: 'no'});

let Hero = mongoose.model('Heroes' , HeroSchema);

module.exports = {
    Hero
}