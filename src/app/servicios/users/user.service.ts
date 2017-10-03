import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

@Injectable()
export class UserService {

    constructor(private http: Http) {
  }
  
    public getallUsers() {
        let URL = `http://localhost:8080/jersey-starterkit/rest/user/getallUsers`;
        return this.http.get(URL)
    }

    public saveUsers(user: Object) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let url = 'http://localhost:8080/jersey-starterkit/rest/user/createUser';
        let options = new RequestOptions({ headers: headers });
            return this.http.post(url, user, options);
    }
    public updateUsers(user: Object) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let url = 'http://localhost:8080/jersey-starterkit/rest/user/updUser';
        let options = new RequestOptions({ headers: headers });
            return this.http.put(url, user, options);
    }

    public deleteUsers(id: number) {
        let URL = `http://localhost:8080/jersey-starterkit/rest/user/deleteUser?id=${id}`;
        return this.http.delete(URL)
    }

    public interviewers() {
        let URL = 'http://localhost:8080/jersey-starterkit/rest/user/getinterviewers';
        return this.http.get(URL)
    }

}
