const createCrudRoutes = require("./createCrudRoutes");
const Tutoring = require("../models/Tutoring");

module.exports = createCrudRoutes(Tutoring);
