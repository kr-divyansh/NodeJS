// event driven programming
//  when we click ,a event listener  is raised and the request goes into the event queue from where it is picked up by the event loop and handled by the event handler function 

// single threaded ---->Node.js is single-threaded in terms of its main JavaScript execution thread.


const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(req);

    // Home / Calculator Page
    if (req.url === '/' && req.method === 'GET') {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');

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

        // Asynchronous file writing
        fs.writeFile('result.txt', `Sum = ${sum}`, (err) => {
            if (err) {
                console.error('File writing error:', err);

                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Unable to save the result');
                return;
            }

            console.log('Result saved successfully!');

            res.setHeader('Content-Type', 'text/html; charset=utf-8');

            res.end(`
                <h1>Calculator Result</h1>
                <h2>Sum = ${sum}</h2>
                <p>Result has also been saved in result.txt</p>
                <a href="/">Back to Calculator</a>
            `);
        });
    }

    // 404 Page
    else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end('<h1>404 - Page Not Found</h1>');
    }
});

server.listen(3003, () => {
    console.log('Server running at http://localhost:3003');
});
