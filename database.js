const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogPostSchema = new Schema({
    blogTitle: String,
    blogSummary: String,
    blogContent: String
});

let blog = mongoose.model('blog', blogPostSchema);

module.exports = blog;



var pers = new blog({
    blogTitle: 'Title',
    blogSummary: 'Summary',
    blogContent: 'Content'
})

pers.save(function (error) {
    if (error) {
        throw error;
    }
    console.log("kayıt edildi")
})