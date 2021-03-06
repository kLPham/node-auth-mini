const express = require('express');
const session = require('express-session');
const passport = require('passport');

const {secret} = require('./config');


const strategy = require('./strategy');

const app = express();

app.use(session({
    secret,
    saveUninitialized: false,
    resave: false
})
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(strategy);


passport.serializeUser(function(user, done) {
    done(null, user)
 
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

app.get(
    '/login',
 passport.authenticate("auth0", { 
    successRedirect: '/me', 
    failureRedirect: '/login',
    failureFlash: true
 })
);

app.get('/me',(req,res,next)=>{
    if (req.user) {
        res.json(req.user);
    }else{
        res.redirect('/login');
    }
});
  
 


const port = 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}`); } );