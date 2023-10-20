import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  HttpClientXsrfModule,
} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { de_DE } from './i18n/de-DE.json';

import {
  MdcButtonModule,
  MdcCheckboxModule,
  MdcElevationModule,
  MdcIconModule,
  MdcListModule,
  MdcMenuModule,
  MdcSelectModule,
  MdcTextFieldModule,
  MdcTopAppBarModule,
  MdcTypographyModule,
} from '@angular-mdc/web';

import { ContentComponent } from './components/content/content.component';
// import { LoginScreenComponent } from './components/login-screen/login-screen.component';
// import { OperatorLoginScreenComponent } from './components/operator-login-screen/operator-login-screen.component';
// import { LogoutScreenComponent } from './components/logout-screen/logout-screen.component';
// import { RegisterScreenComponent } from './components/register-screen/register-screen.component';
import { VerifyCodeScreenComponent } from './components/verify-code-screen/verify-code-screen.component';
import { ReturnUrlInterceptor } from './services/state.service';
import { RedirectScreenComponent } from './components/redirect-screen/redirect-screen.component';
// import { VerifyEMailScreenComponent } from './components/verify-email-screen/verify-e-mail-screen.component';
// import { VerifyEMailLinkScreenComponent } from './components/verify-email-link-screen/verify-e-mail-link-screen.component';
// import { VerifyEMailConfirmationScreenComponent } from './components/verify-email-confirmation-screen/verify-email-confirmation-screen.component';
// import { ErrorScreenComponent } from './components/error-screen/error-screen.component';

import { DuplicateValidatorDirective } from './directives/duplicate-validator.directive';
import { KeyboardOpenDirective } from './directives/keyboard-open.directive';
import { TrimDirective } from './directives/trim.directive';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    // LoginScreenComponent,
    // OperatorLoginScreenComponent,
    // LogoutScreenComponent,
    // RegisterScreenComponent,
    VerifyCodeScreenComponent,
    RedirectScreenComponent,
    // VerifyEMailScreenComponent,
    // VerifyEMailLinkScreenComponent,
    // VerifyEMailConfirmationScreenComponent,
    // ErrorScreenComponent,

    DuplicateValidatorDirective,
    KeyboardOpenDirective,
    TrimDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientXsrfModule,

    AppRoutingModule,

    TranslateModule.forRoot({ defaultLanguage: 'de-DE', useDefaultLang: true }),

    MdcTopAppBarModule,
    MdcIconModule,
    MdcSelectModule,
    MdcMenuModule,
    MdcListModule,
    MdcTextFieldModule,
    MdcButtonModule,
    MdcCheckboxModule,
    MdcElevationModule,
    MdcTypographyModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, multi: true, useClass: ReturnUrlInterceptor },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(translateService: TranslateService) {
    translateService.setTranslation('de-DE', de_DE);
    translateService.use(translateService.getBrowserCultureLang());
  }
}
