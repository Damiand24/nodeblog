const { findById } = require('../models/blogSchema.js');
const Blog = require('../models/blogSchema.js');
const Comment = require('../models/commentSchema.js');

const addBlog = (req, res) => {
    if(req.session.user) {
        res.render('add', { title: 'create blog' });
    } else {
        res.redirect('/login')
    }
}

const postBlog = (req, res) => {
    if(req.session.user) {
        const newBlog = new Blog({
            title: req.body.title,
            snippet: req.body.snippet,
            body: req.body.body,
            author: req.session.user
        });
        newBlog.save()
        .then((result) => {
            res.redirect('/blog/' + newBlog.id);
        })
        .catch((err) => {
            console.log(err);
            res.end();
        })
    } else {
        res.redirect('/login');
    }
}

const getBlog = (req, res) => {
    Blog.findById(req.params.id)
    .then((result) => {
        userBlog = result
        Comment.find({blogID: userBlog.id})
        .then(comments => {
            result.updateOne( {$inc: { views: 1 }})
            .then(done => {
                res.render('blog', { title: result.title, blog: userBlog, comments })
            })

        })
    })
    .catch((notFound) => {
        res.render('404', { title: 'Not found' });
    })
}

const delBlog = (req, res) => {
    if(req.session.user) {
        Blog.findById(req.params.id)
        .then(blog => {
            if(blog.author === req.session.user || req.session.isAdmin === true) {
                Blog.findByIdAndDelete(req.params.id)
                .then(result => {
                    Comment.deleteMany({ blogID: result.id})
                    .catch(err => console.log(err))
                    res.json({ redirect: '/' });
                }) 
            } else {
                res.end('You need to be the author to delete this post')
            }
        })  
        .catch(err => {
            console.log(err);
            res.end('error')
        })
    } else {
        res.redirect('/login')
    }
}

const comment = (req, res) => {
    if(req.session.user) {
        
        const now = new Date();
        const date = String(now.getDate()).padStart(2, '0') + '-' + String((now.getMonth() + 1)).padStart(2, '0') + '-' + now.getFullYear();
        const time = now.getHours() + ":" + String(now.getMinutes()).padStart(2, '0');
        const currentDate = date + ' ' + time; 

        const blogID = req.params.id;
        const newComment = new Comment({
            blogID,
            user: req.session.user,
            date: currentDate,
            body: req.body.comment
        })
        newComment.save()
        .then(done => {
            res.redirect(`/blog/${blogID}`)
        })
        .catch(err => console.log(err))
    } else {
        res.redirect('/login');
    }
}

module.exports = {
    addBlog,
    postBlog,
    getBlog,
    delBlog,
    comment
}