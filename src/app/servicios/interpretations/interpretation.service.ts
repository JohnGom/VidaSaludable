import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

@Injectable()
export class InterpretationService {

 constructor(private http: Http) {}

 public getQuestions(dimension: string) {
    let URL = `http://localhost:8080/jersey-starterkit/rest/interpretation/getquestions?dimension=${dimension}`;
    return this.http.get(URL)
}

public getInfoInterp(dimension: string) {
    let URL = `http://localhost:8080/jersey-starterkit/rest/interpretation/infoInterpretaciones?dimension=${dimension}`;
    return this.http.get(URL)
}

public getInterpretations(inter: number) {
    let URL = `http://localhost:8080/jersey-starterkit/rest/interpretation/getInterpretation?intervencion=${inter}`;
    return this.http.get(URL)
}

public detalleInterven(inter: Object) {
    let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
    let url = 'http://localhost:8080/jersey-starterkit/rest/interpretation/detallesInter';
    let options = new RequestOptions({ headers: headers });
        return this.http.post(url, inter, options);
}
public insertInterpretacion(interpretacion: Object) {
    let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
    let url = 'http://localhost:8080/jersey-starterkit/rest/interpretation/saveinterp';
    let options = new RequestOptions({ headers: headers });
        return this.http.post(url, interpretacion, options);
}

public insertParticipante(participante: Object) {
    let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
    let url = 'http://localhost:8080/jersey-starterkit/rest/client/saveparticipante';
    let options = new RequestOptions({ headers: headers });
        return this.http.post(url, participante, options);
}

public updateIntervention(interven: Object) {
    let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
    let url = 'http://localhost:8080/jersey-starterkit/rest/client/updateintervencion';
    let options = new RequestOptions({ headers: headers });
        return this.http.post(url, interven, options);
}

public insertIntervencion(intervencion: Object) {
    let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
    let url = 'http://localhost:8080/jersey-starterkit/rest/client/saveintervencion';
    let options = new RequestOptions({ headers: headers });
        return this.http.post(url, intervencion, options);
}

public sendEmail(interven: Object) {
    let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
    let url = 'http://localhost:8080/jersey-starterkit/rest/WebService/sendEmail';
    let options = new RequestOptions({ headers: headers });
        return this.http.post(url, interven, options);
}

}
