
const path = require('path');
const express = require('express');
const http = require('http');
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({});
const base_url = 'http://120.55.45.184:3002/';


const port = process.env.PORT || 3000;
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function response(req, res) {
    res.sendFile(path.join(__dirname, 'assets/exPaperDetail.html'));
});

app.use('/', express.static(__dirname + '/assets'));


proxy.on('error', function (err, req, res) {
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });
});

// proxy.on('proxyReq', function(proxyReq, req, res, options) {
// 	if(req.method == "POST" && req.body){
// 		proxyReq.write(req.body);
// 		proxyReq.end();
// 	}
// });

app.get('/api/*', function (req, res) {
    delete req.headers.host;
    proxy.web(req, res, {
        target: base_url,
        // auth: 'eyJhbGciOiJIUzI1NiJ9.eyJleHBpcmVBdCI6MTUxMjk2Mzg1NjExNiwiZXhwIjoxNTEyOTYzODU2LCJ1c2VySWQiOjQzNCwiY3JlYXRlQXQiOjE1MTIzNTkwNTYxMTZ9.otEQObAXqdUXhjNQUZhy-OL4chj_rVt-7Y1zNPuFihA'
    }, function (e) {
        console.log(e)
    });
}).post('/api/*', function (req, res) {
    delete req.headers.host;
    proxy.web(req, res, {
        target: base_url
    }, function (e) {
        console.log(e)
    });
}).put('/api/*', function (req, res) {
    delete req.headers.host;
    proxy.web(req, res, {
        target: base_url
    }, function (e) {
        console.log(e)
    });
}).delete('/api/*', function (req, res) {
    delete req.headers.host;
    proxy.web(req, res, {
        target: 'http://120.55.45.184:9032',
    }, function (e) {
        console.log(e)
    })
})



app.listen(port, '0.0.0.0', function onStart(error) {
    if (error) {
        console.log(error);
    }
    console.info('Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});


