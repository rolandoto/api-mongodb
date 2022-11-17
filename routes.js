const cors       = require('cors')
const express    = require("express");
const { check } = require('express-validator');
const controller = require("./controllers.js");
const { ValidarCampos } = require('./middleweres.js');

const router = express.Router();

router.post ("/vendedor",cors(),[
                check("idvend","es obligatorio el numero").not(),
                check("nombre","el nombre es obligatorio").not().isEmpty(),
                check("apellido","el apellido es obligatorio").not().isEmpty(),
                check('correoe','el correo no es valido').isEmail(),
            ],
            ValidarCampos,
            controller.postVendedor)

router.post("/venta",cors(),controller.postVenta)

router.get("/getvena",cors(),controller.getVenta)

// --------------- API REST CRUD

/*router.get    ("/clientes",      cors(), controller.readClientes);   // Read All
router.get    ("/clientes/:id",  cors(), controller.readCliente);    // Read
router.delete ("/clientes/:id",  cors(), controller.deleteCliente);  // Delete
router.put    ("/clientes/:id",  cors(), controller.updateCliente);  // Update
router.post   ("/clientes",      cors(), controller.createCliente);  // Create

/*router.get    ("/articulos",     cors(), controller.readArticulos);  // Read All
router.get    ("/articulos/:id", cors(), controller.readArticulo);   // Read
router.delete ("/articulos/:id", cors(), controller.deleteArticulo); // Delete
router.put    ("/articulos/:id", cors(), controller.updateArticulo); // Update
router.post   ("/articulos",     cors(), controller.createArticulo); // Create
*/

module.exports = router;
