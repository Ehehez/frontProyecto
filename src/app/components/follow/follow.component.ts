import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AccesodbService } from 'src/app/services/accesodb.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.states';
import { AuthActionTypes, Follows } from 'src/app/store/auth/auth.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tr [app-follow]',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit, OnDestroy {


  @Input('user') user: any;
  follow: Boolean;
  mainUser;
  state;
  subs = new Subscription();

  constructor(private db: AccesodbService,
    private store: Store<AppState>) {
  }

  ngOnInit() {
    this.subs.add(this.store.subscribe((x) => this.state = x));
    this.follow = this.comprobar(this.user._id)
  }


  followUser(id) {
    let pay = [];
    this.subs.add(this.db.setFollow(id).subscribe((x) => {
      this.follow = false;
      this.subs.add(this.db.getProfile().subscribe((x: any) => {
        pay = x.follows;
        let payload = {
          follows: pay,
        }
        this.store.dispatch(new Follows(payload));
      }));

    }));

  }

  async unfollowUser(id) {
    let pay = [];
    this.subs.add(this.db.unsetFollow(id).subscribe((x) => {
      this.follow = true;
      this.subs.add(this.db.getProfile().subscribe((x: any) => {
        pay = x.follows;
        let payload = {
          follows: pay,
        }
        this.store.dispatch(new Follows(payload));
      }));
    }));


  }

  comprobar(id) {
    let result = true;
    if (this.state.auth.user != undefined) {
      this.state.auth.user.follows.forEach(element => {

        if (element._id == id) {

          result = false;
          return 0;
        }
      });
      return result;
    }

  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
