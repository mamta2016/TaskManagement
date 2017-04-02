/*Intitialize express and mongoose*/
var multer = require("multer");
//var upload = multer({ dest: 'uploads/' })

var streamifier = require('streamifier');

var express = require('express');
var app = express();

var mongoose = require('mongoose');

/*This is to set the http headers*/

var cors = require('cors');

var bodyParser = require('body-parser');

var nodemailer = require('nodemailer');

/*Decalring from which folder/source will get the request*/

app.use(express.static(__dirname + '/app'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());

/*User schema*/
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {
        first: String,
        last: String
    },
    email: String,
    password: String,
    role: String,
    isSelectedUser: Boolean,
});

var User = mongoose.model('users', UserSchema);


/*Project schema*/

var ProjectSchema = new Schema({
    name: String,
    description: String,
    users: [],
});

var Project = mongoose.model('projects', ProjectSchema);

/*Issues schema*/

var IssuesSchema = new Schema({
    tracker: String,
    subject: String,
    description: String,
    status: String,
    assignee: String,
    assnedUsrId: String,
    priority: String,
    sDate: String,
    eDate: String,
    image: String,
    projectId: String,
    projectName: String,
});

var Issue = mongoose.model('issues', IssuesSchema);

/*
 * @mamta {string} db user
 * @mamta1992@ds015879 {string} db password
 * @taskmanagement {string} db name
 * (will get those details after login into mongo lab and creating db)
 */
/*this is to connect with mongolab */

var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var gfs;

var conn = mongoose.connection;
conn.once('open', function callback() {
    gfs = Grid(conn.db);
});

mongoose.connect('mongodb://mamta:mamta@ds161505.mlab.com:61505/taskmanagement', function(error, db) {
    if (error) {
        console.log(error);
    } else {
        console.log('Mongodb connected successfully');
    }
});

//login page

app.get('/loginUser/:email/:password', function(req, res) {
    var email = req.params.email;
    var password = req.params.password;
    console.log(email);
    console.log(password);
    User.findOne({
        "password": password,
        "email": email
    }, function(err, resp) {
        if (!resp) {
            resp = {
                password: '',
                email: '',
                msg: 'user does not exist'
            };
        }
        console.log(JSON.stringify(resp));
        return res.send(resp);

    });
});


//get all users from database

app.get('/usersList', function(req, res) {
    console.log('test');
    User.find({}, function(err, doc) {
        console.log(doc);
        res.send(doc);
    });
});

app.get('/userRoleList', function(req, res) {
    console.log('test');
    User.find({ "role": "User" }, function(err, doc) {
        console.log(doc);
        res.send(doc);
    });
});


//add new user in database

app.post("/newUser/", function(req, res) {
    var user = new User(req.body);
    console.log(JSON.stringify(user));
    user.save(req.body, function(err, doc) {
        res.send(' successfully ');
    });
});


app.post("/updateUser/", function(req, res) {
    var user = req.body;
    console.log(user);
    User.update({ "_id": user._id }, { $set: user }, function(err, resp) {
        console.log(resp);
        res.send(resp);
    });
});

app.post("/deleteUser/", function(req, res) {
    var user = req.body;
    console.log(user);
    User.remove({ "_id": user._id }, function(err, resp) {
        res.send(resp);
        console.log('aaaaaaaaa');
    });
});


/* projects  data  */

app.get('/ProjectList/', function(req, res) {
    console.log('project');
    Project.find({}, function(err, resp) {
        console.log(resp);
        res.send(resp);
    });
});

app.post("/createProject/", function(req, res) {
    var project = new Project(req.body);
    console.log(JSON.stringify(project));
    project.save(req.body, function(err, doc) {
        res.send(' project is created ');
    });
});

app.post("/updateProject/", function(req, res) {
    var project = req.body;
    console.log(project._id);
    Project.update({ "_id": project._id }, { $set: project }, function(err, resp) {
        console.log(resp);
        res.send(resp);
    });
});


app.post("/deleteProject/", function(req, res) {
    var project = req.body;
    console.log(project._id);
    Project.remove({ "_id": project._id }, function(err, resp) {
        console.log(resp);
        res.send(resp);
    });
});
/* Issues  data  */

app.get('/issuesList', function(req, res) {
    console.log('test');
    Issue.find({}, function(err, doc) {
        console.log(doc);
        res.send(doc);
    });
});

app.get('/issuesBugList', function(req, res) {
    console.log('test');
    Issue.find({ "tracker": "Bug" }, function(err, doc) {
        console.log(doc);
        res.send(doc);
    });
});


app.get('/countBugList', function(req, res) {
    console.log('test');
    Issue.find({ "tracker": "Bug" }).count(function(err, doc) {
        console.log(doc);
        return res.send(JSON.stringify(doc));
    });
});

app.get('/countNewBug', function(req, res) {
    console.log('test');
    Issue.find({
        "tracker": "Bug",
        "status": "New"
    }).count(function(err, doc) {
        console.log(doc);
        return res.send(JSON.stringify(doc));
    });
});

app.get('/countCpltBug', function(req, res) {
    console.log('test');
    Issue.find({ "tracker": "Bug", "status": "Completed" }).count(function(err, doc) {
        console.log(doc);
        return res.send(JSON.stringify(doc));
    });
});

app.get('/countInPrBug', function(req, res) {
    console.log('test');
    Issue.find({
        "tracker": "Bug",
        "status": "In Progress"
    }).count(function(err, doc) {
        console.log(doc);
        return res.send(JSON.stringify(doc));
    });
});

app.get('/countOnHoldBug', function(req, res) {
    console.log('test');
    Issue.find({
        "tracker": "Bug",
        "status": "On Hold"
    }).count(function(err, doc) {
        console.log(doc);
        return res.send(JSON.stringify(doc));
    });
});


///////////////////task Count

app.get('/issueTaskList', function(req, res) {
    console.log('test');
    Issue.find({
        "tracker": "Task"
    }, function(err, doc) {
        console.log(doc);
        res.send(doc);
    });
});

app.get('/countTaskList', function(req, res) {
    console.log('test');
    Issue.find({
        "tracker": "Task"
    }).count(function(err, doc) {
        console.log(doc);
        res.send(JSON.stringify(doc));
    });
});

app.get('/countNewTask', function(req, res) {
    console.log('test');
    Issue.find({
        "tracker": "Task",
        "status": "New"
    }).count(function(err, doc) {
        console.log(doc);
        return res.send(JSON.stringify(doc));
    });
});

app.get('/countCpltTask', function(req, res) {
    console.log('test');
    Issue.find({
        "tracker": "Task",
        "status": "Completed"
    }).count(function(err, doc) {
        console.log(doc);
        return res.send(JSON.stringify(doc));
    });
});

app.get('/countInPrTask', function(req, res) {
    console.log('test');
    Issue.find({
        "tracker": "Task",
        "status": "In Progress"
    }).count(function(err, doc) {
        console.log(doc);
        return res.send(JSON.stringify(doc));
    });
});

app.get('/countOnHoldTask', function(req, res) {
    console.log('test');
    Issue.find({
        "tracker": "Task",
        "status": "On Hold"
    }).count(function(err, doc) {
        console.log(doc);
        return res.send(JSON.stringify(doc));
    });
});

app.post("/newIssue", function(req, res) {
    var issue = new Issue(req.body);
    console.log(JSON.stringify(issue));
    issue.save(req.body, function(err, doc) {
        res.send(' successfully ');
    });
});

app.post("/updateIssue/", function(req, res) {
    var issue = req.body;
    console.log(issue);
    Issue.update({ "_id": issue._id }, { $set: issue }, function(err, resp) {
        console.log(resp);
        res.send(resp);
    });
});

app.post("/deleteIssue/", function(req, res) {
    var issue = req.body;
    console.log(issue);
    Issue.remove({
        "_id": issue._id
    }, function(err, resp) {
        res.send(resp);
        console.log('deleted');
    });
});

var server = app.listen(9000, function() {
    var port = server.address().port;
    console.log('Express server listening on port %s.', port);
});