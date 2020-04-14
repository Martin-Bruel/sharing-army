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
    
    public users$ : BehaviorSubject<User[]> = new BehaviorSubject(this.users);

    public userSelected$ : Subject<User> = new Subject();

    private userUrl = serverUrl + '/users';

    private httpOptions = httpOptionsBase;

    constructor(private http : HttpClient){
        this.setUsersFromUrl();
        console.log("Constru service");
    }

    setUsersFromUrl(){
        this.http.get<User[]>(this.userUrl).subscribe((userList) => {
            this.users = userList;
            this.users$.next(this.users);
        })
    }
}