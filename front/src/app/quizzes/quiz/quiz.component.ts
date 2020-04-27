import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Quiz } from '../../../models/quiz.model';
import { Router } from '@angular/router';
import { PopupService } from 'src/services/popup.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  @Input()
  quiz: Quiz;

  @Input()
  width : number;

  @Output()
  quizSelected: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  @Output()
  quizDeleted: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  constructor(private router : Router, private popupService : PopupService) {}

  ngOnInit() {
  }

  selectQuiz() {
    this.quizSelected.emit(this.quiz);
  }

  openPopup(){
    this.popupService.open('Êtes-vous sûr de vouloir supprimer ce quiz ?', 'Oui', 'Non').subscribe(response => {
      if(response)
        this.deleteQuiz();
    });
  }

  deleteQuiz() {

      this.quizDeleted.emit(this.quiz);
  }

  editQuiz(){
    this.router.navigate(['edit-quiz',this.quiz.id]);
  }
}
