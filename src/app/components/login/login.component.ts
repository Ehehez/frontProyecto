import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.states';
import { User } from 'src/app/models/user';
import { LogIn } from 'src/app/store/auth/auth.actions';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {


  subs = new Subscription();
  state;
  user: User = new User();

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.subs.add(this.store.subscribe((o) => {
      this.state = o;
    }));
  }

  onSubmit() {
    const payload = {
      email: this.user.email,
      password: this.user.password,
      follows: this.user.follows,
    }
    let c;
    this.authService.logIn(payload.email, payload.password);

    setTimeout((x) => {
      c = this.state.auth.isAuthenticated;
      if (c) {
        this.router.navigateByUrl('/')
      } else {
        this.toastr.error('Usuario o contraseña incorrectos');
      }
    }, 1000)
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
