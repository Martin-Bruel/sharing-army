import { Component, OnInit } from '@angular/core';
import { Styles } from '../styles';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {


  constructor(private styles : Styles) {}

  getStylesSize(){
    return this.styles.textSize;
  }

  getStylesColor(){
    return this.styles.color != '#f2f2f2'
  }


  changeSize(taille : number){
    //console.log(taille);
    this.styles.textSize = taille;
  }

  changeColor(bool : boolean){
    console.log(bool);
    if(bool) this.styles.color = '#aaaaaa'
    else this.styles.color = '#f2f2f2'
  }

  ngOnInit() {
    console.log(this+" loaded successfully");
  }
}