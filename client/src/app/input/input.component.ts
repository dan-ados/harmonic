import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {AppService} from "../app.service";
import {User} from "../users/user";

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss']
})

export class InputComponent implements OnInit {

    @Input() connectedUser: User;
    @Input() chatUser: User;

    messageText: FormControl;

    constructor(private appService: AppService) {
    }

    ngOnInit(): void {
        this.messageText = new FormControl('');
    }

    sendMessage() {
        this.appService.sendMessage(this.messageText.value);
        this.messageText.setValue('');
    }

}
