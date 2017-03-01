var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();

// You can store key-value pairs in express, here we store the port setting
app.set('port', (process.env.PORT || 3000));

// bodyParser needs to be configured for parsing JSON from HTTP body
app.use(bodyParser.json());
app.use(cors());

// Simple hello world route
app.get('/', function(req, res) {
    res.send("this is a test");
});

var users = [{
    id: '0',
    username: "Priya",
    password: "1234",
   
},
{
    id: '1',
    username: "test",
    password: "1234"
},
{
    id: '2',
    username: "sole",
    password: "1234"
}
];

var posts = [
        {
            id: 0,
            user: {
                id: 1,
                username: "dtrump",
                profileImageSmall: "http://core0.staticworld.net/images/article/2015/11/111915blog-donald-trump-100629006-primary.idge.jpg" 
            },                                                 
            image: "http://media1.fdncms.com/sacurrent/imager/u/original/2513252/donald_trump4.jpg",
            imageThumbnail: "http://media1.fdncms.com/sacurrent/imager/u/original/2513252/donald_trump4.jpg",
            likes: 892, 
            caption: "Always winning #elections",
            tags: ['elections'],         
            comments: [
                {
                    id: 0,
                    user: {
                        id: 2,
                        username: "POTUS"
                    },                    
                    comment: "You're never going to make it don #losing",
                    userRefs: [],
                    tags: ["losing"]
                },
                {
                    id: 1,
                    user: {
                        id: 3,
                        username: "HillaryC"
                    },                    
                    comment: "Damn right @POTUS",
                    userRefs: ["POTUS"],
                    tags: []       
                },
            ]

        }
    ]

app.get('/posts', function(req, res) {
    res.json(posts);
});

app.get('/posts/:id', function(req, res) {    
    res.json(posts[req.params.id]);
});

app.get('/user/:id', function(req, res) {
    res.json(user[req.params.id]);
});

//login

app.post('/login', function(req, res) {
    console.log(req.body);
    var u = users.find(function(element){
        console.log(element);
        return (element.username === req.body.username) && (element.password === req.body.pass);
    });

    if (u !== undefined) {
        return res.json({id: u.id, username: u.username});
    }
    else{
        return res.sendStatus(401);
    }
    
});

app.post('/register', function(req, res) {

});

app.get('/searchUser/:word', function(req, res){
    console.log(req.params);
    var upperCaseSearchWord = req.params.word.toUpperCase();
    if(req.params.word.length > 0){
        var matches = users.filter(function(u){
            var testString = u.username.toUpperCase();
            console.log(upperCaseSearchWord);
            console.log(testString);
            return testString.includes(upperCaseSearchWord);
        });
    }
    console.log(matches);
    res.json(matches);
});


// start listening for incoming HTTP connections
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});


