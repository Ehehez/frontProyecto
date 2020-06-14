import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.states';
import { Cookies } from './store/auth/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'Red Social del palo';
  constructor(
    private store: Store<AppState>,
    private router: Router) {
    this.router.events.subscribe((x) => {
      if (location.href.includes('login') || location.href.includes('signup')) {
        this.hidden = true;
      } else {
        this.hidden = false;
      }
    }
    )
  }

  hidden = true;

  ngOnInit() {
  }


}
