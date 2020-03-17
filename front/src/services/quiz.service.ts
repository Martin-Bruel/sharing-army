import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError  } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Quiz } from '../models/quiz.model';
import { QUIZ_LIST } from '../mocks/quiz-list.mock';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

   /**
    * The list of quiz.
    * The list is retrieved from the mock.
    */
  private quizzes: Quiz[] =[];

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);

  private url : string = 'http://localhost:9428/api/quizzes';

  constructor(private http: HttpClient) {
    this.setQuiezesFormUrl();
  }

  addQuiz(quiz: Quiz) {
    // You need here to update the list of quiz and then update our observable (Subject) with the new list
    // More info: https://angular.io/tutorial/toh-pt6#the-searchterms-rxjs-subject
    this.quizzes.push(quiz);
    this.quizzes$.next(this.quizzes);
  }

  deleteQuiz(quiz: Quiz){

    this.quizzes.splice(this.quizzes.indexOf(quiz), 1);
    console.log(quiz.id)
    this.http.delete(this.url + "/" + quiz.id)
    console.log(this.url + "/" + quiz.id)
    this.quizzes$.next(this.quizzes);
  }

  setQuiezesFormUrl(){

    this.http.get<Quiz[]>(this.url).subscribe((result) => {this.quizzes = result; this.quizzes$.next(this.quizzes)});
  }
}
