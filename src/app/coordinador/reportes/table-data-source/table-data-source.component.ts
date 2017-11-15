import { Component, NgModule } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Observable } from 'rxjs/Observable';
import { MatSort } from '@angular/material';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

export class TableDataSource extends DataSource<any> {
    _filterChange = new BehaviorSubject('');
    get filter(): string { return this._filterChange.value; }
    set filter(filter: string) { this._filterChange.next(filter); }

    constructor(public dataTable: any,
                private _paginator: MatPaginator,
                private _sort: MatSort) {
      super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<any[]> {
      const displayDataChanges = [
        this.dataTable.dataChange,
        this._paginator.page,
        this._sort.sortChange,
        this._filterChange
      ];

      return Observable.merge(...displayDataChanges).map(() => {
        //Filter Data
        let dataTable = this.dataTable.data.slice().filter((item: any) => {
          let searchStr = (item.cliente.firstname + item.cliente.lastname + item.resultado + item.detalles[0].respuesta).toLowerCase();
          return searchStr.includes(this.filter.toLowerCase());
        });

        //sorted
        const data = this.getSortedData(dataTable);

        //paginated
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        return data.splice(startIndex, this._paginator.pageSize);
      });
    }

    /** Returns a sorted copy of the database data. */
    getSortedData(data): any[] {
      if (!this._sort.active || this._sort.direction == '') { return data; }

      return data.sort( (a, b) => {
        let propertyA: number|string = '';
        let propertyB: number|string = '';

        switch (this._sort.active) {
          case 'firstname':
                [propertyA, propertyB] = [a.cliente.firstname, b.cliente.firstname];
            break;
          case 'lastname':
                [propertyA, propertyB] = [a.lastname, b.lastname];
            break;
          case 'resultado':
                [propertyA, propertyB] = [a.resultado, b.resultado];
            break;
          case 'fecha':
                [propertyA, propertyB] = [a.detalles[0].respuesta, b.detalles[0].respuesta];
            break;
        }

        let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
        let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

        return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
      });
    }

    disconnect() {}
  }