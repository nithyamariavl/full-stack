const { type } = require('express/lib/response');
const mongoose =require('mongoose');
const projectSchema = new mongoose.Schema({
    projectname: {
        type: String,
        required: true
    },
    projectdescription: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        required: true

    }

   

});
module.exports = mongoose.model('project', projectSchema);
