import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { User } from 'src/models/user.model';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit{
    ngOnInit(){}

    @Input()
    user : User;

    @Output()
    userSelected: EventEmitter<User> = new EventEmitter<User>();

    constructor(){} 
}