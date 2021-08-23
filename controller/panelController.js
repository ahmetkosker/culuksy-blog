const blog = require('../models/database')
const Admin = require('../models/admin')
const jwt = require('jsonwebtoken')
const path = require('path')
const fs = require('fs')
const fileUpload = require('express-fileupload')
const { BADHINTS } = require('dns')

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
    })
    await newBlog.save(function (error) {
        if (!error) {
            console.log('blog saved')
        }
        else {
            console.log('error')
        }
    })
    response.redirect('/')
}

const deleteBlog_get = function (request, response) {
    var html = '<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous" /><link rel="stylesheet" href="../../dist/styles.css"></head><body<h1="" cz-shortcut-listen="true"> <div class="bg-yellow-300 h-48 mx-auto flex justify-center items-center flex-col"><div class="text-gray-800 font-black sm:text-6xl text-4xl">Ahmet KÖŞKER</div><div class="sm:text-4xl md: text-gray-800 italic text-2xl">Ahmet KÖŞKER</div></div><div class="sm:w-full w-full bg-gray-900 h-auto m-auto"><div class="w-auto"><ul class="text-2xl text-yellow-200 text-center sm:flex justify-end sm:justify-center block"><li class="sm:p-5 p-3 hover:bg-gray-600"><a href="" class="transition-all hover:text-4xl  hover:text-yellow-400">AHO</a></li><li class="sm:p-5 p-3 hover:bg-gray-600"><a href="" class="transition-all hover:text-4xl hover:text-yellow-400">AHO</a></li><li class="sm:p-5 p-3 hover:bg-gray-600"><a href="" class="transition-all hover:text-4xl hover:text-yellow-400">AHO</a></li></ul></div></div></div>';
    blog.find({}, function (error, data) {
        if (error) {
            console.log('error')
        }
        else {
            if (data.length === 0) {
                html = html + `<div class='p-10'><h1 class='text-center text-red-800'>Henüz Blog Eklenmemiş</h1><div></body></html>`;
            }
            else {
                for (var i = 0; i < data.length; i++) {
                    html = html + `<div class="sm:w-1/2 mx-auto">
                <div>
                    <div class='mb-10'>
                        <div class='overflow-hidden relative'>
                            <img class='hover:scale-110 hover:transition-all hover:duration-700 ease-in-out'
                                src='/images/${data[i].blogImage}'>
                            <a href='blog?id=${data[i]._id}&blogImage=${data[i].blogImage}' class='btn absolute top-0 right-0 text-3xl sm:text-5xl cursor-pointer'><i class="fas fa-times-octagon text-red-900"></i></a>
                            <div id='tooltip' class='absolute top-8 sm:top-12 right-0 font-bold p-0.5 sm:p-2 bg-black text-red-900 rounded-2xl hidden'>Delete</div>
                        </div>
                        <div class='w-3/4 mx-auto p-6 border-b-4'>
                        <a class='text-yellow-700' href='index/${data[i]._id}'>
                            <div class='mb-8 mx-auto'>
                                <h1 class='text-3xl sm:text-5xl text-center'>
                                    ${data[i].blogTitle}
                                </h1>
                            </div>
                        </a>
                            <div>
                                <h4 class='text-center'>
                                    ${data[i].blogSummary}
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
                    if (i === data.length - 1) {
                        html = html + `<script>var btn = document.querySelectorAll('.btn'); const buttons = document.querySelectorAll('.btn'); buttons.forEach(function (btn) { btn.addEventListener('mouseenter', function () { btn.nextElementSibling.classList.replace('hidden', 'block') }); btn.addEventListener('mouseleave', function () { btn.nextElementSibling.classList.replace('block', 'hidden'); }); btn.addEventListener('click', function () {    let blog = btn.parentElement.parentElement; blog.remove();    const url = new URL(btn.href);    var _id = url.searchParams.get('id'); var blogImage = url.searchParams.get('blogImage'); fetch('http://localhost:8080/ahoPanel/delete/blog', {method: 'DELETE', headers: { 'Content-Type': 'application/json'},body: JSON.stringify({id: _id, blogImage: blogImage})}) });})  </script></body></html>`
                    }
                }
            }

            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.write(html)
            response.end()
        }
    })
}

const deleteBlog_delete = function (request, response) {
    let id = request.body.id;
    let blogImageName = request.body.blogImage
    fs.unlink('./public/images/' + blogImageName, (err) => {
        if (err) {
            throw err;
        }
        console.log("File is deleted.");
    });
    blog.findOneAndDelete({ _id: id }, function (error, data) {
        if (!error) {
            console.log('deleted')
        }
        else {
            console.log(error)
        }
    })
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





