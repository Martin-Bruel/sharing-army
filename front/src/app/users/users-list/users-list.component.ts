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
    
    ngOnInit(){}
}