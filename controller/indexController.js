const blog = require('../models/database')

const index_show_blogs = function (request, response) {
    var html = '<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><link rel="stylesheet" href="dist/styles.css"></head><body<h1="" cz-shortcut-listen="true"> <div class="bg-yellow-300 h-48 mx-auto flex justify-center items-center flex-col"><div class="text-gray-800 font-black sm:text-6xl text-4xl">Ahmet KÖŞKER</div><div class="sm:text-4xl md: text-gray-800 italic text-2xl">Ahmet KÖŞKER</div></div><div class="sm:w-full w-full bg-gray-900 h-auto m-auto"><div class="w-auto"><ul class="text-2xl text-yellow-200 text-center sm:flex justify-end sm:justify-center block"><li class="sm:p-5 p-3 hover:bg-gray-600"><a href="" class="transition-all hover:text-4xl  hover:text-yellow-400">AHO</a></li><li class="sm:p-5 p-3 hover:bg-gray-600"><a href="" class="transition-all hover:text-4xl hover:text-yellow-400">AHO</a></li><li class="sm:p-5 p-3 hover:bg-gray-600"><a href="" class="transition-all hover:text-4xl hover:text-yellow-400">AHO</a></li></ul></div></div></div>';
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
                        <div class='overflow-hidden'>
                            <img class='hover:scale-110 hover:transition-all hover:duration-700 ease-in-out'
                                src='/images/${data[i].blogImage}'>
                        </div>
                        <div class='w-3/4 mx-auto p-6 border-b-4'>
                        <a class='text-yellow-700' href='index/${data[i]._id}'>
                            <div class='mb-8 mx-auto'>
                                <h1 class='text-5xl text-center'>
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
                        html = html + '</body></html>'
                    }
                }
            }
            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.write(html)
            response.end()
        }
    })
}

const index_show_blog_page = function (request, response) {
    const id = request.params.id;
    blog.findById(id, function (error, data) {
        if (!error) {
            response.send(`<html>
            <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <link rel="stylesheet" href="/dist/styles.css">
            </head>
            <body>
            <div class='w-5/6 text-center mx-auto'>
                <div>
                    <div class='sm:h-20 sm:mt-5 sm:text-5xl'>
                        ${data.blogTitle}
                    </div>
                    <div class='sm:text-2xl text-red-700'>
                        ${data.blogContent}
                    </div>
                </div>
            </div>
            </body>
    
            </html>`)
        }
        else {
            console.log(error)
        }
    })
}

module.exports = {
    index_show_blogs,
    index_show_blog_page
}