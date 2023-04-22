//dependencies
require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const PORT = process.env.PORT;

const app = express();

const session = require('express-session');
const MongoStore = require('connect-mongo');

const schedulesController = require('./controllers/schedules');
const usersController = require('./controllers/users');

//middleware (req -> middleware -> res)
app.set('view engine', 'ejs'); //specifies the views for res.render are going to be in the view directory looking for ejs files
app.use(methodOverride('_method'));  //override for put and delete requests from forms
app.use(express.urlencoded({extended: true})); //parses urlencoded data into requests body
app.use(express.static('public')); //serve files from public statically

app.use(
    session({
        // the store needs to know it's a mongo db and it needs access to the db's connection
        store: MongoStore.create({
            mongoUrl: process.env.DATABASE_URL
        }),
        // secret ensure that it's not an outside attack
        secret: process.env.SECRET,
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 10 
            // this sets the cookie to last for 10 days
            // this allows you to stay logged in for 10 days from when you initially logged in
        }
    })
)

//routes

app.use('/schedules', schedulesController);
app.use('', usersController);


app.listen(PORT, () => {
    console.log(`$ 💲  Server is listening to PORT ${PORT}  💵 💰`);
})