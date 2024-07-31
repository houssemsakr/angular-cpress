import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  @ViewChild('myForm') myForm!: NgForm;

  public isSubmitted = false;

  constructor(private router: Router) { }

  ngOnInit(): void { }

  public onSubmit(form: NgForm) {
    this.isSubmitted = !this.isSubmitted;
    // Used setTimeout for some purpose of cypress testing.
    setTimeout(() => {
      if (form.valid) {
        this.router.navigate(['/dashboard']);
       
      }
    }, 2000); // 5 seconds delay for testing purpose
  }
}
