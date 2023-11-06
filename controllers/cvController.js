const cvModel = require("../models/cvModel");
const { crudControllers } = require("../utils/crud");


const cvCrud =  crudControllers(cvModel);
module.exports = {cvCrud};