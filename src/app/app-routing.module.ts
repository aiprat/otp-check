import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import { LoginScreenComponent } from './components/login-screen/login-screen.component';
//import { OperatorLoginScreenComponent } from './components/operator-login-screen/operator-login-screen.component';
//import { LogoutScreenComponent } from './components/logout-screen/logout-screen.component';
//import { RegisterScreenComponent } from './components/register-screen/register-screen.component';
import { VerifyCodeScreenComponent } from './components/verify-code-screen/verify-code-screen.component';
//import { VerifyEMailScreenComponent } from './components/verify-email-screen/verify-e-mail-screen.component';
//import { VerifyEMailLinkScreenComponent } from './components/verify-email-link-screen/verify-e-mail-link-screen.component';
//import { VerifyEMailConfirmationScreenComponent } from './components/verify-email-confirmation-screen/verify-email-confirmation-screen.component';
import { RedirectScreenComponent } from './components/redirect-screen/redirect-screen.component';
//import { ErrorScreenComponent } from './components/error-screen/error-screen.component';

const routes: Routes = [
  //  { path: 'login', component: LoginScreenComponent },
  //  { path: 'operator-login', component: OperatorLoginScreenComponent },
  //  { path: 'logout', component: LogoutScreenComponent },
  //  { path: 'register', component: RegisterScreenComponent },
  { path: 'verify-code', component: VerifyCodeScreenComponent },
  //  { path: 'verify-email', component: VerifyEMailScreenComponent },
  //  { path: 'verify-email-link', component: VerifyEMailLinkScreenComponent },
  //  {
  //    path: 'verify-email-confirmation',
  //    component: VerifyEMailConfirmationScreenComponent,
  //  },
  { path: 'redirect', component: RedirectScreenComponent },
  //  { path: 'error', component: ErrorScreenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
