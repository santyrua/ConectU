const createCrudRoutes = require("./createCrudRoutes");
const Professor = require("../models/Professor");

module.exports = createCrudRoutes(Professor);
