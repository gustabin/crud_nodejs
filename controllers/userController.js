//invoke the DB connection
const conexion = require('../database/db');

//import form-data
const FormData = require('form-data');


//procedure to save
exports.save = (req, res)=>{
    const email = req.body.email;
    const rol = req.body.rol;
    conexion.query('INSERT INTO users SET ?',{email:email, rol:rol}, (error, results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/users');         
        }
    });
};

//procedure to update
exports.update = (req, res)=>{    
    const id = req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const rol = req.body.rol;
    conexion.query('UPDATE users SET ? WHERE id = ?',[{name:name, email:email, rol:rol}, id], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/users');         
        }
    });
};
