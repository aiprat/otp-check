import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { StateService } from './state.service';

interface RouteToScreenResult {
  screen:
    | 'register'
    | 'verify-code'
    | 'verify-email'
    | 'verify-email-link'
    | 'verify-email-confirmation'
    | 'redirect';
  queryParams: { [key: string]: string };
}

interface DuplicateAccount {
  isDuplicate: false;
}

function isDuplicateAccount(
  response: RouteToScreenResult | DuplicateAccount
): response is DuplicateAccount {
  return 'isDuplicate' in response;
}

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(
    readonly httpClient: HttpClient,
    readonly router: Router,
    readonly stateService: StateService
  ) {}

  // tslint:disable-next-line:variable-name
  async requestVerificationCode(): Promise<void> {
    const body = {
      country: this.stateService.country,
      number: this.stateService.number,
    };
    const { screen, queryParams } = await this.httpClient
      .post<RouteToScreenResult>(`${environment.apiBaseUrl}requestpin`, body)
      .toPromise();
    await this.router.navigate([screen], { queryParams });
  }

  async checkVerificationCode(code: string): Promise<void> {
    const body = {
      country: this.stateService.country,
      number: this.stateService.number,
      code,
    };
    const { screen } = await this.httpClient
      .post<RouteToScreenResult>(`${environment.apiBaseUrl}verifypin`, body)
      .toPromise();
    await this.router.navigate([screen]);
  }

  async loginOperator(password: string): Promise<void> {
    const body = { userName: this.stateService.userName, password };
    const { screen } = await this.httpClient
      .post<RouteToScreenResult>(`${environment.apiBaseUrl}loginoperator`, body)
      .toPromise();
    await this.router.navigate([screen]);
  }

  async registerForVerificationCode(
    newsletter: boolean
  ): Promise<DuplicateAccount | undefined> {
    const body = {
      country: this.stateService.country,
      number: this.stateService.number,
      email: this.stateService.email,
      tos: true,
      newsletter,
    };
    const result = await this.httpClient
      .post<RouteToScreenResult | DuplicateAccount>(
        `${environment.apiBaseUrl}register`,
        body
      )
      .toPromise()
      .catch((e) => {
        return e.error;
      });

    if (isDuplicateAccount(result)) {
      return result;
    }

    const { screen, queryParams } = result as RouteToScreenResult;
    await this.router.navigate([screen], { queryParams });
  }

  async cancelLogin(): Promise<void> {
    const { screen } = await this.httpClient
      .post<RouteToScreenResult>(`${environment.apiBaseUrl}cancellogin`, null)
      .toPromise();
    await this.router.navigate([screen]);
  }
}
