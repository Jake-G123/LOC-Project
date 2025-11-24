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
app.get('/', async (req, res) => {
    const [division] = await pool.query('SELECT * FROM division');
    res.render('home', { division: division });
});

// API to get division info by name
app.get('/division/:name', async (req, res) => {
    try {
        const divisionName = req.params.name;
        const [rows] = await pool.query('SELECT * FROM division WHERE division_name = ?', [divisionName]);
        if (rows.length === 0) return res.status(404).send('Division not found');
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Database error');
    }
});

app.get('/db-test', async(req, res) => {


    // try/catch block for error handling
    try {
        const [loc] = await pool.query('SELECT * FROM programfullinfo');
        // Send the orders data back to the browser as JSON
        res.send(loc);
    } catch(err) {
        // If ANY error happened in the 'try' block, this code runs
        // Log the error to the server console (for developers to see)
        console.error('Database error:', err);

        // Send an error response to the browser
        // status(500) means "Internal Server Error"
        res.status(500).send('Database error: ' + err.message);
    }
});

app.get('/db-test-division', async(req, res) => {


    // try/catch block for error handling
    try {
        const [loc] = await pool.query('SELECT * FROM division');
        // Send the orders data back to the browser as JSON
        res.send(loc);
    } catch(err) {
        // If ANY error happened in the 'try' block, this code runs
        // Log the error to the server console (for developers to see)
        console.error('Database error:', err);

        // Send an error response to the browser
        // status(500) means "Internal Server Error"
        res.status(500).send('Database error: ' + err.message);
    }
});

app.get('/summary', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM programfullinfo');

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

        const sql = `
            INSERT INTO ProgramFullInfo 
            (ProgramName, DivisionName, DivisionChair, Dean, LOCRep, PENContact, Payees, HasBeenPaid, ReportSubmitted, Notes) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const params = [
            program.programName,
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