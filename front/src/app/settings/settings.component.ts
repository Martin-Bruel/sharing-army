import { Component, OnInit, Input } from '@angular/core';
import { UserStyles } from '../user-styles';
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/user.model';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit{

  user : User;

  constructor(private styles : UserStyles, private userService : UserService) {
    this.user = userService.getSelectedUser();
  }

  ngOnInit(){
    console.log("Settings of user",this.user);
  }

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
    //console.log(bool);
    if(bool) this.styles.color = "#aaaaaa"
    else this.styles.color = "#f2f2f2"
  }

  save(){
     this.user.setting.font = this.styles.textSize;
     this.user.setting.color = this.styles.color;
     this.userService.updateUser(this.user);
  }
}