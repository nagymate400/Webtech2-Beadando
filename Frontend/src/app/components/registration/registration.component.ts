import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  ngOnInit(): void {
  }

  constructor(public authService: AuthService) {}

  onRegister(form: NgForm) {
    if(form.invalid){
      return
    }
    this.authService.createUser(form.value.email, form.value.username,  form.value.password);
  }

}
