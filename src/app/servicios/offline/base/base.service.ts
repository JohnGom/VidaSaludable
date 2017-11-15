import { Injectable } from '@angular/core';
import { Instance } from 'JsStore';
declare var JsStore: any;

@Injectable()
export class BaseService {
  _connection: Instance;

  constructor() {
    this._connection = new JsStore.Instance();
    let That = this,
      DatabaseName = 'jornadas';

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
    const TblStudent = {
      Name: 'jornadas',
      Columns: [{
        Name: 'id', PrimaryKey: true, AutoIncrement: false
      },
      {
        Name: 'programa', NotNull: true, DataType: 'number'
      },
      {
        Name: 'name', DataType: 'string'
      },
      {
        Name: 'city', DataType: 'string'
      },
      {
        Name: 'department', DataType: 'string'
      },
      {
        Name: 'date', DataType: 'Date'
      },
      {
        Name: 'tipo', DataType: 'string'
      },
      {
        Name: 'place', DataType: 'string'
      },
      {
        Name: 'state', DataType: 'string'
      },
      {
        Name: 'bioquimica', DataType: 'boolean'
      },
      ]
    };
    const DataBase = {
      Name: 'jornadas',
      Tables: [TblStudent]
    };

    return DataBase as any;
    }

}
