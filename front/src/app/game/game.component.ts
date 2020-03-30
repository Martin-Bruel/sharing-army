import { Component, OnInit, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/services/quiz.service';
import { Game, StepGame } from 'src/models/game.model';
import { GameService } from 'src/services/game.service';
import { Answer } from 'src/models/question.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  game: Game;
  
  constructor(private route: ActivatedRoute, private quizService: QuizService, private gameService: GameService) { 

    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    gameService.createGame(id,quizService);
    
    this.gameService.game$.subscribe((game: Game) => {
      this.game=game;
    })
  }

  ngOnInit() {
  }

  answerSelected(answer:Answer){

    if(answer.isCorrect)
      this.game.right++;

    if(!this.game.isFinished){

      this.game.stepsGame[this.game.currentStep].userAnswer = answer;
      this.game.stepsGame[this.game.currentStep].done = true;
      
      if(++this.game.currentStep == this.game.stepsGame.length)
        this.game.isFinished = true;
    }
  }

  getCurrentQuestion(){

    if(!this.game.isFinished)
      return this.game.stepsGame[this.game.currentStep].question;
  }

}