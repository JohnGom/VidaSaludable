import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

@Injectable()
export class JornadaService {

 constructor(private http: Http) {

 }
 getJornadas(id: number) {
    let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
    let URL = `http://localhost:8080/jersey-starterkit/rest/jornada/getjornadabyencuestador?encuestador=${id}`;
    let options = new RequestOptions({ headers: headers });
    return this.http.get(URL)
 }

 getInterventions(id: number) {
    let URL = `http://localhost:8080/jersey-starterkit/rest/client/getinterventions?id=${id}`;
    return this.http.get(URL)
 }

public getallJornadas(id: number) {
    let URL = `http://localhost:8080/jersey-starterkit/rest/jornada/allJornadas?programa=${id}`;
    return this.http.get(URL)
}
public saveJornadas(jornada: Object) {
        let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let url = 'http://localhost:8080/jersey-starterkit/rest/jornada/newJornada';
        let options = new RequestOptions({ headers: headers });
            return this.http.post(url, jornada, options);
    }
public updateJornadas(jornada: Object) {
    let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
    let url = 'http://localhost:8080/jersey-starterkit/rest/jornada/updjornada';
    let options = new RequestOptions({ headers: headers });
        return this.http.put(url, jornada, options);
}

public deleteJornadas(id: number) {
    let URL = `http://localhost:8080/jersey-starterkit/rest/jornada/deletejornada?id=${id}`;
    return this.http.delete(URL)
}

public insertEncargadoJor(user: Object, id: number) {
    let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
    let URL = `http://localhost:8080/jersey-starterkit/rest/jornada/assignEn?jornada=${id}`;
    let options = new RequestOptions({ headers: headers });
    return this.http.post(URL, user, options);
}

public getDepartments() {
    return this.http.get('assets/departamentos.json')
}

public getCities() {
    return this.http.get('assets/ciudades.json')
}

}
