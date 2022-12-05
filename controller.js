const Restaurant = require("./models/Restaurant");

const addNewRestaurant = async (data) => {
	const restaurant = await Restaurant.create(data);
	return restaurant
		.save()
		.then((restaurant) => {
			return restaurant;
		})
		.catch((err) => {
			return err;
		});
};

const getAllRestaurants = async (page, perPage, borough) => {
	let query = { borough };
	return await Restaurant.find(query)
		.lean()
		.skip((page - 1) * perPage)
		.limit(perPage)
		.then((restaurant) => {
			return restaurant;
		})
		.catch((err) => {
			return err;
		});
};
const getRestaurantById = async (id) => {
	return await Restaurant.findById(id)
		.then((restaurant) => {
			return restaurant;
		})
		.catch((err) => {
			return err;
		});
};

const updateRestaurantById = async (data, id) => {
	return await Restaurant.findByIdAndUpdate(id, data)
		.then((restaurant) => {
			return `Successfully updated ${restaurant.name}`;
		})
		.catch((err) => {
			return err;
		});
};

const deleteRestaurantById = async (id) => {
	return await Restaurant.findOneAndDelete({
		_id: id,
	})
		.then((restaurant) => {
			return `Successfully deleted ${restaurant.name}`;
		})
		.catch((err) => {
			return err;
		});
};

module.exports = {
	addNewRestaurant,
	getAllRestaurants,
	getRestaurantById,
	updateRestaurantById,
	deleteRestaurantById,
};
