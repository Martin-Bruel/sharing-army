const { Game } = require('../models')

module.exports.getGameByUserId = function getGameByUserId(userId){

 games = Game.get().filter(function (game) {

        return game.userId == userId
    })

    if(games.length == 0)
        return null;
    return games[0];
}