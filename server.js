//dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

//express app setup
var app = express();
var PORT = process.env.PORT || 3000;

//express app setup for data parsing handling
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//array for storing data results from app form
var friends = [
    {
        name: "Pam Beesly",
        photo: "https://media3.giphy.com/media/YLgIOmtIMUACY/giphy.gif",
        answers: ["1", "1", "1", "1", "1", "1", "1", "4", "1", "5",]
    },
    {
        name: "Jim Halpert",
        photo: "https://media2.giphy.com/media/13qZypst0zK384/giphy.gif",
        answers: ["1", "1", "1", "1", "1", "1", "1", "2", "1", "2",]
    },
    {
        name: "Dwight",
        photo: "https://media.giphy.com/media/22CEvbj04nLLq/giphy.gif",
        answers: ["3", "3", "3", "3", "3", "3", "3", "3", "3", "3",]
    }, 
    {
        name: "Angela Martin",
        photo: "https://media0.giphy.com/media/EqG2NqUhT3dzq/giphy.gif",
        answers: ["3", "3", "3", "3", "3", "3", "3", "3", "3", "3",]
    },
    {
        name: "Michael Scott",
        photo: "https://media3.giphy.com/media/jOpLbiGmHR9S0/giphy.gif",
        answers: ["4", "4", "4", "4", "4", "4", "4", "4", "4", "4",]
    },
    {
        name: "Holly Flax",
        photo: "https://media1.giphy.com/media/Y7sfNuTjiv4L6/giphy.gif",
        answers: ["4", "4", "4", "4", "4", "4", "4", "4", "4", "4",]
    }
];

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "app/public/home.html"));
});

app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "app/public/survey.html"));
});

app.get("/api/friends", function(req, res) {
    return res.json(friends);
});

app.post("/api/friends", function(req, res) {
    var newfriend = req.body;
    console.log(newfriend);

    var a = newfriend.answers;
    var b;
    var diff = 1000;
    var match = "";
    var matchImg = "";

    for (var i=0; i < friends.length; i++) {
        b = friends[i].answers;
        
        var sum = 0;
        for (var j=0; j < a.length; j++) {
            sum += Math.abs(((b[j]) - (a[j])));
        }
        

        if (sum < diff) {
            diff = sum;
            match = friends[i].name;
            matchImg = friends[i].photo;
        }
    };
    console.log(`Your Best Match: ${match}`);
    
    friends.push(newfriend);
    res.json({match:match, matchImg: matchImg});

});



app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});