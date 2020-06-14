import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  constructor(private http: HttpClient) { }

  postPage() {

  }

  getPage(params) {
    return this.http.get('https://proy-daw-amm.herokuapp.com:3000/page/' + params.page);
  }

}
