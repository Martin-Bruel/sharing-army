import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import { Router } from '@angular/router';
import { Styles } from '../../styles';



@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  public quizList: Quiz[] = [];

  public textBody : string;

  constructor(private router: Router, public quizService: QuizService,private styles : Styles) {
    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
    });
  }

  ngOnInit() {
  }

  quizSelected(quiz: Quiz) {
    console.log('event received from child:', quiz);
    this.router.navigate(['/game/'+ quiz.id]);

  }

  quizDeleted (quiz:Quiz){
    console.log('evenet recieved from child', quiz);
    this.quizService.deleteQuiz(quiz);
  }

  quizEdit(quiz: Quiz) {
    this.router.navigate(['/edit-quiz/'+ quiz.name]);
  }

  openModal( modal : string ) {
    if (modal == null) return
    document.getElementById("modal").classList.add(modal)
    document.getElementById("overlay").classList.add(modal)
  }
  
  closeModal() {
    document.getElementById("modal").classList.remove("active")
    document.getElementById("overlay").classList.remove("active")
  }

  textEdit(text : string){
    this.textBody = text
  }
}
