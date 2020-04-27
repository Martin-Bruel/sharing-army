import { Component, OnInit } from "@angular/core";
import { User } from 'src/models/user.model';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
    selector: 'users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss']
})

export class UserListComponent implements OnInit{
    
    public userList : User[] = [];

    constructor(private router : Router, public userService : UserService){
        this.userService.users$.subscribe((users) => {
            this.userList = users;
        })
        document.documentElement.style.setProperty('--bg',"#f2f2f2");
        document.documentElement.style.setProperty('--bri','100%');
    }
    
    selectedUser(user : User){
        console.log("User selected",user);
        sessionStorage.setItem("userId",user.id.toString());
        this.userService.setSelectedUser(user.id);
        this.router.navigate(['/accueil']);
    }


    ngOnInit(){
        console.log("Clearing session user data...");
        sessionStorage.clear();
    }
}