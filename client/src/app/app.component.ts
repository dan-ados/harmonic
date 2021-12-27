import {Component, OnInit} from '@angular/core';
import {AppService} from "./app.service";
import {UsersService} from "./users/users.service";
import {User} from "./users/user";
import {Subscription, take} from "rxjs";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

    private subscriptions: { [key: string]: Subscription };

    connectedUser: User;
    chatUser: User;

    constructor(private appService: AppService,
                private usersService: UsersService) {

        this.subscriptions = {};

    }

    ngOnInit(): void {

        this.appService.getConnectedUser();

        this.appService.connectedUserChanged.pipe(take(1)).subscribe(connectedUser => {
            this.connectedUser = connectedUser;
            this.appService.getConnectedUser();
        });

        this.appService.chatUserChanged.subscribe(chatUser => {
            this.chatUser = chatUser;
        });

    }

}
