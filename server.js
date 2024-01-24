const express = require('express');
const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const WebSocket = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.engine('handlebars', expressHandlebars());
app.set('view engine', 'handlebars');
app.set('views', 'views');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/carrito', (req, res) => {
    res.render('carrito');
});


wss.on('connection', (ws) => {
    console.log('Cliente conectado');

    ws.on('message', (message) => {
        console.log(`Mensaje recibido: ${message}`);
    });

    ws.on('close', () => {
        console.log('Cliente desconectado');
    });
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
