import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthserviceService {
public token: string;
 
    constructor(private http: Http) {
    }


    login(username: string, password: string): Observable<boolean> {
        let URL = `http://localhost:8080/jersey-starterkit/rest/WebService/login?username=${username}&password=${password}`;
        return this.http.get(URL).map(
                (data) => {

                let info = data.json();
                if (info) {
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: info.id, type: info.type }));  
                    // return true to indicate successful login
                    return true;
                } else {
                    return false;
                }
            },
            );
    }
 
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}

