import { AfterContentInit, ChangeDetectorRef, ElementRef, EventEmitter } from '@angular/core';
import { MatDateFormats } from './core/index';
import { DateAdapter } from './core/index';
export declare const CLOCK_RADIUS = 50;
export declare const CLOCK_INNER_RADIUS = 27.5;
export declare const CLOCK_OUTER_RADIUS = 41.25;
export declare const CLOCK_TICK_RADIUS = 7.0833;
export declare type ClockView = 'hour' | 'minute';
/**
 * A clock that is used as part of the datepicker.
 * @docs-private
 */
export declare class MatClockView<D> implements AfterContentInit {
    private _changeDetectorRef;
    private _element;
    _dateAdapter: DateAdapter<D>;
    private _dateFormats;
    /**
     * The time to display in this clock view. (the rest is ignored)
     */
    activeDate: D;
    private _activeDate;
    selected: D | null;
    private _selected;
    /** The minimum selectable date. */
    minDate: D | null;
    private _minDate;
    /** The maximum selectable date. */
    maxDate: D | null;
    private _maxDate;
    dateFilter: (date: D, unit?: string) => boolean;
    clockStep: number;
    twelveHour: boolean;
    hourView: boolean;
    readonly selectedTime: EventEmitter<D>;
    readonly selectedChange: EventEmitter<D>;
    readonly changeView: EventEmitter<void>;
    _hours: Array<any>;
    _minutes: Array<any>;
    _selectedHour: number | null;
    _selectedMinute: number | null;
    _anteMeridian: boolean;
    private mouseMoveListener;
    private mouseUpListener;
    readonly _hand: any;
    constructor(_changeDetectorRef: ChangeDetectorRef, _element: ElementRef, _dateAdapter: DateAdapter<D>, _dateFormats: MatDateFormats);
    ngAfterContentInit(): void;
    _handleMousedown(event: any): void;
    _handleMousemove(event: any): void;
    _handleMouseup(): void;
    _init(): void;
    private setTime;
    _focusActiveCell(): void;
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    private _getValidDateOrNull;
}
