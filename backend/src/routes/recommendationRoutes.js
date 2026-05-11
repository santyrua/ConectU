const createCrudRoutes = require("./createCrudRoutes");
const Recommendation = require("../models/Recommendation");

module.exports = createCrudRoutes(Recommendation);
