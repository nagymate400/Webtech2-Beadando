import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sensor } from '../models/Sensor';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  constructor(private http: HttpClient, private router: Router) { }
  
  private sensors: Sensor[] = [];
  private updatedSensors = new Subject<Sensor[]>();

  addNewSensor(
    name: string,
    placeOfMeasurment: string,
    unit: string,
    active: boolean
  ) {
    const newElement: Sensor = {
    id: null,
    name: name,
    placeOfMeasurment: placeOfMeasurment,
    unit: unit,
    active: active,
    };
    console.log(newElement)
    this.http
      .post<{ message: string; sensorId: number }>(
        'http://localhost:3000/api/sensor',
        newElement
      )
      .subscribe((responseData) => {
        const id = responseData.sensorId;
      });
  }



  getAllSensor(){
    this.http
      .get<{ message: string; elements: any}>('http://localhost:3000/api/sensor')
      .pipe(
        map((sensor) => {
          return sensor.elements.map((element) => {
            return {
              id: element.id,
              name: element.name,
              placeOfMeasurment: element.placeOfMeasurment,
              unit: element.unit,
              active: element.active
            };
          });
        })
      )
      .subscribe((transformedElements) => {
        this.sensors = transformedElements;
        this.updatedSensors.next([...this.sensors]);
      });
  }

  public patchSensor(id: number, sensor: Sensor): void { 
    console.log('sending patch request to add an item');

    this.http.patch(`http://localhost:3000/api/sensor/{id}`, sensor).subscribe(
      res => { 
        console.log('received ok response from patch request');
      },
      error => {
        console.error('There was an error during the request');
        console.log(error);
      });

    console.log('request sent. Waiting for response...');

  }

  getSensorUpdateListener(){
    return this.updatedSensors.asObservable();
  }

  sensorDeleteById(elementId: string){
    console.log(elementId)
    return this.http.delete('http://localhost:3000/api/sensor' + elementId);
  }
}
