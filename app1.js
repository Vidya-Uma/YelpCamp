var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelpcamp", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true });

var campgroundSchema = new mongoose.Schema({
      name : String,
      image: String,
      descripction:String
});

var campground = mongoose.model("campground",campgroundSchema);

campground.create(
    {
    name:"nightsparkes", 
    image:"https://www.treebo.com/blog/wp-content/uploads/2018/04/Night-Camping-in-Bangalore-.jpg",
    descripction:"Here the Hills are beautiful and tall"
    },
    function(err, campground){
        if(err){
        console.log(err);
    } else {
        console.log("Newly created Campground");
        console.log(campground);
    }
});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use( express.static( "public" ) );
app.use(bodyParser.json())


app.get("/", function(req, res){
     res.render("landing");
});

app.get("/campgrounds", function(req, res){
    campground.find({},function(err, allCampground){
    if(err){
        console.log(err);
    } else {
        res.render("index",{campgrounds:allCampground});   
    }
    });
});

app.post("/campgrounds", function(req, res){
   var name=req.body.name;
   var image=req.body.image;
   var desc=req.body.descripction;
   var newcampground = {name : name , image : image, descripction : desc};
   campground.create(newcampground,function(err, newlyCreated){
      if(err){
          console.log(err);
      } else {
   res.redirect("/campgrounds");
      }
    });
});

app.get("/campgrounds/new",function(req, res){
    res.render("new");
});

app.get("/campgrounds/:id",function(req, res){
    campground.findById(req.params.id,function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("show",{campground:foundCampground});
        }
    });
});

app.listen(3000, function(req, res){
    console.log("server started");
});
