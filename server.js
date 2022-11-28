/********************************************************************************** 
 * ITE5315 – Project* I declare that this assignment is my own work in accordance with Humber Academic Policy.* 
 * No part of this assignment has been copied manually or electronically from any other source* 
 * (including web sites) or distributed to other students.*
 * * Group member Name: Ashley Rodrigues Student IDs: N01491811 Date: 22 Nov 2022*
 * * Group member Name: Ashley Rodrigues Student IDs: N01491749 Date: 22 Nov 2022*
 *  *********************************************************************************/

 var express = require("express");
 var mongoose = require("mongoose");
 const exphbs = require("express-handlebars");
 const cors = require("cors");
 var path = require("path");
 var app = express();
 var database = require("./config/database");
 var bodyParser = require("body-parser"); // pull information from HTML POST (express4)
 var routes = require('./app');
const { route } = require("./app");
 
 var port = process.env.PORT || 8000;
 app.use(express.static(path.join(__dirname, "public")));
 const helpers = exphbs.create({
	 defaultLayout: "main",
	 extname: ".hbs"
 });
 
 app.engine(".hbs", helpers.engine);
 app.set("view engine", ".hbs");
 app.use(routes)
 app.use(cors());
 app.use(bodyParser.urlencoded({ extended: "true" })); // parse application/x-www-form-urlencoded
 app.use(bodyParser.json()); // parse application/json
 app.use(bodyParser.json({ type: "application/vnd.api+json" })); // parse application/vnd.api+json as json
 
 
 // mongodb connection
mongoose.connect("mongodb+srv://nayakswaroop16:SECURE@cluster0.3h4p7.mongodb.net/sample_restaurants").then((result) => {
    app.listen(8001 , (req , res) => {
        console.log(`Server has started successfully on port`);
    });
})
.catch((err) => {
    console.log(`Server error -> ${err}`);
});
 