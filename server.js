require('dotenv').config();
const path       = require('path');
const cors       = require('cors');
const express    = require('express');
const mongoose   = require('mongoose');
const apiRoutes  = require('./routes');

const app    = express();
const PORT   = process.env.PORT || 4001;
const DB_URI = process.env.URI;


// CONEXIÓN A BASE DE DATOS
mongoose.connect(DB_URI)
.then(() =>{
    console.log('connect database mongoDb')
}).catch(() =>{
    console.log('error no connection')
})

// MIDDLEWARE
app.use(cors());            // Soporte para CORS
app.use(express.json());    // IMPORTANTE: Poner esto antes de las rutas
app.use('/api', apiRoutes);
app.use(express.static(path.join(__dirname , 'public')));

// SERVIDOR WEB
app.listen(PORT, () => {
    console.log(`server connect  port ${4001}`)
});
