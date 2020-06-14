import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { User } from '../models/user';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.states';
import { LogIn, LogInSuccess, LogInFailure } from '../store/auth/auth.actions';


@Injectable()
export class AuthService {
  private BASE_URL = 'http://localhost:3000';
  private state;
  private subs = new Subscription();
  private headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });


  constructor(private http: HttpClient,
    private store: Store<AppState>) {
    this.subs.add(store.subscribe(o => this.state = o.auth));

  }

  getToken(): string {
    if (this.state.user != null) {
      return this.state.user.token;
    }
    if (localStorage.getItem('token')) {

      return localStorage.getItem('token');
    }

    return null;
  }

  logIn(email: string, password: string) {
    let c;
    this.http.post('http://localhost:3000/users/login', { 'email': email, 'password': password }).subscribe((x) => {
      c = x;
      if (c != {}) {
        c.user.pw = "";
        c.user.token = c.token;

        this.store.dispatch(new LogInSuccess(c.user));
      } else {
        let payload;
        this.store.dispatch(new LogInFailure(payload));
      }
    });
  }

  signUp(payload): Observable<User> {
    /*const body = {
      name: name,
      username: username,
      email: email,
      password: password
    }*/


    const url = `http://localhost:3000/users`;
    return this.http.post(url, payload);
  }

  getFollowers() {
    return this.http.get('http://localhost:3000/users/followed');
  }
}