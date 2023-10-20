import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class ReturnUrlInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req.clone({ setHeaders: { 'X-Return-Url': '' } }));
  }
}

@Injectable({
  providedIn: 'root',
})
export class StateService {
  country = '+49';
  number = '';
  userName = '';
  returnUrl = '';
  email = '';

  initFromActivatedRoute(activatedRoute: ActivatedRoute): void {
    // tslint:disable-next-line:variable-name
    const {
      country = this.country,
      number = this.number,
      userName = this.userName,
      returnUrl = this.returnUrl,
      email = this.email,
    } = activatedRoute.snapshot.queryParams;
    this.country = country;
    this.number = number;
    this.userName = userName;
    this.returnUrl = returnUrl;
    this.email = email;
  }
}
