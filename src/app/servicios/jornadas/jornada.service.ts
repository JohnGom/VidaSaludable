import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class JornadaService {

 constructor(private http: Http) {

 }
 getJornadas(id: number) {
        let URL = `http://localhost:8080/jersey-starterkit/rest/jornada/getjornada?programa=${id}`;
        return this.http.get(URL)
    }
  
}
