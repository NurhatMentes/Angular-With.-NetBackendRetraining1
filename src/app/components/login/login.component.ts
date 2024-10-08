import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { data } from 'jquery';
import { AuthService } from '../../services/auth.service';
import { response } from 'express';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup; 
  
  constructor(private formBuilder: FormBuilder, private authService:AuthService, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createLoginForm(); 
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required], 
      password: ["", Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      let loginModel=Object.assign({},this.loginForm.value)
      this.authService.login(loginModel).subscribe(response=>{
        localStorage.setItem("token",response.data.token)
        this.toastrService.success("Giriş Başarılı")
      },responseError=>{
        this.toastrService.error(responseError.error)
      })
    }
  }
}
