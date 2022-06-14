import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { SensorError } from '../models/SensorError';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private lowerBoundary: number;
  private upperBoundary: number;
  private errorList: SensorError[] = [];
  private updatedErrorList = new Subject<SensorError[]>();

  constructor(private http: HttpClient, private router: Router) {
    this.lowerBoundary = 200;
    this.upperBoundary = 800;
   }

  setLowerBoundary(lowerBoundary: number){
    this.lowerBoundary = lowerBoundary;
  }

  setUpperBoundary(upperBoundary: number){
    this.upperBoundary = upperBoundary;
  }

  getLowerBoundary(){
    return this.lowerBoundary;
  }

  getUpperBoundary(){
    return this.upperBoundary;
  }

  addNewSensorError(
    sensorName: string,
    placeOfSensor: string,
    value: number,
    unit: string
  ) {
    const newElement: SensorError = {
    id: null,
    sensorName: sensorName,
    placeOfSensor: placeOfSensor,
    timeOfMeasurement:null,
    value: value,
    unit: unit
    };
    console.log(newElement)
    this.http
      .post<{ message: string; sensorId: number }>(
        'http://localhost:3000/api/sensorError',
        newElement
      )
      .subscribe((responseData) => {
        const id = responseData.sensorId;
      });
  }

  getAllError(){
    this.http
      .get<{ message: string; elements: any}>('http://localhost:3000/api/sensorError')
      .pipe(
        map((error) => {
          return error.elements.map((element) => {
            return {
              id: element.id,
              sensorName: element.sensorName,
              placeOfSensor: element.placeOfSensor,
              timeOfMeasurement: element.timeOfMeasurement,
              value: element.value,
              unit: element.unit
            };
          });
        })
      )
      .subscribe((transformedElements) => {
        this.errorList = transformedElements;
        this.updatedErrorList.next([...this.errorList]);
      });
  }

  getSensorUpdateListener(){
    return this.updatedErrorList.asObservable();
  }

  sensorDeleteById(elementId: string){
    console.log(elementId)
    return this.http.delete('http://localhost:3000/api/sensorError/' + elementId);
  }
}
