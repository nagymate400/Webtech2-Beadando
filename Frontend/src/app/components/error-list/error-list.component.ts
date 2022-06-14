import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SensorError } from 'src/app/models/SensorError';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-error-list',
  templateUrl: './error-list.component.html',
  styleUrls: ['./error-list.component.css']
})
export class ErrorListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id','sensorName', 'placeOfSensor', 'timeOfMeasurement', 'value', 'unit'];
  errorList;
  private errorSub: Subscription;
  subscribe;

  constructor(private errorService: ErrorService) { }

  ngOnInit(): void {
    this.errorService.getAllError();
    this.errorSub = this.errorService
    .getSensorUpdateListener()
    .subscribe((elements: SensorError[]) => {
      this.errorList = elements;
    });
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }


}
