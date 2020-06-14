import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.states';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccesodbService } from 'src/app/services/accesodb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  state;
  subs = new Subscription();
  lista = [];
  listas = [];
  detalles;
  pocos;
  posts;
  listasPost = [];
  listaPost = [];
  page;
  pageSize;
  page2;
  pageSize2;
  page3;
  pageSize3;
  params;
  menuAux = false;

  constructor(private store: Store<AppState>,
    private router: Router,
    private http: HttpClient,
    private AuthService: AuthService,
    private modalService: NgbModal,
    private bd: AccesodbService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.page = 1;
    this.pageSize = 8;
    this.page2 = 1;
    this.pageSize2 = 5;
    this.page3 = 1;
    this.pageSize3 = 1;
    this.listaPost = [];
    this.subs.add(this.store.subscribe((x) => {
      this.state = x;
    }));
    this.subs.add(this.AuthService.getFollowers().subscribe((x: any) => {
      this.lista = x;
    }));
    this.subs.add(this.bd.getFollowedPosts().subscribe((x) => {
      this.posts = x;
      this.posts.forEach(y => {
        let a = this.lista.find((x) => x._id == y.creator_id && x.email != this.state.auth.user.email);
        if (a != undefined) {
          y.creator = a.email;
          this.listaPost.push(y);
        }
      });
    }));

    this.pocos = false;
  }

  open(content, id) {
    this.listasPost = [];
    this.detalles = this.lista.find(element => element._id == id);
    this.listasPost = this.posts.filter(element => element.creator_id == id);


    this.modalService.open(content, { size: 'lg' });

  }

  swap() {
    this.pocos = !this.pocos;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  openUsers(content) {
    this.modalService.open(content, { size: 'lg' });
  }
}
