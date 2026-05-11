const createCrudRoutes = require("./createCrudRoutes");
const User = require("../models/User");

module.exports = createCrudRoutes(User);
