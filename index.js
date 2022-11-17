require('dotenv').config();
const path       = require('path');
const cors       = require('cors');
const express    = require('express');
const apiRoutes  = require('./routes');
const { dbConnection } = require('./database');

const app    = express();
const PORT   = process.env.PORT || 4000;


dbConnection()
// CONEXIÓN A BASE DE DATOS

// MIDDLEWARE
app.use(cors());            // Soporte para CORS
app.use(express.json());    // IMPORTANTE: Poner esto antes de las rutas
app.use('/api', apiRoutes);
app.use(express.static(path.join(__dirname , 'public')));

// SERVIDOR WEB
app.listen(PORT, () => {
    console.log(`server connect  port ${4000}`)
});
