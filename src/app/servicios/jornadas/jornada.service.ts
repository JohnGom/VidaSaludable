import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

@Injectable()
export class JornadaService {

 constructor(private http: Http) {

 }
 getJornadas(id: number) {
    let URL = `http://localhost:8080/jersey-starterkit/rest/jornada/getjornada?programa=${id}`;
    return this.http.get(URL)
 }
public getallJornadas() {
    let URL = 'http://localhost:8080/jersey-starterkit/rest/jornada/allJornadas';
    return this.http.get(URL)
}
public saveJornadas(jornada: Object) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let url = 'http://localhost:8080/jersey-starterkit/rest/jornada/newJornada';
        let options = new RequestOptions({ headers: headers });
            return this.http.post(url, jornada, options);
    }
public updateJornadas(jornada: Object) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let url = 'http://localhost:8080/jersey-starterkit/rest/jornada/updjornada';
    let options = new RequestOptions({ headers: headers });
        return this.http.put(url, jornada, options);
}

public deleteJornadas(id: number) {
    let URL = `http://localhost:8080/jersey-starterkit/rest/jornada/deletejornada?id=${id}`;
    return this.http.delete(URL)
}

}
