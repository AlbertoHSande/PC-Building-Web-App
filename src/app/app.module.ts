import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { BuilderComponent } from './builder/builder.component';
import { BuildsComponent } from './builds/builds.component';
import { SbuildsComponent } from './sbuilds/sbuilds.component';
import { NewsComponent } from './news/news.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { HighlightComponent } from './highlight/highlight.component';
import { CommonModule } from '@angular/common';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import {NgcCookieConsentModule, NgcCookieConsentConfig} from 'ngx-cookieconsent';

const cookieConfig:NgcCookieConsentConfig = {
  cookie: {
    domain: 'https://hdsettings.com'
  },
  palette: {
    popup: {
      background: '#161925'
    },
    button: {
      background: '#ec2828'
    }
  },
  position: "bottom",
  theme: 'classic',
  content: {
    message: "This web may use cookies for tracking visits and improving the site.",
    dismiss: "I understand",
    link: "Learn more",
    href: "https://cookiesandyou.com",
    policy: "Cookies policy"
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BuilderComponent,
    BuildsComponent,
    SbuildsComponent,
    NewsComponent,
    FooterComponent,
    HighlightComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    Ng2SearchPipeModule,
    FormsModule,
    NgxPaginationModule,
    CommonModule,
    TransferHttpCacheModule,
    NgtUniversalModule,
    NgcCookieConsentModule.forRoot(cookieConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
