const createCrudRoutes = require("./createCrudRoutes");
const Resource = require("../models/Resource");

module.exports = createCrudRoutes(Resource);
