import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { NgcCookieConsentModule, NgcCookieConsentConfig } from 'ngx-cookieconsent';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { PostComponent } from './components/post/post.component';
import { SearchComponent } from './components/search/search.component';
import { reducers, AppState } from './store/app.states';
import { AuthEffects } from './store/auth/auth.effects';
import { AuthService } from './services/auth.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TokenInterceptor, ErrorInterceptor } from './services/token.interceptor';
import { AuthGuardService } from './services/auth-guard.service';
import { MuroComponent } from './components/muro/muro.component';
import { FollowComponent } from './components/follow/follow.component';
import { CookiesComponent } from './components/cookies/cookies.component';

/*const cookieConfig: NgcCookieConsentConfig =
{
  "cookie": {
    "domain": "random.random"
  },
  "position": "bottom",
  "theme": "classic",
  "palette": {
    "popup": {
      "background": "#000000",
      "text": "#ffffff"
    },
    "button": {
      "background": "#f1d600",
      "text": "#000000"
    }
  },
  "type": "info",
  "content": {
    "message": "This website uses cookies to ensure you get the best experience on our website.",
    "dismiss": "Got it!",
    "deny": "Refuse cookies",
    "link": "Learn more",
    "href": "#",
    "policy": "Cookie Policy"
  }
}*/

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    PostComponent,
    SearchComponent,
    HeaderComponent,
    FooterComponent,
    MuroComponent,
    FollowComponent,
    CookiesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    EffectsModule.forRoot([AuthEffects]),
    StoreModule.forRoot(reducers, {}
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
    AngularFontAwesomeModule,
    NgbModule,
    ReactiveFormsModule,

    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right'
    }),
    BrowserAnimationsModule
  ],
  providers: [AuthService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
