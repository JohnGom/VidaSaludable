import { Injectable } from '@angular/core';
import { Instance } from 'JsStore';
declare var JsStore: any;

@Injectable()
export class BaseService {
  _connection: Instance;

  constructor() {
    this._connection = new JsStore.Instance();
    let That = this,
      DatabaseName = 'salud';

    JsStore.isDbExist(DatabaseName, function (isExist) {
      if (isExist) {
        That._connection.openDb(DatabaseName);
      }
      else {
        const DataBase = That.getDatabase();
        That._connection.createDb(DataBase);
      }
    },
      function (err) {
        //this will be fired when indexedDB is not supported.
        alert(err.Message);
      }); 
  }

  private getDatabase = function () {
    const TblJornadas = {
      Name: 'jornadas',
      Columns: [
      { Name: 'id', PrimaryKey: true, AutoIncrement: false },
      { Name: 'programa', DataType: 'number'},
      { Name: 'name', DataType: 'string' },
      { Name: 'city', DataType: 'string' },
      { Name: 'department', DataType: 'string' },
      { Name: 'date', DataType: 'string' },
      { Name: 'tipo', DataType: 'string' },
      { Name: 'place', DataType: 'string' },
      { Name: 'state', DataType: 'string' },
      { Name: 'bioquimica', DataType: 'boolean' }
      ]
    };
    const TblParticipante = {
      Name: 'participantes',
      Columns: [
      { Name: 'id', PrimaryKey: true, AutoIncrement: false },
      { Name: 'typeId', DataType: 'string'},
      { Name: 'education', DataType: 'string' },
      { Name: 'firstname', DataType: 'string' },
      { Name: 'lastname', DataType: 'string' },
      { Name: 'birthdate', DataType: 'string' },
      { Name: 'gender', DataType: 'string' },
      { Name: 'stratus', DataType: 'number' },
      { Name: 'civilStatus', DataType: 'string' },
      { Name: 'eps', DataType: 'string' },
      { Name: 'occupation', DataType: 'string' },
      { Name: 'religion', DataType: 'string' }
      ]
    };
    const TblDetalleInter = {
      Name: 'detallesintervenciones',
      Columns: [
      { Name: 'id', PrimaryKey: true, AutoIncrement: true },
      { Name: 'question', DataType: 'number'},
      { Name: 'intervened', DataType: 'number' },
      { Name: 'jornada', DataType: 'number' },
      { Name: 'respuesta', DataType: 'string' }
      ]
    };
    const TblInfoInterpreacion = {
      Name: 'infoInterpretaciones',
      Columns: [
      { Name: 'id', PrimaryKey: true, AutoIncrement: false },
      { Name: 'categoria', DataType: 'string'},
      { Name: 'dimension', DataType: 'string' },
      { Name: 'recomendacion', DataType: 'string' }
      ]
    };
    const TblInterpretacion = {
      Name: 'interpretaciones',
      Columns: [
      { Name: 'id', PrimaryKey: true, AutoIncrement: true },
      { Name: 'intervencion', DataType: 'number'},
      { Name: 'participante', DataType: 'number' },
      { Name: 'nombre', DataType: 'string' },
      { Name: 'resultado', DataType: 'string' },
      { Name: 'recomendacion', DataType: 'string' },
      { Name: 'dimension', DataType: 'string' }
      ]
    };
    const TblIntervencion = {
      Name: 'intervenciones',
      Columns: [
      { Name: 'id', PrimaryKey: true, AutoIncrement: true },
      { Name: 'jornada', DataType: 'number'},
      { Name: 'participante', DataType: 'number' },
      { Name: 'observacion', DataType: 'string' },
      { Name: 'resultado', DataType: 'string' },
      { Name: 'fechaInter', DataType: 'string' },
      { Name: 'fechaSegui', DataType: 'string' },
      { Name: 'correo', DataType: 'string' }
      ]
    };
    const TblPregunta = {
      Name: 'pregunta',
      Columns: [
      { Name: 'id', PrimaryKey: true, AutoIncrement: false },
      { Name: 'question', DataType: 'string'},
      { Name: 'dimension', DataType: 'string' }
      ]
    };
    const DataBase = {
      Name: 'salud',
      Tables: [TblJornadas, TblParticipante, TblDetalleInter, TblInfoInterpreacion, TblInterpretacion, TblIntervencion, TblPregunta]
    };

    return DataBase as any;
    }

}
