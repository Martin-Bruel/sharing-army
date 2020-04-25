import { Component, OnInit, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/models/game.model';
import { GameService } from 'src/services/game.service';
import { Answer } from 'src/models/question.model';
import { QuestionComponent } from '../questions/question/question.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game;
  onlyOnce : Number;
  onlyOnce2 : Number;
  
  constructor(private route: ActivatedRoute, private gameService: GameService) { 
    this.onlyOnce=-1;
    this.onlyOnce2=-1;
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    gameService.setSelectedGame(id);
    
    this.gameService.gameSelected$.subscribe((game: Game) => {
      this.game=game;
    })
  }

  ngOnInit() {
  }

  answerSelected(answer:Answer){
    if(speechSynthesis.speaking){
      speechSynthesis.cancel();
    }
    this.gameService.addAnswer(answer);
  }

  getCurrentQuestion(){
    
    if(!this.isFinished()){

      if(!this.sameQuestion()){
        var rep=this.game.quiz.questions[this.game.step].answers;
        var text2="";
        text2=this.createAnswersText(text2,rep);
        var text =this.game.quiz.questions[this.game.step].label;
        this.t2s(text);
        this.t2s(text2);
        this.onlyOnce=this.game.step;
      }
      return this.game.quiz.questions[this.game.step];
    }

    
  }

  t2s(txt:string){
    console.log(sessionStorage.getItem("t2sOn"))
    //console.log(sessionStorage.getItem("t2sOn")=="true");
    if(sessionStorage.getItem("t2sOn")=="true"){
      var msg = new SpeechSynthesisUtterance();
      msg.text=txt;
      msg.lang="fr-FR";
      window.speechSynthesis.speak(msg);
    }
  }

  createAnswersText(txt:string,list:Answer[]){
    const prefixes=["haut","gauche","droite","bas"];
    var i=0;
    //console.log(list);
    for(i;i<list.length;i++){
      //console.log(list[i].value);
      txt=txt+"Réponse "+prefixes[i]+" : "+list[i].value+" . ";
    }
    //console.log(txt);
    return txt;
  }
  sameQuestion(){
    //console.log(this.game.step);
    //console.log(this.onlyOnce);
    //console.log(this.game.step==this.onlyOnce);
    return this.game.step==this.onlyOnce;
  }
  isFinished(){
    var b=this.game.step >= this.game.quiz.questions.length;
    if(b && this.onlyOnce2!=this.onlyOnce){
      var txt = "Vous avez"+ this.game.rightAnswer +"bonne reponse sur" + this.game.quiz.questions.length +"questions.";
      this.t2s(txt);
      this.onlyOnce2=this.onlyOnce;
    }
    return b;
  }

  deleteGame(){
    if(speechSynthesis.speaking){
      speechSynthesis.cancel();
    }
    this.gameService.deleteGame();
  }
}