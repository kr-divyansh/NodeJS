const http = require('http');
const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);

    if (req.url === '/home'){
        return res.end('<h1> welcome to the Home Page</h1>');
    }

    if(req.url ==='/men'){
        return res.end('<h1> welcome to the men Page</h1>');
    }

    if(req.url ==='/women'){
        return res.end('<h1> welcome to the women Page</h1>');
    }
    if(req.url ==='/kids'){
      
        return res.end('<h1> welcome to the kids Page</h1>');
    }
    if(req.url ==='/cart'){
        return res.end('<h1> welcome to the cart Page</h1>');
    }
    else{
        res.statusCode = 404;
        return res.end('<h1>404 Not Found</h1>');
    }
});
const PORT = 3002;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

