import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from 'src/models/quiz.model';
import { Question } from 'src/models/question.model';
import { PopupService } from 'src/services/popup.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  @Input()
  quiz: Quiz;

  @Input()
  cardWidth : number

  @Output()
  popup : EventEmitter<string> = new EventEmitter<string>();

  @Output()
  text : EventEmitter<string> = new EventEmitter<string>();

  public questionForm: FormGroup;
  public checker : boolean;
  public nbAnswer : number;

  constructor(public formBuilder: FormBuilder, private quizService: QuizService, private popupService : PopupService) {
    // Form creation
    this.initializeQuestionForm();
  }

  private initializeQuestionForm() {
    this.questionForm = this.formBuilder.group({
      label: ['', Validators.required],
      answers: this.formBuilder.array([])
    });
    for(var i = 0; i < 4; i++){

      this.answers.push(this.createAnswer());

    }
  }

  ngOnInit() {
  }

  get answers() {
    return this.questionForm.get('answers') as FormArray;
  }

  private createAnswer() {
    return this.formBuilder.group({
      value: '',
      isCorrect: false,
    });
  }
  
  addQuestion() {
    this.checker=true;
    this.nbAnswer=0;
    if(this.questionForm.valid) {
      const question = this.questionForm.getRawValue() as Question;
      
      if(question.answers.length<4){
        this.popupService.open('Il faut 4 questions pour créer un quiz', 'OK');
        this.checker=false
      }
      if(this.checker){
        question.answers.forEach(element => {
          if(element.value == '' || element.value.length>60){

            
            this.popupService.open('Les réponses doivent avoir entre 1 et 60 caractères', 'OK');
            this.checker=false
          }
          if(element.isCorrect){
            this.nbAnswer += 1
          }
          
        });
      }
      if(this.checker && this.nbAnswer==0){
        this.popupService.open('Il n\'y a pas de bonne réponse', 'OK');
        this.checker=false
      }

      if(this.checker){
          this.quizService.addQuestion(this.quiz, question);
          this.initializeQuestionForm();
        }
    }
    else{
      this.popupService.open('Saisie invalide, veuillez remplir tous les champs', 'OK');
    }
  }
}
