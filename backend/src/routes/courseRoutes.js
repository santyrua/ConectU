const createCrudRoutes = require("./createCrudRoutes");
const Course = require("../models/Course");

module.exports = createCrudRoutes(Course);
