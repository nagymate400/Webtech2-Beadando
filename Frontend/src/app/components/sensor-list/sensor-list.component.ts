import { Component, OnDestroy, OnInit } from '@angular/core';
import { timer, Subscription, Observable, interval, distinctUntilChanged, map } from 'rxjs';
import { Sensor } from "../../models/Sensor";
import { SensorService } from "../../services/sensor.service";
import { SensorRecordsService } from "../../services/sensor-records.service";
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-sensor-list',
  templateUrl: './sensor-list.component.html',
  styleUrls: ['./sensor-list.component.css']
})
export class SensorListComponent implements OnInit, OnDestroy{

  sensorList: Sensor[] = [];
  private sensorSub: Subscription;
  subscribe;

  constructor(
    private sensorService: SensorService,
    private sensorRecordsService: SensorRecordsService,
    private errorService: ErrorService,
    ) 
    {}

  ngOnInit(): void {
    this.sensorService.getAllSensor();
      this.sensorSub = this.sensorService
      .getSensorUpdateListener()
      .subscribe((elements: Sensor[]) => {
        this.sensorList = elements;
      });

      this.sensorList.forEach(element => this.onActiveStatusChange(element));
  }

  ngOnDestroy(): void {
    this.sensorSub.unsubscribe();
  }

  onActiveStatusChange(element: Sensor) {

    let source = timer(1000,1000);

    if(element.active === true){
      element.active = false;
      this.sensorService.patchSensor(element.id, element);
      this.sensorRecordsService.addNewSensorRecord(-1, null, null)
      this.subscribe.unsubscribe(); 
    } else {
      element.active = true;
      this.sensorService.patchSensor(element.id, element);
      this.subscribe = source.subscribe(
        () => { 
          const value = Math.floor((Math.random() * 1000) + 1);
          if(value > this.errorService.getUpperBoundary() || value< this.errorService.getLowerBoundary()){
              this.errorService.addNewSensorError(
                element.name,
                element.placeOfMeasurment,
                value,
                element.unit
              )
          } else if(element.active){
            this.sensorRecordsService.addNewSensorRecord(null, value, element.id)
          }
        }
      )
    }
  }
} 
