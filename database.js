const mongoose = require('mongoose')
const Schema = mongoose.Schema
const dbConnect = require('./dbConnect')

const blogPostSchema = new Schema({
    blogTitle: String,
    blogSummary: String,
    blogContent: String
});

let blog = mongoose.model('blog', blogPostSchema);

module.exports = blog;

// var pers = new blog({
//     blogTitle: 'The one that is not here to stay with us',
//     blogSummary: 'What if there was no life after death? What if everything was nothing more than a coincidence? What if life on earth had formed through different elements coming together by chance over billions of years? Without question the exact opposite could be claimed, i.e. that life could be created by consciousness. However, both theories include obscurity and we live choosing the one agreeing with our mind and heart in this obscurity.',
//     blogContent: 'Content'
// })

// pers.save(function (error) {
//     if (error) {
//         throw error;
//     }
//     console.log("kayıt edildi")
// })