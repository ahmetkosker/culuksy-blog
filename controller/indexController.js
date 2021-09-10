const blog = require('../models/database')
const Comment = require('../models/comments')
const alert = require('alert')

const showBlogs = function (request, response) {
    blog.find({}, function (error, data) {
        if (error) {
            console.log('error')
        }
        else {
            response.render('showBlogs', { data: data })
        }
    })
}

const showBlogPage = function (request, response) {
    const id = request.params.id;
    blog.findById(id, function (error, data) {
        if (!error) {
            Comment.find({ blogId: id }, function (error, commentData) {
                if (!error) {
                    response.render('showBlogPage', { data: data, commentData: commentData, id: id });
                }
                else {
                    console.log(error, 'errorke')
                }
            })
        }
        else {
            console.log(error)
        }
    })
}

const commentSave = async function (request, response) {
    const body = request.body;
    const blogId = request.params.id
    const comment = new Comment({
        blogId: blogId,
        userName: body.userName,
        userComment: body.userComment
    })
    const savePromise = new Promise(function (resolve, reject) {
        comment.save(function (error) {
            if (!error) {
                resolve('Comment saved');
                alert('Comment saved');
            }
            else {
                reject(error);
            }
        })
    })
    await savePromise
        .then(function (resolve) {
            console.log(resolve);
        })
        .catch(function (reject) {
            console.log(reject);
        })

    response.redirect('/showBlogs/' + blogId)
}

module.exports = {
    showBlogs,
    showBlogPage,
    commentSave
}