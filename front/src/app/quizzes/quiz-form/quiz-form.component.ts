import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import { QuizListComponent } from '../quiz-list/quiz-list.component';
import { PopupService } from 'src/services/popup.service';





@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss']
})
export class QuizFormComponent implements OnInit {
  // Note: We are using here ReactiveForms to create our form. Be careful when you look for some documentation to
  // avoid TemplateDrivenForm (another type of form)
  /**
   * QuizForm: Object which manages the form in our component.
   * More information about Reactive Forms: https://angular.io/guide/reactive-forms#step-1-creating-a-formgroup-instance
   */
  public quizForm: FormGroup;
  public THEME_LIST: string[] = ['Sport', 'Actor', 'Géographie', 'Autre'];
  //public quizListComponent :QuizListComponent;

  constructor(public formBuilder: FormBuilder, public quizService: QuizService, private popupService : PopupService) {
    // Form creation
    this.quizForm = this.formBuilder.group({
      name: [''],
      theme:[''],
    });
    // You can also add validators to your inputs such as required, maxlength or even create your own validator!
    // More information: https://angular.io/guide/reactive-forms#simple-form-validation
    // Advanced validation: https://angular.io/guide/form-validation#reactive-form-validation
  }

  ngOnInit() {
  }
  texte : string
  addQuiz() {
    // We retrieve here the quiz object.rom the quizForm and we cast the type "as Quiz".
    const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;

    
    if (quizToCreate.name == '' || quizToCreate.theme == ''){

      var text = "Il n'y a pas de";
      if (quizToCreate.name == ''){
        text += " titre" ;
      }
      if (quizToCreate.theme == ''){
        if (quizToCreate.name == ''){
          text += " et de" ;
        }
        text += " thème" ;
      }

      this.popupService.open(text, 'OK');
    }

    
    else{
      if (quizToCreate.name.length>20){
        var text="Le nombre de caractère du titre est supérieur à la limite maximale de 20 caractères "

        this.popupService.open('popup', text, 'OK');
      }
      else{
        console.log('Adding quiz: ', quizToCreate);
        this.quizService.addQuiz(quizToCreate);
      }      
    }
  }
}
