import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RouteService } from 'src/services/route.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  //Todo : tester des trucs avec @Input depuis l'appel du header dans les autres html
  // <app-header [header_attribut]="input"></app-header> 
  constructor(private router: Router, private activatedRoute : ActivatedRoute, private routeService : RouteService) { }

  @Input()
  titre: string;

  ngOnInit() {}

  back(){

    switch(this.activatedRoute.snapshot.url[0].path){

      case "quiz-list" : this.router.navigate(['/accueil']); break;
      case "edit-quiz" : this.router.navigate(['/quiz-list']); break;
      case "settings"  : this.router.navigate([this.routeService.getPreviousUrl()]); break;
    }
  }
}
