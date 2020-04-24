import { Component, ViewEncapsulation, HostBinding, OnInit, OnChanges } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { RouteService } from 'src/services/route.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent{

  title = 'quizTalin';

  constructor(private userService : UserService, private routeService : RouteService){   
    console.log("Constructeur App-Component")
    this.routeService.loadRouting();
    const userId = +sessionStorage.getItem("userId");

    this.userService.userSelected$.subscribe((user)=>{  
      console.log("Color changed",user)
      document.documentElement.style.setProperty('--font',user.setting.font*3+'%');
      document.documentElement.style.setProperty('--bg',user.setting.color);

    })

    if(userId!=0){
      userService.setSelectedUser(userId); 
      console.log("Retrieving the current user ...");
    }
  }
}
