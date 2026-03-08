import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient); 
  private readonly router = inject(Router)

  private userData = new BehaviorSubject<any>(null);
  userData$ = this.userData.asObservable();
  
  headerToken: any;

  constructor() {
    const savedUser = localStorage.getItem('userData'); 
    if (savedUser) {
      this.userData.next(JSON.parse(savedUser));
    }
  }

  signUp(data:any):Observable<any> {
    return this.httpClient.post(environment.baseUrl + `/users/signup`, data);
  }

  signIn(data:any):Observable<any> {
    return this.httpClient.post(environment.baseUrl + `/users/signin`, data);
  }

  getMyProfile(): Observable<any> {
  return this.httpClient
    .get(environment.baseUrl + `/users/profile-data`)
    .pipe(
      tap((res: any) => {
        const user = res.data.user;
        this.setUserData(user); 
      })
    );
  }
  
  changePassword(data:any): Observable<any> {
    return this.httpClient.patch(environment.baseUrl + `/users/change-password`, data);
  }
  
  setUserData(user: any) {
    this.userData.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }
  logOut() {
    this.router.navigate(["signin"]);
    localStorage.removeItem("token");
    localStorage.removeItem("userData"); 
    this.userData.next(null);
  }


getUserId(): string | null {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decoded: any = jwtDecode(token);
      return decoded.user; 
    } catch (e) {
      return null;
    }
  }
  return null;
  }

  updateUserPhoto(newPhoto: string) {
  const currentUser = this.userData.value;

  if (currentUser) {
    const updatedUser = {
      ...currentUser,
      photo: newPhoto
    };

    this.setUserData(updatedUser);
  }
}

}
