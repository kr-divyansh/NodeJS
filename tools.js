const http = require('http');

const server = http.createServer((req, res) => {
    // Your request handling logic here
    console.log(req);
});
const PORT = 3002;

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
