import {
  Directive,
  forwardRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[rmDuplicateValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DuplicateValidatorDirective),
      multi: true,
    },
  ],
})
export class DuplicateValidatorDirective implements Validator, OnChanges {
  @Input('rmDuplicateValidator') duplicate = false;

  private onChange = () => {};

  ngOnChanges(changes: SimpleChanges): void {
    this.onChange();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.duplicate ? { duplicate: true } : {};
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onChange = fn;
  }
}
