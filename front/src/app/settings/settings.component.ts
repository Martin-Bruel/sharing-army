import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/user.model';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit{

  user : User;

  size : number;

  constructor(private userService : UserService) {
    this.user = userService.getSelectedUser();
    userService.userSelected$.subscribe((user) => this.user = user );
    this.size = +sessionStorage.getItem("font");
  }

  ngOnInit(){
    console.log("Settings of user",this.user);
  }

  getStylesSize(){
    return +sessionStorage.getItem("font");
  }

  getStylesColor(){
    return sessionStorage.getItem("color") != '#f2f2f2'
  }


  changeSize(taille : number){
    this.size = taille;
    sessionStorage.setItem("font",taille.toString());
  }

  changeColor(bool : boolean){
    if(bool) sessionStorage.setItem("color","#aaaaaa");
    else sessionStorage.setItem("color","#f2f2f2");
  }

  save(){
     this.user.setting.font = +sessionStorage.getItem("font");
     this.user.setting.color = sessionStorage.getItem("color");
     this.userService.updateUser(this.user);
  }
}