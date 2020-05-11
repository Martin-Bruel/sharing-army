import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/user.model';
import { Router, NavigationEnd } from '@angular/router';
import { PopupService } from 'src/services/popup.service';
import { RouteService } from 'src/services/route.service';

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

  savedSettings : boolean = true;

  constructor(private userService : UserService, private router : Router, private popupService : PopupService) {   
     this.user = userService.getSelectedUser(); // Récupération de l'utilisateur courant

    /**
     * En cas de rafraîchissement :
     * Subscriber nécessaire car la méthode getSelectedUser ne renvoie rien car chargement 
     * de ce component + rapide que la requête effectuée dans app.component.ts
     */
    userService.userSelected$.subscribe((user) => {
      this.user = user
    });

    /**
     * Utilisation de sessioStorage car même principe que précédement.
     * Pour éviter un crash du component, on utilise ici les données sauvegardées dans la session
     */
    this.size= +sessionStorage.getItem("font");
    this.rsize = this.size*3; // Taille de fonte réellement utilisée au travers de l'application
    this.color = sessionStorage.getItem("color");
    this.light = +sessionStorage.getItem("light");
    this.t2s = sessionStorage.getItem("t2sOn")=="true";
    this.changeWidth();
  }

  ngOnInit(){
    console.log("Settings of user",this.user);
  }

  goBack(route : String){
    if(!this.savedSettings){
      this.openPopup(route);
    }else{
      this.router.navigate([route]);
    }
  }

  openPopup(route : String){
    this.popupService.open("Êtes-vous sûr de vouloir quitter sans sauvegarder ?", "Oui", "Non").subscribe(response =>{
      if(response){this.router.navigate([route])}
    })
  }

  getSize(){
    return +sessionStorage.getItem("font");
  }

  /**
   * @returns true si le fond est foncé, false si il est clair
   */
  getColor(){
    return sessionStorage.getItem("color") != '#f2f2f2'
  }

  getBrightness(){
    return this.light;
  }

  getT2s(){
    return this.t2s;
  }

  changeT2s(bool: boolean){
    if(bool) this.t2s = true
    else this.t2s = false;
    this.savedSettings = false;
  }

  changeBrightness(lum : number){
    this.light = lum;
    document.documentElement.style.setProperty("--bri",this.light+'%');
    this.savedSettings = false;
  }

  changeSize(taille : number){
    this.size = taille;
    this.rsize = this.size*3;
    this.changeWidth();
    this.savedSettings = false;
  }
  
  /**
   * Changement de la largeur de la boîte d'un Quiz
   */
  changeWidth(){
    if(this.size>=90){
      this.width = 800;
    }else if(this.size>=75){
      this.width = 600;
    } else this.width = 340;
  }

  /**
   * Inversement de la couleur du fond
   * @param bool true = sombre, false = clair
   */
  changeColor(bool : boolean){
    if(bool) this.color = "#aaaaaa"
    else this.color = "#f2f2f2"
    this.savedSettings = false;
  }

  save(){
    this.savedSettings = true;
    window.scrollTo(0,0);
    this.user.setting.font = this.size;
    this.user.setting.color = this.color;
    this.user.setting.light = this.light;
    this.user.setting.t2sOn = this.t2s;
    this.userService.updateUser(this.user);
  }
}