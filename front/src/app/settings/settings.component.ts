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

  rsize : number;

  color : string;

  constructor(private userService : UserService) {
    this.user = userService.getSelectedUser();
    userService.userSelected$.subscribe((user) => this.user = user );
    this.size= +sessionStorage.getItem("font");
    this.rsize = this.size*3;
    this.color = sessionStorage.getItem("color");
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
    this.rsize = this.size*3;
  }

  changeColor(bool : boolean){
    if(bool) this.color = "#aaaaaa"
    else this.color = "#f2f2f2"
  }

  save(){
     this.user.setting.font = this.size;
     this.user.setting.color = this.color;
     this.userService.updateUser(this.user);
  }
}