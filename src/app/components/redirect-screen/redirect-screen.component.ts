import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'rm-redirect-screen',
  templateUrl: './redirect-screen.component.html',
  styleUrls: ['./redirect-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RedirectScreenComponent implements OnInit {
  constructor(
    readonly activatedRoute: ActivatedRoute,
    readonly stateService: StateService
  ) {}

  ngOnInit(): void {
    this.stateService.initFromActivatedRoute(this.activatedRoute);
    window.location.href = this.stateService.returnUrl;
  }
}
