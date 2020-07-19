var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use( express.static( "public" ) );

var campgrounds = [
    {name:"nightsparkes", image:"https://www.treebo.com/blog/wp-content/uploads/2018/04/Night-Camping-in-Bangalore-.jpg"},
    {name:"stargazing", image:"https://static.toiimg.com/thumb/msid-57024755,width-1070,height-580,imgsize-151277,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg"},
    {name:"blueland" , image:"https://5.imimg.com/data5/QC/DD/MY-4469236/night-camping-tent-500x500.jpg"}
];


app.get("/", function(req, res){
     res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("index",{campgrounds:campgrounds});
    
});

app.post("/campgrounds", function(req, res){
   var name=req.body.name;
   var image=req.body.image;
   var newcampground = {name : name , image : image};
   campgrounds.push(newcampground);
   res.redirect("/campgrounds");
});

app.get("/campgrounds/new",function(req, res){
    res.render("new");
});

app.listen(3000, function(req, res){
    console.log("server started");
});