//dependencies
require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');

const app = express();

//middleware (req -> middleware -> res)
app.use(methodOverride('_method'));  //override for put and delete requests from forms
app.use(express.urlencoded({extended: true})); //parses urlencoded data into requests body
app.use(express.static('public')); //serve files from public statically

//routes
