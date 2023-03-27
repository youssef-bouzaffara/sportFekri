import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  userUrl: string = "http://localhost:3000/allUsers";

  public token: string;
  private authStatusListener = new Subject<boolean>();
  private isUserAuthenticated = false;
  private name: string;

  constructor(
    private httpClient: HttpClient,
    private router: Router) { }

  getToken() {
    return this.token;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  isUserAuth() {
    return this.isUserAuthenticated;
  }
  getName() {
    return this.name;
  }


  // Login method
  login(obj) {
    this.httpClient.post<{ user: any, message: string }>(this.userUrl + "/signin", obj).subscribe(
      (res) => {

        if (res.user) {
          const token = res.user.jwt;
          this.token = token;
          this.isUserAuthenticated = true;
          this.name = res.user.firstName;
          this.authStatusListener.next(true);
          localStorage.setItem('token', token);
          localStorage.setItem('name', this.name);
          (res.user.role == "admin") ?
            this.router.navigate(['admin']) :
            this.router.navigate(['']);
        }
        else {

          alert("Can't Login !")

        }
      }
    )

  }

  signup(user, img: File) {

    let formData = new FormData;

    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("email", user.email);
    formData.append("pwd", user.pwd);
    formData.append("img", img);

    return this.httpClient.post<{ message: string }>(this.userUrl + "/subscription", formData);

  }

  getProfileById(id) {
    return this.httpClient.get<{ user: any, isFinded: boolean }>(`${this.userUrl}/updateProfile/${id}`);
  }

  editProfile(newProfile) {
    return this.httpClient.put<{ msg: string, typeResp: string }>(this.userUrl, newProfile);
  }

  // Logout method
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    this.isUserAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
  }


}
