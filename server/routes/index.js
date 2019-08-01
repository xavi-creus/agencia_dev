const express = require('express');
const router = express.Router();

/*
 *****************
 ** CONTROLLERS **
 *****************
 */
const nosotrosController = require('../controllers/nosotrosController');
const homeController = require('../controllers/homeController');
const viajesController = require('../controllers/viajesController');
const testimonialesController = require('../controllers/testimonialesController');

module.exports = function(){

    router.get('/', homeController.consultasHomepage);
    router.get('/nosotros', nosotrosController.infoNosotros);
    router.get('/viajes', viajesController.mostrarViajes);
    router.get('/viajes/:id', viajesController.mostrarViaje);
    router.get('/testimoniales', testimonialesController.mostrarTestimonios);
    // Controlador que se activa al submit del form
    router.post('/testimoniales', testimonialesController.agregarTestimonio);

    return router;
}

