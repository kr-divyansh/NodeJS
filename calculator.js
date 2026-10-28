
const http = require('http');

const server = http.createServer((req, res) => {
    // Home / Calculator Page
    if (req.url === '/' && req.method === 'GET') {
        res.setHeader('Content-Type', 'text/html');

        res.end(`
            <h1>Simple Calculator</h1>

            <form action="/calculator-result" method="GET">
                <input
                    type="number"
                    name="num1"
                    placeholder="Enter first number"
                    required
                >
 <input
       type="number"
          name="num2"
      placeholder="Enter second number"
         required
                >
                <button type="submit">Sum</button>
            </form>
        `);
    }

    // Calculator Result Page
    else if (
        req.url.startsWith('/calculator-result') &&
        req.method === 'GET'
    ) {
        const url = new URL(req.url, 'http://localhost:3003');

        const num1 = Number(url.searchParams.get('num1'));
        const num2 = Number(url.searchParams.get('num2'));

        const sum = num1 + num2;

        res.setHeader('Content-Type', 'text/html');

        res.end(`
            <h1>Calculator Result</h1>
            <h2>Sum = ${sum}</h2>

            <a href="/">Back to Calculator</a>
        `);
    }

    // 404 Page
    else {
        res.statusCode = 404;
        res.end('404 - Page Not Found');
    }
});

server.listen(3003, () => {
    console.log('Server running at http://localhost:3003');
});
