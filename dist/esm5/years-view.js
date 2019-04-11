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
import { DOWN_ARROW, ENTER, UP_ARROW } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Input, Optional, Output, ViewEncapsulation } from '@angular/core';
import { of as obsOf, fromEvent } from 'rxjs';
import { mergeMap, sampleTime } from 'rxjs/operators';
import { MAT_DATE_FORMATS } from './core/index';
import { DateAdapter } from './core/index';
import { createMissingDateImplError } from './datepicker-errors';
/** @type {?} */
var YEAR_LINE_HEIGHT = 35;
/**
 * An internal component used to display a year selector in the datepicker.
 * \@docs-private
 * @template D
 */
var MatYearsView = /** @class */ (function () {
    function MatYearsView(_changeDetectorRef, element, _dateAdapter, _dateFormats) {
        this._changeDetectorRef = _changeDetectorRef;
        this.element = element;
        this._dateAdapter = _dateAdapter;
        this._dateFormats = _dateFormats;
        /**
         * Emits when a new month is selected.
         */
        this.selectedChange = new EventEmitter();
        /**
         * List of years.
         */
        this._years = [];
        if (!this._dateAdapter) {
            throw createMissingDateImplError('DateAdapter');
        }
        if (!this._dateFormats) {
            throw createMissingDateImplError('MAT_DATE_FORMATS');
        }
    }
    Object.defineProperty(MatYearsView.prototype, "activeDate", {
        /** The date to display in this view (everything other than the year is ignored). */
        get: /**
         * The date to display in this view (everything other than the year is ignored).
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
            if (oldActiveDate &&
                this._dateAdapter.getYear(oldActiveDate) != this._dateAdapter.getYear(this._activeDate)) {
                this._init();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatYearsView.prototype, "selected", {
        /** The currently selected date. */
        get: /**
         * The currently selected date.
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
            this._selectedYear = this._selected && this._dateAdapter.getYear(this._selected);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatYearsView.prototype, "minDate", {
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
    Object.defineProperty(MatYearsView.prototype, "maxDate", {
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
    /**
     * @return {?}
     */
    MatYearsView.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var lastPosition = { scrolled: 0 };
        this._disposeScroller = fromEvent(this.element.nativeElement, 'scroll')
            .pipe(sampleTime(300), mergeMap((/**
         * @param {?} ev
         * @return {?}
         */
        function (ev) { return obsOf(_this._calculatePoints()); })))
            .subscribe((/**
         * @param {?} pos
         * @return {?}
         */
        function (pos) { return _this._handleScroll(pos, lastPosition); }));
        this._init();
    };
    /**
     * @return {?}
     */
    MatYearsView.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._disposeScroller.unsubscribe();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    MatYearsView.prototype.abs = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return Math.abs(value);
    };
    /** Initializes this year view. */
    /**
     * Initializes this year view.
     * @return {?}
     */
    MatYearsView.prototype._init = /**
     * Initializes this year view.
     * @return {?}
     */
    function () {
        var _this = this;
        this._selectedYear = this._dateAdapter.getYear(this.selected ? this.selected : this.activeDate);
        /** @type {?} */
        var date = this._dateAdapter.createDate(this._selectedYear, this._dateAdapter.getMonth(this.activeDate), this._dateAdapter.getDate(this.activeDate), this._dateAdapter.getHours(this.activeDate), this._dateAdapter.getMinutes(this.activeDate));
        this._years = [
            {
                value: this._selectedYear,
                enabled: !this.dateFilter || this.dateFilter(date, 'minute')
            }
        ];
        this._populateYears();
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.element.nativeElement.scrollTop -=
                _this.element.nativeElement.offsetHeight / 2 - YEAR_LINE_HEIGHT / 2;
        }), 20);
    };
    /**
     * @param {?=} down
     * @return {?}
     */
    MatYearsView.prototype._populateYears = /**
     * @param {?=} down
     * @return {?}
     */
    function (down) {
        var _this = this;
        if (down === void 0) { down = false; }
        if ((!down && !this._years[0].enabled) ||
            (down && !this._years[this._years.length - 1].enabled)) {
            return;
        }
        /** @type {?} */
        var selectedMonth = this._dateAdapter.getMonth(this.activeDate);
        /** @type {?} */
        var selectedDay = this._dateAdapter.getDate(this.activeDate);
        /** @type {?} */
        var selectedHours = this._dateAdapter.getHours(this.activeDate);
        /** @type {?} */
        var selectedMinutes = this._dateAdapter.getMinutes(this.activeDate);
        /** @type {?} */
        var scroll = 0;
        for (var y = 1; y <= 10; y++) {
            /** @type {?} */
            var year = this._years[this._years.length - 1].value;
            /** @type {?} */
            var date = this._dateAdapter.createDate(year + 1, selectedMonth, selectedDay, selectedHours, selectedMinutes);
            this._years.push({
                value: year + 1,
                enabled: !this.dateFilter || this.dateFilter(date, 'minute')
            });
            year = this._years[0].value;
            date = this._dateAdapter.createDate(year - 1, selectedMonth, selectedDay, selectedHours, selectedMinutes);
            this._years.unshift({
                value: year - 1,
                enabled: !this.dateFilter || this.dateFilter(date, 'minute')
            });
            scroll += YEAR_LINE_HEIGHT;
        }
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.element.nativeElement.scrollTop += down ? YEAR_LINE_HEIGHT : scroll;
        }), 10);
        this._changeDetectorRef.markForCheck();
    };
    /**
     * @param {?} year
     * @return {?}
     */
    MatYearsView.prototype._yearSelected = /**
     * @param {?} year
     * @return {?}
     */
    function (year) {
        /** @type {?} */
        var selectedMonth = this._dateAdapter.getMonth(this.activeDate);
        /** @type {?} */
        var selectedDay = this._dateAdapter.getDate(this.activeDate);
        /** @type {?} */
        var selectedHours = this._dateAdapter.getHours(this.activeDate);
        /** @type {?} */
        var selectedMinutes = this._dateAdapter.getMinutes(this.activeDate);
        this.selectedChange.emit(this._dateAdapter.createDate(year, selectedMonth, selectedDay, selectedHours, selectedMinutes));
    };
    /**
     * @return {?}
     */
    MatYearsView.prototype._calculatePoints = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var el = this.element.nativeElement;
        return {
            height: el.offsetHeight,
            scrolled: el.scrollTop,
            total: el.scrollHeight
        };
    };
    /**
     * @param {?} position
     * @param {?} lastPosition
     * @return {?}
     */
    MatYearsView.prototype._handleScroll = /**
     * @param {?} position
     * @param {?} lastPosition
     * @return {?}
     */
    function (position, lastPosition) {
        if (position.scrolled === 0 && lastPosition.scrolled > 0) {
            this._populateYears(false);
        }
        else if (position.height + position.scrolled === position.total) {
            this._populateYears(true);
        }
        lastPosition.scrolled = position.scrolled;
    };
    /** Handles keydown events on the calendar body when calendar is in multi-year view. */
    /**
     * Handles keydown events on the calendar body when calendar is in multi-year view.
     * @param {?} event
     * @return {?}
     */
    MatYearsView.prototype._handleCalendarBodyKeydown = /**
     * Handles keydown events on the calendar body when calendar is in multi-year view.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // TODO handle @angular/cdk/keycode
        switch (event.keyCode) {
            case UP_ARROW:
                this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, -1);
                break;
            case DOWN_ARROW:
                this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, 1);
                break;
            case ENTER:
                this._yearSelected(this._dateAdapter.getYear(this._activeDate));
                break;
            default:
                // Don't prevent default or focus active cell on keys that we don't explicitly handle.
                return;
        }
        this._focusActiveCell();
        // Prevent unexpected default actions such as form submission.
        event.preventDefault();
    };
    /**
     * @return {?}
     */
    MatYearsView.prototype._focusActiveCell = /**
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
    MatYearsView.prototype._getValidDateOrNull = /**
     * @private
     * @param {?} obj The object to check.
     * @return {?} The given object if it is both a date instance and valid, otherwise null.
     */
    function (obj) {
        return this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj) ? obj : null;
    };
    MatYearsView.decorators = [
        { type: Component, args: [{
                    selector: 'mat-years-view',
                    template: "<div class=\"mat-calendar-years\" (keydown)=\"_handleCalendarBodyKeydown($event)\">\r\n  <span *ngFor=\"let year of _years\"\r\n  [class]=\"'mat-calendar-years-item mat-calendar-years-item-diff' + abs(year.value - _selectedYear)\"\r\n  [class.mat-calendar-years-item-active]=\"year.value === _selectedYear\"\r\n  [class.mat-calendar-years-item-disabled]=\"!year.enabled\"\r\n  (click)=\"year.enabled ? _yearSelected(year.value) : null\">\r\n    {{ year.value }}\r\n  </span>\r\n</div>\r\n",
                    exportAs: 'matYearsView',
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    preserveWhitespaces: false
                }] }
    ];
    /** @nocollapse */
    MatYearsView.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: DateAdapter, decorators: [{ type: Optional }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_DATE_FORMATS,] }] }
    ]; };
    MatYearsView.propDecorators = {
        activeDate: [{ type: Input }],
        selected: [{ type: Input }],
        minDate: [{ type: Input }],
        maxDate: [{ type: Input }],
        dateFilter: [{ type: Input }],
        selectedChange: [{ type: Output }]
    };
    return MatYearsView;
}());
export { MatYearsView };
if (false) {
    /**
     * @type {?}
     * @private
     */
    MatYearsView.prototype._activeDate;
    /**
     * @type {?}
     * @private
     */
    MatYearsView.prototype._selected;
    /**
     * @type {?}
     * @private
     */
    MatYearsView.prototype._minDate;
    /**
     * @type {?}
     * @private
     */
    MatYearsView.prototype._maxDate;
    /**
     * A function used to filter which dates are selectable.
     * @type {?}
     */
    MatYearsView.prototype.dateFilter;
    /**
     * Emits when a new month is selected.
     * @type {?}
     */
    MatYearsView.prototype.selectedChange;
    /**
     * List of years.
     * @type {?}
     */
    MatYearsView.prototype._years;
    /**
     * The selected year.
     * @type {?}
     */
    MatYearsView.prototype._selectedYear;
    /**
     * Scroller subscription.
     * @type {?}
     */
    MatYearsView.prototype._disposeScroller;
    /**
     * @type {?}
     * @private
     */
    MatYearsView.prototype._changeDetectorRef;
    /**
     * @type {?}
     * @private
     */
    MatYearsView.prototype.element;
    /** @type {?} */
    MatYearsView.prototype._dateAdapter;
    /**
     * @type {?}
     * @private
     */
    MatYearsView.prototype._dateFormats;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWVhcnMtdmlldy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtYXJ0aW5kYWxlYy9kYXRlcGlja2VyLyIsInNvdXJjZXMiOlsieWVhcnMtdmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BFLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBRUwsUUFBUSxFQUNSLE1BQU0sRUFDTixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLEVBQUUsSUFBSSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGdCQUFnQixFQUFrQixNQUFNLGNBQWMsQ0FBQztBQUNoRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzNDLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHFCQUFxQixDQUFDOztJQUUzRCxnQkFBZ0IsR0FBRyxFQUFFOzs7Ozs7QUFNM0I7SUEyRUUsc0JBQ1Usa0JBQXFDLEVBQ3JDLE9BQW1CLEVBQ1IsWUFBNEIsRUFHdkMsWUFBNEI7UUFMNUIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQUNyQyxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ1IsaUJBQVksR0FBWixZQUFZLENBQWdCO1FBR3ZDLGlCQUFZLEdBQVosWUFBWSxDQUFnQjs7OztRQWpCbkIsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBSyxDQUFDOzs7O1FBRzFELFdBQU0sR0FBK0MsRUFBRSxDQUFDO1FBZ0J0RCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZ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QUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxtQkFBbUIsRUFBRSxLQUFLO2lCQUMzQjs7OztnQkEvQkMsaUJBQWlCO2dCQUVqQixVQUFVO2dCQWFILFdBQVcsdUJBdUZmLFFBQVE7Z0RBQ1IsUUFBUSxZQUNSLE1BQU0sU0FBQyxnQkFBZ0I7Ozs2QkF0RXpCLEtBQUs7MkJBb0JMLEtBQUs7MEJBV0wsS0FBSzswQkFVTCxLQUFLOzZCQVVMLEtBQUs7aUNBR0wsTUFBTTs7SUFxTFQsbUJBQUM7Q0FBQSxBQXJQRCxJQXFQQztTQTdPWSxZQUFZOzs7Ozs7SUFtQnZCLG1DQUF1Qjs7Ozs7SUFXdkIsaUNBQTRCOzs7OztJQVU1QixnQ0FBMkI7Ozs7O0lBVTNCLGdDQUEyQjs7Ozs7SUFHM0Isa0NBQXlEOzs7OztJQUd6RCxzQ0FBMEQ7Ozs7O0lBRzFELDhCQUF3RDs7Ozs7SUFHeEQscUNBQTZCOzs7OztJQUc3Qix3Q0FBK0I7Ozs7O0lBRzdCLDBDQUE2Qzs7Ozs7SUFDN0MsK0JBQTJCOztJQUMzQixvQ0FBK0M7Ozs7O0lBQy9DLG9DQUVvQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKlxyXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxyXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgRE9XTl9BUlJPVywgRU5URVIsIFVQX0FSUk9XIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcclxuaW1wb3J0IHtcclxuICBBZnRlckNvbnRlbnRJbml0LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIENvbXBvbmVudCxcclxuICBFbGVtZW50UmVmLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBJbmplY3QsXHJcbiAgSW5wdXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9wdGlvbmFsLFxyXG4gIE91dHB1dCxcclxuICBWaWV3RW5jYXBzdWxhdGlvblxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgb2YgYXMgb2JzT2YsIGZyb21FdmVudCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtZXJnZU1hcCwgc2FtcGxlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgTUFUX0RBVEVfRk9STUFUUywgTWF0RGF0ZUZvcm1hdHMgfSBmcm9tICcuL2NvcmUvaW5kZXgnO1xyXG5pbXBvcnQgeyBEYXRlQWRhcHRlciB9IGZyb20gJy4vY29yZS9pbmRleCc7XHJcbmltcG9ydCB7IGNyZWF0ZU1pc3NpbmdEYXRlSW1wbEVycm9yIH0gZnJvbSAnLi9kYXRlcGlja2VyLWVycm9ycyc7XHJcblxyXG5jb25zdCBZRUFSX0xJTkVfSEVJR0hUID0gMzU7XHJcblxyXG4vKipcclxuICogQW4gaW50ZXJuYWwgY29tcG9uZW50IHVzZWQgdG8gZGlzcGxheSBhIHllYXIgc2VsZWN0b3IgaW4gdGhlIGRhdGVwaWNrZXIuXHJcbiAqIEBkb2NzLXByaXZhdGVcclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbWF0LXllYXJzLXZpZXcnLFxyXG4gIHRlbXBsYXRlVXJsOiAneWVhcnMtdmlldy5odG1sJyxcclxuICBleHBvcnRBczogJ21hdFllYXJzVmlldycsXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWF0WWVhcnNWaWV3PEQ+IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcclxuICAvKiogVGhlIGRhdGUgdG8gZGlzcGxheSBpbiB0aGlzIHZpZXcgKGV2ZXJ5dGhpbmcgb3RoZXIgdGhhbiB0aGUgeWVhciBpcyBpZ25vcmVkKS4gKi9cclxuICBASW5wdXQoKVxyXG4gIGdldCBhY3RpdmVEYXRlKCk6IEQge1xyXG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZURhdGU7XHJcbiAgfVxyXG4gIHNldCBhY3RpdmVEYXRlKHZhbHVlOiBEKSB7XHJcbiAgICBsZXQgb2xkQWN0aXZlRGF0ZSA9IHRoaXMuX2FjdGl2ZURhdGU7XHJcbiAgICBjb25zdCB2YWxpZERhdGUgPVxyXG4gICAgICB0aGlzLl9nZXRWYWxpZERhdGVPck51bGwodGhpcy5fZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpKSB8fCB0aGlzLl9kYXRlQWRhcHRlci50b2RheSgpO1xyXG4gICAgdGhpcy5fYWN0aXZlRGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmNsYW1wRGF0ZSh2YWxpZERhdGUsIHRoaXMubWluRGF0ZSwgdGhpcy5tYXhEYXRlKTtcclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIG9sZEFjdGl2ZURhdGUgJiZcclxuICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0WWVhcihvbGRBY3RpdmVEYXRlKSAhPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRZZWFyKHRoaXMuX2FjdGl2ZURhdGUpXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5faW5pdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuICBwcml2YXRlIF9hY3RpdmVEYXRlOiBEO1xyXG5cclxuICAvKiogVGhlIGN1cnJlbnRseSBzZWxlY3RlZCBkYXRlLiAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHNlbGVjdGVkKCk6IEQgfCBudWxsIHtcclxuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcclxuICB9XHJcbiAgc2V0IHNlbGVjdGVkKHZhbHVlOiBEIHwgbnVsbCkge1xyXG4gICAgdGhpcy5fc2VsZWN0ZWQgPSB0aGlzLl9nZXRWYWxpZERhdGVPck51bGwodGhpcy5fZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpKTtcclxuICAgIHRoaXMuX3NlbGVjdGVkWWVhciA9IHRoaXMuX3NlbGVjdGVkICYmIHRoaXMuX2RhdGVBZGFwdGVyLmdldFllYXIodGhpcy5fc2VsZWN0ZWQpO1xyXG4gIH1cclxuICBwcml2YXRlIF9zZWxlY3RlZDogRCB8IG51bGw7XHJcblxyXG4gIC8qKiBUaGUgbWluaW11bSBzZWxlY3RhYmxlIGRhdGUuICovXHJcbiAgQElucHV0KClcclxuICBnZXQgbWluRGF0ZSgpOiBEIHwgbnVsbCB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWluRGF0ZTtcclxuICB9XHJcbiAgc2V0IG1pbkRhdGUodmFsdWU6IEQgfCBudWxsKSB7XHJcbiAgICB0aGlzLl9taW5EYXRlID0gdGhpcy5fZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuX2RhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX21pbkRhdGU6IEQgfCBudWxsO1xyXG5cclxuICAvKiogVGhlIG1heGltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IG1heERhdGUoKTogRCB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMuX21heERhdGU7XHJcbiAgfVxyXG4gIHNldCBtYXhEYXRlKHZhbHVlOiBEIHwgbnVsbCkge1xyXG4gICAgdGhpcy5fbWF4RGF0ZSA9IHRoaXMuX2dldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLl9kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpO1xyXG4gIH1cclxuICBwcml2YXRlIF9tYXhEYXRlOiBEIHwgbnVsbDtcclxuXHJcbiAgLyoqIEEgZnVuY3Rpb24gdXNlZCB0byBmaWx0ZXIgd2hpY2ggZGF0ZXMgYXJlIHNlbGVjdGFibGUuICovXHJcbiAgQElucHV0KCkgZGF0ZUZpbHRlcjogKGRhdGU6IEQsIHVuaXQ/OiBzdHJpbmcpID0+IGJvb2xlYW47XHJcblxyXG4gIC8qKiBFbWl0cyB3aGVuIGEgbmV3IG1vbnRoIGlzIHNlbGVjdGVkLiAqL1xyXG4gIEBPdXRwdXQoKSByZWFkb25seSBzZWxlY3RlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8RD4oKTtcclxuXHJcbiAgLyoqIExpc3Qgb2YgeWVhcnMuICovXHJcbiAgX3llYXJzOiBBcnJheTx7IHZhbHVlOiBudW1iZXI7IGVuYWJsZWQ6IGJvb2xlYW4gfT4gPSBbXTtcclxuXHJcbiAgLyoqIFRoZSBzZWxlY3RlZCB5ZWFyLiAqL1xyXG4gIF9zZWxlY3RlZFllYXI6IG51bWJlciB8IG51bGw7XHJcblxyXG4gIC8qKiBTY3JvbGxlciBzdWJzY3JpcHRpb24uICovXHJcbiAgX2Rpc3Bvc2VTY3JvbGxlcjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZixcclxuICAgIEBPcHRpb25hbCgpIHB1YmxpYyBfZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyPEQ+LFxyXG4gICAgQE9wdGlvbmFsKClcclxuICAgIEBJbmplY3QoTUFUX0RBVEVfRk9STUFUUylcclxuICAgIHByaXZhdGUgX2RhdGVGb3JtYXRzOiBNYXREYXRlRm9ybWF0c1xyXG4gICkge1xyXG4gICAgaWYgKCF0aGlzLl9kYXRlQWRhcHRlcikge1xyXG4gICAgICB0aHJvdyBjcmVhdGVNaXNzaW5nRGF0ZUltcGxFcnJvcignRGF0ZUFkYXB0ZXInKTtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5fZGF0ZUZvcm1hdHMpIHtcclxuICAgICAgdGhyb3cgY3JlYXRlTWlzc2luZ0RhdGVJbXBsRXJyb3IoJ01BVF9EQVRFX0ZPUk1BVFMnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuICAgIGNvbnN0IGxhc3RQb3NpdGlvbiA9IHsgc2Nyb2xsZWQ6IDAgfTtcclxuICAgIHRoaXMuX2Rpc3Bvc2VTY3JvbGxlciA9IGZyb21FdmVudCh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3Njcm9sbCcpXHJcbiAgICAgIC5waXBlKHNhbXBsZVRpbWUoMzAwKSwgbWVyZ2VNYXAoKGV2OiBhbnkpID0+IG9ic09mKHRoaXMuX2NhbGN1bGF0ZVBvaW50cygpKSkpXHJcbiAgICAgIC5zdWJzY3JpYmUoKHBvczogYW55KSA9PiB0aGlzLl9oYW5kbGVTY3JvbGwocG9zLCBsYXN0UG9zaXRpb24pKTtcclxuXHJcbiAgICB0aGlzLl9pbml0KCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuX2Rpc3Bvc2VTY3JvbGxlci51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgYWJzKHZhbHVlOiBudW1iZXIpIHtcclxuICAgIHJldHVybiBNYXRoLmFicyh2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICAvKiogSW5pdGlhbGl6ZXMgdGhpcyB5ZWFyIHZpZXcuICovXHJcbiAgX2luaXQoKSB7XHJcbiAgICB0aGlzLl9zZWxlY3RlZFllYXIgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRZZWFyKHRoaXMuc2VsZWN0ZWQgPyB0aGlzLnNlbGVjdGVkIDogdGhpcy5hY3RpdmVEYXRlKTtcclxuXHJcbiAgICBjb25zdCBkYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuY3JlYXRlRGF0ZShcclxuICAgICAgdGhpcy5fc2VsZWN0ZWRZZWFyLFxyXG4gICAgICB0aGlzLl9kYXRlQWRhcHRlci5nZXRNb250aCh0aGlzLmFjdGl2ZURhdGUpLFxyXG4gICAgICB0aGlzLl9kYXRlQWRhcHRlci5nZXREYXRlKHRoaXMuYWN0aXZlRGF0ZSksXHJcbiAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmdldEhvdXJzKHRoaXMuYWN0aXZlRGF0ZSksXHJcbiAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmdldE1pbnV0ZXModGhpcy5hY3RpdmVEYXRlKVxyXG4gICAgKTtcclxuICAgIHRoaXMuX3llYXJzID0gW1xyXG4gICAgICB7XHJcbiAgICAgICAgdmFsdWU6IHRoaXMuX3NlbGVjdGVkWWVhcixcclxuICAgICAgICBlbmFibGVkOiAhdGhpcy5kYXRlRmlsdGVyIHx8IHRoaXMuZGF0ZUZpbHRlcihkYXRlLCAnbWludXRlJylcclxuICAgICAgfVxyXG4gICAgXTtcclxuXHJcbiAgICB0aGlzLl9wb3B1bGF0ZVllYXJzKCk7XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCAtPVxyXG4gICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCAvIDIgLSBZRUFSX0xJTkVfSEVJR0hUIC8gMjtcclxuICAgIH0sIDIwKTtcclxuICB9XHJcblxyXG4gIF9wb3B1bGF0ZVllYXJzKGRvd24gPSBmYWxzZSkge1xyXG4gICAgaWYgKFxyXG4gICAgICAoIWRvd24gJiYgIXRoaXMuX3llYXJzWzBdLmVuYWJsZWQpIHx8XHJcbiAgICAgIChkb3duICYmICF0aGlzLl95ZWFyc1t0aGlzLl95ZWFycy5sZW5ndGggLSAxXS5lbmFibGVkKVxyXG4gICAgKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzZWxlY3RlZE1vbnRoID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0TW9udGgodGhpcy5hY3RpdmVEYXRlKTtcclxuICAgIGNvbnN0IHNlbGVjdGVkRGF5ID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0RGF0ZSh0aGlzLmFjdGl2ZURhdGUpO1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRIb3VycyA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldEhvdXJzKHRoaXMuYWN0aXZlRGF0ZSk7XHJcbiAgICBjb25zdCBzZWxlY3RlZE1pbnV0ZXMgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRNaW51dGVzKHRoaXMuYWN0aXZlRGF0ZSk7XHJcblxyXG4gICAgbGV0IHNjcm9sbCA9IDA7XHJcbiAgICBmb3IgKGxldCB5ID0gMTsgeSA8PSAxMDsgeSsrKSB7XHJcbiAgICAgIGxldCB5ZWFyID0gdGhpcy5feWVhcnNbdGhpcy5feWVhcnMubGVuZ3RoIC0gMV0udmFsdWU7XHJcbiAgICAgIGxldCBkYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuY3JlYXRlRGF0ZShcclxuICAgICAgICB5ZWFyICsgMSxcclxuICAgICAgICBzZWxlY3RlZE1vbnRoLFxyXG4gICAgICAgIHNlbGVjdGVkRGF5LFxyXG4gICAgICAgIHNlbGVjdGVkSG91cnMsXHJcbiAgICAgICAgc2VsZWN0ZWRNaW51dGVzXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMuX3llYXJzLnB1c2goe1xyXG4gICAgICAgIHZhbHVlOiB5ZWFyICsgMSxcclxuICAgICAgICBlbmFibGVkOiAhdGhpcy5kYXRlRmlsdGVyIHx8IHRoaXMuZGF0ZUZpbHRlcihkYXRlLCAnbWludXRlJylcclxuICAgICAgfSk7XHJcblxyXG4gICAgICB5ZWFyID0gdGhpcy5feWVhcnNbMF0udmFsdWU7XHJcbiAgICAgIGRhdGUgPSB0aGlzLl9kYXRlQWRhcHRlci5jcmVhdGVEYXRlKFxyXG4gICAgICAgIHllYXIgLSAxLFxyXG4gICAgICAgIHNlbGVjdGVkTW9udGgsXHJcbiAgICAgICAgc2VsZWN0ZWREYXksXHJcbiAgICAgICAgc2VsZWN0ZWRIb3VycyxcclxuICAgICAgICBzZWxlY3RlZE1pbnV0ZXNcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5feWVhcnMudW5zaGlmdCh7XHJcbiAgICAgICAgdmFsdWU6IHllYXIgLSAxLFxyXG4gICAgICAgIGVuYWJsZWQ6ICF0aGlzLmRhdGVGaWx0ZXIgfHwgdGhpcy5kYXRlRmlsdGVyKGRhdGUsICdtaW51dGUnKVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHNjcm9sbCArPSBZRUFSX0xJTkVfSEVJR0hUO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgKz0gZG93biA/IFlFQVJfTElORV9IRUlHSFQgOiBzY3JvbGw7XHJcbiAgICB9LCAxMCk7XHJcblxyXG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICBfeWVhclNlbGVjdGVkKHllYXI6IG51bWJlcikge1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRNb250aCA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldE1vbnRoKHRoaXMuYWN0aXZlRGF0ZSk7XHJcbiAgICBjb25zdCBzZWxlY3RlZERheSA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldERhdGUodGhpcy5hY3RpdmVEYXRlKTtcclxuICAgIGNvbnN0IHNlbGVjdGVkSG91cnMgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRIb3Vycyh0aGlzLmFjdGl2ZURhdGUpO1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRNaW51dGVzID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0TWludXRlcyh0aGlzLmFjdGl2ZURhdGUpO1xyXG4gICAgdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KFxyXG4gICAgICB0aGlzLl9kYXRlQWRhcHRlci5jcmVhdGVEYXRlKHllYXIsIHNlbGVjdGVkTW9udGgsIHNlbGVjdGVkRGF5LCBzZWxlY3RlZEhvdXJzLCBzZWxlY3RlZE1pbnV0ZXMpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgX2NhbGN1bGF0ZVBvaW50cygpIHtcclxuICAgIGNvbnN0IGVsID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBoZWlnaHQ6IGVsLm9mZnNldEhlaWdodCxcclxuICAgICAgc2Nyb2xsZWQ6IGVsLnNjcm9sbFRvcCxcclxuICAgICAgdG90YWw6IGVsLnNjcm9sbEhlaWdodFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIF9oYW5kbGVTY3JvbGwocG9zaXRpb24sIGxhc3RQb3NpdGlvbikge1xyXG4gICAgaWYgKHBvc2l0aW9uLnNjcm9sbGVkID09PSAwICYmIGxhc3RQb3NpdGlvbi5zY3JvbGxlZCA+IDApIHtcclxuICAgICAgdGhpcy5fcG9wdWxhdGVZZWFycyhmYWxzZSk7XHJcbiAgICB9IGVsc2UgaWYgKHBvc2l0aW9uLmhlaWdodCArIHBvc2l0aW9uLnNjcm9sbGVkID09PSBwb3NpdGlvbi50b3RhbCkge1xyXG4gICAgICB0aGlzLl9wb3B1bGF0ZVllYXJzKHRydWUpO1xyXG4gICAgfVxyXG4gICAgbGFzdFBvc2l0aW9uLnNjcm9sbGVkID0gcG9zaXRpb24uc2Nyb2xsZWQ7XHJcbiAgfVxyXG5cclxuICAvKiogSGFuZGxlcyBrZXlkb3duIGV2ZW50cyBvbiB0aGUgY2FsZW5kYXIgYm9keSB3aGVuIGNhbGVuZGFyIGlzIGluIG11bHRpLXllYXIgdmlldy4gKi9cclxuICBfaGFuZGxlQ2FsZW5kYXJCb2R5S2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xyXG4gICAgLy8gVE9ETyBoYW5kbGUgQGFuZ3VsYXIvY2RrL2tleWNvZGVcclxuICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xyXG4gICAgICBjYXNlIFVQX0FSUk9XOlxyXG4gICAgICAgIHRoaXMuYWN0aXZlRGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnModGhpcy5fYWN0aXZlRGF0ZSwgLTEpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIERPV05fQVJST1c6XHJcbiAgICAgICAgdGhpcy5hY3RpdmVEYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyh0aGlzLl9hY3RpdmVEYXRlLCAxKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBFTlRFUjpcclxuICAgICAgICB0aGlzLl95ZWFyU2VsZWN0ZWQodGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLl9hY3RpdmVEYXRlKSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgLy8gRG9uJ3QgcHJldmVudCBkZWZhdWx0IG9yIGZvY3VzIGFjdGl2ZSBjZWxsIG9uIGtleXMgdGhhdCB3ZSBkb24ndCBleHBsaWNpdGx5IGhhbmRsZS5cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fZm9jdXNBY3RpdmVDZWxsKCk7XHJcbiAgICAvLyBQcmV2ZW50IHVuZXhwZWN0ZWQgZGVmYXVsdCBhY3Rpb25zIHN1Y2ggYXMgZm9ybSBzdWJtaXNzaW9uLlxyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICB9XHJcblxyXG4gIF9mb2N1c0FjdGl2ZUNlbGwoKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gb2JqIFRoZSBvYmplY3QgdG8gY2hlY2suXHJcbiAgICogQHJldHVybnMgVGhlIGdpdmVuIG9iamVjdCBpZiBpdCBpcyBib3RoIGEgZGF0ZSBpbnN0YW5jZSBhbmQgdmFsaWQsIG90aGVyd2lzZSBudWxsLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2dldFZhbGlkRGF0ZU9yTnVsbChvYmo6IGFueSk6IEQgfCBudWxsIHtcclxuICAgIHJldHVybiB0aGlzLl9kYXRlQWRhcHRlci5pc0RhdGVJbnN0YW5jZShvYmopICYmIHRoaXMuX2RhdGVBZGFwdGVyLmlzVmFsaWQob2JqKSA/IG9iaiA6IG51bGw7XHJcbiAgfVxyXG59XHJcbiJdfQ==