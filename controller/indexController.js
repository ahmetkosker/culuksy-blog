const blog = require('../models/database')
const Comment = require('../models/comments')

const showBlogs = function (request, response) {
    var html = '<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><link rel="stylesheet" href="dist/styles.css"></head><body<h1="" cz-shortcut-listen="true"> <div class="bg-yellow-300 h-48 mx-auto flex justify-center items-center flex-col"><div class="text-gray-800 font-black sm:text-6xl text-4xl">Ahmet KÖŞKER</div><div class="sm:text-4xl md: text-gray-800 italic text-2xl">Ahmet KÖŞKER</div></div><div class="sm:w-full w-full bg-gray-900 h-auto m-auto"><div class="w-auto"><ul class="text-2xl text-yellow-200 text-center sm:flex justify-end sm:justify-center block"><li class="sm:p-5 p-3 hover:bg-gray-600"><a href="" class="transition-all hover:text-4xl  hover:text-yellow-400">AHO</a></li><li class="sm:p-5 p-3 hover:bg-gray-600"><a href="" class="transition-all hover:text-4xl hover:text-yellow-400">AHO</a></li><li class="sm:p-5 p-3 hover:bg-gray-600"><a href="" class="transition-all hover:text-4xl hover:text-yellow-400">AHO</a></li></ul></div></div></div>';
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
    console.log(id)
    blog.findById(id, function (error, data) {
        if (!error) {
            response.render('showBlogPage', { data: data });
        }
        else {
            console.log(error)
        }
    })
}

const toke = function (request, response) {
    const id = request.params;
    console.log(id)
    response.send('s')
}

module.exports = {
    showBlogs,
    showBlogPage,
    toke
}