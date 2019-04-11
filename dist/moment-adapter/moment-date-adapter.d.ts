/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DateAdapter } from '../core/index';
import * as momentNs from 'moment-timezone';
export declare type Moment = momentNs.Moment;
/** Adapts Moment.js Dates for use with Angular Material. */
export declare class MomentDateAdapter extends DateAdapter<Moment> {
    private _localeData;
    constructor(dateLocale: string);
    setLocale(locale: string): void;
    getYear(date: Moment): number;
    getMonth(date: Moment): number;
    getDate(date: Moment): number;
    getHours(date: Moment): number;
    setHours(date: Moment, value: number): void;
    getMinutes(date: Moment): number;
    setMinutes(date: Moment, value: number): void;
    setSeconds(date: Moment, value: number, ms?: number): void;
    getDayOfWeek(date: Moment): number;
    getMonthNames(style: 'long' | 'short' | 'narrow'): string[];
    getDateNames(): string[];
    getHourNames(): string[];
    getMinuteNames(): string[];
    getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[];
    getYearName(date: Moment): string;
    getFirstDayOfWeek(): number;
    getNumDaysInMonth(date: Moment): number;
    clone(date: Moment): Moment;
    createDate(year: number, month: number, date: number, hours?: number, minutes?: number): Moment;
    today(): Moment;
    parse(value: any, parseFormat: string | string[]): Moment | null;
    format(date: Moment, displayFormat: string): string;
    addCalendarYears(date: Moment, years: number): Moment;
    addCalendarMonths(date: Moment, months: number): Moment;
    addCalendarDays(date: Moment, days: number): Moment;
    addCalendarHours(date: Moment, hours: number): Moment;
    addCalendarMinutes(date: Moment, minutes: number): Moment;
    toIso8601(date: Moment): string;
    /**
     * Returns the given value if given a valid Moment or null. Deserializes valid ISO 8601 strings
     * (https://www.ietf.org/rfc/rfc3339.txt) and valid Date objects into valid Moments and empty
     * string into null. Returns an invalid date for all other values.
     */
    deserialize(value: any): Moment | null;
    isDateInstance(obj: any): boolean;
    isValid(date: Moment): boolean;
    invalid(): Moment;
}
