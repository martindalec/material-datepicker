/**
 * @fileoverview added by tsickle
 * Generated from: years-view.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWVhcnMtdmlldy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtYXJ0aW5kYWxlYy9kYXRlcGlja2VyLyIsInNvdXJjZXMiOlsieWVhcnMtdmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNwRSxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUVMLFFBQVEsRUFDUixNQUFNLEVBQ04saUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxFQUFFLElBQUksS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxnQkFBZ0IsRUFBa0IsTUFBTSxjQUFjLENBQUM7QUFDaEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUMzQyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7SUFFM0QsZ0JBQWdCLEdBQUcsRUFBRTs7Ozs7O0FBTTNCO0lBMkVFLHNCQUNVLGtCQUFxQyxFQUNyQyxPQUFtQixFQUNSLFlBQTRCLEVBR3ZDLFlBQTRCO1FBTDVCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFDckMsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNSLGlCQUFZLEdBQVosWUFBWSxDQUFnQjtRQUd2QyxpQkFBWSxHQUFaLFlBQVksQ0FBZ0I7Ozs7UUFqQm5CLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQUssQ0FBQzs7OztRQUcxRCxXQUFNLEdBQStDLEVBQUUsQ0FBQztRQWdCdEQsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7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Q0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsbUJBQW1CLEVBQUUsS0FBSztpQkFDM0I7Ozs7Z0JBL0JDLGlCQUFpQjtnQkFFakIsVUFBVTtnQkFhSCxXQUFXLHVCQXVGZixRQUFRO2dEQUNSLFFBQVEsWUFDUixNQUFNLFNBQUMsZ0JBQWdCOzs7NkJBdEV6QixLQUFLOzJCQW9CTCxLQUFLOzBCQVdMLEtBQUs7MEJBVUwsS0FBSzs2QkFVTCxLQUFLO2lDQUdMLE1BQU07O0lBcUxULG1CQUFDO0NBQUEsQUFyUEQsSUFxUEM7U0E3T1ksWUFBWTs7Ozs7O0lBbUJ2QixtQ0FBdUI7Ozs7O0lBV3ZCLGlDQUE0Qjs7Ozs7SUFVNUIsZ0NBQTJCOzs7OztJQVUzQixnQ0FBMkI7Ozs7O0lBRzNCLGtDQUF5RDs7Ozs7SUFHekQsc0NBQTBEOzs7OztJQUcxRCw4QkFBd0Q7Ozs7O0lBR3hELHFDQUE2Qjs7Ozs7SUFHN0Isd0NBQStCOzs7OztJQUc3QiwwQ0FBNkM7Ozs7O0lBQzdDLCtCQUEyQjs7SUFDM0Isb0NBQStDOzs7OztJQUMvQyxvQ0FFb0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcclxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxyXG4gKi9cclxuXHJcbmltcG9ydCB7IERPV05fQVJST1csIEVOVEVSLCBVUF9BUlJPVyB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XHJcbmltcG9ydCB7XHJcbiAgQWZ0ZXJDb250ZW50SW5pdCxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBDb21wb25lbnQsXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSW5qZWN0LFxyXG4gIElucHV0LFxyXG4gIE9uRGVzdHJveSxcclxuICBPcHRpb25hbCxcclxuICBPdXRwdXQsXHJcbiAgVmlld0VuY2Fwc3VsYXRpb25cclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG9mIGFzIG9ic09mLCBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWVyZ2VNYXAsIHNhbXBsZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IE1BVF9EQVRFX0ZPUk1BVFMsIE1hdERhdGVGb3JtYXRzIH0gZnJvbSAnLi9jb3JlL2luZGV4JztcclxuaW1wb3J0IHsgRGF0ZUFkYXB0ZXIgfSBmcm9tICcuL2NvcmUvaW5kZXgnO1xyXG5pbXBvcnQgeyBjcmVhdGVNaXNzaW5nRGF0ZUltcGxFcnJvciB9IGZyb20gJy4vZGF0ZXBpY2tlci1lcnJvcnMnO1xyXG5cclxuY29uc3QgWUVBUl9MSU5FX0hFSUdIVCA9IDM1O1xyXG5cclxuLyoqXHJcbiAqIEFuIGludGVybmFsIGNvbXBvbmVudCB1c2VkIHRvIGRpc3BsYXkgYSB5ZWFyIHNlbGVjdG9yIGluIHRoZSBkYXRlcGlja2VyLlxyXG4gKiBAZG9jcy1wcml2YXRlXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ21hdC15ZWFycy12aWV3JyxcclxuICB0ZW1wbGF0ZVVybDogJ3llYXJzLXZpZXcuaHRtbCcsXHJcbiAgZXhwb3J0QXM6ICdtYXRZZWFyc1ZpZXcnLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2VcclxufSlcclxuZXhwb3J0IGNsYXNzIE1hdFllYXJzVmlldzxEPiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XHJcbiAgLyoqIFRoZSBkYXRlIHRvIGRpc3BsYXkgaW4gdGhpcyB2aWV3IChldmVyeXRoaW5nIG90aGVyIHRoYW4gdGhlIHllYXIgaXMgaWdub3JlZCkuICovXHJcbiAgQElucHV0KClcclxuICBnZXQgYWN0aXZlRGF0ZSgpOiBEIHtcclxuICAgIHJldHVybiB0aGlzLl9hY3RpdmVEYXRlO1xyXG4gIH1cclxuICBzZXQgYWN0aXZlRGF0ZSh2YWx1ZTogRCkge1xyXG4gICAgbGV0IG9sZEFjdGl2ZURhdGUgPSB0aGlzLl9hY3RpdmVEYXRlO1xyXG4gICAgY29uc3QgdmFsaWREYXRlID1cclxuICAgICAgdGhpcy5fZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuX2RhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSkgfHwgdGhpcy5fZGF0ZUFkYXB0ZXIudG9kYXkoKTtcclxuICAgIHRoaXMuX2FjdGl2ZURhdGUgPSB0aGlzLl9kYXRlQWRhcHRlci5jbGFtcERhdGUodmFsaWREYXRlLCB0aGlzLm1pbkRhdGUsIHRoaXMubWF4RGF0ZSk7XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICBvbGRBY3RpdmVEYXRlICYmXHJcbiAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmdldFllYXIob2xkQWN0aXZlRGF0ZSkgIT0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLl9hY3RpdmVEYXRlKVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuX2luaXQoKTtcclxuICAgIH1cclxuICB9XHJcbiAgcHJpdmF0ZSBfYWN0aXZlRGF0ZTogRDtcclxuXHJcbiAgLyoqIFRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgZGF0ZS4gKi9cclxuICBASW5wdXQoKVxyXG4gIGdldCBzZWxlY3RlZCgpOiBEIHwgbnVsbCB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XHJcbiAgfVxyXG4gIHNldCBzZWxlY3RlZCh2YWx1ZTogRCB8IG51bGwpIHtcclxuICAgIHRoaXMuX3NlbGVjdGVkID0gdGhpcy5fZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuX2RhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSk7XHJcbiAgICB0aGlzLl9zZWxlY3RlZFllYXIgPSB0aGlzLl9zZWxlY3RlZCAmJiB0aGlzLl9kYXRlQWRhcHRlci5nZXRZZWFyKHRoaXMuX3NlbGVjdGVkKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfc2VsZWN0ZWQ6IEQgfCBudWxsO1xyXG5cclxuICAvKiogVGhlIG1pbmltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IG1pbkRhdGUoKTogRCB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMuX21pbkRhdGU7XHJcbiAgfVxyXG4gIHNldCBtaW5EYXRlKHZhbHVlOiBEIHwgbnVsbCkge1xyXG4gICAgdGhpcy5fbWluRGF0ZSA9IHRoaXMuX2dldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLl9kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpO1xyXG4gIH1cclxuICBwcml2YXRlIF9taW5EYXRlOiBEIHwgbnVsbDtcclxuXHJcbiAgLyoqIFRoZSBtYXhpbXVtIHNlbGVjdGFibGUgZGF0ZS4gKi9cclxuICBASW5wdXQoKVxyXG4gIGdldCBtYXhEYXRlKCk6IEQgfCBudWxsIHtcclxuICAgIHJldHVybiB0aGlzLl9tYXhEYXRlO1xyXG4gIH1cclxuICBzZXQgbWF4RGF0ZSh2YWx1ZTogRCB8IG51bGwpIHtcclxuICAgIHRoaXMuX21heERhdGUgPSB0aGlzLl9nZXRWYWxpZERhdGVPck51bGwodGhpcy5fZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfbWF4RGF0ZTogRCB8IG51bGw7XHJcblxyXG4gIC8qKiBBIGZ1bmN0aW9uIHVzZWQgdG8gZmlsdGVyIHdoaWNoIGRhdGVzIGFyZSBzZWxlY3RhYmxlLiAqL1xyXG4gIEBJbnB1dCgpIGRhdGVGaWx0ZXI6IChkYXRlOiBELCB1bml0Pzogc3RyaW5nKSA9PiBib29sZWFuO1xyXG5cclxuICAvKiogRW1pdHMgd2hlbiBhIG5ldyBtb250aCBpcyBzZWxlY3RlZC4gKi9cclxuICBAT3V0cHV0KCkgcmVhZG9ubHkgc2VsZWN0ZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPEQ+KCk7XHJcblxyXG4gIC8qKiBMaXN0IG9mIHllYXJzLiAqL1xyXG4gIF95ZWFyczogQXJyYXk8eyB2YWx1ZTogbnVtYmVyOyBlbmFibGVkOiBib29sZWFuIH0+ID0gW107XHJcblxyXG4gIC8qKiBUaGUgc2VsZWN0ZWQgeWVhci4gKi9cclxuICBfc2VsZWN0ZWRZZWFyOiBudW1iZXIgfCBudWxsO1xyXG5cclxuICAvKiogU2Nyb2xsZXIgc3Vic2NyaXB0aW9uLiAqL1xyXG4gIF9kaXNwb3NlU2Nyb2xsZXI6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcbiAgICBAT3B0aW9uYWwoKSBwdWJsaWMgX2RhdGVBZGFwdGVyOiBEYXRlQWRhcHRlcjxEPixcclxuICAgIEBPcHRpb25hbCgpXHJcbiAgICBASW5qZWN0KE1BVF9EQVRFX0ZPUk1BVFMpXHJcbiAgICBwcml2YXRlIF9kYXRlRm9ybWF0czogTWF0RGF0ZUZvcm1hdHNcclxuICApIHtcclxuICAgIGlmICghdGhpcy5fZGF0ZUFkYXB0ZXIpIHtcclxuICAgICAgdGhyb3cgY3JlYXRlTWlzc2luZ0RhdGVJbXBsRXJyb3IoJ0RhdGVBZGFwdGVyJyk7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMuX2RhdGVGb3JtYXRzKSB7XHJcbiAgICAgIHRocm93IGNyZWF0ZU1pc3NpbmdEYXRlSW1wbEVycm9yKCdNQVRfREFURV9GT1JNQVRTJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICBjb25zdCBsYXN0UG9zaXRpb24gPSB7IHNjcm9sbGVkOiAwIH07XHJcbiAgICB0aGlzLl9kaXNwb3NlU2Nyb2xsZXIgPSBmcm9tRXZlbnQodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdzY3JvbGwnKVxyXG4gICAgICAucGlwZShzYW1wbGVUaW1lKDMwMCksIG1lcmdlTWFwKChldjogYW55KSA9PiBvYnNPZih0aGlzLl9jYWxjdWxhdGVQb2ludHMoKSkpKVxyXG4gICAgICAuc3Vic2NyaWJlKChwb3M6IGFueSkgPT4gdGhpcy5faGFuZGxlU2Nyb2xsKHBvcywgbGFzdFBvc2l0aW9uKSk7XHJcblxyXG4gICAgdGhpcy5faW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLl9kaXNwb3NlU2Nyb2xsZXIudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIGFicyh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gTWF0aC5hYnModmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEluaXRpYWxpemVzIHRoaXMgeWVhciB2aWV3LiAqL1xyXG4gIF9pbml0KCkge1xyXG4gICAgdGhpcy5fc2VsZWN0ZWRZZWFyID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLnNlbGVjdGVkID8gdGhpcy5zZWxlY3RlZCA6IHRoaXMuYWN0aXZlRGF0ZSk7XHJcblxyXG4gICAgY29uc3QgZGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmNyZWF0ZURhdGUoXHJcbiAgICAgIHRoaXMuX3NlbGVjdGVkWWVhcixcclxuICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0TW9udGgodGhpcy5hY3RpdmVEYXRlKSxcclxuICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0RGF0ZSh0aGlzLmFjdGl2ZURhdGUpLFxyXG4gICAgICB0aGlzLl9kYXRlQWRhcHRlci5nZXRIb3Vycyh0aGlzLmFjdGl2ZURhdGUpLFxyXG4gICAgICB0aGlzLl9kYXRlQWRhcHRlci5nZXRNaW51dGVzKHRoaXMuYWN0aXZlRGF0ZSlcclxuICAgICk7XHJcbiAgICB0aGlzLl95ZWFycyA9IFtcclxuICAgICAge1xyXG4gICAgICAgIHZhbHVlOiB0aGlzLl9zZWxlY3RlZFllYXIsXHJcbiAgICAgICAgZW5hYmxlZDogIXRoaXMuZGF0ZUZpbHRlciB8fCB0aGlzLmRhdGVGaWx0ZXIoZGF0ZSwgJ21pbnV0ZScpXHJcbiAgICAgIH1cclxuICAgIF07XHJcblxyXG4gICAgdGhpcy5fcG9wdWxhdGVZZWFycygpO1xyXG5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgLT1cclxuICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQgLyAyIC0gWUVBUl9MSU5FX0hFSUdIVCAvIDI7XHJcbiAgICB9LCAyMCk7XHJcbiAgfVxyXG5cclxuICBfcG9wdWxhdGVZZWFycyhkb3duID0gZmFsc2UpIHtcclxuICAgIGlmIChcclxuICAgICAgKCFkb3duICYmICF0aGlzLl95ZWFyc1swXS5lbmFibGVkKSB8fFxyXG4gICAgICAoZG93biAmJiAhdGhpcy5feWVhcnNbdGhpcy5feWVhcnMubGVuZ3RoIC0gMV0uZW5hYmxlZClcclxuICAgICkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2VsZWN0ZWRNb250aCA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldE1vbnRoKHRoaXMuYWN0aXZlRGF0ZSk7XHJcbiAgICBjb25zdCBzZWxlY3RlZERheSA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldERhdGUodGhpcy5hY3RpdmVEYXRlKTtcclxuICAgIGNvbnN0IHNlbGVjdGVkSG91cnMgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRIb3Vycyh0aGlzLmFjdGl2ZURhdGUpO1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRNaW51dGVzID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0TWludXRlcyh0aGlzLmFjdGl2ZURhdGUpO1xyXG5cclxuICAgIGxldCBzY3JvbGwgPSAwO1xyXG4gICAgZm9yIChsZXQgeSA9IDE7IHkgPD0gMTA7IHkrKykge1xyXG4gICAgICBsZXQgeWVhciA9IHRoaXMuX3llYXJzW3RoaXMuX3llYXJzLmxlbmd0aCAtIDFdLnZhbHVlO1xyXG4gICAgICBsZXQgZGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmNyZWF0ZURhdGUoXHJcbiAgICAgICAgeWVhciArIDEsXHJcbiAgICAgICAgc2VsZWN0ZWRNb250aCxcclxuICAgICAgICBzZWxlY3RlZERheSxcclxuICAgICAgICBzZWxlY3RlZEhvdXJzLFxyXG4gICAgICAgIHNlbGVjdGVkTWludXRlc1xyXG4gICAgICApO1xyXG4gICAgICB0aGlzLl95ZWFycy5wdXNoKHtcclxuICAgICAgICB2YWx1ZTogeWVhciArIDEsXHJcbiAgICAgICAgZW5hYmxlZDogIXRoaXMuZGF0ZUZpbHRlciB8fCB0aGlzLmRhdGVGaWx0ZXIoZGF0ZSwgJ21pbnV0ZScpXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgeWVhciA9IHRoaXMuX3llYXJzWzBdLnZhbHVlO1xyXG4gICAgICBkYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuY3JlYXRlRGF0ZShcclxuICAgICAgICB5ZWFyIC0gMSxcclxuICAgICAgICBzZWxlY3RlZE1vbnRoLFxyXG4gICAgICAgIHNlbGVjdGVkRGF5LFxyXG4gICAgICAgIHNlbGVjdGVkSG91cnMsXHJcbiAgICAgICAgc2VsZWN0ZWRNaW51dGVzXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMuX3llYXJzLnVuc2hpZnQoe1xyXG4gICAgICAgIHZhbHVlOiB5ZWFyIC0gMSxcclxuICAgICAgICBlbmFibGVkOiAhdGhpcy5kYXRlRmlsdGVyIHx8IHRoaXMuZGF0ZUZpbHRlcihkYXRlLCAnbWludXRlJylcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBzY3JvbGwgKz0gWUVBUl9MSU5FX0hFSUdIVDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wICs9IGRvd24gPyBZRUFSX0xJTkVfSEVJR0hUIDogc2Nyb2xsO1xyXG4gICAgfSwgMTApO1xyXG5cclxuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xyXG4gIH1cclxuXHJcbiAgX3llYXJTZWxlY3RlZCh5ZWFyOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IHNlbGVjdGVkTW9udGggPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRNb250aCh0aGlzLmFjdGl2ZURhdGUpO1xyXG4gICAgY29uc3Qgc2VsZWN0ZWREYXkgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXREYXRlKHRoaXMuYWN0aXZlRGF0ZSk7XHJcbiAgICBjb25zdCBzZWxlY3RlZEhvdXJzID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0SG91cnModGhpcy5hY3RpdmVEYXRlKTtcclxuICAgIGNvbnN0IHNlbGVjdGVkTWludXRlcyA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldE1pbnV0ZXModGhpcy5hY3RpdmVEYXRlKTtcclxuICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdChcclxuICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIuY3JlYXRlRGF0ZSh5ZWFyLCBzZWxlY3RlZE1vbnRoLCBzZWxlY3RlZERheSwgc2VsZWN0ZWRIb3Vycywgc2VsZWN0ZWRNaW51dGVzKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIF9jYWxjdWxhdGVQb2ludHMoKSB7XHJcbiAgICBjb25zdCBlbCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgaGVpZ2h0OiBlbC5vZmZzZXRIZWlnaHQsXHJcbiAgICAgIHNjcm9sbGVkOiBlbC5zY3JvbGxUb3AsXHJcbiAgICAgIHRvdGFsOiBlbC5zY3JvbGxIZWlnaHRcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBfaGFuZGxlU2Nyb2xsKHBvc2l0aW9uLCBsYXN0UG9zaXRpb24pIHtcclxuICAgIGlmIChwb3NpdGlvbi5zY3JvbGxlZCA9PT0gMCAmJiBsYXN0UG9zaXRpb24uc2Nyb2xsZWQgPiAwKSB7XHJcbiAgICAgIHRoaXMuX3BvcHVsYXRlWWVhcnMoZmFsc2UpO1xyXG4gICAgfSBlbHNlIGlmIChwb3NpdGlvbi5oZWlnaHQgKyBwb3NpdGlvbi5zY3JvbGxlZCA9PT0gcG9zaXRpb24udG90YWwpIHtcclxuICAgICAgdGhpcy5fcG9wdWxhdGVZZWFycyh0cnVlKTtcclxuICAgIH1cclxuICAgIGxhc3RQb3NpdGlvbi5zY3JvbGxlZCA9IHBvc2l0aW9uLnNjcm9sbGVkO1xyXG4gIH1cclxuXHJcbiAgLyoqIEhhbmRsZXMga2V5ZG93biBldmVudHMgb24gdGhlIGNhbGVuZGFyIGJvZHkgd2hlbiBjYWxlbmRhciBpcyBpbiBtdWx0aS15ZWFyIHZpZXcuICovXHJcbiAgX2hhbmRsZUNhbGVuZGFyQm9keUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcclxuICAgIC8vIFRPRE8gaGFuZGxlIEBhbmd1bGFyL2Nkay9rZXljb2RlXHJcbiAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcclxuICAgICAgY2FzZSBVUF9BUlJPVzpcclxuICAgICAgICB0aGlzLmFjdGl2ZURhdGUgPSB0aGlzLl9kYXRlQWRhcHRlci5hZGRDYWxlbmRhclllYXJzKHRoaXMuX2FjdGl2ZURhdGUsIC0xKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBET1dOX0FSUk9XOlxyXG4gICAgICAgIHRoaXMuYWN0aXZlRGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnModGhpcy5fYWN0aXZlRGF0ZSwgMSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgRU5URVI6XHJcbiAgICAgICAgdGhpcy5feWVhclNlbGVjdGVkKHRoaXMuX2RhdGVBZGFwdGVyLmdldFllYXIodGhpcy5fYWN0aXZlRGF0ZSkpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIC8vIERvbid0IHByZXZlbnQgZGVmYXVsdCBvciBmb2N1cyBhY3RpdmUgY2VsbCBvbiBrZXlzIHRoYXQgd2UgZG9uJ3QgZXhwbGljaXRseSBoYW5kbGUuXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2ZvY3VzQWN0aXZlQ2VsbCgpO1xyXG4gICAgLy8gUHJldmVudCB1bmV4cGVjdGVkIGRlZmF1bHQgYWN0aW9ucyBzdWNoIGFzIGZvcm0gc3VibWlzc2lvbi5cclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfVxyXG5cclxuICBfZm9jdXNBY3RpdmVDZWxsKCkge31cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIG9iaiBUaGUgb2JqZWN0IHRvIGNoZWNrLlxyXG4gICAqIEByZXR1cm5zIFRoZSBnaXZlbiBvYmplY3QgaWYgaXQgaXMgYm90aCBhIGRhdGUgaW5zdGFuY2UgYW5kIHZhbGlkLCBvdGhlcndpc2UgbnVsbC5cclxuICAgKi9cclxuICBwcml2YXRlIF9nZXRWYWxpZERhdGVPck51bGwob2JqOiBhbnkpOiBEIHwgbnVsbCB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGF0ZUFkYXB0ZXIuaXNEYXRlSW5zdGFuY2Uob2JqKSAmJiB0aGlzLl9kYXRlQWRhcHRlci5pc1ZhbGlkKG9iaikgPyBvYmogOiBudWxsO1xyXG4gIH1cclxufVxyXG4iXX0=