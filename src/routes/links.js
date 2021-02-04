const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

//Rutas para realizar las distintas tareas

//Página para crear datos
router.get('/add', isLoggedIn, (req,res) => {
    res.render('links/add');
});

//Crear nuevos datos y regresar a la página inicial
router.post('/add', isLoggedIn, async (req,res) => {
    const {title, url, description}=req.body;
    const newLink={
        title,
        url, 
        description,
        user_id:req.user.id
    };
    await pool.query('INSERT INTO links set ?', [newLink]);   
    req.flash('success','Link guardado correctmente');
    res.redirect('/links');
});

//Página principal,muestra datos si los hay
router.get('/', isLoggedIn, async (req,res) => {
    const links = await pool.query('SELECT * FROM links WHERE user_id = ?',[req.user.id]);
    res.render('links/list',{links});
});

//Eliminar datos y refrescar la página
router.get('/delete/:id', isLoggedIn, async (req,res) => {
    const {id} = req.params;
    await pool.query('DELETE FROM links WHERE ID = ?',[id]);
    req.flash('success','Link removido correctamente');
    res.redirect('/links');
});

//Redireccionar a la página para editar
router.get('/edit/:id', isLoggedIn, async (req,res) => {
    const {id} = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?',[id]);
    res.render('links/edit',{link:links[0]});
});

//Enviar los datos nuevos para los datos en la base
router.post('/edit/:id', isLoggedIn, async (req,res) => {
    const {id} = req.params;
    const {title,url,description} = req.body;
    const newLink = {title,url,description};
    await pool.query('UPDATE links set ? WHERE id = ?',[newLink,id]);
    req.flash('success','Link actualizado correctamente');
    res.redirect('/links');
});

module.exports=router;