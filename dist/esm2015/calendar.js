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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWFydGluZGFsZWMvZGF0ZXBpY2tlci8iLCJzb3VyY2VzIjpbImNhbGVuZGFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUdMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUdMLFFBQVEsRUFDUixNQUFNLEVBRU4sU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzVDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBa0IsTUFBTSxjQUFjLENBQUM7QUFDaEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUMzQyxPQUFPLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDNUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMxQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sY0FBYyxDQUFDOzs7Ozs7QUE4QjVDLE1BQU0sT0FBTyxXQUFXOzs7Ozs7O0lBd010QixZQUNTLEtBQXdCLEVBQ1gsWUFBNEIsRUFHeEMsWUFBNEIsRUFDcEMsaUJBQW9DO1FBTDdCLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQ1gsaUJBQVksR0FBWixZQUFZLENBQWdCO1FBR3hDLGlCQUFZLEdBQVosWUFBWSxDQUFnQjs7Ozs7O1FBck05Qix5QkFBb0Is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QiwwQ0FBNEI7O0lBRTVCLHNDQUF3Qjs7SUFFeEIsd0NBQTBCOzs7OztJQUcxQix3Q0FBMEI7O0lBRTFCLHlDQUEyQjs7Ozs7SUFHM0IsdUNBQXlCOzs7OztJQUd6Qix1Q0FBeUI7O0lBR3ZCLDRCQUErQjs7Ozs7SUFDL0IsbUNBQWdEOzs7OztJQUNoRCxtQ0FFb0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcclxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxyXG4gKi9cclxuXHJcbmltcG9ydCB7XHJcbiAgQWZ0ZXJDb250ZW50SW5pdCxcclxuICBBZnRlclZpZXdDaGVja2VkLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIENvbXBvbmVudCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSW5qZWN0LFxyXG4gIElucHV0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT3B0aW9uYWwsXHJcbiAgT3V0cHV0LFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbiAgVmlld0NoaWxkLFxyXG4gIFZpZXdFbmNhcHN1bGF0aW9uXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBNYXRDbG9ja1ZpZXcgfSBmcm9tICcuL2Nsb2NrLXZpZXcnO1xyXG5pbXBvcnQgeyBNQVRfREFURV9GT1JNQVRTLCBNYXREYXRlRm9ybWF0cyB9IGZyb20gJy4vY29yZS9pbmRleCc7XHJcbmltcG9ydCB7IERhdGVBZGFwdGVyIH0gZnJvbSAnLi9jb3JlL2luZGV4JztcclxuaW1wb3J0IHsgY29udHJvbEFjdGl2ZSwgc2xpZGVDYWxlbmRhciB9IGZyb20gJy4vZGF0ZXBpY2tlci1hbmltYXRpb25zJztcclxuaW1wb3J0IHsgY3JlYXRlTWlzc2luZ0RhdGVJbXBsRXJyb3IgfSBmcm9tICcuL2RhdGVwaWNrZXItZXJyb3JzJztcclxuaW1wb3J0IHsgTWF0RGF0ZXBpY2tlckludGwgfSBmcm9tICcuL2RhdGVwaWNrZXItaW50bCc7XHJcbmltcG9ydCB7IE1hdE1vbnRoVmlldyB9IGZyb20gJy4vbW9udGgtdmlldyc7XHJcbmltcG9ydCB7IE1hdFllYXJWaWV3IH0gZnJvbSAnLi95ZWFyLXZpZXcnO1xyXG5pbXBvcnQgeyBNYXRZZWFyc1ZpZXcgfSBmcm9tICcuL3llYXJzLXZpZXcnO1xyXG5cclxuLyoqXHJcbiAqIFBvc3NpYmxlIHZpZXdzIGZvciB0aGUgY2FsZW5kYXIuXHJcbiAqIEBkb2NzLXByaXZhdGVcclxuICovXHJcbmV4cG9ydCB0eXBlIE1hdENhbGVuZGFyVmlldyA9ICdjbG9jaycgfCAnbW9udGgnIHwgJ3llYXInIHwgJ3llYXJzJztcclxuXHJcbi8qKlxyXG4gKiBQb3NzaWJsZSByZXR1cm4gdHlwZXMuXHJcbiAqIEBkb2NzLXByaXZhdGVcclxuICovXHJcbmV4cG9ydCB0eXBlIE1hdENhbGVuZGFyVHlwZSA9ICdkYXRlJyB8ICdkYXRldGltZScgfCAndGltZSc7XHJcblxyXG4vKipcclxuICogQSBjYWxlbmRhciB0aGF0IGlzIHVzZWQgYXMgcGFydCBvZiB0aGUgZGF0ZXBpY2tlci5cclxuICogQGRvY3MtcHJpdmF0ZVxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdtYXQtY2FsZW5kYXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnY2FsZW5kYXIuaHRtbCcsXHJcbiAgLy8gc3R5bGVVcmxzOiBbJ2NhbGVuZGFyLmNzcyddLFxyXG4gIGhvc3Q6IHtcclxuICAgIGNsYXNzOiAnbWF0LWNhbGVuZGFyJ1xyXG4gIH0sXHJcbiAgYW5pbWF0aW9uczogW2NvbnRyb2xBY3RpdmUsIHNsaWRlQ2FsZW5kYXJdLFxyXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2VcclxufSlcclxuZXhwb3J0IGNsYXNzIE1hdENhbGVuZGFyPEQ+IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3Q2hlY2tlZCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xyXG4gIHByaXZhdGUgX2ludGxDaGFuZ2VzOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8qKlxyXG4gICAqIFVzZWQgZm9yIHNjaGVkdWxpbmcgdGhhdCBmb2N1cyBzaG91bGQgYmUgbW92ZWQgdG8gdGhlIGFjdGl2ZSBjZWxsIG9uIHRoZSBuZXh0IHRpY2suXHJcbiAgICogV2UgbmVlZCB0byBzY2hlZHVsZSBpdCwgcmF0aGVyIHRoYW4gZG8gaXQgaW1tZWRpYXRlbHksIGJlY2F1c2Ugd2UgaGF2ZSB0byB3YWl0XHJcbiAgICogZm9yIEFuZ3VsYXIgdG8gcmUtZXZhbHVhdGUgdGhlIHZpZXcgY2hpbGRyZW4uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfbW92ZUZvY3VzT25OZXh0VGljayA9IGZhbHNlO1xyXG5cclxuICAvKiogQSBkYXRlIHJlcHJlc2VudGluZyB0aGUgcGVyaW9kIChtb250aCBvciB5ZWFyKSB0byBzdGFydCB0aGUgY2FsZW5kYXIgaW4uICovXHJcbiAgQElucHV0KClcclxuICBnZXQgc3RhcnRBdCgpOiBEIHwgbnVsbCB7XHJcbiAgICByZXR1cm4gdGhpcy5fc3RhcnRBdDtcclxuICB9XHJcbiAgc2V0IHN0YXJ0QXQodmFsdWU6IEQgfCBudWxsKSB7XHJcbiAgICB0aGlzLl9zdGFydEF0ID0gdGhpcy5fZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuX2RhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3N0YXJ0QXQ6IEQgfCBudWxsO1xyXG5cclxuICAvKiogVGhlIHR5cGUgb2YgdmFsdWUgaGFuZGxlZCBieSB0aGUgY2FsZW5kYXIuICovXHJcbiAgQElucHV0KClcclxuICB0eXBlOiBNYXRDYWxlbmRhclR5cGUgPSAnZGF0ZSc7XHJcblxyXG4gIC8qKiBXaGljaCB2aWV3IHRoZSBjYWxlbmRhciBzaG91bGQgYmUgc3RhcnRlZCBpbi4gKi9cclxuICBASW5wdXQoKVxyXG4gIHN0YXJ0VmlldzogTWF0Q2FsZW5kYXJWaWV3ID0gJ21vbnRoJztcclxuXHJcbiAgLyoqIEN1cnJlbnQgY2FsZW5kYXIgdmlldyAqL1xyXG4gIHZpZXc6IE1hdENhbGVuZGFyVmlldztcclxuXHJcbiAgLyoqIFRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgZGF0ZS4gKi9cclxuICBASW5wdXQoKVxyXG4gIGdldCBzZWxlY3RlZCgpOiBEIHwgbnVsbCB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XHJcbiAgfVxyXG4gIHNldCBzZWxlY3RlZCh2YWx1ZTogRCB8IG51bGwpIHtcclxuICAgIHRoaXMuX3NlbGVjdGVkID0gdGhpcy5fZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuX2RhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSk7XHJcbiAgICB0aGlzLmFjdGl2ZURhdGUgPSB0aGlzLl9zZWxlY3RlZDtcclxuICB9XHJcbiAgcHJpdmF0ZSBfc2VsZWN0ZWQ6IEQgfCBudWxsO1xyXG5cclxuICAvKiogVGhlIG1pbmltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IG1pbkRhdGUoKTogRCB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMuX21pbkRhdGU7XHJcbiAgfVxyXG4gIHNldCBtaW5EYXRlKHZhbHVlOiBEIHwgbnVsbCkge1xyXG4gICAgdGhpcy5fbWluRGF0ZSA9IHRoaXMuX2dldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLl9kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpO1xyXG4gIH1cclxuICBwcml2YXRlIF9taW5EYXRlOiBEIHwgbnVsbDtcclxuXHJcbiAgLyoqIFRoZSBtYXhpbXVtIHNlbGVjdGFibGUgZGF0ZS4gKi9cclxuICBASW5wdXQoKVxyXG4gIGdldCBtYXhEYXRlKCk6IEQgfCBudWxsIHtcclxuICAgIHJldHVybiB0aGlzLl9tYXhEYXRlO1xyXG4gIH1cclxuICBzZXQgbWF4RGF0ZSh2YWx1ZTogRCB8IG51bGwpIHtcclxuICAgIHRoaXMuX21heERhdGUgPSB0aGlzLl9nZXRWYWxpZERhdGVPck51bGwodGhpcy5fZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfbWF4RGF0ZTogRCB8IG51bGw7XHJcblxyXG4gIC8qKiBBIGZ1bmN0aW9uIHVzZWQgdG8gZmlsdGVyIHdoaWNoIGRhdGVzIGFyZSBzZWxlY3RhYmxlLiAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZGF0ZUZpbHRlcjogKGRhdGU6IEQsIHVuaXQ/OiBzdHJpbmcpID0+IGJvb2xlYW47XHJcblxyXG4gIC8qKiBDbG9jayBpbnRlcnZhbCAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgY2xvY2tTdGVwID0gMTtcclxuXHJcbiAgLyoqIENsb2NrIGhvdXIgZm9ybWF0ICovXHJcbiAgQElucHV0KClcclxuICB0d2VsdmVIb3VyID0gZmFsc2U7XHJcblxyXG4gIC8qKiBFbWl0cyB3aGVuIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgZGF0ZSBjaGFuZ2VzLiAqL1xyXG4gIEBPdXRwdXQoKVxyXG4gIHNlbGVjdGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxEPigpO1xyXG5cclxuICAvKiogRW1pdHMgd2hlbiBhbnkgZGF0ZSBpcyBzZWxlY3RlZC4gKi9cclxuICBAT3V0cHV0KClcclxuICBfdXNlclNlbGVjdGlvbiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcclxuXHJcbiAgLyoqIFJlZmVyZW5jZSB0byB0aGUgY3VycmVudCBjbG9jayB2aWV3IGNvbXBvbmVudC4gKi9cclxuICBAVmlld0NoaWxkKE1hdENsb2NrVmlldylcclxuICBjbG9ja1ZpZXc6IE1hdENsb2NrVmlldzxEPjtcclxuXHJcbiAgLyoqIFJlZmVyZW5jZSB0byB0aGUgY3VycmVudCBtb250aCB2aWV3IGNvbXBvbmVudC4gKi9cclxuICBAVmlld0NoaWxkKE1hdE1vbnRoVmlldylcclxuICBtb250aFZpZXc6IE1hdE1vbnRoVmlldzxEPjtcclxuXHJcbiAgLyoqIFJlZmVyZW5jZSB0byB0aGUgY3VycmVudCB5ZWFyIHZpZXcgY29tcG9uZW50LiAqL1xyXG4gIEBWaWV3Q2hpbGQoTWF0WWVhclZpZXcpXHJcbiAgeWVhclZpZXc6IE1hdFllYXJWaWV3PEQ+O1xyXG5cclxuICAvKiogUmVmZXJlbmNlIHRvIHRoZSBjdXJyZW50IHllYXJzIHZpZXcgY29tcG9uZW50LiAqL1xyXG4gIEBWaWV3Q2hpbGQoTWF0WWVhcnNWaWV3KVxyXG4gIHllYXJzVmlldzogTWF0WWVhcnNWaWV3PEQ+O1xyXG5cclxuICAvKiogRGF0ZSBmaWx0ZXIgZm9yIHRoZSBtb250aCBhbmQgeWVhciB2aWV3cy4gKi9cclxuICBfZGF0ZUZpbHRlckZvclZpZXdzID0gKGRhdGU6IEQsIHVuaXQgPSAnbWludXRlJykgPT4ge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgISFkYXRlICYmXHJcbiAgICAgICghdGhpcy5kYXRlRmlsdGVyIHx8IHRoaXMuZGF0ZUZpbHRlcihkYXRlKSkgJiZcclxuICAgICAgKCF0aGlzLm1pbkRhdGUgfHwgdGhpcy5fZGF0ZUFkYXB0ZXIuY29tcGFyZURhdGUoZGF0ZSwgdGhpcy5taW5EYXRlLCB1bml0KSA+PSAwKSAmJlxyXG4gICAgICAoIXRoaXMubWF4RGF0ZSB8fCB0aGlzLl9kYXRlQWRhcHRlci5jb21wYXJlRGF0ZShkYXRlLCB0aGlzLm1heERhdGUsIHVuaXQpIDw9IDApXHJcbiAgICApO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBjdXJyZW50IGFjdGl2ZSBkYXRlLiBUaGlzIGRldGVybWluZXMgd2hpY2ggdGltZSBwZXJpb2QgaXMgc2hvd24gYW5kIHdoaWNoIGRhdGUgaXNcclxuICAgKiBoaWdobGlnaHRlZCB3aGVuIHVzaW5nIGtleWJvYXJkIG5hdmlnYXRpb24uXHJcbiAgICovXHJcbiAgZ2V0IGFjdGl2ZURhdGUoKTogRCB7XHJcbiAgICByZXR1cm4gdGhpcy5fY2xhbXBlZEFjdGl2ZURhdGU7XHJcbiAgfVxyXG4gIHNldCBhY3RpdmVEYXRlKHZhbHVlOiBEKSB7XHJcbiAgICBjb25zdCBvbGRBY3RpdmVEYXRlID0gdGhpcy5fY2xhbXBlZEFjdGl2ZURhdGU7XHJcbiAgICB0aGlzLl9jbGFtcGVkQWN0aXZlRGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmNsYW1wRGF0ZSh2YWx1ZSwgdGhpcy5taW5EYXRlLCB0aGlzLm1heERhdGUpO1xyXG4gICAgdGhpcy5faXNBbSA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldEhvdXJzKHRoaXMuX2NsYW1wZWRBY3RpdmVEYXRlKSA8IDEyO1xyXG5cclxuICAgIGNvbnN0IHVuaXQgPSB0aGlzLnZpZXcgPT09ICd5ZWFyJyA/ICd5ZWFyJyA6ICdtb250aCc7XHJcbiAgICBjb25zdCBkaWZmID0gdGhpcy5fZGF0ZUFkYXB0ZXIuY29tcGFyZURhdGUob2xkQWN0aXZlRGF0ZSwgdGhpcy5fY2xhbXBlZEFjdGl2ZURhdGUsIHVuaXQpO1xyXG4gICAgaWYgKGRpZmYpIHtcclxuICAgICAgdGhpcy5fYW5pbWF0aW9uRGlyID0gZGlmZiA+IDAgPyAnbGVmdCcgOiAncmlnaHQnO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHVwZGF0ZSB0aGUgbGFiZWxzXHJcbiAgICBjb25zdCBkYXkgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXREYXlPZldlZWsodGhpcy5hY3RpdmVEYXRlKTtcclxuICAgIGxldCBob3VycyA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldEhvdXJzKHRoaXMuYWN0aXZlRGF0ZSk7XHJcbiAgICBpZiAodGhpcy50d2VsdmVIb3VyKSB7XHJcbiAgICAgIGhvdXJzID0gaG91cnMgPT09IDAgPyAxMiA6IGhvdXJzID4gMTIgPyBob3VycyAtIDEyIDogaG91cnM7XHJcbiAgICB9XHJcbiAgICBjb25zdCBtaW51dGVzID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0TWludXRlcyh0aGlzLmFjdGl2ZURhdGUpO1xyXG5cclxuICAgIHN3aXRjaCAodGhpcy52aWV3KSB7XHJcbiAgICAgIGNhc2UgJ3llYXInOlxyXG4gICAgICAgIHRoaXMuX3BlcmlvZEJ1dHRvblRleHQgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRZZWFyTmFtZSh0aGlzLmFjdGl2ZURhdGUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHRoaXMuX3BlcmlvZEJ1dHRvblRleHQgPSB0aGlzLl9kYXRlQWRhcHRlci5mb3JtYXQodGhpcy5hY3RpdmVEYXRlLCB0aGlzLl9kYXRlRm9ybWF0cy5kaXNwbGF5Lm1vbnRoWWVhckxhYmVsKTtcclxuICAgIH1cclxuICAgIHRoaXMuX3llYXJCdXR0b25UZXh0ID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLmFjdGl2ZURhdGUpLnRvU3RyaW5nKCk7XHJcbiAgICB0aGlzLl9tb250aGRheUJ1dHRvblRleHQgPSB0aGlzLl9kYXRlQWRhcHRlci5mb3JtYXQodGhpcy5hY3RpdmVEYXRlLCB0aGlzLl9kYXRlRm9ybWF0cy5kaXNwbGF5Lm1vbnRoRGF5TGFiZWwpO1xyXG4gICAgdGhpcy5fZGF5QnV0dG9uVGV4dCA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldERheU9mV2Vla05hbWVzKCdsb25nJylbZGF5XTtcclxuICAgIHRoaXMuX2hvdXJCdXR0b25UZXh0ID0gaG91cnMudG9TdHJpbmcoKTtcclxuICAgIHRoaXMuX21pbnV0ZUJ1dHRvblRleHQgPSAoJzAwJyArIG1pbnV0ZXMpLnNsaWNlKC0yKTtcclxuXHJcbiAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX2NsYW1wZWRBY3RpdmVEYXRlOiBEO1xyXG5cclxuICAvKiogV2hldGhlciB0aGUgY2FsZW5kYXIgaXMgaW4gbW9udGggdmlldy4gKi9cclxuICBnZXQgY3VycmVudFZpZXcoKTogTWF0Q2FsZW5kYXJWaWV3IHtcclxuICAgIHJldHVybiB0aGlzLl9jdXJyZW50VmlldztcclxuICB9XHJcbiAgc2V0IGN1cnJlbnRWaWV3KHZhbHVlOiBNYXRDYWxlbmRhclZpZXcpIHtcclxuICAgIHRoaXMuX2N1cnJlbnRWaWV3ID0gdmFsdWU7XHJcbiAgICB0aGlzLl9tb3ZlRm9jdXNPbk5leHRUaWNrID0gdHJ1ZTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfY3VycmVudFZpZXc6IE1hdENhbGVuZGFyVmlldztcclxuXHJcbiAgLyoqXHJcbiAgICogRW1pdHMgd2hlbmV2ZXIgdGhlcmUgaXMgYSBzdGF0ZSBjaGFuZ2UgdGhhdCB0aGUgaGVhZGVyIG1heSBuZWVkIHRvIHJlc3BvbmQgdG8uXHJcbiAgICovXHJcbiAgc3RhdGVDaGFuZ2VzID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcclxuXHJcbiAgLyoqIEFuaW1hdGlvbnMgaGFuZGxlciAqL1xyXG4gIF9hbmltYXRpb25EaXI6IHN0cmluZztcclxuXHJcbiAgLyoqIFdoZXRoZXIgdGhlIGFjdGl2ZSBkYXRlIGlzIEFNIG9yIG5vdCAqL1xyXG4gIF9pc0FtOiBib29sZWFuO1xyXG5cclxuICAvKiogV2hldGhlciB0aGUgY2FsZW5kYXIgcHJvY2VzcyB0aGUgdGltZS4gKi9cclxuICBfaGFzVGltZTogYm9vbGVhbjtcclxuXHJcbiAgLyoqIFdoZXRoZXIgdGhlIGNhbGVuZGFyIGlzIGluIGhvdXIgdmlldy4gKi9cclxuICBfaG91clZpZXc6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAvKiogVGhlIGxhYmVsIGZvciB0aGUgY2FsZW5kYXIgaGVhZGVyIGJ1dHRvbnMuICovXHJcbiAgX3llYXJCdXR0b25UZXh0OiBzdHJpbmc7XHJcblxyXG4gIF9kYXlCdXR0b25UZXh0OiBzdHJpbmc7XHJcblxyXG4gIF9tb250aGRheUJ1dHRvblRleHQ6IHN0cmluZztcclxuXHJcbiAgX2hvdXJCdXR0b25UZXh0OiBzdHJpbmc7XHJcblxyXG4gIF9taW51dGVCdXR0b25UZXh0OiBzdHJpbmc7XHJcblxyXG4gIC8qKiBUaGUgbGFiZWwgZm9yIHRoZSBjdXJyZW50IGNhbGVuZGFyIHZpZXcuICovXHJcbiAgX3BlcmlvZEJ1dHRvblRleHQ6IHN0cmluZztcclxuXHJcbiAgX3BlcmlvZEJ1dHRvbkxhYmVsOiBzdHJpbmc7XHJcblxyXG4gIC8qKiBUaGUgbGFiZWwgZm9yIHRoZSB0aGUgcHJldmlvdXMgYnV0dG9uLiAqL1xyXG4gIF9wcmV2QnV0dG9uTGFiZWw6IHN0cmluZztcclxuXHJcbiAgLyoqIFRoZSBsYWJlbCBmb3IgdGhlIHRoZSBuZXh0IGJ1dHRvbi4gKi9cclxuICBfbmV4dEJ1dHRvbkxhYmVsOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIF9pbnRsOiBNYXREYXRlcGlja2VySW50bCxcclxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgX2RhdGVBZGFwdGVyOiBEYXRlQWRhcHRlcjxEPixcclxuICAgIEBPcHRpb25hbCgpXHJcbiAgICBASW5qZWN0KE1BVF9EQVRFX0ZPUk1BVFMpXHJcbiAgICBwcml2YXRlIF9kYXRlRm9ybWF0czogTWF0RGF0ZUZvcm1hdHMsXHJcbiAgICBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcclxuICApIHtcclxuICAgIGlmICghdGhpcy5fZGF0ZUFkYXB0ZXIpIHtcclxuICAgICAgdGhyb3cgY3JlYXRlTWlzc2luZ0RhdGVJbXBsRXJyb3IoJ0RhdGVBZGFwdGVyJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLl9kYXRlRm9ybWF0cykge1xyXG4gICAgICB0aHJvdyBjcmVhdGVNaXNzaW5nRGF0ZUltcGxFcnJvcignTUFUX0RBVEVfRk9STUFUUycpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2ludGxDaGFuZ2VzID0gX2ludGwuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICBjaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcclxuICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICB0aGlzLmFjdGl2ZURhdGUgPSB0aGlzLnN0YXJ0QXQgfHwgdGhpcy5fZGF0ZUFkYXB0ZXIudG9kYXkoKTtcclxuXHJcbiAgICB0aGlzLmNoYW5nZVZpZXcodGhpcy5zdGFydFZpZXcsIGZhbHNlKTtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcclxuICAgIGlmICh0aGlzLl9tb3ZlRm9jdXNPbk5leHRUaWNrKSB7XHJcbiAgICAgIHRoaXMuX21vdmVGb2N1c09uTmV4dFRpY2sgPSBmYWxzZTtcclxuICAgICAgdGhpcy5mb2N1c0FjdGl2ZUNlbGwoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5faW50bENoYW5nZXMudW5zdWJzY3JpYmUoKTtcclxuICAgIHRoaXMuc3RhdGVDaGFuZ2VzLmNvbXBsZXRlKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICB0aGlzLl9oYXNUaW1lID0gdGhpcy50eXBlLmluZGV4T2YoJ3RpbWUnKSA+PSAwO1xyXG4gICAgY29uc3QgY2hhbmdlID0gY2hhbmdlcy5zZWxlY3RlZCB8fCBjaGFuZ2VzLm1pbkRhdGUgfHwgY2hhbmdlcy5tYXhEYXRlIHx8IGNoYW5nZXMuZGF0ZUZpbHRlcjtcclxuXHJcbiAgICBpZiAoY2hhbmdlICYmICFjaGFuZ2UuZmlyc3RDaGFuZ2UpIHtcclxuICAgICAgY29uc3QgdmlldyA9IHRoaXMuX2dldEN1cnJlbnRWaWV3Q29tcG9uZW50KCk7XHJcbiAgICAgIGlmICh2aWV3KSB7XHJcbiAgICAgICAgdmlldy5faW5pdCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlVmlldyh2aWV3LCBmb2N1cyA9IHRydWUpIHtcclxuICAgIHN3aXRjaCAodmlldykge1xyXG4gICAgICBjYXNlICd5ZWFyJzpcclxuICAgICAgICB0aGlzLl9wZXJpb2RCdXR0b25UZXh0ID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0WWVhck5hbWUodGhpcy5hY3RpdmVEYXRlKTtcclxuICAgICAgICB0aGlzLl9wZXJpb2RCdXR0b25MYWJlbCA9IHRoaXMuX2ludGwuc3dpdGNoVG9ZZWFyc1ZpZXdMYWJlbDtcclxuICAgICAgICB0aGlzLl9uZXh0QnV0dG9uTGFiZWwgPSB0aGlzLl9pbnRsLm5leHRZZWFyTGFiZWw7XHJcbiAgICAgICAgdGhpcy5fcHJldkJ1dHRvbkxhYmVsID0gdGhpcy5faW50bC5wcmV2WWVhckxhYmVsO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdtb250aCc6XHJcbiAgICAgICAgdGhpcy5fcGVyaW9kQnV0dG9uVGV4dCA9IHRoaXMuX2RhdGVBZGFwdGVyLmZvcm1hdCh0aGlzLmFjdGl2ZURhdGUsIHRoaXMuX2RhdGVGb3JtYXRzLmRpc3BsYXkubW9udGhZZWFyTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuX3BlcmlvZEJ1dHRvbkxhYmVsID0gdGhpcy5faW50bC5zd2l0Y2hUb1llYXJWaWV3TGFiZWw7XHJcbiAgICAgICAgdGhpcy5fbmV4dEJ1dHRvbkxhYmVsID0gdGhpcy5faW50bC5uZXh0TW9udGhMYWJlbDtcclxuICAgICAgICB0aGlzLl9wcmV2QnV0dG9uTGFiZWwgPSB0aGlzLl9pbnRsLnByZXZNb250aExhYmVsO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudmlldyA9IHZpZXc7XHJcbiAgICBpZiAoZm9jdXMpIHtcclxuICAgICAgdGhpcy5fbW92ZUZvY3VzT25OZXh0VGljayA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmb2N1c0FjdGl2ZUNlbGwoKSB7XHJcbiAgICB0aGlzLl9nZXRDdXJyZW50Vmlld0NvbXBvbmVudCgpLl9mb2N1c0FjdGl2ZUNlbGwoKTtcclxuICB9XHJcblxyXG4gIF9zdWJtaXRDbGlja2VkKCk6IHZvaWQge1xyXG4gICAgdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KHRoaXMuYWN0aXZlRGF0ZSk7XHJcbiAgICB0aGlzLl91c2VyU2VsZWN0aW9uLmVtaXQoKTtcclxuICB9XHJcblxyXG4gIF9jYW5jZWxDbGlja2VkKCk6IHZvaWQge1xyXG4gICAgdGhpcy5fdXNlclNlbGVjdGlvbi5lbWl0KCk7XHJcbiAgfVxyXG5cclxuICAvKiogSGFuZGxlcyBkYXRlIHNlbGVjdGlvbiBpbiB0aGUgY2xvY2sgdmlldy4gKi9cclxuICBfdGltZUNoYW5nZWQoZGF0ZTogRCk6IHZvaWQge1xyXG4gICAgdGhpcy5zZWxlY3RlZCA9IGRhdGU7XHJcbiAgfVxyXG5cclxuICBfdGltZVNlbGVjdGVkKGRhdGU6IEQpOiB2b2lkIHtcclxuICAgIC8vIGlmICh0aGlzLmF1dG9PayAmJiB0aGlzLnR5cGUgPT09ICd0aW1lJykge1xyXG4gICAgLy8gICB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQoZGF0ZSk7XHJcbiAgICAvLyAgIHRoaXMuX3VzZXJTZWxlY3Rpb24uZW1pdCgpO1xyXG4gICAgLy8gfVxyXG4gICAgdGhpcy5zZWxlY3RlZCA9IGRhdGU7XHJcbiAgfVxyXG5cclxuICAvKiogSGFuZGxlcyBkYXRlIHNlbGVjdGlvbiBpbiB0aGUgbW9udGggdmlldy4gKi9cclxuICBfZGF0ZVNlbGVjdGVkKGRhdGU6IEQpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VsZWN0ZWQgPSBkYXRlO1xyXG4gICAgaWYgKHRoaXMuX2hhc1RpbWUpIHtcclxuICAgICAgdGhpcy5jaGFuZ2VWaWV3KCdjbG9jaycpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIEhhbmRsZXMgbW9udGggc2VsZWN0aW9uIGluIHRoZSB5ZWFyIHZpZXcuICovXHJcbiAgX21vbnRoU2VsZWN0ZWQobW9udGg6IEQpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VsZWN0ZWQgPSBtb250aDtcclxuICAgIHRoaXMuY2hhbmdlVmlldygnbW9udGgnKTtcclxuICB9XHJcblxyXG4gIF95ZWFyU2VsZWN0ZWQoeWVhcjogRCk6IHZvaWQge1xyXG4gICAgdGhpcy5zZWxlY3RlZCA9IHllYXI7XHJcbiAgICB0aGlzLmNoYW5nZVZpZXcoJ3llYXInKTtcclxuICB9XHJcblxyXG4gIC8qKiBIYW5kbGVzIHVzZXIgY2xpY2tzIG9uIHRoZSBwZXJpb2QgbGFiZWwuICovXHJcbiAgX2N1cnJlbnRQZXJpb2RDbGlja2VkKCk6IHZvaWQge1xyXG4gICAgdGhpcy5jaGFuZ2VWaWV3KHRoaXMudmlldyA9PT0gJ21vbnRoJyA/ICd5ZWFyJyA6ICd5ZWFycycpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEhhbmRsZXMgdXNlciBjbGlja3Mgb24gdGhlIHByZXZpb3VzIGJ1dHRvbi4gKi9cclxuICBfcHJldmlvdXNDbGlja2VkKCk6IHZvaWQge1xyXG4gICAgdGhpcy5fbmF2Q2FsZW5kYXIoLTEpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEhhbmRsZXMgdXNlciBjbGlja3Mgb24gdGhlIG5leHQgYnV0dG9uLiAqL1xyXG4gIF9uZXh0Q2xpY2tlZCgpOiB2b2lkIHtcclxuICAgIHRoaXMuX25hdkNhbGVuZGFyKDEpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEhhbmRsZXMgdXNlciBjbGlja3Mgb24gdGhlIHRpbWUgbGFiZWxzLiAqL1xyXG4gIF9zaG93SG91clZpZXcoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5faGFzVGltZSkge1xyXG4gICAgICB0aGlzLl9ob3VyVmlldyA9IHRydWU7XHJcbiAgICAgIHRoaXMuY2hhbmdlVmlldygnY2xvY2snKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIF9zaG93TWludXRlVmlldygpOiB2b2lkIHtcclxuICAgIHRoaXMuX2hvdXJWaWV3ID0gZmFsc2U7XHJcbiAgICB0aGlzLmNoYW5nZVZpZXcoJ2Nsb2NrJyk7XHJcbiAgfVxyXG5cclxuICBfdG9nZ2xlQW1QbShhbSk6IHZvaWQge1xyXG4gICAgdGhpcy5faXNBbSA9ICF0aGlzLl9pc0FtO1xyXG4gICAgY29uc3QgZGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmFkZENhbGVuZGFySG91cnModGhpcy5hY3RpdmVEYXRlLCB0aGlzLl9pc0FtID8gLTEyIDogMTIpO1xyXG4gICAgaWYgKHRoaXMuX2RhdGVGaWx0ZXJGb3JWaWV3cyhkYXRlLCAnbWludXRlJykpIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZCA9IGRhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaWYgKHRoaXMuX2lzQW0gIT09IGFtKSB7XHJcbiAgICAvLyAgIGNvbnN0IGRhdGUgPSB0aGlzLl9kYXRlQWRhcHRlci5hZGRDYWxlbmRhckhvdXJzKHRoaXMuYWN0aXZlRGF0ZSwgdGhpcy5faXNBbSA/IDEyIDogLTEyKTtcclxuICAgIC8vICAgaWYgKHRoaXMuX2RhdGVGaWx0ZXJGb3JWaWV3cyhkYXRlLCAnbWludXRlJykpIHtcclxuICAgIC8vICAgICB0aGlzLnNlbGVjdGVkID0gZGF0ZTtcclxuICAgIC8vICAgfVxyXG4gICAgLy8gfVxyXG4gIH1cclxuXHJcbiAgLyoqIFdoZXRoZXIgdGhlIHByZXZpb3VzIHBlcmlvZCBidXR0b24gaXMgZW5hYmxlZC4gKi9cclxuICBfcHJldmlvdXNFbmFibGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKCF0aGlzLm1pbkRhdGUpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gIXRoaXMubWluRGF0ZSB8fCAhdGhpcy5faXNTYW1lVmlldyh0aGlzLmFjdGl2ZURhdGUsIHRoaXMubWluRGF0ZSk7XHJcbiAgfVxyXG5cclxuICAvKiogV2hldGhlciB0aGUgbmV4dCBwZXJpb2QgYnV0dG9uIGlzIGVuYWJsZWQuICovXHJcbiAgX25leHRFbmFibGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuICF0aGlzLm1heERhdGUgfHwgIXRoaXMuX2lzU2FtZVZpZXcodGhpcy5hY3RpdmVEYXRlLCB0aGlzLm1heERhdGUpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEhhbmRsZXMgY2FsZW5kYXIgZGlmZnMuICovXHJcbiAgX25hdkNhbGVuZGFyKGRpZmYpOiB2b2lkIHtcclxuICAgIHN3aXRjaCAodGhpcy52aWV3KSB7XHJcbiAgICAgIGNhc2UgJ3llYXInOlxyXG4gICAgICAgIHRoaXMuYWN0aXZlRGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmFkZENhbGVuZGFyWWVhcnModGhpcy5hY3RpdmVEYXRlLCBkaWZmKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnbW9udGgnOlxyXG4gICAgICAgIHRoaXMuYWN0aXZlRGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmFkZENhbGVuZGFyTW9udGhzKHRoaXMuYWN0aXZlRGF0ZSwgZGlmZik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2Nsb2NrJzpcclxuICAgICAgICB0aGlzLmFjdGl2ZURhdGUgPSB0aGlzLl9ob3VyVmlld1xyXG4gICAgICAgICAgPyB0aGlzLl9kYXRlQWRhcHRlci5hZGRDYWxlbmRhckhvdXJzKHRoaXMuYWN0aXZlRGF0ZSwgZGlmZilcclxuICAgICAgICAgIDogdGhpcy5fZGF0ZUFkYXB0ZXIuYWRkQ2FsZW5kYXJNaW51dGVzKHRoaXMuYWN0aXZlRGF0ZSwgZGlmZik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogV2hldGhlciB0aGUgdHdvIGRhdGVzIHJlcHJlc2VudCB0aGUgc2FtZSB2aWV3IGluIHRoZSBjdXJyZW50IHZpZXcgbW9kZSAobW9udGggb3IgeWVhcikuICovXHJcbiAgcHJpdmF0ZSBfaXNTYW1lVmlldyhkYXRlMTogRCwgZGF0ZTI6IEQpOiBib29sZWFuIHtcclxuICAgIHN3aXRjaCAodGhpcy52aWV3KSB7XHJcbiAgICAgIGNhc2UgJ3llYXInOlxyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRlQWRhcHRlci5nZXRZZWFyKGRhdGUxKSA9PT0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0WWVhcihkYXRlMik7XHJcbiAgICAgIGNhc2UgJ21vbnRoJzpcclxuICAgICAgICBjb25zdCBtb250aFllYXIgPSB0aGlzLl9kYXRlRm9ybWF0cy5kaXNwbGF5Lm1vbnRoWWVhckxhYmVsO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRlQWRhcHRlci5mb3JtYXQoZGF0ZTEsIG1vbnRoWWVhcikgPT09IHRoaXMuX2RhdGVBZGFwdGVyLmZvcm1hdChkYXRlMiwgbW9udGhZZWFyKTtcclxuICAgICAgY2FzZSAnY2xvY2snOlxyXG4gICAgICAgIGNvbnN0IGhvdXJNaW51dGUgPSB0aGlzLl9kYXRlRm9ybWF0cy5kaXNwbGF5LnRpbWVMYWJlbDtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0ZUFkYXB0ZXIuZm9ybWF0KGRhdGUxLCBob3VyTWludXRlKSA9PT0gdGhpcy5fZGF0ZUFkYXB0ZXIuZm9ybWF0KGRhdGUyLCBob3VyTWludXRlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBvYmogVGhlIG9iamVjdCB0byBjaGVjay5cclxuICAgKiBAcmV0dXJucyBUaGUgZ2l2ZW4gb2JqZWN0IGlmIGl0IGlzIGJvdGggYSBkYXRlIGluc3RhbmNlIGFuZCB2YWxpZCwgb3RoZXJ3aXNlIG51bGwuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZ2V0VmFsaWREYXRlT3JOdWxsKG9iajogYW55KTogRCB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RhdGVBZGFwdGVyLmlzRGF0ZUluc3RhbmNlKG9iaikgJiYgdGhpcy5fZGF0ZUFkYXB0ZXIuaXNWYWxpZChvYmopID8gb2JqIDogbnVsbDtcclxuICB9XHJcblxyXG4gIC8qKiBSZXR1cm5zIHRoZSBjb21wb25lbnQgaW5zdGFuY2UgdGhhdCBjb3JyZXNwb25kcyB0byB0aGUgY3VycmVudCBjYWxlbmRhciB2aWV3LiAqL1xyXG4gIHByaXZhdGUgX2dldEN1cnJlbnRWaWV3Q29tcG9uZW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY2xvY2tWaWV3IHx8IHRoaXMubW9udGhWaWV3IHx8IHRoaXMueWVhclZpZXcgfHwgdGhpcy55ZWFyc1ZpZXc7XHJcbiAgfVxyXG59XHJcbiJdfQ==