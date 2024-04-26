const mongoose = require('mongoose');
const voteOptionSchema = mongoose.Schema({
    id : {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        unique: false
    },
    number_of_votes: {
        type: Number,
        required: true,
        default:0
    }
});
const voteSchema = mongoose.Schema({
    title : {
        type: String,
        required: true,
        unique: true
    },
    total_votes: {
        type:Number,
        required:true,
        default:0
    },
    createdAt: {
        type: Date,
        default: Date.now(),
      },
      updatedAt: {
        type: Date,
        default: Date.now(),
      },
    options:   [voteOptionSchema]
});


module.exports = mongoose.model('vote' , voteSchema);