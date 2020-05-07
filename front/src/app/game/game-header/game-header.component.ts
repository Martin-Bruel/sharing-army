import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { PopupService } from 'src/services/popup.service';


export enum KEY_CODE {
  ESCAPE = 27
}

@Component({
  selector: 'game-header',
  templateUrl: './game-header.component.html',
  styleUrls: ['./game-header.component.scss']
})
export class GameHeaderComponent implements OnInit {

  @Output() 
  delete: EventEmitter<any> = new EventEmitter();

  private image = "assets/speaker.png";

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    //console.log(event);

    if (event.keyCode === KEY_CODE.ESCAPE) {
      var button = document.getElementById("esc");
      button.click();
    }
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this.back();
  }
  
  @HostListener('window:beforeunload', ['$event'])
  onWindowClose(event) {
 }

  

  constructor(private router: Router, private popupService : PopupService) {
    if(sessionStorage.getItem("t2sOn")=="false"){
      this.image = "assets/nospeaker.png"
    }
   }


  ngOnInit() {
  }

  back(){

    this.popupService.open("Êtes-vous sûr de vouloir quitter la partie en cours ?", "Oui", "Non").subscribe((reponse) => {

      if(reponse){
        this.delete.emit();
        this.router.navigate(['/quiz-list']);
      }
    })
  }

  changeBool(){
    if (sessionStorage.getItem("t2sOn")=="true"){
      if(speechSynthesis.speaking){
        speechSynthesis.pause();
      }
      sessionStorage.setItem("t2sOn","false");
      this.image = "assets/nospeaker.png"
    }
    else{
      speechSynthesis.resume();
      sessionStorage.setItem("t2sOn","true");
      this.image = "assets/speaker.png"
    }
  }
}