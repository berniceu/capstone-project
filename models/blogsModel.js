const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    blogTitle: {type: String, required: true},
    blog: {type: String, required: true},
    author: {type: String, required: true},
    blogImage: {type: String, required: false}

})

const blog = mongoose.model('blog', blogSchema);

module.exports = blog;