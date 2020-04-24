import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import { Router } from '@angular/router';
import { GameService } from 'src/services/game.service';
import { Game } from 'src/models/game.model';
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/user.model';



@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  public quizList: Quiz[] = [];

  public textBody : string;

  public quizToDelete : Quiz;

  private fdir : string;

  private falign : string;

  private width : number;

  constructor(private router: Router, public quizService: QuizService, private gameService : GameService) {

    this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
    });

    this.fdir = "row";
    this.falign = "stretch";
    const userFont = +sessionStorage.getItem("font");

    if(window.matchMedia("(max-width : 1440px)").matches && userFont>=95){
      this.fdir = "column";
      this.falign = "center";
    }

    
    if(userFont>=90){
      this.width = 800;
    }else if(userFont>=70){
      this.width = 600;
    } else this.width = 350;
  }

  ngOnInit() {
  }

  quizSelected(quiz: Quiz) {

    console.log('event received from child:', quiz);

    this.gameService.createGame(quiz);
    this.gameService.gameCreated$.subscribe((game: Game) => {
      this.router.navigate(['/game/'+ game.id]);
    })
  }

  quizDeleted (){

    console.log('evenet recieved from child', this.quizToDelete);
    document.getElementById("suppr").classList.remove("active")
    document.getElementById("overlay").classList.remove("active")
    this.quizService.deleteQuiz(this.quizToDelete);
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

  openSupprModal( modal : string ) {
    if (modal == null) return
    document.getElementById("suppr").classList.add(modal)
    document.getElementById("overlay").classList.add(modal)
  }

  closeSupprModal() {
    document.getElementById("suppr").classList.remove("active")
    document.getElementById("overlay").classList.remove("active")
  }

  setQuizToDelete( quiz : Quiz){
    this.quizToDelete = quiz
  } 
}
