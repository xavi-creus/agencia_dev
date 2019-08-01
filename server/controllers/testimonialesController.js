const Testimonial = require('../models/Testimoniales');

exports.mostrarTestimonios = async (req, res) => {
    const testimoniales = await Testimonial.findAll()
    res.render('testimoniales', {
        pagina: 'Testimonios',
        testimoniales
    });
}

exports.agregarTestimonio = async (req, res) => {
    // validar campos llenos
    let {nombre, correo, mensaje} = req.body;
    let errores =[];

    if(!nombre){
        errores.push({'mensaje' : 'Agrega tu nombre'})
    }
    if(!correo){
        errores.push({'mensaje' : 'Agrega tu correo'})
    }
    if(!mensaje){
        errores.push({'mensaje' : 'Agrega tu mensaje'})
    }
    
    // revisar errores
    if(errores.length > 0){
        // muestra vista errores
        const testimonial = await Testimonial.findAll()
        res.render('testimoniales', {
            errores,
            nombre,
            correo,
            mensaje,
            pagina: 'testimoniales',
            testimoniales
        });
    } else {
        // envia datos a la BD
        Testimonial.create({
            nombre,
            correo, 
            mensaje
        })
        .then(testimonial => res.redirect('/testimoniales'))
        .catch(error => console.log(error));
    
    }
}