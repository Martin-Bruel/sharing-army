import { Component, OnInit, Input, HostListener } from '@angular/core';

export enum KEY_CODE {
  ESCAPE = 27
}

@Component({
  selector: 'game-header',
  templateUrl: './game-header.component.html',
  styleUrls: ['./game-header.component.scss']
})
export class GameHeaderComponent implements OnInit {

  constructor() { }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);

    if (event.keyCode === KEY_CODE.ESCAPE) {
      var button = document.getElementById("esc");
      button.click();
    }
  }
  ngOnInit() {
  }
}