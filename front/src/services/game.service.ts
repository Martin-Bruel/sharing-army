import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { Game, StepGame } from 'src/models/game.model';
import { QuizService } from './quiz.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  /**
   * The list of quiz.
   * The list is retrieved from the mock.
   */
  private game: Game;

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public game$: Subject<Game> = new Subject();

  private gameUrl = serverUrl + '/game';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
  }

  createGame(quizId:number, quizService:QuizService) {
    
    quizService.setSelectedQuiz(quizId);
    quizService.quizSelected$.subscribe((quiz:Quiz) => {


        this.game = {} as Game;

        this.game.name=quiz.name;
        this.game.stepsGame = [];
        this.game.right = 0;


        quiz.questions.forEach(quesiton => {
            console.log(quesiton);
            var stepGame: StepGame = {} as StepGame;
            stepGame.question = quesiton;
            stepGame.done = false;
            this.game.stepsGame.push(stepGame);
        });
        this.game.name = quiz.name;
        this.game.currentStep = 0;
        this.game$.next(this.game);

        console.log('oui');

        console.log(this.game);
    })
    }
}
