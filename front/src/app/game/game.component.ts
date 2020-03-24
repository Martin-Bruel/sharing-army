import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';
import { Question } from 'src/models/question.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  public quiz: Quiz;
  public question : Question;
  


  constructor(private route: ActivatedRoute, private quizService: QuizService) { 
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
    this.question = this.quiz.questions[0] ;
  }

  ngOnInit() {
    console.log(this.route.snapshot.paramMap.get('id'))
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.quizService.setSelectedQuiz(id);
  }

  selectAnswer(){
  }

}