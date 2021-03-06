// modules
const { v4: uuidv4 } = require("uuid");

// database
const database = require("../../database");

// utils
const { hashPassword } = require("../../utils/password");

const createUser = async user => {
	// generate user unique indentification
	const userId = uuidv4(user.emailAddress);

	// get username from email address
	const username = user.emailAddress.split("@")[0];

	// password hashing
	const hashedPassword = hashPassword(user.password);
	delete user.password;

	const users = await database
		.insert({
			userId,
			username,
			password: hashedPassword,
			...user,
			createdAt: new Date().toJSON(),
			updatedAt: new Date().toJSON()
		})
		.into("users")
		.returning("*");

	try {
		const user = users[0];
		if (user) {
			delete user.password;
			delete user.createdAt;
			delete user.updatedAt;

			return user;
		}
		return null;
	} catch (error) {
		console.error(error);
	}
};

module.exports = createUser;
