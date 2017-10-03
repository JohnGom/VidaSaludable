import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

@Injectable()
export class InterpretationService {

 constructor(private http: Http) {}

 public getQuestions(dimension: string) {
    let URL = `http://localhost:8080/jersey-starterkit/rest/interpretation/getquestions?dimension=${dimension}`;
    return this.http.get(URL)
}

public detalleInterven(inter: Object) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let url = 'http://localhost:8080/jersey-starterkit/rest/interpretation/detallesInter';
        let options = new RequestOptions({ headers: headers });
            return this.http.post(url, inter, options);
    }

}
