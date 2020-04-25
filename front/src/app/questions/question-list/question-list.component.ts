import { Component, OnInit, Input } from '@angular/core';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { Question } from 'src/models/question.model';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {
  
  @Input()
  quiz: Quiz;

  questionWidth: number = 50;
  
  fdir: string = "row";
  
  constructor(private quizService: QuizService) {
    if(+sessionStorage.getItem("font")>=75){
      this.questionWidth = 90;
      this.fdir = "column";
    }
   }

  ngOnInit() {
  }

  deleteQuestion(question: Question) {
    this.quizService.deleteQuestion(this.quiz, question);
  }

}
