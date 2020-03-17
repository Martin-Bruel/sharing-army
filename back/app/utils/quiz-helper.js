const { Question } = require('../models')

module.exports.getQuestionByQuizId = function getQuestionByQuizId(quizId){

 questions = Question.get().filter(function (question) {

        return question.quizId == quizId
    })
    return questions
}