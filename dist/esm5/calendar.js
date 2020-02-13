/**
 * @fileoverview added by tsickle
 * Generated from: calendar.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWFydGluZGFsZWMvZGF0ZXBpY2tlci8iLCJzb3VyY2VzIjpbImNhbGVuZGFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFHTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFHTCxRQUFRLEVBQ1IsTUFBTSxFQUVOLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUM1QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQWtCLE1BQU0sY0FBYyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzVDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDMUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGNBQWMsQ0FBQzs7Ozs7O0FBa0I1QztJQW9ORSxxQkFDUyxLQUF3QixFQUNYLFlBQTRCLEVBR3hDLFlBQTRCLEVBQ3BDLGlCQUFvQztRQU50QyxpQkFvQkM7UUFuQlEsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUFDWCxpQkFBWSxHQUFaLFlBQVksQ0FBZ0I7UUFHeEMsaUJBQVksR0FBWixZQUFZLENBQWdCOzs7Ozs7UUFyTTlCLHlCQUFvQixHQUFHLEtB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QUMsV0FBVzs0QkFJckIsU0FBUyxTQUFDLFlBQVk7O0lBb1V6QixrQkFBQztDQUFBLEFBL2FELElBK2FDO1NBbmFZLFdBQVc7Ozs7OztJQUN0QixtQ0FBbUM7Ozs7Ozs7O0lBT25DLDJDQUFxQzs7Ozs7SUFVckMsK0JBQTJCOzs7OztJQUczQiwyQkFDK0I7Ozs7O0lBRy9CLGdDQUNxQzs7Ozs7SUFHckMsMkJBQXNCOzs7OztJQVd0QixnQ0FBNEI7Ozs7O0lBVTVCLCtCQUEyQjs7Ozs7SUFVM0IsK0JBQTJCOzs7OztJQUczQixpQ0FDZ0Q7Ozs7O0lBR2hELGdDQUNjOzs7OztJQUdkLGlDQUNtQjs7Ozs7SUFHbkIscUNBQ3VDOzs7OztJQUd2QyxxQ0FDMEM7Ozs7O0lBRzFDLGdDQUMyQjs7Ozs7SUFHM0IsZ0NBQzJCOzs7OztJQUczQiwrQkFDeUI7Ozs7O0lBR3pCLGdDQUMyQjs7Ozs7SUFHM0IsMENBT0U7Ozs7O0lBMkNGLHlDQUE4Qjs7Ozs7SUFVOUIsbUNBQXNDOzs7OztJQUt0QyxtQ0FBbUM7Ozs7O0lBR25DLG9DQUFzQjs7Ozs7SUFHdEIsNEJBQWU7Ozs7O0lBR2YsK0JBQWtCOzs7OztJQUdsQixnQ0FBMEI7Ozs7O0lBRzFCLHNDQUF3Qjs7SUFFeEIscUNBQXVCOztJQUV2QiwwQ0FBNEI7O0lBRTVCLHNDQUF3Qjs7SUFFeEIsd0NBQTBCOzs7OztJQUcxQix3Q0FBMEI7O0lBRTFCLHlDQUEyQjs7Ozs7SUFHM0IsdUNBQXlCOzs7OztJQUd6Qix1Q0FBeUI7O0lBR3ZCLDRCQUErQjs7Ozs7SUFDL0IsbUNBQWdEOzs7OztJQUNoRCxtQ0FFb0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcclxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxyXG4gKi9cclxuXHJcbmltcG9ydCB7XHJcbiAgQWZ0ZXJDb250ZW50SW5pdCxcclxuICBBZnRlclZpZXdDaGVja2VkLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIENvbXBvbmVudCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSW5qZWN0LFxyXG4gIElucHV0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT3B0aW9uYWwsXHJcbiAgT3V0cHV0LFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbiAgVmlld0NoaWxkLFxyXG4gIFZpZXdFbmNhcHN1bGF0aW9uXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBNYXRDbG9ja1ZpZXcgfSBmcm9tICcuL2Nsb2NrLXZpZXcnO1xyXG5pbXBvcnQgeyBNQVRfREFURV9GT1JNQVRTLCBNYXREYXRlRm9ybWF0cyB9IGZyb20gJy4vY29yZS9pbmRleCc7XHJcbmltcG9ydCB7IERhdGVBZGFwdGVyIH0gZnJvbSAnLi9jb3JlL2luZGV4JztcclxuaW1wb3J0IHsgY29udHJvbEFjdGl2ZSwgc2xpZGVDYWxlbmRhciB9IGZyb20gJy4vZGF0ZXBpY2tlci1hbmltYXRpb25zJztcclxuaW1wb3J0IHsgY3JlYXRlTWlzc2luZ0RhdGVJbXBsRXJyb3IgfSBmcm9tICcuL2RhdGVwaWNrZXItZXJyb3JzJztcclxuaW1wb3J0IHsgTWF0RGF0ZXBpY2tlckludGwgfSBmcm9tICcuL2RhdGVwaWNrZXItaW50bCc7XHJcbmltcG9ydCB7IE1hdE1vbnRoVmlldyB9IGZyb20gJy4vbW9udGgtdmlldyc7XHJcbmltcG9ydCB7IE1hdFllYXJWaWV3IH0gZnJvbSAnLi95ZWFyLXZpZXcnO1xyXG5pbXBvcnQgeyBNYXRZZWFyc1ZpZXcgfSBmcm9tICcuL3llYXJzLXZpZXcnO1xyXG5cclxuLyoqXHJcbiAqIFBvc3NpYmxlIHZpZXdzIGZvciB0aGUgY2FsZW5kYXIuXHJcbiAqIEBkb2NzLXByaXZhdGVcclxuICovXHJcbmV4cG9ydCB0eXBlIE1hdENhbGVuZGFyVmlldyA9ICdjbG9jaycgfCAnbW9udGgnIHwgJ3llYXInIHwgJ3llYXJzJztcclxuXHJcbi8qKlxyXG4gKiBQb3NzaWJsZSByZXR1cm4gdHlwZXMuXHJcbiAqIEBkb2NzLXByaXZhdGVcclxuICovXHJcbmV4cG9ydCB0eXBlIE1hdENhbGVuZGFyVHlwZSA9ICdkYXRlJyB8ICdkYXRldGltZScgfCAndGltZSc7XHJcblxyXG4vKipcclxuICogQSBjYWxlbmRhciB0aGF0IGlzIHVzZWQgYXMgcGFydCBvZiB0aGUgZGF0ZXBpY2tlci5cclxuICogQGRvY3MtcHJpdmF0ZVxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdtYXQtY2FsZW5kYXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnY2FsZW5kYXIuaHRtbCcsXHJcbiAgLy8gc3R5bGVVcmxzOiBbJ2NhbGVuZGFyLmNzcyddLFxyXG4gIGhvc3Q6IHtcclxuICAgIGNsYXNzOiAnbWF0LWNhbGVuZGFyJ1xyXG4gIH0sXHJcbiAgYW5pbWF0aW9uczogW2NvbnRyb2xBY3RpdmUsIHNsaWRlQ2FsZW5kYXJdLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2VcclxufSlcclxuZXhwb3J0IGNsYXNzIE1hdENhbGVuZGFyPEQ+IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3Q2hlY2tlZCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xyXG4gIHByaXZhdGUgX2ludGxDaGFuZ2VzOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZWQgZm9yIHNjaGVkdWxpbmcgdGhhdCBmb2N1cyBzaG91bGQgYmUgbW92ZWQgdG8gdGhlIGFjdGl2ZSBjZWxsIG9uIHRoZSBuZXh0IHRpY2suXHJcbiAgICogV2UgbmVlZCB0byBzY2hlZHVsZSBpdCwgcmF0aGVyIHRoYW4gZG8gaXQgaW1tZWRpYXRlbHksIGJlY2F1c2Ugd2UgaGF2ZSB0byB3YWl0XHJcbiAgICogZm9yIEFuZ3VsYXIgdG8gcmUtZXZhbHVhdGUgdGhlIHZpZXcgY2hpbGRyZW4uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfbW92ZUZvY3VzT25OZXh0VGljayA9IGZhbHNlO1xyXG5cclxuICAvKiogQSBkYXRlIHJlcHJlc2VudGluZyB0aGUgcGVyaW9kIChtb250aCBvciB5ZWFyKSB0byBzdGFydCB0aGUgY2FsZW5kYXIgaW4uICovXHJcbiAgQElucHV0KClcclxuICBnZXQgc3RhcnRBdCgpOiBEIHwgbnVsbCB7XHJcbiAgICByZXR1cm4gdGhpcy5fc3RhcnRBdDtcclxuICB9XHJcbiAgc2V0IHN0YXJ0QXQodmFsdWU6IEQgfCBudWxsKSB7XHJcbiAgICB0aGlzLl9zdGFydEF0ID0gdGhpcy5fZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuX2RhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3N0YXJ0QXQ6IEQgfCBudWxsO1xyXG5cclxuICAvKiogVGhlIHR5cGUgb2YgdmFsdWUgaGFuZGxlZCBieSB0aGUgY2FsZW5kYXIuICovXHJcbiAgQElucHV0KClcclxuICB0eXBlOiBNYXRDYWxlbmRhclR5cGUgPSAnZGF0ZSc7XHJcblxyXG4gIC8qKiBXaGljaCB2aWV3IHRoZSBjYWxlbmRhciBzaG91bGQgYmUgc3RhcnRlZCBpbi4gKi9cclxuICBASW5wdXQoKVxyXG4gIHN0YXJ0VmlldzogTWF0Q2FsZW5kYXJWaWV3ID0gJ21vbnRoJztcclxuXHJcbiAgLyoqIEN1cnJlbnQgY2FsZW5kYXIgdmlldyAqL1xyXG4gIHZpZXc6IE1hdENhbGVuZGFyVmlldztcclxuXHJcbiAgLyoqIFRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgZGF0ZS4gKi9cclxuICBASW5wdXQoKVxyXG4gIGdldCBzZWxlY3RlZCgpOiBEIHwgbnVsbCB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XHJcbiAgfVxyXG4gIHNldCBzZWxlY3RlZCh2YWx1ZTogRCB8IG51bGwpIHtcclxuICAgIHRoaXMuX3NlbGVjdGVkID0gdGhpcy5fZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuX2RhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSk7XHJcbiAgICB0aGlzLmFjdGl2ZURhdGUgPSB0aGlzLl9zZWxlY3RlZDtcclxuICB9XHJcbiAgcHJpdmF0ZSBfc2VsZWN0ZWQ6IEQgfCBudWxsO1xyXG5cclxuICAvKiogVGhlIG1pbmltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IG1pbkRhdGUoKTogRCB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMuX21pbkRhdGU7XHJcbiAgfVxyXG4gIHNldCBtaW5EYXRlKHZhbHVlOiBEIHwgbnVsbCkge1xyXG4gICAgdGhpcy5fbWluRGF0ZSA9IHRoaXMuX2dldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLl9kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpO1xyXG4gIH1cclxuICBwcml2YXRlIF9taW5EYXRlOiBEIHwgbnVsbDtcclxuXHJcbiAgLyoqIFRoZSBtYXhpbXVtIHNlbGVjdGFibGUgZGF0ZS4gKi9cclxuICBASW5wdXQoKVxyXG4gIGdldCBtYXhEYXRlKCk6IEQgfCBudWxsIHtcclxuICAgIHJldHVybiB0aGlzLl9tYXhEYXRlO1xyXG4gIH1cclxuICBzZXQgbWF4RGF0ZSh2YWx1ZTogRCB8IG51bGwpIHtcclxuICAgIHRoaXMuX21heERhdGUgPSB0aGlzLl9nZXRWYWxpZERhdGVPck51bGwodGhpcy5fZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfbWF4RGF0ZTogRCB8IG51bGw7XHJcblxyXG4gIC8qKiBBIGZ1bmN0aW9uIHVzZWQgdG8gZmlsdGVyIHdoaWNoIGRhdGVzIGFyZSBzZWxlY3RhYmxlLiAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZGF0ZUZpbHRlcjogKGRhdGU6IEQsIHVuaXQ/OiBzdHJpbmcpID0+IGJvb2xlYW47XHJcblxyXG4gIC8qKiBDbG9jayBpbnRlcnZhbCAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgY2xvY2tTdGVwID0gMTtcclxuXHJcbiAgLyoqIENsb2NrIGhvdXIgZm9ybWF0ICovXHJcbiAgQElucHV0KClcclxuICB0d2VsdmVIb3VyID0gZmFsc2U7XHJcblxyXG4gIC8qKiBFbWl0cyB3aGVuIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgZGF0ZSBjaGFuZ2VzLiAqL1xyXG4gIEBPdXRwdXQoKVxyXG4gIHNlbGVjdGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxEPigpO1xyXG5cclxuICAvKiogRW1pdHMgd2hlbiBhbnkgZGF0ZSBpcyBzZWxlY3RlZC4gKi9cclxuICBAT3V0cHV0KClcclxuICBfdXNlclNlbGVjdGlvbiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcclxuXHJcbiAgLyoqIFJlZmVyZW5jZSB0byB0aGUgY3VycmVudCBjbG9jayB2aWV3IGNvbXBvbmVudC4gKi9cclxuICBAVmlld0NoaWxkKE1hdENsb2NrVmlldylcclxuICBjbG9ja1ZpZXc6IE1hdENsb2NrVmlldzxEPjtcclxuXHJcbiAgLyoqIFJlZmVyZW5jZSB0byB0aGUgY3VycmVudCBtb250aCB2aWV3IGNvbXBvbmVudC4gKi9cclxuICBAVmlld0NoaWxkKE1hdE1vbnRoVmlldylcclxuICBtb250aFZpZXc6IE1hdE1vbnRoVmlldzxEPjtcclxuXHJcbiAgLyoqIFJlZmVyZW5jZSB0byB0aGUgY3VycmVudCB5ZWFyIHZpZXcgY29tcG9uZW50LiAqL1xyXG4gIEBWaWV3Q2hpbGQoTWF0WWVhclZpZXcpXHJcbiAgeWVhclZpZXc6IE1hdFllYXJWaWV3PEQ+O1xyXG5cclxuICAvKiogUmVmZXJlbmNlIHRvIHRoZSBjdXJyZW50IHllYXJzIHZpZXcgY29tcG9uZW50LiAqL1xyXG4gIEBWaWV3Q2hpbGQoTWF0WWVhcnNWaWV3KVxyXG4gIHllYXJzVmlldzogTWF0WWVhcnNWaWV3PEQ+O1xyXG5cclxuICAvKiogRGF0ZSBmaWx0ZXIgZm9yIHRoZSBtb250aCBhbmQgeWVhciB2aWV3cy4gKi9cclxuICBfZGF0ZUZpbHRlckZvclZpZXdzID0gKGRhdGU6IEQsIHVuaXQgPSAnbWludXRlJykgPT4ge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgISFkYXRlICYmXHJcbiAgICAgICghdGhpcy5kYXRlRmlsdGVyIHx8IHRoaXMuZGF0ZUZpbHRlcihkYXRlKSkgJiZcclxuICAgICAgKCF0aGlzLm1pbkRhdGUgfHwgdGhpcy5fZGF0ZUFkYXB0ZXIuY29tcGFyZURhdGUoZGF0ZSwgdGhpcy5taW5EYXRlLCB1bml0KSA+PSAwKSAmJlxyXG4gICAgICAoIXRoaXMubWF4RGF0ZSB8fCB0aGlzLl9kYXRlQWRhcHRlci5jb21wYXJlRGF0ZShkYXRlLCB0aGlzLm1heERhdGUsIHVuaXQpIDw9IDApXHJcbiAgICApO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjdXJyZW50IGFjdGl2ZSBkYXRlLiBUaGlzIGRldGVybWluZXMgd2hpY2ggdGltZSBwZXJpb2QgaXMgc2hvd24gYW5kIHdoaWNoIGRhdGUgaXNcclxuICAgKiBoaWdobGlnaHRlZCB3aGVuIHVzaW5nIGtleWJvYXJkIG5hdmlnYXRpb24uXHJcbiAgICovXHJcbiAgZ2V0IGFjdGl2ZURhdGUoKTogRCB7XHJcbiAgICByZXR1cm4gdGhpcy5fY2xhbXBlZEFjdGl2ZURhdGU7XHJcbiAgfVxyXG4gIHNldCBhY3RpdmVEYXRlKHZhbHVlOiBEKSB7XHJcbiAgICBjb25zdCBvbGRBY3RpdmVEYXRlID0gdGhpcy5fY2xhbXBlZEFjdGl2ZURhdGU7XHJcbiAgICB0aGlzLl9jbGFtcGVkQWN0aXZlRGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmNsYW1wRGF0ZSh2YWx1ZSwgdGhpcy5taW5EYXRlLCB0aGlzLm1heERhdGUpO1xyXG4gICAgdGhpcy5faXNBbSA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldEhvdXJzKHRoaXMuX2NsYW1wZWRBY3RpdmVEYXRlKSA8IDEyO1xyXG5cclxuICAgIGNvbnN0IHVuaXQgPSB0aGlzLnZpZXcgPT09ICd5ZWFyJyA/ICd5ZWFyJyA6ICdtb250aCc7XHJcbiAgICBjb25zdCBkaWZmID0gdGhpcy5fZGF0ZUFkYXB0ZXIuY29tcGFyZURhdGUob2xkQWN0aXZlRGF0ZSwgdGhpcy5fY2xhbXBlZEFjdGl2ZURhdGUsIHVuaXQpO1xyXG4gICAgaWYgKGRpZmYpIHtcclxuICAgICAgdGhpcy5fYW5pbWF0aW9uRGlyID0gZGlmZiA+IDAgPyAnbGVmdCcgOiAncmlnaHQnO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHVwZGF0ZSB0aGUgbGFiZWxzXHJcbiAgICBjb25zdCBkYXkgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXREYXlPZldlZWsodGhpcy5hY3RpdmVEYXRlKTtcclxuICAgIGxldCBob3VycyA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldEhvdXJzKHRoaXMuYWN0aXZlRGF0ZSk7XHJcbiAgICBpZiAodGhpcy50d2VsdmVIb3VyKSB7XHJcbiAgICAgIGhvdXJzID0gaG91cnMgPT09IDAgPyAxMiA6IGhvdXJzID4gMTIgPyBob3VycyAtIDEyIDogaG91cnM7XHJcbiAgICB9XHJcbiAgICBjb25zdCBtaW51dGVzID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0TWludXRlcyh0aGlzLmFjdGl2ZURhdGUpO1xyXG5cclxuICAgIHN3aXRjaCAodGhpcy52aWV3KSB7XHJcbiAgICAgIGNhc2UgJ3llYXInOlxyXG4gICAgICAgIHRoaXMuX3BlcmlvZEJ1dHRvblRleHQgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRZZWFyTmFtZSh0aGlzLmFjdGl2ZURhdGUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHRoaXMuX3BlcmlvZEJ1dHRvblRleHQgPSB0aGlzLl9kYXRlQWRhcHRlci5mb3JtYXQodGhpcy5hY3RpdmVEYXRlLCB0aGlzLl9kYXRlRm9ybWF0cy5kaXNwbGF5Lm1vbnRoWWVhckxhYmVsKTtcclxuICAgIH1cclxuICAgIHRoaXMuX3llYXJCdXR0b25UZXh0ID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLmFjdGl2ZURhdGUpLnRvU3RyaW5nKCk7XHJcbiAgICB0aGlzLl9tb250aGRheUJ1dHRvblRleHQgPSB0aGlzLl9kYXRlQWRhcHRlci5mb3JtYXQodGhpcy5hY3RpdmVEYXRlLCB0aGlzLl9kYXRlRm9ybWF0cy5kaXNwbGF5Lm1vbnRoRGF5TGFiZWwpO1xyXG4gICAgdGhpcy5fZGF5QnV0dG9uVGV4dCA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldERheU9mV2Vla05hbWVzKCdsb25nJylbZGF5XTtcclxuICAgIHRoaXMuX2hvdXJCdXR0b25UZXh0ID0gaG91cnMudG9TdHJpbmcoKTtcclxuICAgIHRoaXMuX21pbnV0ZUJ1dHRvblRleHQgPSAoJzAwJyArIG1pbnV0ZXMpLnNsaWNlKC0yKTtcclxuXHJcbiAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2NsYW1wZWRBY3RpdmVEYXRlOiBEO1xyXG5cclxuICAvKiogV2hldGhlciB0aGUgY2FsZW5kYXIgaXMgaW4gbW9udGggdmlldy4gKi9cclxuICBnZXQgY3VycmVudFZpZXcoKTogTWF0Q2FsZW5kYXJWaWV3IHtcclxuICAgIHJldHVybiB0aGlzLl9jdXJyZW50VmlldztcclxuICB9XHJcbiAgc2V0IGN1cnJlbnRWaWV3KHZhbHVlOiBNYXRDYWxlbmRhclZpZXcpIHtcclxuICAgIHRoaXMuX2N1cnJlbnRWaWV3ID0gdmFsdWU7XHJcbiAgICB0aGlzLl9tb3ZlRm9jdXNPbk5leHRUaWNrID0gdHJ1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfY3VycmVudFZpZXc6IE1hdENhbGVuZGFyVmlldztcclxuXHJcbiAgLyoqXHJcbiAgICogRW1pdHMgd2hlbmV2ZXIgdGhlcmUgaXMgYSBzdGF0ZSBjaGFuZ2UgdGhhdCB0aGUgaGVhZGVyIG1heSBuZWVkIHRvIHJlc3BvbmQgdG8uXHJcbiAgICovXHJcbiAgc3RhdGVDaGFuZ2VzID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcclxuXHJcbiAgLyoqIEFuaW1hdGlvbnMgaGFuZGxlciAqL1xyXG4gIF9hbmltYXRpb25EaXI6IHN0cmluZztcclxuXHJcbiAgLyoqIFdoZXRoZXIgdGhlIGFjdGl2ZSBkYXRlIGlzIEFNIG9yIG5vdCAqL1xyXG4gIF9pc0FtOiBib29sZWFuO1xyXG5cclxuICAvKiogV2hldGhlciB0aGUgY2FsZW5kYXIgcHJvY2VzcyB0aGUgdGltZS4gKi9cclxuICBfaGFzVGltZTogYm9vbGVhbjtcclxuXHJcbiAgLyoqIFdoZXRoZXIgdGhlIGNhbGVuZGFyIGlzIGluIGhvdXIgdmlldy4gKi9cclxuICBfaG91clZpZXc6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAvKiogVGhlIGxhYmVsIGZvciB0aGUgY2FsZW5kYXIgaGVhZGVyIGJ1dHRvbnMuICovXHJcbiAgX3llYXJCdXR0b25UZXh0OiBzdHJpbmc7XHJcblxyXG4gIF9kYXlCdXR0b25UZXh0OiBzdHJpbmc7XHJcblxyXG4gIF9tb250aGRheUJ1dHRvblRleHQ6IHN0cmluZztcclxuXHJcbiAgX2hvdXJCdXR0b25UZXh0OiBzdHJpbmc7XHJcblxyXG4gIF9taW51dGVCdXR0b25UZXh0OiBzdHJpbmc7XHJcblxyXG4gIC8qKiBUaGUgbGFiZWwgZm9yIHRoZSBjdXJyZW50IGNhbGVuZGFyIHZpZXcuICovXHJcbiAgX3BlcmlvZEJ1dHRvblRleHQ6IHN0cmluZztcclxuXHJcbiAgX3BlcmlvZEJ1dHRvbkxhYmVsOiBzdHJpbmc7XHJcblxyXG4gIC8qKiBUaGUgbGFiZWwgZm9yIHRoZSB0aGUgcHJldmlvdXMgYnV0dG9uLiAqL1xyXG4gIF9wcmV2QnV0dG9uTGFiZWw6IHN0cmluZztcclxuXHJcbiAgLyoqIFRoZSBsYWJlbCBmb3IgdGhlIHRoZSBuZXh0IGJ1dHRvbi4gKi9cclxuICBfbmV4dEJ1dHRvbkxhYmVsOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIF9pbnRsOiBNYXREYXRlcGlja2VySW50bCxcclxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgX2RhdGVBZGFwdGVyOiBEYXRlQWRhcHRlcjxEPixcclxuICAgIEBPcHRpb25hbCgpXHJcbiAgICBASW5qZWN0KE1BVF9EQVRFX0ZPUk1BVFMpXHJcbiAgICBwcml2YXRlIF9kYXRlRm9ybWF0czogTWF0RGF0ZUZvcm1hdHMsXHJcbiAgICBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcclxuICApIHtcclxuICAgIGlmICghdGhpcy5fZGF0ZUFkYXB0ZXIpIHtcclxuICAgICAgdGhyb3cgY3JlYXRlTWlzc2luZ0RhdGVJbXBsRXJyb3IoJ0RhdGVBZGFwdGVyJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLl9kYXRlRm9ybWF0cykge1xyXG4gICAgICB0aHJvdyBjcmVhdGVNaXNzaW5nRGF0ZUltcGxFcnJvcignTUFUX0RBVEVfRk9STUFUUycpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2ludGxDaGFuZ2VzID0gX2ludGwuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICBjaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcclxuICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICB0aGlzLmFjdGl2ZURhdGUgPSB0aGlzLnN0YXJ0QXQgfHwgdGhpcy5fZGF0ZUFkYXB0ZXIudG9kYXkoKTtcclxuXHJcbiAgICB0aGlzLmNoYW5nZVZpZXcodGhpcy5zdGFydFZpZXcsIGZhbHNlKTtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcclxuICAgIGlmICh0aGlzLl9tb3ZlRm9jdXNPbk5leHRUaWNrKSB7XHJcbiAgICAgIHRoaXMuX21vdmVGb2N1c09uTmV4dFRpY2sgPSBmYWxzZTtcclxuICAgICAgdGhpcy5mb2N1c0FjdGl2ZUNlbGwoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5faW50bENoYW5nZXMudW5zdWJzY3JpYmUoKTtcclxuICAgIHRoaXMuc3RhdGVDaGFuZ2VzLmNvbXBsZXRlKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICB0aGlzLl9oYXNUaW1lID0gdGhpcy50eXBlLmluZGV4T2YoJ3RpbWUnKSA+PSAwO1xyXG4gICAgY29uc3QgY2hhbmdlID0gY2hhbmdlcy5zZWxlY3RlZCB8fCBjaGFuZ2VzLm1pbkRhdGUgfHwgY2hhbmdlcy5tYXhEYXRlIHx8IGNoYW5nZXMuZGF0ZUZpbHRlcjtcclxuXHJcbiAgICBpZiAoY2hhbmdlICYmICFjaGFuZ2UuZmlyc3RDaGFuZ2UpIHtcclxuICAgICAgY29uc3QgdmlldyA9IHRoaXMuX2dldEN1cnJlbnRWaWV3Q29tcG9uZW50KCk7XHJcbiAgICAgIGlmICh2aWV3KSB7XHJcbiAgICAgICAgdmlldy5faW5pdCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlVmlldyh2aWV3LCBmb2N1cyA9IHRydWUpIHtcclxuICAgIHN3aXRjaCAodmlldykge1xyXG4gICAgICBjYXNlICd5ZWFyJzpcclxuICAgICAgICB0aGlzLl9wZXJpb2RCdXR0b25UZXh0ID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0WWVhck5hbWUodGhpcy5hY3RpdmVEYXRlKTtcclxuICAgICAgICB0aGlzLl9wZXJpb2RCdXR0b25MYWJlbCA9IHRoaXMuX2ludGwuc3dpdGNoVG9ZZWFyc1ZpZXdMYWJlbDtcclxuICAgICAgICB0aGlzLl9uZXh0QnV0dG9uTGFiZWwgPSB0aGlzLl9pbnRsLm5leHRZZWFyTGFiZWw7XHJcbiAgICAgICAgdGhpcy5fcHJldkJ1dHRvbkxhYmVsID0gdGhpcy5faW50bC5wcmV2WWVhckxhYmVsO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdtb250aCc6XHJcbiAgICAgICAgdGhpcy5fcGVyaW9kQnV0dG9uVGV4dCA9IHRoaXMuX2RhdGVBZGFwdGVyLmZvcm1hdCh0aGlzLmFjdGl2ZURhdGUsIHRoaXMuX2RhdGVGb3JtYXRzLmRpc3BsYXkubW9udGhZZWFyTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuX3BlcmlvZEJ1dHRvbkxhYmVsID0gdGhpcy5faW50bC5zd2l0Y2hUb1llYXJWaWV3TGFiZWw7XHJcbiAgICAgICAgdGhpcy5fbmV4dEJ1dHRvbkxhYmVsID0gdGhpcy5faW50bC5uZXh0TW9udGhMYWJlbDtcclxuICAgICAgICB0aGlzLl9wcmV2QnV0dG9uTGFiZWwgPSB0aGlzLl9pbnRsLnByZXZNb250aExhYmVsO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudmlldyA9IHZpZXc7XHJcbiAgICBpZiAoZm9jdXMpIHtcclxuICAgICAgdGhpcy5fbW92ZUZvY3VzT25OZXh0VGljayA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmb2N1c0FjdGl2ZUNlbGwoKSB7XHJcbiAgICB0aGlzLl9nZXRDdXJyZW50Vmlld0NvbXBvbmVudCgpLl9mb2N1c0FjdGl2ZUNlbGwoKTtcclxuICB9XHJcblxyXG4gIF9zdWJtaXRDbGlja2VkKCk6IHZvaWQge1xyXG4gICAgdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KHRoaXMuYWN0aXZlRGF0ZSk7XHJcbiAgICB0aGlzLl91c2VyU2VsZWN0aW9uLmVtaXQoKTtcclxuICB9XHJcblxyXG4gIF9jYW5jZWxDbGlja2VkKCk6IHZvaWQge1xyXG4gICAgdGhpcy5fdXNlclNlbGVjdGlvbi5lbWl0KCk7XHJcbiAgfVxyXG5cclxuICAvKiogSGFuZGxlcyBkYXRlIHNlbGVjdGlvbiBpbiB0aGUgY2xvY2sgdmlldy4gKi9cclxuICBfdGltZUNoYW5nZWQoZGF0ZTogRCk6IHZvaWQge1xyXG4gICAgdGhpcy5zZWxlY3RlZCA9IGRhdGU7XHJcbiAgfVxyXG5cclxuICBfdGltZVNlbGVjdGVkKGRhdGU6IEQpOiB2b2lkIHtcclxuICAgIC8vIGlmICh0aGlzLmF1dG9PayAmJiB0aGlzLnR5cGUgPT09ICd0aW1lJykge1xyXG4gICAgLy8gICB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQoZGF0ZSk7XHJcbiAgICAvLyAgIHRoaXMuX3VzZXJTZWxlY3Rpb24uZW1pdCgpO1xyXG4gICAgLy8gfVxyXG4gICAgdGhpcy5zZWxlY3RlZCA9IGRhdGU7XHJcbiAgfVxyXG5cclxuICAvKiogSGFuZGxlcyBkYXRlIHNlbGVjdGlvbiBpbiB0aGUgbW9udGggdmlldy4gKi9cclxuICBfZGF0ZVNlbGVjdGVkKGRhdGU6IEQpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VsZWN0ZWQgPSBkYXRlO1xyXG4gICAgaWYgKHRoaXMuX2hhc1RpbWUpIHtcclxuICAgICAgdGhpcy5jaGFuZ2VWaWV3KCdjbG9jaycpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIEhhbmRsZXMgbW9udGggc2VsZWN0aW9uIGluIHRoZSB5ZWFyIHZpZXcuICovXHJcbiAgX21vbnRoU2VsZWN0ZWQobW9udGg6IEQpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VsZWN0ZWQgPSBtb250aDtcclxuICAgIHRoaXMuY2hhbmdlVmlldygnbW9udGgnKTtcclxuICB9XHJcblxyXG4gIF95ZWFyU2VsZWN0ZWQoeWVhcjogRCk6IHZvaWQge1xyXG4gICAgdGhpcy5zZWxlY3RlZCA9IHllYXI7XHJcbiAgICB0aGlzLmNoYW5nZVZpZXcoJ3llYXInKTtcclxuICB9XHJcblxyXG4gIC8qKiBIYW5kbGVzIHVzZXIgY2xpY2tzIG9uIHRoZSBwZXJpb2QgbGFiZWwuICovXHJcbiAgX2N1cnJlbnRQZXJpb2RDbGlja2VkKCk6IHZvaWQge1xyXG4gICAgdGhpcy5jaGFuZ2VWaWV3KHRoaXMudmlldyA9PT0gJ21vbnRoJyA/ICd5ZWFyJyA6ICd5ZWFycycpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEhhbmRsZXMgdXNlciBjbGlja3Mgb24gdGhlIHByZXZpb3VzIGJ1dHRvbi4gKi9cclxuICBfcHJldmlvdXNDbGlja2VkKCk6IHZvaWQge1xyXG4gICAgdGhpcy5fbmF2Q2FsZW5kYXIoLTEpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEhhbmRsZXMgdXNlciBjbGlja3Mgb24gdGhlIG5leHQgYnV0dG9uLiAqL1xyXG4gIF9uZXh0Q2xpY2tlZCgpOiB2b2lkIHtcclxuICAgIHRoaXMuX25hdkNhbGVuZGFyKDEpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEhhbmRsZXMgdXNlciBjbGlja3Mgb24gdGhlIHRpbWUgbGFiZWxzLiAqL1xyXG4gIF9zaG93SG91clZpZXcoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5faGFzVGltZSkge1xyXG4gICAgICB0aGlzLl9ob3VyVmlldyA9IHRydWU7XHJcbiAgICAgIHRoaXMuY2hhbmdlVmlldygnY2xvY2snKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIF9zaG93TWludXRlVmlldygpOiB2b2lkIHtcclxuICAgIHRoaXMuX2hvdXJWaWV3ID0gZmFsc2U7XHJcbiAgICB0aGlzLmNoYW5nZVZpZXcoJ2Nsb2NrJyk7XHJcbiAgfVxyXG5cclxuICBfdG9nZ2xlQW1QbShhbSk6IHZvaWQge1xyXG4gICAgdGhpcy5faXNBbSA9ICF0aGlzLl9pc0FtO1xyXG4gICAgY29uc3QgZGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmFkZENhbGVuZGFySG91cnModGhpcy5hY3RpdmVEYXRlLCB0aGlzLl9pc0FtID8gLTEyIDogMTIpO1xyXG4gICAgaWYgKHRoaXMuX2RhdGVGaWx0ZXJGb3JWaWV3cyhkYXRlLCAnbWludXRlJykpIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZCA9IGRhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaWYgKHRoaXMuX2lzQW0gIT09IGFtKSB7XHJcbiAgICAvLyAgIGNvbnN0IGRhdGUgPSB0aGlzLl9kYXRlQWRhcHRlci5hZGRDYWxlbmRhckhvdXJzKHRoaXMuYWN0aXZlRGF0ZSwgdGhpcy5faXNBbSA/IDEyIDogLTEyKTtcclxuICAgIC8vICAgaWYgKHRoaXMuX2RhdGVGaWx0ZXJGb3JWaWV3cyhkYXRlLCAnbWludXRlJykpIHtcclxuICAgIC8vICAgICB0aGlzLnNlbGVjdGVkID0gZGF0ZTtcclxuICAgIC8vICAgfVxyXG4gICAgLy8gfVxyXG4gIH1cclxuXHJcbiAgLyoqIFdoZXRoZXIgdGhlIHByZXZpb3VzIHBlcmlvZCBidXR0b24gaXMgZW5hYmxlZC4gKi9cclxuICBfcHJldmlvdXNFbmFibGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKCF0aGlzLm1pbkRhdGUpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gIXRoaXMubWluRGF0ZSB8fCAhdGhpcy5faXNTYW1lVmlldyh0aGlzLmFjdGl2ZURhdGUsIHRoaXMubWluRGF0ZSk7XHJcbiAgfVxyXG5cclxuICAvKiogV2hldGhlciB0aGUgbmV4dCBwZXJpb2QgYnV0dG9uIGlzIGVuYWJsZWQuICovXHJcbiAgX25leHRFbmFibGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuICF0aGlzLm1heERhdGUgfHwgIXRoaXMuX2lzU2FtZVZpZXcodGhpcy5hY3RpdmVEYXRlLCB0aGlzLm1heERhdGUpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEhhbmRsZXMgY2FsZW5kYXIgZGlmZnMuICovXHJcbiAgX25hdkNhbGVuZGFyKGRpZmYpOiB2b2lkIHtcclxuICAgIHN3aXRjaCAodGhpcy52aWV3KSB7XHJcbiAgICAgIGNhc2UgJ3llYXInOlxyXG4gICAgICAgIHRoaXMuYWN0aXZlRGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnModGhpcy5hY3RpdmVEYXRlLCBkaWZmKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnbW9udGgnOlxyXG4gICAgICAgIHRoaXMuYWN0aXZlRGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmFkZENhbGVuZGFyTW9udGhzKHRoaXMuYWN0aXZlRGF0ZSwgZGlmZik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2Nsb2NrJzpcclxuICAgICAgICB0aGlzLmFjdGl2ZURhdGUgPSB0aGlzLl9ob3VyVmlld1xyXG4gICAgICAgICAgPyB0aGlzLl9kYXRlQWRhcHRlci5hZGRDYWxlbmRhckhvdXJzKHRoaXMuYWN0aXZlRGF0ZSwgZGlmZilcclxuICAgICAgICAgIDogdGhpcy5fZGF0ZUFkYXB0ZXIuYWRkQ2FsZW5kYXJNaW51dGVzKHRoaXMuYWN0aXZlRGF0ZSwgZGlmZik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogV2hldGhlciB0aGUgdHdvIGRhdGVzIHJlcHJlc2VudCB0aGUgc2FtZSB2aWV3IGluIHRoZSBjdXJyZW50IHZpZXcgbW9kZSAobW9udGggb3IgeWVhcikuICovXHJcbiAgcHJpdmF0ZSBfaXNTYW1lVmlldyhkYXRlMTogRCwgZGF0ZTI6IEQpOiBib29sZWFuIHtcclxuICAgIHN3aXRjaCAodGhpcy52aWV3KSB7XHJcbiAgICAgIGNhc2UgJ3llYXInOlxyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRlQWRhcHRlci5nZXRZZWFyKGRhdGUxKSA9PT0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0WWVhcihkYXRlMik7XHJcbiAgICAgIGNhc2UgJ21vbnRoJzpcclxuICAgICAgICBjb25zdCBtb250aFllYXIgPSB0aGlzLl9kYXRlRm9ybWF0cy5kaXNwbGF5Lm1vbnRoWWVhckxhYmVsO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRlQWRhcHRlci5mb3JtYXQoZGF0ZTEsIG1vbnRoWWVhcikgPT09IHRoaXMuX2RhdGVBZGFwdGVyLmZvcm1hdChkYXRlMiwgbW9udGhZZWFyKTtcclxuICAgICAgY2FzZSAnY2xvY2snOlxyXG4gICAgICAgIGNvbnN0IGhvdXJNaW51dGUgPSB0aGlzLl9kYXRlRm9ybWF0cy5kaXNwbGF5LnRpbWVMYWJlbDtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0ZUFkYXB0ZXIuZm9ybWF0KGRhdGUxLCBob3VyTWludXRlKSA9PT0gdGhpcy5fZGF0ZUFkYXB0ZXIuZm9ybWF0KGRhdGUyLCBob3VyTWludXRlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBvYmogVGhlIG9iamVjdCB0byBjaGVjay5cclxuICAgKiBAcmV0dXJucyBUaGUgZ2l2ZW4gb2JqZWN0IGlmIGl0IGlzIGJvdGggYSBkYXRlIGluc3RhbmNlIGFuZCB2YWxpZCwgb3RoZXJ3aXNlIG51bGwuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZ2V0VmFsaWREYXRlT3JOdWxsKG9iajogYW55KTogRCB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RhdGVBZGFwdGVyLmlzRGF0ZUluc3RhbmNlKG9iaikgJiYgdGhpcy5fZGF0ZUFkYXB0ZXIuaXNWYWxpZChvYmopID8gb2JqIDogbnVsbDtcclxuICB9XHJcblxyXG4gIC8qKiBSZXR1cm5zIHRoZSBjb21wb25lbnQgaW5zdGFuY2UgdGhhdCBjb3JyZXNwb25kcyB0byB0aGUgY3VycmVudCBjYWxlbmRhciB2aWV3LiAqL1xyXG4gIHByaXZhdGUgX2dldEN1cnJlbnRWaWV3Q29tcG9uZW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2xvY2tWaWV3IHx8IHRoaXMubW9udGhWaWV3IHx8IHRoaXMueWVhclZpZXcgfHwgdGhpcy55ZWFyc1ZpZXc7XHJcbiAgfVxyXG59XHJcbiJdfQ==