const http = require('http');
const app = require('./app');
const dotenv = require('dotenv');

// initialize dotenv
dotenv.config();

app.set('port', process.env.PORT || 8000);

const server = http.createServer(app);

server.listen(process.env.PORT || 8000, ()=> {
    console.log('server listen on port' + ' ' + process.env.PORT);
});