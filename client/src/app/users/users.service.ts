import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {User} from './user';


@Injectable({
    providedIn: 'root'
})

export class UsersService {

    constructor(private http: HttpClient) {
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>('/api/users/?format=json');
    }

    getUserByID(userId: string): Observable<User> {
        return this.http.get<User>('/api/users/' + userId + '/');
    }

    updateStatus(user: User, online: boolean): Observable<User> {
        return this.http.put<User>('/api/users/' + user.id + '/', {username: user.username, is_active: online});
    }

}
