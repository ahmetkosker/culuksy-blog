const mongoose = require('mongoose')
const database = require('../models/dbConnect')
const moment = require('moment')


const blogCommentSchema = new mongoose.Schema({
    blogId: { type: String, required: true },
    userName: { type: String, required: true },
    userComment: { type: String, required: true },
    created: { type: String, required: true },
})

// blogCommentSchema.pre('save', function (next) {
//     this.created = new Date();

//     next();
// })

var Comment = mongoose.model('Comment', blogCommentSchema)

module.exports = Comment