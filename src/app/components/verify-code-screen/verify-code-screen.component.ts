import {
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { Subject, timer } from 'rxjs';
import { StateService } from '../../services/state.service';
import { NgForm } from '@angular/forms';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'rm-verify-code-screen',
  templateUrl: './verify-code-screen.component.html',
  styleUrls: ['./verify-code-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyCodeScreenComponent implements OnInit {
  constructor(
    readonly activatedRoute: ActivatedRoute,
    readonly backendService: BackendService,
    readonly stateService: StateService,
    readonly changeDetectorRef: ChangeDetectorRef,
    readonly router: Router
  ) {}

  @ViewChild(NgForm) readonly form: NgForm;

  back = this.activatedRoute.snapshot.queryParams.back || 'login';
  code = '';
  clicked = false;
  requestPin: boolean =
    this.activatedRoute.snapshot.queryParams['resend'] || false;
  // Prevent Chrome autocompletion by assigning a random input[name]
  codeInputName = `rm-otp-${Math.floor(Math.random() * 1000000)}`;

  resendFailed: boolean = false;
  resendDisabled: boolean = false;
  resendDisabledTill: Date;
  resendTimer: number = 0;

  readonly invalidCode$ = new Subject<boolean>();

  ngOnInit(): void {
    this.stateService.initFromActivatedRoute(this.activatedRoute);
    // route to login if the page was refreshed and state was lost
    if (this.requestPin) {
      this.backendService.requestVerificationCode();
    }
  }

  async submit() {
    this.clicked = true;
    if (this.form.invalid) {
      return;
    }

    try {
      this.form.control.disable();
      await this.backendService.checkVerificationCode(this.code);
    } catch {
      this.invalidCode$.next(true);
    } finally {
      this.form.control.enable();
    }
  }

  async resend() {
    try {
      this.form.control.disable();
      this.renderResend(false, false);
      await this.backendService.requestVerificationCode();
      this.resendTimer = 10;
      console.log('Resend ok.');
    } catch (error) {
      this.renderResend(false, true);
      this.resendTimer = error.error.blockedSeconds ?? 30;
      console.log('Resend failed. Retry in ' + this.resendTimer + ' secs.');
    } finally {
      // disable resend for 10s on success or till blocked duration
      this.disableResendButtonTimer();
      this.form.control.enable();
    }
  }

  renderResend(enableButton: boolean, enableMessage: boolean) {
    this.resendDisabled = !enableButton;
    this.resendFailed = enableMessage;
  }

  disableResendButtonTimer() {
    timer(0, 1000)
      .pipe(takeWhile(() => this.resendTimer >= 0))
      .subscribe((value) => {
        if (this.resendTimer <= 0) {
          this.renderResend(true, false);
        }
        this.resendTimer--;
        this.changeDetectorRef.detectChanges();
      });
  }

  getResendCountdown(): string {
    return this.resendTimer <= 0 ? '' : ` (${this.resendTimer})`;
  }

  async skip() {
    await this.backendService.cancelLogin();
  }
}
