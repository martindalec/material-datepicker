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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, Input, Optional, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { MatClockView } from './clock-view';
import { MAT_DATE_FORMATS } from './core/index';
import { DateAdapter } from './core/index';
import { controlActive, slideCalendar } from './datepicker-animations';
import { createMissingDateImplError } from './datepicker-errors';
import { MatDatepickerIntl } from './datepicker-intl';
import { MatMonthView } from './month-view';
import { MatYearView } from './year-view';
import { MatYearsView } from './years-view';
/**
 * A calendar that is used as part of the datepicker.
 * \@docs-private
 * @template D
 */
var MatCalendar = /** @class */ (function () {
    function MatCalendar(_intl, _dateAdapter, _dateFormats, changeDetectorRef) {
        var _this = this;
        this._intl = _intl;
        this._dateAdapter = _dateAdapter;
        this._dateFormats = _dateFormats;
        /**
         * Used for scheduling that focus should be moved to the active cell on the next tick.
         * We need to schedule it, rather than do it immediately, because we have to wait
         * for Angular to re-evaluate the view children.
         */
        this._moveFocusOnNextTick = false;
        /**
         * The type of value handled by the calendar.
         */
        this.type = 'date';
        /**
         * Which view the calendar should be started in.
         */
        this.startView = 'month';
        /**
         * Clock interval
         */
        this.clockStep = 1;
        /**
         * Clock hour format
         */
        this.twelveHour = false;
        /**
         * Emits when the currently selected date changes.
         */
        this.selectedChange = new EventEmitter();
        /**
         * Emits when any date is selected.
         */
        this._userSelection = new EventEmitter();
        /**
         * Date filter for the month and year views.
         */
        this._dateFilterForViews = (/**
         * @param {?} date
         * @param {?=} unit
         * @return {?}
         */
        function (date, unit) {
            if (unit === void 0) { unit = 'minute'; }
            return (!!date &&
                (!_this.dateFilter || _this.dateFilter(date)) &&
                (!_this.minDate || _this._dateAdapter.compareDate(date, _this.minDate, unit) >= 0) &&
                (!_this.maxDate || _this._dateAdapter.compareDate(date, _this.maxDate, unit) <= 0));
        });
        /**
         * Emits whenever there is a state change that the header may need to respond to.
         */
        this.stateChanges = new Subject();
        /**
         * Whether the calendar is in hour view.
         */
        this._hourView = true;
        if (!this._dateAdapter) {
            throw createMissingDateImplError('DateAdapter');
        }
        if (!this._dateFormats) {
            throw createMissingDateImplError('MAT_DATE_FORMATS');
        }
        this._intlChanges = _intl.changes.subscribe((/**
         * @return {?}
         */
        function () {
            changeDetectorRef.markForCheck();
            _this.stateChanges.next();
        }));
    }
    Object.defineProperty(MatCalendar.prototype, "startAt", {
        /** A date representing the period (month or year) to start the calendar in. */
        get: /**
         * A date representing the period (month or year) to start the calendar in.
         * @return {?}
         */
        function () {
            return this._startAt;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._startAt = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatCalendar.prototype, "selected", {
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
            this.activeDate = this._selected;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatCalendar.prototype, "minDate", {
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
    Object.defineProperty(MatCalendar.prototype, "maxDate", {
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
    Object.defineProperty(MatCalendar.prototype, "activeDate", {
        /**
         * The current active date. This determines which time period is shown and which date is
         * highlighted when using keyboard navigation.
         */
        get: /**
         * The current active date. This determines which time period is shown and which date is
         * highlighted when using keyboard navigation.
         * @return {?}
         */
        function () {
            return this._clampedActiveDate;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var oldActiveDate = this._clampedActiveDate;
            this._clampedActiveDate = this._dateAdapter.clampDate(value, this.minDate, this.maxDate);
            this._isAm = this._dateAdapter.getHours(this._clampedActiveDate) < 12;
            /** @type {?} */
            var unit = this.view === 'year' ? 'year' : 'month';
            /** @type {?} */
            var diff = this._dateAdapter.compareDate(oldActiveDate, this._clampedActiveDate, unit);
            if (diff) {
                this._animationDir = diff > 0 ? 'left' : 'right';
            }
            // update the labels
            /** @type {?} */
            var day = this._dateAdapter.getDayOfWeek(this.activeDate);
            /** @type {?} */
            var hours = this._dateAdapter.getHours(this.activeDate);
            if (this.twelveHour) {
                hours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
            }
            /** @type {?} */
            var minutes = this._dateAdapter.getMinutes(this.activeDate);
            switch (this.view) {
                case 'year':
                    this._periodButtonText = this._dateAdapter.getYearName(this.activeDate);
                    break;
                default:
                    this._periodButtonText = this._dateAdapter.format(this.activeDate, this._dateFormats.display.monthYearLabel);
            }
            this._yearButtonText = this._dateAdapter.getYear(this.activeDate).toString();
            this._monthdayButtonText = this._dateAdapter.format(this.activeDate, this._dateFormats.display.monthDayLabel);
            this._dayButtonText = this._dateAdapter.getDayOfWeekNames('long')[day];
            this._hourButtonText = hours.toString();
            this._minuteButtonText = ('00' + minutes).slice(-2);
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatCalendar.prototype, "currentView", {
        /** Whether the calendar is in month view. */
        get: /**
         * Whether the calendar is in month view.
         * @return {?}
         */
        function () {
            return this._currentView;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._currentView = value;
            this._moveFocusOnNextTick = true;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatCalendar.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this.activeDate = this.startAt || this._dateAdapter.today();
        this.changeView(this.startView, false);
    };
    /**
     * @return {?}
     */
    MatCalendar.prototype.ngAfterViewChecked = /**
     * @return {?}
     */
    function () {
        if (this._moveFocusOnNextTick) {
            this._moveFocusOnNextTick = false;
            this.focusActiveCell();
        }
    };
    /**
     * @return {?}
     */
    MatCalendar.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._intlChanges.unsubscribe();
        this.stateChanges.complete();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    MatCalendar.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        this._hasTime = this.type.indexOf('time') >= 0;
        /** @type {?} */
        var change = changes.selected || changes.minDate || changes.maxDate || changes.dateFilter;
        if (change && !change.firstChange) {
            /** @type {?} */
            var view = this._getCurrentViewComponent();
            if (view) {
                view._init();
            }
        }
        this.stateChanges.next();
    };
    /**
     * @param {?} view
     * @param {?=} focus
     * @return {?}
     */
    MatCalendar.prototype.changeView = /**
     * @param {?} view
     * @param {?=} focus
     * @return {?}
     */
    function (view, focus) {
        if (focus === void 0) { focus = true; }
        switch (view) {
            case 'year':
                this._periodButtonText = this._dateAdapter.getYearName(this.activeDate);
                this._periodButtonLabel = this._intl.switchToYearsViewLabel;
                this._nextButtonLabel = this._intl.nextYearLabel;
                this._prevButtonLabel = this._intl.prevYearLabel;
                break;
            case 'month':
                this._periodButtonText = this._dateAdapter.format(this.activeDate, this._dateFormats.display.monthYearLabel);
                this._periodButtonLabel = this._intl.switchToYearViewLabel;
                this._nextButtonLabel = this._intl.nextMonthLabel;
                this._prevButtonLabel = this._intl.prevMonthLabel;
        }
        this.view = view;
        if (focus) {
            this._moveFocusOnNextTick = true;
        }
    };
    /**
     * @return {?}
     */
    MatCalendar.prototype.focusActiveCell = /**
     * @return {?}
     */
    function () {
        this._getCurrentViewComponent()._focusActiveCell();
    };
    /**
     * @return {?}
     */
    MatCalendar.prototype._submitClicked = /**
     * @return {?}
     */
    function () {
        this.selectedChange.emit(this.activeDate);
        this._userSelection.emit();
    };
    /**
     * @return {?}
     */
    MatCalendar.prototype._cancelClicked = /**
     * @return {?}
     */
    function () {
        this._userSelection.emit();
    };
    /** Handles date selection in the clock view. */
    /**
     * Handles date selection in the clock view.
     * @param {?} date
     * @return {?}
     */
    MatCalendar.prototype._timeChanged = /**
     * Handles date selection in the clock view.
     * @param {?} date
     * @return {?}
     */
    function (date) {
        this.selected = date;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MatCalendar.prototype._timeSelected = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        // if (this.autoOk && this.type === 'time') {
        //   this.selectedChange.emit(date);
        //   this._userSelection.emit();
        // }
        this.selected = date;
    };
    /** Handles date selection in the month view. */
    /**
     * Handles date selection in the month view.
     * @param {?} date
     * @return {?}
     */
    MatCalendar.prototype._dateSelected = /**
     * Handles date selection in the month view.
     * @param {?} date
     * @return {?}
     */
    function (date) {
        this.selected = date;
        if (this._hasTime) {
            this.changeView('clock');
        }
    };
    /** Handles month selection in the year view. */
    /**
     * Handles month selection in the year view.
     * @param {?} month
     * @return {?}
     */
    MatCalendar.prototype._monthSelected = /**
     * Handles month selection in the year view.
     * @param {?} month
     * @return {?}
     */
    function (month) {
        this.selected = month;
        this.changeView('month');
    };
    /**
     * @param {?} year
     * @return {?}
     */
    MatCalendar.prototype._yearSelected = /**
     * @param {?} year
     * @return {?}
     */
    function (year) {
        this.selected = year;
        this.changeView('year');
    };
    /** Handles user clicks on the period label. */
    /**
     * Handles user clicks on the period label.
     * @return {?}
     */
    MatCalendar.prototype._currentPeriodClicked = /**
     * Handles user clicks on the period label.
     * @return {?}
     */
    function () {
        this.changeView(this.view === 'month' ? 'year' : 'years');
    };
    /** Handles user clicks on the previous button. */
    /**
     * Handles user clicks on the previous button.
     * @return {?}
     */
    MatCalendar.prototype._previousClicked = /**
     * Handles user clicks on the previous button.
     * @return {?}
     */
    function () {
        this._navCalendar(-1);
    };
    /** Handles user clicks on the next button. */
    /**
     * Handles user clicks on the next button.
     * @return {?}
     */
    MatCalendar.prototype._nextClicked = /**
     * Handles user clicks on the next button.
     * @return {?}
     */
    function () {
        this._navCalendar(1);
    };
    /** Handles user clicks on the time labels. */
    /**
     * Handles user clicks on the time labels.
     * @return {?}
     */
    MatCalendar.prototype._showHourView = /**
     * Handles user clicks on the time labels.
     * @return {?}
     */
    function () {
        if (this._hasTime) {
            this._hourView = true;
            this.changeView('clock');
        }
    };
    /**
     * @return {?}
     */
    MatCalendar.prototype._showMinuteView = /**
     * @return {?}
     */
    function () {
        this._hourView = false;
        this.changeView('clock');
    };
    /**
     * @param {?} am
     * @return {?}
     */
    MatCalendar.prototype._toggleAmPm = /**
     * @param {?} am
     * @return {?}
     */
    function (am) {
        this._isAm = !this._isAm;
        /** @type {?} */
        var date = this._dateAdapter.addCalendarHours(this.activeDate, this._isAm ? -12 : 12);
        if (this._dateFilterForViews(date, 'minute')) {
            this.selected = date;
        }
        // if (this._isAm !== am) {
        //   const date = this._dateAdapter.addCalendarHours(this.activeDate, this._isAm ? 12 : -12);
        //   if (this._dateFilterForViews(date, 'minute')) {
        //     this.selected = date;
        //   }
        // }
    };
    /** Whether the previous period button is enabled. */
    /**
     * Whether the previous period button is enabled.
     * @return {?}
     */
    MatCalendar.prototype._previousEnabled = /**
     * Whether the previous period button is enabled.
     * @return {?}
     */
    function () {
        if (!this.minDate) {
            return true;
        }
        return !this.minDate || !this._isSameView(this.activeDate, this.minDate);
    };
    /** Whether the next period button is enabled. */
    /**
     * Whether the next period button is enabled.
     * @return {?}
     */
    MatCalendar.prototype._nextEnabled = /**
     * Whether the next period button is enabled.
     * @return {?}
     */
    function () {
        return !this.maxDate || !this._isSameView(this.activeDate, this.maxDate);
    };
    /** Handles calendar diffs. */
    /**
     * Handles calendar diffs.
     * @param {?} diff
     * @return {?}
     */
    MatCalendar.prototype._navCalendar = /**
     * Handles calendar diffs.
     * @param {?} diff
     * @return {?}
     */
    function (diff) {
        switch (this.view) {
            case 'year':
                this.activeDate = this._dateAdapter.addCalendarYears(this.activeDate, diff);
                break;
            case 'month':
                this.activeDate = this._dateAdapter.addCalendarMonths(this.activeDate, diff);
                break;
            case 'clock':
                this.activeDate = this._hourView
                    ? this._dateAdapter.addCalendarHours(this.activeDate, diff)
                    : this._dateAdapter.addCalendarMinutes(this.activeDate, diff);
                break;
        }
    };
    /** Whether the two dates represent the same view in the current view mode (month or year). */
    /**
     * Whether the two dates represent the same view in the current view mode (month or year).
     * @private
     * @param {?} date1
     * @param {?} date2
     * @return {?}
     */
    MatCalendar.prototype._isSameView = /**
     * Whether the two dates represent the same view in the current view mode (month or year).
     * @private
     * @param {?} date1
     * @param {?} date2
     * @return {?}
     */
    function (date1, date2) {
        switch (this.view) {
            case 'year':
                return this._dateAdapter.getYear(date1) === this._dateAdapter.getYear(date2);
            case 'month':
                /** @type {?} */
                var monthYear = this._dateFormats.display.monthYearLabel;
                return this._dateAdapter.format(date1, monthYear) === this._dateAdapter.format(date2, monthYear);
            case 'clock':
                /** @type {?} */
                var hourMinute = this._dateFormats.display.timeLabel;
                return this._dateAdapter.format(date1, hourMinute) === this._dateAdapter.format(date2, hourMinute);
        }
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
    MatCalendar.prototype._getValidDateOrNull = /**
     * @private
     * @param {?} obj The object to check.
     * @return {?} The given object if it is both a date instance and valid, otherwise null.
     */
    function (obj) {
        return this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj) ? obj : null;
    };
    /** Returns the component instance that corresponds to the current calendar view. */
    /**
     * Returns the component instance that corresponds to the current calendar view.
     * @private
     * @return {?}
     */
    MatCalendar.prototype._getCurrentViewComponent = /**
     * Returns the component instance that corresponds to the current calendar view.
     * @private
     * @return {?}
     */
    function () {
        return this.clockView || this.monthView || this.yearView || this.yearsView;
    };
    MatCalendar.decorators = [
        { type: Component, args: [{
                    selector: 'mat-calendar',
                    template: "<div [class]=\"'mat-calendar-header mat-calendar-type-' + type\">\r\n\r\n  <div class=\"mat-calendar-header-date\">\r\n    <button mat-button class=\"mat-calendar-header-date-year mat-calendar-control\"\r\n    [class.mat-calendar-control-active]=\"view == 'years'\"\r\n    [@controlActive]=\"view == 'years' ? 'active' : ''\"\r\n    [attr.aria-label]=\"_intl.switchToYearViewLabel\"\r\n    (click)=\"changeView('years')\">\r\n      {{ _yearButtonText }}\r\n    </button>\r\n\r\n    <button mat-button class=\"mat-calendar-header-date-month mat-calendar-control\"\r\n    [class.mat-calendar-control-active]=\"view == 'month' || view == 'year'\"\r\n    [@controlActive]=\"view == 'month' || view == 'year' ? 'active' : ''\"\r\n    [attr.aria-label]=\"_intl.switchToMonthViewLabel\"\r\n    (click)=\"changeView('month')\">\r\n      <span class=\"mat-calendar-header-date-dayname\">{{ _dayButtonText }} </span>\r\n      <span class=\"mat-calendar-header-date-monthday\">{{ _monthdayButtonText }}</span>\r\n    </button>\r\n  </div>\r\n\r\n  <div class=\"mat-calendar-header-time\">\r\n    <div class=\"mat-calendar-header-time-hour\">\r\n        <button class=\"mat-calendar-control\"\r\n        [class.mat-calendar-control-active]=\"view == 'clock' && _hourView\"\r\n        [@controlActive]=\"view == 'clock' && _hourView ? 'active' : ''\"\r\n        [attr.aria-label]=\"_intl.switchToHourViewLabel\"\r\n        (click)=\"_showHourView()\">\r\n          {{ _hourButtonText }}\r\n        </button>\r\n        <span>:</span>\r\n        <button class=\"mat-calendar-control\"\r\n        [class.mat-calendar-control-active]=\"view == 'clock' && !_hourView\"\r\n        [@controlActive]=\"view == 'clock' && !_hourView ? 'active' : ''\"\r\n        [attr.aria-label]=\"_intl.switchToMinuteViewLabel\"\r\n        (click)=\"_showMinuteView()\">\r\n          {{ _minuteButtonText }}\r\n        </button>\r\n      <!-- <button class=\"mat-calendar-control\"\r\n      [class.mat-calendar-control-active]=\"view == 'clock' && _hourView\"\r\n      [@controlActive]=\"view == 'clock' && _hourView ? 'active' : ''\"\r\n      [attr.aria-label]=\"_intl.switchToHourViewLabel\"\r\n      (click)=\"_showHourView()\">\r\n        {{ _hourButtonText }}\r\n      </button>\r\n      <span>:</span>\r\n      <button class=\"mat-calendar-control\"\r\n      [class.mat-calendar-control-active]=\"view == 'clock' && !_hourView\"\r\n      [@controlActive]=\"view == 'clock' && !_hourView ? 'active' : ''\"\r\n      [attr.aria-label]=\"_intl.switchToMinuteViewLabel\"\r\n      (click)=\"_showMinuteView()\">\r\n        {{ _minuteButtonText }}\r\n      </button> -->\r\n    </div>\r\n    <div class=\"mat-calendar-header-time-ampm\" *ngIf=\"twelveHour\">\r\n      <button class=\"mat-calendar-control\"\r\n      [class.mat-calendar-control-active]=\"view == 'clock'\"\r\n      [@controlActive]=\"view == 'clock' ? 'active' : ''\"\r\n      [attr.aria-label]=\"_intl.setToAMLabel\"\r\n      (click)=\"_toggleAmPm(true)\">\r\n        {{_isAm ? 'AM' : 'PM'}}\r\n      </button>\r\n      <!-- <button class=\"mat-calendar-control\"\r\n      [class.mat-calendar-control-active]=\"_isAm\"\r\n      [@controlActive]=\"_isAm ? 'active' : ''\"\r\n      [attr.aria-label]=\"_intl.setToAMLabel\"\r\n      (click)=\"_toggleAmPm(true)\">\r\n        AM\r\n      </button>\r\n      <button class=\"mat-calendar-control\"\r\n      [class.mat-calendar-control-active]=\"!_isAm\"\r\n      [@controlActive]=\"!_isAm ? 'active' : ''\"\r\n      [attr.aria-label]=\"_intl.setToPMLabel\"\r\n      (click)=\"_toggleAmPm(false)\">\r\n        PM\r\n      </button>  -->\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div [class]=\"'mat-calendar-content mat-calendar-view-' + view\">\r\n\r\n  <div class=\"mat-calendar-heading\" *ngIf=\"view === 'month' || view === 'year'\">\r\n    <button mat-icon-button class=\"mat-calendar-previous-button\"\r\n      (click)=\"_previousClicked()\" [attr.disabled]=\"!_previousEnabled() ? '' : null\"\r\n      [attr.aria-label]=\"_prevButtonLabel\">\r\n    </button>\r\n\r\n    <button mat-button class=\"mat-calendar-heading-period mat-calendar-control mat-calendar-control-active\"\r\n    [@slideCalendar]=\"_animationDir\" (@slideCalendar.done)=\"_animationDir = ''\"\r\n    (click)=\"_currentPeriodClicked()\"\r\n    [attr.aria-label]=\"_periodButtonLabel\">\r\n      <strong>{{ _periodButtonText }}</strong>\r\n    </button>\r\n\r\n    <button mat-icon-button class=\"mat-calendar-next-button\"\r\n      (click)=\"_nextClicked()\" [attr.disabled]=\"!_nextEnabled() ? '' : null\"\r\n      [attr.aria-label]=\"_nextButtonLabel\">\r\n    </button>\r\n  </div>\r\n\r\n  <div class=\"mat-calendar-main\" [ngSwitch]=\"view\" cdkMonitorSubtreeFocus tabindex=\"-1\">\r\n\r\n    <mat-clock-view\r\n      *ngSwitchCase=\"'clock'\"\r\n      [(activeDate)]=\"activeDate\"\r\n      [selected]=\"selected\"\r\n      [dateFilter]=\"_dateFilterForViews\"\r\n      [clockStep]=\"clockStep\"\r\n      [twelveHour]=\"twelveHour\"\r\n      [hourView]=\"_hourView\"\r\n      (selectedTime)=\"_timeSelected($event)\"\r\n      (selectedChange)=\"_timeChanged($event)\"\r\n      (changeView)=\"_hourView = !_hourView\">\r\n    </mat-clock-view>\r\n\r\n    <mat-month-view\r\n      *ngSwitchCase=\"'month'\"\r\n      [(activeDate)]=\"activeDate\"\r\n      [selected]=\"selected\"\r\n      [dateFilter]=\"_dateFilterForViews\"\r\n      [maxDate]=\"maxDate\"\r\n      [minDate]=\"minDate\"\r\n      [animationDir]=\"_animationDir\"\r\n      (selectedChange)=\"_dateSelected($event)\"\r\n      (_userSelection)=\"_showHourView()\">\r\n    </mat-month-view>\r\n\r\n    <mat-year-view\r\n      *ngSwitchCase=\"'year'\"\r\n      [(activeDate)]=\"activeDate\"\r\n      [selected]=\"selected\"\r\n      [dateFilter]=\"_dateFilterForViews\"\r\n      [maxDate]=\"maxDate\"\r\n      [minDate]=\"minDate\"\r\n      [animationDir]=\"_animationDir\"\r\n      (selectedChange)=\"_monthSelected($event)\">\r\n    </mat-year-view>\r\n\r\n    <mat-years-view\r\n      *ngSwitchCase=\"'years'\"\r\n      [(activeDate)]=\"activeDate\"\r\n      [selected]=\"selected\"\r\n      [dateFilter]=\"_dateFilterForViews\"\r\n      [maxDate]=\"maxDate\"\r\n      [minDate]=\"minDate\"\r\n      (selectedChange)=\"_yearSelected($event)\">\r\n    </mat-years-view>\r\n  </div>\r\n\r\n  <div class=\"mat-calendar-footer\">\r\n    <button mat-button\r\n    (click)=\"_cancelClicked()\"\r\n    [attr.aria-label]=\"_intl.buttonCancelLabel\">\r\n      {{ _intl.buttonCancelText }}\r\n    </button>\r\n\r\n    <button mat-button\r\n    (click)=\"_submitClicked()\"\r\n    [attr.aria-label]=\"_intl.buttonSubmitLabel\">\r\n      {{ _intl.buttonSubmitText }}\r\n    </button>\r\n  </div>\r\n</div>\r\n",
                    // styleUrls: ['calendar.css'],
                    host: {
                        class: 'mat-calendar'
                    },
                    animations: [controlActive, slideCalendar],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    preserveWhitespaces: false
                }] }
    ];
    /** @nocollapse */
    MatCalendar.ctorParameters = function () { return [
        { type: MatDatepickerIntl },
        { type: DateAdapter, decorators: [{ type: Optional }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_DATE_FORMATS,] }] },
        { type: ChangeDetectorRef }
    ]; };
    MatCalendar.propDecorators = {
        startAt: [{ type: Input }],
        type: [{ type: Input }],
        startView: [{ type: Input }],
        selected: [{ type: Input }],
        minDate: [{ type: Input }],
        maxDate: [{ type: Input }],
        dateFilter: [{ type: Input }],
        clockStep: [{ type: Input }],
        twelveHour: [{ type: Input }],
        selectedChange: [{ type: Output }],
        _userSelection: [{ type: Output }],
        clockView: [{ type: ViewChild, args: [MatClockView,] }],
        monthView: [{ type: ViewChild, args: [MatMonthView,] }],
        yearView: [{ type: ViewChild, args: [MatYearView,] }],
        yearsView: [{ type: ViewChild, args: [MatYearsView,] }]
    };
    return MatCalendar;
}());
export { MatCalendar };
if (false) {
    /**
     * @type {?}
     * @private
     */
    MatCalendar.prototype._intlChanges;
    /**
     * Used for scheduling that focus should be moved to the active cell on the next tick.
     * We need to schedule it, rather than do it immediately, because we have to wait
     * for Angular to re-evaluate the view children.
     * @type {?}
     * @private
     */
    MatCalendar.prototype._moveFocusOnNextTick;
    /**
     * @type {?}
     * @private
     */
    MatCalendar.prototype._startAt;
    /**
     * The type of value handled by the calendar.
     * @type {?}
     */
    MatCalendar.prototype.type;
    /**
     * Which view the calendar should be started in.
     * @type {?}
     */
    MatCalendar.prototype.startView;
    /**
     * Current calendar view
     * @type {?}
     */
    MatCalendar.prototype.view;
    /**
     * @type {?}
     * @private
     */
    MatCalendar.prototype._selected;
    /**
     * @type {?}
     * @private
     */
    MatCalendar.prototype._minDate;
    /**
     * @type {?}
     * @private
     */
    MatCalendar.prototype._maxDate;
    /**
     * A function used to filter which dates are selectable.
     * @type {?}
     */
    MatCalendar.prototype.dateFilter;
    /**
     * Clock interval
     * @type {?}
     */
    MatCalendar.prototype.clockStep;
    /**
     * Clock hour format
     * @type {?}
     */
    MatCalendar.prototype.twelveHour;
    /**
     * Emits when the currently selected date changes.
     * @type {?}
     */
    MatCalendar.prototype.selectedChange;
    /**
     * Emits when any date is selected.
     * @type {?}
     */
    MatCalendar.prototype._userSelection;
    /**
     * Reference to the current clock view component.
     * @type {?}
     */
    MatCalendar.prototype.clockView;
    /**
     * Reference to the current month view component.
     * @type {?}
     */
    MatCalendar.prototype.monthView;
    /**
     * Reference to the current year view component.
     * @type {?}
     */
    MatCalendar.prototype.yearView;
    /**
     * Reference to the current years view component.
     * @type {?}
     */
    MatCalendar.prototype.yearsView;
    /**
     * Date filter for the month and year views.
     * @type {?}
     */
    MatCalendar.prototype._dateFilterForViews;
    /**
     * @type {?}
     * @private
     */
    MatCalendar.prototype._clampedActiveDate;
    /**
     * @type {?}
     * @private
     */
    MatCalendar.prototype._currentView;
    /**
     * Emits whenever there is a state change that the header may need to respond to.
     * @type {?}
     */
    MatCalendar.prototype.stateChanges;
    /**
     * Animations handler
     * @type {?}
     */
    MatCalendar.prototype._animationDir;
    /**
     * Whether the active date is AM or not
     * @type {?}
     */
    MatCalendar.prototype._isAm;
    /**
     * Whether the calendar process the time.
     * @type {?}
     */
    MatCalendar.prototype._hasTime;
    /**
     * Whether the calendar is in hour view.
     * @type {?}
     */
    MatCalendar.prototype._hourView;
    /**
     * The label for the calendar header buttons.
     * @type {?}
     */
    MatCalendar.prototype._yearButtonText;
    /** @type {?} */
    MatCalendar.prototype._dayButtonText;
    /** @type {?} */
    MatCalendar.prototype._monthdayButtonText;
    /** @type {?} */
    MatCalendar.prototype._hourButtonText;
    /** @type {?} */
    MatCalendar.prototype._minuteButtonText;
    /**
     * The label for the current calendar view.
     * @type {?}
     */
    MatCalendar.prototype._periodButtonText;
    /** @type {?} */
    MatCalendar.prototype._periodButtonLabel;
    /**
     * The label for the the previous button.
     * @type {?}
     */
    MatCalendar.prototype._prevButtonLabel;
    /**
     * The label for the the next button.
     * @type {?}
     */
    MatCalendar.prototype._nextButtonLabel;
    /** @type {?} */
    MatCalendar.prototype._intl;
    /**
     * @type {?}
     * @private
     */
    MatCalendar.prototype._dateAdapter;
    /**
     * @type {?}
     * @private
     */
    MatCalendar.prototype._dateFormats;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWFydGluZGFsZWMvZGF0ZXBpY2tlci8iLCJzb3VyY2VzIjpbImNhbGVuZGFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUdMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUdMLFFBQVEsRUFDUixNQUFNLEVBRU4sU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzVDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBa0IsTUFBTSxjQUFjLENBQUM7QUFDaEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUMzQyxPQUFPLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDNUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMxQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sY0FBYyxDQUFDOzs7Ozs7QUFrQjVDO0lBb05FLHFCQUNTLEtBQXdCLEVBQ1gsWUFBNEIsRUFHeEMsWUFBNEIsRUFDcEMsaUJBQW9DO1FBTnRDLGlCQW9CQztRQW5CUSxVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQUNYLGlCQUFZLEdBQVosWUFBWSxDQUFnQjtRQUd4QyxpQkFBWSxHQUFaLFlBQVksQ0FBZ0I7Ozs7OztRQXJNOUIseUJBQW9CLEdBQUcsS0FB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QyxXQUFXOzRCQUlyQixTQUFTLFNBQUMsWUFBWTs7SUFvVXpCLGtCQUFDO0NBQUEsQUEvYUQsSUErYUM7U0FuYVksV0FBVzs7Ozs7O0lBQ3RCLG1DQUFtQzs7Ozs7Ozs7SUFPbkMsMkNBQXFDOzs7OztJQVVyQywrQkFBMkI7Ozs7O0lBRzNCLDJCQUMrQjs7Ozs7SUFHL0IsZ0NBQ3FDOzs7OztJQUdyQywyQkFBc0I7Ozs7O0lBV3RCLGdDQUE0Qjs7Ozs7SUFVNUIsK0JBQTJCOzs7OztJQVUzQiwrQkFBMkI7Ozs7O0lBRzNCLGlDQUNnRDs7Ozs7SUFHaEQsZ0NBQ2M7Ozs7O0lBR2QsaUNBQ21COzs7OztJQUduQixxQ0FDdUM7Ozs7O0lBR3ZDLHFDQUMwQzs7Ozs7SUFHMUMsZ0NBQzJCOzs7OztJQUczQixnQ0FDMkI7Ozs7O0lBRzNCLCtCQUN5Qjs7Ozs7SUFHekIsZ0NBQzJCOzs7OztJQUczQiwwQ0FPRTs7Ozs7SUEyQ0YseUNBQThCOzs7OztJQVU5QixtQ0FBc0M7Ozs7O0lBS3RDLG1DQUFtQzs7Ozs7SUFHbkMsb0NBQXNCOzs7OztJQUd0Qiw0QkFBZTs7Ozs7SUFHZiwrQkFBa0I7Ozs7O0lBR2xCLGdDQUEwQjs7Ozs7SUFHMUIsc0NBQXdCOztJQUV4QixxQ0FBdUI7O0lBRXZCLDBDQUE0Qjs7SUFFNUIsc0NBQXdCOztJQUV4Qix3Q0FBMEI7Ozs7O0lBRzFCLHdDQUEwQjs7SUFFMUIseUNBQTJCOzs7OztJQUczQix1Q0FBeUI7Ozs7O0lBR3pCLHVDQUF5Qjs7SUFHdkIsNEJBQStCOzs7OztJQUMvQixtQ0FBZ0Q7Ozs7O0lBQ2hELG1DQUVvQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKlxyXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxyXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXHJcbiAqL1xyXG5cclxuaW1wb3J0IHtcclxuICBBZnRlckNvbnRlbnRJbml0LFxyXG4gIEFmdGVyVmlld0NoZWNrZWQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ29tcG9uZW50LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBJbmplY3QsXHJcbiAgSW5wdXQsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIE9uRGVzdHJveSxcclxuICBPcHRpb25hbCxcclxuICBPdXRwdXQsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxuICBWaWV3Q2hpbGQsXHJcbiAgVmlld0VuY2Fwc3VsYXRpb25cclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IE1hdENsb2NrVmlldyB9IGZyb20gJy4vY2xvY2stdmlldyc7XHJcbmltcG9ydCB7IE1BVF9EQVRFX0ZPUk1BVFMsIE1hdERhdGVGb3JtYXRzIH0gZnJvbSAnLi9jb3JlL2luZGV4JztcclxuaW1wb3J0IHsgRGF0ZUFkYXB0ZXIgfSBmcm9tICcuL2NvcmUvaW5kZXgnO1xyXG5pbXBvcnQgeyBjb250cm9sQWN0aXZlLCBzbGlkZUNhbGVuZGFyIH0gZnJvbSAnLi9kYXRlcGlja2VyLWFuaW1hdGlvbnMnO1xyXG5pbXBvcnQgeyBjcmVhdGVNaXNzaW5nRGF0ZUltcGxFcnJvciB9IGZyb20gJy4vZGF0ZXBpY2tlci1lcnJvcnMnO1xyXG5pbXBvcnQgeyBNYXREYXRlcGlja2VySW50bCB9IGZyb20gJy4vZGF0ZXBpY2tlci1pbnRsJztcclxuaW1wb3J0IHsgTWF0TW9udGhWaWV3IH0gZnJvbSAnLi9tb250aC12aWV3JztcclxuaW1wb3J0IHsgTWF0WWVhclZpZXcgfSBmcm9tICcuL3llYXItdmlldyc7XHJcbmltcG9ydCB7IE1hdFllYXJzVmlldyB9IGZyb20gJy4veWVhcnMtdmlldyc7XHJcblxyXG4vKipcclxuICogUG9zc2libGUgdmlld3MgZm9yIHRoZSBjYWxlbmRhci5cclxuICogQGRvY3MtcHJpdmF0ZVxyXG4gKi9cclxuZXhwb3J0IHR5cGUgTWF0Q2FsZW5kYXJWaWV3ID0gJ2Nsb2NrJyB8ICdtb250aCcgfCAneWVhcicgfCAneWVhcnMnO1xyXG5cclxuLyoqXHJcbiAqIFBvc3NpYmxlIHJldHVybiB0eXBlcy5cclxuICogQGRvY3MtcHJpdmF0ZVxyXG4gKi9cclxuZXhwb3J0IHR5cGUgTWF0Q2FsZW5kYXJUeXBlID0gJ2RhdGUnIHwgJ2RhdGV0aW1lJyB8ICd0aW1lJztcclxuXHJcbi8qKlxyXG4gKiBBIGNhbGVuZGFyIHRoYXQgaXMgdXNlZCBhcyBwYXJ0IG9mIHRoZSBkYXRlcGlja2VyLlxyXG4gKiBAZG9jcy1wcml2YXRlXHJcbiAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ21hdC1jYWxlbmRhcicsXHJcbiAgdGVtcGxhdGVVcmw6ICdjYWxlbmRhci5odG1sJyxcclxuICAvLyBzdHlsZVVybHM6IFsnY2FsZW5kYXIuY3NzJ10sXHJcbiAgaG9zdDoge1xyXG4gICAgY2xhc3M6ICdtYXQtY2FsZW5kYXInXHJcbiAgfSxcclxuICBhbmltYXRpb25zOiBbY29udHJvbEFjdGl2ZSwgc2xpZGVDYWxlbmRhcl0sXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWF0Q2FsZW5kYXI8RD4gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdDaGVja2VkLCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XHJcbiAgcHJpdmF0ZSBfaW50bENoYW5nZXM6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLyoqXHJcbiAgICogVXNlZCBmb3Igc2NoZWR1bGluZyB0aGF0IGZvY3VzIHNob3VsZCBiZSBtb3ZlZCB0byB0aGUgYWN0aXZlIGNlbGwgb24gdGhlIG5leHQgdGljay5cclxuICAgKiBXZSBuZWVkIHRvIHNjaGVkdWxlIGl0LCByYXRoZXIgdGhhbiBkbyBpdCBpbW1lZGlhdGVseSwgYmVjYXVzZSB3ZSBoYXZlIHRvIHdhaXRcclxuICAgKiBmb3IgQW5ndWxhciB0byByZS1ldmFsdWF0ZSB0aGUgdmlldyBjaGlsZHJlbi5cclxuICAgKi9cclxuICBwcml2YXRlIF9tb3ZlRm9jdXNPbk5leHRUaWNrID0gZmFsc2U7XHJcblxyXG4gIC8qKiBBIGRhdGUgcmVwcmVzZW50aW5nIHRoZSBwZXJpb2QgKG1vbnRoIG9yIHllYXIpIHRvIHN0YXJ0IHRoZSBjYWxlbmRhciBpbi4gKi9cclxuICBASW5wdXQoKVxyXG4gIGdldCBzdGFydEF0KCk6IEQgfCBudWxsIHtcclxuICAgIHJldHVybiB0aGlzLl9zdGFydEF0O1xyXG4gIH1cclxuICBzZXQgc3RhcnRBdCh2YWx1ZTogRCB8IG51bGwpIHtcclxuICAgIHRoaXMuX3N0YXJ0QXQgPSB0aGlzLl9nZXRWYWxpZERhdGVPck51bGwodGhpcy5fZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfc3RhcnRBdDogRCB8IG51bGw7XHJcblxyXG4gIC8qKiBUaGUgdHlwZSBvZiB2YWx1ZSBoYW5kbGVkIGJ5IHRoZSBjYWxlbmRhci4gKi9cclxuICBASW5wdXQoKVxyXG4gIHR5cGU6IE1hdENhbGVuZGFyVHlwZSA9ICdkYXRlJztcclxuXHJcbiAgLyoqIFdoaWNoIHZpZXcgdGhlIGNhbGVuZGFyIHNob3VsZCBiZSBzdGFydGVkIGluLiAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgc3RhcnRWaWV3OiBNYXRDYWxlbmRhclZpZXcgPSAnbW9udGgnO1xyXG5cclxuICAvKiogQ3VycmVudCBjYWxlbmRhciB2aWV3ICovXHJcbiAgdmlldzogTWF0Q2FsZW5kYXJWaWV3O1xyXG5cclxuICAvKiogVGhlIGN1cnJlbnRseSBzZWxlY3RlZCBkYXRlLiAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHNlbGVjdGVkKCk6IEQgfCBudWxsIHtcclxuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcclxuICB9XHJcbiAgc2V0IHNlbGVjdGVkKHZhbHVlOiBEIHwgbnVsbCkge1xyXG4gICAgdGhpcy5fc2VsZWN0ZWQgPSB0aGlzLl9nZXRWYWxpZERhdGVPck51bGwodGhpcy5fZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpKTtcclxuICAgIHRoaXMuYWN0aXZlRGF0ZSA9IHRoaXMuX3NlbGVjdGVkO1xyXG4gIH1cclxuICBwcml2YXRlIF9zZWxlY3RlZDogRCB8IG51bGw7XHJcblxyXG4gIC8qKiBUaGUgbWluaW11bSBzZWxlY3RhYmxlIGRhdGUuICovXHJcbiAgQElucHV0KClcclxuICBnZXQgbWluRGF0ZSgpOiBEIHwgbnVsbCB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWluRGF0ZTtcclxuICB9XHJcbiAgc2V0IG1pbkRhdGUodmFsdWU6IEQgfCBudWxsKSB7XHJcbiAgICB0aGlzLl9taW5EYXRlID0gdGhpcy5fZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuX2RhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX21pbkRhdGU6IEQgfCBudWxsO1xyXG5cclxuICAvKiogVGhlIG1heGltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IG1heERhdGUoKTogRCB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMuX21heERhdGU7XHJcbiAgfVxyXG4gIHNldCBtYXhEYXRlKHZhbHVlOiBEIHwgbnVsbCkge1xyXG4gICAgdGhpcy5fbWF4RGF0ZSA9IHRoaXMuX2dldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLl9kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpO1xyXG4gIH1cclxuICBwcml2YXRlIF9tYXhEYXRlOiBEIHwgbnVsbDtcclxuXHJcbiAgLyoqIEEgZnVuY3Rpb24gdXNlZCB0byBmaWx0ZXIgd2hpY2ggZGF0ZXMgYXJlIHNlbGVjdGFibGUuICovXHJcbiAgQElucHV0KClcclxuICBkYXRlRmlsdGVyOiAoZGF0ZTogRCwgdW5pdD86IHN0cmluZykgPT4gYm9vbGVhbjtcclxuXHJcbiAgLyoqIENsb2NrIGludGVydmFsICovXHJcbiAgQElucHV0KClcclxuICBjbG9ja1N0ZXAgPSAxO1xyXG5cclxuICAvKiogQ2xvY2sgaG91ciBmb3JtYXQgKi9cclxuICBASW5wdXQoKVxyXG4gIHR3ZWx2ZUhvdXIgPSBmYWxzZTtcclxuXHJcbiAgLyoqIEVtaXRzIHdoZW4gdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBkYXRlIGNoYW5nZXMuICovXHJcbiAgQE91dHB1dCgpXHJcbiAgc2VsZWN0ZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPEQ+KCk7XHJcblxyXG4gIC8qKiBFbWl0cyB3aGVuIGFueSBkYXRlIGlzIHNlbGVjdGVkLiAqL1xyXG4gIEBPdXRwdXQoKVxyXG4gIF91c2VyU2VsZWN0aW9uID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xyXG5cclxuICAvKiogUmVmZXJlbmNlIHRvIHRoZSBjdXJyZW50IGNsb2NrIHZpZXcgY29tcG9uZW50LiAqL1xyXG4gIEBWaWV3Q2hpbGQoTWF0Q2xvY2tWaWV3KVxyXG4gIGNsb2NrVmlldzogTWF0Q2xvY2tWaWV3PEQ+O1xyXG5cclxuICAvKiogUmVmZXJlbmNlIHRvIHRoZSBjdXJyZW50IG1vbnRoIHZpZXcgY29tcG9uZW50LiAqL1xyXG4gIEBWaWV3Q2hpbGQoTWF0TW9udGhWaWV3KVxyXG4gIG1vbnRoVmlldzogTWF0TW9udGhWaWV3PEQ+O1xyXG5cclxuICAvKiogUmVmZXJlbmNlIHRvIHRoZSBjdXJyZW50IHllYXIgdmlldyBjb21wb25lbnQuICovXHJcbiAgQFZpZXdDaGlsZChNYXRZZWFyVmlldylcclxuICB5ZWFyVmlldzogTWF0WWVhclZpZXc8RD47XHJcblxyXG4gIC8qKiBSZWZlcmVuY2UgdG8gdGhlIGN1cnJlbnQgeWVhcnMgdmlldyBjb21wb25lbnQuICovXHJcbiAgQFZpZXdDaGlsZChNYXRZZWFyc1ZpZXcpXHJcbiAgeWVhcnNWaWV3OiBNYXRZZWFyc1ZpZXc8RD47XHJcblxyXG4gIC8qKiBEYXRlIGZpbHRlciBmb3IgdGhlIG1vbnRoIGFuZCB5ZWFyIHZpZXdzLiAqL1xyXG4gIF9kYXRlRmlsdGVyRm9yVmlld3MgPSAoZGF0ZTogRCwgdW5pdCA9ICdtaW51dGUnKSA9PiB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAhIWRhdGUgJiZcclxuICAgICAgKCF0aGlzLmRhdGVGaWx0ZXIgfHwgdGhpcy5kYXRlRmlsdGVyKGRhdGUpKSAmJlxyXG4gICAgICAoIXRoaXMubWluRGF0ZSB8fCB0aGlzLl9kYXRlQWRhcHRlci5jb21wYXJlRGF0ZShkYXRlLCB0aGlzLm1pbkRhdGUsIHVuaXQpID49IDApICYmXHJcbiAgICAgICghdGhpcy5tYXhEYXRlIHx8IHRoaXMuX2RhdGVBZGFwdGVyLmNvbXBhcmVEYXRlKGRhdGUsIHRoaXMubWF4RGF0ZSwgdW5pdCkgPD0gMClcclxuICAgICk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGN1cnJlbnQgYWN0aXZlIGRhdGUuIFRoaXMgZGV0ZXJtaW5lcyB3aGljaCB0aW1lIHBlcmlvZCBpcyBzaG93biBhbmQgd2hpY2ggZGF0ZSBpc1xyXG4gICAqIGhpZ2hsaWdodGVkIHdoZW4gdXNpbmcga2V5Ym9hcmQgbmF2aWdhdGlvbi5cclxuICAgKi9cclxuICBnZXQgYWN0aXZlRGF0ZSgpOiBEIHtcclxuICAgIHJldHVybiB0aGlzLl9jbGFtcGVkQWN0aXZlRGF0ZTtcclxuICB9XHJcbiAgc2V0IGFjdGl2ZURhdGUodmFsdWU6IEQpIHtcclxuICAgIGNvbnN0IG9sZEFjdGl2ZURhdGUgPSB0aGlzLl9jbGFtcGVkQWN0aXZlRGF0ZTtcclxuICAgIHRoaXMuX2NsYW1wZWRBY3RpdmVEYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuY2xhbXBEYXRlKHZhbHVlLCB0aGlzLm1pbkRhdGUsIHRoaXMubWF4RGF0ZSk7XHJcbiAgICB0aGlzLl9pc0FtID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0SG91cnModGhpcy5fY2xhbXBlZEFjdGl2ZURhdGUpIDwgMTI7XHJcblxyXG4gICAgY29uc3QgdW5pdCA9IHRoaXMudmlldyA9PT0gJ3llYXInID8gJ3llYXInIDogJ21vbnRoJztcclxuICAgIGNvbnN0IGRpZmYgPSB0aGlzLl9kYXRlQWRhcHRlci5jb21wYXJlRGF0ZShvbGRBY3RpdmVEYXRlLCB0aGlzLl9jbGFtcGVkQWN0aXZlRGF0ZSwgdW5pdCk7XHJcbiAgICBpZiAoZGlmZikge1xyXG4gICAgICB0aGlzLl9hbmltYXRpb25EaXIgPSBkaWZmID4gMCA/ICdsZWZ0JyA6ICdyaWdodCc7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXBkYXRlIHRoZSBsYWJlbHNcclxuICAgIGNvbnN0IGRheSA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldERheU9mV2Vlayh0aGlzLmFjdGl2ZURhdGUpO1xyXG4gICAgbGV0IGhvdXJzID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0SG91cnModGhpcy5hY3RpdmVEYXRlKTtcclxuICAgIGlmICh0aGlzLnR3ZWx2ZUhvdXIpIHtcclxuICAgICAgaG91cnMgPSBob3VycyA9PT0gMCA/IDEyIDogaG91cnMgPiAxMiA/IGhvdXJzIC0gMTIgOiBob3VycztcclxuICAgIH1cclxuICAgIGNvbnN0IG1pbnV0ZXMgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRNaW51dGVzKHRoaXMuYWN0aXZlRGF0ZSk7XHJcblxyXG4gICAgc3dpdGNoICh0aGlzLnZpZXcpIHtcclxuICAgICAgY2FzZSAneWVhcic6XHJcbiAgICAgICAgdGhpcy5fcGVyaW9kQnV0dG9uVGV4dCA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldFllYXJOYW1lKHRoaXMuYWN0aXZlRGF0ZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgdGhpcy5fcGVyaW9kQnV0dG9uVGV4dCA9IHRoaXMuX2RhdGVBZGFwdGVyLmZvcm1hdCh0aGlzLmFjdGl2ZURhdGUsIHRoaXMuX2RhdGVGb3JtYXRzLmRpc3BsYXkubW9udGhZZWFyTGFiZWwpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5feWVhckJ1dHRvblRleHQgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRZZWFyKHRoaXMuYWN0aXZlRGF0ZSkudG9TdHJpbmcoKTtcclxuICAgIHRoaXMuX21vbnRoZGF5QnV0dG9uVGV4dCA9IHRoaXMuX2RhdGVBZGFwdGVyLmZvcm1hdCh0aGlzLmFjdGl2ZURhdGUsIHRoaXMuX2RhdGVGb3JtYXRzLmRpc3BsYXkubW9udGhEYXlMYWJlbCk7XHJcbiAgICB0aGlzLl9kYXlCdXR0b25UZXh0ID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0RGF5T2ZXZWVrTmFtZXMoJ2xvbmcnKVtkYXldO1xyXG4gICAgdGhpcy5faG91ckJ1dHRvblRleHQgPSBob3Vycy50b1N0cmluZygpO1xyXG4gICAgdGhpcy5fbWludXRlQnV0dG9uVGV4dCA9ICgnMDAnICsgbWludXRlcykuc2xpY2UoLTIpO1xyXG5cclxuICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfY2xhbXBlZEFjdGl2ZURhdGU6IEQ7XHJcblxyXG4gIC8qKiBXaGV0aGVyIHRoZSBjYWxlbmRhciBpcyBpbiBtb250aCB2aWV3LiAqL1xyXG4gIGdldCBjdXJyZW50VmlldygpOiBNYXRDYWxlbmRhclZpZXcge1xyXG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRWaWV3O1xyXG4gIH1cclxuICBzZXQgY3VycmVudFZpZXcodmFsdWU6IE1hdENhbGVuZGFyVmlldykge1xyXG4gICAgdGhpcy5fY3VycmVudFZpZXcgPSB2YWx1ZTtcclxuICAgIHRoaXMuX21vdmVGb2N1c09uTmV4dFRpY2sgPSB0cnVlO1xyXG4gIH1cclxuICBwcml2YXRlIF9jdXJyZW50VmlldzogTWF0Q2FsZW5kYXJWaWV3O1xyXG5cclxuICAvKipcclxuICAgKiBFbWl0cyB3aGVuZXZlciB0aGVyZSBpcyBhIHN0YXRlIGNoYW5nZSB0aGF0IHRoZSBoZWFkZXIgbWF5IG5lZWQgdG8gcmVzcG9uZCB0by5cclxuICAgKi9cclxuICBzdGF0ZUNoYW5nZXMgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xyXG5cclxuICAvKiogQW5pbWF0aW9ucyBoYW5kbGVyICovXHJcbiAgX2FuaW1hdGlvbkRpcjogc3RyaW5nO1xyXG5cclxuICAvKiogV2hldGhlciB0aGUgYWN0aXZlIGRhdGUgaXMgQU0gb3Igbm90ICovXHJcbiAgX2lzQW06IGJvb2xlYW47XHJcblxyXG4gIC8qKiBXaGV0aGVyIHRoZSBjYWxlbmRhciBwcm9jZXNzIHRoZSB0aW1lLiAqL1xyXG4gIF9oYXNUaW1lOiBib29sZWFuO1xyXG5cclxuICAvKiogV2hldGhlciB0aGUgY2FsZW5kYXIgaXMgaW4gaG91ciB2aWV3LiAqL1xyXG4gIF9ob3VyVmlldzogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIC8qKiBUaGUgbGFiZWwgZm9yIHRoZSBjYWxlbmRhciBoZWFkZXIgYnV0dG9ucy4gKi9cclxuICBfeWVhckJ1dHRvblRleHQ6IHN0cmluZztcclxuXHJcbiAgX2RheUJ1dHRvblRleHQ6IHN0cmluZztcclxuXHJcbiAgX21vbnRoZGF5QnV0dG9uVGV4dDogc3RyaW5nO1xyXG5cclxuICBfaG91ckJ1dHRvblRleHQ6IHN0cmluZztcclxuXHJcbiAgX21pbnV0ZUJ1dHRvblRleHQ6IHN0cmluZztcclxuXHJcbiAgLyoqIFRoZSBsYWJlbCBmb3IgdGhlIGN1cnJlbnQgY2FsZW5kYXIgdmlldy4gKi9cclxuICBfcGVyaW9kQnV0dG9uVGV4dDogc3RyaW5nO1xyXG5cclxuICBfcGVyaW9kQnV0dG9uTGFiZWw6IHN0cmluZztcclxuXHJcbiAgLyoqIFRoZSBsYWJlbCBmb3IgdGhlIHRoZSBwcmV2aW91cyBidXR0b24uICovXHJcbiAgX3ByZXZCdXR0b25MYWJlbDogc3RyaW5nO1xyXG5cclxuICAvKiogVGhlIGxhYmVsIGZvciB0aGUgdGhlIG5leHQgYnV0dG9uLiAqL1xyXG4gIF9uZXh0QnV0dG9uTGFiZWw6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgX2ludGw6IE1hdERhdGVwaWNrZXJJbnRsLFxyXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBfZGF0ZUFkYXB0ZXI6IERhdGVBZGFwdGVyPEQ+LFxyXG4gICAgQE9wdGlvbmFsKClcclxuICAgIEBJbmplY3QoTUFUX0RBVEVfRk9STUFUUylcclxuICAgIHByaXZhdGUgX2RhdGVGb3JtYXRzOiBNYXREYXRlRm9ybWF0cyxcclxuICAgIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxyXG4gICkge1xyXG4gICAgaWYgKCF0aGlzLl9kYXRlQWRhcHRlcikge1xyXG4gICAgICB0aHJvdyBjcmVhdGVNaXNzaW5nRGF0ZUltcGxFcnJvcignRGF0ZUFkYXB0ZXInKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMuX2RhdGVGb3JtYXRzKSB7XHJcbiAgICAgIHRocm93IGNyZWF0ZU1pc3NpbmdEYXRlSW1wbEVycm9yKCdNQVRfREFURV9GT1JNQVRTJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5faW50bENoYW5nZXMgPSBfaW50bC5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIGNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuICAgIHRoaXMuYWN0aXZlRGF0ZSA9IHRoaXMuc3RhcnRBdCB8fCB0aGlzLl9kYXRlQWRhcHRlci50b2RheSgpO1xyXG5cclxuICAgIHRoaXMuY2hhbmdlVmlldyh0aGlzLnN0YXJ0VmlldywgZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xyXG4gICAgaWYgKHRoaXMuX21vdmVGb2N1c09uTmV4dFRpY2spIHtcclxuICAgICAgdGhpcy5fbW92ZUZvY3VzT25OZXh0VGljayA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmZvY3VzQWN0aXZlQ2VsbCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLl9pbnRsQ2hhbmdlcy51bnN1YnNjcmliZSgpO1xyXG4gICAgdGhpcy5zdGF0ZUNoYW5nZXMuY29tcGxldGUoKTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIHRoaXMuX2hhc1RpbWUgPSB0aGlzLnR5cGUuaW5kZXhPZigndGltZScpID49IDA7XHJcbiAgICBjb25zdCBjaGFuZ2UgPSBjaGFuZ2VzLnNlbGVjdGVkIHx8IGNoYW5nZXMubWluRGF0ZSB8fCBjaGFuZ2VzLm1heERhdGUgfHwgY2hhbmdlcy5kYXRlRmlsdGVyO1xyXG5cclxuICAgIGlmIChjaGFuZ2UgJiYgIWNoYW5nZS5maXJzdENoYW5nZSkge1xyXG4gICAgICBjb25zdCB2aWV3ID0gdGhpcy5fZ2V0Q3VycmVudFZpZXdDb21wb25lbnQoKTtcclxuICAgICAgaWYgKHZpZXcpIHtcclxuICAgICAgICB2aWV3Ll9pbml0KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VWaWV3KHZpZXcsIGZvY3VzID0gdHJ1ZSkge1xyXG4gICAgc3dpdGNoICh2aWV3KSB7XHJcbiAgICAgIGNhc2UgJ3llYXInOlxyXG4gICAgICAgIHRoaXMuX3BlcmlvZEJ1dHRvblRleHQgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRZZWFyTmFtZSh0aGlzLmFjdGl2ZURhdGUpO1xyXG4gICAgICAgIHRoaXMuX3BlcmlvZEJ1dHRvbkxhYmVsID0gdGhpcy5faW50bC5zd2l0Y2hUb1llYXJzVmlld0xhYmVsO1xyXG4gICAgICAgIHRoaXMuX25leHRCdXR0b25MYWJlbCA9IHRoaXMuX2ludGwubmV4dFllYXJMYWJlbDtcclxuICAgICAgICB0aGlzLl9wcmV2QnV0dG9uTGFiZWwgPSB0aGlzLl9pbnRsLnByZXZZZWFyTGFiZWw7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ21vbnRoJzpcclxuICAgICAgICB0aGlzLl9wZXJpb2RCdXR0b25UZXh0ID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZm9ybWF0KHRoaXMuYWN0aXZlRGF0ZSwgdGhpcy5fZGF0ZUZvcm1hdHMuZGlzcGxheS5tb250aFllYXJMYWJlbCk7XHJcbiAgICAgICAgdGhpcy5fcGVyaW9kQnV0dG9uTGFiZWwgPSB0aGlzLl9pbnRsLnN3aXRjaFRvWWVhclZpZXdMYWJlbDtcclxuICAgICAgICB0aGlzLl9uZXh0QnV0dG9uTGFiZWwgPSB0aGlzLl9pbnRsLm5leHRNb250aExhYmVsO1xyXG4gICAgICAgIHRoaXMuX3ByZXZCdXR0b25MYWJlbCA9IHRoaXMuX2ludGwucHJldk1vbnRoTGFiZWw7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy52aWV3ID0gdmlldztcclxuICAgIGlmIChmb2N1cykge1xyXG4gICAgICB0aGlzLl9tb3ZlRm9jdXNPbk5leHRUaWNrID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZvY3VzQWN0aXZlQ2VsbCgpIHtcclxuICAgIHRoaXMuX2dldEN1cnJlbnRWaWV3Q29tcG9uZW50KCkuX2ZvY3VzQWN0aXZlQ2VsbCgpO1xyXG4gIH1cclxuXHJcbiAgX3N1Ym1pdENsaWNrZWQoKTogdm9pZCB7XHJcbiAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQodGhpcy5hY3RpdmVEYXRlKTtcclxuICAgIHRoaXMuX3VzZXJTZWxlY3Rpb24uZW1pdCgpO1xyXG4gIH1cclxuXHJcbiAgX2NhbmNlbENsaWNrZWQoKTogdm9pZCB7XHJcbiAgICB0aGlzLl91c2VyU2VsZWN0aW9uLmVtaXQoKTtcclxuICB9XHJcblxyXG4gIC8qKiBIYW5kbGVzIGRhdGUgc2VsZWN0aW9uIGluIHRoZSBjbG9jayB2aWV3LiAqL1xyXG4gIF90aW1lQ2hhbmdlZChkYXRlOiBEKTogdm9pZCB7XHJcbiAgICB0aGlzLnNlbGVjdGVkID0gZGF0ZTtcclxuICB9XHJcblxyXG4gIF90aW1lU2VsZWN0ZWQoZGF0ZTogRCk6IHZvaWQge1xyXG4gICAgLy8gaWYgKHRoaXMuYXV0b09rICYmIHRoaXMudHlwZSA9PT0gJ3RpbWUnKSB7XHJcbiAgICAvLyAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdChkYXRlKTtcclxuICAgIC8vICAgdGhpcy5fdXNlclNlbGVjdGlvbi5lbWl0KCk7XHJcbiAgICAvLyB9XHJcbiAgICB0aGlzLnNlbGVjdGVkID0gZGF0ZTtcclxuICB9XHJcblxyXG4gIC8qKiBIYW5kbGVzIGRhdGUgc2VsZWN0aW9uIGluIHRoZSBtb250aCB2aWV3LiAqL1xyXG4gIF9kYXRlU2VsZWN0ZWQoZGF0ZTogRCk6IHZvaWQge1xyXG4gICAgdGhpcy5zZWxlY3RlZCA9IGRhdGU7XHJcbiAgICBpZiAodGhpcy5faGFzVGltZSkge1xyXG4gICAgICB0aGlzLmNoYW5nZVZpZXcoJ2Nsb2NrJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogSGFuZGxlcyBtb250aCBzZWxlY3Rpb24gaW4gdGhlIHllYXIgdmlldy4gKi9cclxuICBfbW9udGhTZWxlY3RlZChtb250aDogRCk6IHZvaWQge1xyXG4gICAgdGhpcy5zZWxlY3RlZCA9IG1vbnRoO1xyXG4gICAgdGhpcy5jaGFuZ2VWaWV3KCdtb250aCcpO1xyXG4gIH1cclxuXHJcbiAgX3llYXJTZWxlY3RlZCh5ZWFyOiBEKTogdm9pZCB7XHJcbiAgICB0aGlzLnNlbGVjdGVkID0geWVhcjtcclxuICAgIHRoaXMuY2hhbmdlVmlldygneWVhcicpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEhhbmRsZXMgdXNlciBjbGlja3Mgb24gdGhlIHBlcmlvZCBsYWJlbC4gKi9cclxuICBfY3VycmVudFBlcmlvZENsaWNrZWQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmNoYW5nZVZpZXcodGhpcy52aWV3ID09PSAnbW9udGgnID8gJ3llYXInIDogJ3llYXJzJyk7XHJcbiAgfVxyXG5cclxuICAvKiogSGFuZGxlcyB1c2VyIGNsaWNrcyBvbiB0aGUgcHJldmlvdXMgYnV0dG9uLiAqL1xyXG4gIF9wcmV2aW91c0NsaWNrZWQoKTogdm9pZCB7XHJcbiAgICB0aGlzLl9uYXZDYWxlbmRhcigtMSk7XHJcbiAgfVxyXG5cclxuICAvKiogSGFuZGxlcyB1c2VyIGNsaWNrcyBvbiB0aGUgbmV4dCBidXR0b24uICovXHJcbiAgX25leHRDbGlja2VkKCk6IHZvaWQge1xyXG4gICAgdGhpcy5fbmF2Q2FsZW5kYXIoMSk7XHJcbiAgfVxyXG5cclxuICAvKiogSGFuZGxlcyB1c2VyIGNsaWNrcyBvbiB0aGUgdGltZSBsYWJlbHMuICovXHJcbiAgX3Nob3dIb3VyVmlldygpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLl9oYXNUaW1lKSB7XHJcbiAgICAgIHRoaXMuX2hvdXJWaWV3ID0gdHJ1ZTtcclxuICAgICAgdGhpcy5jaGFuZ2VWaWV3KCdjbG9jaycpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX3Nob3dNaW51dGVWaWV3KCk6IHZvaWQge1xyXG4gICAgdGhpcy5faG91clZpZXcgPSBmYWxzZTtcclxuICAgIHRoaXMuY2hhbmdlVmlldygnY2xvY2snKTtcclxuICB9XHJcblxyXG4gIF90b2dnbGVBbVBtKGFtKTogdm9pZCB7XHJcbiAgICB0aGlzLl9pc0FtID0gIXRoaXMuX2lzQW07XHJcbiAgICBjb25zdCBkYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuYWRkQ2FsZW5kYXJIb3Vycyh0aGlzLmFjdGl2ZURhdGUsIHRoaXMuX2lzQW0gPyAtMTIgOiAxMik7XHJcbiAgICBpZiAodGhpcy5fZGF0ZUZpbHRlckZvclZpZXdzKGRhdGUsICdtaW51dGUnKSkge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkID0gZGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBpZiAodGhpcy5faXNBbSAhPT0gYW0pIHtcclxuICAgIC8vICAgY29uc3QgZGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmFkZENhbGVuZGFySG91cnModGhpcy5hY3RpdmVEYXRlLCB0aGlzLl9pc0FtID8gMTIgOiAtMTIpO1xyXG4gICAgLy8gICBpZiAodGhpcy5fZGF0ZUZpbHRlckZvclZpZXdzKGRhdGUsICdtaW51dGUnKSkge1xyXG4gICAgLy8gICAgIHRoaXMuc2VsZWN0ZWQgPSBkYXRlO1xyXG4gICAgLy8gICB9XHJcbiAgICAvLyB9XHJcbiAgfVxyXG5cclxuICAvKiogV2hldGhlciB0aGUgcHJldmlvdXMgcGVyaW9kIGJ1dHRvbiBpcyBlbmFibGVkLiAqL1xyXG4gIF9wcmV2aW91c0VuYWJsZWQoKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoIXRoaXMubWluRGF0ZSkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiAhdGhpcy5taW5EYXRlIHx8ICF0aGlzLl9pc1NhbWVWaWV3KHRoaXMuYWN0aXZlRGF0ZSwgdGhpcy5taW5EYXRlKTtcclxuICB9XHJcblxyXG4gIC8qKiBXaGV0aGVyIHRoZSBuZXh0IHBlcmlvZCBidXR0b24gaXMgZW5hYmxlZC4gKi9cclxuICBfbmV4dEVuYWJsZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gIXRoaXMubWF4RGF0ZSB8fCAhdGhpcy5faXNTYW1lVmlldyh0aGlzLmFjdGl2ZURhdGUsIHRoaXMubWF4RGF0ZSk7XHJcbiAgfVxyXG5cclxuICAvKiogSGFuZGxlcyBjYWxlbmRhciBkaWZmcy4gKi9cclxuICBfbmF2Q2FsZW5kYXIoZGlmZik6IHZvaWQge1xyXG4gICAgc3dpdGNoICh0aGlzLnZpZXcpIHtcclxuICAgICAgY2FzZSAneWVhcic6XHJcbiAgICAgICAgdGhpcy5hY3RpdmVEYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyh0aGlzLmFjdGl2ZURhdGUsIGRpZmYpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdtb250aCc6XHJcbiAgICAgICAgdGhpcy5hY3RpdmVEYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuYWRkQ2FsZW5kYXJNb250aHModGhpcy5hY3RpdmVEYXRlLCBkaWZmKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnY2xvY2snOlxyXG4gICAgICAgIHRoaXMuYWN0aXZlRGF0ZSA9IHRoaXMuX2hvdXJWaWV3XHJcbiAgICAgICAgICA/IHRoaXMuX2RhdGVBZGFwdGVyLmFkZENhbGVuZGFySG91cnModGhpcy5hY3RpdmVEYXRlLCBkaWZmKVxyXG4gICAgICAgICAgOiB0aGlzLl9kYXRlQWRhcHRlci5hZGRDYWxlbmRhck1pbnV0ZXModGhpcy5hY3RpdmVEYXRlLCBkaWZmKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBXaGV0aGVyIHRoZSB0d28gZGF0ZXMgcmVwcmVzZW50IHRoZSBzYW1lIHZpZXcgaW4gdGhlIGN1cnJlbnQgdmlldyBtb2RlIChtb250aCBvciB5ZWFyKS4gKi9cclxuICBwcml2YXRlIF9pc1NhbWVWaWV3KGRhdGUxOiBELCBkYXRlMjogRCk6IGJvb2xlYW4ge1xyXG4gICAgc3dpdGNoICh0aGlzLnZpZXcpIHtcclxuICAgICAgY2FzZSAneWVhcic6XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGVBZGFwdGVyLmdldFllYXIoZGF0ZTEpID09PSB0aGlzLl9kYXRlQWRhcHRlci5nZXRZZWFyKGRhdGUyKTtcclxuICAgICAgY2FzZSAnbW9udGgnOlxyXG4gICAgICAgIGNvbnN0IG1vbnRoWWVhciA9IHRoaXMuX2RhdGVGb3JtYXRzLmRpc3BsYXkubW9udGhZZWFyTGFiZWw7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGVBZGFwdGVyLmZvcm1hdChkYXRlMSwgbW9udGhZZWFyKSA9PT0gdGhpcy5fZGF0ZUFkYXB0ZXIuZm9ybWF0KGRhdGUyLCBtb250aFllYXIpO1xyXG4gICAgICBjYXNlICdjbG9jayc6XHJcbiAgICAgICAgY29uc3QgaG91ck1pbnV0ZSA9IHRoaXMuX2RhdGVGb3JtYXRzLmRpc3BsYXkudGltZUxhYmVsO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRlQWRhcHRlci5mb3JtYXQoZGF0ZTEsIGhvdXJNaW51dGUpID09PSB0aGlzLl9kYXRlQWRhcHRlci5mb3JtYXQoZGF0ZTIsIGhvdXJNaW51dGUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIG9iaiBUaGUgb2JqZWN0IHRvIGNoZWNrLlxyXG4gICAqIEByZXR1cm5zIFRoZSBnaXZlbiBvYmplY3QgaWYgaXQgaXMgYm90aCBhIGRhdGUgaW5zdGFuY2UgYW5kIHZhbGlkLCBvdGhlcndpc2UgbnVsbC5cclxuICAgKi9cclxuICBwcml2YXRlIF9nZXRWYWxpZERhdGVPck51bGwob2JqOiBhbnkpOiBEIHwgbnVsbCB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGF0ZUFkYXB0ZXIuaXNEYXRlSW5zdGFuY2Uob2JqKSAmJiB0aGlzLl9kYXRlQWRhcHRlci5pc1ZhbGlkKG9iaikgPyBvYmogOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgLyoqIFJldHVybnMgdGhlIGNvbXBvbmVudCBpbnN0YW5jZSB0aGF0IGNvcnJlc3BvbmRzIHRvIHRoZSBjdXJyZW50IGNhbGVuZGFyIHZpZXcuICovXHJcbiAgcHJpdmF0ZSBfZ2V0Q3VycmVudFZpZXdDb21wb25lbnQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jbG9ja1ZpZXcgfHwgdGhpcy5tb250aFZpZXcgfHwgdGhpcy55ZWFyVmlldyB8fCB0aGlzLnllYXJzVmlldztcclxuICB9XHJcbn1cclxuIl19