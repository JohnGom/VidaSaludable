import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
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

}
