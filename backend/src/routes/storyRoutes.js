const createCrudRoutes = require("./createCrudRoutes");
const Story = require("../models/Story");

module.exports = createCrudRoutes(Story);
