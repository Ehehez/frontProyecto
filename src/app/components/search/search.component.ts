import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.states';
import { AccesodbService } from 'src/app/services/accesodb.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  user;
  users;
  state;
  subs = new Subscription();
  params;
  page: Number;
  pageSize: Number;
  collectionSize: Number;

  constructor(private store: Store<AppState>,
    private db: AccesodbService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.page = 1;
    this.pageSize = 10;
    this.subs.add(this.store.subscribe((x) => this.state = x));
    this.params = this.activatedRoute.snapshot.params;
    this.subs.add(this.db.getUsersByFilter(this.params.field, this.params.value).subscribe(x => {
      this.users = x;
      this.users = this.users.filter(x => x.email != this.state.auth.user.email);
      this.collectionSize = this.users.length;
    }));
    this.subs.add(this.subs.add(this.db.getProfile().subscribe(x => {
      this.user = x;
    })));


  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
