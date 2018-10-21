//dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
// var fonts = require("google-fonts");

// fonts.add({
//     "Caveat": true,
//     "Nixie One": true
// });

//express app setup
var app = express();
var PORT = process.env.PORT || 3000;

//express app setup for data parsing handling
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//setup for external css file
app.use(express.static("app/public"));

//array for storing data results from app form
var friends = [
    {
        name: "Pam Beesly",
        photo: "https://media3.giphy.com/media/YLgIOmtIMUACY/giphy.gif",
        answers: [5, 2, 5, 5, 4, 4, 5, 3, 3, 2]
    },
    {
        name: "Jim Halpert",
        photo: "https://media2.giphy.com/media/13qZypst0zK384/giphy.gif",
        answers: [1, 2, 4, 3, 5, 5, 1, 1, 3, 3]
    },
    {
        name: "Dwight",
        photo: "https://media.giphy.com/media/22CEvbj04nLLq/giphy.gif",
        answers: [5, 2, 5, 1, 1, 1, 1, 1, 1, 5]
    }, 
    {
        name: "Angela Martin",
        photo: "https://media0.giphy.com/media/EqG2NqUhT3dzq/giphy.gif",
        answers: [3, 1, 3, 1, 2, 1, 1, 1, 1, 5]
    },
    {
        name: "Michael Scott",
        photo: "https://media3.giphy.com/media/jOpLbiGmHR9S0/giphy.gif",
        answers: [5, 5, 5, 5, 1, 3, 5, 5, 4, 5]
    },
    {
        name: "Jan Levinson",
        photo: "https://media.giphy.com/media/mWgsJLBwDlQvC/giphy.gif",
        answers: [5, 2, 3, 3, 1, 4, 3, 2, 1, 5]
    },
    {
        name: "Oscar Martinez",
        photo: "https://media1.giphy.com/media/qD0ZAVoaERFWU/giphy.gif",
        answers:[3, 3, 4, 3, 3, 5, 2, 3, 1, 5]
    },
    {
        name: "Stanley Hudson",
        photo: "https://media0.giphy.com/media/dEdmW17JnZhiU/giphy.gif",
        answers: [2, 1, 2, 2, 5, 1, 1, 1, 1, 3]
    },
    {
        name: "Meredith Palmer",
        photo: "https://media0.giphy.com/media/kHuPjCKak15io/giphy.gif",
        answers: [1, 5, 2, 2, 3, 1, 1, 2, 4, 5]
    },
    {
        name: "Creed Bratton",
        photo: "https://media3.giphy.com/media/2vdwcXyS0jErK/giphy.webp",
        answers: [1, 4, 1, 1, 2, 1, 1, 1, 5, 4]
    },
    {
        name: "Toby Flenderson",
        photo: "https://media1.giphy.com/media/jd67FBCcOXisE/giphy.webp",
        answers: [1, 3, 4, 5, 1, 5, 4, 5, 1, 3]
    },
    {
        name: "Kelly Kapoor",
        photo: "https://media3.giphy.com/media/he8aSdri52ZnW/giphy.webp",
        answers: [4, 5, 3, 3, 2, 1, 5, 4, 3, 5]
    },
    {
        name: "Ryan Howard",
        photo: "https://media2.giphy.com/media/tw5TJsxY8k49y/200w.webp",
        answers: [2, 5, 1, 1, 4, 5, 3, 1, 3, 2]
    },
    {
        name: "Phyllis Vance", 
        photo: "https://media3.giphy.com/media/dSeZLXVCMT4Qg/giphy.webp",
        answers: [2, 1, 5, 5, 2, 4, 5, 5, 1, 1]
    },
    {
        name: "Kevin Malone",
        photo: "https://media2.giphy.com/media/3K7MTeqALjvSo/200.webp",
        answers: [1, 4, 4, 4, 2, 3, 4, 3, 3, 5]
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