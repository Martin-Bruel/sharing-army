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
  titre: string;

  ngOnInit() {
    console.log("Full route : "+window.location.href+" | Titre : "+this.titre);
  }
}
