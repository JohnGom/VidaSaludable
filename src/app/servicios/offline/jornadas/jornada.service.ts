import { BaseService } from './../base/base.service';
import { Injectable } from '@angular/core';

@Injectable()
export class JornadasService extends BaseService {

  constructor() {
    super();
   }

   getJornadas = function () {
    return new Promise((resolve, reject) => {
      this._connection.select({
        From: 'jornadas'
      }, function (students) {
        resolve(students);
      }, function (error) {
        reject(error);
      });
    });
  }

}
