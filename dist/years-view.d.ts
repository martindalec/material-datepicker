/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AfterContentInit, ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDateFormats } from './core/index';
import { DateAdapter } from './core/index';
/**
 * An internal component used to display a year selector in the datepicker.
 * @docs-private
 */
export declare class MatYearsView<D> implements AfterContentInit, OnDestroy {
    private _changeDetectorRef;
    private element;
    _dateAdapter: DateAdapter<D>;
    private _dateFormats;
    /** The date to display in this view (everything other than the year is ignored). */
    activeDate: D;
    private _activeDate;
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
    /** Emits when a new month is selected. */
    readonly selectedChange: EventEmitter<D>;
    /** List of years. */
    _years: Array<{
        value: number;
        enabled: boolean;
    }>;
    /** The selected year. */
    _selectedYear: number | null;
    /** Scroller subscription. */
    _disposeScroller: Subscription;
    constructor(_changeDetectorRef: ChangeDetectorRef, element: ElementRef, _dateAdapter: DateAdapter<D>, _dateFormats: MatDateFormats);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    abs(value: number): number;
    /** Initializes this year view. */
    _init(): void;
    _populateYears(down?: boolean): void;
    _yearSelected(year: number): void;
    _calculatePoints(): {
        height: any;
        scrolled: any;
        total: any;
    };
    _handleScroll(position: any, lastPosition: any): void;
    /** Handles keydown events on the calendar body when calendar is in multi-year view. */
    _handleCalendarBodyKeydown(event: KeyboardEvent): void;
    _focusActiveCell(): void;
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    private _getValidDateOrNull;
}
