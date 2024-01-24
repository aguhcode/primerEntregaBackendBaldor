const socket = new WebSocket('ws://localhost:8080');

socket.addEventListener('open', (event) => {
    console.log('Conexión establecida');
});

socket.addEventListener('message', (event) => {
    console.log(`Mensaje del servidor: ${event.data}`);
});

socket.addEventListener('close', (event) => {
    console.log('Conexión cerrada');
});

