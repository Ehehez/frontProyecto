import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/store/app.states';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AccesodbService } from 'src/app/services/accesodb.service';
import { LogOut } from 'src/app/store/auth/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {


  state;
  headForm;
  options;
  subs = new Subscription();
  menuAux = false;

  constructor(private store: Store<AppState>,
    private router: Router,
    private db: AccesodbService) {
  }

  ngOnInit() {
    this.options = [
      {
        name: "Username",
        value: "username"
      },
      {
        name: "Email",
        value: "email"
      },
      {
        name: "Apellidos",
        value: "surname"
      }];
    this.subs.add(this.store.subscribe((x) => this.state = x));
    this.headForm = new FormGroup({
      select: new FormControl('name', Validators.required),
      search: new FormControl("", Validators.required),
    });
  }

  gotoMuro() {
    this.router.navigateByUrl('/muro/self');
  }
  gotoHome() {
    this.router.navigateByUrl('/');
  }
  search() {
    this.router.navigateByUrl('/users/' + this.headForm.value.select + '/' + this.headForm.value.search);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  logOut() {
    this.db.logout();
    this.store.dispatch(new LogOut());
    this.router.navigateByUrl('/login')
  }

  openMenu() {
    this.menuAux = !this.menuAux;
  }
}
