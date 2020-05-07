import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, of } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { Game } from 'src/models/game.model';
import { Answer } from 'src/models/question.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  
  private game: Game;

  public gameCreated$: Subject<Game> = new Subject();
  public gameSelected$ : Subject<Game> = new Subject();
  public gameNotFinished$ : Subject<Game> = new Subject();

  private gameUrl = serverUrl + '/game';

  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient, private userService : UserService) {}

  createGame(quiz:Quiz) {
    
    this.game = {} as Game;
    this.game.quiz = quiz;
    this.game.step = 0;
    this.game.date = Date.now();
    this.game.answersSelected = [];
    this.game.rightAnswer = 0;
    this.game.userId = this.userService.getSelectedUser().id;
    this.http.post<Game>(this.gameUrl, this.game, this.httpOptions).subscribe((game) => {

      this.game = game;
      this.gameCreated$.next(this.game);
    })
  }
  
  setSelectedGame(gameId:number){

    const urlWithId = this.gameUrl + '/' + gameId;
    this.http.get<Game>(urlWithId).subscribe((game) => {
      this.gameSelected$.next(game);
      this.game = game;
    });
  }

  setNotFinishedGame(userId:number){

    const urlWithId = this.gameUrl + '/userId/' + userId;
    this.http.get<Game>(urlWithId).subscribe((game) => {
      this.gameNotFinished$.next(game);
      this.game = game;
    });
  }


  addAnswer(answer:Answer) {

    const urlWithId = this.gameUrl + '/' + this.game.id;
    this.game.answersSelected.push(answer);
    if(answer.isCorrect)
      this.game.rightAnswer++;
    this.http.put<Game>(urlWithId, this.game, this.httpOptions).subscribe((game) => {
      this.game = game;
      this.gameSelected$.next(this.game);
    })
  }

  deleteGame(){

    const urlWithId = this.gameUrl + '/' + this.game.id;
    this.http.delete<Game>(urlWithId, this.httpOptions).subscribe(() => {
      this.game = null;
      this.gameSelected$.next(this.game);
    })
  }
}
