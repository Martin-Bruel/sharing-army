import { Component, OnInit } from '@angular/core';
import { Styles } from '../styles';
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/user.model';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  user : User;

  constructor(private styles : Styles, private userService : UserService) {
    userService.userSelected$.subscribe((user) => this.user=user);
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
    console.log(this.user)
  }

  changeColor(bool : boolean){
    console.log(bool);
    if(bool) this.styles.color = "#aaaaaa"
    else this.styles.color = "#f2f2f2"
    console.log(this.user)

  }

  save(){
     this.user.setting.font = this.styles.textSize;
     this.user.setting.color = this.styles.color;
     this.userService.updateUser(this.user);
  }

  ngOnInit() {
    const userId = +sessionStorage.getItem("userId");
    this.userService.setSelectedUser(userId);
  }
}