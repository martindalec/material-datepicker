/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Input, Optional, Output, ViewEncapsulation } from '@angular/core';
import { MAT_DATE_FORMATS } from './core/index';
import { DateAdapter } from './core/index';
import { createMissingDateImplError } from './datepicker-errors';
/** @type {?} */
export const CLOCK_RADIUS = 50;
/** @type {?} */
export const CLOCK_INNER_RADIUS = 27.5;
/** @type {?} */
export const CLOCK_OUTER_RADIUS = 41.25;
/** @type {?} */
export const CLOCK_TICK_RADIUS = 7.0833;
/**
 * A clock that is used as part of the datepicker.
 * \@docs-private
 * @template D
 */
export class MatClockView {
    /**
     * @param {?} _changeDetectorRef
     * @param {?} _element
     * @param {?} _dateAdapter
     * @param {?} _dateFormats
     */
    constructor(_changeDetectorRef, _element, _dateAdapter, _dateFormats) {
        this._changeDetectorRef = _changeDetectorRef;
        this._element = _element;
        this._dateAdapter = _dateAdapter;
        this._dateFormats = _dateFormats;
        this.clockStep = 1;
        this.twelveHour = false;
        // Whether the clock is in hour view.
        this.hourView = true;
        // Emits when the final time was selected.
        this.selectedTime = new EventEmitter();
        // Emits when the currently selected date changes.
        this.selectedChange = new EventEmitter();
        // Emits when the currently selected date changes.
        this.changeView = new EventEmitter();
        // Hours and Minutes representing the clock view.
        this._hours = [];
        this._minutes = [];
        if (!this._dateAdapter) {
            throw createMissingDateImplError('DateAdapter');
        }
        if (!this._dateFormats) {
            throw createMissingDateImplError('MAT_DATE_FORMATS');
        }
        this.mouseMoveListener = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this._handleMousemove(event);
        });
        this.mouseUpListener = (/**
         * @return {?}
         */
        () => {
            this._handleMouseup();
        });
    }
    /**
     * The time to display in this clock view. (the rest is ignored)
     * @return {?}
     */
    get activeDate() {
        return this._activeDate;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set activeDate(value) {
        /** @type {?} */
        const oldActiveDate = this._activeDate;
        /** @type {?} */
        const validDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value)) || this._dateAdapter.today();
        this._activeDate = this._dateAdapter.clampDate(validDate, this.minDate, this.maxDate);
        if (oldActiveDate && this._dateAdapter.compareDate(oldActiveDate, this._activeDate, 'minute')) {
            this._init();
        }
    }
    // The currently selected date.
    /**
     * @return {?}
     */
    get selected() {
        return this._selected;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set selected(value) {
        this._selected = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
    }
    /**
     * The minimum selectable date.
     * @return {?}
     */
    get minDate() {
        return this._minDate;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set minDate(value) {
        this._minDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
    }
    /**
     * The maximum selectable date.
     * @return {?}
     */
    get maxDate() {
        return this._maxDate;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set maxDate(value) {
        this._maxDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
    }
    /**
     * @return {?}
     */
    get _hand() {
        this._selectedHour = this._dateAdapter.getHours(this.activeDate);
        this._selectedMinute = this._dateAdapter.getMinutes(this.activeDate);
        /** @type {?} */
        let radius = CLOCK_OUTER_RADIUS;
        /** @type {?} */
        let deg = 0;
        if (this.twelveHour) {
            this._selectedHour = this._selectedHour < 12 ? this._selectedHour : this._selectedHour - 12;
            this._selectedHour = this._selectedHour === 0 ? 12 : this._selectedHour;
        }
        if (this.hourView) {
            /** @type {?} */
            const outer = this._selectedHour > 0 && this._selectedHour < 13;
            radius = outer ? CLOCK_OUTER_RADIUS : CLOCK_INNER_RADIUS;
            if (this.twelveHour) {
                radius = CLOCK_OUTER_RADIUS;
            }
            deg = Math.round(this._selectedHour * (360 / (24 / 2)));
        }
        else {
            deg = Math.round(this._selectedMinute * (360 / 60));
        }
        return {
            transform: `rotate(${deg}deg)`,
            height: `${radius}%`,
            'margin-top': `${50 - radius}%`
        };
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._init();
    }
    // Handles mousedown events on the clock body.
    /**
     * @param {?} event
     * @return {?}
     */
    _handleMousedown(event) {
        this.setTime(event);
        document.addEventListener('mousemove', this.mouseMoveListener);
        document.addEventListener('touchmove', this.mouseMoveListener);
        document.addEventListener('mouseup', this.mouseUpListener);
        document.addEventListener('touchend', this.mouseUpListener);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _handleMousemove(event) {
        event.preventDefault();
        this.setTime(event);
    }
    /**
     * @return {?}
     */
    _handleMouseup() {
        document.removeEventListener('mousemove', this.mouseMoveListener);
        document.removeEventListener('touchmove', this.mouseMoveListener);
        document.removeEventListener('mouseup', this.mouseUpListener);
        document.removeEventListener('touchend', this.mouseUpListener);
    }
    // Initializes this clock view.
    /**
     * @return {?}
     */
    _init() {
        this._hours.length = 0;
        this._minutes.length = 0;
        /** @type {?} */
        const hourNames = this._dateAdapter.getHourNames();
        /** @type {?} */
        const minuteNames = this._dateAdapter.getMinuteNames();
        if (this.twelveHour) {
            this._anteMeridian = this._dateAdapter.getHours(this.activeDate) < 12;
            for (let i = 0; i < hourNames.length / 2; i++) {
                /** @type {?} */
                const radian = i / 6 * Math.PI;
                /** @type {?} */
                const radius = CLOCK_OUTER_RADIUS;
                /** @type {?} */
                const date = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), this._dateAdapter.getMonth(this.activeDate), this._dateAdapter.getDate(this.activeDate), this._anteMeridian ? i : i + 12);
                this._hours.push({
                    value: i,
                    displayValue: i === 0 ? '12' : hourNames[i],
                    enabled: !this.dateFilter || this.dateFilter(date, 'hour'),
                    top: CLOCK_RADIUS - Math.cos(radian) * radius - CLOCK_TICK_RADIUS,
                    left: CLOCK_RADIUS + Math.sin(radian) * radius - CLOCK_TICK_RADIUS
                });
            }
        }
        else {
            for (let i = 0; i < hourNames.length; i++) {
                /** @type {?} */
                const radian = i / 6 * Math.PI;
                /** @type {?} */
                const outer = i > 0 && i < 13;
                /** @type {?} */
                const radius = outer ? CLOCK_OUTER_RADIUS : CLOCK_INNER_RADIUS;
                /** @type {?} */
                const date = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), this._dateAdapter.getMonth(this.activeDate), this._dateAdapter.getDate(this.activeDate), i);
                this._hours.push({
                    value: i,
                    displayValue: i === 0 ? '12' : hourNames[i],
                    enabled: !this.dateFilter || this.dateFilter(date, 'hour'),
                    top: CLOCK_RADIUS - Math.cos(radian) * radius - CLOCK_TICK_RADIUS,
                    left: CLOCK_RADIUS + Math.sin(radian) * radius - CLOCK_TICK_RADIUS,
                    fontSize: i > 0 && i < 13 ? '' : '80%'
                });
            }
        }
        for (let i = 0; i < minuteNames.length; i += 5) {
            /** @type {?} */
            const radian = i / 30 * Math.PI;
            /** @type {?} */
            const date = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), this._dateAdapter.getMonth(this.activeDate), this._dateAdapter.getDate(this.activeDate), this._dateAdapter.getHours(this.activeDate), i);
            this._minutes.push({
                value: i,
                displayValue: i === 0 ? '00' : minuteNames[i],
                enabled: !this.dateFilter || this.dateFilter(date, 'minute'),
                top: CLOCK_RADIUS - Math.cos(radian) * CLOCK_OUTER_RADIUS - CLOCK_TICK_RADIUS,
                left: CLOCK_RADIUS + Math.sin(radian) * CLOCK_OUTER_RADIUS - CLOCK_TICK_RADIUS
            });
        }
        this._changeDetectorRef.markForCheck();
    }
    // Set Time
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    setTime(event) {
        /** @type {?} */
        const trigger = this._element.nativeElement;
        /** @type {?} */
        const triggerRect = trigger.getBoundingClientRect();
        /** @type {?} */
        const width = trigger.offsetWidth;
        /** @type {?} */
        const height = trigger.offsetHeight;
        /** @type {?} */
        const pageX = event.pageX !== undefined ? event.pageX : event.touches[0].pageX;
        /** @type {?} */
        const pageY = event.pageY !== undefined ? event.pageY : event.touches[0].pageY;
        /** @type {?} */
        const x = width / 2 - (pageX - triggerRect.left - window.pageXOffset);
        /** @type {?} */
        const y = height / 2 - (pageY - triggerRect.top - window.pageYOffset);
        /** @type {?} */
        const unit = Math.PI / (this.hourView ? 6 : this.clockStep ? 30 / this.clockStep : 30);
        /** @type {?} */
        const z = Math.sqrt(x * x + y * y);
        /** @type {?} */
        const outer = this.hourView && z > (width * (CLOCK_OUTER_RADIUS / 100) + width * (CLOCK_INNER_RADIUS / 100)) / 2;
        /** @type {?} */
        let radian = Math.atan2(-x, y);
        if (radian < 0) {
            radian = Math.PI * 2 + radian;
        }
        /** @type {?} */
        let value = Math.round(radian / unit);
        /** @type {?} */
        const date = this._dateAdapter.clone(this.activeDate);
        if (this.hourView) {
            if (value === 12) {
                value = 0;
            }
            value = this.twelveHour
                ? this._anteMeridian ? value : value + 12
                : outer ? (value === 0 ? 12 : value) : value === 0 ? 0 : value + 12;
            this._dateAdapter.setHours(date, value);
        }
        else {
            if (this.clockStep) {
                value *= this.clockStep;
            }
            if (value === 60) {
                value = 0;
            }
            this._dateAdapter.setMinutes(date, value);
        }
        // validate if the resulting value is disabled and do not take action
        if (this.dateFilter && !this.dateFilter(date, this.hourView ? 'hour' : 'minute')) {
            return;
        }
        this.activeDate = date;
        if (this.hourView) {
            this.changeView.emit();
            this.selectedChange.emit(this.activeDate);
        }
        else {
            this.selectedTime.emit(this.activeDate);
        }
    }
    /**
     * @return {?}
     */
    _focusActiveCell() { }
    /**
     * @private
     * @param {?} obj The object to check.
     * @return {?} The given object if it is both a date instance and valid, otherwise null.
     */
    _getValidDateOrNull(obj) {
        return this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj) ? obj : null;
    }
}
MatClockView.decorators = [
    { type: Component, args: [{
                selector: 'mat-clock-view',
                template: "<div class=\"mat-clock\">\r\n  <div class=\"mat-clock-center\"></div>\r\n  <div class=\"mat-clock-hand\" [ngStyle]=\"_hand\"></div>\r\n\r\n  <div class=\"mat-clock-hours\" [class.active]=\"hourView\">\r\n    <div *ngFor=\"let item of _hours\"\r\n      class=\"mat-clock-cell\"\r\n      [class.mat-clock-cell-selected]=\"_selectedHour == item.value\"\r\n      [class.mat-clock-cell-disabled]=\"!item.enabled\"\r\n      [style.top.%]=\"item.top\"\r\n      [style.left.%]=\"item.left\"\r\n      [style.fontSize]=\"item.fontSize\">\r\n      {{ item.displayValue }}\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"mat-clock-minutes\" [class.active]=\"!hourView\">\r\n    <div *ngFor=\"let item of _minutes\"\r\n      class=\"mat-clock-cell\"\r\n      [class.mat-clock-cell-selected]=\"_selectedMinute == item.value\"\r\n      [class.mat-clock-cell-disabled]=\"!item.enabled\"\r\n      [style.top.%]=\"item.top\"\r\n      [style.left.%]=\"item.left\">\r\n      {{ item.displayValue }}\r\n    </div>\r\n  </div>\r\n</div>\r\n",
                exportAs: 'matClockView',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    role: 'clock',
                    '(mousedown)': '_handleMousedown($event)'
                },
                preserveWhitespaces: false
            }] }
];
/** @nocollapse */
MatClockView.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: DateAdapter, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_DATE_FORMATS,] }] }
];
MatClockView.propDecorators = {
    activeDate: [{ type: Input }],
    selected: [{ type: Input }],
    minDate: [{ type: Input }],
    maxDate: [{ type: Input }],
    dateFilter: [{ type: Input }],
    clockStep: [{ type: Input }],
    twelveHour: [{ type: Input }],
    hourView: [{ type: Input }],
    selectedTime: [{ type: Output }],
    selectedChange: [{ type: Output }],
    changeView: [{ type: Output }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    MatClockView.prototype._activeDate;
    /**
     * @type {?}
     * @private
     */
    MatClockView.prototype._selected;
    /**
     * @type {?}
     * @private
     */
    MatClockView.prototype._minDate;
    /**
     * @type {?}
     * @private
     */
    MatClockView.prototype._maxDate;
    /** @type {?} */
    MatClockView.prototype.dateFilter;
    /** @type {?} */
    MatClockView.prototype.clockStep;
    /** @type {?} */
    MatClockView.prototype.twelveHour;
    /** @type {?} */
    MatClockView.prototype.hourView;
    /** @type {?} */
    MatClockView.prototype.selectedTime;
    /** @type {?} */
    MatClockView.prototype.selectedChange;
    /** @type {?} */
    MatClockView.prototype.changeView;
    /** @type {?} */
    MatClockView.prototype._hours;
    /** @type {?} */
    MatClockView.prototype._minutes;
    /** @type {?} */
    MatClockView.prototype._selectedHour;
    /** @type {?} */
    MatClockView.prototype._selectedMinute;
    /** @type {?} */
    MatClockView.prototype._anteMeridian;
    /**
     * @type {?}
     * @private
     */
    MatClockView.prototype.mouseMoveListener;
    /**
     * @type {?}
     * @private
     */
    MatClockView.prototype.mouseUpListener;
    /**
     * @type {?}
     * @private
     */
    MatClockView.prototype._changeDetectorRef;
    /**
     * @type {?}
     * @private
     */
    MatClockView.prototype._element;
    /** @type {?} */
    MatClockView.prototype._dateAdapter;
    /**
     * @type {?}
     * @private
     */
    MatClockView.prototype._dateFormats;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvY2stdmlldy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtYXJ0aW5kYWxlYy9kYXRlcGlja2VyLyIsInNvdXJjZXMiOlsiY2xvY2stdmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZ0JBQWdCLEVBQWtCLE1BQU0sY0FBYyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDM0MsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0scUJBQXFCLENBQUM7O0FBRWpFLE1BQU0sT0FBTyxZQUFZLEdBQUcsRUFBRTs7QUFDOUIsTUFBTSxPQUFPLGtCQUFrQixHQUFHLElBQUk7O0FBQ3RDLE1BQU0sT0FBTyxrQkFBa0IsR0FBRyxLQUFLOztBQUN2QyxNQUFNLE9BQU8saUJBQWlCLEdBQUcsTUFBTTs7Ozs7O0FBb0J2QyxNQUFNLE9BQU8sWUFBWTs7Ozs7OztJQTRHdkIsWUFDVSxrQkFBcUMsRUFDckMsUUFBb0IsRUFDVCxZQUE0QixFQUd2QyxZQUE0QjtRQUw1Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBQ3JDLGFBQVEsR0FBUixRQUFRLENBQVk7UUFDVCxpQkFBWSxHQUFaLFlBQVksQ0FBZ0I7UUFHdkMsaUJBQVksR0FBWixZQUFZLENBQWdCO1FBOUQ3QixjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBRWQsZUFBVSxHQUFHLEtBQUssQ0FBQzs7UUFHbkIsYUFBUSxHQUFHLElBQUksQ0FBQzs7UUFHTixpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFLLENBQUM7O1FBR3JDLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQUssQ0FBQzs7UUFHdkMs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QUMsQ0FBQyxJQUFJLENBQUM7SUFDOUYsQ0FBQzs7O1lBN1NGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixzZ0NBQThCO2dCQUM5QixRQUFRLEVBQUUsY0FBYztnQkFDeEIsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxJQUFJLEVBQUU7b0JBQ0osSUFBSSxFQUFFLE9BQU87b0JBQ2IsYUFBYSxFQUFFLDBCQUEwQjtpQkFDMUM7Z0JBQ0QsbUJBQW1CLEVBQUUsS0FBSzthQUMzQjs7OztZQXBDQyxpQkFBaUI7WUFFakIsVUFBVTtZQVNILFdBQVcsdUJBeUlmLFFBQVE7NENBQ1IsUUFBUSxZQUNSLE1BQU0sU0FBQyxnQkFBZ0I7Ozt5QkE3R3pCLEtBQUs7dUJBZ0JMLEtBQUs7c0JBVUwsS0FBSztzQkFVTCxLQUFLO3lCQVVMLEtBQUs7d0JBRUwsS0FBSzt5QkFFTCxLQUFLO3VCQUdMLEtBQUs7MkJBR0wsTUFBTTs2QkFHTixNQUFNO3lCQUdOLE1BQU07Ozs7Ozs7SUFqRFAsbUNBQXVCOzs7OztJQVV2QixpQ0FBNEI7Ozs7O0lBVTVCLGdDQUEyQjs7Ozs7SUFVM0IsZ0NBQTJCOztJQUczQixrQ0FBeUQ7O0lBRXpELGlDQUF1Qjs7SUFFdkIsa0NBQTRCOztJQUc1QixnQ0FBeUI7O0lBR3pCLG9DQUF3RDs7SUFHeEQsc0NBQTBEOztJQUcxRCxrQ0FBeUQ7O0lBR3pELDhCQUF3Qjs7SUFDeEIsZ0NBQTBCOztJQUUxQixxQ0FBNkI7O0lBQzdCLHVDQUErQjs7SUFDL0IscUNBQXVCOzs7OztJQUV2Qix5Q0FBK0I7Ozs7O0lBQy9CLHVDQUE2Qjs7Ozs7SUFnQzNCLDBDQUE2Qzs7Ozs7SUFDN0MsZ0NBQTRCOztJQUM1QixvQ0FBK0M7Ozs7O0lBQy9DLG9DQUVvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQWZ0ZXJDb250ZW50SW5pdCxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBDb21wb25lbnQsXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSW5qZWN0LFxyXG4gIElucHV0LFxyXG4gIE9wdGlvbmFsLFxyXG4gIE91dHB1dCxcclxuICBWaWV3RW5jYXBzdWxhdGlvblxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNQVRfREFURV9GT1JNQVRTLCBNYXREYXRlRm9ybWF0cyB9IGZyb20gJy4vY29yZS9pbmRleCc7XHJcbmltcG9ydCB7IERhdGVBZGFwdGVyIH0gZnJvbSAnLi9jb3JlL2luZGV4JztcclxuaW1wb3J0IHsgY3JlYXRlTWlzc2luZ0RhdGVJbXBsRXJyb3IgfSBmcm9tICcuL2RhdGVwaWNrZXItZXJyb3JzJztcclxuXHJcbmV4cG9ydCBjb25zdCBDTE9DS19SQURJVVMgPSA1MDtcclxuZXhwb3J0IGNvbnN0IENMT0NLX0lOTkVSX1JBRElVUyA9IDI3LjU7XHJcbmV4cG9ydCBjb25zdCBDTE9DS19PVVRFUl9SQURJVVMgPSA0MS4yNTtcclxuZXhwb3J0IGNvbnN0IENMT0NLX1RJQ0tfUkFESVVTID0gNy4wODMzO1xyXG5cclxuZXhwb3J0IHR5cGUgQ2xvY2tWaWV3ID0gJ2hvdXInIHwgJ21pbnV0ZSc7XHJcblxyXG4vKipcclxuICogQSBjbG9jayB0aGF0IGlzIHVzZWQgYXMgcGFydCBvZiB0aGUgZGF0ZXBpY2tlci5cclxuICogQGRvY3MtcHJpdmF0ZVxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdtYXQtY2xvY2stdmlldycsXHJcbiAgdGVtcGxhdGVVcmw6ICdjbG9jay12aWV3Lmh0bWwnLFxyXG4gIGV4cG9ydEFzOiAnbWF0Q2xvY2tWaWV3JyxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIGhvc3Q6IHtcclxuICAgIHJvbGU6ICdjbG9jaycsXHJcbiAgICAnKG1vdXNlZG93biknOiAnX2hhbmRsZU1vdXNlZG93bigkZXZlbnQpJ1xyXG4gIH0sXHJcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2VcclxufSlcclxuZXhwb3J0IGNsYXNzIE1hdENsb2NrVmlldzxEPiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xyXG4gIC8qKlxyXG4gICAqIFRoZSB0aW1lIHRvIGRpc3BsYXkgaW4gdGhpcyBjbG9jayB2aWV3LiAodGhlIHJlc3QgaXMgaWdub3JlZClcclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIGdldCBhY3RpdmVEYXRlKCk6IEQge1xyXG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZURhdGU7XHJcbiAgfVxyXG4gIHNldCBhY3RpdmVEYXRlKHZhbHVlOiBEKSB7XHJcbiAgICBjb25zdCBvbGRBY3RpdmVEYXRlID0gdGhpcy5fYWN0aXZlRGF0ZTtcclxuICAgIGNvbnN0IHZhbGlkRGF0ZSA9IHRoaXMuX2dldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLl9kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpIHx8IHRoaXMuX2RhdGVBZGFwdGVyLnRvZGF5KCk7XHJcbiAgICB0aGlzLl9hY3RpdmVEYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuY2xhbXBEYXRlKHZhbGlkRGF0ZSwgdGhpcy5taW5EYXRlLCB0aGlzLm1heERhdGUpO1xyXG5cclxuICAgIGlmIChvbGRBY3RpdmVEYXRlICYmIHRoaXMuX2RhdGVBZGFwdGVyLmNvbXBhcmVEYXRlKG9sZEFjdGl2ZURhdGUsIHRoaXMuX2FjdGl2ZURhdGUsICdtaW51dGUnKSkge1xyXG4gICAgICB0aGlzLl9pbml0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHByaXZhdGUgX2FjdGl2ZURhdGU6IEQ7XHJcblxyXG4gIC8vIFRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgZGF0ZS5cclxuICBASW5wdXQoKVxyXG4gIGdldCBzZWxlY3RlZCgpOiBEIHwgbnVsbCB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XHJcbiAgfVxyXG4gIHNldCBzZWxlY3RlZCh2YWx1ZTogRCB8IG51bGwpIHtcclxuICAgIHRoaXMuX3NlbGVjdGVkID0gdGhpcy5fZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuX2RhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3NlbGVjdGVkOiBEIHwgbnVsbDtcclxuXHJcbiAgLyoqIFRoZSBtaW5pbXVtIHNlbGVjdGFibGUgZGF0ZS4gKi9cclxuICBASW5wdXQoKVxyXG4gIGdldCBtaW5EYXRlKCk6IEQgfCBudWxsIHtcclxuICAgIHJldHVybiB0aGlzLl9taW5EYXRlO1xyXG4gIH1cclxuICBzZXQgbWluRGF0ZSh2YWx1ZTogRCB8IG51bGwpIHtcclxuICAgIHRoaXMuX21pbkRhdGUgPSB0aGlzLl9nZXRWYWxpZERhdGVPck51bGwodGhpcy5fZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfbWluRGF0ZTogRCB8IG51bGw7XHJcblxyXG4gIC8qKiBUaGUgbWF4aW11bSBzZWxlY3RhYmxlIGRhdGUuICovXHJcbiAgQElucHV0KClcclxuICBnZXQgbWF4RGF0ZSgpOiBEIHwgbnVsbCB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWF4RGF0ZTtcclxuICB9XHJcbiAgc2V0IG1heERhdGUodmFsdWU6IEQgfCBudWxsKSB7XHJcbiAgICB0aGlzLl9tYXhEYXRlID0gdGhpcy5fZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuX2RhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX21heERhdGU6IEQgfCBudWxsO1xyXG5cclxuICAvLyBBIGZ1bmN0aW9uIHVzZWQgdG8gZmlsdGVyIHdoaWNoIGRhdGVzIGFyZSBzZWxlY3RhYmxlLlxyXG4gIEBJbnB1dCgpIGRhdGVGaWx0ZXI6IChkYXRlOiBELCB1bml0Pzogc3RyaW5nKSA9PiBib29sZWFuO1xyXG5cclxuICBASW5wdXQoKSBjbG9ja1N0ZXAgPSAxO1xyXG5cclxuICBASW5wdXQoKSB0d2VsdmVIb3VyID0gZmFsc2U7XHJcblxyXG4gIC8vIFdoZXRoZXIgdGhlIGNsb2NrIGlzIGluIGhvdXIgdmlldy5cclxuICBASW5wdXQoKSBob3VyVmlldyA9IHRydWU7XHJcblxyXG4gIC8vIEVtaXRzIHdoZW4gdGhlIGZpbmFsIHRpbWUgd2FzIHNlbGVjdGVkLlxyXG4gIEBPdXRwdXQoKSByZWFkb25seSBzZWxlY3RlZFRpbWUgPSBuZXcgRXZlbnRFbWl0dGVyPEQ+KCk7XHJcblxyXG4gIC8vIEVtaXRzIHdoZW4gdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBkYXRlIGNoYW5nZXMuXHJcbiAgQE91dHB1dCgpIHJlYWRvbmx5IHNlbGVjdGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxEPigpO1xyXG5cclxuICAvLyBFbWl0cyB3aGVuIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgZGF0ZSBjaGFuZ2VzLlxyXG4gIEBPdXRwdXQoKSByZWFkb25seSBjaGFuZ2VWaWV3ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xyXG5cclxuICAvLyBIb3VycyBhbmQgTWludXRlcyByZXByZXNlbnRpbmcgdGhlIGNsb2NrIHZpZXcuXHJcbiAgX2hvdXJzOiBBcnJheTxhbnk+ID0gW107XHJcbiAgX21pbnV0ZXM6IEFycmF5PGFueT4gPSBbXTtcclxuXHJcbiAgX3NlbGVjdGVkSG91cjogbnVtYmVyIHwgbnVsbDtcclxuICBfc2VsZWN0ZWRNaW51dGU6IG51bWJlciB8IG51bGw7XHJcbiAgX2FudGVNZXJpZGlhbjogYm9vbGVhbjtcclxuXHJcbiAgcHJpdmF0ZSBtb3VzZU1vdmVMaXN0ZW5lcjogYW55O1xyXG4gIHByaXZhdGUgbW91c2VVcExpc3RlbmVyOiBhbnk7XHJcblxyXG4gIGdldCBfaGFuZCgpOiBhbnkge1xyXG4gICAgdGhpcy5fc2VsZWN0ZWRIb3VyID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0SG91cnModGhpcy5hY3RpdmVEYXRlKTtcclxuICAgIHRoaXMuX3NlbGVjdGVkTWludXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0TWludXRlcyh0aGlzLmFjdGl2ZURhdGUpO1xyXG4gICAgbGV0IHJhZGl1cyA9IENMT0NLX09VVEVSX1JBRElVUztcclxuICAgIGxldCBkZWcgPSAwO1xyXG5cclxuICAgIGlmICh0aGlzLnR3ZWx2ZUhvdXIpIHtcclxuICAgICAgdGhpcy5fc2VsZWN0ZWRIb3VyID0gdGhpcy5fc2VsZWN0ZWRIb3VyIDwgMTIgPyB0aGlzLl9zZWxlY3RlZEhvdXIgOiB0aGlzLl9zZWxlY3RlZEhvdXIgLSAxMjtcclxuICAgICAgdGhpcy5fc2VsZWN0ZWRIb3VyID0gdGhpcy5fc2VsZWN0ZWRIb3VyID09PSAwID8gMTIgOiB0aGlzLl9zZWxlY3RlZEhvdXI7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuaG91clZpZXcpIHtcclxuICAgICAgY29uc3Qgb3V0ZXIgPSB0aGlzLl9zZWxlY3RlZEhvdXIgPiAwICYmIHRoaXMuX3NlbGVjdGVkSG91ciA8IDEzO1xyXG4gICAgICByYWRpdXMgPSBvdXRlciA/IENMT0NLX09VVEVSX1JBRElVUyA6IENMT0NLX0lOTkVSX1JBRElVUztcclxuICAgICAgaWYgKHRoaXMudHdlbHZlSG91cikge1xyXG4gICAgICAgIHJhZGl1cyA9IENMT0NLX09VVEVSX1JBRElVUztcclxuICAgICAgfVxyXG4gICAgICBkZWcgPSBNYXRoLnJvdW5kKHRoaXMuX3NlbGVjdGVkSG91ciAqICgzNjAgLyAoMjQgLyAyKSkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGVnID0gTWF0aC5yb3VuZCh0aGlzLl9zZWxlY3RlZE1pbnV0ZSAqICgzNjAgLyA2MCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRyYW5zZm9ybTogYHJvdGF0ZSgke2RlZ31kZWcpYCxcclxuICAgICAgaGVpZ2h0OiBgJHtyYWRpdXN9JWAsXHJcbiAgICAgICdtYXJnaW4tdG9wJzogYCR7NTAgLSByYWRpdXN9JWBcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcbiAgICBAT3B0aW9uYWwoKSBwdWJsaWMgX2RhdGVBZGFwdGVyOiBEYXRlQWRhcHRlcjxEPixcclxuICAgIEBPcHRpb25hbCgpXHJcbiAgICBASW5qZWN0KE1BVF9EQVRFX0ZPUk1BVFMpXHJcbiAgICBwcml2YXRlIF9kYXRlRm9ybWF0czogTWF0RGF0ZUZvcm1hdHNcclxuICApIHtcclxuICAgIGlmICghdGhpcy5fZGF0ZUFkYXB0ZXIpIHtcclxuICAgICAgdGhyb3cgY3JlYXRlTWlzc2luZ0RhdGVJbXBsRXJyb3IoJ0RhdGVBZGFwdGVyJyk7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMuX2RhdGVGb3JtYXRzKSB7XHJcbiAgICAgIHRocm93IGNyZWF0ZU1pc3NpbmdEYXRlSW1wbEVycm9yKCdNQVRfREFURV9GT1JNQVRTJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5tb3VzZU1vdmVMaXN0ZW5lciA9IChldmVudDogYW55KSA9PiB7XHJcbiAgICAgIHRoaXMuX2hhbmRsZU1vdXNlbW92ZShldmVudCk7XHJcbiAgICB9O1xyXG4gICAgdGhpcy5tb3VzZVVwTGlzdGVuZXIgPSAoKSA9PiB7XHJcbiAgICAgIHRoaXMuX2hhbmRsZU1vdXNldXAoKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICB0aGlzLl9pbml0KCk7XHJcbiAgfVxyXG5cclxuICAvLyBIYW5kbGVzIG1vdXNlZG93biBldmVudHMgb24gdGhlIGNsb2NrIGJvZHkuXHJcbiAgX2hhbmRsZU1vdXNlZG93bihldmVudDogYW55KSB7XHJcbiAgICB0aGlzLnNldFRpbWUoZXZlbnQpO1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5tb3VzZU1vdmVMaXN0ZW5lcik7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLm1vdXNlTW92ZUxpc3RlbmVyKTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm1vdXNlVXBMaXN0ZW5lcik7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMubW91c2VVcExpc3RlbmVyKTtcclxuICB9XHJcblxyXG4gIF9oYW5kbGVNb3VzZW1vdmUoZXZlbnQ6IGFueSkge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIHRoaXMuc2V0VGltZShldmVudCk7XHJcbiAgfVxyXG5cclxuICBfaGFuZGxlTW91c2V1cCgpIHtcclxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMubW91c2VNb3ZlTGlzdGVuZXIpO1xyXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5tb3VzZU1vdmVMaXN0ZW5lcik7XHJcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5tb3VzZVVwTGlzdGVuZXIpO1xyXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLm1vdXNlVXBMaXN0ZW5lcik7XHJcbiAgfVxyXG5cclxuICAvLyBJbml0aWFsaXplcyB0aGlzIGNsb2NrIHZpZXcuXHJcbiAgX2luaXQoKSB7XHJcbiAgICB0aGlzLl9ob3Vycy5sZW5ndGggPSAwO1xyXG4gICAgdGhpcy5fbWludXRlcy5sZW5ndGggPSAwO1xyXG5cclxuICAgIGNvbnN0IGhvdXJOYW1lcyA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldEhvdXJOYW1lcygpO1xyXG4gICAgY29uc3QgbWludXRlTmFtZXMgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRNaW51dGVOYW1lcygpO1xyXG5cclxuICAgIGlmICh0aGlzLnR3ZWx2ZUhvdXIpIHtcclxuICAgICAgdGhpcy5fYW50ZU1lcmlkaWFuID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0SG91cnModGhpcy5hY3RpdmVEYXRlKSA8IDEyO1xyXG5cclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBob3VyTmFtZXMubGVuZ3RoIC8gMjsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgcmFkaWFuID0gaSAvIDYgKiBNYXRoLlBJO1xyXG4gICAgICAgIGNvbnN0IHJhZGl1cyA9IENMT0NLX09VVEVSX1JBRElVUztcclxuICAgICAgICBjb25zdCBkYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuY3JlYXRlRGF0ZShcclxuICAgICAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmdldFllYXIodGhpcy5hY3RpdmVEYXRlKSxcclxuICAgICAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmdldE1vbnRoKHRoaXMuYWN0aXZlRGF0ZSksXHJcbiAgICAgICAgICB0aGlzLl9kYXRlQWRhcHRlci5nZXREYXRlKHRoaXMuYWN0aXZlRGF0ZSksXHJcbiAgICAgICAgICB0aGlzLl9hbnRlTWVyaWRpYW4gPyBpIDogaSArIDEyXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLl9ob3Vycy5wdXNoKHtcclxuICAgICAgICAgIHZhbHVlOiBpLFxyXG4gICAgICAgICAgZGlzcGxheVZhbHVlOiBpID09PSAwID8gJzEyJyA6IGhvdXJOYW1lc1tpXSxcclxuICAgICAgICAgIGVuYWJsZWQ6ICF0aGlzLmRhdGVGaWx0ZXIgfHwgdGhpcy5kYXRlRmlsdGVyKGRhdGUsICdob3VyJyksXHJcbiAgICAgICAgICB0b3A6IENMT0NLX1JBRElVUyAtIE1hdGguY29zKHJhZGlhbikgKiByYWRpdXMgLSBDTE9DS19USUNLX1JBRElVUyxcclxuICAgICAgICAgIGxlZnQ6IENMT0NLX1JBRElVUyArIE1hdGguc2luKHJhZGlhbikgKiByYWRpdXMgLSBDTE9DS19USUNLX1JBRElVU1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhvdXJOYW1lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHJhZGlhbiA9IGkgLyA2ICogTWF0aC5QSTtcclxuICAgICAgICBjb25zdCBvdXRlciA9IGkgPiAwICYmIGkgPCAxMztcclxuICAgICAgICBjb25zdCByYWRpdXMgPSBvdXRlciA/IENMT0NLX09VVEVSX1JBRElVUyA6IENMT0NLX0lOTkVSX1JBRElVUztcclxuICAgICAgICBjb25zdCBkYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuY3JlYXRlRGF0ZShcclxuICAgICAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmdldFllYXIodGhpcy5hY3RpdmVEYXRlKSxcclxuICAgICAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmdldE1vbnRoKHRoaXMuYWN0aXZlRGF0ZSksXHJcbiAgICAgICAgICB0aGlzLl9kYXRlQWRhcHRlci5nZXREYXRlKHRoaXMuYWN0aXZlRGF0ZSksXHJcbiAgICAgICAgICBpXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLl9ob3Vycy5wdXNoKHtcclxuICAgICAgICAgIHZhbHVlOiBpLFxyXG4gICAgICAgICAgZGlzcGxheVZhbHVlOiBpID09PSAwID8gJzEyJyA6IGhvdXJOYW1lc1tpXSxcclxuICAgICAgICAgIGVuYWJsZWQ6ICF0aGlzLmRhdGVGaWx0ZXIgfHwgdGhpcy5kYXRlRmlsdGVyKGRhdGUsICdob3VyJyksXHJcbiAgICAgICAgICB0b3A6IENMT0NLX1JBRElVUyAtIE1hdGguY29zKHJhZGlhbikgKiByYWRpdXMgLSBDTE9DS19USUNLX1JBRElVUyxcclxuICAgICAgICAgIGxlZnQ6IENMT0NLX1JBRElVUyArIE1hdGguc2luKHJhZGlhbikgKiByYWRpdXMgLSBDTE9DS19USUNLX1JBRElVUyxcclxuICAgICAgICAgIGZvbnRTaXplOiBpID4gMCAmJiBpIDwgMTMgPyAnJyA6ICc4MCUnXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1pbnV0ZU5hbWVzLmxlbmd0aDsgaSArPSA1KSB7XHJcbiAgICAgIGNvbnN0IHJhZGlhbiA9IGkgLyAzMCAqIE1hdGguUEk7XHJcbiAgICAgIGNvbnN0IGRhdGUgPSB0aGlzLl9kYXRlQWRhcHRlci5jcmVhdGVEYXRlKFxyXG4gICAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmdldFllYXIodGhpcy5hY3RpdmVEYXRlKSxcclxuICAgICAgICB0aGlzLl9kYXRlQWRhcHRlci5nZXRNb250aCh0aGlzLmFjdGl2ZURhdGUpLFxyXG4gICAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmdldERhdGUodGhpcy5hY3RpdmVEYXRlKSxcclxuICAgICAgICB0aGlzLl9kYXRlQWRhcHRlci5nZXRIb3Vycyh0aGlzLmFjdGl2ZURhdGUpLFxyXG4gICAgICAgIGlcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5fbWludXRlcy5wdXNoKHtcclxuICAgICAgICB2YWx1ZTogaSxcclxuICAgICAgICBkaXNwbGF5VmFsdWU6IGkgPT09IDAgPyAnMDAnIDogbWludXRlTmFtZXNbaV0sXHJcbiAgICAgICAgZW5hYmxlZDogIXRoaXMuZGF0ZUZpbHRlciB8fCB0aGlzLmRhdGVGaWx0ZXIoZGF0ZSwgJ21pbnV0ZScpLFxyXG4gICAgICAgIHRvcDogQ0xPQ0tfUkFESVVTIC0gTWF0aC5jb3MocmFkaWFuKSAqIENMT0NLX09VVEVSX1JBRElVUyAtIENMT0NLX1RJQ0tfUkFESVVTLFxyXG4gICAgICAgIGxlZnQ6IENMT0NLX1JBRElVUyArIE1hdGguc2luKHJhZGlhbikgKiBDTE9DS19PVVRFUl9SQURJVVMgLSBDTE9DS19USUNLX1JBRElVU1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIC8vIFNldCBUaW1lXHJcbiAgcHJpdmF0ZSBzZXRUaW1lKGV2ZW50OiBhbnkpIHtcclxuICAgIGNvbnN0IHRyaWdnZXIgPSB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICBjb25zdCB0cmlnZ2VyUmVjdCA9IHRyaWdnZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICBjb25zdCB3aWR0aCA9IHRyaWdnZXIub2Zmc2V0V2lkdGg7XHJcbiAgICBjb25zdCBoZWlnaHQgPSB0cmlnZ2VyLm9mZnNldEhlaWdodDtcclxuICAgIGNvbnN0IHBhZ2VYID0gZXZlbnQucGFnZVggIT09IHVuZGVmaW5lZCA/IGV2ZW50LnBhZ2VYIDogZXZlbnQudG91Y2hlc1swXS5wYWdlWDtcclxuICAgIGNvbnN0IHBhZ2VZID0gZXZlbnQucGFnZVkgIT09IHVuZGVmaW5lZCA/IGV2ZW50LnBhZ2VZIDogZXZlbnQudG91Y2hlc1swXS5wYWdlWTtcclxuICAgIGNvbnN0IHggPSB3aWR0aCAvIDIgLSAocGFnZVggLSB0cmlnZ2VyUmVjdC5sZWZ0IC0gd2luZG93LnBhZ2VYT2Zmc2V0KTtcclxuICAgIGNvbnN0IHkgPSBoZWlnaHQgLyAyIC0gKHBhZ2VZIC0gdHJpZ2dlclJlY3QudG9wIC0gd2luZG93LnBhZ2VZT2Zmc2V0KTtcclxuICAgIGNvbnN0IHVuaXQgPSBNYXRoLlBJIC8gKHRoaXMuaG91clZpZXcgPyA2IDogdGhpcy5jbG9ja1N0ZXAgPyAzMCAvIHRoaXMuY2xvY2tTdGVwIDogMzApO1xyXG4gICAgY29uc3QgeiA9IE1hdGguc3FydCh4ICogeCArIHkgKiB5KTtcclxuICAgIGNvbnN0IG91dGVyID0gdGhpcy5ob3VyVmlldyAmJiB6ID4gKHdpZHRoICogKENMT0NLX09VVEVSX1JBRElVUyAvIDEwMCkgKyB3aWR0aCAqIChDTE9DS19JTk5FUl9SQURJVVMgLyAxMDApKSAvIDI7XHJcblxyXG4gICAgbGV0IHJhZGlhbiA9IE1hdGguYXRhbjIoLXgsIHkpO1xyXG4gICAgaWYgKHJhZGlhbiA8IDApIHtcclxuICAgICAgcmFkaWFuID0gTWF0aC5QSSAqIDIgKyByYWRpYW47XHJcbiAgICB9XHJcbiAgICBsZXQgdmFsdWUgPSBNYXRoLnJvdW5kKHJhZGlhbiAvIHVuaXQpO1xyXG5cclxuICAgIGNvbnN0IGRhdGUgPSB0aGlzLl9kYXRlQWRhcHRlci5jbG9uZSh0aGlzLmFjdGl2ZURhdGUpO1xyXG5cclxuICAgIGlmICh0aGlzLmhvdXJWaWV3KSB7XHJcbiAgICAgIGlmICh2YWx1ZSA9PT0gMTIpIHtcclxuICAgICAgICB2YWx1ZSA9IDA7XHJcbiAgICAgIH1cclxuICAgICAgdmFsdWUgPSB0aGlzLnR3ZWx2ZUhvdXJcclxuICAgICAgICA/IHRoaXMuX2FudGVNZXJpZGlhbiA/IHZhbHVlIDogdmFsdWUgKyAxMlxyXG4gICAgICAgIDogb3V0ZXIgPyAodmFsdWUgPT09IDAgPyAxMiA6IHZhbHVlKSA6IHZhbHVlID09PSAwID8gMCA6IHZhbHVlICsgMTI7XHJcbiAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLnNldEhvdXJzKGRhdGUsIHZhbHVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0aGlzLmNsb2NrU3RlcCkge1xyXG4gICAgICAgIHZhbHVlICo9IHRoaXMuY2xvY2tTdGVwO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh2YWx1ZSA9PT0gNjApIHtcclxuICAgICAgICB2YWx1ZSA9IDA7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIuc2V0TWludXRlcyhkYXRlLCB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdmFsaWRhdGUgaWYgdGhlIHJlc3VsdGluZyB2YWx1ZSBpcyBkaXNhYmxlZCBhbmQgZG8gbm90IHRha2UgYWN0aW9uXHJcbiAgICBpZiAodGhpcy5kYXRlRmlsdGVyICYmICF0aGlzLmRhdGVGaWx0ZXIoZGF0ZSwgdGhpcy5ob3VyVmlldyA/ICdob3VyJyA6ICdtaW51dGUnKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hY3RpdmVEYXRlID0gZGF0ZTtcclxuICAgIGlmICh0aGlzLmhvdXJWaWV3KSB7XHJcbiAgICAgIHRoaXMuY2hhbmdlVmlldy5lbWl0KCk7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdCh0aGlzLmFjdGl2ZURhdGUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZFRpbWUuZW1pdCh0aGlzLmFjdGl2ZURhdGUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX2ZvY3VzQWN0aXZlQ2VsbCgpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBvYmogVGhlIG9iamVjdCB0byBjaGVjay5cclxuICAgKiBAcmV0dXJucyBUaGUgZ2l2ZW4gb2JqZWN0IGlmIGl0IGlzIGJvdGggYSBkYXRlIGluc3RhbmNlIGFuZCB2YWxpZCwgb3RoZXJ3aXNlIG51bGwuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZ2V0VmFsaWREYXRlT3JOdWxsKG9iajogYW55KTogRCB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RhdGVBZGFwdGVyLmlzRGF0ZUluc3RhbmNlKG9iaikgJiYgdGhpcy5fZGF0ZUFkYXB0ZXIuaXNWYWxpZChvYmopID8gb2JqIDogbnVsbDtcclxuICB9XHJcbn1cclxuIl19