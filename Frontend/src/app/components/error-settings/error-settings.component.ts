import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-error-settings',
  templateUrl: './error-settings.component.html',
  styleUrls: ['./error-settings.component.css']
})
export class ErrorSettingsComponent implements OnInit {

  constructor(private errorService : ErrorService) { }

  min: number;
  max: number;
  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, {}),
      min: new FormControl(null, {
      }),
      max: new FormControl(null, {
      })
    });
  }

  saveBoundaries() {
    this.errorService.setLowerBoundary(this.form.value.min);
    this.errorService.setUpperBoundary(this.form.value.max);
  }

}
