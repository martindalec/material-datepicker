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
export class MatCalendar {
    /**
     * @param {?} _intl
     * @param {?} _dateAdapter
     * @param {?} _dateFormats
     * @param {?} changeDetectorRef
     */
    constructor(_intl, _dateAdapter, _dateFormats, changeDetectorRef) {
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
        (date, unit = 'minute') => {
            return (!!date &&
                (!this.dateFilter || this.dateFilter(date)) &&
                (!this.minDate || this._dateAdapter.compareDate(date, this.minDate, unit) >= 0) &&
                (!this.maxDate || this._dateAdapter.compareDate(date, this.maxDate, unit) <= 0));
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
        () => {
            changeDetectorRef.markForCheck();
            this.stateChanges.next();
        }));
    }
    /**
     * A date representing the period (month or year) to start the calendar in.
     * @return {?}
     */
    get startAt() {
        return this._startAt;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set startAt(value) {
        this._startAt = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
    }
    /**
     * The currently selected date.
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
        this.activeDate = this._selected;
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
     * The current active date. This determines which time period is shown and which date is
     * highlighted when using keyboard navigation.
     * @return {?}
     */
    get activeDate() {
        return this._clampedActiveDate;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set activeDate(value) {
        /** @type {?} */
        const oldActiveDate = this._clampedActiveDate;
        this._clampedActiveDate = this._dateAdapter.clampDate(value, this.minDate, this.maxDate);
        this._isAm = this._dateAdapter.getHours(this._clampedActiveDate) < 12;
        /** @type {?} */
        const unit = this.view === 'year' ? 'year' : 'month';
        /** @type {?} */
        const diff = this._dateAdapter.compareDate(oldActiveDate, this._clampedActiveDate, unit);
        if (diff) {
            this._animationDir = diff > 0 ? 'left' : 'right';
        }
        // update the labels
        /** @type {?} */
        const day = this._dateAdapter.getDayOfWeek(this.activeDate);
        /** @type {?} */
        let hours = this._dateAdapter.getHours(this.activeDate);
        if (this.twelveHour) {
            hours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
        }
        /** @type {?} */
        const minutes = this._dateAdapter.getMinutes(this.activeDate);
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
    }
    /**
     * Whether the calendar is in month view.
     * @return {?}
     */
    get currentView() {
        return this._currentView;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set currentView(value) {
        this._currentView = value;
        this._moveFocusOnNextTick = true;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.activeDate = this.startAt || this._dateAdapter.today();
        this.changeView(this.startView, false);
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        if (this._moveFocusOnNextTick) {
            this._moveFocusOnNextTick = false;
            this.focusActiveCell();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._intlChanges.unsubscribe();
        this.stateChanges.complete();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this._hasTime = this.type.indexOf('time') >= 0;
        /** @type {?} */
        const change = changes.selected || changes.minDate || changes.maxDate || changes.dateFilter;
        if (change && !change.firstChange) {
            /** @type {?} */
            const view = this._getCurrentViewComponent();
            if (view) {
                view._init();
            }
        }
        this.stateChanges.next();
    }
    /**
     * @param {?} view
     * @param {?=} focus
     * @return {?}
     */
    changeView(view, focus = true) {
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
    }
    /**
     * @return {?}
     */
    focusActiveCell() {
        this._getCurrentViewComponent()._focusActiveCell();
    }
    /**
     * @return {?}
     */
    _submitClicked() {
        this.selectedChange.emit(this.activeDate);
        this._userSelection.emit();
    }
    /**
     * @return {?}
     */
    _cancelClicked() {
        this._userSelection.emit();
    }
    /**
     * Handles date selection in the clock view.
     * @param {?} date
     * @return {?}
     */
    _timeChanged(date) {
        this.selected = date;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    _timeSelected(date) {
        // if (this.autoOk && this.type === 'time') {
        //   this.selectedChange.emit(date);
        //   this._userSelection.emit();
        // }
        this.selected = date;
    }
    /**
     * Handles date selection in the month view.
     * @param {?} date
     * @return {?}
     */
    _dateSelected(date) {
        this.selected = date;
        if (this._hasTime) {
            this.changeView('clock');
        }
    }
    /**
     * Handles month selection in the year view.
     * @param {?} month
     * @return {?}
     */
    _monthSelected(month) {
        this.selected = month;
        this.changeView('month');
    }
    /**
     * @param {?} year
     * @return {?}
     */
    _yearSelected(year) {
        this.selected = year;
        this.changeView('year');
    }
    /**
     * Handles user clicks on the period label.
     * @return {?}
     */
    _currentPeriodClicked() {
        this.changeView(this.view === 'month' ? 'year' : 'years');
    }
    /**
     * Handles user clicks on the previous button.
     * @return {?}
     */
    _previousClicked() {
        this._navCalendar(-1);
    }
    /**
     * Handles user clicks on the next button.
     * @return {?}
     */
    _nextClicked() {
        this._navCalendar(1);
    }
    /**
     * Handles user clicks on the time labels.
     * @return {?}
     */
    _showHourView() {
        if (this._hasTime) {
            this._hourView = true;
            this.changeView('clock');
        }
    }
    /**
     * @return {?}
     */
    _showMinuteView() {
        this._hourView = false;
        this.changeView('clock');
    }
    /**
     * @param {?} am
     * @return {?}
     */
    _toggleAmPm(am) {
        this._isAm = !this._isAm;
        /** @type {?} */
        const date = this._dateAdapter.addCalendarHours(this.activeDate, this._isAm ? -12 : 12);
        if (this._dateFilterForViews(date, 'minute')) {
            this.selected = date;
        }
        // if (this._isAm !== am) {
        //   const date = this._dateAdapter.addCalendarHours(this.activeDate, this._isAm ? 12 : -12);
        //   if (this._dateFilterForViews(date, 'minute')) {
        //     this.selected = date;
        //   }
        // }
    }
    /**
     * Whether the previous period button is enabled.
     * @return {?}
     */
    _previousEnabled() {
        if (!this.minDate) {
            return true;
        }
        return !this.minDate || !this._isSameView(this.activeDate, this.minDate);
    }
    /**
     * Whether the next period button is enabled.
     * @return {?}
     */
    _nextEnabled() {
        return !this.maxDate || !this._isSameView(this.activeDate, this.maxDate);
    }
    /**
     * Handles calendar diffs.
     * @param {?} diff
     * @return {?}
     */
    _navCalendar(diff) {
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
    }
    /**
     * Whether the two dates represent the same view in the current view mode (month or year).
     * @private
     * @param {?} date1
     * @param {?} date2
     * @return {?}
     */
    _isSameView(date1, date2) {
        switch (this.view) {
            case 'year':
                return this._dateAdapter.getYear(date1) === this._dateAdapter.getYear(date2);
            case 'month':
                /** @type {?} */
                const monthYear = this._dateFormats.display.monthYearLabel;
                return this._dateAdapter.format(date1, monthYear) === this._dateAdapter.format(date2, monthYear);
            case 'clock':
                /** @type {?} */
                const hourMinute = this._dateFormats.display.timeLabel;
                return this._dateAdapter.format(date1, hourMinute) === this._dateAdapter.format(date2, hourMinute);
        }
    }
    /**
     * @private
     * @param {?} obj The object to check.
     * @return {?} The given object if it is both a date instance and valid, otherwise null.
     */
    _getValidDateOrNull(obj) {
        return this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj) ? obj : null;
    }
    /**
     * Returns the component instance that corresponds to the current calendar view.
     * @private
     * @return {?}
     */
    _getCurrentViewComponent() {
        return this.clockView || this.monthView || this.yearView || this.yearsView;
    }
}
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
MatCalendar.ctorParameters = () => [
    { type: MatDatepickerIntl },
    { type: DateAdapter, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_DATE_FORMATS,] }] },
    { type: ChangeDetectorRef }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWFydGluZGFsZWMvZGF0ZXBpY2tlci8iLCJzb3VyY2VzIjpbImNhbGVuZGFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFHTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFHTCxRQUFRLEVBQ1IsTUFBTSxFQUVOLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUM1QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQWtCLE1BQU0sY0FBYyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzVDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDMUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGNBQWMsQ0FBQzs7Ozs7O0FBOEI1QyxNQUFNLE9BQU8sV0FBVzs7Ozs7OztJQXdNdEIsWUFDUyxLQUF3QixFQUNYLFlBQTRCLEVBR3hDLFlBQTRCLEVBQ3BDLGlCQUFvQztRQUw3QixVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQUNYLGlCQUFZLEdBQVosWUFBWSxDQUFnQjtRQUd4QyxpQkFBWSxHQUFaLFlBQVksQ0FBZ0I7Ozs7OztRQXJNOUIseUJBQW9C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dkIsMENBQTRCOztJQUU1QixzQ0FBd0I7O0lBRXhCLHdDQUEwQjs7Ozs7SUFHMUIsd0NBQTBCOztJQUUxQix5Q0FBMkI7Ozs7O0lBRzNCLHVDQUF5Qjs7Ozs7SUFHekIsdUNBQXlCOztJQUd2Qiw0QkFBK0I7Ozs7O0lBQy9CLG1DQUFnRDs7Ozs7SUFDaEQsbUNBRW9DIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXHJcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcclxuICovXHJcblxyXG5pbXBvcnQge1xyXG4gIEFmdGVyQ29udGVudEluaXQsXHJcbiAgQWZ0ZXJWaWV3Q2hlY2tlZCxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBDb21wb25lbnQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIEluamVjdCxcclxuICBJbnB1dCxcclxuICBPbkNoYW5nZXMsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9wdGlvbmFsLFxyXG4gIE91dHB1dCxcclxuICBTaW1wbGVDaGFuZ2VzLFxyXG4gIFZpZXdDaGlsZCxcclxuICBWaWV3RW5jYXBzdWxhdGlvblxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgTWF0Q2xvY2tWaWV3IH0gZnJvbSAnLi9jbG9jay12aWV3JztcclxuaW1wb3J0IHsgTUFUX0RBVEVfRk9STUFUUywgTWF0RGF0ZUZvcm1hdHMgfSBmcm9tICcuL2NvcmUvaW5kZXgnO1xyXG5pbXBvcnQgeyBEYXRlQWRhcHRlciB9IGZyb20gJy4vY29yZS9pbmRleCc7XHJcbmltcG9ydCB7IGNvbnRyb2xBY3RpdmUsIHNsaWRlQ2FsZW5kYXIgfSBmcm9tICcuL2RhdGVwaWNrZXItYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7IGNyZWF0ZU1pc3NpbmdEYXRlSW1wbEVycm9yIH0gZnJvbSAnLi9kYXRlcGlja2VyLWVycm9ycyc7XHJcbmltcG9ydCB7IE1hdERhdGVwaWNrZXJJbnRsIH0gZnJvbSAnLi9kYXRlcGlja2VyLWludGwnO1xyXG5pbXBvcnQgeyBNYXRNb250aFZpZXcgfSBmcm9tICcuL21vbnRoLXZpZXcnO1xyXG5pbXBvcnQgeyBNYXRZZWFyVmlldyB9IGZyb20gJy4veWVhci12aWV3JztcclxuaW1wb3J0IHsgTWF0WWVhcnNWaWV3IH0gZnJvbSAnLi95ZWFycy12aWV3JztcclxuXHJcbi8qKlxyXG4gKiBQb3NzaWJsZSB2aWV3cyBmb3IgdGhlIGNhbGVuZGFyLlxyXG4gKiBAZG9jcy1wcml2YXRlXHJcbiAqL1xyXG5leHBvcnQgdHlwZSBNYXRDYWxlbmRhclZpZXcgPSAnY2xvY2snIHwgJ21vbnRoJyB8ICd5ZWFyJyB8ICd5ZWFycyc7XHJcblxyXG4vKipcclxuICogUG9zc2libGUgcmV0dXJuIHR5cGVzLlxyXG4gKiBAZG9jcy1wcml2YXRlXHJcbiAqL1xyXG5leHBvcnQgdHlwZSBNYXRDYWxlbmRhclR5cGUgPSAnZGF0ZScgfCAnZGF0ZXRpbWUnIHwgJ3RpbWUnO1xyXG5cclxuLyoqXHJcbiAqIEEgY2FsZW5kYXIgdGhhdCBpcyB1c2VkIGFzIHBhcnQgb2YgdGhlIGRhdGVwaWNrZXIuXHJcbiAqIEBkb2NzLXByaXZhdGVcclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbWF0LWNhbGVuZGFyJyxcclxuICB0ZW1wbGF0ZVVybDogJ2NhbGVuZGFyLmh0bWwnLFxyXG4gIC8vIHN0eWxlVXJsczogWydjYWxlbmRhci5jc3MnXSxcclxuICBob3N0OiB7XHJcbiAgICBjbGFzczogJ21hdC1jYWxlbmRhcidcclxuICB9LFxyXG4gIGFuaW1hdGlvbnM6IFtjb250cm9sQWN0aXZlLCBzbGlkZUNhbGVuZGFyXSxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXRDYWxlbmRhcjxEPiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0NoZWNrZWQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcclxuICBwcml2YXRlIF9pbnRsQ2hhbmdlczogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvKipcclxuICAgKiBVc2VkIGZvciBzY2hlZHVsaW5nIHRoYXQgZm9jdXMgc2hvdWxkIGJlIG1vdmVkIHRvIHRoZSBhY3RpdmUgY2VsbCBvbiB0aGUgbmV4dCB0aWNrLlxyXG4gICAqIFdlIG5lZWQgdG8gc2NoZWR1bGUgaXQsIHJhdGhlciB0aGFuIGRvIGl0IGltbWVkaWF0ZWx5LCBiZWNhdXNlIHdlIGhhdmUgdG8gd2FpdFxyXG4gICAqIGZvciBBbmd1bGFyIHRvIHJlLWV2YWx1YXRlIHRoZSB2aWV3IGNoaWxkcmVuLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX21vdmVGb2N1c09uTmV4dFRpY2sgPSBmYWxzZTtcclxuXHJcbiAgLyoqIEEgZGF0ZSByZXByZXNlbnRpbmcgdGhlIHBlcmlvZCAobW9udGggb3IgeWVhcikgdG8gc3RhcnQgdGhlIGNhbGVuZGFyIGluLiAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHN0YXJ0QXQoKTogRCB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMuX3N0YXJ0QXQ7XHJcbiAgfVxyXG4gIHNldCBzdGFydEF0KHZhbHVlOiBEIHwgbnVsbCkge1xyXG4gICAgdGhpcy5fc3RhcnRBdCA9IHRoaXMuX2dldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLl9kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpO1xyXG4gIH1cclxuICBwcml2YXRlIF9zdGFydEF0OiBEIHwgbnVsbDtcclxuXHJcbiAgLyoqIFRoZSB0eXBlIG9mIHZhbHVlIGhhbmRsZWQgYnkgdGhlIGNhbGVuZGFyLiAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgdHlwZTogTWF0Q2FsZW5kYXJUeXBlID0gJ2RhdGUnO1xyXG5cclxuICAvKiogV2hpY2ggdmlldyB0aGUgY2FsZW5kYXIgc2hvdWxkIGJlIHN0YXJ0ZWQgaW4uICovXHJcbiAgQElucHV0KClcclxuICBzdGFydFZpZXc6IE1hdENhbGVuZGFyVmlldyA9ICdtb250aCc7XHJcblxyXG4gIC8qKiBDdXJyZW50IGNhbGVuZGFyIHZpZXcgKi9cclxuICB2aWV3OiBNYXRDYWxlbmRhclZpZXc7XHJcblxyXG4gIC8qKiBUaGUgY3VycmVudGx5IHNlbGVjdGVkIGRhdGUuICovXHJcbiAgQElucHV0KClcclxuICBnZXQgc2VsZWN0ZWQoKTogRCB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xyXG4gIH1cclxuICBzZXQgc2VsZWN0ZWQodmFsdWU6IEQgfCBudWxsKSB7XHJcbiAgICB0aGlzLl9zZWxlY3RlZCA9IHRoaXMuX2dldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLl9kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpO1xyXG4gICAgdGhpcy5hY3RpdmVEYXRlID0gdGhpcy5fc2VsZWN0ZWQ7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3NlbGVjdGVkOiBEIHwgbnVsbDtcclxuXHJcbiAgLyoqIFRoZSBtaW5pbXVtIHNlbGVjdGFibGUgZGF0ZS4gKi9cclxuICBASW5wdXQoKVxyXG4gIGdldCBtaW5EYXRlKCk6IEQgfCBudWxsIHtcclxuICAgIHJldHVybiB0aGlzLl9taW5EYXRlO1xyXG4gIH1cclxuICBzZXQgbWluRGF0ZSh2YWx1ZTogRCB8IG51bGwpIHtcclxuICAgIHRoaXMuX21pbkRhdGUgPSB0aGlzLl9nZXRWYWxpZERhdGVPck51bGwodGhpcy5fZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfbWluRGF0ZTogRCB8IG51bGw7XHJcblxyXG4gIC8qKiBUaGUgbWF4aW11bSBzZWxlY3RhYmxlIGRhdGUuICovXHJcbiAgQElucHV0KClcclxuICBnZXQgbWF4RGF0ZSgpOiBEIHwgbnVsbCB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWF4RGF0ZTtcclxuICB9XHJcbiAgc2V0IG1heERhdGUodmFsdWU6IEQgfCBudWxsKSB7XHJcbiAgICB0aGlzLl9tYXhEYXRlID0gdGhpcy5fZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuX2RhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX21heERhdGU6IEQgfCBudWxsO1xyXG5cclxuICAvKiogQSBmdW5jdGlvbiB1c2VkIHRvIGZpbHRlciB3aGljaCBkYXRlcyBhcmUgc2VsZWN0YWJsZS4gKi9cclxuICBASW5wdXQoKVxyXG4gIGRhdGVGaWx0ZXI6IChkYXRlOiBELCB1bml0Pzogc3RyaW5nKSA9PiBib29sZWFuO1xyXG5cclxuICAvKiogQ2xvY2sgaW50ZXJ2YWwgKi9cclxuICBASW5wdXQoKVxyXG4gIGNsb2NrU3RlcCA9IDE7XHJcblxyXG4gIC8qKiBDbG9jayBob3VyIGZvcm1hdCAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgdHdlbHZlSG91ciA9IGZhbHNlO1xyXG5cclxuICAvKiogRW1pdHMgd2hlbiB0aGUgY3VycmVudGx5IHNlbGVjdGVkIGRhdGUgY2hhbmdlcy4gKi9cclxuICBAT3V0cHV0KClcclxuICBzZWxlY3RlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8RD4oKTtcclxuXHJcbiAgLyoqIEVtaXRzIHdoZW4gYW55IGRhdGUgaXMgc2VsZWN0ZWQuICovXHJcbiAgQE91dHB1dCgpXHJcbiAgX3VzZXJTZWxlY3Rpb24gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XHJcblxyXG4gIC8qKiBSZWZlcmVuY2UgdG8gdGhlIGN1cnJlbnQgY2xvY2sgdmlldyBjb21wb25lbnQuICovXHJcbiAgQFZpZXdDaGlsZChNYXRDbG9ja1ZpZXcpXHJcbiAgY2xvY2tWaWV3OiBNYXRDbG9ja1ZpZXc8RD47XHJcblxyXG4gIC8qKiBSZWZlcmVuY2UgdG8gdGhlIGN1cnJlbnQgbW9udGggdmlldyBjb21wb25lbnQuICovXHJcbiAgQFZpZXdDaGlsZChNYXRNb250aFZpZXcpXHJcbiAgbW9udGhWaWV3OiBNYXRNb250aFZpZXc8RD47XHJcblxyXG4gIC8qKiBSZWZlcmVuY2UgdG8gdGhlIGN1cnJlbnQgeWVhciB2aWV3IGNvbXBvbmVudC4gKi9cclxuICBAVmlld0NoaWxkKE1hdFllYXJWaWV3KVxyXG4gIHllYXJWaWV3OiBNYXRZZWFyVmlldzxEPjtcclxuXHJcbiAgLyoqIFJlZmVyZW5jZSB0byB0aGUgY3VycmVudCB5ZWFycyB2aWV3IGNvbXBvbmVudC4gKi9cclxuICBAVmlld0NoaWxkKE1hdFllYXJzVmlldylcclxuICB5ZWFyc1ZpZXc6IE1hdFllYXJzVmlldzxEPjtcclxuXHJcbiAgLyoqIERhdGUgZmlsdGVyIGZvciB0aGUgbW9udGggYW5kIHllYXIgdmlld3MuICovXHJcbiAgX2RhdGVGaWx0ZXJGb3JWaWV3cyA9IChkYXRlOiBELCB1bml0ID0gJ21pbnV0ZScpID0+IHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICEhZGF0ZSAmJlxyXG4gICAgICAoIXRoaXMuZGF0ZUZpbHRlciB8fCB0aGlzLmRhdGVGaWx0ZXIoZGF0ZSkpICYmXHJcbiAgICAgICghdGhpcy5taW5EYXRlIHx8IHRoaXMuX2RhdGVBZGFwdGVyLmNvbXBhcmVEYXRlKGRhdGUsIHRoaXMubWluRGF0ZSwgdW5pdCkgPj0gMCkgJiZcclxuICAgICAgKCF0aGlzLm1heERhdGUgfHwgdGhpcy5fZGF0ZUFkYXB0ZXIuY29tcGFyZURhdGUoZGF0ZSwgdGhpcy5tYXhEYXRlLCB1bml0KSA8PSAwKVxyXG4gICAgKTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgY3VycmVudCBhY3RpdmUgZGF0ZS4gVGhpcyBkZXRlcm1pbmVzIHdoaWNoIHRpbWUgcGVyaW9kIGlzIHNob3duIGFuZCB3aGljaCBkYXRlIGlzXHJcbiAgICogaGlnaGxpZ2h0ZWQgd2hlbiB1c2luZyBrZXlib2FyZCBuYXZpZ2F0aW9uLlxyXG4gICAqL1xyXG4gIGdldCBhY3RpdmVEYXRlKCk6IEQge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NsYW1wZWRBY3RpdmVEYXRlO1xyXG4gIH1cclxuICBzZXQgYWN0aXZlRGF0ZSh2YWx1ZTogRCkge1xyXG4gICAgY29uc3Qgb2xkQWN0aXZlRGF0ZSA9IHRoaXMuX2NsYW1wZWRBY3RpdmVEYXRlO1xyXG4gICAgdGhpcy5fY2xhbXBlZEFjdGl2ZURhdGUgPSB0aGlzLl9kYXRlQWRhcHRlci5jbGFtcERhdGUodmFsdWUsIHRoaXMubWluRGF0ZSwgdGhpcy5tYXhEYXRlKTtcclxuICAgIHRoaXMuX2lzQW0gPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRIb3Vycyh0aGlzLl9jbGFtcGVkQWN0aXZlRGF0ZSkgPCAxMjtcclxuXHJcbiAgICBjb25zdCB1bml0ID0gdGhpcy52aWV3ID09PSAneWVhcicgPyAneWVhcicgOiAnbW9udGgnO1xyXG4gICAgY29uc3QgZGlmZiA9IHRoaXMuX2RhdGVBZGFwdGVyLmNvbXBhcmVEYXRlKG9sZEFjdGl2ZURhdGUsIHRoaXMuX2NsYW1wZWRBY3RpdmVEYXRlLCB1bml0KTtcclxuICAgIGlmIChkaWZmKSB7XHJcbiAgICAgIHRoaXMuX2FuaW1hdGlvbkRpciA9IGRpZmYgPiAwID8gJ2xlZnQnIDogJ3JpZ2h0JztcclxuICAgIH1cclxuXHJcbiAgICAvLyB1cGRhdGUgdGhlIGxhYmVsc1xyXG4gICAgY29uc3QgZGF5ID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0RGF5T2ZXZWVrKHRoaXMuYWN0aXZlRGF0ZSk7XHJcbiAgICBsZXQgaG91cnMgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRIb3Vycyh0aGlzLmFjdGl2ZURhdGUpO1xyXG4gICAgaWYgKHRoaXMudHdlbHZlSG91cikge1xyXG4gICAgICBob3VycyA9IGhvdXJzID09PSAwID8gMTIgOiBob3VycyA+IDEyID8gaG91cnMgLSAxMiA6IGhvdXJzO1xyXG4gICAgfVxyXG4gICAgY29uc3QgbWludXRlcyA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldE1pbnV0ZXModGhpcy5hY3RpdmVEYXRlKTtcclxuXHJcbiAgICBzd2l0Y2ggKHRoaXMudmlldykge1xyXG4gICAgICBjYXNlICd5ZWFyJzpcclxuICAgICAgICB0aGlzLl9wZXJpb2RCdXR0b25UZXh0ID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0WWVhck5hbWUodGhpcy5hY3RpdmVEYXRlKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICB0aGlzLl9wZXJpb2RCdXR0b25UZXh0ID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZm9ybWF0KHRoaXMuYWN0aXZlRGF0ZSwgdGhpcy5fZGF0ZUZvcm1hdHMuZGlzcGxheS5tb250aFllYXJMYWJlbCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl95ZWFyQnV0dG9uVGV4dCA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldFllYXIodGhpcy5hY3RpdmVEYXRlKS50b1N0cmluZygpO1xyXG4gICAgdGhpcy5fbW9udGhkYXlCdXR0b25UZXh0ID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZm9ybWF0KHRoaXMuYWN0aXZlRGF0ZSwgdGhpcy5fZGF0ZUZvcm1hdHMuZGlzcGxheS5tb250aERheUxhYmVsKTtcclxuICAgIHRoaXMuX2RheUJ1dHRvblRleHQgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXREYXlPZldlZWtOYW1lcygnbG9uZycpW2RheV07XHJcbiAgICB0aGlzLl9ob3VyQnV0dG9uVGV4dCA9IGhvdXJzLnRvU3RyaW5nKCk7XHJcbiAgICB0aGlzLl9taW51dGVCdXR0b25UZXh0ID0gKCcwMCcgKyBtaW51dGVzKS5zbGljZSgtMik7XHJcblxyXG4gICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xyXG4gIH1cclxuICBwcml2YXRlIF9jbGFtcGVkQWN0aXZlRGF0ZTogRDtcclxuXHJcbiAgLyoqIFdoZXRoZXIgdGhlIGNhbGVuZGFyIGlzIGluIG1vbnRoIHZpZXcuICovXHJcbiAgZ2V0IGN1cnJlbnRWaWV3KCk6IE1hdENhbGVuZGFyVmlldyB7XHJcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFZpZXc7XHJcbiAgfVxyXG4gIHNldCBjdXJyZW50Vmlldyh2YWx1ZTogTWF0Q2FsZW5kYXJWaWV3KSB7XHJcbiAgICB0aGlzLl9jdXJyZW50VmlldyA9IHZhbHVlO1xyXG4gICAgdGhpcy5fbW92ZUZvY3VzT25OZXh0VGljayA9IHRydWU7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2N1cnJlbnRWaWV3OiBNYXRDYWxlbmRhclZpZXc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEVtaXRzIHdoZW5ldmVyIHRoZXJlIGlzIGEgc3RhdGUgY2hhbmdlIHRoYXQgdGhlIGhlYWRlciBtYXkgbmVlZCB0byByZXNwb25kIHRvLlxyXG4gICAqL1xyXG4gIHN0YXRlQ2hhbmdlcyA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcblxyXG4gIC8qKiBBbmltYXRpb25zIGhhbmRsZXIgKi9cclxuICBfYW5pbWF0aW9uRGlyOiBzdHJpbmc7XHJcblxyXG4gIC8qKiBXaGV0aGVyIHRoZSBhY3RpdmUgZGF0ZSBpcyBBTSBvciBub3QgKi9cclxuICBfaXNBbTogYm9vbGVhbjtcclxuXHJcbiAgLyoqIFdoZXRoZXIgdGhlIGNhbGVuZGFyIHByb2Nlc3MgdGhlIHRpbWUuICovXHJcbiAgX2hhc1RpbWU6IGJvb2xlYW47XHJcblxyXG4gIC8qKiBXaGV0aGVyIHRoZSBjYWxlbmRhciBpcyBpbiBob3VyIHZpZXcuICovXHJcbiAgX2hvdXJWaWV3OiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgLyoqIFRoZSBsYWJlbCBmb3IgdGhlIGNhbGVuZGFyIGhlYWRlciBidXR0b25zLiAqL1xyXG4gIF95ZWFyQnV0dG9uVGV4dDogc3RyaW5nO1xyXG5cclxuICBfZGF5QnV0dG9uVGV4dDogc3RyaW5nO1xyXG5cclxuICBfbW9udGhkYXlCdXR0b25UZXh0OiBzdHJpbmc7XHJcblxyXG4gIF9ob3VyQnV0dG9uVGV4dDogc3RyaW5nO1xyXG5cclxuICBfbWludXRlQnV0dG9uVGV4dDogc3RyaW5nO1xyXG5cclxuICAvKiogVGhlIGxhYmVsIGZvciB0aGUgY3VycmVudCBjYWxlbmRhciB2aWV3LiAqL1xyXG4gIF9wZXJpb2RCdXR0b25UZXh0OiBzdHJpbmc7XHJcblxyXG4gIF9wZXJpb2RCdXR0b25MYWJlbDogc3RyaW5nO1xyXG5cclxuICAvKiogVGhlIGxhYmVsIGZvciB0aGUgdGhlIHByZXZpb3VzIGJ1dHRvbi4gKi9cclxuICBfcHJldkJ1dHRvbkxhYmVsOiBzdHJpbmc7XHJcblxyXG4gIC8qKiBUaGUgbGFiZWwgZm9yIHRoZSB0aGUgbmV4dCBidXR0b24uICovXHJcbiAgX25leHRCdXR0b25MYWJlbDogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHB1YmxpYyBfaW50bDogTWF0RGF0ZXBpY2tlckludGwsXHJcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9kYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXI8RD4sXHJcbiAgICBAT3B0aW9uYWwoKVxyXG4gICAgQEluamVjdChNQVRfREFURV9GT1JNQVRTKVxyXG4gICAgcHJpdmF0ZSBfZGF0ZUZvcm1hdHM6IE1hdERhdGVGb3JtYXRzLFxyXG4gICAgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmXHJcbiAgKSB7XHJcbiAgICBpZiAoIXRoaXMuX2RhdGVBZGFwdGVyKSB7XHJcbiAgICAgIHRocm93IGNyZWF0ZU1pc3NpbmdEYXRlSW1wbEVycm9yKCdEYXRlQWRhcHRlcicpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5fZGF0ZUZvcm1hdHMpIHtcclxuICAgICAgdGhyb3cgY3JlYXRlTWlzc2luZ0RhdGVJbXBsRXJyb3IoJ01BVF9EQVRFX0ZPUk1BVFMnKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9pbnRsQ2hhbmdlcyA9IF9pbnRsLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgdGhpcy5hY3RpdmVEYXRlID0gdGhpcy5zdGFydEF0IHx8IHRoaXMuX2RhdGVBZGFwdGVyLnRvZGF5KCk7XHJcblxyXG4gICAgdGhpcy5jaGFuZ2VWaWV3KHRoaXMuc3RhcnRWaWV3LCBmYWxzZSk7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0NoZWNrZWQoKSB7XHJcbiAgICBpZiAodGhpcy5fbW92ZUZvY3VzT25OZXh0VGljaykge1xyXG4gICAgICB0aGlzLl9tb3ZlRm9jdXNPbk5leHRUaWNrID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuZm9jdXNBY3RpdmVDZWxsKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuX2ludGxDaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB0aGlzLnN0YXRlQ2hhbmdlcy5jb21wbGV0ZSgpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgdGhpcy5faGFzVGltZSA9IHRoaXMudHlwZS5pbmRleE9mKCd0aW1lJykgPj0gMDtcclxuICAgIGNvbnN0IGNoYW5nZSA9IGNoYW5nZXMuc2VsZWN0ZWQgfHwgY2hhbmdlcy5taW5EYXRlIHx8IGNoYW5nZXMubWF4RGF0ZSB8fCBjaGFuZ2VzLmRhdGVGaWx0ZXI7XHJcblxyXG4gICAgaWYgKGNoYW5nZSAmJiAhY2hhbmdlLmZpcnN0Q2hhbmdlKSB7XHJcbiAgICAgIGNvbnN0IHZpZXcgPSB0aGlzLl9nZXRDdXJyZW50Vmlld0NvbXBvbmVudCgpO1xyXG4gICAgICBpZiAodmlldykge1xyXG4gICAgICAgIHZpZXcuX2luaXQoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcclxuICB9XHJcblxyXG4gIGNoYW5nZVZpZXcodmlldywgZm9jdXMgPSB0cnVlKSB7XHJcbiAgICBzd2l0Y2ggKHZpZXcpIHtcclxuICAgICAgY2FzZSAneWVhcic6XHJcbiAgICAgICAgdGhpcy5fcGVyaW9kQnV0dG9uVGV4dCA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldFllYXJOYW1lKHRoaXMuYWN0aXZlRGF0ZSk7XHJcbiAgICAgICAgdGhpcy5fcGVyaW9kQnV0dG9uTGFiZWwgPSB0aGlzLl9pbnRsLnN3aXRjaFRvWWVhcnNWaWV3TGFiZWw7XHJcbiAgICAgICAgdGhpcy5fbmV4dEJ1dHRvbkxhYmVsID0gdGhpcy5faW50bC5uZXh0WWVhckxhYmVsO1xyXG4gICAgICAgIHRoaXMuX3ByZXZCdXR0b25MYWJlbCA9IHRoaXMuX2ludGwucHJldlllYXJMYWJlbDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnbW9udGgnOlxyXG4gICAgICAgIHRoaXMuX3BlcmlvZEJ1dHRvblRleHQgPSB0aGlzLl9kYXRlQWRhcHRlci5mb3JtYXQodGhpcy5hY3RpdmVEYXRlLCB0aGlzLl9kYXRlRm9ybWF0cy5kaXNwbGF5Lm1vbnRoWWVhckxhYmVsKTtcclxuICAgICAgICB0aGlzLl9wZXJpb2RCdXR0b25MYWJlbCA9IHRoaXMuX2ludGwuc3dpdGNoVG9ZZWFyVmlld0xhYmVsO1xyXG4gICAgICAgIHRoaXMuX25leHRCdXR0b25MYWJlbCA9IHRoaXMuX2ludGwubmV4dE1vbnRoTGFiZWw7XHJcbiAgICAgICAgdGhpcy5fcHJldkJ1dHRvbkxhYmVsID0gdGhpcy5faW50bC5wcmV2TW9udGhMYWJlbDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnZpZXcgPSB2aWV3O1xyXG4gICAgaWYgKGZvY3VzKSB7XHJcbiAgICAgIHRoaXMuX21vdmVGb2N1c09uTmV4dFRpY2sgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZm9jdXNBY3RpdmVDZWxsKCkge1xyXG4gICAgdGhpcy5fZ2V0Q3VycmVudFZpZXdDb21wb25lbnQoKS5fZm9jdXNBY3RpdmVDZWxsKCk7XHJcbiAgfVxyXG5cclxuICBfc3VibWl0Q2xpY2tlZCgpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdCh0aGlzLmFjdGl2ZURhdGUpO1xyXG4gICAgdGhpcy5fdXNlclNlbGVjdGlvbi5lbWl0KCk7XHJcbiAgfVxyXG5cclxuICBfY2FuY2VsQ2xpY2tlZCgpOiB2b2lkIHtcclxuICAgIHRoaXMuX3VzZXJTZWxlY3Rpb24uZW1pdCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEhhbmRsZXMgZGF0ZSBzZWxlY3Rpb24gaW4gdGhlIGNsb2NrIHZpZXcuICovXHJcbiAgX3RpbWVDaGFuZ2VkKGRhdGU6IEQpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VsZWN0ZWQgPSBkYXRlO1xyXG4gIH1cclxuXHJcbiAgX3RpbWVTZWxlY3RlZChkYXRlOiBEKTogdm9pZCB7XHJcbiAgICAvLyBpZiAodGhpcy5hdXRvT2sgJiYgdGhpcy50eXBlID09PSAndGltZScpIHtcclxuICAgIC8vICAgdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KGRhdGUpO1xyXG4gICAgLy8gICB0aGlzLl91c2VyU2VsZWN0aW9uLmVtaXQoKTtcclxuICAgIC8vIH1cclxuICAgIHRoaXMuc2VsZWN0ZWQgPSBkYXRlO1xyXG4gIH1cclxuXHJcbiAgLyoqIEhhbmRsZXMgZGF0ZSBzZWxlY3Rpb24gaW4gdGhlIG1vbnRoIHZpZXcuICovXHJcbiAgX2RhdGVTZWxlY3RlZChkYXRlOiBEKTogdm9pZCB7XHJcbiAgICB0aGlzLnNlbGVjdGVkID0gZGF0ZTtcclxuICAgIGlmICh0aGlzLl9oYXNUaW1lKSB7XHJcbiAgICAgIHRoaXMuY2hhbmdlVmlldygnY2xvY2snKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBIYW5kbGVzIG1vbnRoIHNlbGVjdGlvbiBpbiB0aGUgeWVhciB2aWV3LiAqL1xyXG4gIF9tb250aFNlbGVjdGVkKG1vbnRoOiBEKTogdm9pZCB7XHJcbiAgICB0aGlzLnNlbGVjdGVkID0gbW9udGg7XHJcbiAgICB0aGlzLmNoYW5nZVZpZXcoJ21vbnRoJyk7XHJcbiAgfVxyXG5cclxuICBfeWVhclNlbGVjdGVkKHllYXI6IEQpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VsZWN0ZWQgPSB5ZWFyO1xyXG4gICAgdGhpcy5jaGFuZ2VWaWV3KCd5ZWFyJyk7XHJcbiAgfVxyXG5cclxuICAvKiogSGFuZGxlcyB1c2VyIGNsaWNrcyBvbiB0aGUgcGVyaW9kIGxhYmVsLiAqL1xyXG4gIF9jdXJyZW50UGVyaW9kQ2xpY2tlZCgpOiB2b2lkIHtcclxuICAgIHRoaXMuY2hhbmdlVmlldyh0aGlzLnZpZXcgPT09ICdtb250aCcgPyAneWVhcicgOiAneWVhcnMnKTtcclxuICB9XHJcblxyXG4gIC8qKiBIYW5kbGVzIHVzZXIgY2xpY2tzIG9uIHRoZSBwcmV2aW91cyBidXR0b24uICovXHJcbiAgX3ByZXZpb3VzQ2xpY2tlZCgpOiB2b2lkIHtcclxuICAgIHRoaXMuX25hdkNhbGVuZGFyKC0xKTtcclxuICB9XHJcblxyXG4gIC8qKiBIYW5kbGVzIHVzZXIgY2xpY2tzIG9uIHRoZSBuZXh0IGJ1dHRvbi4gKi9cclxuICBfbmV4dENsaWNrZWQoKTogdm9pZCB7XHJcbiAgICB0aGlzLl9uYXZDYWxlbmRhcigxKTtcclxuICB9XHJcblxyXG4gIC8qKiBIYW5kbGVzIHVzZXIgY2xpY2tzIG9uIHRoZSB0aW1lIGxhYmVscy4gKi9cclxuICBfc2hvd0hvdXJWaWV3KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuX2hhc1RpbWUpIHtcclxuICAgICAgdGhpcy5faG91clZpZXcgPSB0cnVlO1xyXG4gICAgICB0aGlzLmNoYW5nZVZpZXcoJ2Nsb2NrJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfc2hvd01pbnV0ZVZpZXcoKTogdm9pZCB7XHJcbiAgICB0aGlzLl9ob3VyVmlldyA9IGZhbHNlO1xyXG4gICAgdGhpcy5jaGFuZ2VWaWV3KCdjbG9jaycpO1xyXG4gIH1cclxuXHJcbiAgX3RvZ2dsZUFtUG0oYW0pOiB2b2lkIHtcclxuICAgIHRoaXMuX2lzQW0gPSAhdGhpcy5faXNBbTtcclxuICAgIGNvbnN0IGRhdGUgPSB0aGlzLl9kYXRlQWRhcHRlci5hZGRDYWxlbmRhckhvdXJzKHRoaXMuYWN0aXZlRGF0ZSwgdGhpcy5faXNBbSA/IC0xMiA6IDEyKTtcclxuICAgIGlmICh0aGlzLl9kYXRlRmlsdGVyRm9yVmlld3MoZGF0ZSwgJ21pbnV0ZScpKSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSBkYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGlmICh0aGlzLl9pc0FtICE9PSBhbSkge1xyXG4gICAgLy8gICBjb25zdCBkYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuYWRkQ2FsZW5kYXJIb3Vycyh0aGlzLmFjdGl2ZURhdGUsIHRoaXMuX2lzQW0gPyAxMiA6IC0xMik7XHJcbiAgICAvLyAgIGlmICh0aGlzLl9kYXRlRmlsdGVyRm9yVmlld3MoZGF0ZSwgJ21pbnV0ZScpKSB7XHJcbiAgICAvLyAgICAgdGhpcy5zZWxlY3RlZCA9IGRhdGU7XHJcbiAgICAvLyAgIH1cclxuICAgIC8vIH1cclxuICB9XHJcblxyXG4gIC8qKiBXaGV0aGVyIHRoZSBwcmV2aW91cyBwZXJpb2QgYnV0dG9uIGlzIGVuYWJsZWQuICovXHJcbiAgX3ByZXZpb3VzRW5hYmxlZCgpOiBib29sZWFuIHtcclxuICAgIGlmICghdGhpcy5taW5EYXRlKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICF0aGlzLm1pbkRhdGUgfHwgIXRoaXMuX2lzU2FtZVZpZXcodGhpcy5hY3RpdmVEYXRlLCB0aGlzLm1pbkRhdGUpO1xyXG4gIH1cclxuXHJcbiAgLyoqIFdoZXRoZXIgdGhlIG5leHQgcGVyaW9kIGJ1dHRvbiBpcyBlbmFibGVkLiAqL1xyXG4gIF9uZXh0RW5hYmxlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiAhdGhpcy5tYXhEYXRlIHx8ICF0aGlzLl9pc1NhbWVWaWV3KHRoaXMuYWN0aXZlRGF0ZSwgdGhpcy5tYXhEYXRlKTtcclxuICB9XHJcblxyXG4gIC8qKiBIYW5kbGVzIGNhbGVuZGFyIGRpZmZzLiAqL1xyXG4gIF9uYXZDYWxlbmRhcihkaWZmKTogdm9pZCB7XHJcbiAgICBzd2l0Y2ggKHRoaXMudmlldykge1xyXG4gICAgICBjYXNlICd5ZWFyJzpcclxuICAgICAgICB0aGlzLmFjdGl2ZURhdGUgPSB0aGlzLl9kYXRlQWRhcHRlci5hZGRDYWxlbmRhclllYXJzKHRoaXMuYWN0aXZlRGF0ZSwgZGlmZik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ21vbnRoJzpcclxuICAgICAgICB0aGlzLmFjdGl2ZURhdGUgPSB0aGlzLl9kYXRlQWRhcHRlci5hZGRDYWxlbmRhck1vbnRocyh0aGlzLmFjdGl2ZURhdGUsIGRpZmYpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdjbG9jayc6XHJcbiAgICAgICAgdGhpcy5hY3RpdmVEYXRlID0gdGhpcy5faG91clZpZXdcclxuICAgICAgICAgID8gdGhpcy5fZGF0ZUFkYXB0ZXIuYWRkQ2FsZW5kYXJIb3Vycyh0aGlzLmFjdGl2ZURhdGUsIGRpZmYpXHJcbiAgICAgICAgICA6IHRoaXMuX2RhdGVBZGFwdGVyLmFkZENhbGVuZGFyTWludXRlcyh0aGlzLmFjdGl2ZURhdGUsIGRpZmYpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFdoZXRoZXIgdGhlIHR3byBkYXRlcyByZXByZXNlbnQgdGhlIHNhbWUgdmlldyBpbiB0aGUgY3VycmVudCB2aWV3IG1vZGUgKG1vbnRoIG9yIHllYXIpLiAqL1xyXG4gIHByaXZhdGUgX2lzU2FtZVZpZXcoZGF0ZTE6IEQsIGRhdGUyOiBEKTogYm9vbGVhbiB7XHJcbiAgICBzd2l0Y2ggKHRoaXMudmlldykge1xyXG4gICAgICBjYXNlICd5ZWFyJzpcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0WWVhcihkYXRlMSkgPT09IHRoaXMuX2RhdGVBZGFwdGVyLmdldFllYXIoZGF0ZTIpO1xyXG4gICAgICBjYXNlICdtb250aCc6XHJcbiAgICAgICAgY29uc3QgbW9udGhZZWFyID0gdGhpcy5fZGF0ZUZvcm1hdHMuZGlzcGxheS5tb250aFllYXJMYWJlbDtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0ZUFkYXB0ZXIuZm9ybWF0KGRhdGUxLCBtb250aFllYXIpID09PSB0aGlzLl9kYXRlQWRhcHRlci5mb3JtYXQoZGF0ZTIsIG1vbnRoWWVhcik7XHJcbiAgICAgIGNhc2UgJ2Nsb2NrJzpcclxuICAgICAgICBjb25zdCBob3VyTWludXRlID0gdGhpcy5fZGF0ZUZvcm1hdHMuZGlzcGxheS50aW1lTGFiZWw7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGVBZGFwdGVyLmZvcm1hdChkYXRlMSwgaG91ck1pbnV0ZSkgPT09IHRoaXMuX2RhdGVBZGFwdGVyLmZvcm1hdChkYXRlMiwgaG91ck1pbnV0ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gb2JqIFRoZSBvYmplY3QgdG8gY2hlY2suXHJcbiAgICogQHJldHVybnMgVGhlIGdpdmVuIG9iamVjdCBpZiBpdCBpcyBib3RoIGEgZGF0ZSBpbnN0YW5jZSBhbmQgdmFsaWQsIG90aGVyd2lzZSBudWxsLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2dldFZhbGlkRGF0ZU9yTnVsbChvYmo6IGFueSk6IEQgfCBudWxsIHtcclxuICAgIHJldHVybiB0aGlzLl9kYXRlQWRhcHRlci5pc0RhdGVJbnN0YW5jZShvYmopICYmIHRoaXMuX2RhdGVBZGFwdGVyLmlzVmFsaWQob2JqKSA/IG9iaiA6IG51bGw7XHJcbiAgfVxyXG5cclxuICAvKiogUmV0dXJucyB0aGUgY29tcG9uZW50IGluc3RhbmNlIHRoYXQgY29ycmVzcG9uZHMgdG8gdGhlIGN1cnJlbnQgY2FsZW5kYXIgdmlldy4gKi9cclxuICBwcml2YXRlIF9nZXRDdXJyZW50Vmlld0NvbXBvbmVudCgpIHtcclxuICAgIHJldHVybiB0aGlzLmNsb2NrVmlldyB8fCB0aGlzLm1vbnRoVmlldyB8fCB0aGlzLnllYXJWaWV3IHx8IHRoaXMueWVhcnNWaWV3O1xyXG4gIH1cclxufVxyXG4iXX0=