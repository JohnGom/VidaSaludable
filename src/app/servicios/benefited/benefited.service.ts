import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

@Injectable()
export class BenefitedService {

  constructor(private http: Http) { }

  getInfoClient(id: number) {
    let URL = `http://localhost:8080/jersey-starterkit/rest/client/getClient?id=${id}`;
    return this.http.get(URL)
 }

}
