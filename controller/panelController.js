const blog = require('../models/database')
const Admin = require('../models/admin')
const jwt = require('jsonwebtoken')
const path = require('path')
const fs = require('fs')
const fileUpload = require('express-fileupload')

const adminPermission = function (request, response) {
    var admin = request.cookies.jwt
    jwt.verify(admin, 'exarons', function (error, decoded) {
        if (!error) {
            Admin.find({ _id: decoded.id }, function (error, data) {
                if (!error) {
                    var adminName = data[0].adminName.toUpperCase();
                    response.render('ahoPanel', { adminName: adminName })
                }
                else {
                    console.log(error)
                }
            })
        }
        else {
            console.log('error')
        }
    })
}

const createBlog_get = async function (request, response) {
    response.render('createBlog')
}

const createBlog_post = async function (request, response) {
    let postImage = request.files.blogImage
    postImage.mv(path.resolve(__dirname, '../public/images', postImage.name))
    let postImageName = request.files.blogImage.name
    var newBlog = new blog({
        blogTitle: request.body.blogTitle,
        blogSummary: request.body.blogSummary,
        blogContent: request.body.blogContent,
        blogImage: postImageName,
    });
    const saveBlog = new Promise(function (resolve, reject) {
        setTimeout(function () {
            newBlog.save(function (error) {
                if (!error) {
                    resolve('blog saved')
                }
                else {
                    reject('error')
                }
            });
        }, 2000);
    });
    await saveBlog
        .then(function (response) { console.log(response) })
        .catch(function (response) { console.log(response) })
    response.redirect('/');

};

const deleteBlog_get = function (request, response) {
    blog.find({}, function (error, data) {
        if (error) {
            console.log('error')
        }
        else {
            response.render('deleteBlog', { data: data })
        }
    })
}

const deleteBlog_delete = async function (request, response) {
    let id = request.body.id;
    let blogImageName = request.body.blogImage
    const findOneAndDeleteBlog = new Promise(function (resolve, reject) {
        blog.findOneAndDelete({ _id: id }, function (error, data) {
            if (!error) {
                resolve('deleted')
            }
            else {
                reject(error)
            }
        })
    });
    fs.unlink('./public/images/' + blogImageName, (err) => {
        if (err) {
            throw err;
        }
        console.log("Photo is deleted.");
    });
    const result = await findOneAndDeleteBlog
    console.log(result)
    response.redirect('/ahoPanel')
}

const exit = function (request, response) {
    response.clearCookie('jwt');
    response.redirect('/adminLogin')
}

module.exports = {
    adminPermission,
    createBlog_get,
    createBlog_post,
    deleteBlog_get,
    deleteBlog_delete,
    exit
}




// var btn = document.querySelectorAll('.btn');
// const buttons = document.querySelectorAll('.btn');
// buttons.forEach(function (btn) {
//     btn.addEventListener('mouseenter', function () {
//         btn.nextElementSibling.classList.replace('hidden', 'block')
//     });
//     btn.addEventListener('mouseleave', function () {
//         btn.nextElementSibling.classList.replace('block', 'hidden');
//     });
//     btn.onclick = function (event) {
//         event.preventDefault();
//         let blog = btn.parentElement.parentElement; blog.remove();
//         const url = new URL(btn.href);
//         var _id = url.searchParams.get('id');
//         const xhttp = new XMLHttpRequest();
//         xhttp.onload = function () { };
//         xhttp.open("GET", "http://localhost:8080/ahoPanel/delete/blog");
//         xhttp.send(_id);
//     }
// });





