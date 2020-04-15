import { Component } from '@angular/core';
import { Styles } from '../app/styles';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'quizTalin';
  constructor(private styles : Styles){}
}
