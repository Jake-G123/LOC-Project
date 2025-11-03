import express from 'express';
import {divisionInfo} from "./loc.js";
/* Division
Academic Program
Division Chair
Dean
LOC Rep
PEN Contact
Payee(s)
Has Been Paid (Yes/No)
Report Submitted (Yes/No)
Notes*/
//create an instance of an express application
const app = express();

// Enable static file serving
app.use(express.static('public'));

//Define the port number where our server will listen 
const PORT = 3004;

const fields = [];
fields = divisionInfo;

app.set ('view engine', 'ejs');

app.use (express.urlencoded({ extended: true }));

//Define a default "route" ('/')
//req: contains information about the incoming request
//res: allows us to send back a response to the client
app.get('/', (req, res) => {
    //res.send('Welcome to ice cream!');
    res.render('home');
})

app.get('/confirm', (req, res) => {
    res.render('summary', {fields});
})

app.post('/submit', (req, res) => {
    const field = {
        division : req.body.div-name,
        chair : req.body.chair,
        dean : req.body.dean,
        rep : req.body.rep,
        contact : req.body.loc,
        payee : req.body.payee,
        paid : req.body.paid,
        submitted : req.body.submitted,
        note : req.body.note
    }

    fields.push(field);
    console.log(fields);

    res.render('summary', {field});
})

//Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
}); 