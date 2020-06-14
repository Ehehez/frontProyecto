import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.states';
import { Subscription } from 'rxjs';
import { AccesodbService } from 'src/app/services/accesodb.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {


  @Input('post') post: any;
  state;
  subs = new Subscription();
  user;
  postCreator;
  rat;
  read = true;
  form;
  media;
  page;
  pageSize;

  constructor(private store: Store<AppState>,
    private db: AccesodbService,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.page = 1;
    this.pageSize = 5;
    this.subs.add(this.db.getOnePost(this.post._id).subscribe((x: any) => {
      this.post = x;
      this.media = this.mean(x.rating);
      if (isNaN(this.media)) {
        this.media = 0;
      }

    }))

    this.subs.add(this.db.getProfile().subscribe((x) => this.user = x))
    this.subs.add(this.store.subscribe((x) => this.state = x));
    this.subs.add(this.db.getUsers().subscribe((x: any) => {
      x.forEach(element => {
        if (element._id == this.post.creator_id) {
          this.postCreator = element.email;
          return 0;
        }
      });

    }));
    this.subs.add(this.db.getRatings().subscribe((x: any) => {
      x.forEach(element => {
        if (this.user) {
          if (element.post_id == this.post._id && element.user_id == this.user._id) {
            this.rat = element.rating;

            return 0;
          }
        }
      });
      this.read = false;
    }))


  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  async sendRating(event) {
    const payload = {
      post: this.post._id,
      rating: event
    }
    let a = await this.subs.add(this.db.setRatings(payload).subscribe((x: any) => {
      this.post = x;
      this.media = this.mean(x.rating);
    }));


  }



  openDetails(content) {
    let value = this.post.rating;
    this.modalService.open(content, { size: 'xl' });

  }

  openComment(content) {

    this.form = new FormGroup({
      comment: new FormControl('', Validators.required),
    });
    this.modalService.open(content);
  }

  onSubmit() {
    let comentario = {
      user_email: this.user.email,
      comment: this.form.value.comment
    }
    this.db.setComment({ comment: this.form.value.comment, post: this.post._id }).subscribe((x) => {
      this.post.comments.push(comentario);
      this.form.reset();
      this.toastr.success("Comentario añadido")
    });

  }


  mean(array) {
    let sum = 0;
    array.forEach((x) => {
      sum += parseInt(x.rating);
    })
    return sum / array.length;
  }

  checkComments() {
    if (this.post.comments.length > 0) {
      return true;
    } else return false;
  }
}
