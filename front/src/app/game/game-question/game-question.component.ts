import { Component, OnInit, Input, Output, EventEmitter, HostListener} from '@angular/core';
import { Question, Answer } from 'src/models/question.model';
import { Button } from 'protractor';
import { UserStyles } from 'src/app/user-styles';
import { temporaryAllocator } from '@angular/compiler/src/render3/view/util';
declare function tell(text: any):any;

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  DOWN_ARROW = 40,
  LEFT_ARROW = 37,
  UP_ARROW = 38
}

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

   constructor(private styles : UserStyles) {
  }
  
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);

    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      var button = document.getElementById("right");
      button.click();
    }

    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      var button = document.getElementById("left");
      button.click();
    }

    if (event.keyCode === KEY_CODE.UP_ARROW) {
      var button = document.getElementById("up");
      button.click();
    }
    if (event.keyCode === KEY_CODE.DOWN_ARROW) {
      var button = document.getElementById("down");
      button.click();
    }
  }
  ngOnInit() {
    //tell("test");
  }

  answerSelected(answer:Answer) {
    this.answer.emit(answer);
  }
}
