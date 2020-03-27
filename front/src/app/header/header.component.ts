import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  //Todo : tester des trucs avec @Input depuis l'appel du header dans les autres html
  // <app-header [header_attribut]="input"></app-header> 
  constructor(private router: Router) { }

  @Input()
  titre : String;
  
  title(){
    var coupeDecale = this.router.url.split('/')[1];
    console.log(coupeDecale);
    var oeoe: string;
    switch(coupeDecale) {
      case "quiz-list":{
        oeoe = "Mosaïque";
        console.log
        break; 
      }
      case "edit-quiz":{
        oeoe = "Edition de Quiz"
        break;
      }
      case "settings":{
        oeoe = "Paramètres"
        break;
      }
      default:{
        oeoe = "Pas encore de titre"
        break;
      }
    }
    return oeoe;
  }

  ngOnInit() {   
    console.log("Url : "+this.router.url);
    console.log("Full route : "+window.location.href);
  }

}
