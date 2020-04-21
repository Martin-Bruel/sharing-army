import { Component, ViewEncapsulation, HostBinding, OnInit, OnChanges } from '@angular/core';
import { UserStyles } from './user-styles';
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/user.model';
import { RouteService } from 'src/services/route.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent{

  title = 'quizTalin';

  constructor(private styles : UserStyles,private userService : UserService, private routeService : RouteService){   
    console.log("Constructeur App-Component")
    this.routeService.loadRouting();
    const userId = +sessionStorage.getItem("userId");
    if(userId!=0){
      userService.setSelectedUser(userId); 
      console.log("Retrieving the current user ...");
    }
    this.userService.userSelected$.subscribe((user)=>{
        console.log("Color changed",user)
        styles.color = user.setting.color;
        styles.textSize = user.setting.font;
        document.documentElement.style.setProperty('--font',user.setting.font*3+'%');
        document.documentElement.style.setProperty('--bg',user.setting.color);
    })
  }
}
