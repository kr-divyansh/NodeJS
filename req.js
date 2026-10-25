const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);

    if (req.url === '/') {
        res.setHeader('Content-Type', 'text/html');

        res.write('<h1>Welcome to the Home Page</h1>');
        res.write('<form>');
        res.write("<input type='text' name='username' placeholder='Enter your name'>");
        res.write("<input type='submit' value='Submit'>");

        res.write('<p>Gender:</p>');
        res.write("<input type='radio' id='male' name='gender' value='male'>");
        res.write('<label for="male">Male</label>');

        res.write("<input type='radio' id='female' name='gender' value='female'>");
        res.write('<label for="female">Female</label>');

        res.write('<button type="submit">Submit</button>');
        res.write('</form>');

        return res.end();
    }
    else if(req.url.toLowerCase() === '/submit-details' && req.method === 'POST') {
        fs.writeFileSync("user.txt", "kumar divyansh");

    res.statusCode = 302;
    res.setHeader('Location', '/');
    }

    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
res.setHeader('Location', '/home');
    res.end('');
});

const PORT = 3001;

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});