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
            console.log(this);
        })
    }
    
    selectedUser(user : User){
        console.log("User selected",user);

        sessionStorage.setItem("userId",user.id.toString());

        this.userService.setSelectedUser(user.id);
        console.log("Color",sessionStorage.getItem("color"));
        console.log("Font Size",sessionStorage.getItem("font"));
        this.router.navigate(['/accueil']);
    }


    ngOnInit(){
        console.log("Clearing user data");
        sessionStorage.clear();
    }
}