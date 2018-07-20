var express = require('express');
var app = express();
var http = require('http').Server(app);

app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
	var campgrounds = [
		{name: "Salmon Creek", image: "https://images.unsplash.com/photo-1465695954255-a262b0f57b40?ixlib=rb-0.3.5&s=b95fc96bc1daca8c7cfbe4c7d3b03a19&auto=format&fit=crop&w=750&q=80"},
		{name: "Granite Hill", image: "https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-0.3.5&s=dd23e6038cd7a8421453675bd5695062&auto=format&fit=crop&w=959&q=80"},
		{name: "Mountain Goat's Rest", image: "https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ffdbb5e90a2c129258d4540ef0f29d06&auto=format&fit=crop&w=750&q=80"}
	];

	res.render("campgrounds", {campgrounds: campgrounds});
});

http.listen(3000, function(){
	console.log("Server started on *:3000");
});