const { query } = require("express");
const express = require("express");
const Restaurant = require("./models/Restaurant");
const bodyParser = require("body-parser"); // pull information from HTML POST (express4)
const Controller = require("./controller");
const router = express.Router();
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
