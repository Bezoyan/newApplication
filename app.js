const mongoose = require('mongoose');
const express = require('express');
const body_parser = require('body-parser');
const app = express();

const Utility = require ('./services/utility');
const AppConstants =require ('./settings/constants');

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true}));
app.use(Utility.parseQuery);

require ('./model/users');

const con = mongoose.createConnection(AppConstants.DB_URL);
//let usersCollection = con.model('users');
//let postsCollection = con.model('posts');
app.db = {
    users:con.model('users')
}

require ('./controller/api')(app);

app.listen(3004);
