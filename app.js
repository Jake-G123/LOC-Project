import express from 'express';
//import {divisionInfo} from "public/js/loc.js";

//create an instance of an express application
const app = express();

// Enable static file serving
app.use(express.static('public'));

//Define the port number where our server will listen 
const PORT = 3004;

const now = new Date();

//const fields = [];

const divisionInfo = {
    "fine-arts": ["Music", "Paul Metevier", "Christie Gilliland", "Monica Bowen", "Liz Peterson", "Name", "no", "no", "notes"],
    "humanities": ["Communication Studies", "Katie Cunnion", "Jamie Fitzgerald", "Lisa Luengo", "Liz Peterson", "Name", "no", "no", "notes"],
    "social-science": ["Anthropology", "Mark Thomason", "Christie Gilliland", "Joy Crawford", "Liz Peterson", "Name", "no", "no", "notes"],
    "english": ["English", "Ian Sherman", "Jamie Fitzgerald", "Jake Frye", "Liz Peterson", "Name", "no", "no", "notes"],
    "science": ["Anatomy and Physiology", "Katy Shaw and Danny Najera", "Miebeth Bustillo-Booth", "Nicole Feider", "Heather Lambert", "Name", "no", "no", "notes"],
    "BL&E": ["Accounting", "Lea Ann Simpson", "Lea Ann Simpson", "Jane Swenson", "Mary Singer", "Name", "no", "no", "notes"],
    "technology": ["Aviation", "Michael Wood", "Lea Ann Simpson", "Josh Archer", "Angie Brenner", "Name", "no", "no", "notes"],
    "health-science": ["Practical Nursing", "Leslie Kessler", "Lionel Candido Flores", "Thom Jackson", "Liz Peterson", "Name", "no", "no", "notes"],
    "trades": ["Automotive Technology", "David Lewis", "Lea Ann Simpson", "Ben Orr", "Mary Singer", "Name", "no", "no", "notes"],
    "tran-studies": ["Health and Physical Education", "Paul Metevier", "Lionel Candido Flores", "Thom Jackson", "Liz Peterson", "Name", "no", "no", "notes"]
};

const fields = Object.entries(divisionInfo).map(([key, info]) => ({
  division: key,
  program: info[0],
  chair: info[1],
  dean: info[2],
  loc: info[3],
  contact: info[4],
  payee: info[5],
  paid: info[6],
  submitted: info[7],
  note: info[8],
  timestamp: new Date().toLocaleString()
}));

app.set ('view engine', 'ejs');

app.use (express.urlencoded({ extended: true }));

//Define a default "route" ('/')
//req: contains information about the incoming request
//res: allows us to send back a response to the client
app.get('/', (req, res) => {
    //res.send('Welcome to ice cream!');
    res.render('home');
});

app.get('/summary', (req, res) => {
    res.render('summary', {fields});
});

app.post('/submit-button', (req, res) => {
    const field = {
        division : divisionInfo.key,
        chair : req.body.chair,
        dean : req.body.dean,
        loc : req.body.loc,
        contact : req.body.loc,
        payee : req.body.payee,
        paid : req.body.paid,
        submitted : req.body.submitted,
        note : req.body.note,
        timestamp: new Date().toLocaleString()
    }

    fields.push(field);
    console.log(fields);
    res.render('summary', { fields, message: 'Submission saved' });
})

//Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
}); 