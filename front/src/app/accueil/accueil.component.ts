import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  //public quiz: Quiz;
  /*
  constructor(private route: ActivatedRoute, private quizService: QuizService) { 
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
  }
  */

  ngOnInit() {
      console.log(" loaded successfully");
  }
}