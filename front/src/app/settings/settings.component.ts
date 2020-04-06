import { Component, OnInit } from '@angular/core';
import { Styles } from '../styles';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {


  constructor(private styles : Styles) {}

  change(taille : number){
    console.log(taille);
    this.styles.textSize = taille;
  }

  ngOnInit() {
      console.log(this+" loaded successfully");
  }
}