import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { print } from 'util';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  
  constructor(private router: Router) { }

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
    }
    return oeoe;
  }


  ngOnInit() {   
    console.log("Url : "+this.router.url);
    console.log("Full route : "+window.location.href);
  }

}
