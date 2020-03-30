const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Game', {
  currentQuestionId: Joi.number(),
  quizId: Joi.number().required(),
})