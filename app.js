import express from 'express';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';

//create an instance of an express application
const app = express();

// Enable static file serving
app.use(express.static('public'));

//Define the port number where our server will listen 
const PORT = 3004;

dotenv.config();

// Set up MySQL connection pool
const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Enable parsing of URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Default home page route
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/summary', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM ProgramFullInfo');

        res.render('summary', { fields: rows });

    } catch (err) {
        console.error('Error fetching programs:', err);
        res.status(500).send('Error loading programs.');
    }
});

app.post('/submit-button', async (req, res) => {
    try {
        // Get the program data from the form submission
        const program = req.body;

        // Optional: add a timestamp for tracking
        program.timestamp = new Date();

        console.log('New program submission:', program);

        // Define an INSERT query for ProgramFullInfo
        const sql = `
            INSERT INTO ProgramFullInfo 
            (ProgramName, DivisionName, DivisionChair, Dean, LOCRep, PENContact, Payees, HasBeenPaid, ReportSubmitted, Notes) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const params = [
            program.programName,    // match your form input names
            program.divName,
            program.chair,
            program.dean,
            program.loc,
            program.pen,
            program.payee,
            program.paid,
            program.submitted,
            program.notes
        ];

        const [result] = await pool.execute(sql, params);

        console.log('Program inserted with ID:', result.insertId);

        res.redirect('/summary');

    } catch (err) {
        console.error('Error inserting program:', err);

        if (err.code === 'ER_DUP_ENTRY') {
            res.status(409).send('A program with this name already exists.');
        } else {
            res.status(500).send('Sorry, there was an error processing your submission. Please try again.');
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});