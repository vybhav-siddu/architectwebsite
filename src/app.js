const express = require('express');
const path = require("path");
const app = express();
const ejs = require("ejs");
const hbs = require("hbs");
const MongoClient = require('mongodb').MongoClient;
const url ='mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'arc';

//database connection
require("./db/conn");


//import of contact page contents
const contact_con = require("./models/contact");

//port
const port = process.env.PORT || 4000;

//setting path
const static_path = path.join(__dirname, "../public"); 
const tamplate_path = path.join(__dirname, "../templates/views"); 
const partial_path = path.join(__dirname, "../templates/partials"); 

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", tamplate_path);
hbs.registerPartials(partial_path);

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/about", (req, res) => {
    res.render("about");
});
app.get("/index", (req, res) => {
    res.render("index");
});
app.get("/project", (req, res) => {
    res.render("project");
});
app.get("/contact", (req, res) => {
    res.render("contact");
});
app.get("/project-JUGGERNAUT", (req, res) => {
    res.render("project-JUGGERNAUT");
});
app.get("/project-PARALLELS", (req, res) => {
    res.render("project-PARALLELS");
});
app.get("/project-CROSS", (req, res) => {
    res.render("project-CROSS");
});
app.get("/bimages", (req, res) => {
    res.render("bimages");
});
app.get("/cicimages", (req, res) => {
    res.render("cicimages");
});
app.get("/vrimages", (req, res) => {
    res.render("vrimages");
});
app.get("/wrimages", (req, res) => {
    res.render("wrimages");
});
app.get("/misimages", (req, res) => {
    res.render("misimages");
});
app.get("/admin", (req, res) => {
    res.render("admin");
});
app.get("/cimages", (req, res) => {
    res.render("cimages");
});
app.get("/jimages", (req, res) => {
    res.render("jimages");
});
app.get("/pimages", (req, res) => {
    res.render("pimages");
});
app.get("/feedback", (req, res) => {
    res.render("feedback");
});
app.get("/admindisplay", (req, res) => {
    res.render("admindisplay");
});






app.post("/contact", async(req, res) => {  
    try {
            const contactUser = new contact_con({
                user_name : req.body.user_name,
                user_email : req.body.user_email,
                user_contact : req.body.user_contact,
                user_message : req.body.user_message,
            })
        const registered = await contactUser.save();
        res.status(201).render("feedback");
    } catch (error) {
        res.status(400).send(error);
    }
})

client.connect(function(err){
    console.log("Connected");
});


app.get('/list', (req, res) => {

    
        const db = client.db(dbName);
        const collection = db.collection('contacts');

        collection.find({}).toArray(function(err, contact_list) {
            res.render('list.ejs', {'contacts': contact_list})
        });
    
})


//admin login check
app.post("/admin", (req, res) => {
    try{
        var u = 'admin';
        var p = '1234';

        const username = req.body.username;
        const password = req.body.password;
        if(username == u && password == p) {
           
             res.render("admindisplay");  
            
                 
        }
        else
        {
            res.render("login_failed");
        }
    } catch (error) {
        res.status(400).send(error);
    }
})

app.listen(port, () => {
    console.log(`Server running at ${port}`);
})