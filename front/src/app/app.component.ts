import { Component, ViewEncapsulation, HostBinding, OnInit, OnChanges } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { RouteService } from 'src/services/route.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent{
 
  title = 'quizTalin';

  constructor(private userService : UserService, private routeService : RouteService, private router : Router){   
    this.routeService.loadRouting();
    const userId = +sessionStorage.getItem("userId");

    // // Lorsqu'il se passe qqc sur le router, on reset les valeurs de settingsService (pour la confirmation)
    // router.events.subscribe(()=>{
    //   settingsService.setDefaultValue();
    // });

    this.userService.userSelected$.subscribe((user)=>{  
      document.documentElement.style.setProperty('--font',user.setting.font*3+'%');
      document.documentElement.style.setProperty('--bg',user.setting.color);
      document.documentElement.style.setProperty('--bri',user.setting.light+'%');
    })

    if(userId!=0){
      userService.setSelectedUser(userId); 
      console.log("Retrieving the current user ...");
    }
  }
}
