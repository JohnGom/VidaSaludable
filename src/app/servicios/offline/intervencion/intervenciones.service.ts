import { Injectable } from '@angular/core';
import { BaseService } from './../base/base.service';

@Injectable()
export class IntervencionesService extends BaseService {

  constructor() {
    super();
   }

    getParticipante = function () {
    return new Promise((resolve, reject) => {
      this._connection.select({
        From: 'participantes'
      }, function (students) {
        resolve(students);
      }, function (error) {
        reject(error);
      });
    });
  }

  addParticipante = function (participante) {
    return new Promise((resolve, reject) => {
      this._connection.insert({
        Into: 'participantes',
        Values: [participante]
      }, function (rowsAdded) {
        resolve(rowsAdded)
      }, function (error) {
        reject(error);
      });
    });
  }

  deleteParticipante = function () {
    return new Promise((resolve, reject) => {
      this._connection.delete({
        From: 'participantes'
      }, function (rowsDeleted) {
        resolve(rowsDeleted)
      }, function (error) {
        reject(error);
      });
    });
  }

  getDetalleInter = function () {
    return new Promise((resolve, reject) => {
      this._connection.select({
        From: 'detallesintervenciones'
      }, function (students) {
        resolve(students);
      }, function (error) {
        reject(error);
      });
    });
  }

  addDetalleInter = function (detalle) {
    return new Promise((resolve, reject) => {
      this._connection.insert({
        Into: 'detallesintervenciones',
        Values: [detalle]
      }, function (rowsAdded) {
        resolve(rowsAdded)
      }, function (error) {
        reject(error);
      });
    });
  }

  deleteDetalleInter = function () {
    return new Promise((resolve, reject) => {
      this._connection.delete({
        From: 'detallesintervenciones'
      }, function (rowsDeleted) {
        resolve(rowsDeleted)
      }, function (error) {
        reject(error);
      });
    });
  }

  getInterpretacion = function () {
    return new Promise((resolve, reject) => {
      this._connection.select({
        From: 'interpretaciones'
      }, function (students) {
        resolve(students);
      }, function (error) {
        reject(error);
      });
    });
  }

  getInterpretacionByInterven = function (inter) {
    return new Promise((resolve, reject) => {
      this._connection.select({
        From: 'interpretaciones',
        Where: {
          intervencion: inter
        }
      }, function (students) {
        resolve(students);
      }, function (error) {
        reject(error);
      });
    });
  }

  addInterpretacion = function (detalle) {
    return new Promise((resolve, reject) => {
      this._connection.insert({
        Into: 'interpretaciones',
        Values: [detalle]
      }, function (rowsAdded) {
        resolve(rowsAdded)
      }, function (error) {
        reject(error);
      });
    });
  }

  deleteInterpretacion = function () {
    return new Promise((resolve, reject) => {
      this._connection.delete({
        From: 'interpretaciones'
      }, function (rowsDeleted) {
        resolve(rowsDeleted)
      }, function (error) {
        reject(error);
      });
    });
  }

  getIntervenciones = function () {
    return new Promise((resolve, reject) => {
      this._connection.select({
        From: 'intervenciones'
      }, function (students) {
        resolve(students);
      }, function (error) {
        reject(error);
      });
    });
  }

  addIntervenciones = function (detalle) {
    return new Promise((resolve, reject) => {
      this._connection.insert({
        Into: 'intervenciones',
        Values: [detalle]
      }, function (rowsAdded) {
        resolve(rowsAdded)
      }, function (error) {
        reject(error);
      });
    });
  }

  deleteIntervenciones = function () {
    return new Promise((resolve, reject) => {
      this._connection.delete({
        From: 'intervenciones'
      }, function (rowsDeleted) {
        resolve(rowsDeleted)
      }, function (error) {
        reject(error);
      });
    });
  }

  updateIntervenciones = function (InterenId, updateValue) {
    return new Promise((resolve, reject) => {
      this._connection.update({
        In: 'intervenciones',
        Where: {
          id: InterenId
        },
        Set: updateValue
      }, function (rowsUpdated) {
        resolve(rowsUpdated)
      }, function (error) {
        reject(error);
      });
    });
  }

  getQuestionByDimen = function () {
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

  getInfoInterByDimen = function () {
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

}
