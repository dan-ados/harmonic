import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import {AppComponent} from './app.component';
import {UsersComponent} from './users/users.component';
import {MessagesComponent} from './messages/messages.component';
import {InputComponent} from './input/input.component';
import {MatButtonModule} from "@angular/material/button";

@NgModule({
    declarations: [
        AppComponent,
        UsersComponent,
        MessagesComponent,
        InputComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
