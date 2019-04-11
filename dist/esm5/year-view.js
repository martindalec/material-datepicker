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
import { DOWN_ARROW, END, ENTER, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Input, Optional, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { MatCalendarBody, MatCalendarCell } from './calendar-body';
import { MAT_DATE_FORMATS } from './core/index';
import { DateAdapter } from './core/index';
import { slideCalendar } from './datepicker-animations';
import { createMissingDateImplError } from './datepicker-errors';
/**
 * An internal component used to display a single year in the datepicker.
 * \@docs-private
 * @template D
 */
var MatYearView = /** @class */ (function () {
    function MatYearView(_changeDetectorRef, _dateFormats, _dateAdapter, _dir) {
        this._changeDetectorRef = _changeDetectorRef;
        this._dateFormats = _dateFormats;
        this._dateAdapter = _dateAdapter;
        this._dir = _dir;
        /**
         * Emits when a new month is selected.
         */
        this.selectedChange = new EventEmitter();
        /**
         * Emits when any date is activated.
         */
        this.activeDateChange = new EventEmitter();
        if (!this._dateAdapter) {
            throw createMissingDateImplError('DateAdapter');
        }
        if (!this._dateFormats) {
            throw createMissingDateImplError('MAT_DATE_FORMATS');
        }
    }
    Object.defineProperty(MatYearView.prototype, "activeDate", {
        /** The date to display in this year view (everything other than the year is ignored). */
        get: /**
         * The date to display in this year view (everything other than the year is ignored).
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
                this._dateAdapter.getYear(oldActiveDate) !== this._dateAdapter.getYear(this._activeDate)) {
                this._init();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatYearView.prototype, "selected", {
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
            this._selectedMonth = this._getMonthInCurrentYear(this._selected);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatYearView.prototype, "minDate", {
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
    Object.defineProperty(MatYearView.prototype, "maxDate", {
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
    MatYearView.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this._init();
    };
    /** Handles when a new month is selected. */
    /**
     * Handles when a new month is selected.
     * @param {?} month
     * @return {?}
     */
    MatYearView.prototype._monthSelected = /**
     * Handles when a new month is selected.
     * @param {?} month
     * @return {?}
     */
    function (month) {
        /** @type {?} */
        var daysInMonth = this._dateAdapter.getNumDaysInMonth(this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), month, 1));
        /** @type {?} */
        var selectedYear = this._dateAdapter.getYear(this.activeDate);
        /** @type {?} */
        var selectedDay = this._dateAdapter.getDate(this.activeDate);
        /** @type {?} */
        var selectedHours = this._dateAdapter.getHours(this.activeDate);
        /** @type {?} */
        var selectedMinutes = this._dateAdapter.getMinutes(this.activeDate);
        /** @type {?} */
        var date = this._dateAdapter.createDate(selectedYear, month, Math.min(selectedDay, daysInMonth), selectedHours, selectedMinutes);
        this.selectedChange.emit(date);
    };
    /** Initializes this year view. */
    /**
     * Initializes this year view.
     * @return {?}
     */
    MatYearView.prototype._init = /**
     * Initializes this year view.
     * @return {?}
     */
    function () {
        var _this = this;
        this._selectedMonth = this._getMonthInCurrentYear(this.selected);
        this._todayMonth = this._getMonthInCurrentYear(this._dateAdapter.today());
        this._yearLabel = this._dateAdapter.getYearName(this.activeDate);
        /** @type {?} */
        var monthNames = this._dateAdapter.getMonthNames('short');
        // First row of months only contains 5 elements so we can fit the year label on the same row.
        this._months = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11]].map((/**
         * @param {?} row
         * @return {?}
         */
        function (row) {
            return row.map((/**
             * @param {?} month
             * @return {?}
             */
            function (month) { return _this._createCellForMonth(month, monthNames[month]); }));
        }));
        this._changeDetectorRef.markForCheck();
    };
    /**
     * Gets the month in this year that the given Date falls on.
     * Returns null if the given Date is in another year.
     */
    /**
     * Gets the month in this year that the given Date falls on.
     * Returns null if the given Date is in another year.
     * @private
     * @param {?} date
     * @return {?}
     */
    MatYearView.prototype._getMonthInCurrentYear = /**
     * Gets the month in this year that the given Date falls on.
     * Returns null if the given Date is in another year.
     * @private
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date && this._dateAdapter.getYear(date) === this._dateAdapter.getYear(this.activeDate)
            ? this._dateAdapter.getMonth(date)
            : null;
    };
    /** Creates an MatCalendarCell for the given month. */
    /**
     * Creates an MatCalendarCell for the given month.
     * @private
     * @param {?} month
     * @param {?} monthName
     * @return {?}
     */
    MatYearView.prototype._createCellForMonth = /**
     * Creates an MatCalendarCell for the given month.
     * @private
     * @param {?} month
     * @param {?} monthName
     * @return {?}
     */
    function (month, monthName) {
        /** @type {?} */
        var ariaLabel = this._dateAdapter.format(this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), month, 1), this._dateFormats.display.monthYearA11yLabel);
        return new MatCalendarCell(month, monthName.toLocaleUpperCase(), ariaLabel, this._shouldEnableMonth(month));
    };
    /** Whether the given month is enabled. */
    /**
     * Whether the given month is enabled.
     * @private
     * @param {?} month
     * @return {?}
     */
    MatYearView.prototype._shouldEnableMonth = /**
     * Whether the given month is enabled.
     * @private
     * @param {?} month
     * @return {?}
     */
    function (month) {
        /** @type {?} */
        var activeYear = this._dateAdapter.getYear(this.activeDate);
        if (month === undefined ||
            month === null ||
            this._isYearAndMonthAfterMaxDate(activeYear, month) ||
            this._isYearAndMonthBeforeMinDate(activeYear, month)) {
            return false;
        }
        if (!this.dateFilter) {
            return true;
        }
        /** @type {?} */
        var firstOfMonth = this._dateAdapter.createDate(activeYear, month, 1);
        // If any date in the month is enabled count the month as enabled.
        for (var d = firstOfMonth; this._dateAdapter.getMonth(d) == month; d = this._dateAdapter.addCalendarDays(d, 1)) {
            if (this.dateFilter(d, 'day')) {
                return true;
            }
        }
        return false;
    };
    /**
     * Tests whether the combination month/year is after this.maxDate, considering
     * just the month and year of this.maxDate
     */
    /**
     * Tests whether the combination month/year is after this.maxDate, considering
     * just the month and year of this.maxDate
     * @private
     * @param {?} year
     * @param {?} month
     * @return {?}
     */
    MatYearView.prototype._isYearAndMonthAfterMaxDate = /**
     * Tests whether the combination month/year is after this.maxDate, considering
     * just the month and year of this.maxDate
     * @private
     * @param {?} year
     * @param {?} month
     * @return {?}
     */
    function (year, month) {
        if (this.maxDate) {
            /** @type {?} */
            var maxYear = this._dateAdapter.getYear(this.maxDate);
            /** @type {?} */
            var maxMonth = this._dateAdapter.getMonth(this.maxDate);
            return year > maxYear || (year === maxYear && month > maxMonth);
        }
        return false;
    };
    /**
     * Tests whether the combination month/year is before this.minDate, considering
     * just the month and year of this.minDate
     */
    /**
     * Tests whether the combination month/year is before this.minDate, considering
     * just the month and year of this.minDate
     * @private
     * @param {?} year
     * @param {?} month
     * @return {?}
     */
    MatYearView.prototype._isYearAndMonthBeforeMinDate = /**
     * Tests whether the combination month/year is before this.minDate, considering
     * just the month and year of this.minDate
     * @private
     * @param {?} year
     * @param {?} month
     * @return {?}
     */
    function (year, month) {
        if (this.minDate) {
            /** @type {?} */
            var minYear = this._dateAdapter.getYear(this.minDate);
            /** @type {?} */
            var minMonth = this._dateAdapter.getMonth(this.minDate);
            return year < minYear || (year === minYear && month < minMonth);
        }
    };
    /** Handles keydown events on the calendar body when calendar is in year view. */
    /**
     * Handles keydown events on the calendar body when calendar is in year view.
     * @param {?} event
     * @return {?}
     */
    MatYearView.prototype._handleCalendarBodyKeydown = /**
     * Handles keydown events on the calendar body when calendar is in year view.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // TODO(mmalerba): We currently allow keyboard navigation to disabled dates, but just prevent
        // disabled ones from being selected. This may not be ideal, we should look into whether
        // navigation should skip over disabled dates, and if so, how to implement that efficiently.
        // TODO(mmalerba): We currently allow keyboard navigation to disabled dates, but just prevent
        // disabled ones from being selected. This may not be ideal, we should look into whether
        // navigation should skip over disabled dates, and if so, how to implement that efficiently.
        /** @type {?} */
        var oldActiveDate = this._activeDate;
        /** @type {?} */
        var isRtl = this._isRtl();
        switch (event.keyCode) {
            case LEFT_ARROW:
                this.activeDate = this._dateAdapter.addCalendarMonths(this._activeDate, isRtl ? 1 : -1);
                break;
            case RIGHT_ARROW:
                this.activeDate = this._dateAdapter.addCalendarMonths(this._activeDate, isRtl ? -1 : 1);
                break;
            case UP_ARROW:
                this.activeDate = this._dateAdapter.addCalendarMonths(this._activeDate, -4);
                break;
            case DOWN_ARROW:
                this.activeDate = this._dateAdapter.addCalendarMonths(this._activeDate, 4);
                break;
            case HOME:
                this.activeDate = this._dateAdapter.addCalendarMonths(this._activeDate, this._dateAdapter.getMonth(this._activeDate));
                break;
            case END:
                this.activeDate = this._dateAdapter.addCalendarMonths(this._activeDate, 11 - this._dateAdapter.getMonth(this._activeDate));
                break;
            case PAGE_UP:
                this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, event.altKey ? -10 : -1);
                break;
            case PAGE_DOWN:
                this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, event.altKey ? 10 : 1);
                break;
            case ENTER:
                this._monthSelected(this._dateAdapter.getMonth(this._activeDate));
                break;
            default:
                // Don't prevent default or focus active cell on keys that we don't explicitly handle.
                return;
        }
        if (this._dateAdapter.compareDate(oldActiveDate, this.activeDate)) {
            this.activeDateChange.emit(this.activeDate);
        }
        this._focusActiveCell();
        // Prevent unexpected default actions such as form submission.
        event.preventDefault();
    };
    /**
     * @return {?}
     */
    MatYearView.prototype._focusActiveCell = /**
     * @return {?}
     */
    function () {
        this._matCalendarBody._focusActiveCell();
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
    MatYearView.prototype._getValidDateOrNull = /**
     * @private
     * @param {?} obj The object to check.
     * @return {?} The given object if it is both a date instance and valid, otherwise null.
     */
    function (obj) {
        return this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj) ? obj : null;
    };
    /** Determines whether the user has the RTL layout direction. */
    /**
     * Determines whether the user has the RTL layout direction.
     * @private
     * @return {?}
     */
    MatYearView.prototype._isRtl = /**
     * Determines whether the user has the RTL layout direction.
     * @private
     * @return {?}
     */
    function () {
        return this._dir && this._dir.value === 'rtl';
    };
    MatYearView.decorators = [
        { type: Component, args: [{
                    selector: 'mat-year-view',
                    template: "<table class=\"mat-calendar-table\">\r\n  <tbody mat-calendar-body\r\n    [@slideCalendar]=\"animationDir\"\r\n    role=\"grid\"\r\n    allowDisabledSelection=\"true\"\r\n    [rows]=\"_months\"\r\n    [todayValue]=\"_todayMonth\"\r\n    [selectedValue]=\"_selectedMonth\"\r\n    [labelMinRequiredCells]=\"2\"\r\n    [numCols]=\"4\"\r\n    [cellAspectRatio]=\"4 / 7\"\r\n    [activeCell]=\"_dateAdapter.getMonth(activeDate)\"\r\n    (selectedValueChange)=\"_monthSelected($event)\"\r\n    (keydown)=\"_handleCalendarBodyKeydown($event)\">\r\n  </tbody>\r\n</table>\r\n",
                    exportAs: 'matYearView',
                    animations: [slideCalendar],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    preserveWhitespaces: false
                }] }
    ];
    /** @nocollapse */
    MatYearView.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_DATE_FORMATS,] }] },
        { type: DateAdapter, decorators: [{ type: Optional }] },
        { type: Directionality, decorators: [{ type: Optional }] }
    ]; };
    MatYearView.propDecorators = {
        activeDate: [{ type: Input }],
        selected: [{ type: Input }],
        minDate: [{ type: Input }],
        maxDate: [{ type: Input }],
        dateFilter: [{ type: Input }],
        animationDir: [{ type: Input }],
        selectedChange: [{ type: Output }],
        activeDateChange: [{ type: Output }],
        _matCalendarBody: [{ type: ViewChild, args: [MatCalendarBody,] }]
    };
    return MatYearView;
}());
export { MatYearView };
if (false) {
    /**
     * @type {?}
     * @private
     */
    MatYearView.prototype._activeDate;
    /**
     * @type {?}
     * @private
     */
    MatYearView.prototype._selected;
    /**
     * @type {?}
     * @private
     */
    MatYearView.prototype._minDate;
    /**
     * @type {?}
     * @private
     */
    MatYearView.prototype._maxDate;
    /**
     * A function used to filter which dates are selectable.
     * @type {?}
     */
    MatYearView.prototype.dateFilter;
    /**
     * Animations handler
     * @type {?}
     */
    MatYearView.prototype.animationDir;
    /**
     * Emits when a new month is selected.
     * @type {?}
     */
    MatYearView.prototype.selectedChange;
    /**
     * Emits when any date is activated.
     * @type {?}
     */
    MatYearView.prototype.activeDateChange;
    /**
     * The body of calendar table
     * @type {?}
     */
    MatYearView.prototype._matCalendarBody;
    /**
     * Grid of calendar cells representing the months of the year.
     * @type {?}
     */
    MatYearView.prototype._months;
    /**
     * The label for this year (e.g. "2017").
     * @type {?}
     */
    MatYearView.prototype._yearLabel;
    /**
     * The month in this year that today falls on. Null if today is in a different year.
     * @type {?}
     */
    MatYearView.prototype._todayMonth;
    /**
     * The month in this year that the selected Date falls on.
     * Null if the selected Date is in a different year.
     * @type {?}
     */
    MatYearView.prototype._selectedMonth;
    /**
     * @type {?}
     * @private
     */
    MatYearView.prototype._changeDetectorRef;
    /**
     * @type {?}
     * @private
     */
    MatYearView.prototype._dateFormats;
    /** @type {?} */
    MatYearView.prototype._dateAdapter;
    /**
     * @type {?}
     * @private
     */
    MatYearView.prototype._dir;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWVhci12aWV3LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG1hcnRpbmRhbGVjL2RhdGVwaWNrZXIvIiwic291cmNlcyI6WyJ5ZWFyLXZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQ0wsVUFBVSxFQUNWLEdBQUcsRUFDSCxLQUFLLEVBQ0wsSUFBSSxFQUNKLFVBQVUsRUFDVixTQUFTLEVBQ1QsT0FBTyxFQUNQLFdBQVcsRUFDWCxRQUFRLEVBQ1QsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxnQkFBZ0IsRUFBa0IsTUFBTSxjQUFjLENBQUM7QUFDaEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUMzQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDeEQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7OztBQU1qRTtJQTJGRSxxQkFDVSxrQkFBcUMsRUFHckMsWUFBNEIsRUFDakIsWUFBNEIsRUFDM0IsSUFBcUI7UUFMakMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQUdyQyxpQkFBWSxHQUFaLFlBQVksQ0FBZ0I7UUFDakIsaUJBQVksR0FBWixZQUFZLENBQWdCO1FBQzNCLFNBQUksR0FBSixJQUFJLENBQWlCOzs7O1FBN0J4QixtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFLLENBQUM7Ozs7UUFH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LElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDO0lBQ2hELENBQUM7O2dCQXBURixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLG1rQkFBNkI7b0JBQzdCLFFBQVEsRUFBRSxhQUFhO29CQUN2QixVQUFVLEVBQUUsQ0FBQyxhQUFhLENBQUM7b0JBQzNCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsbUJBQW1CLEVBQUUsS0FBSztpQkFDM0I7Ozs7Z0JBN0JDLGlCQUFpQjtnREFrSGQsUUFBUSxZQUNSLE1BQU0sU0FBQyxnQkFBZ0I7Z0JBdEduQixXQUFXLHVCQXdHZixRQUFRO2dCQTNHSixjQUFjLHVCQTRHbEIsUUFBUTs7OzZCQXRGVixLQUFLOzJCQW9CTCxLQUFLOzBCQVdMLEtBQUs7MEJBVUwsS0FBSzs2QkFVTCxLQUFLOytCQUdMLEtBQUs7aUNBR0wsTUFBTTttQ0FHTixNQUFNO21DQUdOLFNBQVMsU0FBQyxlQUFlOztJQTJPNUIsa0JBQUM7Q0FBQSxBQXJURCxJQXFUQztTQTVTWSxXQUFXOzs7Ozs7SUFtQnRCLGtDQUF1Qjs7Ozs7SUFXdkIsZ0NBQTRCOzs7OztJQVU1QiwrQkFBMkI7Ozs7O0lBVTNCLCtCQUEyQjs7Ozs7SUFHM0IsaUNBQXlEOzs7OztJQUd6RCxtQ0FBOEI7Ozs7O0lBRzlCLHFDQUEwRDs7Ozs7SUFHMUQsdUNBQTREOzs7OztJQUc1RCx1Q0FBOEQ7Ozs7O0lBRzlELDhCQUE2Qjs7Ozs7SUFHN0IsaUNBQW1COzs7OztJQUduQixrQ0FBMkI7Ozs7OztJQU0zQixxQ0FBOEI7Ozs7O0lBRzVCLHlDQUE2Qzs7Ozs7SUFDN0MsbUNBRW9DOztJQUNwQyxtQ0FBK0M7Ozs7O0lBQy9DLDJCQUF5QyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKlxyXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxyXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXHJcbiAqL1xyXG5cclxuaW1wb3J0IHtcclxuICBET1dOX0FSUk9XLFxyXG4gIEVORCxcclxuICBFTlRFUixcclxuICBIT01FLFxyXG4gIExFRlRfQVJST1csXHJcbiAgUEFHRV9ET1dOLFxyXG4gIFBBR0VfVVAsXHJcbiAgUklHSFRfQVJST1csXHJcbiAgVVBfQVJST1dcclxufSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xyXG5pbXBvcnQge1xyXG4gIEFmdGVyQ29udGVudEluaXQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ29tcG9uZW50LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBJbmplY3QsXHJcbiAgSW5wdXQsXHJcbiAgT3B0aW9uYWwsXHJcbiAgT3V0cHV0LFxyXG4gIFZpZXdDaGlsZCxcclxuICBWaWV3RW5jYXBzdWxhdGlvblxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcclxuaW1wb3J0IHsgTWF0Q2FsZW5kYXJCb2R5LCBNYXRDYWxlbmRhckNlbGwgfSBmcm9tICcuL2NhbGVuZGFyLWJvZHknO1xyXG5pbXBvcnQgeyBNQVRfREFURV9GT1JNQVRTLCBNYXREYXRlRm9ybWF0cyB9IGZyb20gJy4vY29yZS9pbmRleCc7XHJcbmltcG9ydCB7IERhdGVBZGFwdGVyIH0gZnJvbSAnLi9jb3JlL2luZGV4JztcclxuaW1wb3J0IHsgc2xpZGVDYWxlbmRhciB9IGZyb20gJy4vZGF0ZXBpY2tlci1hbmltYXRpb25zJztcclxuaW1wb3J0IHsgY3JlYXRlTWlzc2luZ0RhdGVJbXBsRXJyb3IgfSBmcm9tICcuL2RhdGVwaWNrZXItZXJyb3JzJztcclxuXHJcbi8qKlxyXG4gKiBBbiBpbnRlcm5hbCBjb21wb25lbnQgdXNlZCB0byBkaXNwbGF5IGEgc2luZ2xlIHllYXIgaW4gdGhlIGRhdGVwaWNrZXIuXHJcbiAqIEBkb2NzLXByaXZhdGVcclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbWF0LXllYXItdmlldycsXHJcbiAgdGVtcGxhdGVVcmw6ICd5ZWFyLXZpZXcuaHRtbCcsXHJcbiAgZXhwb3J0QXM6ICdtYXRZZWFyVmlldycsXHJcbiAgYW5pbWF0aW9uczogW3NsaWRlQ2FsZW5kYXJdLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2VcclxufSlcclxuZXhwb3J0IGNsYXNzIE1hdFllYXJWaWV3PEQ+IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCB7XHJcbiAgLyoqIFRoZSBkYXRlIHRvIGRpc3BsYXkgaW4gdGhpcyB5ZWFyIHZpZXcgKGV2ZXJ5dGhpbmcgb3RoZXIgdGhhbiB0aGUgeWVhciBpcyBpZ25vcmVkKS4gKi9cclxuICBASW5wdXQoKVxyXG4gIGdldCBhY3RpdmVEYXRlKCk6IEQge1xyXG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZURhdGU7XHJcbiAgfVxyXG4gIHNldCBhY3RpdmVEYXRlKHZhbHVlOiBEKSB7XHJcbiAgICBjb25zdCBvbGRBY3RpdmVEYXRlID0gdGhpcy5fYWN0aXZlRGF0ZTtcclxuICAgIGNvbnN0IHZhbGlkRGF0ZSA9XHJcbiAgICAgIHRoaXMuX2dldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLl9kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpIHx8IHRoaXMuX2RhdGVBZGFwdGVyLnRvZGF5KCk7XHJcbiAgICB0aGlzLl9hY3RpdmVEYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuY2xhbXBEYXRlKHZhbGlkRGF0ZSwgdGhpcy5taW5EYXRlLCB0aGlzLm1heERhdGUpO1xyXG5cclxuICAgIGlmIChcclxuICAgICAgb2xkQWN0aXZlRGF0ZSAmJlxyXG4gICAgICB0aGlzLl9kYXRlQWRhcHRlci5nZXRZZWFyKG9sZEFjdGl2ZURhdGUpICE9PSB0aGlzLl9kYXRlQWRhcHRlci5nZXRZZWFyKHRoaXMuX2FjdGl2ZURhdGUpXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5faW5pdCgpO1xyXG4gICAgfVxyXG4gIH1cclxuICBwcml2YXRlIF9hY3RpdmVEYXRlOiBEO1xyXG5cclxuICAvKiogVGhlIGN1cnJlbnRseSBzZWxlY3RlZCBkYXRlLiAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHNlbGVjdGVkKCk6IEQgfCBudWxsIHtcclxuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcclxuICB9XHJcbiAgc2V0IHNlbGVjdGVkKHZhbHVlOiBEIHwgbnVsbCkge1xyXG4gICAgdGhpcy5fc2VsZWN0ZWQgPSB0aGlzLl9nZXRWYWxpZERhdGVPck51bGwodGhpcy5fZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpKTtcclxuICAgIHRoaXMuX3NlbGVjdGVkTW9udGggPSB0aGlzLl9nZXRNb250aEluQ3VycmVudFllYXIodGhpcy5fc2VsZWN0ZWQpO1xyXG4gIH1cclxuICBwcml2YXRlIF9zZWxlY3RlZDogRCB8IG51bGw7XHJcblxyXG4gIC8qKiBUaGUgbWluaW11bSBzZWxlY3RhYmxlIGRhdGUuICovXHJcbiAgQElucHV0KClcclxuICBnZXQgbWluRGF0ZSgpOiBEIHwgbnVsbCB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWluRGF0ZTtcclxuICB9XHJcbiAgc2V0IG1pbkRhdGUodmFsdWU6IEQgfCBudWxsKSB7XHJcbiAgICB0aGlzLl9taW5EYXRlID0gdGhpcy5fZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuX2RhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX21pbkRhdGU6IEQgfCBudWxsO1xyXG5cclxuICAvKiogVGhlIG1heGltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IG1heERhdGUoKTogRCB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMuX21heERhdGU7XHJcbiAgfVxyXG4gIHNldCBtYXhEYXRlKHZhbHVlOiBEIHwgbnVsbCkge1xyXG4gICAgdGhpcy5fbWF4RGF0ZSA9IHRoaXMuX2dldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLl9kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpO1xyXG4gIH1cclxuICBwcml2YXRlIF9tYXhEYXRlOiBEIHwgbnVsbDtcclxuXHJcbiAgLyoqIEEgZnVuY3Rpb24gdXNlZCB0byBmaWx0ZXIgd2hpY2ggZGF0ZXMgYXJlIHNlbGVjdGFibGUuICovXHJcbiAgQElucHV0KCkgZGF0ZUZpbHRlcjogKGRhdGU6IEQsIHVuaXQ/OiBzdHJpbmcpID0+IGJvb2xlYW47XHJcblxyXG4gIC8qKiBBbmltYXRpb25zIGhhbmRsZXIgKi9cclxuICBASW5wdXQoKSBhbmltYXRpb25EaXI6IHN0cmluZztcclxuXHJcbiAgLyoqIEVtaXRzIHdoZW4gYSBuZXcgbW9udGggaXMgc2VsZWN0ZWQuICovXHJcbiAgQE91dHB1dCgpIHJlYWRvbmx5IHNlbGVjdGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxEPigpO1xyXG5cclxuICAvKiogRW1pdHMgd2hlbiBhbnkgZGF0ZSBpcyBhY3RpdmF0ZWQuICovXHJcbiAgQE91dHB1dCgpIHJlYWRvbmx5IGFjdGl2ZURhdGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPEQ+KCk7XHJcblxyXG4gIC8qKiBUaGUgYm9keSBvZiBjYWxlbmRhciB0YWJsZSAqL1xyXG4gIEBWaWV3Q2hpbGQoTWF0Q2FsZW5kYXJCb2R5KSBfbWF0Q2FsZW5kYXJCb2R5OiBNYXRDYWxlbmRhckJvZHk7XHJcblxyXG4gIC8qKiBHcmlkIG9mIGNhbGVuZGFyIGNlbGxzIHJlcHJlc2VudGluZyB0aGUgbW9udGhzIG9mIHRoZSB5ZWFyLiAqL1xyXG4gIF9tb250aHM6IE1hdENhbGVuZGFyQ2VsbFtdW107XHJcblxyXG4gIC8qKiBUaGUgbGFiZWwgZm9yIHRoaXMgeWVhciAoZS5nLiBcIjIwMTdcIikuICovXHJcbiAgX3llYXJMYWJlbDogc3RyaW5nO1xyXG5cclxuICAvKiogVGhlIG1vbnRoIGluIHRoaXMgeWVhciB0aGF0IHRvZGF5IGZhbGxzIG9uLiBOdWxsIGlmIHRvZGF5IGlzIGluIGEgZGlmZmVyZW50IHllYXIuICovXHJcbiAgX3RvZGF5TW9udGg6IG51bWJlciB8IG51bGw7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBtb250aCBpbiB0aGlzIHllYXIgdGhhdCB0aGUgc2VsZWN0ZWQgRGF0ZSBmYWxscyBvbi5cclxuICAgKiBOdWxsIGlmIHRoZSBzZWxlY3RlZCBEYXRlIGlzIGluIGEgZGlmZmVyZW50IHllYXIuXHJcbiAgICovXHJcbiAgX3NlbGVjdGVkTW9udGg6IG51bWJlciB8IG51bGw7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgQE9wdGlvbmFsKClcclxuICAgIEBJbmplY3QoTUFUX0RBVEVfRk9STUFUUylcclxuICAgIHByaXZhdGUgX2RhdGVGb3JtYXRzOiBNYXREYXRlRm9ybWF0cyxcclxuICAgIEBPcHRpb25hbCgpIHB1YmxpYyBfZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyPEQ+LFxyXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBfZGlyPzogRGlyZWN0aW9uYWxpdHlcclxuICApIHtcclxuICAgIGlmICghdGhpcy5fZGF0ZUFkYXB0ZXIpIHtcclxuICAgICAgdGhyb3cgY3JlYXRlTWlzc2luZ0RhdGVJbXBsRXJyb3IoJ0RhdGVBZGFwdGVyJyk7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMuX2RhdGVGb3JtYXRzKSB7XHJcbiAgICAgIHRocm93IGNyZWF0ZU1pc3NpbmdEYXRlSW1wbEVycm9yKCdNQVRfREFURV9GT1JNQVRTJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICB0aGlzLl9pbml0KCk7XHJcbiAgfVxyXG5cclxuICAvKiogSGFuZGxlcyB3aGVuIGEgbmV3IG1vbnRoIGlzIHNlbGVjdGVkLiAqL1xyXG4gIF9tb250aFNlbGVjdGVkKG1vbnRoOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IGRheXNJbk1vbnRoID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0TnVtRGF5c0luTW9udGgoXHJcbiAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmNyZWF0ZURhdGUodGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLmFjdGl2ZURhdGUpLCBtb250aCwgMSlcclxuICAgICk7XHJcbiAgICBjb25zdCBzZWxlY3RlZFllYXIgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRZZWFyKHRoaXMuYWN0aXZlRGF0ZSk7XHJcbiAgICBjb25zdCBzZWxlY3RlZERheSA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldERhdGUodGhpcy5hY3RpdmVEYXRlKTtcclxuICAgIGNvbnN0IHNlbGVjdGVkSG91cnMgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRIb3Vycyh0aGlzLmFjdGl2ZURhdGUpO1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRNaW51dGVzID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0TWludXRlcyh0aGlzLmFjdGl2ZURhdGUpO1xyXG4gICAgY29uc3QgZGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmNyZWF0ZURhdGUoXHJcbiAgICAgIHNlbGVjdGVkWWVhcixcclxuICAgICAgbW9udGgsXHJcbiAgICAgIE1hdGgubWluKHNlbGVjdGVkRGF5LCBkYXlzSW5Nb250aCksXHJcbiAgICAgIHNlbGVjdGVkSG91cnMsXHJcbiAgICAgIHNlbGVjdGVkTWludXRlc1xyXG4gICAgKTtcclxuICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdChkYXRlKTtcclxuICB9XHJcblxyXG4gIC8qKiBJbml0aWFsaXplcyB0aGlzIHllYXIgdmlldy4gKi9cclxuICBfaW5pdCgpIHtcclxuICAgIHRoaXMuX3NlbGVjdGVkTW9udGggPSB0aGlzLl9nZXRNb250aEluQ3VycmVudFllYXIodGhpcy5zZWxlY3RlZCk7XHJcbiAgICB0aGlzLl90b2RheU1vbnRoID0gdGhpcy5fZ2V0TW9udGhJbkN1cnJlbnRZZWFyKHRoaXMuX2RhdGVBZGFwdGVyLnRvZGF5KCkpO1xyXG4gICAgdGhpcy5feWVhckxhYmVsID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0WWVhck5hbWUodGhpcy5hY3RpdmVEYXRlKTtcclxuXHJcbiAgICBjb25zdCBtb250aE5hbWVzID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0TW9udGhOYW1lcygnc2hvcnQnKTtcclxuICAgIC8vIEZpcnN0IHJvdyBvZiBtb250aHMgb25seSBjb250YWlucyA1IGVsZW1lbnRzIHNvIHdlIGNhbiBmaXQgdGhlIHllYXIgbGFiZWwgb24gdGhlIHNhbWUgcm93LlxyXG4gICAgdGhpcy5fbW9udGhzID0gW1swLCAxLCAyLCAzXSwgWzQsIDUsIDYsIDddLCBbOCwgOSwgMTAsIDExXV0ubWFwKHJvdyA9PlxyXG4gICAgICByb3cubWFwKG1vbnRoID0+IHRoaXMuX2NyZWF0ZUNlbGxGb3JNb250aChtb250aCwgbW9udGhOYW1lc1ttb250aF0pKVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdGhlIG1vbnRoIGluIHRoaXMgeWVhciB0aGF0IHRoZSBnaXZlbiBEYXRlIGZhbGxzIG9uLlxyXG4gICAqIFJldHVybnMgbnVsbCBpZiB0aGUgZ2l2ZW4gRGF0ZSBpcyBpbiBhbm90aGVyIHllYXIuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZ2V0TW9udGhJbkN1cnJlbnRZZWFyKGRhdGU6IEQgfCBudWxsKSB7XHJcbiAgICByZXR1cm4gZGF0ZSAmJiB0aGlzLl9kYXRlQWRhcHRlci5nZXRZZWFyKGRhdGUpID09PSB0aGlzLl9kYXRlQWRhcHRlci5nZXRZZWFyKHRoaXMuYWN0aXZlRGF0ZSlcclxuICAgICAgPyB0aGlzLl9kYXRlQWRhcHRlci5nZXRNb250aChkYXRlKVxyXG4gICAgICA6IG51bGw7XHJcbiAgfVxyXG5cclxuICAvKiogQ3JlYXRlcyBhbiBNYXRDYWxlbmRhckNlbGwgZm9yIHRoZSBnaXZlbiBtb250aC4gKi9cclxuICBwcml2YXRlIF9jcmVhdGVDZWxsRm9yTW9udGgobW9udGg6IG51bWJlciwgbW9udGhOYW1lOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IGFyaWFMYWJlbCA9IHRoaXMuX2RhdGVBZGFwdGVyLmZvcm1hdChcclxuICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIuY3JlYXRlRGF0ZSh0aGlzLl9kYXRlQWRhcHRlci5nZXRZZWFyKHRoaXMuYWN0aXZlRGF0ZSksIG1vbnRoLCAxKSxcclxuICAgICAgdGhpcy5fZGF0ZUZvcm1hdHMuZGlzcGxheS5tb250aFllYXJBMTF5TGFiZWxcclxuICAgICk7XHJcbiAgICByZXR1cm4gbmV3IE1hdENhbGVuZGFyQ2VsbChcclxuICAgICAgbW9udGgsXHJcbiAgICAgIG1vbnRoTmFtZS50b0xvY2FsZVVwcGVyQ2FzZSgpLFxyXG4gICAgICBhcmlhTGFiZWwsXHJcbiAgICAgIHRoaXMuX3Nob3VsZEVuYWJsZU1vbnRoKG1vbnRoKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKiBXaGV0aGVyIHRoZSBnaXZlbiBtb250aCBpcyBlbmFibGVkLiAqL1xyXG4gIHByaXZhdGUgX3Nob3VsZEVuYWJsZU1vbnRoKG1vbnRoOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IGFjdGl2ZVllYXIgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRZZWFyKHRoaXMuYWN0aXZlRGF0ZSk7XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICBtb250aCA9PT0gdW5kZWZpbmVkIHx8XHJcbiAgICAgIG1vbnRoID09PSBudWxsIHx8XHJcbiAgICAgIHRoaXMuX2lzWWVhckFuZE1vbnRoQWZ0ZXJNYXhEYXRlKGFjdGl2ZVllYXIsIG1vbnRoKSB8fFxyXG4gICAgICB0aGlzLl9pc1llYXJBbmRNb250aEJlZm9yZU1pbkRhdGUoYWN0aXZlWWVhciwgbW9udGgpXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5kYXRlRmlsdGVyKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGZpcnN0T2ZNb250aCA9IHRoaXMuX2RhdGVBZGFwdGVyLmNyZWF0ZURhdGUoYWN0aXZlWWVhciwgbW9udGgsIDEpO1xyXG5cclxuICAgIC8vIElmIGFueSBkYXRlIGluIHRoZSBtb250aCBpcyBlbmFibGVkIGNvdW50IHRoZSBtb250aCBhcyBlbmFibGVkLlxyXG4gICAgZm9yIChcclxuICAgICAgbGV0IGQgPSBmaXJzdE9mTW9udGg7XHJcbiAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmdldE1vbnRoKGQpID09IG1vbnRoO1xyXG4gICAgICBkID0gdGhpcy5fZGF0ZUFkYXB0ZXIuYWRkQ2FsZW5kYXJEYXlzKGQsIDEpXHJcbiAgICApIHtcclxuICAgICAgaWYgKHRoaXMuZGF0ZUZpbHRlcihkLCAnZGF5JykpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRlc3RzIHdoZXRoZXIgdGhlIGNvbWJpbmF0aW9uIG1vbnRoL3llYXIgaXMgYWZ0ZXIgdGhpcy5tYXhEYXRlLCBjb25zaWRlcmluZ1xyXG4gICAqIGp1c3QgdGhlIG1vbnRoIGFuZCB5ZWFyIG9mIHRoaXMubWF4RGF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2lzWWVhckFuZE1vbnRoQWZ0ZXJNYXhEYXRlKHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlcikge1xyXG4gICAgaWYgKHRoaXMubWF4RGF0ZSkge1xyXG4gICAgICBjb25zdCBtYXhZZWFyID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLm1heERhdGUpO1xyXG4gICAgICBjb25zdCBtYXhNb250aCA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldE1vbnRoKHRoaXMubWF4RGF0ZSk7XHJcblxyXG4gICAgICByZXR1cm4geWVhciA+IG1heFllYXIgfHwgKHllYXIgPT09IG1heFllYXIgJiYgbW9udGggPiBtYXhNb250aCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGVzdHMgd2hldGhlciB0aGUgY29tYmluYXRpb24gbW9udGgveWVhciBpcyBiZWZvcmUgdGhpcy5taW5EYXRlLCBjb25zaWRlcmluZ1xyXG4gICAqIGp1c3QgdGhlIG1vbnRoIGFuZCB5ZWFyIG9mIHRoaXMubWluRGF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2lzWWVhckFuZE1vbnRoQmVmb3JlTWluRGF0ZSh5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIpIHtcclxuICAgIGlmICh0aGlzLm1pbkRhdGUpIHtcclxuICAgICAgY29uc3QgbWluWWVhciA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldFllYXIodGhpcy5taW5EYXRlKTtcclxuICAgICAgY29uc3QgbWluTW9udGggPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRNb250aCh0aGlzLm1pbkRhdGUpO1xyXG5cclxuICAgICAgcmV0dXJuIHllYXIgPCBtaW5ZZWFyIHx8ICh5ZWFyID09PSBtaW5ZZWFyICYmIG1vbnRoIDwgbWluTW9udGgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIEhhbmRsZXMga2V5ZG93biBldmVudHMgb24gdGhlIGNhbGVuZGFyIGJvZHkgd2hlbiBjYWxlbmRhciBpcyBpbiB5ZWFyIHZpZXcuICovXHJcbiAgX2hhbmRsZUNhbGVuZGFyQm9keUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcclxuICAgIC8vIFRPRE8obW1hbGVyYmEpOiBXZSBjdXJyZW50bHkgYWxsb3cga2V5Ym9hcmQgbmF2aWdhdGlvbiB0byBkaXNhYmxlZCBkYXRlcywgYnV0IGp1c3QgcHJldmVudFxyXG4gICAgLy8gZGlzYWJsZWQgb25lcyBmcm9tIGJlaW5nIHNlbGVjdGVkLiBUaGlzIG1heSBub3QgYmUgaWRlYWwsIHdlIHNob3VsZCBsb29rIGludG8gd2hldGhlclxyXG4gICAgLy8gbmF2aWdhdGlvbiBzaG91bGQgc2tpcCBvdmVyIGRpc2FibGVkIGRhdGVzLCBhbmQgaWYgc28sIGhvdyB0byBpbXBsZW1lbnQgdGhhdCBlZmZpY2llbnRseS5cclxuXHJcbiAgICBjb25zdCBvbGRBY3RpdmVEYXRlID0gdGhpcy5fYWN0aXZlRGF0ZTtcclxuXHJcbiAgICBjb25zdCBpc1J0bCA9IHRoaXMuX2lzUnRsKCk7XHJcbiAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcclxuICAgICAgY2FzZSBMRUZUX0FSUk9XOlxyXG4gICAgICAgIHRoaXMuYWN0aXZlRGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmFkZENhbGVuZGFyTW9udGhzKHRoaXMuX2FjdGl2ZURhdGUsIGlzUnRsID8gMSA6IC0xKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBSSUdIVF9BUlJPVzpcclxuICAgICAgICB0aGlzLmFjdGl2ZURhdGUgPSB0aGlzLl9kYXRlQWRhcHRlci5hZGRDYWxlbmRhck1vbnRocyh0aGlzLl9hY3RpdmVEYXRlLCBpc1J0bCA/IC0xIDogMSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgVVBfQVJST1c6XHJcbiAgICAgICAgdGhpcy5hY3RpdmVEYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuYWRkQ2FsZW5kYXJNb250aHModGhpcy5fYWN0aXZlRGF0ZSwgLTQpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIERPV05fQVJST1c6XHJcbiAgICAgICAgdGhpcy5hY3RpdmVEYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuYWRkQ2FsZW5kYXJNb250aHModGhpcy5fYWN0aXZlRGF0ZSwgNCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgSE9NRTpcclxuICAgICAgICB0aGlzLmFjdGl2ZURhdGUgPSB0aGlzLl9kYXRlQWRhcHRlci5hZGRDYWxlbmRhck1vbnRocyhcclxuICAgICAgICAgIHRoaXMuX2FjdGl2ZURhdGUsXHJcbiAgICAgICAgICB0aGlzLl9kYXRlQWRhcHRlci5nZXRNb250aCh0aGlzLl9hY3RpdmVEYXRlKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgRU5EOlxyXG4gICAgICAgIHRoaXMuYWN0aXZlRGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmFkZENhbGVuZGFyTW9udGhzKFxyXG4gICAgICAgICAgdGhpcy5fYWN0aXZlRGF0ZSxcclxuICAgICAgICAgIDExIC0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0TW9udGgodGhpcy5fYWN0aXZlRGF0ZSlcclxuICAgICAgICApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFBBR0VfVVA6XHJcbiAgICAgICAgdGhpcy5hY3RpdmVEYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyhcclxuICAgICAgICAgIHRoaXMuX2FjdGl2ZURhdGUsXHJcbiAgICAgICAgICBldmVudC5hbHRLZXkgPyAtMTAgOiAtMVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgUEFHRV9ET1dOOlxyXG4gICAgICAgIHRoaXMuYWN0aXZlRGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnMoXHJcbiAgICAgICAgICB0aGlzLl9hY3RpdmVEYXRlLFxyXG4gICAgICAgICAgZXZlbnQuYWx0S2V5ID8gMTAgOiAxXHJcbiAgICAgICAgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBFTlRFUjpcclxuICAgICAgICB0aGlzLl9tb250aFNlbGVjdGVkKHRoaXMuX2RhdGVBZGFwdGVyLmdldE1vbnRoKHRoaXMuX2FjdGl2ZURhdGUpKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICAvLyBEb24ndCBwcmV2ZW50IGRlZmF1bHQgb3IgZm9jdXMgYWN0aXZlIGNlbGwgb24ga2V5cyB0aGF0IHdlIGRvbid0IGV4cGxpY2l0bHkgaGFuZGxlLlxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fZGF0ZUFkYXB0ZXIuY29tcGFyZURhdGUob2xkQWN0aXZlRGF0ZSwgdGhpcy5hY3RpdmVEYXRlKSkge1xyXG4gICAgICB0aGlzLmFjdGl2ZURhdGVDaGFuZ2UuZW1pdCh0aGlzLmFjdGl2ZURhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2ZvY3VzQWN0aXZlQ2VsbCgpO1xyXG4gICAgLy8gUHJldmVudCB1bmV4cGVjdGVkIGRlZmF1bHQgYWN0aW9ucyBzdWNoIGFzIGZvcm0gc3VibWlzc2lvbi5cclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfVxyXG5cclxuICBfZm9jdXNBY3RpdmVDZWxsKCkge1xyXG4gICAgdGhpcy5fbWF0Q2FsZW5kYXJCb2R5Ll9mb2N1c0FjdGl2ZUNlbGwoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBvYmogVGhlIG9iamVjdCB0byBjaGVjay5cclxuICAgKiBAcmV0dXJucyBUaGUgZ2l2ZW4gb2JqZWN0IGlmIGl0IGlzIGJvdGggYSBkYXRlIGluc3RhbmNlIGFuZCB2YWxpZCwgb3RoZXJ3aXNlIG51bGwuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZ2V0VmFsaWREYXRlT3JOdWxsKG9iajogYW55KTogRCB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RhdGVBZGFwdGVyLmlzRGF0ZUluc3RhbmNlKG9iaikgJiYgdGhpcy5fZGF0ZUFkYXB0ZXIuaXNWYWxpZChvYmopID8gb2JqIDogbnVsbDtcclxuICB9XHJcblxyXG4gIC8qKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHVzZXIgaGFzIHRoZSBSVEwgbGF5b3V0IGRpcmVjdGlvbi4gKi9cclxuICBwcml2YXRlIF9pc1J0bCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9kaXIgJiYgdGhpcy5fZGlyLnZhbHVlID09PSAncnRsJztcclxuICB9XHJcbn1cclxuIl19