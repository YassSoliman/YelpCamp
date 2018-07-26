var express 		= require('express'),
	app 			= express(),
	http			= require('http').Server(app),
	bodyParser 		= require('body-parser'),
	mongoose		= require('mongoose');

mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Schema setup

var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
// 	name: "Granite Hill", 
// 	image: "https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-0.3.5&s=dd23e6038cd7a8421453675bd5695062&auto=format&fit=crop&w=959&q=80",
// 	description: "This is a huge granite hill, no bathrooms. No water. Beautiful granite!"
// 	}, 
// 	function(err, campground){
// 		if(err){
// 			console.log(err);
// 		} else {
// 			console.log("Newly created campground: ");
// 			console.log(campground);
// 		}
// });

// var campgrounds = [
// 	{name: "Salmon Creek", image: "https://images.unsplash.com/photo-1465695954255-a262b0f57b40?ixlib=rb-0.3.5&s=b95fc96bc1daca8c7cfbe4c7d3b03a19&auto=format&fit=crop&w=750&q=80"},
// 	{name: "Granite Hill", image: "https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-0.3.5&s=dd23e6038cd7a8421453675bd5695062&auto=format&fit=crop&w=959&q=80"},
// 	{name: "Mountain Goat's Rest", image: "https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ffdbb5e90a2c129258d4540ef0f29d06&auto=format&fit=crop&w=750&q=80"},
// 	{name: "Salmon Creek", image: "https://images.unsplash.com/photo-1465695954255-a262b0f57b40?ixlib=rb-0.3.5&s=b95fc96bc1daca8c7cfbe4c7d3b03a19&auto=format&fit=crop&w=750&q=80"},
// 	{name: "Granite Hill", image: "https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-0.3.5&s=dd23e6038cd7a8421453675bd5695062&auto=format&fit=crop&w=959&q=80"},
// 	{name: "Mountain Goat's Rest", image: "https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ffdbb5e90a2c129258d4540ef0f29d06&auto=format&fit=crop&w=750&q=80"},
// 	{name: "Salmon Creek", image: "https://images.unsplash.com/photo-1465695954255-a262b0f57b40?ixlib=rb-0.3.5&s=b95fc96bc1daca8c7cfbe4c7d3b03a19&auto=format&fit=crop&w=750&q=80"},
// 	{name: "Granite Hill", image: "https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-0.3.5&s=dd23e6038cd7a8421453675bd5695062&auto=format&fit=crop&w=959&q=80"},
// 	{name: "Mountain Goat's Rest", image: "https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ffdbb5e90a2c129258d4540ef0f29d06&auto=format&fit=crop&w=750&q=80"}
// ];

app.get("/", function(req, res){
	res.render("landing");
});

// INDEX - Show all campgrounds
app.get("/campgrounds", function(req, res){
	// Get all campgrounds fron DB
	Campground.find({}, function(err, campgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("index", {campgrounds: campgrounds});
		}
	});
});

// CREATE - Add new campground to DB
app.post("/campgrounds", function(req, res){
	// Get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image: image, description: desc};
	// Create a new campground and save to DB
	Campground.create(newCampground, function(err, campground){
		if(err){
			console.log(err);
		} else {
			// Redirect back to campgrounds page
			res.redirect("/campgrounds");
		}
	});
});

// NEW - Show form to create new campground
app.get("/campgrounds/new", function(req, res){
	res.render("new");
});

// SHOW - Shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
	// Find the campground with provided ID
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
			// render show template with that campground
			res.render("show", {campground: foundCampground});
		}
	});
});

http.listen(3000, function(){
	console.log("Server started on *:3000");
});