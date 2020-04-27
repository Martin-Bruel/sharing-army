import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from 'src/models/quiz.model';
import { Question } from 'src/models/question.model';

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
  public texte : string;
  public checker : boolean;
  public nbAnswer : number;

  constructor(public formBuilder: FormBuilder, private quizService: QuizService) {
    // Form creation
    this.initializeQuestionForm();
  }

  private initializeQuestionForm() {
    this.questionForm = this.formBuilder.group({
      label: ['', Validators.required],
      answers: this.formBuilder.array([])
    });
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

  addAnswer() {
    const question = this.questionForm.getRawValue() as Question;
    if(question.label.length>80){
        this.popup.emit("active");
        this.texte = "Le nombre de caractère du titre de la question est supérieur à la limite maximale de 80 caractères "
        this.text.emit(this.texte)
      }
    else{
      if(question.label.length==0){
        this.popup.emit("active");
        this.texte = "Il n'y a pas de question"
        this.text.emit(this.texte)
      }
      else{
        this.answers.push(this.createAnswer());
      }
    }
    
  }
  
  addQuestion() {
    this.checker=true;
    this.nbAnswer=0;
    if(this.questionForm.valid) {
      const question = this.questionForm.getRawValue() as Question;
      
      if(question.answers.length<2){
        this.popup.emit("active");
        this.texte = "Il faut au moins 2 questions pour créer un quiz"
        this.text.emit(this.texte)
        this.checker=false
      }
      if(this.checker){
        question.answers.forEach(element => {
          if(element.value == '' || element.value.length>60){
            this.popup.emit("active")
            this.texte = "Les réponses doivent avoir entre 1 et 60 caractères"
            this.text.emit(this.texte)
            this.checker=false
          }
          if(element.isCorrect){
            this.nbAnswer += 1
          }
          
        });
      }
      if(this.checker && this.nbAnswer==0){
        this.popup.emit("active")
        this.texte = "Il n'y a pas de bonne réponse"
        this.text.emit(this.texte)
        this.checker=false
      }

      if(this.checker){
          this.quizService.addQuestion(this.quiz, question);
          this.initializeQuestionForm();
        }
      
    }
  }
}
