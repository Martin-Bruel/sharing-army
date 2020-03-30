import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'quiz-list-theme',
  templateUrl: './quiz-list-theme.component.html',
  styleUrls: ['./quiz-list-theme.component.scss']
})
export class QuizListTheme implements OnInit {

    //todo s'inspirer de quiz-list + quiz
  constructor() { }

  ngOnInit() {
    console.log("Full route : "+window.location.href);
  }
}
