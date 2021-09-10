const mongoose = require('mongoose')
const database = require('../models/dbConnect')
const moment = require('moment')


const blogCommentSchema = new mongoose.Schema({
    blogId: { type: String, require: true },
    userName: { type: String, require: true },
    userComment: { type: String, required: true },
    created: { type: String, require: true },
})

blogCommentSchema.pre('save', function (next) {
    this.created = moment().format('lll');

    next();
})

var Comment = mongoose.model('Comment', blogCommentSchema)

module.exports = Comment