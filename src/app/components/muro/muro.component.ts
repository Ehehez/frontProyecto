import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/store/app.states';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccesodbService } from 'src/app/services/accesodb.service';

@Component({
  selector: 'app-muro',
  templateUrl: './muro.component.html',
  styleUrls: ['./muro.component.css']
})
export class MuroComponent implements OnInit, OnDestroy {

  subs = new Subscription();
  state;
  posts;
  user;
  form;
  detalles;
  page;
  pageSize;
  params;
  newP = false;
  constructor(private store: Store<AppState>,
    private router: Router,
    private http: HttpClient,
    private modalService: NgbModal,
    private accesodbService: AccesodbService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.params = this.activatedRoute.snapshot.params;
    this.page = 1;
    this.pageSize = 4;
    this.subs.add(this.store.subscribe((x) => this.state = x));
    if (this.params.name == "self") {
      this.subs.add(this.http.get('http://localhost:3000/post/own').subscribe((x) => {
        this.posts = x;
      }));
      this.subs.add(this.http.get('http://localhost:3000/users/me').subscribe((x) => {
        this.user = x;
      }));

      this.newP = true;
    } else {
      this.subs.add(this.http.get('http://localhost:3000/post/own').subscribe((x) => {
        this.posts = x;
      }));
      this.subs.add(this.http.get('http://localhost:3000/users/me').subscribe((x) => {
        this.user = x;
      }));

      this.newP = false;
    }
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
    });
  }


  newPost(content) {
    this.modalService.open(content);
  }
  profile(content) {
    this.modalService.open(content);
  }

  async onSubmit() {
    let a;
    await this.accesodbService.postPost(this.form.value).subscribe((x) => {
      a = x;
      this.posts.push(a)
    });
    this.form.reset();

  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
