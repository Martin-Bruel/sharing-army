import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { RSA_X931_PADDING } from 'constants';
import { resolve } from 'url';
import { first } from 'rxjs/operators';

  
@Injectable({
    providedIn: 'root'
})

export class PopupService {  

    private response$ : Subject<boolean> = new Subject()
    private response : boolean;

    private popup: any;

    constructor(){}

    setResponse(response : boolean){

        this.response = response;
        this.response$.next(this.response);
    }

    add(popup: any) {
        // add modal to array of active modals
        this.popup = popup;
    }

    open(text : String, buttonTrue :string = null, buttonFalse : string = null){

        this.popup.open(text, buttonTrue, buttonFalse);
        return this.response$.pipe(first());
    }
}