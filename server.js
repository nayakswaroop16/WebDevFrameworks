/********************************************************************************** 
 * ITE5315 – Project* I declare that this assignment is my own work in accordance with Humber Academic Policy.* 
 * No part of this assignment has been copied manually or electronically from any other source* 
 * (including web sites) or distributed to other students.*
 * * Group member Name: Ashley Rodrigues Student IDs: N01491811 Date: 22 Nov 2022*
 * * Group member Name: Ashley Rodrigues Student IDs: N01491749 Date: 22 Nov 2022*
 *  *********************************************************************************/
 require("dotenv").config();
 const express = require("express");
 const mongoose = require("mongoose");
 const exphbs = require("express-handlebars");
 const cors = require("cors");
 const path = require("path");
 const app = express();
 const routes = require('./routes');
 const URL = process.env.URL
 const port = process.env.PORT || 8000;
 app.use(express.static(path.join(__dirname, "public")));
 const helpers = exphbs.create({
	 defaultLayout: "main",
	 extname: ".hbs"
 });
 
 app.engine(".hbs", helpers.engine);
 app.set("view engine", ".hbs");
 app.use(routes)
 app.use(cors());
//  app.use(bodyParser.urlencoded({ extended: "true" })); // parse application/x-www-form-urlencoded
//  app.use(bodyParser.json()); // parse application/json
//  app.use(bodyParser.json({ type: "application/vnd.api+json" })); // parse application/vnd.api+json as json
 
 
 // mongodb connection
mongoose.connect(URL).then((result) => {
    app.listen(port , (req , res) => {
        console.log(`Server has started successfully on port ${port}`);
    });
})
.catch((err) => {
    console.log(`Server error -> ${err}`);
});
 