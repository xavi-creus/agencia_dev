// Importar express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const routes = require('./routes');

const configs = require('./config');

// db.authenticate()
//     .then(() => console.log('DB Conectada'))
//     .catch(error => console.log(error));

// configurar express
const app = express();

// Habilitar pug
app.set('view engine', 'pug');

// Vistas
app.set('views', path.join(__dirname, './views'))

// cargar carpeta estática public
app.use(express.static('public'))

// validar si estamos en desarrollo o producción
const config = configs[app.get('env')];

// creamos la variable para el sitio web
app.locals.titulo = config.nombresitio;

// Muestra año actual
app.use( (req, res, next) => {
    const fecha = new Date();
    res.locals.fechaActual = fecha.getFullYear();
    // para saber la seccion en la que nos encontramos
    res.locals.ruta = req.path;
    // console.log(res.locals);
    // para que sigua ejecutando la siguiente función
    return next();
})

// ejecutar body-parse
app.use(bodyParser.urlencoded({extended: true}));

// cargar rutas
app.use('/', routes());

/** Host y puerto para la app **/
const host = process.env.HOST || '0.0.0.0';
const port = process.env.POST || 3000;

app.listen(port, host, () => {
    console.log('SERV OK');
})