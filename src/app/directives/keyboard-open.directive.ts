import { Directive, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Directive({
  selector: 'form',
  exportAs: 'keyboardOpen',
})
export class KeyboardOpenDirective {
  private readonly _keyboardOpen = new BehaviorSubject(false);

  keyboardOpen$ = this._keyboardOpen.asObservable();

  @HostListener('focusin')
  onFocus() {
    this._keyboardOpen.next(true);
  }

  @HostListener('focusout')
  onBlur() {
    this._keyboardOpen.next(false);
  }
}
