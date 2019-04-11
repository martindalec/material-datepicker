/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Input, Optional, Output, ViewEncapsulation } from '@angular/core';
import { MAT_DATE_FORMATS } from './core/index';
import { DateAdapter } from './core/index';
import { createMissingDateImplError } from './datepicker-errors';
/** @type {?} */
export var CLOCK_RADIUS = 50;
/** @type {?} */
export var CLOCK_INNER_RADIUS = 27.5;
/** @type {?} */
export var CLOCK_OUTER_RADIUS = 41.25;
/** @type {?} */
export var CLOCK_TICK_RADIUS = 7.0833;
/**
 * A clock that is used as part of the datepicker.
 * \@docs-private
 * @template D
 */
var MatClockView = /** @class */ (function () {
    function MatClockView(_changeDetectorRef, _element, _dateAdapter, _dateFormats) {
        var _this = this;
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
        function (event) {
            _this._handleMousemove(event);
        });
        this.mouseUpListener = (/**
         * @return {?}
         */
        function () {
            _this._handleMouseup();
        });
    }
    Object.defineProperty(MatClockView.prototype, "activeDate", {
        /**
         * The time to display in this clock view. (the rest is ignored)
         */
        get: /**
         * The time to display in this clock view. (the rest is ignored)
         * @return {?}
         */
        function () {
            return this._activeDate;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var oldActiveDate = this._activeDate;
            /** @type {?} */
            var validDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value)) || this._dateAdapter.today();
            this._activeDate = this._dateAdapter.clampDate(validDate, this.minDate, this.maxDate);
            if (oldActiveDate && this._dateAdapter.compareDate(oldActiveDate, this._activeDate, 'minute')) {
                this._init();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatClockView.prototype, "selected", {
        // The currently selected date.
        get: 
        // The currently selected date.
        /**
         * @return {?}
         */
        function () {
            return this._selected;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._selected = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatClockView.prototype, "minDate", {
        /** The minimum selectable date. */
        get: /**
         * The minimum selectable date.
         * @return {?}
         */
        function () {
            return this._minDate;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._minDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatClockView.prototype, "maxDate", {
        /** The maximum selectable date. */
        get: /**
         * The maximum selectable date.
         * @return {?}
         */
        function () {
            return this._maxDate;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._maxDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatClockView.prototype, "_hand", {
        get: /**
         * @return {?}
         */
        function () {
            this._selectedHour = this._dateAdapter.getHours(this.activeDate);
            this._selectedMinute = this._dateAdapter.getMinutes(this.activeDate);
            /** @type {?} */
            var radius = CLOCK_OUTER_RADIUS;
            /** @type {?} */
            var deg = 0;
            if (this.twelveHour) {
                this._selectedHour = this._selectedHour < 12 ? this._selectedHour : this._selectedHour - 12;
                this._selectedHour = this._selectedHour === 0 ? 12 : this._selectedHour;
            }
            if (this.hourView) {
                /** @type {?} */
                var outer = this._selectedHour > 0 && this._selectedHour < 13;
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
                transform: "rotate(" + deg + "deg)",
                height: radius + "%",
                'margin-top': 50 - radius + "%"
            };
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatClockView.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this._init();
    };
    // Handles mousedown events on the clock body.
    // Handles mousedown events on the clock body.
    /**
     * @param {?} event
     * @return {?}
     */
    MatClockView.prototype._handleMousedown = 
    // Handles mousedown events on the clock body.
    /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.setTime(event);
        document.addEventListener('mousemove', this.mouseMoveListener);
        document.addEventListener('touchmove', this.mouseMoveListener);
        document.addEventListener('mouseup', this.mouseUpListener);
        document.addEventListener('touchend', this.mouseUpListener);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MatClockView.prototype._handleMousemove = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        this.setTime(event);
    };
    /**
     * @return {?}
     */
    MatClockView.prototype._handleMouseup = /**
     * @return {?}
     */
    function () {
        document.removeEventListener('mousemove', this.mouseMoveListener);
        document.removeEventListener('touchmove', this.mouseMoveListener);
        document.removeEventListener('mouseup', this.mouseUpListener);
        document.removeEventListener('touchend', this.mouseUpListener);
    };
    // Initializes this clock view.
    // Initializes this clock view.
    /**
     * @return {?}
     */
    MatClockView.prototype._init = 
    // Initializes this clock view.
    /**
     * @return {?}
     */
    function () {
        this._hours.length = 0;
        this._minutes.length = 0;
        /** @type {?} */
        var hourNames = this._dateAdapter.getHourNames();
        /** @type {?} */
        var minuteNames = this._dateAdapter.getMinuteNames();
        if (this.twelveHour) {
            this._anteMeridian = this._dateAdapter.getHours(this.activeDate) < 12;
            for (var i = 0; i < hourNames.length / 2; i++) {
                /** @type {?} */
                var radian = i / 6 * Math.PI;
                /** @type {?} */
                var radius = CLOCK_OUTER_RADIUS;
                /** @type {?} */
                var date = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), this._dateAdapter.getMonth(this.activeDate), this._dateAdapter.getDate(this.activeDate), this._anteMeridian ? i : i + 12);
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
            for (var i = 0; i < hourNames.length; i++) {
                /** @type {?} */
                var radian = i / 6 * Math.PI;
                /** @type {?} */
                var outer = i > 0 && i < 13;
                /** @type {?} */
                var radius = outer ? CLOCK_OUTER_RADIUS : CLOCK_INNER_RADIUS;
                /** @type {?} */
                var date = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), this._dateAdapter.getMonth(this.activeDate), this._dateAdapter.getDate(this.activeDate), i);
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
        for (var i = 0; i < minuteNames.length; i += 5) {
            /** @type {?} */
            var radian = i / 30 * Math.PI;
            /** @type {?} */
            var date = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), this._dateAdapter.getMonth(this.activeDate), this._dateAdapter.getDate(this.activeDate), this._dateAdapter.getHours(this.activeDate), i);
            this._minutes.push({
                value: i,
                displayValue: i === 0 ? '00' : minuteNames[i],
                enabled: !this.dateFilter || this.dateFilter(date, 'minute'),
                top: CLOCK_RADIUS - Math.cos(radian) * CLOCK_OUTER_RADIUS - CLOCK_TICK_RADIUS,
                left: CLOCK_RADIUS + Math.sin(radian) * CLOCK_OUTER_RADIUS - CLOCK_TICK_RADIUS
            });
        }
        this._changeDetectorRef.markForCheck();
    };
    // Set Time
    // Set Time
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    MatClockView.prototype.setTime = 
    // Set Time
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var trigger = this._element.nativeElement;
        /** @type {?} */
        var triggerRect = trigger.getBoundingClientRect();
        /** @type {?} */
        var width = trigger.offsetWidth;
        /** @type {?} */
        var height = trigger.offsetHeight;
        /** @type {?} */
        var pageX = event.pageX !== undefined ? event.pageX : event.touches[0].pageX;
        /** @type {?} */
        var pageY = event.pageY !== undefined ? event.pageY : event.touches[0].pageY;
        /** @type {?} */
        var x = width / 2 - (pageX - triggerRect.left - window.pageXOffset);
        /** @type {?} */
        var y = height / 2 - (pageY - triggerRect.top - window.pageYOffset);
        /** @type {?} */
        var unit = Math.PI / (this.hourView ? 6 : this.clockStep ? 30 / this.clockStep : 30);
        /** @type {?} */
        var z = Math.sqrt(x * x + y * y);
        /** @type {?} */
        var outer = this.hourView && z > (width * (CLOCK_OUTER_RADIUS / 100) + width * (CLOCK_INNER_RADIUS / 100)) / 2;
        /** @type {?} */
        var radian = Math.atan2(-x, y);
        if (radian < 0) {
            radian = Math.PI * 2 + radian;
        }
        /** @type {?} */
        var value = Math.round(radian / unit);
        /** @type {?} */
        var date = this._dateAdapter.clone(this.activeDate);
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
    };
    /**
     * @return {?}
     */
    MatClockView.prototype._focusActiveCell = /**
     * @return {?}
     */
    function () { };
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    /**
     * @private
     * @param {?} obj The object to check.
     * @return {?} The given object if it is both a date instance and valid, otherwise null.
     */
    MatClockView.prototype._getValidDateOrNull = /**
     * @private
     * @param {?} obj The object to check.
     * @return {?} The given object if it is both a date instance and valid, otherwise null.
     */
    function (obj) {
        return this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj) ? obj : null;
    };
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
    MatClockView.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: DateAdapter, decorators: [{ type: Optional }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_DATE_FORMATS,] }] }
    ]; };
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
    return MatClockView;
}());
export { MatClockView };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvY2stdmlldy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtYXJ0aW5kYWxlYy9kYXRlcGlja2VyLyIsInNvdXJjZXMiOlsiY2xvY2stdmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZ0JBQWdCLEVBQWtCLE1BQU0sY0FBYyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDM0MsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0scUJBQXFCLENBQUM7O0FBRWpFLE1BQU0sS0FBTyxZQUFZLEdBQUcsRUFBRTs7QUFDOUIsTUFBTSxLQUFPLGtCQUFrQixHQUFHLElBQUk7O0FBQ3RDLE1BQU0sS0FBTyxrQkFBa0IsR0FBRyxLQUFLOztBQUN2QyxNQUFNLEtBQU8saUJBQWlCLEdBQUcsTUFBTTs7Ozs7O0FBUXZDO0lBd0hFLHNCQUNVLGtCQUFxQyxFQUNyQyxRQUFvQixFQUNULFlBQTRCLEVBR3ZDLFlBQTRCO1FBTnRDLGlCQXFCQztRQXBCUyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBQ3JDLGFBQVEsR0FBUixRQUFRLENBQVk7UUFDVCxpQkFBWSxHQUFaLFlBQVksQ0FBZ0I7UUFHdkMsaUJBQVksR0FBWixZQUFZLENBQWdCO1FBOUQ3QixjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBRWQsZUFBVSxHQUFHLEtBQUssQ0FBQzs7UUFHbkIsYUFBUSxHQUFHLElBQUksQ0FBQzs7UUFHTixpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFLLENBQUM7O1FBR3JDLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQUssQ0FBQzs7UUFHdkMsZUFBVSxHQUFH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LGdDQUEwQjs7SUFFMUIscUNBQTZCOztJQUM3Qix1Q0FBK0I7O0lBQy9CLHFDQUF1Qjs7Ozs7SUFFdkIseUNBQStCOzs7OztJQUMvQix1Q0FBNkI7Ozs7O0lBZ0MzQiwwQ0FBNkM7Ozs7O0lBQzdDLGdDQUE0Qjs7SUFDNUIsb0NBQStDOzs7OztJQUMvQyxvQ0FFb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIEFmdGVyQ29udGVudEluaXQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ29tcG9uZW50LFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIEluamVjdCxcclxuICBJbnB1dCxcclxuICBPcHRpb25hbCxcclxuICBPdXRwdXQsXHJcbiAgVmlld0VuY2Fwc3VsYXRpb25cclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTUFUX0RBVEVfRk9STUFUUywgTWF0RGF0ZUZvcm1hdHMgfSBmcm9tICcuL2NvcmUvaW5kZXgnO1xyXG5pbXBvcnQgeyBEYXRlQWRhcHRlciB9IGZyb20gJy4vY29yZS9pbmRleCc7XHJcbmltcG9ydCB7IGNyZWF0ZU1pc3NpbmdEYXRlSW1wbEVycm9yIH0gZnJvbSAnLi9kYXRlcGlja2VyLWVycm9ycyc7XHJcblxyXG5leHBvcnQgY29uc3QgQ0xPQ0tfUkFESVVTID0gNTA7XHJcbmV4cG9ydCBjb25zdCBDTE9DS19JTk5FUl9SQURJVVMgPSAyNy41O1xyXG5leHBvcnQgY29uc3QgQ0xPQ0tfT1VURVJfUkFESVVTID0gNDEuMjU7XHJcbmV4cG9ydCBjb25zdCBDTE9DS19USUNLX1JBRElVUyA9IDcuMDgzMztcclxuXHJcbmV4cG9ydCB0eXBlIENsb2NrVmlldyA9ICdob3VyJyB8ICdtaW51dGUnO1xyXG5cclxuLyoqXHJcbiAqIEEgY2xvY2sgdGhhdCBpcyB1c2VkIGFzIHBhcnQgb2YgdGhlIGRhdGVwaWNrZXIuXHJcbiAqIEBkb2NzLXByaXZhdGVcclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbWF0LWNsb2NrLXZpZXcnLFxyXG4gIHRlbXBsYXRlVXJsOiAnY2xvY2stdmlldy5odG1sJyxcclxuICBleHBvcnRBczogJ21hdENsb2NrVmlldycsXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBob3N0OiB7XHJcbiAgICByb2xlOiAnY2xvY2snLFxyXG4gICAgJyhtb3VzZWRvd24pJzogJ19oYW5kbGVNb3VzZWRvd24oJGV2ZW50KSdcclxuICB9LFxyXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXRDbG9ja1ZpZXc8RD4gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcclxuICAvKipcclxuICAgKiBUaGUgdGltZSB0byBkaXNwbGF5IGluIHRoaXMgY2xvY2sgdmlldy4gKHRoZSByZXN0IGlzIGlnbm9yZWQpXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBnZXQgYWN0aXZlRGF0ZSgpOiBEIHtcclxuICAgIHJldHVybiB0aGlzLl9hY3RpdmVEYXRlO1xyXG4gIH1cclxuICBzZXQgYWN0aXZlRGF0ZSh2YWx1ZTogRCkge1xyXG4gICAgY29uc3Qgb2xkQWN0aXZlRGF0ZSA9IHRoaXMuX2FjdGl2ZURhdGU7XHJcbiAgICBjb25zdCB2YWxpZERhdGUgPSB0aGlzLl9nZXRWYWxpZERhdGVPck51bGwodGhpcy5fZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpKSB8fCB0aGlzLl9kYXRlQWRhcHRlci50b2RheSgpO1xyXG4gICAgdGhpcy5fYWN0aXZlRGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmNsYW1wRGF0ZSh2YWxpZERhdGUsIHRoaXMubWluRGF0ZSwgdGhpcy5tYXhEYXRlKTtcclxuXHJcbiAgICBpZiAob2xkQWN0aXZlRGF0ZSAmJiB0aGlzLl9kYXRlQWRhcHRlci5jb21wYXJlRGF0ZShvbGRBY3RpdmVEYXRlLCB0aGlzLl9hY3RpdmVEYXRlLCAnbWludXRlJykpIHtcclxuICAgICAgdGhpcy5faW5pdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuICBwcml2YXRlIF9hY3RpdmVEYXRlOiBEO1xyXG5cclxuICAvLyBUaGUgY3VycmVudGx5IHNlbGVjdGVkIGRhdGUuXHJcbiAgQElucHV0KClcclxuICBnZXQgc2VsZWN0ZWQoKTogRCB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xyXG4gIH1cclxuICBzZXQgc2VsZWN0ZWQodmFsdWU6IEQgfCBudWxsKSB7XHJcbiAgICB0aGlzLl9zZWxlY3RlZCA9IHRoaXMuX2dldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLl9kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpO1xyXG4gIH1cclxuICBwcml2YXRlIF9zZWxlY3RlZDogRCB8IG51bGw7XHJcblxyXG4gIC8qKiBUaGUgbWluaW11bSBzZWxlY3RhYmxlIGRhdGUuICovXHJcbiAgQElucHV0KClcclxuICBnZXQgbWluRGF0ZSgpOiBEIHwgbnVsbCB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWluRGF0ZTtcclxuICB9XHJcbiAgc2V0IG1pbkRhdGUodmFsdWU6IEQgfCBudWxsKSB7XHJcbiAgICB0aGlzLl9taW5EYXRlID0gdGhpcy5fZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuX2RhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX21pbkRhdGU6IEQgfCBudWxsO1xyXG5cclxuICAvKiogVGhlIG1heGltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IG1heERhdGUoKTogRCB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMuX21heERhdGU7XHJcbiAgfVxyXG4gIHNldCBtYXhEYXRlKHZhbHVlOiBEIHwgbnVsbCkge1xyXG4gICAgdGhpcy5fbWF4RGF0ZSA9IHRoaXMuX2dldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLl9kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpO1xyXG4gIH1cclxuICBwcml2YXRlIF9tYXhEYXRlOiBEIHwgbnVsbDtcclxuXHJcbiAgLy8gQSBmdW5jdGlvbiB1c2VkIHRvIGZpbHRlciB3aGljaCBkYXRlcyBhcmUgc2VsZWN0YWJsZS5cclxuICBASW5wdXQoKSBkYXRlRmlsdGVyOiAoZGF0ZTogRCwgdW5pdD86IHN0cmluZykgPT4gYm9vbGVhbjtcclxuXHJcbiAgQElucHV0KCkgY2xvY2tTdGVwID0gMTtcclxuXHJcbiAgQElucHV0KCkgdHdlbHZlSG91ciA9IGZhbHNlO1xyXG5cclxuICAvLyBXaGV0aGVyIHRoZSBjbG9jayBpcyBpbiBob3VyIHZpZXcuXHJcbiAgQElucHV0KCkgaG91clZpZXcgPSB0cnVlO1xyXG5cclxuICAvLyBFbWl0cyB3aGVuIHRoZSBmaW5hbCB0aW1lIHdhcyBzZWxlY3RlZC5cclxuICBAT3V0cHV0KCkgcmVhZG9ubHkgc2VsZWN0ZWRUaW1lID0gbmV3IEV2ZW50RW1pdHRlcjxEPigpO1xyXG5cclxuICAvLyBFbWl0cyB3aGVuIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgZGF0ZSBjaGFuZ2VzLlxyXG4gIEBPdXRwdXQoKSByZWFkb25seSBzZWxlY3RlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8RD4oKTtcclxuXHJcbiAgLy8gRW1pdHMgd2hlbiB0aGUgY3VycmVudGx5IHNlbGVjdGVkIGRhdGUgY2hhbmdlcy5cclxuICBAT3V0cHV0KCkgcmVhZG9ubHkgY2hhbmdlVmlldyA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcclxuXHJcbiAgLy8gSG91cnMgYW5kIE1pbnV0ZXMgcmVwcmVzZW50aW5nIHRoZSBjbG9jayB2aWV3LlxyXG4gIF9ob3VyczogQXJyYXk8YW55PiA9IFtdO1xyXG4gIF9taW51dGVzOiBBcnJheTxhbnk+ID0gW107XHJcblxyXG4gIF9zZWxlY3RlZEhvdXI6IG51bWJlciB8IG51bGw7XHJcbiAgX3NlbGVjdGVkTWludXRlOiBudW1iZXIgfCBudWxsO1xyXG4gIF9hbnRlTWVyaWRpYW46IGJvb2xlYW47XHJcblxyXG4gIHByaXZhdGUgbW91c2VNb3ZlTGlzdGVuZXI6IGFueTtcclxuICBwcml2YXRlIG1vdXNlVXBMaXN0ZW5lcjogYW55O1xyXG5cclxuICBnZXQgX2hhbmQoKTogYW55IHtcclxuICAgIHRoaXMuX3NlbGVjdGVkSG91ciA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldEhvdXJzKHRoaXMuYWN0aXZlRGF0ZSk7XHJcbiAgICB0aGlzLl9zZWxlY3RlZE1pbnV0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldE1pbnV0ZXModGhpcy5hY3RpdmVEYXRlKTtcclxuICAgIGxldCByYWRpdXMgPSBDTE9DS19PVVRFUl9SQURJVVM7XHJcbiAgICBsZXQgZGVnID0gMDtcclxuXHJcbiAgICBpZiAodGhpcy50d2VsdmVIb3VyKSB7XHJcbiAgICAgIHRoaXMuX3NlbGVjdGVkSG91ciA9IHRoaXMuX3NlbGVjdGVkSG91ciA8IDEyID8gdGhpcy5fc2VsZWN0ZWRIb3VyIDogdGhpcy5fc2VsZWN0ZWRIb3VyIC0gMTI7XHJcbiAgICAgIHRoaXMuX3NlbGVjdGVkSG91ciA9IHRoaXMuX3NlbGVjdGVkSG91ciA9PT0gMCA/IDEyIDogdGhpcy5fc2VsZWN0ZWRIb3VyO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmhvdXJWaWV3KSB7XHJcbiAgICAgIGNvbnN0IG91dGVyID0gdGhpcy5fc2VsZWN0ZWRIb3VyID4gMCAmJiB0aGlzLl9zZWxlY3RlZEhvdXIgPCAxMztcclxuICAgICAgcmFkaXVzID0gb3V0ZXIgPyBDTE9DS19PVVRFUl9SQURJVVMgOiBDTE9DS19JTk5FUl9SQURJVVM7XHJcbiAgICAgIGlmICh0aGlzLnR3ZWx2ZUhvdXIpIHtcclxuICAgICAgICByYWRpdXMgPSBDTE9DS19PVVRFUl9SQURJVVM7XHJcbiAgICAgIH1cclxuICAgICAgZGVnID0gTWF0aC5yb3VuZCh0aGlzLl9zZWxlY3RlZEhvdXIgKiAoMzYwIC8gKDI0IC8gMikpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRlZyA9IE1hdGgucm91bmQodGhpcy5fc2VsZWN0ZWRNaW51dGUgKiAoMzYwIC8gNjApKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0cmFuc2Zvcm06IGByb3RhdGUoJHtkZWd9ZGVnKWAsXHJcbiAgICAgIGhlaWdodDogYCR7cmFkaXVzfSVgLFxyXG4gICAgICAnbWFyZ2luLXRvcCc6IGAkezUwIC0gcmFkaXVzfSVgXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmLFxyXG4gICAgQE9wdGlvbmFsKCkgcHVibGljIF9kYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXI8RD4sXHJcbiAgICBAT3B0aW9uYWwoKVxyXG4gICAgQEluamVjdChNQVRfREFURV9GT1JNQVRTKVxyXG4gICAgcHJpdmF0ZSBfZGF0ZUZvcm1hdHM6IE1hdERhdGVGb3JtYXRzXHJcbiAgKSB7XHJcbiAgICBpZiAoIXRoaXMuX2RhdGVBZGFwdGVyKSB7XHJcbiAgICAgIHRocm93IGNyZWF0ZU1pc3NpbmdEYXRlSW1wbEVycm9yKCdEYXRlQWRhcHRlcicpO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLl9kYXRlRm9ybWF0cykge1xyXG4gICAgICB0aHJvdyBjcmVhdGVNaXNzaW5nRGF0ZUltcGxFcnJvcignTUFUX0RBVEVfRk9STUFUUycpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubW91c2VNb3ZlTGlzdGVuZXIgPSAoZXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgICB0aGlzLl9oYW5kbGVNb3VzZW1vdmUoZXZlbnQpO1xyXG4gICAgfTtcclxuICAgIHRoaXMubW91c2VVcExpc3RlbmVyID0gKCkgPT4ge1xyXG4gICAgICB0aGlzLl9oYW5kbGVNb3VzZXVwKCk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgdGhpcy5faW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgLy8gSGFuZGxlcyBtb3VzZWRvd24gZXZlbnRzIG9uIHRoZSBjbG9jayBib2R5LlxyXG4gIF9oYW5kbGVNb3VzZWRvd24oZXZlbnQ6IGFueSkge1xyXG4gICAgdGhpcy5zZXRUaW1lKGV2ZW50KTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMubW91c2VNb3ZlTGlzdGVuZXIpO1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5tb3VzZU1vdmVMaXN0ZW5lcik7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5tb3VzZVVwTGlzdGVuZXIpO1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLm1vdXNlVXBMaXN0ZW5lcik7XHJcbiAgfVxyXG5cclxuICBfaGFuZGxlTW91c2Vtb3ZlKGV2ZW50OiBhbnkpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB0aGlzLnNldFRpbWUoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgX2hhbmRsZU1vdXNldXAoKSB7XHJcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm1vdXNlTW92ZUxpc3RlbmVyKTtcclxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMubW91c2VNb3ZlTGlzdGVuZXIpO1xyXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMubW91c2VVcExpc3RlbmVyKTtcclxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5tb3VzZVVwTGlzdGVuZXIpO1xyXG4gIH1cclxuXHJcbiAgLy8gSW5pdGlhbGl6ZXMgdGhpcyBjbG9jayB2aWV3LlxyXG4gIF9pbml0KCkge1xyXG4gICAgdGhpcy5faG91cnMubGVuZ3RoID0gMDtcclxuICAgIHRoaXMuX21pbnV0ZXMubGVuZ3RoID0gMDtcclxuXHJcbiAgICBjb25zdCBob3VyTmFtZXMgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRIb3VyTmFtZXMoKTtcclxuICAgIGNvbnN0IG1pbnV0ZU5hbWVzID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0TWludXRlTmFtZXMoKTtcclxuXHJcbiAgICBpZiAodGhpcy50d2VsdmVIb3VyKSB7XHJcbiAgICAgIHRoaXMuX2FudGVNZXJpZGlhbiA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldEhvdXJzKHRoaXMuYWN0aXZlRGF0ZSkgPCAxMjtcclxuXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaG91ck5hbWVzLmxlbmd0aCAvIDI7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHJhZGlhbiA9IGkgLyA2ICogTWF0aC5QSTtcclxuICAgICAgICBjb25zdCByYWRpdXMgPSBDTE9DS19PVVRFUl9SQURJVVM7XHJcbiAgICAgICAgY29uc3QgZGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmNyZWF0ZURhdGUoXHJcbiAgICAgICAgICB0aGlzLl9kYXRlQWRhcHRlci5nZXRZZWFyKHRoaXMuYWN0aXZlRGF0ZSksXHJcbiAgICAgICAgICB0aGlzLl9kYXRlQWRhcHRlci5nZXRNb250aCh0aGlzLmFjdGl2ZURhdGUpLFxyXG4gICAgICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0RGF0ZSh0aGlzLmFjdGl2ZURhdGUpLFxyXG4gICAgICAgICAgdGhpcy5fYW50ZU1lcmlkaWFuID8gaSA6IGkgKyAxMlxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5faG91cnMucHVzaCh7XHJcbiAgICAgICAgICB2YWx1ZTogaSxcclxuICAgICAgICAgIGRpc3BsYXlWYWx1ZTogaSA9PT0gMCA/ICcxMicgOiBob3VyTmFtZXNbaV0sXHJcbiAgICAgICAgICBlbmFibGVkOiAhdGhpcy5kYXRlRmlsdGVyIHx8IHRoaXMuZGF0ZUZpbHRlcihkYXRlLCAnaG91cicpLFxyXG4gICAgICAgICAgdG9wOiBDTE9DS19SQURJVVMgLSBNYXRoLmNvcyhyYWRpYW4pICogcmFkaXVzIC0gQ0xPQ0tfVElDS19SQURJVVMsXHJcbiAgICAgICAgICBsZWZ0OiBDTE9DS19SQURJVVMgKyBNYXRoLnNpbihyYWRpYW4pICogcmFkaXVzIC0gQ0xPQ0tfVElDS19SQURJVVNcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBob3VyTmFtZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCByYWRpYW4gPSBpIC8gNiAqIE1hdGguUEk7XHJcbiAgICAgICAgY29uc3Qgb3V0ZXIgPSBpID4gMCAmJiBpIDwgMTM7XHJcbiAgICAgICAgY29uc3QgcmFkaXVzID0gb3V0ZXIgPyBDTE9DS19PVVRFUl9SQURJVVMgOiBDTE9DS19JTk5FUl9SQURJVVM7XHJcbiAgICAgICAgY29uc3QgZGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmNyZWF0ZURhdGUoXHJcbiAgICAgICAgICB0aGlzLl9kYXRlQWRhcHRlci5nZXRZZWFyKHRoaXMuYWN0aXZlRGF0ZSksXHJcbiAgICAgICAgICB0aGlzLl9kYXRlQWRhcHRlci5nZXRNb250aCh0aGlzLmFjdGl2ZURhdGUpLFxyXG4gICAgICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0RGF0ZSh0aGlzLmFjdGl2ZURhdGUpLFxyXG4gICAgICAgICAgaVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5faG91cnMucHVzaCh7XHJcbiAgICAgICAgICB2YWx1ZTogaSxcclxuICAgICAgICAgIGRpc3BsYXlWYWx1ZTogaSA9PT0gMCA/ICcxMicgOiBob3VyTmFtZXNbaV0sXHJcbiAgICAgICAgICBlbmFibGVkOiAhdGhpcy5kYXRlRmlsdGVyIHx8IHRoaXMuZGF0ZUZpbHRlcihkYXRlLCAnaG91cicpLFxyXG4gICAgICAgICAgdG9wOiBDTE9DS19SQURJVVMgLSBNYXRoLmNvcyhyYWRpYW4pICogcmFkaXVzIC0gQ0xPQ0tfVElDS19SQURJVVMsXHJcbiAgICAgICAgICBsZWZ0OiBDTE9DS19SQURJVVMgKyBNYXRoLnNpbihyYWRpYW4pICogcmFkaXVzIC0gQ0xPQ0tfVElDS19SQURJVVMsXHJcbiAgICAgICAgICBmb250U2l6ZTogaSA+IDAgJiYgaSA8IDEzID8gJycgOiAnODAlJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtaW51dGVOYW1lcy5sZW5ndGg7IGkgKz0gNSkge1xyXG4gICAgICBjb25zdCByYWRpYW4gPSBpIC8gMzAgKiBNYXRoLlBJO1xyXG4gICAgICBjb25zdCBkYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuY3JlYXRlRGF0ZShcclxuICAgICAgICB0aGlzLl9kYXRlQWRhcHRlci5nZXRZZWFyKHRoaXMuYWN0aXZlRGF0ZSksXHJcbiAgICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0TW9udGgodGhpcy5hY3RpdmVEYXRlKSxcclxuICAgICAgICB0aGlzLl9kYXRlQWRhcHRlci5nZXREYXRlKHRoaXMuYWN0aXZlRGF0ZSksXHJcbiAgICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0SG91cnModGhpcy5hY3RpdmVEYXRlKSxcclxuICAgICAgICBpXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMuX21pbnV0ZXMucHVzaCh7XHJcbiAgICAgICAgdmFsdWU6IGksXHJcbiAgICAgICAgZGlzcGxheVZhbHVlOiBpID09PSAwID8gJzAwJyA6IG1pbnV0ZU5hbWVzW2ldLFxyXG4gICAgICAgIGVuYWJsZWQ6ICF0aGlzLmRhdGVGaWx0ZXIgfHwgdGhpcy5kYXRlRmlsdGVyKGRhdGUsICdtaW51dGUnKSxcclxuICAgICAgICB0b3A6IENMT0NLX1JBRElVUyAtIE1hdGguY29zKHJhZGlhbikgKiBDTE9DS19PVVRFUl9SQURJVVMgLSBDTE9DS19USUNLX1JBRElVUyxcclxuICAgICAgICBsZWZ0OiBDTE9DS19SQURJVVMgKyBNYXRoLnNpbihyYWRpYW4pICogQ0xPQ0tfT1VURVJfUkFESVVTIC0gQ0xPQ0tfVElDS19SQURJVVNcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICAvLyBTZXQgVGltZVxyXG4gIHByaXZhdGUgc2V0VGltZShldmVudDogYW55KSB7XHJcbiAgICBjb25zdCB0cmlnZ2VyID0gdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50O1xyXG4gICAgY29uc3QgdHJpZ2dlclJlY3QgPSB0cmlnZ2VyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgY29uc3Qgd2lkdGggPSB0cmlnZ2VyLm9mZnNldFdpZHRoO1xyXG4gICAgY29uc3QgaGVpZ2h0ID0gdHJpZ2dlci5vZmZzZXRIZWlnaHQ7XHJcbiAgICBjb25zdCBwYWdlWCA9IGV2ZW50LnBhZ2VYICE9PSB1bmRlZmluZWQgPyBldmVudC5wYWdlWCA6IGV2ZW50LnRvdWNoZXNbMF0ucGFnZVg7XHJcbiAgICBjb25zdCBwYWdlWSA9IGV2ZW50LnBhZ2VZICE9PSB1bmRlZmluZWQgPyBldmVudC5wYWdlWSA6IGV2ZW50LnRvdWNoZXNbMF0ucGFnZVk7XHJcbiAgICBjb25zdCB4ID0gd2lkdGggLyAyIC0gKHBhZ2VYIC0gdHJpZ2dlclJlY3QubGVmdCAtIHdpbmRvdy5wYWdlWE9mZnNldCk7XHJcbiAgICBjb25zdCB5ID0gaGVpZ2h0IC8gMiAtIChwYWdlWSAtIHRyaWdnZXJSZWN0LnRvcCAtIHdpbmRvdy5wYWdlWU9mZnNldCk7XHJcbiAgICBjb25zdCB1bml0ID0gTWF0aC5QSSAvICh0aGlzLmhvdXJWaWV3ID8gNiA6IHRoaXMuY2xvY2tTdGVwID8gMzAgLyB0aGlzLmNsb2NrU3RlcCA6IDMwKTtcclxuICAgIGNvbnN0IHogPSBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSk7XHJcbiAgICBjb25zdCBvdXRlciA9IHRoaXMuaG91clZpZXcgJiYgeiA+ICh3aWR0aCAqIChDTE9DS19PVVRFUl9SQURJVVMgLyAxMDApICsgd2lkdGggKiAoQ0xPQ0tfSU5ORVJfUkFESVVTIC8gMTAwKSkgLyAyO1xyXG5cclxuICAgIGxldCByYWRpYW4gPSBNYXRoLmF0YW4yKC14LCB5KTtcclxuICAgIGlmIChyYWRpYW4gPCAwKSB7XHJcbiAgICAgIHJhZGlhbiA9IE1hdGguUEkgKiAyICsgcmFkaWFuO1xyXG4gICAgfVxyXG4gICAgbGV0IHZhbHVlID0gTWF0aC5yb3VuZChyYWRpYW4gLyB1bml0KTtcclxuXHJcbiAgICBjb25zdCBkYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuY2xvbmUodGhpcy5hY3RpdmVEYXRlKTtcclxuXHJcbiAgICBpZiAodGhpcy5ob3VyVmlldykge1xyXG4gICAgICBpZiAodmFsdWUgPT09IDEyKSB7XHJcbiAgICAgICAgdmFsdWUgPSAwO1xyXG4gICAgICB9XHJcbiAgICAgIHZhbHVlID0gdGhpcy50d2VsdmVIb3VyXHJcbiAgICAgICAgPyB0aGlzLl9hbnRlTWVyaWRpYW4gPyB2YWx1ZSA6IHZhbHVlICsgMTJcclxuICAgICAgICA6IG91dGVyID8gKHZhbHVlID09PSAwID8gMTIgOiB2YWx1ZSkgOiB2YWx1ZSA9PT0gMCA/IDAgOiB2YWx1ZSArIDEyO1xyXG4gICAgICB0aGlzLl9kYXRlQWRhcHRlci5zZXRIb3VycyhkYXRlLCB2YWx1ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodGhpcy5jbG9ja1N0ZXApIHtcclxuICAgICAgICB2YWx1ZSAqPSB0aGlzLmNsb2NrU3RlcDtcclxuICAgICAgfVxyXG4gICAgICBpZiAodmFsdWUgPT09IDYwKSB7XHJcbiAgICAgICAgdmFsdWUgPSAwO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLnNldE1pbnV0ZXMoZGF0ZSwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHZhbGlkYXRlIGlmIHRoZSByZXN1bHRpbmcgdmFsdWUgaXMgZGlzYWJsZWQgYW5kIGRvIG5vdCB0YWtlIGFjdGlvblxyXG4gICAgaWYgKHRoaXMuZGF0ZUZpbHRlciAmJiAhdGhpcy5kYXRlRmlsdGVyKGRhdGUsIHRoaXMuaG91clZpZXcgPyAnaG91cicgOiAnbWludXRlJykpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYWN0aXZlRGF0ZSA9IGRhdGU7XHJcbiAgICBpZiAodGhpcy5ob3VyVmlldykge1xyXG4gICAgICB0aGlzLmNoYW5nZVZpZXcuZW1pdCgpO1xyXG4gICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQodGhpcy5hY3RpdmVEYXRlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRUaW1lLmVtaXQodGhpcy5hY3RpdmVEYXRlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIF9mb2N1c0FjdGl2ZUNlbGwoKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gb2JqIFRoZSBvYmplY3QgdG8gY2hlY2suXHJcbiAgICogQHJldHVybnMgVGhlIGdpdmVuIG9iamVjdCBpZiBpdCBpcyBib3RoIGEgZGF0ZSBpbnN0YW5jZSBhbmQgdmFsaWQsIG90aGVyd2lzZSBudWxsLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2dldFZhbGlkRGF0ZU9yTnVsbChvYmo6IGFueSk6IEQgfCBudWxsIHtcclxuICAgIHJldHVybiB0aGlzLl9kYXRlQWRhcHRlci5pc0RhdGVJbnN0YW5jZShvYmopICYmIHRoaXMuX2RhdGVBZGFwdGVyLmlzVmFsaWQob2JqKSA/IG9iaiA6IG51bGw7XHJcbiAgfVxyXG59XHJcbiJdfQ==