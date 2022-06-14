import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { SensorRecord } from '../models/SensorRecord';

@Injectable({
  providedIn: 'root'
})
export class SensorRecordsService {

  constructor(private http: HttpClient, private router: Router) { }

  
  private sensorsRecords: SensorRecord[] = [];
  private updatedSensorsRecords = new Subject<SensorRecord[]>();


  addNewSensorRecord(
    id: number,
    value: number,
    sensorId: number
  ) {
    const newElement: SensorRecord = {
    id: id,
    value: value,
    sensorId: sensorId,
    };
    console.log(newElement)
    this.http
      .post<{ message: string; sensorId: number }>(
        'http://localhost:3000/api/sensorRecord',
        newElement
      )
      .subscribe((responseData) => {
        const sensorId = responseData.sensorId;
      });
  }

  sendEndSignal() {
    const newElement: SensorRecord = {
    id: -1,
    value: null,
    sensorId: null,
    };
    this.http
      .post<{ message: string; sensorId: number }>(
        'http://localhost:3000/api/sensorRecord',
        newElement
      );
  }


  // FOR GRAPHS
  // TODO: DEBUGGING NEEDED
  getSensorEntryValues(id: number): Observable<SensorRecord[]> {
    return this.http.get<SensorRecord[]>('http://localhost:3000/api/sensorRecord/'+id)
    .pipe(
      tap(_ => console.log('fetched heroes')),
      catchError(this.handleError<SensorRecord[]>('getHeroes', []))
    )
  }

  getSensorUpdateListener(){
    return this.updatedSensorsRecords.asObservable();
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    }
  };
}
