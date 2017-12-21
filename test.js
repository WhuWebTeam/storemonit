const cluster = require('cluster');
const http = require('http');
const cpus = require('os').cpus();

if (cluster.isMaster) {

    cosole.log(`master ${process.pid} is running...`);

    for (let i = 0; i < cpus.length; i++) {
        cluster.fork();
    }
} else {

    http.createServer((req, res) => {
        res.writeHead(200);
        res.write(`${process.pid}`);
        res.end();
    }).listen(8000);
}