import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { User } from '../../data/user';

@Injectable()
export class ProgramService {
  

  constructor(private http: Http) {
  }
  
    getPrograms(user: User) {
        let id = user.token;
        let URL = `http://localhost:8080/jersey-starterkit/rest/program/getprograms?encargado=${id}`;
        return this.http.get(URL)
    }
    public getallPrograms() {
        let URL = `http://localhost:8080/jersey-starterkit/rest/program/getallprograms`;
        return this.http.get(URL)
    }

    public saveProgram(program: Object) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let url = 'http://localhost:8080/jersey-starterkit/rest/program/newProgram';
        let options = new RequestOptions({ headers: headers });
            return this.http.post(url, program, options);
    }
    public updateProgram(program: Object) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let url = 'http://localhost:8080/jersey-starterkit/rest/program/updprograma';
        let options = new RequestOptions({ headers: headers });
            return this.http.put(url, program, options);
    }

    public deletePrograms(id: number) {
        let URL = `http://localhost:8080/jersey-starterkit/rest/program/deleteprogram?id=${id}`;
        return this.http.delete(URL)
    }

}
