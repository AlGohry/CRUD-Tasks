import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private service: LoginService,
    private toaster: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }
  loginForm!: FormGroup;
  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      role: ['admin'],
    });
  }
  login() {
    this.spinner.show();
    this.service.login(this.loginForm.value).subscribe(
      () => {
        this.toaster.success('Success', 'Login Success');
        this.spinner.show();
      },
      () => {
        this.toaster.error('Authentication field');
        this.router.navigate(['/tasks'])
        this.spinner.hide();
      }
    );
  }
}
