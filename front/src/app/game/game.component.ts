import { Component, OnInit, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/models/game.model';
import { GameService } from 'src/services/game.service';
import { Answer } from 'src/models/question.model';
import { QuestionComponent } from '../questions/question/question.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  game: Game;
  
  constructor(private route: ActivatedRoute, private gameService: GameService) { 

    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    gameService.setSelectedGame(id);
    
    this.gameService.gameSelected$.subscribe((game: Game) => {
      this.game=game;
    })
  }

  ngOnInit() {
  }

  answerSelected(answer:Answer){

    this.gameService.addAnswer(answer);
  }

  getCurrentQuestion(){

    if(!this.isFinished())
      return this.game.quiz.questions[this.game.step];
  }

  isFinished(){

    return this.game.step >= this.game.quiz.questions.length;
  }

  deleteGame(){
    this.gameService.deleteGame();
  }
}