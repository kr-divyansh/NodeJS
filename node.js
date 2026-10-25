// simple node server
const http = require('http');
const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);
    //res.seteHeader('Content-Type','json');
    //process.exit(1);// stop the server after first request
    if (req.url === '/') {
        return res.end('<h1>Home Page</h1>');
    }

    if (req.url === '/about') {
        res.write("<h1>wahi ruk abhi aya</h1>");
        return res.end('<h1>About Page</h1>');
    }

    if (req.url === '/contact') {
        return res.end('<h1>Contact Page</h1>');
    }

    res.statusCode = 404;
    return res.end('<h1>404 Not Found</h1>');
});

//taking input from the user

if(req.url ==='/'){
    res.write('<h1> welcome to the Home Page</h1>');
    res.write("<body><h1>this is the home page</h1>");
    res.write("<form>");
res.write("<input type='text' name='username' placeholder='Enter your name'>");
res.write("<input type='submit' value='Submit'>");
res.write("<label for='gender'>Gender:</label>");
res.write("<input type='radio' id='male' name='gender' value='male'> Male");
res.write('<label for="male">Male</label>');
res.write("<input type='radio' id='female' name='gender' value='female'> Female");
res.write('<label for="female">Female</label>');
res.write('<button type="submit">Submit</button>');
res.write("</form>");
return res.end();
      res.write("</body>");         
}

   // process.exit(1);// stop the server after first request
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});