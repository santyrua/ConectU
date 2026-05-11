const createCrudRoutes = require("./createCrudRoutes");
const Opportunity = require("../models/Opportunity");

module.exports = createCrudRoutes(Opportunity);
