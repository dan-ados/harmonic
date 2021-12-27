import {Injectable} from '@angular/core';
import {Subject, Subscription, take} from 'rxjs';
import {User} from "./users/user";
import {UsersService} from "./users/users.service";


@Injectable({
    providedIn: 'root'
})


export class AppService {

    private sendWebSocket: WebSocket;
    private receiveWebSocket: WebSocket;
    private statusWebSocket: WebSocket;
    private wsUrl = 'ws://' + window.location.host + '/api/ws/';

    readonly subscriptions: { [key: string]: Subscription };

    connectedUser: User;
    connectedUserChanged: Subject<User>;
    chatUserChanged: Subject<User>;

    newMessageSend: Subject<string>;
    newMessageReceived: Subject<string>;
    newConnectedUser: Subject<string>;

    constructor(private usersService: UsersService) {

        this.subscriptions = {};

        this.connectedUserChanged = new Subject<User>();
        this.chatUserChanged = new Subject<User>();

        this.newMessageSend = new Subject<string>();
        this.newMessageReceived = new Subject<string>();
        this.newConnectedUser = new Subject<string>();

    }

    getConnectedUser() {

        const connectedUserId = sessionStorage.getItem('connectedUserId')
        if (connectedUserId) {
            this.usersService.getUserByID(connectedUserId).pipe(take(1)).subscribe(connectedUserResponse => {
                this.connectedUser = connectedUserResponse;
                this.connectedUserChanged.next(this.connectedUser);
            })
        }
    }

    initChatChanel(fromId: number, toId: number) {

        this.sendWebSocket = new WebSocket(this.wsUrl + 'chat/send/' + fromId + '/' + toId);
        this.receiveWebSocket = new WebSocket(this.wsUrl + 'chat/receive/' + toId + '/' + fromId);

        this.receiveWebSocket.onmessage = (event: MessageEvent) => {
            this.newMessageReceived.next(event.data);
        };

    }

    initUserStatus(userId: number) {

        this.statusWebSocket = new WebSocket(this.wsUrl + 'user-statuses');
        this.statusWebSocket.onopen = () => {
            this.statusWebSocket.send(userId.toString())
        }

        this.statusWebSocket.onmessage = (event: MessageEvent) => {
            this.newConnectedUser.next(event.data);
        };

    }

    sendMessage(message: string) {
        this.sendWebSocket.send(message);
        this.newMessageSend.next(message);
    }

}
