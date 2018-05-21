const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const passport   = require('passport');
const session    = require('express-session');
const bodyParser = require('body-parser');
const env = require('dotenv').load();
const exphbs = require('express-handlebars');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'sergeisucksergeisuckseggs',resave: true, saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session());

app.set('views', './app/views')
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.get('/', (req, res)=> {
 
    res.send('Welcome to Passport with Sequelize');
 
});
const models = require("./app/models");
const authRoute = require('./app/routes/auth.js')(app, passport);

require('./app/config/passport/passport.js')(passport, models.user);

models.sequelize.sync().then(function() {
 
    console.log('Nice! Database looks fine')
 
}).catch(function(err) {
 
    console.log(err, "Something went wrong with the Database Update!")
 
});


app.listen(PORT, (err)=> {
 
    if (!err)
        console.log("Site is live");
    else console.log(err)
 
});