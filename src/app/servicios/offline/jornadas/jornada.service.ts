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

  addJornadas = function (jornada) {
    return new Promise((resolve, reject) => {
      this._connection.insert({
        Into: 'jornadas',
        Values: [jornada]
      }, function (rowsAdded) {
        resolve(rowsAdded)
      }, function (error) {
        reject(error);
      });
    });
  }

  deleteJornada = function () {
    return new Promise((resolve, reject) => {
      this._connection.delete({
        From: 'jornadas'
      }, function (rowsDeleted) {
        resolve(rowsDeleted)
      }, function (error) {
        reject(error);
      });
    });
  }

  getPreguntas = function () {
    return new Promise((resolve, reject) => {
      this._connection.select({
        From: 'pregunta'
      }, function (students) {
        resolve(students);
      }, function (error) {
        reject(error);
      });
    });
  }

  addPreguntas = function (pregunta) {
    return new Promise((resolve, reject) => {
      this._connection.insert({
        Into: 'pregunta',
        Values: [pregunta]
      }, function (rowsAdded) {
        resolve(rowsAdded)
      }, function (error) {
        reject(error);
      });
    });
  }

  deletePreguntas = function () {
    return new Promise((resolve, reject) => {
      this._connection.delete({
        From: 'pregunta'
      }, function (rowsDeleted) {
        resolve(rowsDeleted)
      }, function (error) {
        reject(error);
      });
    });
  }

  getinfoInterpretaciones = function () {
    return new Promise((resolve, reject) => {
      this._connection.select({
        From: 'infoInterpretaciones'
      }, function (students) {
        resolve(students);
      }, function (error) {
        reject(error);
      });
    });
  }

  addinfoInterpretaciones = function (infoInter) {
    return new Promise((resolve, reject) => {
      this._connection.insert({
        Into: 'infoInterpretaciones',
        Values: [infoInter]
      }, function (rowsAdded) {
        resolve(rowsAdded)
      }, function (error) {
        reject(error);
      });
    });
  }

  deleteinfoInterpretaciones = function () {
    return new Promise((resolve, reject) => {
      this._connection.delete({
        From: 'infoInterpretaciones'
      }, function (rowsDeleted) {
        resolve(rowsDeleted)
      }, function (error) {
        reject(error);
      });
    });
  }

}
