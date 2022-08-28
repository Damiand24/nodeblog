const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const app = express();
const csurf = require('csurf');
const csrfProtection = csurf();
const helmet = require('helmet');
require('dotenv').config()

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(process.env.PORT || 5000))
    .catch((err) => console.log(err))

app.set('view engine', 'ejs');
app.use(require('helmet')());

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const store = new MongoDBStore({
    uri: process.env.DB_URI,
    collection: 'sessions',
    clear_interval: 1000 * 60 * 60 * 24,
    cookie : { maxAge: 1000 * 60 * 60 * 24 }
})

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: { 
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 
    }
}))

app.use(csrfProtection);
app.use(helmet());

app.use((req, res, next) => {
    res.locals.user = req.session.user;

    if(req.session.isAdmin) {
        res.locals.isAdmin = req.session.isAdmin
    }

    res.locals.csrf = req.csrfToken();
    next();
})

const mainRoutes = require('./routes/mainRoutes.js');
const blogRoutes = require('./routes/blogRoutes.js');

app.use('/', mainRoutes);
app.use('/blog', blogRoutes);

app.use((req, res) => {
    res.status(404);
    res.render('404', { title: 404 });
})