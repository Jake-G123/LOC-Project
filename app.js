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
        "Music":["Paul Metevier", "Christie Gilliland", "Monica Bowen", "Liz Peterson", "Name", "no", "no", "notes"],
        "Communication Studies":["Katie Cunnion", "Jamie Fitzgerald", "Lisa Luengo", "Liz Peterson", "Name", "no", "no", "notes"],
        "Anthropology":["Mark Thomason", "Christie Gilliland", "Joy Crawford", "Liz Peterson", "Name", "no", "no", "notes"],
        "History":[],
        "Political Science":[],
        "Psychology":[],
        "English":["Ian Sherman", "Jamie Fitzgerald", "Jake Frye", "Liz Peterson", "Name", "no", "no", "notes"],
        "Anatomy and Physiology":["Katy Shaw and Danny Najera", "Miebeth Bustillo-Booth", "Nicole Feider", "Heather Lambert", "Name", "no", "no", "notes"],
        "Biology/Environmental Science":[],
        "Geology/Oceanography":[],
        "Accounting":["Lea Ann Simpson", "Lea Ann Simpson", "Jane Swenson", "Mary Singer", "Name", "no", "no", "notes"],
        "Business Management":[], 
        "Business Marketing/Entrepreneurship":[],
        "Aviation":["Michael Wood", "Lea Ann Simpson", "Josh Archer", "Angie Brenner", "Name", "no", "no", "notes"],
        "CAD Design and Engineering Tech":[],
        "Natural Resources":[],
        "Practical Nursing":["Leslie Kessler", "Lionel Candido Flores", "Thom Jackson", "Liz Peterson", "Name", "no", "no", "notes"],
        "Physical Therapist Assistant":[],
        "Automotive Technology":["David Lewis", "Lea Ann Simpson", "Ben Orr", "Mary Singer", "Name", "no", "no", "notes"],
        "Manufacturing":[],
        "Health and Physical Education":["Paul Metevier", "Lionel Candido Flores", "Thom Jackson", "Liz Peterson", "Name", "no", "no", "notes"]
        /*
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
        */
    };
    const programInfo = {
        "fine-arts": ["Music"],
        "humanities": ["Communication Studies"],
        "social-science": ["Anthropology","History","Political Science","Psychology"],
        "english": ["English"],
        "science": ["Anatomy and Physiology","Biology/Environmental Science","Geology/Oceanography"],
        "BL&E": ["Accounting","Business Management", "Business Marketing/Entrepreneurship"],
        "technology": ["Aviation","CAD Design and Engineering Tech","Natural Resources"],
        "health-science": ["Practical Nursing","Physical Therapist Assistant"],
        "trades": ["Automotive Technology","Manufacturing"],
        "tran-studies": ["Health and Physical Education"]
    }
    function getDivision(program, programInfo) {
    for (const division in programInfo) {
        if (programInfo[division].includes(program)) {
            return division;
        }
    }
    return "";
    }

const fields = Object.entries(divisionInfo).map(([key, info]) => ({
    division: getDivision(key, programInfo),
  program: key,
  chair: info[0],
  dean: info[1],
  loc: info[2],
  contact: info[3],
  payee: info[4],
  paid: info[5],
  submitted: info[6],
  notes: info[7],
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
        division: req.body.divName,
        program : req.body.programName,
        chair : req.body.chair,
        dean : req.body.dean,
        loc : req.body.loc,
        contact : req.body.loc,
        payee : req.body.payee,
        paid : req.body.paid,
        submitted : req.body.submitted,
        notes : req.body.notes,
        timestamp: new Date().toLocaleString()
    }
    const existingIndex = fields.findIndex(item => item.division === field.division);

    if (existingIndex !== -1) {
        fields[existingIndex] = field;
    } else {
        fields.push(field);
    }
    console.log(fields);
    res.render('summary', { fields, message: 'Submission saved' });
});


//Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
}); 