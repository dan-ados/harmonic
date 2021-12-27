import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AppService} from '../app.service';
import {UsersService} from './users.service';
import {User} from './user';
import {Subscription, take} from "rxjs";


@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit, OnDestroy {

    @Input() loginChoose: boolean;
    @Input() connectedUser: User;
    chatUserId: number;

    readonly subscriptions: { [key: string]: Subscription };

    usersList: User[];

    constructor(private appService: AppService,
                private usersService: UsersService) {

        this.subscriptions = {};

    }

    get displayName(): string {
        const full_name = (this.connectedUser.last_name || '') + ' ' + (this.connectedUser.first_name || '');
        return full_name !== ' ' ? full_name : this.connectedUser.username;
    }

    ngOnInit(): void {
        this.getUsers();
    }

    ngOnDestroy(): void {
        Object.values(this.subscriptions).forEach(subscription => subscription.unsubscribe());
    }

    getUsers() {
        this.subscriptions['getUsers'] = this.usersService.getUsers().subscribe(usersList => {
            this.usersList = usersList;
            this.usersList = this.usersList.filter(u => u.id !== this.appService.connectedUser?.id);
        })
    }

    chooseUser(id: number) {

        if (this.loginChoose) {
            // Choosing connected user and saving selected user to session storage
            this.subscriptions['getUser'] = this.usersService.getUserByID(id.toString()).pipe(take(1)).subscribe(connectedUser => {
                this.connectedUser = connectedUser;
                sessionStorage.setItem('connectedUserId', this.connectedUser.id.toString())
                this.appService.initUserStatus(this.connectedUser.id)
                this.appService.connectedUserChanged.next(this.connectedUser);
            });
        } else {
            // Choosing user to chat
            this.chatUserId = id;
            this.subscriptions['getUser'] = this.usersService.getUserByID(id.toString()).pipe(take(1)).subscribe(chatUser => {
                this.appService.chatUserChanged.next(chatUser);
                this.appService.initChatChanel(this.connectedUser.id, id)
            });
        }


    }

}
