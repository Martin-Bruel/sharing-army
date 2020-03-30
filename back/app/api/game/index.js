const { Router } = require('express')

const { Game } = require('../../models')


const router = new Router()

router.post('/', (req, res) => {
    try {
      const game = Game.create({ ...req.body })

      res.status(201).json(game)
    } catch (err) {
      if (err.name === 'ValidationError') {
        res.status(400).json(err.extra)
      } else {
        res.status(500).json(err)
      }
    }
})

router.put('/:gameId', (req, res) => {
  try{
    const game = Game.update(req.params.gameId, { ...req.body })
    res.status(201).json(game)
  } catch (err) {
    if(err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    }
    else{
      res.status(500).json(err)
    }
  }
  
})


module.exports = router

