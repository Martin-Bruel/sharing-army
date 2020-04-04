import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, of } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { Game } from 'src/models/game.model';
import { QuizService } from './quiz.service';
import { Answer } from 'src/models/question.model';

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

  constructor(private http: HttpClient, private quizService:QuizService) {
  }

  createGame(quizId:number) {
    
    this.quizService.setSelectedQuiz(quizId);
    this.quizService.quizSelected$.subscribe((quizSelected:Quiz) => {

      this.game = {} as Game;
      this.game.quiz = quizSelected;
      this.game.step = 0;
      this.game.date = Date.now();
      this.game.answersSelected = [];
      this.game.rightAnswer = 0;
      this.http.post<Game>(this.gameUrl, this.game, this.httpOptions).subscribe((game) => {
        this.game = game;
        this.game$.next(this.game);
      });
   })
  }

  addAnswer(answer:Answer) {

    const urlWithId = this.gameUrl + '/' + this.game.id;
    this.game.answersSelected.push(answer);
    this.http.put<Game>(urlWithId, this.game, this.httpOptions).subscribe((game) => {
      this.game = game;
      if(answer.isCorrect)
        this.game.rightAnswer++;
      this.game$.next(this.game);
    })
  }

  deleteGame(){

    const urlWithId = this.gameUrl + '/' + this.game.id;
    this.http.delete<Game>(urlWithId, this.httpOptions).subscribe((game) => {
      this.game = game;
      this.game$.next(this.game);
    })
  }
}
