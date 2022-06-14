import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Sensor } from "../../models/Sensor";
import { Subscription } from 'rxjs';
import { SensorRecord } from "../../models/SensorRecord";
import { SensorService } from 'src/app/services/sensor.service';
import { SensorRecordsService } from 'src/app/services/sensor-records.service';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit, OnDestroy {
  sensorList: Sensor[] = [];
  private sensorSub: Subscription;
  maxEntries = 0;
  lineChartData : ChartDataSets []

  constructor(private sensorService: SensorService,
    private sensorRecordsService: SensorRecordsService) { }


  ngOnInit(): void {
    this.sensorService.getAllSensor();
      this.sensorSub = this.sensorService
      .getSensorUpdateListener()
      .subscribe((elements: Sensor[]) => {
        this.sensorList = elements;
        this.lineChartData = this.createChartData();
        console.log(this.lineChartData);
      }
    );
    
      
    }

  createChartData (){
    let datas: ChartDataSets[];
    for(let i=0; i < this.sensorList.length; i++) {
      console.log(this.sensorList[i].id)
      let records : SensorRecord[];
      this.sensorRecordsService.getSensorEntryValues(this.sensorList[i].id)
      .subscribe(entry => console.log(entry))
      console.log(records)
      //this.maxEntries = values.length > this.maxEntries ? values.length : this.maxEntries;
    //datas[i]= {data: [1, 2], label: this.sensorList[i].name}
    }
    return datas;
  }
    
  ngOnDestroy(): void {
    this.sensorSub.unsubscribe();
  }
 
  lineChartLabels: Label[] = ['value', 'sensorId'];
 
  lineChartOptions = {
    responsive: true,
  };
 
  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];
 
  lineChartLegend = true;
  lineChartPlugins = [];
  public lineChartType: ChartType = 'line';

}
