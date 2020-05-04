import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../../models/question.model';
import { PopupService } from 'src/services/popup.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input()
  question: Question;

  @Output()
  deleteQuestion: EventEmitter<Question> = new EventEmitter<Question>();

  constructor(private popupService : PopupService) { }

  ngOnInit() {
  }

  delete() {
    this.popupService.open('Êtes-vous sûr de vouloir supprimer cette question ?', 'Oui', 'Non').subscribe((response) => {

      if(response)
        this.deleteQuestion.emit(this.question);

    });
  }

}
