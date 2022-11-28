const express = require("express");
const Restaurant = require("./models/Restaurant");

const router = express.Router();

// POST
router.post(
	"/api/restaurants",

	(req, res) => {
		// collect data
		let data = {
			name: req.body.name,
			restaurant_id: req.body.restaurant_id,
            borough: req.body.borough,
			cuisine: req.body.cuisine,
			grades: req.body.grades,
		};

		// create new record
		Restaurant.create(data, (err, restaurant) => {
			if (err) {
				return res.send(err);
			}

			return res.json(restaurant);
		});
	}
);

// GET
router.get("/api/restaurants/:_id", (req, res) => {
	const _id = req.params._id;

	Restaurant.findById(_id, (err, restaurant) => {
		if (err) {
			return res.send(err);
		}

		return res.json(restaurant);
	});
});

module.exports = router;
