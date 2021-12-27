import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {AppService} from '../app.service';
import {User} from "../users/user";


@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss']
})

export class MessagesComponent implements OnInit {

    @Input() connectedUser: User;
    @Input() chatUser: User;

    @ViewChild('messagesBlock', {read: ElementRef}) private messagesBlock: ElementRef;

    userMessages: [];

    constructor(private appService: AppService,
                private renderer: Renderer2) {
        this.userMessages = [];
    }

    ngOnInit(): void {

        this.appService.newMessageSend.subscribe(message => {
            this.appendMessage(message, 'outgoing');
        });

        this.appService.newMessageReceived.subscribe(message => {
            this.appendMessage(message, 'incoming');
        });
    }

    appendMessage(message: string, type: string) {

        const messageContainer = this.renderer.createElement('div');
        this.renderer.addClass(messageContainer, type);

        const text = this.renderer.createText(message);
        this.renderer.appendChild(messageContainer, text);
        this.renderer.appendChild(this.messagesBlock.nativeElement, messageContainer);
    }

}
