const mongoose = require('mongoose')
const database = require('../models/dbConnect')


const blogCommentSchema = new mongoose.Schema({
    blogId: { type: String, require: true },
    userName: { type: String, require: true },
    userComment: { type: String, required: true },
    created: { type: Date, require: true },
})

blogCommentSchema.pre('save', function (next) {
    let currentDate = new Date();
    this.created = currentDate;

    next();
})

var Comment = mongoose.model('Comment', blogCommentSchema)

module.exports = Comment