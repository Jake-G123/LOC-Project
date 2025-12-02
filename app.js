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
    const selectedYear = req.query.year || new Date().getFullYear();

    const [division] = await pool.query(`
        SELECT 
            DivisionName,
            MIN(DivisionChair) AS DivisionChair,
            MIN(Dean) AS Dean,
            MIN(LOCRep) AS LOCRep,
            MIN(PENContact) AS PENContact,
            MIN(DeadlineUpcoming) AS DeadlineUpcoming,
            MIN(ProgramID) AS ProgramID
        FROM ProgramFullInfo
        WHERE AcademicYear = ?
        GROUP BY DivisionName
    `, [selectedYear]);

    // Move divisions with DeadlineUpcoming = 'Yes' to top
    division.sort((a, b) => {
        if (a.DeadlineUpcoming === 'Yes' && b.DeadlineUpcoming === 'No') return -1;
        if (a.DeadlineUpcoming === 'No' && b.DeadlineUpcoming === 'Yes') return 1;
        return 0;
    });

    res.render('home', { division, selectedYear });
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
        `SELECT DivisionName, DivisionChair, Dean, LOCRep, PENContact, MAX(DeadlineUpcoming) AS DeadlineUpcoming
         FROM ProgramFullInfo 
         WHERE DivisionName = ?`,
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
        const selectedYear = req.query.year || new Date().getFullYear();

        const [rows] = await pool.query(
            'SELECT * FROM ProgramFullInfo WHERE AcademicYear = ?',
            [selectedYear]
        );

        res.render('summary', { fields: rows, selectedYear });
    } catch (err) {
        console.error('Error fetching programs:', err);
        res.status(500).send('Error loading programs.');
    }
});

app.get('/summary-data', async (req, res) => {
  const year = req.query.year;
  const [fields] = await pool.execute(
    `SELECT * FROM ProgramFullInfo WHERE AcademicYear = ?`,
    [year]
  );
  res.json({ fields });
});

app.post('/clone-year', async (req, res) => {
    const currentYear = parseInt(req.body.year);
    const nextYear = currentYear + 1;

    try {
        // Check if the next year already has data
        const [exists] = await pool.query(
            'SELECT COUNT(*) AS count FROM ProgramFullInfo WHERE AcademicYear = ?',
            [nextYear]
        );

        if (exists[0].count > 0) {
            // Already cloned, send back with a message or just redirect
            return res.redirect('/?year=' + nextYear);
        }

        // Grab all rows from the current year
        const [rows] = await pool.query(
            `SELECT DivisionName, ProgramName, DivisionChair, Dean, LOCRep, PENContact, Payees, HasBeenPaid, ReportSubmitted, Notes, DeadlineUpcoming
             FROM ProgramFullInfo
             WHERE AcademicYear = ?`,
            [currentYear]
        );

        if (rows.length === 0) {
            return res.redirect('/?year=' + currentYear); // Nothing to clone
        }

        // Prepare insert for next year
        const insertValues = rows.map(row => [
            row.DivisionName,
            row.ProgramName,
            row.DivisionChair,
            row.Dean,
            row.LOCRep,
            row.PENContact,
            row.Payees,
            row.HasBeenPaid,
            row.ReportSubmitted,
            row.Notes,
            nextYear,
            row.DeadlineUpcoming
        ]);

        const sql = `
            INSERT INTO ProgramFullInfo 
            (DivisionName, ProgramName, DivisionChair, Dean, LOCRep, PENContact, Payees, HasBeenPaid, ReportSubmitted, Notes, AcademicYear, DeadlineUpcoming)
            VALUES ?
        `;

        await pool.query(sql, [insertValues]);

        res.redirect('/?year=' + nextYear);
    } catch (err) {
        console.error('Error cloning year:', err);
        res.status(500).send('Failed to clone year.');
    }
});

app.post('/add-division', async (req, res) => {
    const { divName, chair, dean, loc, pen, year } = req.body;

    const deadlineUpcoming = req.body.deadlineUpcoming === 'Yes' ? 'Yes' : 'No';

    try {
        const sql = `
            INSERT INTO ProgramFullInfo 
                (DivisionName, DivisionChair, Dean, LOCRep, PENContact, DeadlineUpcoming, AcademicYear)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        await pool.query(sql, [
            divName,
            chair,
            dean,
            loc,
            pen,
            deadlineUpcoming,
            year
        ]);

        res.redirect('/?year=' + year);
    } catch (err) {
        console.error('Error adding division:', err);
        res.status(500).send('Failed to add division.');
    }
});

app.post('/submit-division', async (req, res) => {
    try {
        const { divName, chair, dean, loc, pen, deadlineUpcoming, academicYear } = req.body;

        // Ensure checkbox defaults to "No" if unchecked
        const deadlineValue = deadlineUpcoming === 'Yes' ? 'Yes' : 'No';

        // Bulk update all programs in this division and year
        const sql = `
            UPDATE ProgramFullInfo
            SET DivisionChair = ?, Dean = ?, LOCRep = ?, PENContact = ?, DeadlineUpcoming = ?
            WHERE DivisionName = ? AND AcademicYear = ?`;

        await pool.execute(sql, [
            chair,
            dean,
            loc,
            pen,
            deadlineValue,
            divName,
            academicYear
        ]);

        // Reload page with selected year
        res.redirect('/?year=' + academicYear);
    } catch (err) {
        console.error('Error updating division info:', err);
        res.status(500).send('Error updating division info.');
    }
});

app.post('/submit-button', async (req, res) => {
    const { ProgramID, DivisionName, ProgramName, DivisionChair, Dean, LOCRep, PENContact, Payees, HasBeenPaid, ReportSubmitted, Notes, AcademicYear } = req.body;

    try {
        // Update row and timestamp
        const sql = `
            UPDATE ProgramFullInfo
            SET DivisionName=?, ProgramName=?, DivisionChair=?, Dean=?, LOCRep=?, PENContact=?, Payees=?, HasBeenPaid=?, ReportSubmitted=?, Notes=?, timestamp=NOW()
            WHERE ProgramID=? AND AcademicYear=?`;
        
        await pool.execute(sql, [
            DivisionName,
            ProgramName,
            DivisionChair,
            Dean,
            LOCRep,
            PENContact,
            Payees,
            HasBeenPaid,
            ReportSubmitted,
            Notes,
            ProgramID,
            AcademicYear
        ]);

        // Return updated row
        const [updatedRows] = await pool.query(
            'SELECT * FROM ProgramFullInfo WHERE ProgramID=? AND AcademicYear=?',
            [ProgramID, AcademicYear]
        );

         res.redirect(`/summary?year=${AcademicYear}`);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Update failed' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});