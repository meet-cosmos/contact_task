const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectID

const contactSchema = new Schema({
    firstName : {type : String, require : true},
    lastName : {type : String, require : true},
    email : {type : String, require : true},
    phone : {type : String, require : true, min : 10, max : 10}
}, {timestamps : true})

const contactModel = mongoose.model('contact', contactSchema);

module.exports = contactModel