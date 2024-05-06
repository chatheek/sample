const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3001;

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like index.html)
app.use(express.static('public'));

// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sample'
});

// Connect to the database
connection.connect();

// Handle form submissions
app.post('/submit', (req, res) => {
    const { name, email } = req.body;

    // Insert data into the database
    connection.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (error, results, fields) => {
        if (error) {
            res.status(500).send('Error saving data to the database');
            return;
        }

        res.send('Data saved successfully');
    });
});

// Define a route for the root URL
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
