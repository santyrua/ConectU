const createCrudRoutes = require("./createCrudRoutes");
const Group = require("../models/Group");

module.exports = createCrudRoutes(Group);
