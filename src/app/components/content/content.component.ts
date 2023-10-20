import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'rm-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent {}
