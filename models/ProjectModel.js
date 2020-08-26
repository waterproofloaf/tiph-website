var mongoose = require('mongoose');

var ProjectModel = new mongoose.Schema({
    proj_title: {
        type: String,
        required: true,
    },
    proj_content: {
        type: String,
        //required: true -- commented out to be fixed
    },
    proj_date: {
        type: String,
        required: true
    },
    proj_img: {
        //type: Image,
    },
    proj_keywords: {
        type: String,
        required: true
    },
    proj_status:{
        type: String,
        default: 'Proposed',
        //required: true
    }
});

module.exports = mongoose.model('Project', ProjectModel);

exports.getAll = function(next){
    ProjectModel.find({}).sort({}).exec(function(err, result){
        if (err) throw err;
        var projObjects = [];
        
        result.forEach(function(doc){
            projObjects.push(doc.toObject());
        });
        next(projObjects);
    })
}