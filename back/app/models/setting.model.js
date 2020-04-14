const Joi = require('joi');
const BaseModel = require('../utils/base-model');

module.exports = new BaseModel('Setting', {
    userId : Joi.number().required(),
    color : Joi.string,
    font : Joi.number
})