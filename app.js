const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const path = require('path')
const multer = require('multer')

const app = express()

// Settings
//set the template engine
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

//set the port
app.set('port', process.env.PORT || 3000);

//middlewares
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname).toLocaleLowerCase());
    }
})

app.use(multer({
    storage,
    dest: path.join(__dirname, 'public/uploads'),
    limits: {fileSize: 2 * 1024 * 1024},  // 2 MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/
        const mimetype = filetypes.test(file.mimetype)
        const extname = filetypes.test(path.extname(file.originalname))
        if (mimetype && extname) {
            return cb(null, true)
        }
        cb("Error: File must be an valid image")
    }
}).single('image'));

//set the public folder for static files
app.use(express.static(path.join(__dirname, '/public')))

//set to process data sent from forms
app.use(express.urlencoded({extended:true}))

//set to process data in json format
app.use(express.json())

//set the environment variables
dotenv.config({path: './env/.env'})

//set to be able to work with cookies
app.use(cookieParser())

//call the router
app.use('/', require('./routes/router'))

//to clear the cache
app.use(function(req, res, next) {
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});

//starting de server
app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`);
})
