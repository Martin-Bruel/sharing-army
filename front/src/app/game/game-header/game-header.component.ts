import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


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

      this.delete.emit();
      event.returnValue = false;
 }

  

  constructor(private router: Router) { }


  ngOnInit() {
  }

  back(){
    this.delete.emit();
    this.router.navigate(['/quiz-list']);
  }

  changeBool(){
    if (sessionStorage.getItem("t2sOn")=="true"){
      if(speechSynthesis.speaking){
        speechSynthesis.pause();
      }
      sessionStorage.setItem("t2sOn","false");
    }
    else{
      speechSynthesis.resume();
      sessionStorage.setItem("t2sOn","true");
    }
  }
}