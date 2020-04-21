import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/models/quiz.model';
import { QuizService } from 'src/services/quiz.service';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent implements OnInit {

  public quiz: Quiz;
  public textBody : string;

  constructor(private route: ActivatedRoute, private quizService: QuizService) { 
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
  }

  ngOnInit() {
    console.log(this.route.snapshot.paramMap.get('id'))
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.quizService.setSelectedQuiz(id);
  }

  textEdit(text : string){
    this.textBody = text
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
}