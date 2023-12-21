import {
    Directive,
    Input
} from '@angular/core';
import {
    NG_VALIDATORS,
    AbstractControl,
    ValidatorFn,
    Validator,
    FormControl
} from '@angular/forms';

@Directive({
    selector: '[appNumberNegative][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: NumberNegativeDirective, multi: true }
    ]
})

export class NumberNegativeDirective implements Validator {
    @Input() number_negative = -1;
    validator: ValidatorFn;
    str: any;
   
    constructor() {
        console.log(this.number_negative);
        this.validator = this.validateMinusKubunFactory();
    }

    validate(c: FormControl) {
        return this.validator(c);
    }

    validateMinusKubunFactory(): ValidatorFn | any{
        return (c: AbstractControl) => {
            if (!c.value) {
                return null;
            }
            // let str: number;
            if (typeof c.value === 'number') {
                this.str = c.value;
            }
            if (typeof c.valid === 'object') {
                this.str = c.value[0];
            }
            // if (!str) {
            //     return;
            // }
            if (this.number_negative === 1) {
                return null;
            }
            if (this.number_negative === 0) {
                if (this.str && this.str < 0) {
                    return {
                        number_negative: {
                            valid: false
                        }
                    };
                }
            }
            return null;
        };
    }
}
