const express = require('express');
const router = express.Router();
const passport = require('passport');

const { isLoggedIn,isNotLoggedIn } = require('../lib/auth');

//Ir a la página de Registro
router.get('/signup',isNotLoggedIn, (req,res) => {
    res.render('auth/signup')
});

//Enviar datos del Registro para crear nuevos usuarios
router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));

//Ir a la página de Login
router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('auth/signin');
});

//Enviar datos del Login para su verificación
router.post('/signin', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
      })(req, res, next);
});

//Cerrar la sesión
router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/signin');
});

//Comprobar si hay un usuario logeado
router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile');
});
  
module.exports=router;