const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

//invoke the DB connection
const conexion = require('../database/db');

//path to send the data in json format
router.get('/dataUsers', (req, res)=>{     
    conexion.query('SELECT * FROM users', (error, results)=>{
        if(error){
            throw error;
        } else {                                                   
            data = JSON.stringify(results);
            res.send(data);          
        }   
    })
})

//path to create a record
router.get('/createUser', (req,res)=>{
    res.render('createUser', {title: "Users", titleWeb: "Control Create User"});
})

//path to edit a selected record
router.get('/editUser/:id', (req,res)=>{    
    const id = req.params.id;    
    conexion.query('SELECT * FROM users WHERE id=?',[id] , (error, results) => {
        if (error) {
            throw error;
        }else{            
            res.render('editUser', {user:results[0], title: "Edit Users", titleWeb: "Control Edit User"});            
        }        
    });
});

//path to delete a selected record
router.get('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    conexion.query('DELETE FROM users WHERE id = ?',[id], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/users');         
        }
    })
});

//invoke the methods for the CRUD of User
const userController = require('../controllers/userController');
//const { json } = require('express');

router.post('/saveUser', userController.save);
router.post('/editUser', userController.update);
router.post('/upload/:id', (req, res) =>{   
    const id = req.params.id;
    const image = req.file.filename

    conexion.query('UPDATE users SET ? WHERE id = ?',[{image:image}, id], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/users');         
        }
    })
});

//router for views
router.get('/', authController.isAuthenticated, (req, res)=>{   
    res.render('index', {image: req.name, titleWeb: "Control Dashboard"})
})
router.get('/widgets', (req, res)=>{
    res.render("widgets", {title: "Widgets", titleWeb: "Control Widgets"})
})
router.get('/kanban', (req, res)=>{
    res.render("kanban", {title: "Kanban", titleWeb: "Control Kanban"})
})
router.get('/login', (req, res)=>{
    res.render('login', {alert:false})
})
router.get('/register', (req, res)=>{
    res.render('register')
})

router.get('/users', (req, res)=>{    
    res.render("users", {title: "Users", titleWeb: "Control Users"})
})

router.get('/products', (req, res)=>{
    res.render("products", {title: "Products", titleWeb: "Control Products"})
})

router.get('/customers', (req, res)=>{
    res.render("customers", {title: "Customers", titleWeb: "Control Customers"})
})

router.get('/reports', (req, res)=>{
    res.render("reports", {title: "Reports", titleWeb: "Control Reports"})
})

router.get('/integrations', (req, res)=>{
    res.render("integrations", {title: "Integrations", titleWeb: "Control Integrations"})
})

router.get('/template', (req, res)=>{
    res.render("template", {title: "Template", titleWeb: "Control Template"})
})

//router for controller methods
router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/logout', authController.logout)


module.exports = router