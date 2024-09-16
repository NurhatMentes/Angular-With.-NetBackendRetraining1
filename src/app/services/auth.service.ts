import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { TokenModel } from '../models/tokenModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl="https://localhost:7228/api/auth/";

  constructor(private httpClient:HttpClient, private router: Router) { }

  login(loginModel:LoginModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"login",loginModel)
    .pipe(
      tap(response=>{
        this.router.navigate(['/']);
      })
    );
    
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true
    }else{
      return false
    }
  }

}
