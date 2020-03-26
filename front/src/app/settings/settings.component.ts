import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {


  constructor() {}
  
  change = false;

  couleur(){
    return this.change? 'green' : 'red';
  }

  ngOnInit() {
      console.log(this+" loaded successfully");
  }
}