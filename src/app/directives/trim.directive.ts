import { Directive, OnDestroy } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Directive({
  selector: 'mdc-text-field[rmTrim]',
})
export class TrimDirective implements OnDestroy {
  private readonly subscription: Subscription;

  constructor(ngModel: NgModel) {
    this.subscription = ngModel.valueChanges
      .pipe(
        filter((value) => typeof value === 'string'),
        map((value) => value.trim())
      )
      .subscribe((value) =>
        ngModel.control.setValue(value, { emitEvent: false })
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
