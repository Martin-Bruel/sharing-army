import { Injectable } from "@angular/core";
import { User } from 'src/models/user.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class UserService{

    private users : User[] = [];

    private selectedUser : User;
    
    public users$ : BehaviorSubject<User[]> = new BehaviorSubject(this.users);

    public userSelected$ : Subject<User> = new Subject();

    private userUrl = serverUrl + '/users';

    private httpOptions = httpOptionsBase;

    constructor(private http : HttpClient){
        this.setUsersFromUrl();
    }

    setUsersFromUrl(){
        this.http.get<User[]>(this.userUrl).subscribe((userList) => {
            this.users = userList;
            this.users$.next(this.users);
        });
    }

    setSelectedUser(userId : number){
        const urlId = this.userUrl + '/' + userId;
        this.http.get<User>(urlId).subscribe((user)=>{
            this.selectedUser = user;
            this.userSelected$.next(user);
            sessionStorage.setItem("color",user.setting.color);
            sessionStorage.setItem("font",user.setting.font.toString());
            sessionStorage.setItem("light",user.setting.light.toString());
            sessionStorage.setItem("t2sOn",user.setting.t2sOn.toString());
        });
    }

    getSelectedUser(){
        return this.selectedUser;
    }

    addUser(user : User){
        console.log("Adding user",user);
        this.http.post<User>(this.userUrl, user, this.httpOptions).subscribe(() => this.setUsersFromUrl());
    }

    updateUser(user : User){
        const urlId = this.userUrl + '/' + user.id;
        this.http.put<User>(urlId, user, this.httpOptions).subscribe((user)=>this.setSelectedUser(user.id));
    }
}