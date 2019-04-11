/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AfterContentInit, AfterViewChecked, ChangeDetectorRef, EventEmitter, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { MatClockView } from './clock-view';
import { MatDateFormats } from './core/index';
import { DateAdapter } from './core/index';
import { MatDatepickerIntl } from './datepicker-intl';
import { MatMonthView } from './month-view';
import { MatYearView } from './year-view';
import { MatYearsView } from './years-view';
/**
 * Possible views for the calendar.
 * @docs-private
 */
export declare type MatCalendarView = 'clock' | 'month' | 'year' | 'years';
/**
 * Possible return types.
 * @docs-private
 */
export declare type MatCalendarType = 'date' | 'datetime' | 'time';
/**
 * A calendar that is used as part of the datepicker.
 * @docs-private
 */
export declare class MatCalendar<D> implements AfterContentInit, AfterViewChecked, OnChanges, OnDestroy {
    _intl: MatDatepickerIntl;
    private _dateAdapter;
    private _dateFormats;
    private _intlChanges;
    /**
     * Used for scheduling that focus should be moved to the active cell on the next tick.
     * We need to schedule it, rather than do it immediately, because we have to wait
     * for Angular to re-evaluate the view children.
     */
    private _moveFocusOnNextTick;
    /** A date representing the period (month or year) to start the calendar in. */
    startAt: D | null;
    private _startAt;
    /** The type of value handled by the calendar. */
    type: MatCalendarType;
    /** Which view the calendar should be started in. */
    startView: MatCalendarView;
    /** Current calendar view */
    view: MatCalendarView;
    /** The currently selected date. */
    selected: D | null;
    private _selected;
    /** The minimum selectable date. */
    minDate: D | null;
    private _minDate;
    /** The maximum selectable date. */
    maxDate: D | null;
    private _maxDate;
    /** A function used to filter which dates are selectable. */
    dateFilter: (date: D, unit?: string) => boolean;
    /** Clock interval */
    clockStep: number;
    /** Clock hour format */
    twelveHour: boolean;
    /** Emits when the currently selected date changes. */
    selectedChange: EventEmitter<D>;
    /** Emits when any date is selected. */
    _userSelection: EventEmitter<void>;
    /** Reference to the current clock view component. */
    clockView: MatClockView<D>;
    /** Reference to the current month view component. */
    monthView: MatMonthView<D>;
    /** Reference to the current year view component. */
    yearView: MatYearView<D>;
    /** Reference to the current years view component. */
    yearsView: MatYearsView<D>;
    /** Date filter for the month and year views. */
    _dateFilterForViews: (date: D, unit?: string) => boolean;
    /**
     * The current active date. This determines which time period is shown and which date is
     * highlighted when using keyboard navigation.
     */
    activeDate: D;
    private _clampedActiveDate;
    /** Whether the calendar is in month view. */
    currentView: MatCalendarView;
    private _currentView;
    /**
     * Emits whenever there is a state change that the header may need to respond to.
     */
    stateChanges: Subject<void>;
    /** Animations handler */
    _animationDir: string;
    /** Whether the active date is AM or not */
    _isAm: boolean;
    /** Whether the calendar process the time. */
    _hasTime: boolean;
    /** Whether the calendar is in hour view. */
    _hourView: boolean;
    /** The label for the calendar header buttons. */
    _yearButtonText: string;
    _dayButtonText: string;
    _monthdayButtonText: string;
    _hourButtonText: string;
    _minuteButtonText: string;
    /** The label for the current calendar view. */
    _periodButtonText: string;
    _periodButtonLabel: string;
    /** The label for the the previous button. */
    _prevButtonLabel: string;
    /** The label for the the next button. */
    _nextButtonLabel: string;
    constructor(_intl: MatDatepickerIntl, _dateAdapter: DateAdapter<D>, _dateFormats: MatDateFormats, changeDetectorRef: ChangeDetectorRef);
    ngAfterContentInit(): void;
    ngAfterViewChecked(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    changeView(view: any, focus?: boolean): void;
    focusActiveCell(): void;
    _submitClicked(): void;
    _cancelClicked(): void;
    /** Handles date selection in the clock view. */
    _timeChanged(date: D): void;
    _timeSelected(date: D): void;
    /** Handles date selection in the month view. */
    _dateSelected(date: D): void;
    /** Handles month selection in the year view. */
    _monthSelected(month: D): void;
    _yearSelected(year: D): void;
    /** Handles user clicks on the period label. */
    _currentPeriodClicked(): void;
    /** Handles user clicks on the previous button. */
    _previousClicked(): void;
    /** Handles user clicks on the next button. */
    _nextClicked(): void;
    /** Handles user clicks on the time labels. */
    _showHourView(): void;
    _showMinuteView(): void;
    _toggleAmPm(am: any): void;
    /** Whether the previous period button is enabled. */
    _previousEnabled(): boolean;
    /** Whether the next period button is enabled. */
    _nextEnabled(): boolean;
    /** Handles calendar diffs. */
    _navCalendar(diff: any): void;
    /** Whether the two dates represent the same view in the current view mode (month or year). */
    private _isSameView;
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    private _getValidDateOrNull;
    /** Returns the component instance that corresponds to the current calendar view. */
    private _getCurrentViewComponent;
}
