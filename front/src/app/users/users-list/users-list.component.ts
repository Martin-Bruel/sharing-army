import { Component, OnInit } from "@angular/core";
import { User } from 'src/models/user.model';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { Styles } from 'src/app/styles';

@Component({
    selector: 'users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss']
})

export class UserListComponent implements OnInit{
    
    public userList : User[] = [];

    constructor(private router : Router, public userService : UserService, private styles : Styles){
        this.userService.users$.subscribe((users) => {
            this.userList = users;
            console.log(this);
        })
        
    }
    
    selectedUser(user : User){
        console.log("User selected",user);
        sessionStorage.setItem("userId",user.id.toString());
        this.styles.color = user.setting.color;
        console.log("Color",this.styles.color);
        this.styles.textSize = user.setting.font;
        console.log("Font Size",this.styles.textSize);
        this.router.navigate(['/accueil']);
    }


    ngOnInit(){
        console.log("Clearing user data");
        sessionStorage.clear();
    }
}