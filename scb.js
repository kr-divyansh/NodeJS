

const fs = require('fs');

const userRequestHandler = (req, res) => {
    console.log(req.url, req.method);

    // HOME PAGE
    if (req.url === '/' && req.method === 'GET') {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');

        res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Home Page</title>
            </head>
            <body>
                <h1>Welcome to the Home Page</h1>

                <form action="/submit-details" method="POST">
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter your name"
                        required
                    >

                    <p>Gender:</p>

                    <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="male"
                        required
                    >
                    <label for="male">Male</label>

                    <input
                        type="radio"
                        id="female"
                        name="gender"
                        value="female"
                    >
                    <label for="female">Female</label>

                    <br><br>
                    <button type="submit">Submit</button>
                </form>
            </body>
            </html>
        `);

        return;
    }

    // HANDLE POST REQUEST
    else if (
        req.url === '/submit-details' &&
        req.method === 'POST'
    ) {
        const chunks = [];

        // Receive incoming chunks
        req.on('data', chunk => {
            console.log(chunk);
            chunks.push(chunk);//--->this will store the incoming data chunks in the 'chunks' array
        });

        // Runs when all request data has arrived
        req.on('end', () => {
            const body = Buffer.concat(chunks).toString();

            console.log('Complete request body:', body);

            const formData = new URLSearchParams(body); 

            const username = formData.get('username');
            const gender = formData.get('gender');

            const userDetails =
                `Username: ${username}\nGender: ${gender}\n`;

            fs.writeFile('user.txt', userDetails, (err) => {
                if (err) {
                    console.error('File writing error:', err);

                    res.statusCode = 500;
                    return res.end('Unable to save user details');
                }

                console.log('User details saved successfully!');

                res.statusCode = 302;
                res.setHeader('Location', '/');
                res.end();
            });
        });

        req.on('error', (err) => {
            console.error('Request error:', err);

            if (!res.writableEnded) {
                res.statusCode = 400;
                res.end('Request error');
            }
        });

        return;
    }

    // 404 PAGE
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('404 - Page Not Found');
};

module.exports = userRequestHandler;