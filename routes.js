const { query, Router } = require("express");
const express = require("express");
const Restaurant = require("./models/restaurant");
const bodyParser = require("body-parser"); // pull information from HTML POST (express4)
const Controller = require("./controller");
const router = express.Router();
const session = require("express-session");
const authorize = require("./authorize");
router.use(
	session({
		secret: "spooky secret",
		cookie: { maxAge: 400000 },
		saveUninitialized: false,
	})
);

router.use(bodyParser.urlencoded({ extended: "true" })); // parse application/x-www-form-urlencoded

// POST
router.post("/api/restaurants", async (req, res) => {
	console.log(req.body.building);
	// create mongoose method to create a new record into collection
	let data = {
		address: {
			building: req.body.building,
			coord: req.body.coord,
			street: req.body.street,
			zipcode: req.body.zipcode,
		},
		borough: req.body.borough,
		cuisine: req.body.cuisine,
		grades: req.body.grades,
		name: req.body.name,
		restaurant_id: req.body.restaurant_id,
	};
	const resp = await Controller.addNewRestaurant(data);
	return res.send(resp);
});

// GET
router.get("/api/restaurants/:restaurant_id?", async (req, res) => {
	const id = req.params.restaurant_id;
	if (id) {
		const resp = await Controller.getRestaurantById(id);
		return res.send(resp);
	} else {
		const resp = await Controller.getAllRestaurants(
			req.query.page,
			req.query.perPage,
			req.query.borough
		);
		return res.send(resp);
	}
});

router.get("/api/find-restaurant", async (req, res) => {
	if (req.session.authenticated) {
		res.render("form");
	} else {
		res.render("login", { error: "" });
	}
});

router.post("/login", async (req, res) => {
	console.log(session.secret);
	const { username, password } = req.body;
	console.log(password);
	if (username && password) {
		if (req.session.authenticated) {
			res.redirect("/api/find-restaurant");
		} else {
			let checkPassword = await authorize.checkPassword(password);
			if (checkPassword) {
				req.session.authenticated = true;
				req.session.user = {
					username,
					password,
				};
				res.redirect("/api/find-restaurant");
			} else {
				res.render("login", { error: "Invalid credentials!" });
			}
		}
	}
	else res.render("login", { error: "Invalid credentials!" });
});

router.get("/api/display-restaurants", async (req, res) => {
	const resp = await Controller.getAllRestaurants(
		req.query.page,
		req.query.perPage,
		req.query.borough
	);
	res.render("table", { restaurants: resp });
});

//PUT
router.put("/api/restaurants/:restaurant_id", async (req, res) => {
	// create mongose method to update an existing record into collection
	let id = req.params.restaurant_id;
	var data = {
		address: {
			building: req.body.building,
			coord: req.body.coord,
			street: req.body.street,
			zipcode: req.body.zipcode,
		},
		borough: req.body.borough,
		cuisine: req.body.cuisine,
		grades: req.body.grades,
		name: req.body.name,
		restaurant_id: req.body.restaurant_id,
	};
	const resp = await Controller.updateRestaurantById(data, id);
	console.log(resp);
	res.send(resp);
});

router.delete("/api/restaurants/:restaurant_id", async (req, res) => {
	console.log(req.params.restaurant_id);
	let id = req.params.restaurant_id;
	const resp = await Controller.deleteRestaurantById(id);
	res.send(resp);
});

module.exports = router;
