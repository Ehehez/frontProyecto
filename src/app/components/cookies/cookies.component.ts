import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.states';
import { Subscription } from 'rxjs';
import { CookiesService } from 'src/app/services/cookies.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cookies',
  template: '<div class="Site"><div class="Site-content"[innerHTML]="myContent"></div></div>',
  styleUrls: ['./cookies.component.css']
})
export class CookiesComponent implements OnInit {

  subs = new Subscription();
  state;
  params;
  myContent: any = "Cargando"
  constructor(private store: Store<AppState>,
    private CookiesService: CookiesService,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(val => {
      this.params = this.activatedRoute.snapshot.params;
      this.subs.add(this.store.subscribe((x) => this.state = x));
      this.subs.add(this.CookiesService.getPage(this.params).subscribe((x: any) => {
        this.myContent = this.sanitizer.bypassSecurityTrustHtml(x.body);
      }));
    });
  }

  ngOnInit() {


  }

}
