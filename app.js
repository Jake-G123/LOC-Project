import express from 'express';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';

//create an instance of an express application
const app = express();

// Enable static file serving
app.use(express.static('public'));

// Set EJS as the view engine
app.set('view engine', 'ejs');

//Define the port number where our server will listen 
const PORT = 3010;

dotenv.config();

// Set up MySQL connection pool
const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

// Enable parsing of URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Default home page route
app.get('/', async (req, res) => {
    const [division] = await pool.query('SELECT * FROM division');
    res.render('home', { division: division });
});

app.get('/db-test', async(req, res) => {


    // try/catch block for error handling
    try {
        const [loc] = await pool.query('SELECT * FROM ProgramFullInfo');
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

app.get('/division-info', async (req, res) => {
    const divisionName = req.query.name;

    const [rows] = await pool.query(
        'SELECT DivisionName, DivisionChair, Dean, LOCRep, PENContact FROM ProgramFullInfo WHERE divisionName = ?',
        [divisionName]
    );

    res.send(rows[0]);
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
        const [rows] = await pool.query('SELECT * FROM ProgramFullInfo ORDER BY DivisionName, ProgramName');

        res.render('summary', { fields: rows });

    } catch (err) {
        console.error('Error fetching programs:', err);
        res.status(500).send('Error loading programs.');
    }
});

app.post('/submit-division', async (req, res) => {
    const { division_id, divName, chair, dean, loc, pen } = req.body;

    try {
        const sql = `
            UPDATE ProgramFullInfo 
            SET DivisionName = ?, DivisionChair = ?, Dean = ?, LOCRep = ?, PENContact = ? WHERE DivisionName = ?`;

        await pool.query(sql, [
            divName,
            chair,
            dean,
            loc,
            pen,
            divName
        ]);

        res.redirect('/');
    } catch (err) {
        console.error("Error updating division:", err);
        res.status(500).send("Update failed.");
    }
});

app.post('/submit-button', async (req, res) => {
    try {
        const program = req.body;

        // Debug: see what was submitted
        console.log('Form submission:', program);

        // Make sure ProgramID exists
        if (!program.ProgramID) {
            return res.status(400).send('Error: ProgramID is missing.');
        }

        // Default to null if fields are empty
        const DivisionName = program.DivisionName || null;
        const ProgramName = program.ProgramName || null;
        const DivisionChair = program.DivisionChair || null;
        const Dean = program.Dean || null;
        const LOCRep = program.LOCRep || null;
        const PENContact = program.PENContact || null;
        const Payees = program.Payees || null;
        const HasBeenPaid = program.HasBeenPaid === 'yes' ? 'yes' : 'no';
        const ReportSubmitted = program.ReportSubmitted === 'yes' ? 'yes' : 'no';
        const Notes = program.Notes || null;
        const ProgramID = program.ProgramID;

        const sql = `
            UPDATE ProgramFullInfo
            SET DivisionName = ?, ProgramName = ?, DivisionChair = ?, Dean = ?, LOCRep = ?, PENContact = ?, Payees = ?, HasBeenPaid = ?, ReportSubmitted = ?, Notes = ?
            WHERE ProgramID = ?
        `;

        const params = [DivisionName, ProgramName, DivisionChair, Dean, LOCRep, PENContact, Payees, HasBeenPaid, ReportSubmitted, Notes, ProgramID];

        const [result] = await pool.execute(sql, params);

        console.log(`Program with ID ${ProgramID} updated successfully.`);

        res.redirect('/summary');

    } catch (err) {
        console.error('Error updating program:', err);
        res.status(500).send('Database update error: ' + err.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});