import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Question, Answer } from 'src/models/question.model';

@Component({
  selector: 'app-game-question',
  templateUrl: './game-question.component.html',
  styleUrls: ['./game-question.component.scss']
})
export class GameQuestionComponent implements OnInit {

  @Input()
  question: Question;

  @Output()
  answer: EventEmitter<Answer> = new EventEmitter<Answer>();

   constructor() {
  }

  ngOnInit() {
  }

  answerSelected(answer:Answer) {
    this.answer.emit(answer);
  }
}
