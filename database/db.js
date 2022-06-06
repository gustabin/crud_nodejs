const mysql = require('mysql')

const conexion = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_DATABASE,
})

conexion.connect( (error)=> {
    if(error){
        console.log('The connection error is: '+error)
        return
    }
    console.log('¡Connected to the database MySQL!')
})

module.exports = conexion