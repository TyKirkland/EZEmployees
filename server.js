//dependencies
require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const PORT = process.env.PORT;

const app = express();

const schedulesController = require('./controllers/schedules');
const userController = require('./controllers/users');

//middleware (req -> middleware -> res)
app.set('view engine', 'ejs'); //specifies the views for res.render are going to be in the view directory looking for ejs files
app.use(methodOverride('_method'));  //override for put and delete requests from forms
app.use(express.urlencoded({extended: true})); //parses urlencoded data into requests body
app.use(express.static('public')); //serve files from public statically


//routes

app.use('/schedules', schedulesController);

app.listen(PORT, () => {
    console.log(`$ 💲  Server is listening to PORT ${PORT}  💵 💰`);
})