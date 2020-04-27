import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/user.model';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit{

  user : User;

  size : number;

  rsize : number;

  width : number;

  color : string;

  light : number;

  t2s : boolean;

  constructor(private userService : UserService, private router : Router) {   
 
    this.user = userService.getSelectedUser();
    userService.userSelected$.subscribe((user) => this.user = user);
    this.size= +sessionStorage.getItem("font");
    this.rsize = this.size*3;
    this.color = sessionStorage.getItem("color");
    this.light = +sessionStorage.getItem("light");
    this.t2s = sessionStorage.getItem("t2s")=="true";
    this.changeWidth();
  }

  ngOnInit(){
    console.log("Settings of user",this.user);
  }

  getSize(){
    return +sessionStorage.getItem("font");
  }

  getColor(){
    return sessionStorage.getItem("color") != '#f2f2f2'
  }

  getBrightness(){
    return this.light;
  }

  getT2s(){
    return this.t2s == true;
  }

  changeT2s(bool: boolean){
    if(bool) this.t2s = true
    else this.t2s = false;
  }

  changeBrightness(lum : number){
    this.light = lum;
    document.documentElement.style.setProperty("--bri",this.light+'%');
  }

  changeSize(taille : number){
    this.size = taille;
    this.rsize = this.size*3;
    this.changeWidth();
  }

  changeWidth(){
    if(this.size>=90){
      this.width = 800;
    }else if(this.size>=75){
      this.width = 600;
    } else this.width = 340;
  }

  changeColor(bool : boolean){
    if(bool) this.color = "#aaaaaa"
    else this.color = "#f2f2f2"
  }

  save(){
    window.scrollTo(0,0);
    this.user.setting.font = this.size;
    this.user.setting.color = this.color;
    this.user.setting.light = this.light;
    this.user.setting.t2sOn = this.t2s;
    this.userService.updateUser(this.user);
  }
}