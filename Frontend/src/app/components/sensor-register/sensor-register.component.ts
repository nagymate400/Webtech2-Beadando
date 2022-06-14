import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { SensorService } from "../../services/sensor.service";


@Component({
  selector: 'app-sensor-register',
  templateUrl: './sensor-register.component.html',
  styleUrls: ['./sensor-register.component.css']
})
export class SensorRegisterComponent implements OnInit {

  form: FormGroup;

  constructor(private sensorService : SensorService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      }),
      placeOfMeasurment: new FormControl(null, {
        validators: [Validators.required],
      }),
      unit: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(2)],
      }),
      active: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  
  saveNewSensor() {
    console.log(this.form.get('active').value)
    if (this.form.invalid) {
      console.log('Something wrong with the form!');
      alert('The form is not valid please check your data again');

      if(this.form.get('name').invalid){
        this.form.get('name').reset()
      }
      if(this.form.get('placeOfMeasurment').invalid){
        this.form.get('placeOfMeasurment').reset()
      }
      if(this.form.get('unit').invalid){
        this.form.get('unit').reset()
      }
      if(this.form.get('active').invalid){
        this.form.get('active').reset()
      }
      return;
    }

    console.log(this.form.value.placeOfMeasurment);
    this.sensorService.addNewSensor(
      this.form.value.name,
      this.form.value.placeOfMeasurment,
      this.form.value.unit,
      this.form.value.active
    );
      alert("New sensor registered!")
  }

}
