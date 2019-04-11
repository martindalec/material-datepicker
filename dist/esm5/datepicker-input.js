/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { DOWN_ARROW } from '@angular/cdk/keycodes';
import { Directive, ElementRef, EventEmitter, forwardRef, Inject, Input, Optional, Output } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MAT_INPUT_VALUE_ACCESSOR } from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field';
import { Subscription } from 'rxjs';
import { DateAdapter } from './core/index';
import { MAT_DATE_FORMATS } from './core/index';
import { MatDatepicker } from './datepicker';
import { createMissingDateImplError } from './datepicker-errors';
/** @type {?} */
export var MAT_DATEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return MatDatepickerInput; })),
    multi: true
};
/** @type {?} */
export var MAT_DATEPICKER_VALIDATORS = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return MatDatepickerInput; })),
    multi: true
};
/**
 * An event used for datepicker input and change events. We don't always have access to a native
 * input or change event because the event may have been triggered by the user clicking on the
 * calendar popup. For consistency, we always use MatDatepickerInputEvent instead.
 * @template D
 */
var /**
 * An event used for datepicker input and change events. We don't always have access to a native
 * input or change event because the event may have been triggered by the user clicking on the
 * calendar popup. For consistency, we always use MatDatepickerInputEvent instead.
 * @template D
 */
MatDatepickerInputEvent = /** @class */ (function () {
    function MatDatepickerInputEvent(target, targetElement) {
        this.target = target;
        this.targetElement = targetElement;
        this.value = this.target.value;
    }
    return MatDatepickerInputEvent;
}());
/**
 * An event used for datepicker input and change events. We don't always have access to a native
 * input or change event because the event may have been triggered by the user clicking on the
 * calendar popup. For consistency, we always use MatDatepickerInputEvent instead.
 * @template D
 */
export { MatDatepickerInputEvent };
if (false) {
    /**
     * The new value for the target datepicker input.
     * @type {?}
     */
    MatDatepickerInputEvent.prototype.value;
    /**
     * Reference to the datepicker input component that emitted the event.
     * @type {?}
     */
    MatDatepickerInputEvent.prototype.target;
    /**
     * Reference to the native input element associated with the datepicker input.
     * @type {?}
     */
    MatDatepickerInputEvent.prototype.targetElement;
}
/**
 * Directive used to connect an input to a MatDatepicker.
 * @template D
 */
var MatDatepickerInput = /** @class */ (function () {
    function MatDatepickerInput(_elementRef, _dateAdapter, _dateFormats, _formField) {
        var _this = this;
        this._elementRef = _elementRef;
        this._dateAdapter = _dateAdapter;
        this._dateFormats = _dateFormats;
        this._formField = _formField;
        /**
         * Emits when a `change` event is fired on this `<input>`.
         */
        this.dateChange = new EventEmitter();
        /**
         * Emits when an `input` event is fired on this `<input>`.
         */
        this.dateInput = new EventEmitter();
        /**
         * Emits when the value changes (either due to user input or programmatic change).
         */
        this._valueChange = new EventEmitter();
        /**
         * Emits when the disabled state has changed
         */
        this._disabledChange = new EventEmitter();
        this._onTouched = (/**
         * @return {?}
         */
        function () { });
        this._cvaOnChange = (/**
         * @return {?}
         */
        function () { });
        this._validatorOnChange = (/**
         * @return {?}
         */
        function () { });
        this._datepickerSubscription = Subscription.EMPTY;
        this._localeSubscription = Subscription.EMPTY;
        /**
         * The form control validator for whether the input parses.
         */
        this._parseValidator = (/**
         * @return {?}
         */
        function () {
            return _this._lastValueValid
                ? null
                : { matDatepickerParse: { text: _this._elementRef.nativeElement.value } };
        });
        /**
         * The form control validator for the min date.
         */
        this._minValidator = (/**
         * @param {?} control
         * @return {?}
         */
        function (control) {
            /** @type {?} */
            var controlValue = _this._getValidDateOrNull(_this._dateAdapter.deserialize(control.value));
            return !_this.min || !controlValue || _this._dateAdapter.compareDate(_this.min, controlValue) <= 0
                ? null
                : { matDatepickerMin: { min: _this.min, actual: controlValue } };
        });
        /**
         * The form control validator for the max date.
         */
        this._maxValidator = (/**
         * @param {?} control
         * @return {?}
         */
        function (control) {
            /** @type {?} */
            var controlValue = _this._getValidDateOrNull(_this._dateAdapter.deserialize(control.value));
            return !_this.max || !controlValue || _this._dateAdapter.compareDate(_this.max, controlValue) >= 0
                ? null
                : { matDatepickerMax: { max: _this.max, actual: controlValue } };
        });
        /**
         * The form control validator for the date filter.
         */
        this._filterValidator = (/**
         * @param {?} control
         * @return {?}
         */
        function (control) {
            /** @type {?} */
            var controlValue = _this._getValidDateOrNull(_this._dateAdapter.deserialize(control.value));
            return !_this._dateFilter || !controlValue || _this._dateFilter(controlValue)
                ? null
                : { matDatepickerFilter: true };
        });
        /**
         * The combined form control validator for this input.
         */
        this._validator = Validators.compose([
            this._parseValidator,
            this._minValidator,
            this._maxValidator,
            this._filterValidator
        ]);
        /**
         * Whether the last value set on the input was valid.
         */
        this._lastValueValid = false;
        if (!this._dateAdapter) {
            throw createMissingDateImplError('DateAdapter');
        }
        if (!this._dateFormats) {
            throw createMissingDateImplError('MAT_DATE_FORMATS');
        }
    }
    Object.defineProperty(MatDatepickerInput.prototype, "matDatepicker", {
        /** The datepicker that this input is associated with. */
        set: /**
         * The datepicker that this input is associated with.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.registerDatepicker(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    MatDatepickerInput.prototype.registerDatepicker = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value) {
            this._datepicker = value;
            this._datepicker._registerInput(this);
        }
    };
    Object.defineProperty(MatDatepickerInput.prototype, "matDatepickerFilter", {
        /** Function that can be used to filter out dates within the datepicker. */
        set: /**
         * Function that can be used to filter out dates within the datepicker.
         * @param {?} filter
         * @return {?}
         */
        function (filter) {
            this._dateFilter = filter;
            this._validatorOnChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatepickerInput.prototype, "value", {
        /** The value of the input. */
        get: /**
         * The value of the input.
         * @return {?}
         */
        function () {
            return this._value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = this._dateAdapter.deserialize(value);
            this._lastValueValid = !value || this._dateAdapter.isValid(value);
            value = this._getValidDateOrNull(value);
            /** @type {?} */
            var oldDate = this.value;
            this._value = value;
            this._formatValue(value);
            if (!this._dateAdapter.sameDate(oldDate, value)) {
                this._valueChange.emit(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatepickerInput.prototype, "min", {
        /** The minimum valid date. */
        get: /**
         * The minimum valid date.
         * @return {?}
         */
        function () {
            return this._min;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._min = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
            this._validatorOnChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatepickerInput.prototype, "max", {
        /** The maximum valid date. */
        get: /**
         * The maximum valid date.
         * @return {?}
         */
        function () {
            return this._max;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._max = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
            this._validatorOnChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatepickerInput.prototype, "disabled", {
        /** Whether the datepicker-input is disabled. */
        get: /**
         * Whether the datepicker-input is disabled.
         * @return {?}
         */
        function () {
            return !!this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var newValue = coerceBooleanProperty(value);
            /** @type {?} */
            var element = this._elementRef.nativeElement;
            if (this._disabled !== newValue) {
                this._disabled = newValue;
                this._disabledChange.emit(newValue);
            }
            // We need to null check the `blur` method, because it's undefined during SSR.
            if (newValue && element.blur) {
                // Normally, native input elements automatically blur if they turn disabled. This behavior
                // is problematic, because it would mean that it triggers another change detection cycle,
                // which then causes a changed after checked error if the input element was focused before.
                element.blur();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatDatepickerInput.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // Update the displayed date when the locale changes.
        this._localeSubscription = this._dateAdapter.localeChanges.subscribe((/**
         * @return {?}
         */
        function () {
            _this.value = _this.value;
        }));
        if (this._datepicker) {
            this._datepickerSubscription = this._datepicker._selectedChanged.subscribe((/**
             * @param {?} selected
             * @return {?}
             */
            function (selected) {
                _this.value = selected;
                _this._cvaOnChange(selected);
                _this._onTouched();
                _this.dateInput.emit(new MatDatepickerInputEvent(_this, _this._elementRef.nativeElement));
                _this.dateChange.emit(new MatDatepickerInputEvent(_this, _this._elementRef.nativeElement));
            }));
        }
    };
    /**
     * @return {?}
     */
    MatDatepickerInput.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._datepickerSubscription.unsubscribe();
        this._localeSubscription.unsubscribe();
        this._valueChange.complete();
        this._disabledChange.complete();
    };
    /**
     * @param {?=} value
     * @return {?}
     */
    MatDatepickerInput.prototype.reset = /**
     * @param {?=} value
     * @return {?}
     */
    function (value) {
        this.value = value !== undefined ? value : this._firstValue;
        this._cvaOnChange(this._value);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    MatDatepickerInput.prototype.registerOnValidatorChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._validatorOnChange = fn;
    };
    /**
     * @param {?} c
     * @return {?}
     */
    MatDatepickerInput.prototype.validate = /**
     * @param {?} c
     * @return {?}
     */
    function (c) {
        return this._validator ? this._validator(c) : null;
    };
    /**
     * @deprecated
     * @deletion-target 7.0.0 Use `getConnectedOverlayOrigin` instead
     */
    /**
     * @deprecated
     * \@deletion-target 7.0.0 Use `getConnectedOverlayOrigin` instead
     * @return {?}
     */
    MatDatepickerInput.prototype.getPopupConnectionElementRef = /**
     * @deprecated
     * \@deletion-target 7.0.0 Use `getConnectedOverlayOrigin` instead
     * @return {?}
     */
    function () {
        return this.getConnectedOverlayOrigin();
    };
    /**
     * Gets the element that the datepicker popup should be connected to.
     * @return The element to connect the popup to.
     */
    /**
     * Gets the element that the datepicker popup should be connected to.
     * @return {?} The element to connect the popup to.
     */
    MatDatepickerInput.prototype.getConnectedOverlayOrigin = /**
     * Gets the element that the datepicker popup should be connected to.
     * @return {?} The element to connect the popup to.
     */
    function () {
        return this._formField ? this._formField.getConnectedOverlayOrigin() : this._elementRef;
    };
    // Implemented as part of ControlValueAccessor
    // Implemented as part of ControlValueAccessor
    /**
     * @param {?} value
     * @return {?}
     */
    MatDatepickerInput.prototype.writeValue = 
    // Implemented as part of ControlValueAccessor
    /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this._firstValue === undefined) {
            this._firstValue = value;
        }
        this.value = value;
    };
    // Implemented as part of ControlValueAccessor
    // Implemented as part of ControlValueAccessor
    /**
     * @param {?} fn
     * @return {?}
     */
    MatDatepickerInput.prototype.registerOnChange = 
    // Implemented as part of ControlValueAccessor
    /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._cvaOnChange = fn;
    };
    // Implemented as part of ControlValueAccessor
    // Implemented as part of ControlValueAccessor
    /**
     * @param {?} fn
     * @return {?}
     */
    MatDatepickerInput.prototype.registerOnTouched = 
    // Implemented as part of ControlValueAccessor
    /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._onTouched = fn;
    };
    // Implemented as part of ControlValueAccessor
    // Implemented as part of ControlValueAccessor
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    MatDatepickerInput.prototype.setDisabledState = 
    // Implemented as part of ControlValueAccessor
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MatDatepickerInput.prototype._onKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.altKey && event.keyCode === DOWN_ARROW) {
            this._datepicker.open();
            event.preventDefault();
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    MatDatepickerInput.prototype._onInput = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var type = this._datepicker.type;
        /** @type {?} */
        var date = this._dateAdapter.parse(value, this._dateFormats.parse[type]);
        this._lastValueValid = (!value && !date) || this._dateAdapter.isValid(date);
        date = this._getValidDateOrNull(date);
        if (!this._dateAdapter.sameDate(date, this._value)) {
            this._value = date;
            this._valueChange.emit(date);
            this.dateInput.emit(new MatDatepickerInputEvent(this, this._elementRef.nativeElement));
        }
        // update on every (input) change
        this._cvaOnChange(date);
    };
    /**
     * @return {?}
     */
    MatDatepickerInput.prototype._onChange = /**
     * @return {?}
     */
    function () {
        this.dateChange.emit(new MatDatepickerInputEvent(this, this._elementRef.nativeElement));
    };
    /** Handles blur events on the input. */
    /**
     * Handles blur events on the input.
     * @return {?}
     */
    MatDatepickerInput.prototype._onBlur = /**
     * Handles blur events on the input.
     * @return {?}
     */
    function () {
        // Reformat the input only if we have a valid value.
        if (this.value) {
            this._formatValue(this.value);
        }
        this._onTouched();
    };
    /** Formats a value and sets it on the input element. */
    /**
     * Formats a value and sets it on the input element.
     * @private
     * @param {?} value
     * @return {?}
     */
    MatDatepickerInput.prototype._formatValue = /**
     * Formats a value and sets it on the input element.
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var type = this._datepicker.type;
        this._elementRef.nativeElement.value = value
            ? this._dateAdapter.format(value, this._dateFormats.display[type])
            : '';
    };
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    /**
     * @private
     * @param {?} obj The object to check.
     * @return {?} The given object if it is both a date instance and valid, otherwise null.
     */
    MatDatepickerInput.prototype._getValidDateOrNull = /**
     * @private
     * @param {?} obj The object to check.
     * @return {?} The given object if it is both a date instance and valid, otherwise null.
     */
    function (obj) {
        return this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj) ? obj : null;
    };
    MatDatepickerInput.decorators = [
        { type: Directive, args: [{
                    selector: 'input[matDatepicker]',
                    providers: [
                        MAT_DATEPICKER_VALUE_ACCESSOR,
                        MAT_DATEPICKER_VALIDATORS,
                        { provide: MAT_INPUT_VALUE_ACCESSOR, useExisting: MatDatepickerInput }
                    ],
                    host: {
                        '[attr.aria-haspopup]': 'true',
                        '[attr.aria-owns]': '(_datepicker?.opened && _datepicker.id) || null',
                        '[attr.min]': 'min ? _dateAdapter.toIso8601(min) : null',
                        '[attr.max]': 'max ? _dateAdapter.toIso8601(max) : null',
                        '[attr.disabled]': 'disabled',
                        '(input)': '_onInput($event.target.value)',
                        '(change)': '_onChange()',
                        '(blur)': '_onBlur()',
                        '(keydown)': '_onKeydown($event)'
                    },
                    exportAs: 'matDatepickerInput'
                },] }
    ];
    /** @nocollapse */
    MatDatepickerInput.ctorParameters = function () { return [
        { type: ElementRef },
        { type: DateAdapter, decorators: [{ type: Optional }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_DATE_FORMATS,] }] },
        { type: MatFormField, decorators: [{ type: Optional }] }
    ]; };
    MatDatepickerInput.propDecorators = {
        matDatepicker: [{ type: Input }],
        matDatepickerFilter: [{ type: Input }],
        value: [{ type: Input }],
        min: [{ type: Input }],
        max: [{ type: Input }],
        disabled: [{ type: Input }],
        dateChange: [{ type: Output }],
        dateInput: [{ type: Output }]
    };
    return MatDatepickerInput;
}());
export { MatDatepickerInput };
if (false) {
    /** @type {?} */
    MatDatepickerInput.prototype._datepicker;
    /** @type {?} */
    MatDatepickerInput.prototype._dateFilter;
    /**
     * @type {?}
     * @private
     */
    MatDatepickerInput.prototype._value;
    /**
     * @type {?}
     * @private
     */
    MatDatepickerInput.prototype._firstValue;
    /**
     * @type {?}
     * @private
     */
    MatDatepickerInput.prototype._min;
    /**
     * @type {?}
     * @private
     */
    MatDatepickerInput.prototype._max;
    /**
     * @type {?}
     * @private
     */
    MatDatepickerInput.prototype._disabled;
    /**
     * Emits when a `change` event is fired on this `<input>`.
     * @type {?}
     */
    MatDatepickerInput.prototype.dateChange;
    /**
     * Emits when an `input` event is fired on this `<input>`.
     * @type {?}
     */
    MatDatepickerInput.prototype.dateInput;
    /**
     * Emits when the value changes (either due to user input or programmatic change).
     * @type {?}
     */
    MatDatepickerInput.prototype._valueChange;
    /**
     * Emits when the disabled state has changed
     * @type {?}
     */
    MatDatepickerInput.prototype._disabledChange;
    /** @type {?} */
    MatDatepickerInput.prototype._onTouched;
    /**
     * @type {?}
     * @private
     */
    MatDatepickerInput.prototype._cvaOnChange;
    /**
     * @type {?}
     * @private
     */
    MatDatepickerInput.prototype._validatorOnChange;
    /**
     * @type {?}
     * @private
     */
    MatDatepickerInput.prototype._datepickerSubscription;
    /**
     * @type {?}
     * @private
     */
    MatDatepickerInput.prototype._localeSubscription;
    /**
     * The form control validator for whether the input parses.
     * @type {?}
     * @private
     */
    MatDatepickerInput.prototype._parseValidator;
    /**
     * The form control validator for the min date.
     * @type {?}
     * @private
     */
    MatDatepickerInput.prototype._minValidator;
    /**
     * The form control validator for the max date.
     * @type {?}
     * @private
     */
    MatDatepickerInput.prototype._maxValidator;
    /**
     * The form control validator for the date filter.
     * @type {?}
     * @private
     */
    MatDatepickerInput.prototype._filterValidator;
    /**
     * The combined form control validator for this input.
     * @type {?}
     * @private
     */
    MatDatepickerInput.prototype._validator;
    /**
     * Whether the last value set on the input was valid.
     * @type {?}
     * @private
     */
    MatDatepickerInput.prototype._lastValueValid;
    /**
     * @type {?}
     * @private
     */
    MatDatepickerInput.prototype._elementRef;
    /** @type {?} */
    MatDatepickerInput.prototype._dateAdapter;
    /**
     * @type {?}
     * @private
     */
    MatDatepickerInput.prototype._dateFormats;
    /**
     * @type {?}
     * @private
     */
    MatDatepickerInput.prototype._formField;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtYXJ0aW5kYWxlYy9kYXRlcGlja2VyLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci1pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRCxPQUFPLEVBRUwsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBRUwsUUFBUSxFQUNSLE1BQU0sRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBR0wsYUFBYSxFQUNiLGlCQUFpQixFQUlqQixVQUFVLEVBQ1gsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBa0IsTUFBTSxjQUFjLENBQUM7QUFDaEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUM3QyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7QUFFakUsTUFBTSxLQUFPLDZCQUE2QixHQUFRO0lBQ2hELE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVU7OztJQUFDLGNBQU0sT0FBQSxrQkFBa0IsRUFBbEIsQ0FBa0IsRUFBQztJQUNqRCxLQUFLLEVBQUUsSUFBSTtDQUNaOztBQUVELE1BQU0sS0FBTyx5QkFBeUIsR0FBUTtJQUM1QyxPQUFPLEVBQUUsYUFBYTtJQUN0QixXQUFXLEVBQUUsVUFBVTs7O0lBQUMsY0FBTSxPQUFBLGtCQUFrQixFQUFsQixDQUFrQixFQUFDO0lBQ2pELEtBQUssRUFBRSxJQUFJO0NBQ1o7Ozs7Ozs7QUFPRDs7Ozs7OztJQUlFLGlDQUVTLE1BQTZCLEVBRTdCLGFBQTBCO1FBRjFCLFdBQU0sR0FBTixNQUFNLENBQXVCO1FBRTdCLGtCQUFhLEdBQWIsYUFBYSxDQUFhO1FBRWpDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDakMsQ0FBQztJQUNILDhCQUFDO0FBQUQsQ0FBQyxBQVpELElBWUM7Ozs7Ozs7Ozs7Ozs7SUFWQyx3Q0FBZ0I7Ozs7O0lBSWQseUNBQW9DOzs7OztJQUVwQyxnREFBaUM7Ozs7OztBQU9yQztJQStLRSw0QkFDVSxXQUF1QixFQUNaLFlBQTRCLEVBR3ZDLFlBQTRCLEVBQ2hCLFVBQXdCO1FBTjlDLGlCQWNDO1FBYlMsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDWixpQkFBWSxHQUFaLFlBQVksQ0FBZ0I7UUFHdkMsaUJBQVksR0FBWixZQUFZLENBQWdCO1FBQ2hCLGVBQVUsR0FBVixVQUFVLENBQWM7Ozs7UUFyRTNCLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBOEIsQ0FBQzs7OztRQUc1RCxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQThCLENBQUM7Ozs7UUFHOUUsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBWSxDQUFDOzs7O1FBRzVDLG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUU5QyxlQUFVOzs7UUFBRyxjQUFPLENBQUMsRUFBQztRQUVkLGlCQUFZOzs7UUFBeUIsY0FBTyxDQUFDLEVBQUM7UUFFOUMsdUJBQWtCOzs7UUFBRyxjQUFPLENBQUMsRUFBQztRQUU5Qiw0QkFBdUIsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBRTdDLHdCQUFtQixHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7Ozs7UUFHekMsb0JBQWU7OztRQUFnQjtZQUNyQyxPQUFPLEtBQUksQ0FBQyxlQUFlO2dCQUN6QixDQUFDLENBQUMsSUFBSTtnQkFDTixDQUFDLENBQUMsRUFBRSxrQkFBa0IsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO1FBQzdFLENBQUMsRUFBQzs7OztRQUdNLGtCQUFhOzs7O1FBQWdCLFVBQUMsT0FBd0I7O2dCQUN0RCxZQUFZLEdBQUcsS0FBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzRixPQUFPLENBQUMsS0FBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksSUFBSSxLQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxLQUFJLENBQUMsR0FBRyxFQUFFLFlBQVksQ0FBQyxJQUFJLENBQUM7Z0JBQzdGLENBQUMsQ0FBQyxJQUFJO2dCQUNOLENBQUMsQ0FBQyxFQUFFLGdCQUFnQixFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUksQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLENBQUM7UUFDcEUsQ0FBQyxFQUFDOzs7O1FBR00sa0JBQWE7Ozs7UUFBZ0IsVUFBQyxPQUF3Qjs7Z0JBQ3RELFlBQVksR0FBRyxLQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzNGLE9BQU8sQ0FBQyxLQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxJQUFJLEtBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLEtBQUksQ0FBQyxHQUFHLEVBQUUsWUFBWSxDQUFDLElBQUksQ0FBQztnQkFDN0YsQ0FBQyxDQUFDLElBQUk7Z0JBQ04sQ0FBQyxDQUFDLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRSxHQUFHLEVBQUUsS0FBSSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsQ0FBQztRQUNwRSxDQUFDLEVBQUM7Ozs7UUFHTSxxQkFBZ0I7Ozs7UUFBZ0IsVUFBQyxPQUF3Qjs7Z0JBQ3pELFlBQVksR0FBRyxLQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzNGLE9BQU8sQ0FBQyxLQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsWUFBWSxJQUFJLEtBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDO2dCQUN6RSxDQUFDLENBQUMsSUFBSTtnQkFDTixDQUFDLENBQUMsRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUNwQyxDQUFDLEVBQUM7Ozs7UUFHTSxlQUFVLEdBQXVCLFVBQVUsQ0FBQyxPQUFPLENBQUM7WUFDMUQsSUFBSSxDQUFDLGVBQWU7WUFDcEIsSUFBSSxDQUFDLGFBQWE7WUFDbEIsSUFBSSxDQUFDLGFBQWE7WUFDbEIsSUFBSSxDQUFDLGdCQUFnQjtTQUN0QixDQUFDLENBQUM7Ozs7UUFHSyxvQkFBZSxHQUFHLEtBQUssQ0FBQztRQVU5QixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN0QixNQUFNLDBCQUEwQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ2pEO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDdEIsTUFBTSwwQkFBMEIsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1NBQ3REO0lBQ0gsQ0FBQztJQXRLRCxzQkFDSSw2Q0FBYTtRQUZqQix5REFBeUQ7Ozs7OztRQUN6RCxVQUNrQixLQUF1QjtZQUN2QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakMsQ0FBQzs7O09BQUE7Ozs7OztJQUdPLCtDQUFrQjs7Ozs7SUFBMUIsVUFBMkIsS0FBdUI7UUFDaEQsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUN6QixJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN2QztJQUNILENBQUM7SUFHRCxzQkFDSSxtREFBbUI7UUFGdkIsMkVBQTJFOzs7Ozs7UUFDM0UsVUFDd0IsTUFBa0Q7WUFDeEUsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUM7WUFDMUIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDNUIsQ0FBQzs7O09BQUE7SUFJRCxzQkFDSSxxQ0FBSztRQUZULDhCQUE4Qjs7Ozs7UUFDOUI7WUFFRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDckIsQ0FBQzs7Ozs7UUFDRCxVQUFVLEtBQWU7WUFDdkIsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEUsS0FBSyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Z0JBRWxDLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSztZQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRXpCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQy9DLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQy9CO1FBQ0gsQ0FBQzs7O09BYkE7SUFrQkQsc0JBQ0ksbUNBQUc7UUFGUCw4QkFBOEI7Ozs7O1FBQzlCO1lBRUUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ25CLENBQUM7Ozs7O1FBQ0QsVUFBUSxLQUFlO1lBQ3JCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDM0UsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDNUIsQ0FBQzs7O09BSkE7SUFRRCxzQkFDSSxtQ0FBRztRQUZQLDhCQUE4Qjs7Ozs7UUFDOUI7WUFFRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDbkIsQ0FBQzs7Ozs7UUFDRCxVQUFRLEtBQWU7WUFDckIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUMzRSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUM1QixDQUFDOzs7T0FKQTtJQVFELHNCQUNJLHdDQUFRO1FBRlosZ0RBQWdEOzs7OztRQUNoRDtZQUVFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsQ0FBQzs7Ozs7UUFDRCxVQUFhLEtBQWM7O2dCQUNuQixRQUFRLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDOztnQkFDdkMsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYTtZQUU5QyxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssUUFBUSxFQUFFO2dCQUMvQixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDckM7WUFFRCw4RUFBOEU7WUFDOUUsSUFBSSxRQUFRLElBQUksT0FBTyxDQUFDLElBQUksRUFBRTtnQkFDNUIsMEZBQTBGO2dCQUMxRix5RkFBeUY7Z0JBQ3pGLDJGQUEyRjtnQkFDM0YsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2hCO1FBQ0gsQ0FBQzs7O09BakJBOzs7O0lBb0dELCtDQUFrQjs7O0lBQWxCO1FBQUEsaUJBZUM7UUFkQyxxREFBcUQ7UUFDckQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLFNBQVM7OztRQUFDO1lBQ25FLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQztRQUMxQixDQUFDLEVBQUMsQ0FBQztRQUVILElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNwQixJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTOzs7O1lBQUMsVUFBQyxRQUFXO2dCQUNyRixLQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztnQkFDdEIsS0FBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDNUIsS0FBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUNsQixLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLHVCQUF1QixDQUFDLEtBQUksRUFBRSxLQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZGLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksdUJBQXVCLENBQUMsS0FBSSxFQUFFLEtBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUMxRixDQUFDLEVBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7OztJQUVELHdDQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMzQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xDLENBQUM7Ozs7O0lBRUQsa0NBQUs7Ozs7SUFBTCxVQUFNLEtBQWdCO1FBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzVELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2pDLENBQUM7Ozs7O0lBRUQsc0RBQXlCOzs7O0lBQXpCLFVBQTBCLEVBQWM7UUFDdEMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEVBQUUsQ0FBQztJQUMvQixDQUFDOzs7OztJQUVELHFDQUFROzs7O0lBQVIsVUFBUyxDQUFrQjtRQUN6QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNyRCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCx5REFBNEI7Ozs7O0lBQTVCO1FBQ0UsT0FBTyxJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7OztPQUdHOzs7OztJQUNILHNEQUF5Qjs7OztJQUF6QjtRQUNFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyx5QkFBeUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFGLENBQUM7SUFFRCw4Q0FBOEM7Ozs7OztJQUM5Qyx1Q0FBVTs7Ozs7O0lBQVYsVUFBVyxLQUFRO1FBQ2pCLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxTQUFTLEVBQUU7WUFDbEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7U0FDMUI7UUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNyQixDQUFDO0lBRUQsOENBQThDOzs7Ozs7SUFDOUMsNkNBQWdCOzs7Ozs7SUFBaEIsVUFBaUIsRUFBd0I7UUFDdkMsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELDhDQUE4Qzs7Ozs7O0lBQzlDLDhDQUFpQjs7Ozs7O0lBQWpCLFVBQWtCLEVBQWM7UUFDOUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELDhDQUE4Qzs7Ozs7O0lBQzlDLDZDQUFnQjs7Ozs7O0lBQWhCLFVBQWlCLFVBQW1CO1FBQ2xDLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO0lBQzdCLENBQUM7Ozs7O0lBRUQsdUNBQVU7Ozs7SUFBVixVQUFXLEtBQW9CO1FBQzdCLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLFVBQVUsRUFBRTtZQUNoRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3hCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUN4QjtJQUNILENBQUM7Ozs7O0lBRUQscUNBQVE7Ozs7SUFBUixVQUFTLEtBQWE7O1lBQ2QsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSTs7WUFDOUIsSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1RSxJQUFJLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXRDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2xELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksdUJBQXVCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztTQUN4RjtRQUNELGlDQUFpQztRQUNqQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFCLENBQUM7Ozs7SUFFRCxzQ0FBUzs7O0lBQVQ7UUFDRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLHVCQUF1QixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFDMUYsQ0FBQztJQUVELHdDQUF3Qzs7Ozs7SUFDeEMsb0NBQU87Ozs7SUFBUDtRQUNFLG9EQUFvRDtRQUNwRCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMvQjtRQUVELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQsd0RBQXdEOzs7Ozs7O0lBQ2hELHlDQUFZOzs7Ozs7SUFBcEIsVUFBcUIsS0FBZTs7WUFDNUIsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSTtRQUNsQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsS0FBSztZQUMxQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xFLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDVCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSyxnREFBbUI7Ozs7O0lBQTNCLFVBQTRCLEdBQVE7UUFDbEMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDOUYsQ0FBQzs7Z0JBN1RGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxTQUFTLEVBQUU7d0JBQ1QsNkJBQTZCO3dCQUM3Qix5QkFBeUI7d0JBQ3pCLEVBQUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLFdBQVcsRUFBRSxrQkFBa0IsRUFBRTtxQkFDdkU7b0JBQ0QsSUFBSSxFQUFFO3dCQUNKLHNCQUFzQixFQUFFLE1BQU07d0JBQzlCLGtCQUFrQixFQUFFLGlEQUFpRDt3QkFDckUsWUFBWSxFQUFFLDBDQUEwQzt3QkFDeEQsWUFBWSxFQUFFLDBDQUEwQzt3QkFDeEQsaUJBQWlCLEVBQUUsVUFBVTt3QkFDN0IsU0FBUyxFQUFFLCtCQUErQjt3QkFDMUMsVUFBVSxFQUFFLGFBQWE7d0JBQ3pCLFFBQVEsRUFBRSxXQUFXO3dCQUNyQixXQUFXLEVBQUUsb0JBQW9CO3FCQUNsQztvQkFDRCxRQUFRLEVBQUUsb0JBQW9CO2lCQUMvQjs7OztnQkE5RUMsVUFBVTtnQkFzQkgsV0FBVyx1QkFzTmYsUUFBUTtnREFDUixRQUFRLFlBQ1IsTUFBTSxTQUFDLGdCQUFnQjtnQkExTm5CLFlBQVksdUJBNE5oQixRQUFROzs7Z0NBOUpWLEtBQUs7c0NBY0wsS0FBSzt3QkFRTCxLQUFLO3NCQXFCTCxLQUFLO3NCQVdMLEtBQUs7MkJBV0wsS0FBSzs2QkF3QkwsTUFBTTs0QkFHTixNQUFNOztJQTJNVCx5QkFBQztDQUFBLEFBOVRELElBOFRDO1NBMVNZLGtCQUFrQjs7O0lBTzdCLHlDQUE4Qjs7SUFlOUIseUNBQXdEOzs7OztJQW9CeEQsb0NBQXlCOzs7OztJQUN6Qix5Q0FBOEI7Ozs7O0lBVzlCLGtDQUF1Qjs7Ozs7SUFXdkIsa0NBQXVCOzs7OztJQXdCdkIsdUNBQTJCOzs7OztJQUczQix3Q0FBK0U7Ozs7O0lBRy9FLHVDQUE4RTs7Ozs7SUFHOUUsMENBQTRDOzs7OztJQUc1Qyw2Q0FBOEM7O0lBRTlDLHdDQUFzQjs7Ozs7SUFFdEIsMENBQXNEOzs7OztJQUV0RCxnREFBc0M7Ozs7O0lBRXRDLHFEQUFxRDs7Ozs7SUFFckQsaURBQWlEOzs7Ozs7SUFHakQsNkNBSUU7Ozs7OztJQUdGLDJDQUtFOzs7Ozs7SUFHRiwyQ0FLRTs7Ozs7O0lBR0YsOENBS0U7Ozs7OztJQUdGLHdDQUtHOzs7Ozs7SUFHSCw2Q0FBZ0M7Ozs7O0lBRzlCLHlDQUErQjs7SUFDL0IsMENBQStDOzs7OztJQUMvQywwQ0FFb0M7Ozs7O0lBQ3BDLHdDQUE0QyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKlxyXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxyXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcclxuaW1wb3J0IHsgRE9XTl9BUlJPVyB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XHJcbmltcG9ydCB7XHJcbiAgQWZ0ZXJDb250ZW50SW5pdCxcclxuICBEaXJlY3RpdmUsXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgZm9yd2FyZFJlZixcclxuICBJbmplY3QsXHJcbiAgSW5wdXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9wdGlvbmFsLFxyXG4gIE91dHB1dFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIEFic3RyYWN0Q29udHJvbCxcclxuICBDb250cm9sVmFsdWVBY2Nlc3NvcixcclxuICBOR19WQUxJREFUT1JTLFxyXG4gIE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gIFZhbGlkYXRpb25FcnJvcnMsXHJcbiAgVmFsaWRhdG9yLFxyXG4gIFZhbGlkYXRvckZuLFxyXG4gIFZhbGlkYXRvcnNcclxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IE1BVF9JTlBVVF9WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2lucHV0JztcclxuaW1wb3J0IHsgTWF0Rm9ybUZpZWxkIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZm9ybS1maWVsZCc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBEYXRlQWRhcHRlciB9IGZyb20gJy4vY29yZS9pbmRleCc7XHJcbmltcG9ydCB7IE1BVF9EQVRFX0ZPUk1BVFMsIE1hdERhdGVGb3JtYXRzIH0gZnJvbSAnLi9jb3JlL2luZGV4JztcclxuaW1wb3J0IHsgTWF0RGF0ZXBpY2tlciB9IGZyb20gJy4vZGF0ZXBpY2tlcic7XHJcbmltcG9ydCB7IGNyZWF0ZU1pc3NpbmdEYXRlSW1wbEVycm9yIH0gZnJvbSAnLi9kYXRlcGlja2VyLWVycm9ycyc7XHJcblxyXG5leHBvcnQgY29uc3QgTUFUX0RBVEVQSUNLRVJfVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcclxuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNYXREYXRlcGlja2VySW5wdXQpLFxyXG4gIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgTUFUX0RBVEVQSUNLRVJfVkFMSURBVE9SUzogYW55ID0ge1xyXG4gIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXHJcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWF0RGF0ZXBpY2tlcklucHV0KSxcclxuICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFuIGV2ZW50IHVzZWQgZm9yIGRhdGVwaWNrZXIgaW5wdXQgYW5kIGNoYW5nZSBldmVudHMuIFdlIGRvbid0IGFsd2F5cyBoYXZlIGFjY2VzcyB0byBhIG5hdGl2ZVxyXG4gKiBpbnB1dCBvciBjaGFuZ2UgZXZlbnQgYmVjYXVzZSB0aGUgZXZlbnQgbWF5IGhhdmUgYmVlbiB0cmlnZ2VyZWQgYnkgdGhlIHVzZXIgY2xpY2tpbmcgb24gdGhlXHJcbiAqIGNhbGVuZGFyIHBvcHVwLiBGb3IgY29uc2lzdGVuY3ksIHdlIGFsd2F5cyB1c2UgTWF0RGF0ZXBpY2tlcklucHV0RXZlbnQgaW5zdGVhZC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBNYXREYXRlcGlja2VySW5wdXRFdmVudDxEPiB7XHJcbiAgLyoqIFRoZSBuZXcgdmFsdWUgZm9yIHRoZSB0YXJnZXQgZGF0ZXBpY2tlciBpbnB1dC4gKi9cclxuICB2YWx1ZTogRCB8IG51bGw7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgLyoqIFJlZmVyZW5jZSB0byB0aGUgZGF0ZXBpY2tlciBpbnB1dCBjb21wb25lbnQgdGhhdCBlbWl0dGVkIHRoZSBldmVudC4gKi9cclxuICAgIHB1YmxpYyB0YXJnZXQ6IE1hdERhdGVwaWNrZXJJbnB1dDxEPixcclxuICAgIC8qKiBSZWZlcmVuY2UgdG8gdGhlIG5hdGl2ZSBpbnB1dCBlbGVtZW50IGFzc29jaWF0ZWQgd2l0aCB0aGUgZGF0ZXBpY2tlciBpbnB1dC4gKi9cclxuICAgIHB1YmxpYyB0YXJnZXRFbGVtZW50OiBIVE1MRWxlbWVudFxyXG4gICkge1xyXG4gICAgdGhpcy52YWx1ZSA9IHRoaXMudGFyZ2V0LnZhbHVlO1xyXG4gIH1cclxufVxyXG5cclxuLyoqIERpcmVjdGl2ZSB1c2VkIHRvIGNvbm5lY3QgYW4gaW5wdXQgdG8gYSBNYXREYXRlcGlja2VyLiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ2lucHV0W21hdERhdGVwaWNrZXJdJyxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIE1BVF9EQVRFUElDS0VSX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgTUFUX0RBVEVQSUNLRVJfVkFMSURBVE9SUyxcclxuICAgIHsgcHJvdmlkZTogTUFUX0lOUFVUX1ZBTFVFX0FDQ0VTU09SLCB1c2VFeGlzdGluZzogTWF0RGF0ZXBpY2tlcklucHV0IH1cclxuICBdLFxyXG4gIGhvc3Q6IHtcclxuICAgICdbYXR0ci5hcmlhLWhhc3BvcHVwXSc6ICd0cnVlJyxcclxuICAgICdbYXR0ci5hcmlhLW93bnNdJzogJyhfZGF0ZXBpY2tlcj8ub3BlbmVkICYmIF9kYXRlcGlja2VyLmlkKSB8fCBudWxsJyxcclxuICAgICdbYXR0ci5taW5dJzogJ21pbiA/IF9kYXRlQWRhcHRlci50b0lzbzg2MDEobWluKSA6IG51bGwnLFxyXG4gICAgJ1thdHRyLm1heF0nOiAnbWF4ID8gX2RhdGVBZGFwdGVyLnRvSXNvODYwMShtYXgpIDogbnVsbCcsXHJcbiAgICAnW2F0dHIuZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcclxuICAgICcoaW5wdXQpJzogJ19vbklucHV0KCRldmVudC50YXJnZXQudmFsdWUpJyxcclxuICAgICcoY2hhbmdlKSc6ICdfb25DaGFuZ2UoKScsXHJcbiAgICAnKGJsdXIpJzogJ19vbkJsdXIoKScsXHJcbiAgICAnKGtleWRvd24pJzogJ19vbktleWRvd24oJGV2ZW50KSdcclxuICB9LFxyXG4gIGV4cG9ydEFzOiAnbWF0RGF0ZXBpY2tlcklucHV0J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTWF0RGF0ZXBpY2tlcklucHV0PEQ+XHJcbiAgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25EZXN0cm95LCBWYWxpZGF0b3Ige1xyXG4gIC8qKiBUaGUgZGF0ZXBpY2tlciB0aGF0IHRoaXMgaW5wdXQgaXMgYXNzb2NpYXRlZCB3aXRoLiAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IG1hdERhdGVwaWNrZXIodmFsdWU6IE1hdERhdGVwaWNrZXI8RD4pIHtcclxuICAgIHRoaXMucmVnaXN0ZXJEYXRlcGlja2VyKHZhbHVlKTtcclxuICB9XHJcbiAgX2RhdGVwaWNrZXI6IE1hdERhdGVwaWNrZXI8RD47XHJcblxyXG4gIHByaXZhdGUgcmVnaXN0ZXJEYXRlcGlja2VyKHZhbHVlOiBNYXREYXRlcGlja2VyPEQ+KSB7XHJcbiAgICBpZiAodmFsdWUpIHtcclxuICAgICAgdGhpcy5fZGF0ZXBpY2tlciA9IHZhbHVlO1xyXG4gICAgICB0aGlzLl9kYXRlcGlja2VyLl9yZWdpc3RlcklucHV0KHRoaXMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIEZ1bmN0aW9uIHRoYXQgY2FuIGJlIHVzZWQgdG8gZmlsdGVyIG91dCBkYXRlcyB3aXRoaW4gdGhlIGRhdGVwaWNrZXIuICovXHJcbiAgQElucHV0KClcclxuICBzZXQgbWF0RGF0ZXBpY2tlckZpbHRlcihmaWx0ZXI6IChkYXRlOiBEIHwgbnVsbCwgdW5pdD86IHN0cmluZykgPT4gYm9vbGVhbikge1xyXG4gICAgdGhpcy5fZGF0ZUZpbHRlciA9IGZpbHRlcjtcclxuICAgIHRoaXMuX3ZhbGlkYXRvck9uQ2hhbmdlKCk7XHJcbiAgfVxyXG4gIF9kYXRlRmlsdGVyOiAoZGF0ZTogRCB8IG51bGwsIHVuaXQ/OiBzdHJpbmcpID0+IGJvb2xlYW47XHJcblxyXG4gIC8qKiBUaGUgdmFsdWUgb2YgdGhlIGlucHV0LiAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHZhbHVlKCk6IEQgfCBudWxsIHtcclxuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcclxuICB9XHJcbiAgc2V0IHZhbHVlKHZhbHVlOiBEIHwgbnVsbCkge1xyXG4gICAgdmFsdWUgPSB0aGlzLl9kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XHJcbiAgICB0aGlzLl9sYXN0VmFsdWVWYWxpZCA9ICF2YWx1ZSB8fCB0aGlzLl9kYXRlQWRhcHRlci5pc1ZhbGlkKHZhbHVlKTtcclxuICAgIHZhbHVlID0gdGhpcy5fZ2V0VmFsaWREYXRlT3JOdWxsKHZhbHVlKTtcclxuXHJcbiAgICBjb25zdCBvbGREYXRlID0gdGhpcy52YWx1ZTtcclxuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XHJcbiAgICB0aGlzLl9mb3JtYXRWYWx1ZSh2YWx1ZSk7XHJcblxyXG4gICAgaWYgKCF0aGlzLl9kYXRlQWRhcHRlci5zYW1lRGF0ZShvbGREYXRlLCB2YWx1ZSkpIHtcclxuICAgICAgdGhpcy5fdmFsdWVDaGFuZ2UuZW1pdCh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHByaXZhdGUgX3ZhbHVlOiBEIHwgbnVsbDtcclxuICBwcml2YXRlIF9maXJzdFZhbHVlOiBEIHwgbnVsbDtcclxuXHJcbiAgLyoqIFRoZSBtaW5pbXVtIHZhbGlkIGRhdGUuICovXHJcbiAgQElucHV0KClcclxuICBnZXQgbWluKCk6IEQgfCBudWxsIHtcclxuICAgIHJldHVybiB0aGlzLl9taW47XHJcbiAgfVxyXG4gIHNldCBtaW4odmFsdWU6IEQgfCBudWxsKSB7XHJcbiAgICB0aGlzLl9taW4gPSB0aGlzLl9nZXRWYWxpZERhdGVPck51bGwodGhpcy5fZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpKTtcclxuICAgIHRoaXMuX3ZhbGlkYXRvck9uQ2hhbmdlKCk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX21pbjogRCB8IG51bGw7XHJcblxyXG4gIC8qKiBUaGUgbWF4aW11bSB2YWxpZCBkYXRlLiAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IG1heCgpOiBEIHwgbnVsbCB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWF4O1xyXG4gIH1cclxuICBzZXQgbWF4KHZhbHVlOiBEIHwgbnVsbCkge1xyXG4gICAgdGhpcy5fbWF4ID0gdGhpcy5fZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuX2RhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSk7XHJcbiAgICB0aGlzLl92YWxpZGF0b3JPbkNoYW5nZSgpO1xyXG4gIH1cclxuICBwcml2YXRlIF9tYXg6IEQgfCBudWxsO1xyXG5cclxuICAvKiogV2hldGhlciB0aGUgZGF0ZXBpY2tlci1pbnB1dCBpcyBkaXNhYmxlZC4gKi9cclxuICBASW5wdXQoKVxyXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiAhIXRoaXMuX2Rpc2FibGVkO1xyXG4gIH1cclxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIGNvbnN0IG5ld1ZhbHVlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcclxuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XHJcblxyXG4gICAgaWYgKHRoaXMuX2Rpc2FibGVkICE9PSBuZXdWYWx1ZSkge1xyXG4gICAgICB0aGlzLl9kaXNhYmxlZCA9IG5ld1ZhbHVlO1xyXG4gICAgICB0aGlzLl9kaXNhYmxlZENoYW5nZS5lbWl0KG5ld1ZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBXZSBuZWVkIHRvIG51bGwgY2hlY2sgdGhlIGBibHVyYCBtZXRob2QsIGJlY2F1c2UgaXQncyB1bmRlZmluZWQgZHVyaW5nIFNTUi5cclxuICAgIGlmIChuZXdWYWx1ZSAmJiBlbGVtZW50LmJsdXIpIHtcclxuICAgICAgLy8gTm9ybWFsbHksIG5hdGl2ZSBpbnB1dCBlbGVtZW50cyBhdXRvbWF0aWNhbGx5IGJsdXIgaWYgdGhleSB0dXJuIGRpc2FibGVkLiBUaGlzIGJlaGF2aW9yXHJcbiAgICAgIC8vIGlzIHByb2JsZW1hdGljLCBiZWNhdXNlIGl0IHdvdWxkIG1lYW4gdGhhdCBpdCB0cmlnZ2VycyBhbm90aGVyIGNoYW5nZSBkZXRlY3Rpb24gY3ljbGUsXHJcbiAgICAgIC8vIHdoaWNoIHRoZW4gY2F1c2VzIGEgY2hhbmdlZCBhZnRlciBjaGVja2VkIGVycm9yIGlmIHRoZSBpbnB1dCBlbGVtZW50IHdhcyBmb2N1c2VkIGJlZm9yZS5cclxuICAgICAgZWxlbWVudC5ibHVyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuO1xyXG5cclxuICAvKiogRW1pdHMgd2hlbiBhIGBjaGFuZ2VgIGV2ZW50IGlzIGZpcmVkIG9uIHRoaXMgYDxpbnB1dD5gLiAqL1xyXG4gIEBPdXRwdXQoKSByZWFkb25seSBkYXRlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxNYXREYXRlcGlja2VySW5wdXRFdmVudDxEPj4oKTtcclxuXHJcbiAgLyoqIEVtaXRzIHdoZW4gYW4gYGlucHV0YCBldmVudCBpcyBmaXJlZCBvbiB0aGlzIGA8aW5wdXQ+YC4gKi9cclxuICBAT3V0cHV0KCkgcmVhZG9ubHkgZGF0ZUlucHV0ID0gbmV3IEV2ZW50RW1pdHRlcjxNYXREYXRlcGlja2VySW5wdXRFdmVudDxEPj4oKTtcclxuXHJcbiAgLyoqIEVtaXRzIHdoZW4gdGhlIHZhbHVlIGNoYW5nZXMgKGVpdGhlciBkdWUgdG8gdXNlciBpbnB1dCBvciBwcm9ncmFtbWF0aWMgY2hhbmdlKS4gKi9cclxuICBfdmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPEQgfCBudWxsPigpO1xyXG5cclxuICAvKiogRW1pdHMgd2hlbiB0aGUgZGlzYWJsZWQgc3RhdGUgaGFzIGNoYW5nZWQgKi9cclxuICBfZGlzYWJsZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcblxyXG4gIF9vblRvdWNoZWQgPSAoKSA9PiB7fTtcclxuXHJcbiAgcHJpdmF0ZSBfY3ZhT25DaGFuZ2U6ICh2YWx1ZTogYW55KSA9PiB2b2lkID0gKCkgPT4ge307XHJcblxyXG4gIHByaXZhdGUgX3ZhbGlkYXRvck9uQ2hhbmdlID0gKCkgPT4ge307XHJcblxyXG4gIHByaXZhdGUgX2RhdGVwaWNrZXJTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XHJcblxyXG4gIHByaXZhdGUgX2xvY2FsZVN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcclxuXHJcbiAgLyoqIFRoZSBmb3JtIGNvbnRyb2wgdmFsaWRhdG9yIGZvciB3aGV0aGVyIHRoZSBpbnB1dCBwYXJzZXMuICovXHJcbiAgcHJpdmF0ZSBfcGFyc2VWYWxpZGF0b3I6IFZhbGlkYXRvckZuID0gKCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcclxuICAgIHJldHVybiB0aGlzLl9sYXN0VmFsdWVWYWxpZFxyXG4gICAgICA/IG51bGxcclxuICAgICAgOiB7IG1hdERhdGVwaWNrZXJQYXJzZTogeyB0ZXh0OiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWUgfSB9O1xyXG4gIH07XHJcblxyXG4gIC8qKiBUaGUgZm9ybSBjb250cm9sIHZhbGlkYXRvciBmb3IgdGhlIG1pbiBkYXRlLiAqL1xyXG4gIHByaXZhdGUgX21pblZhbGlkYXRvcjogVmFsaWRhdG9yRm4gPSAoY29udHJvbDogQWJzdHJhY3RDb250cm9sKTogVmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPT4ge1xyXG4gICAgY29uc3QgY29udHJvbFZhbHVlID0gdGhpcy5fZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuX2RhdGVBZGFwdGVyLmRlc2VyaWFsaXplKGNvbnRyb2wudmFsdWUpKTtcclxuICAgIHJldHVybiAhdGhpcy5taW4gfHwgIWNvbnRyb2xWYWx1ZSB8fCB0aGlzLl9kYXRlQWRhcHRlci5jb21wYXJlRGF0ZSh0aGlzLm1pbiwgY29udHJvbFZhbHVlKSA8PSAwXHJcbiAgICAgID8gbnVsbFxyXG4gICAgICA6IHsgbWF0RGF0ZXBpY2tlck1pbjogeyBtaW46IHRoaXMubWluLCBhY3R1YWw6IGNvbnRyb2xWYWx1ZSB9IH07XHJcbiAgfTtcclxuXHJcbiAgLyoqIFRoZSBmb3JtIGNvbnRyb2wgdmFsaWRhdG9yIGZvciB0aGUgbWF4IGRhdGUuICovXHJcbiAgcHJpdmF0ZSBfbWF4VmFsaWRhdG9yOiBWYWxpZGF0b3JGbiA9IChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9PiB7XHJcbiAgICBjb25zdCBjb250cm9sVmFsdWUgPSB0aGlzLl9nZXRWYWxpZERhdGVPck51bGwodGhpcy5fZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUoY29udHJvbC52YWx1ZSkpO1xyXG4gICAgcmV0dXJuICF0aGlzLm1heCB8fCAhY29udHJvbFZhbHVlIHx8IHRoaXMuX2RhdGVBZGFwdGVyLmNvbXBhcmVEYXRlKHRoaXMubWF4LCBjb250cm9sVmFsdWUpID49IDBcclxuICAgICAgPyBudWxsXHJcbiAgICAgIDogeyBtYXREYXRlcGlja2VyTWF4OiB7IG1heDogdGhpcy5tYXgsIGFjdHVhbDogY29udHJvbFZhbHVlIH0gfTtcclxuICB9O1xyXG5cclxuICAvKiogVGhlIGZvcm0gY29udHJvbCB2YWxpZGF0b3IgZm9yIHRoZSBkYXRlIGZpbHRlci4gKi9cclxuICBwcml2YXRlIF9maWx0ZXJWYWxpZGF0b3I6IFZhbGlkYXRvckZuID0gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0+IHtcclxuICAgIGNvbnN0IGNvbnRyb2xWYWx1ZSA9IHRoaXMuX2dldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLl9kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZShjb250cm9sLnZhbHVlKSk7XHJcbiAgICByZXR1cm4gIXRoaXMuX2RhdGVGaWx0ZXIgfHwgIWNvbnRyb2xWYWx1ZSB8fCB0aGlzLl9kYXRlRmlsdGVyKGNvbnRyb2xWYWx1ZSlcclxuICAgICAgPyBudWxsXHJcbiAgICAgIDogeyBtYXREYXRlcGlja2VyRmlsdGVyOiB0cnVlIH07XHJcbiAgfTtcclxuXHJcbiAgLyoqIFRoZSBjb21iaW5lZCBmb3JtIGNvbnRyb2wgdmFsaWRhdG9yIGZvciB0aGlzIGlucHV0LiAqL1xyXG4gIHByaXZhdGUgX3ZhbGlkYXRvcjogVmFsaWRhdG9yRm4gfCBudWxsID0gVmFsaWRhdG9ycy5jb21wb3NlKFtcclxuICAgIHRoaXMuX3BhcnNlVmFsaWRhdG9yLFxyXG4gICAgdGhpcy5fbWluVmFsaWRhdG9yLFxyXG4gICAgdGhpcy5fbWF4VmFsaWRhdG9yLFxyXG4gICAgdGhpcy5fZmlsdGVyVmFsaWRhdG9yXHJcbiAgXSk7XHJcblxyXG4gIC8qKiBXaGV0aGVyIHRoZSBsYXN0IHZhbHVlIHNldCBvbiB0aGUgaW5wdXQgd2FzIHZhbGlkLiAqL1xyXG4gIHByaXZhdGUgX2xhc3RWYWx1ZVZhbGlkID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcclxuICAgIEBPcHRpb25hbCgpIHB1YmxpYyBfZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyPEQ+LFxyXG4gICAgQE9wdGlvbmFsKClcclxuICAgIEBJbmplY3QoTUFUX0RBVEVfRk9STUFUUylcclxuICAgIHByaXZhdGUgX2RhdGVGb3JtYXRzOiBNYXREYXRlRm9ybWF0cyxcclxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgX2Zvcm1GaWVsZDogTWF0Rm9ybUZpZWxkXHJcbiAgKSB7XHJcbiAgICBpZiAoIXRoaXMuX2RhdGVBZGFwdGVyKSB7XHJcbiAgICAgIHRocm93IGNyZWF0ZU1pc3NpbmdEYXRlSW1wbEVycm9yKCdEYXRlQWRhcHRlcicpO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLl9kYXRlRm9ybWF0cykge1xyXG4gICAgICB0aHJvdyBjcmVhdGVNaXNzaW5nRGF0ZUltcGxFcnJvcignTUFUX0RBVEVfRk9STUFUUycpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgLy8gVXBkYXRlIHRoZSBkaXNwbGF5ZWQgZGF0ZSB3aGVuIHRoZSBsb2NhbGUgY2hhbmdlcy5cclxuICAgIHRoaXMuX2xvY2FsZVN1YnNjcmlwdGlvbiA9IHRoaXMuX2RhdGVBZGFwdGVyLmxvY2FsZUNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMudmFsdWU7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAodGhpcy5fZGF0ZXBpY2tlcikge1xyXG4gICAgICB0aGlzLl9kYXRlcGlja2VyU3Vic2NyaXB0aW9uID0gdGhpcy5fZGF0ZXBpY2tlci5fc2VsZWN0ZWRDaGFuZ2VkLnN1YnNjcmliZSgoc2VsZWN0ZWQ6IEQpID0+IHtcclxuICAgICAgICB0aGlzLnZhbHVlID0gc2VsZWN0ZWQ7XHJcbiAgICAgICAgdGhpcy5fY3ZhT25DaGFuZ2Uoc2VsZWN0ZWQpO1xyXG4gICAgICAgIHRoaXMuX29uVG91Y2hlZCgpO1xyXG4gICAgICAgIHRoaXMuZGF0ZUlucHV0LmVtaXQobmV3IE1hdERhdGVwaWNrZXJJbnB1dEV2ZW50KHRoaXMsIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkpO1xyXG4gICAgICAgIHRoaXMuZGF0ZUNoYW5nZS5lbWl0KG5ldyBNYXREYXRlcGlja2VySW5wdXRFdmVudCh0aGlzLCB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuX2RhdGVwaWNrZXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIHRoaXMuX2xvY2FsZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgdGhpcy5fdmFsdWVDaGFuZ2UuY29tcGxldGUoKTtcclxuICAgIHRoaXMuX2Rpc2FibGVkQ2hhbmdlLmNvbXBsZXRlKCk7XHJcbiAgfVxyXG5cclxuICByZXNldCh2YWx1ZT86IEQgfCBudWxsKTogdm9pZCB7XHJcbiAgICB0aGlzLnZhbHVlID0gdmFsdWUgIT09IHVuZGVmaW5lZCA/IHZhbHVlIDogdGhpcy5fZmlyc3RWYWx1ZTtcclxuICAgIHRoaXMuX2N2YU9uQ2hhbmdlKHRoaXMuX3ZhbHVlKTtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25WYWxpZGF0b3JDaGFuZ2UoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgIHRoaXMuX3ZhbGlkYXRvck9uQ2hhbmdlID0gZm47XHJcbiAgfVxyXG5cclxuICB2YWxpZGF0ZShjOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCB7XHJcbiAgICByZXR1cm4gdGhpcy5fdmFsaWRhdG9yID8gdGhpcy5fdmFsaWRhdG9yKGMpIDogbnVsbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBkZXByZWNhdGVkXHJcbiAgICogQGRlbGV0aW9uLXRhcmdldCA3LjAuMCBVc2UgYGdldENvbm5lY3RlZE92ZXJsYXlPcmlnaW5gIGluc3RlYWRcclxuICAgKi9cclxuICBnZXRQb3B1cENvbm5lY3Rpb25FbGVtZW50UmVmKCk6IEVsZW1lbnRSZWYge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0Q29ubmVjdGVkT3ZlcmxheU9yaWdpbigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgZWxlbWVudCB0aGF0IHRoZSBkYXRlcGlja2VyIHBvcHVwIHNob3VsZCBiZSBjb25uZWN0ZWQgdG8uXHJcbiAgICogQHJldHVybiBUaGUgZWxlbWVudCB0byBjb25uZWN0IHRoZSBwb3B1cCB0by5cclxuICAgKi9cclxuICBnZXRDb25uZWN0ZWRPdmVybGF5T3JpZ2luKCk6IEVsZW1lbnRSZWYge1xyXG4gICAgcmV0dXJuIHRoaXMuX2Zvcm1GaWVsZCA/IHRoaXMuX2Zvcm1GaWVsZC5nZXRDb25uZWN0ZWRPdmVybGF5T3JpZ2luKCkgOiB0aGlzLl9lbGVtZW50UmVmO1xyXG4gIH1cclxuXHJcbiAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3NvclxyXG4gIHdyaXRlVmFsdWUodmFsdWU6IEQpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLl9maXJzdFZhbHVlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5fZmlyc3RWYWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3NvclxyXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICB0aGlzLl9jdmFPbkNoYW5nZSA9IGZuO1xyXG4gIH1cclxuXHJcbiAgLy8gSW1wbGVtZW50ZWQgYXMgcGFydCBvZiBDb250cm9sVmFsdWVBY2Nlc3NvclxyXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICB0aGlzLl9vblRvdWNoZWQgPSBmbjtcclxuICB9XHJcblxyXG4gIC8vIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgQ29udHJvbFZhbHVlQWNjZXNzb3JcclxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xyXG4gIH1cclxuXHJcbiAgX29uS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgaWYgKGV2ZW50LmFsdEtleSAmJiBldmVudC5rZXlDb2RlID09PSBET1dOX0FSUk9XKSB7XHJcbiAgICAgIHRoaXMuX2RhdGVwaWNrZXIub3BlbigpO1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX29uSW5wdXQodmFsdWU6IHN0cmluZykge1xyXG4gICAgY29uc3QgdHlwZSA9IHRoaXMuX2RhdGVwaWNrZXIudHlwZTtcclxuICAgIGxldCBkYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIucGFyc2UodmFsdWUsIHRoaXMuX2RhdGVGb3JtYXRzLnBhcnNlW3R5cGVdKTtcclxuICAgIHRoaXMuX2xhc3RWYWx1ZVZhbGlkID0gKCF2YWx1ZSAmJiAhZGF0ZSkgfHwgdGhpcy5fZGF0ZUFkYXB0ZXIuaXNWYWxpZChkYXRlKTtcclxuICAgIGRhdGUgPSB0aGlzLl9nZXRWYWxpZERhdGVPck51bGwoZGF0ZSk7XHJcblxyXG4gICAgaWYgKCF0aGlzLl9kYXRlQWRhcHRlci5zYW1lRGF0ZShkYXRlLCB0aGlzLl92YWx1ZSkpIHtcclxuICAgICAgdGhpcy5fdmFsdWUgPSBkYXRlO1xyXG4gICAgICB0aGlzLl92YWx1ZUNoYW5nZS5lbWl0KGRhdGUpO1xyXG4gICAgICB0aGlzLmRhdGVJbnB1dC5lbWl0KG5ldyBNYXREYXRlcGlja2VySW5wdXRFdmVudCh0aGlzLCB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpKTtcclxuICAgIH1cclxuICAgIC8vIHVwZGF0ZSBvbiBldmVyeSAoaW5wdXQpIGNoYW5nZVxyXG4gICAgdGhpcy5fY3ZhT25DaGFuZ2UoZGF0ZSk7XHJcbiAgfVxyXG5cclxuICBfb25DaGFuZ2UoKSB7XHJcbiAgICB0aGlzLmRhdGVDaGFuZ2UuZW1pdChuZXcgTWF0RGF0ZXBpY2tlcklucHV0RXZlbnQodGhpcywgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSk7XHJcbiAgfVxyXG5cclxuICAvKiogSGFuZGxlcyBibHVyIGV2ZW50cyBvbiB0aGUgaW5wdXQuICovXHJcbiAgX29uQmx1cigpIHtcclxuICAgIC8vIFJlZm9ybWF0IHRoZSBpbnB1dCBvbmx5IGlmIHdlIGhhdmUgYSB2YWxpZCB2YWx1ZS5cclxuICAgIGlmICh0aGlzLnZhbHVlKSB7XHJcbiAgICAgIHRoaXMuX2Zvcm1hdFZhbHVlKHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX29uVG91Y2hlZCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEZvcm1hdHMgYSB2YWx1ZSBhbmQgc2V0cyBpdCBvbiB0aGUgaW5wdXQgZWxlbWVudC4gKi9cclxuICBwcml2YXRlIF9mb3JtYXRWYWx1ZSh2YWx1ZTogRCB8IG51bGwpIHtcclxuICAgIGNvbnN0IHR5cGUgPSB0aGlzLl9kYXRlcGlja2VyLnR5cGU7XHJcbiAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB2YWx1ZVxyXG4gICAgICA/IHRoaXMuX2RhdGVBZGFwdGVyLmZvcm1hdCh2YWx1ZSwgdGhpcy5fZGF0ZUZvcm1hdHMuZGlzcGxheVt0eXBlXSlcclxuICAgICAgOiAnJztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBvYmogVGhlIG9iamVjdCB0byBjaGVjay5cclxuICAgKiBAcmV0dXJucyBUaGUgZ2l2ZW4gb2JqZWN0IGlmIGl0IGlzIGJvdGggYSBkYXRlIGluc3RhbmNlIGFuZCB2YWxpZCwgb3RoZXJ3aXNlIG51bGwuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZ2V0VmFsaWREYXRlT3JOdWxsKG9iajogYW55KTogRCB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RhdGVBZGFwdGVyLmlzRGF0ZUluc3RhbmNlKG9iaikgJiYgdGhpcy5fZGF0ZUFkYXB0ZXIuaXNWYWxpZChvYmopID8gb2JqIDogbnVsbDtcclxuICB9XHJcbn1cclxuIl19