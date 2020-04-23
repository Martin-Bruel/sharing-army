import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Quiz } from '../../../models/quiz.model';
import { UserStyles } from 'src/app/user-styles';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  @Input()
  quiz: Quiz;

  @Output()
  quizSelected: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  @Output()
  quizDeleted: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  @Output()
  suppr: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  quizToDeleted: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  constructor() {}

  ngOnInit() {
  }

  selectQuiz() {
    this.quizSelected.emit(this.quiz);
  }



  deleteQuiz(name: string) {
    this.suppr.emit("active")
    this.quizToDeleted.emit(this.quiz)
  }
}
