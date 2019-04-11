import { Platform, PlatformModule } from '@angular/cdk/platform';
import { InjectionToken, inject, LOCALE_ID, Injectable, Optional, Inject, NgModule, EventEmitter, Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, Input, Output, defineInjectable, NgZone, ViewChild, ViewContainerRef, forwardRef, Directive, ContentChild } from '@angular/core';
import { Subject, fromEvent, of, Subscription, merge } from 'rxjs';
import * as momentNs from 'moment-timezone';
import { A11yModule } from '@angular/cdk/a11y';
import { Overlay, OverlayConfig, OverlayModule } from '@angular/cdk/overlay';
import { DOCUMENT, CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { trigger, transition, animate, keyframes, style, state, group, query, animateChild } from '@angular/animations';
import { LEFT_ARROW, RIGHT_ARROW, UP_ARROW, DOWN_ARROW, HOME, END, PAGE_UP, PAGE_DOWN, ENTER, ESCAPE } from '@angular/cdk/keycodes';
import { Directionality } from '@angular/cdk/bidi';
import { take, sampleTime, mergeMap, filter } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ComponentPortal } from '@angular/cdk/portal';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, Validators } from '@angular/forms';
import { MAT_INPUT_VALUE_ACCESSOR } from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * InjectionToken for datepicker that can be used to override default locale code.
 * @type {?}
 */
const MAT_DATE_LOCALE = new InjectionToken('MAT_DATE_LOCALE', {
    providedIn: 'root',
    factory: MAT_DATE_LOCALE_FACTORY
});
/**
 * \@docs-private
 * @return {?}
 */
function MAT_DATE_LOCALE_FACTORY() {
    return inject(LOCALE_ID);
}
/**
 * No longer needed since MAT_DATE_LOCALE has been changed to a scoped injectable.
 * If you are importing and providing this in your code you can simply remove it.
 * @deprecated
 * \@deletion-target 7.0.0
 * @type {?}
 */
const MAT_DATE_LOCALE_PROVIDER = { provide: MAT_DATE_LOCALE, useExisting: LOCALE_ID };
/**
 * Adapts type `D` to be usable as a date by cdk-based components that work with dates.
 * @abstract
 * @template D
 */
class DateAdapter {
    constructor() {
        this._localeChanges = new Subject();
    }
    /**
     * A stream that emits when the locale changes.
     * @return {?}
     */
    get localeChanges() {
        return this._localeChanges;
    }
    /**
     * Attempts to deserialize a value to a valid date object. This is different from parsing in that
     * deserialize should only accept non-ambiguous, locale-independent formats (e.g. a ISO 8601
     * string). The default implementation does not allow any deserialization, it simply checks that
     * the given value is already a valid date object or null. The `<mat-datepicker>` will call this
     * method on all of it's `\@Input()` properties that accept dates. It is therefore possible to
     * support passing values from your backend directly to these properties by overriding this method
     * to also deserialize the format used by your backend.
     * @param {?} value The value to be deserialized into a date object.
     * @return {?} The deserialized date object, either a valid date, null if the value can be
     *     deserialized into a null date (e.g. the empty string), or an invalid date.
     */
    deserialize(value) {
        if (value == null || (this.isDateInstance(value) && this.isValid(value))) {
            return value;
        }
        return this.invalid();
    }
    /**
     * Sets the locale used for all dates.
     * @param {?} locale The new locale.
     * @return {?}
     */
    setLocale(locale) {
        this.locale = locale;
        this._localeChanges.next();
    }
    /**
     * Compares two dates.
     * @param {?} first The first date to compare.
     * @param {?} second The second date to compare.
     * @param {?=} unit Unit deep of the comparision.
     * @return {?} 0 if the dates are equal, a number less than 0 if the first date is earlier,
     *     a number greater than 0 if the first date is later.
     */
    compareDate(first, second, unit = 'minute') {
        /** @type {?} */
        let f = this.getYear(first).toString();
        /** @type {?} */
        let s = this.getYear(second).toString();
        if (['y', 'year', 'years'].indexOf(unit) >= 0) {
            return Number(f) - Number(s);
        }
        else {
            f = f.concat(('00' + this.getMonth(first)).slice(-2));
            s = s.concat(('00' + this.getMonth(second)).slice(-2));
        }
        if (['M', 'month', 'months'].indexOf(unit) >= 0) {
            return Number(f) - Number(s);
        }
        else {
            f = f.concat(('00' + this.getDate(first)).slice(-2));
            s = s.concat(('00' + this.getDate(second)).slice(-2));
        }
        if (['d', 'day', 'days'].indexOf(unit) >= 0) {
            return Number(f) - Number(s);
        }
        else {
            f = f.concat(('00' + this.getHours(first)).slice(-2));
            s = s.concat(('00' + this.getHours(second)).slice(-2));
        }
        if (['h', 'hour', 'hours'].indexOf(unit) >= 0) {
            return Number(f) - Number(s);
        }
        else {
            f = f.concat(('00' + this.getMinutes(first)).slice(-2));
            s = s.concat(('00' + this.getMinutes(second)).slice(-2));
        }
        return Number(f) - Number(s);
    }
    /**
     * Checks if two dates are equal.
     * @param {?} first The first date to check.
     * @param {?} second The second date to check.
     * @param {?=} unit Unit deep of the comparision.
     * @return {?} Whether the two dates are equal.
     *     Null dates are considered equal to other null dates.
     */
    sameDate(first, second, unit = 'minute') {
        return first && second ? !this.compareDate(first, second, unit) : first === second;
    }
    /**
     * Clamp the given date between min and max dates.
     * @param {?} date The date to clamp.
     * @param {?=} min The minimum value to allow. If null or omitted no min is enforced.
     * @param {?=} max The maximum value to allow. If null or omitted no max is enforced.
     * @param {?=} unit Unit deep of the comparision.
     * @return {?} `min` if `date` is less than `min`, `max` if date is greater than `max`,
     *     otherwise `date`.
     */
    clampDate(date, min, max, unit = 'minute') {
        if (!date) {
            return null;
        }
        if (min && this.compareDate(date, min, unit) < 0) {
            return min;
        }
        if (max && this.compareDate(date, max, unit) > 0) {
            return max;
        }
        return date;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const MAT_DATE_FORMATS = new InjectionToken('mat-date-formats');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// TODO(mmalerba): Remove when we no longer support safari 9.
/**
 * Whether the browser supports the Intl API.
 * @type {?}
 */
const SUPPORTS_INTL_API = typeof Intl !== 'undefined';
/**
 * The default month names to use if Intl API is not available.
 * @type {?}
 */
const DEFAULT_MONTH_NAMES = {
    long: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ],
    short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
};
const ɵ0 = /**
 * @param {?} i
 * @return {?}
 */
i => String(i + 1);
/**
 * The default date names to use if Intl API is not available.
 * @type {?}
 */
const DEFAULT_DATE_NAMES = range(31, (ɵ0));
/**
 * The default hour names to use if Intl API is not available.
 * @type {?}
 */
const DEFAULT_HOUR_NAMES = range(24, String);
/**
 * The default minute names to use if Intl API is not available.
 * @type {?}
 */
const DEFAULT_MINUTE_NAMES = range(60, String);
/**
 * The default day of the week names to use if Intl API is not available.
 * @type {?}
 */
const DEFAULT_DAY_OF_WEEK_NAMES = {
    long: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
};
/**
 * Matches strings that have the form of a valid RFC 3339 string
 * (https://tools.ietf.org/html/rfc3339). Note that the string may not actually be a valid date
 * because the regex will match strings an with out of bounds month, date, etc.
 * @type {?}
 */
const ISO_8601_REGEX = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|(?:(?:\+|-)\d{2}:\d{2}))?)?$/;
/**
 * Creates an array and fills it with values.
 * @template T
 * @param {?} length
 * @param {?} valueFunction
 * @return {?}
 */
function range(length, valueFunction) {
    /** @type {?} */
    const valuesArray = Array(length);
    for (let i = 0; i < length; i++) {
        valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
}
/**
 * Adapts the native JS Date for use with cdk-based components that work with dates.
 */
class NativeDateAdapter extends DateAdapter {
    /**
     * @param {?} platform
     * @param {?} matDateLocale
     */
    constructor(platform, matDateLocale) {
        super();
        /**
         * Whether to use `timeZone: 'utc'` with `Intl.DateTimeFormat` when formatting dates.
         * Without this `Intl.DateTimeFormat` sometimes chooses the wrong timeZone, which can throw off
         * the result. (e.g. in the en-US locale `new Date(1800, 7, 14).toLocaleDateString()`
         * will produce `'8/13/1800'`.
         *
         * TODO(mmalerba): drop this variable. It's not being used in the code right now. We're now
         * getting the string representation of a Date object from it's utc representation. We're keeping
         * it here for sometime, just for precaution, in case we decide to revert some of these changes
         * though.
         */
        this.useUtcForDisplay = true;
        super.setLocale(matDateLocale);
        // IE does its own time zone correction, so we disable this on IE.
        this.useUtcForDisplay = !platform.TRIDENT;
        this._clampDate = platform.TRIDENT || platform.EDGE;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getYear(date) {
        return date.getFullYear();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getMonth(date) {
        return date.getMonth();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getDate(date) {
        return date.getDate();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getHours(date) {
        return date.getHours();
    }
    /**
     * @param {?} date
     * @param {?} value
     * @return {?}
     */
    setHours(date, value) {
        date.setHours(value);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getMinutes(date) {
        return date.getMinutes();
    }
    /**
     * @param {?} date
     * @param {?} value
     * @return {?}
     */
    setMinutes(date, value) {
        date.setMinutes(value);
    }
    /**
     * @param {?} date
     * @param {?} value
     * @param {?=} ms
     * @return {?}
     */
    setSeconds(date, value, ms) {
        date.setSeconds(value, ms);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getDayOfWeek(date) {
        return date.getDay();
    }
    /**
     * @param {?} style
     * @return {?}
     */
    getMonthNames(style) {
        if (SUPPORTS_INTL_API) {
            /** @type {?} */
            const dtf = new Intl.DateTimeFormat(this.locale, { month: style, timeZone: 'utc' });
            return range(12, (/**
             * @param {?} i
             * @return {?}
             */
            i => this._stripDirectionalityCharacters(this._format(dtf, new Date(2017, i, 1)))));
        }
        return DEFAULT_MONTH_NAMES[style];
    }
    /**
     * @return {?}
     */
    getDateNames() {
        if (SUPPORTS_INTL_API) {
            /** @type {?} */
            const dtf = new Intl.DateTimeFormat(this.locale, { day: 'numeric', timeZone: 'utc' });
            return range(31, (/**
             * @param {?} i
             * @return {?}
             */
            i => this._stripDirectionalityCharacters(this._format(dtf, new Date(2017, 0, i + 1)))));
        }
        return DEFAULT_DATE_NAMES;
    }
    /**
     * @return {?}
     */
    getHourNames() {
        if (SUPPORTS_INTL_API) {
            /** @type {?} */
            const dtf = new Intl.DateTimeFormat(this.locale, { hour: 'numeric', timeZone: 'utc' });
            return range(24, (/**
             * @param {?} i
             * @return {?}
             */
            i => this._stripDirectionalityCharacters(dtf.format(new Date(2017, 0, 0, i)))));
        }
        return DEFAULT_HOUR_NAMES;
    }
    /**
     * @return {?}
     */
    getMinuteNames() {
        if (SUPPORTS_INTL_API) {
            /** @type {?} */
            const dtf = new Intl.DateTimeFormat(this.locale, { minute: 'numeric', timeZone: 'utc' });
            return range(60, (/**
             * @param {?} i
             * @return {?}
             */
            i => this._stripDirectionalityCharacters(dtf.format(new Date(2017, 0, 0, 0, i)))));
        }
        return DEFAULT_MINUTE_NAMES;
    }
    /**
     * @param {?} style
     * @return {?}
     */
    getDayOfWeekNames(style) {
        if (SUPPORTS_INTL_API) {
            /** @type {?} */
            const dtf = new Intl.DateTimeFormat(this.locale, { weekday: style, timeZone: 'utc' });
            return range(7, (/**
             * @param {?} i
             * @return {?}
             */
            i => this._stripDirectionalityCharacters(this._format(dtf, new Date(2017, 0, i + 1)))));
        }
        return DEFAULT_DAY_OF_WEEK_NAMES[style];
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getYearName(date) {
        if (SUPPORTS_INTL_API) {
            /** @type {?} */
            const dtf = new Intl.DateTimeFormat(this.locale, { year: 'numeric', timeZone: 'utc' });
            return this._stripDirectionalityCharacters(this._format(dtf, date));
        }
        return String(this.getYear(date));
    }
    /**
     * @return {?}
     */
    getFirstDayOfWeek() {
        // We can't tell using native JS Date what the first day of the week is, we default to Sunday.
        return 0;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getNumDaysInMonth(date) {
        return this.getDate(this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + 1, 0));
    }
    /**
     * @param {?} date
     * @return {?}
     */
    clone(date) {
        return this.createDate(this.getYear(date), this.getMonth(date), this.getDate(date), this.getHours(date), this.getMinutes(date));
    }
    /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @param {?=} hours
     * @param {?=} minutes
     * @return {?}
     */
    createDate(year, month, date, hours, minutes) {
        // Check for invalid month and date (except upper bound on date which we have to check after
        // creating the Date).
        if (month < 0 || month > 11) {
            throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
        }
        if (date < 1) {
            throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
        }
        /** @type {?} */
        const result = this._createDateWithOverflow(year, month, date, hours, minutes);
        // Check that the date wasn't above the upper bound for the month, causing the month to overflow
        if (result.getMonth() !== month) {
            throw Error(`Invalid date "${date}" for month with index "${month}".`);
        }
        return result;
    }
    /**
     * @return {?}
     */
    today() {
        return new Date();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    parse(value) {
        // We have no way using the native JS Date to set the parse format or locale, so we ignore these
        // parameters.
        if (typeof value === 'number') {
            return new Date(value);
        }
        return value ? new Date(Date.parse(value)) : null;
    }
    /**
     * @param {?} date
     * @param {?} displayFormat
     * @return {?}
     */
    format(date, displayFormat) {
        if (!this.isValid(date)) {
            throw Error('NativeDateAdapter: Cannot format invalid date.');
        }
        if (SUPPORTS_INTL_API) {
            // On IE and Edge the i18n API will throw a hard error that can crash the entire app
            // if we attempt to format a date whose year is less than 1 or greater than 9999.
            if (this._clampDate && (date.getFullYear() < 1 || date.getFullYear() > 9999)) {
                date = this.clone(date);
                date.setFullYear(Math.max(1, Math.min(9999, date.getFullYear())));
            }
            displayFormat = Object.assign({}, displayFormat, { timeZone: 'utc' });
            /** @type {?} */
            const dtf = new Intl.DateTimeFormat(this.locale, displayFormat);
            return this._stripDirectionalityCharacters(this._format(dtf, date));
        }
        return this._stripDirectionalityCharacters(date.toDateString());
    }
    /**
     * @param {?} date
     * @param {?} years
     * @return {?}
     */
    addCalendarYears(date, years) {
        return this.addCalendarMonths(date, years * 12);
    }
    /**
     * @param {?} date
     * @param {?} months
     * @return {?}
     */
    addCalendarMonths(date, months) {
        /** @type {?} */
        let newDate = this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + months, this.getDate(date), this.getHours(date), this.getMinutes(date));
        // It's possible to wind up in the wrong month if the original month has more days than the new
        // month. In this case we want to go to the last day of the desired month.
        // Note: the additional + 12 % 12 ensures we end up with a positive number, since JS % doesn't
        // guarantee this.
        if (this.getMonth(newDate) !== ((this.getMonth(date) + months) % 12 + 12) % 12) {
            newDate = this._createDateWithOverflow(this.getYear(newDate), this.getMonth(newDate), 0);
        }
        return newDate;
    }
    /**
     * @param {?} date
     * @param {?} days
     * @return {?}
     */
    addCalendarDays(date, days) {
        return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date) + days, this.getHours(date), this.getMinutes(date));
    }
    /**
     * @param {?} date
     * @param {?} hours
     * @return {?}
     */
    addCalendarHours(date, hours) {
        return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date), this.getHours(date) + hours, this.getMinutes(date));
    }
    /**
     * @param {?} date
     * @param {?} minutes
     * @return {?}
     */
    addCalendarMinutes(date, minutes) {
        return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date), this.getHours(date), this.getMinutes(date) + minutes);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    toIso8601(date) {
        return [date.getUTCFullYear(), this._2digit(date.getUTCMonth() + 1), this._2digit(date.getUTCDate())].join('-');
    }
    /**
     * Returns the given value if given a valid Date or null. Deserializes valid ISO 8601 strings
     * (https://www.ietf.org/rfc/rfc3339.txt) into valid Dates and empty string into null. Returns an
     * invalid date for all other values.
     * @param {?} value
     * @return {?}
     */
    deserialize(value) {
        if (typeof value === 'string') {
            if (!value) {
                return null;
            }
            // The `Date` constructor accepts formats other than ISO 8601, so we need to make sure the
            // string is the right format first.
            if (ISO_8601_REGEX.test(value)) {
                /** @type {?} */
                let date = new Date(value);
                if (this.isValid(date)) {
                    return date;
                }
            }
        }
        return super.deserialize(value);
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    isDateInstance(obj) {
        return obj instanceof Date;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    isValid(date) {
        return !isNaN(date.getTime());
    }
    /**
     * @return {?}
     */
    invalid() {
        return new Date(NaN);
    }
    /**
     * Creates a date but allows the month and date to overflow.
     * @private
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @param {?=} hours
     * @param {?=} minutes
     * @return {?}
     */
    _createDateWithOverflow(year, month, date, hours, minutes) {
        /** @type {?} */
        const result = new Date(year, month, date, hours, minutes, 0);
        // We need to correct for the fact that JS native Date treats years in range [0, 99] as
        // abbreviations for 19xx.
        if (year >= 0 && year < 100) {
            result.setFullYear(this.getYear(result) - 1900);
        }
        return result;
    }
    /**
     * Pads a number to make it two digits.
     * @private
     * @param {?} n The number to pad.
     * @return {?} The padded number.
     */
    _2digit(n) {
        return ('00' + n).slice(-2);
    }
    /**
     * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
     * other browsers do not. We remove them to make output consistent and because they interfere with
     * date parsing.
     * @private
     * @param {?} str The string to strip direction characters from.
     * @return {?} The stripped string.
     */
    _stripDirectionalityCharacters(str) {
        return str.replace(/[\u200e\u200f]/g, '');
    }
    /**
     * When converting Date object to string, javascript built-in functions may return wrong
     * results because it applies its internal DST rules. The DST rules around the world change
     * very frequently, and the current valid rule is not always valid in previous years though.
     * We work around this problem building a new Date object which has its internal UTC
     * representation with the local date and time.
     * @private
     * @param {?} dtf Intl.DateTimeFormat object, containg the desired string format. It must have
     *    timeZone set to 'utc' to work fine.
     * @param {?} date Date from which we want to get the string representation according to dtf
     * @return {?} A Date object with its UTC representation based on the passed in date info
     */
    _format(dtf, date) {
        /** @type {?} */
        const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
        return dtf.format(d);
    }
}
NativeDateAdapter.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NativeDateAdapter.ctorParameters = () => [
    { type: Platform },
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [MAT_DATE_LOCALE,] }] }
];

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
/** @type {?} */
const MAT_NATIVE_DATE_FORMATS = {
    parse: {
        date: null,
        datetime: null,
        time: null
    },
    display: {
        date: { year: 'numeric', month: 'numeric', day: 'numeric' },
        datetime: {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hours: 'numeric',
            minutes: 'numeric'
        },
        time: { hours: 'numeric', minutes: 'numeric' },
        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthDayLabel: { month: 'short', day: 'numeric' },
        monthDayA11yLabel: { month: 'long', day: 'numeric' },
        monthYearLabel: { year: 'numeric', month: 'short' },
        monthYearA11yLabel: { year: 'numeric', month: 'long' },
        timeLabel: { hours: 'numeric', minutes: 'numeric' }
    }
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NativeDateModule {
}
NativeDateModule.decorators = [
    { type: NgModule, args: [{
                imports: [PlatformModule],
                providers: [{ provide: DateAdapter, useClass: NativeDateAdapter }]
            },] }
];
const ɵ0$1 = MAT_NATIVE_DATE_FORMATS;
class MatNativeDateModule {
}
MatNativeDateModule.decorators = [
    { type: NgModule, args: [{
                imports: [NativeDateModule],
                providers: [{ provide: MAT_DATE_FORMATS, useValue: ɵ0$1 }]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const moment = momentNs;
/**
 * Creates an array and fills it with values.
 * @template T
 * @param {?} length
 * @param {?} valueFunction
 * @return {?}
 */
function range$1(length, valueFunction) {
    /** @type {?} */
    const valuesArray = Array(length);
    for (let i = 0; i < length; i++) {
        valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
}
/**
 * Adapts Moment.js Dates for use with Angular Material.
 */
class MomentDateAdapter extends DateAdapter {
    /**
     * @param {?} dateLocale
     */
    constructor(dateLocale) {
        super();
        this.setLocale(dateLocale || moment.locale());
    }
    /**
     * @param {?} locale
     * @return {?}
     */
    setLocale(locale) {
        super.setLocale(locale);
        /** @type {?} */
        const momentLocaleData = moment.localeData(locale);
        this._localeData = {
            firstDayOfWeek: momentLocaleData.firstDayOfWeek(),
            longMonths: momentLocaleData.months(),
            shortMonths: momentLocaleData.monthsShort(),
            dates: range$1(31, (/**
             * @param {?} i
             * @return {?}
             */
            i => this.createDate(2017, 0, i + 1).format('D'))),
            longDaysOfWeek: momentLocaleData.weekdays(),
            shortDaysOfWeek: momentLocaleData.weekdaysShort(),
            narrowDaysOfWeek: momentLocaleData.weekdaysMin()
        };
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getYear(date) {
        return this.clone(date).year();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getMonth(date) {
        return this.clone(date).month();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getDate(date) {
        return this.clone(date).date();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getHours(date) {
        return this.clone(date).hours();
    }
    /**
     * @param {?} date
     * @param {?} value
     * @return {?}
     */
    setHours(date, value) {
        date.hours(value);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getMinutes(date) {
        return this.clone(date).minutes();
    }
    /**
     * @param {?} date
     * @param {?} value
     * @return {?}
     */
    setMinutes(date, value) {
        date.minutes(value);
    }
    /**
     * @param {?} date
     * @param {?} value
     * @param {?=} ms
     * @return {?}
     */
    setSeconds(date, value, ms) {
        date.seconds(value);
        if (ms) {
            date.milliseconds(ms);
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getDayOfWeek(date) {
        return this.clone(date).day();
    }
    /**
     * @param {?} style
     * @return {?}
     */
    getMonthNames(style) {
        // Moment.js doesn't support narrow month names, so we just use short if narrow is requested.
        return style === 'long' ? this._localeData.longMonths : this._localeData.shortMonths;
    }
    /**
     * @return {?}
     */
    getDateNames() {
        return this._localeData.dates;
    }
    /**
     * @return {?}
     */
    getHourNames() {
        // TODO SUPPORTS_INTL_API
        return range$1(24, String);
    }
    /**
     * @return {?}
     */
    getMinuteNames() {
        // TODO SUPPORTS_INTL_API
        return range$1(60, String);
    }
    /**
     * @param {?} style
     * @return {?}
     */
    getDayOfWeekNames(style) {
        if (style === 'long') {
            return this._localeData.longDaysOfWeek;
        }
        if (style === 'short') {
            return this._localeData.shortDaysOfWeek;
        }
        return this._localeData.narrowDaysOfWeek;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getYearName(date) {
        return this.clone(date).format('YYYY');
    }
    /**
     * @return {?}
     */
    getFirstDayOfWeek() {
        return this._localeData.firstDayOfWeek;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getNumDaysInMonth(date) {
        return this.clone(date).daysInMonth();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    clone(date) {
        /** @type {?} */
        const obj = date ? moment(date) : moment();
        return obj.locale(this.locale);
    }
    /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @param {?=} hours
     * @param {?=} minutes
     * @return {?}
     */
    createDate(year, month, date, hours, minutes) {
        // Moment.js will create an invalid date if any of the components are out of bounds, but we
        // explicitly check each case so we can throw more descriptive errors.
        if (month < 0 || month > 11) {
            throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
        }
        if (date < 1) {
            throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
        }
        /** @type {?} */
        const result = moment({ year, month, date, hours, minutes, seconds: 0 });
        // If the result isn't valid, the date must have been out of bounds for this month.
        if (!result.isValid()) {
            throw Error(`Invalid date "${date}" for month with index "${month}".`);
        }
        return result.locale(this.locale);
    }
    /**
     * @return {?}
     */
    today() {
        return moment().locale(this.locale);
    }
    /**
     * @param {?} value
     * @param {?} parseFormat
     * @return {?}
     */
    parse(value, parseFormat) {
        if (parseFormat && value && typeof value === 'string') {
            return moment(value, parseFormat, this.locale, true);
        }
        return value ? moment(value).locale(this.locale) : null;
    }
    /**
     * @param {?} date
     * @param {?} displayFormat
     * @return {?}
     */
    format(date, displayFormat) {
        date = this.clone(date);
        if (!this.isValid(date)) {
            throw Error('MomentDateAdapter: Cannot format invalid date.');
        }
        return date.format(displayFormat);
    }
    /**
     * @param {?} date
     * @param {?} years
     * @return {?}
     */
    addCalendarYears(date, years) {
        return this.clone(date).add({ years });
    }
    /**
     * @param {?} date
     * @param {?} months
     * @return {?}
     */
    addCalendarMonths(date, months) {
        return this.clone(date).add({ months });
    }
    /**
     * @param {?} date
     * @param {?} days
     * @return {?}
     */
    addCalendarDays(date, days) {
        return this.clone(date).add({ days });
    }
    /**
     * @param {?} date
     * @param {?} hours
     * @return {?}
     */
    addCalendarHours(date, hours) {
        return this.clone(date).add({ hours });
    }
    /**
     * @param {?} date
     * @param {?} minutes
     * @return {?}
     */
    addCalendarMinutes(date, minutes) {
        return this.clone(date).add({ minutes });
    }
    /**
     * @param {?} date
     * @return {?}
     */
    toIso8601(date) {
        return this.clone(date).format();
    }
    /**
     * Returns the given value if given a valid Moment or null. Deserializes valid ISO 8601 strings
     * (https://www.ietf.org/rfc/rfc3339.txt) and valid Date objects into valid Moments and empty
     * string into null. Returns an invalid date for all other values.
     * @param {?} value
     * @return {?}
     */
    deserialize(value) {
        /** @type {?} */
        let date;
        if (value instanceof Date) {
            date = moment(value);
        }
        if (typeof value === 'string') {
            if (!value) {
                return null;
            }
            date = moment(value, moment.ISO_8601).locale(this.locale);
        }
        if (date && this.isValid(date)) {
            return date;
        }
        return super.deserialize(value);
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    isDateInstance(obj) {
        return moment.isMoment(obj) ? this.clone(obj).isValid() : moment(obj).isValid();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    isValid(date) {
        return this.clone(date).isValid();
    }
    /**
     * @return {?}
     */
    invalid() {
        return moment.invalid();
    }
}
MomentDateAdapter.decorators = [
    { type: Injectable }
];
/** @nocollapse */
MomentDateAdapter.ctorParameters = () => [
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [MAT_DATE_LOCALE,] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** @type {?} */
const MAT_MOMENT_DATE_FORMATS = {
    parse: {
        date: ['YYYY-MM-DD', 'YYYY/MM/DD', 'll'],
        datetime: ['YYYY-MM-DD HH:mm', 'YYYY/MM/DD HH:mm', 'll h:mma'],
        time: ['H:mm', 'HH:mm', 'h:mm a', 'hh:mm a']
    },
    display: {
        date: 'll',
        datetime: 'll h:mma',
        time: 'h:mm a',
        dateA11yLabel: 'LL',
        monthDayLabel: 'MMM D',
        monthDayA11yLabel: 'MMMM D',
        monthYearLabel: 'MMMM YYYY',
        monthYearA11yLabel: 'MMMM YYYY',
        timeLabel: 'HH:mm'
    }
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MomentDateModule {
}
MomentDateModule.decorators = [
    { type: NgModule, args: [{
                providers: [{ provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] }]
            },] }
];
const ɵ0$2 = MAT_MOMENT_DATE_FORMATS;
class MatMomentDateModule {
}
MatMomentDateModule.decorators = [
    { type: NgModule, args: [{
                imports: [MomentDateModule],
                providers: [{ provide: MAT_DATE_FORMATS, useValue: ɵ0$2 }]
            },] }
];

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
/**
 * \@docs-private
 * @param {?} provider
 * @return {?}
 */
function createMissingDateImplError(provider) {
    return Error(`MatDatepicker: No provider found for ${provider}. You must import one of the following ` +
        `modules at your application root: MatNativeDateModule, MatMomentDateModule ` +
        `or provide a custom implementation.`);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const CLOCK_RADIUS = 50;
/** @type {?} */
const CLOCK_INNER_RADIUS = 27.5;
/** @type {?} */
const CLOCK_OUTER_RADIUS = 41.25;
/** @type {?} */
const CLOCK_TICK_RADIUS = 7.0833;
/**
 * A clock that is used as part of the datepicker.
 * \@docs-private
 * @template D
 */
class MatClockView {
    /**
     * @param {?} _changeDetectorRef
     * @param {?} _element
     * @param {?} _dateAdapter
     * @param {?} _dateFormats
     */
    constructor(_changeDetectorRef, _element, _dateAdapter, _dateFormats) {
        this._changeDetectorRef = _changeDetectorRef;
        this._element = _element;
        this._dateAdapter = _dateAdapter;
        this._dateFormats = _dateFormats;
        this.clockStep = 1;
        this.twelveHour = false;
        // Whether the clock is in hour view.
        this.hourView = true;
        // Emits when the final time was selected.
        this.selectedTime = new EventEmitter();
        // Emits when the currently selected date changes.
        this.selectedChange = new EventEmitter();
        // Emits when the currently selected date changes.
        this.changeView = new EventEmitter();
        // Hours and Minutes representing the clock view.
        this._hours = [];
        this._minutes = [];
        if (!this._dateAdapter) {
            throw createMissingDateImplError('DateAdapter');
        }
        if (!this._dateFormats) {
            throw createMissingDateImplError('MAT_DATE_FORMATS');
        }
        this.mouseMoveListener = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this._handleMousemove(event);
        });
        this.mouseUpListener = (/**
         * @return {?}
         */
        () => {
            this._handleMouseup();
        });
    }
    /**
     * The time to display in this clock view. (the rest is ignored)
     * @return {?}
     */
    get activeDate() {
        return this._activeDate;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set activeDate(value) {
        /** @type {?} */
        const oldActiveDate = this._activeDate;
        /** @type {?} */
        const validDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value)) || this._dateAdapter.today();
        this._activeDate = this._dateAdapter.clampDate(validDate, this.minDate, this.maxDate);
        if (oldActiveDate && this._dateAdapter.compareDate(oldActiveDate, this._activeDate, 'minute')) {
            this._init();
        }
    }
    // The currently selected date.
    /**
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
     * @return {?}
     */
    get _hand() {
        this._selectedHour = this._dateAdapter.getHours(this.activeDate);
        this._selectedMinute = this._dateAdapter.getMinutes(this.activeDate);
        /** @type {?} */
        let radius = CLOCK_OUTER_RADIUS;
        /** @type {?} */
        let deg = 0;
        if (this.twelveHour) {
            this._selectedHour = this._selectedHour < 12 ? this._selectedHour : this._selectedHour - 12;
            this._selectedHour = this._selectedHour === 0 ? 12 : this._selectedHour;
        }
        if (this.hourView) {
            /** @type {?} */
            const outer = this._selectedHour > 0 && this._selectedHour < 13;
            radius = outer ? CLOCK_OUTER_RADIUS : CLOCK_INNER_RADIUS;
            if (this.twelveHour) {
                radius = CLOCK_OUTER_RADIUS;
            }
            deg = Math.round(this._selectedHour * (360 / (24 / 2)));
        }
        else {
            deg = Math.round(this._selectedMinute * (360 / 60));
        }
        return {
            transform: `rotate(${deg}deg)`,
            height: `${radius}%`,
            'margin-top': `${50 - radius}%`
        };
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._init();
    }
    // Handles mousedown events on the clock body.
    /**
     * @param {?} event
     * @return {?}
     */
    _handleMousedown(event) {
        this.setTime(event);
        document.addEventListener('mousemove', this.mouseMoveListener);
        document.addEventListener('touchmove', this.mouseMoveListener);
        document.addEventListener('mouseup', this.mouseUpListener);
        document.addEventListener('touchend', this.mouseUpListener);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _handleMousemove(event) {
        event.preventDefault();
        this.setTime(event);
    }
    /**
     * @return {?}
     */
    _handleMouseup() {
        document.removeEventListener('mousemove', this.mouseMoveListener);
        document.removeEventListener('touchmove', this.mouseMoveListener);
        document.removeEventListener('mouseup', this.mouseUpListener);
        document.removeEventListener('touchend', this.mouseUpListener);
    }
    // Initializes this clock view.
    /**
     * @return {?}
     */
    _init() {
        this._hours.length = 0;
        this._minutes.length = 0;
        /** @type {?} */
        const hourNames = this._dateAdapter.getHourNames();
        /** @type {?} */
        const minuteNames = this._dateAdapter.getMinuteNames();
        if (this.twelveHour) {
            this._anteMeridian = this._dateAdapter.getHours(this.activeDate) < 12;
            for (let i = 0; i < hourNames.length / 2; i++) {
                /** @type {?} */
                const radian = i / 6 * Math.PI;
                /** @type {?} */
                const radius = CLOCK_OUTER_RADIUS;
                /** @type {?} */
                const date = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), this._dateAdapter.getMonth(this.activeDate), this._dateAdapter.getDate(this.activeDate), this._anteMeridian ? i : i + 12);
                this._hours.push({
                    value: i,
                    displayValue: i === 0 ? '12' : hourNames[i],
                    enabled: !this.dateFilter || this.dateFilter(date, 'hour'),
                    top: CLOCK_RADIUS - Math.cos(radian) * radius - CLOCK_TICK_RADIUS,
                    left: CLOCK_RADIUS + Math.sin(radian) * radius - CLOCK_TICK_RADIUS
                });
            }
        }
        else {
            for (let i = 0; i < hourNames.length; i++) {
                /** @type {?} */
                const radian = i / 6 * Math.PI;
                /** @type {?} */
                const outer = i > 0 && i < 13;
                /** @type {?} */
                const radius = outer ? CLOCK_OUTER_RADIUS : CLOCK_INNER_RADIUS;
                /** @type {?} */
                const date = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), this._dateAdapter.getMonth(this.activeDate), this._dateAdapter.getDate(this.activeDate), i);
                this._hours.push({
                    value: i,
                    displayValue: i === 0 ? '12' : hourNames[i],
                    enabled: !this.dateFilter || this.dateFilter(date, 'hour'),
                    top: CLOCK_RADIUS - Math.cos(radian) * radius - CLOCK_TICK_RADIUS,
                    left: CLOCK_RADIUS + Math.sin(radian) * radius - CLOCK_TICK_RADIUS,
                    fontSize: i > 0 && i < 13 ? '' : '80%'
                });
            }
        }
        for (let i = 0; i < minuteNames.length; i += 5) {
            /** @type {?} */
            const radian = i / 30 * Math.PI;
            /** @type {?} */
            const date = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), this._dateAdapter.getMonth(this.activeDate), this._dateAdapter.getDate(this.activeDate), this._dateAdapter.getHours(this.activeDate), i);
            this._minutes.push({
                value: i,
                displayValue: i === 0 ? '00' : minuteNames[i],
                enabled: !this.dateFilter || this.dateFilter(date, 'minute'),
                top: CLOCK_RADIUS - Math.cos(radian) * CLOCK_OUTER_RADIUS - CLOCK_TICK_RADIUS,
                left: CLOCK_RADIUS + Math.sin(radian) * CLOCK_OUTER_RADIUS - CLOCK_TICK_RADIUS
            });
        }
        this._changeDetectorRef.markForCheck();
    }
    // Set Time
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    setTime(event) {
        /** @type {?} */
        const trigger = this._element.nativeElement;
        /** @type {?} */
        const triggerRect = trigger.getBoundingClientRect();
        /** @type {?} */
        const width = trigger.offsetWidth;
        /** @type {?} */
        const height = trigger.offsetHeight;
        /** @type {?} */
        const pageX = event.pageX !== undefined ? event.pageX : event.touches[0].pageX;
        /** @type {?} */
        const pageY = event.pageY !== undefined ? event.pageY : event.touches[0].pageY;
        /** @type {?} */
        const x = width / 2 - (pageX - triggerRect.left - window.pageXOffset);
        /** @type {?} */
        const y = height / 2 - (pageY - triggerRect.top - window.pageYOffset);
        /** @type {?} */
        const unit = Math.PI / (this.hourView ? 6 : this.clockStep ? 30 / this.clockStep : 30);
        /** @type {?} */
        const z = Math.sqrt(x * x + y * y);
        /** @type {?} */
        const outer = this.hourView && z > (width * (CLOCK_OUTER_RADIUS / 100) + width * (CLOCK_INNER_RADIUS / 100)) / 2;
        /** @type {?} */
        let radian = Math.atan2(-x, y);
        if (radian < 0) {
            radian = Math.PI * 2 + radian;
        }
        /** @type {?} */
        let value = Math.round(radian / unit);
        /** @type {?} */
        const date = this._dateAdapter.clone(this.activeDate);
        if (this.hourView) {
            if (value === 12) {
                value = 0;
            }
            value = this.twelveHour
                ? this._anteMeridian ? value : value + 12
                : outer ? (value === 0 ? 12 : value) : value === 0 ? 0 : value + 12;
            this._dateAdapter.setHours(date, value);
        }
        else {
            if (this.clockStep) {
                value *= this.clockStep;
            }
            if (value === 60) {
                value = 0;
            }
            this._dateAdapter.setMinutes(date, value);
        }
        // validate if the resulting value is disabled and do not take action
        if (this.dateFilter && !this.dateFilter(date, this.hourView ? 'hour' : 'minute')) {
            return;
        }
        this.activeDate = date;
        if (this.hourView) {
            this.changeView.emit();
            this.selectedChange.emit(this.activeDate);
        }
        else {
            this.selectedTime.emit(this.activeDate);
        }
    }
    /**
     * @return {?}
     */
    _focusActiveCell() { }
    /**
     * @private
     * @param {?} obj The object to check.
     * @return {?} The given object if it is both a date instance and valid, otherwise null.
     */
    _getValidDateOrNull(obj) {
        return this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj) ? obj : null;
    }
}
MatClockView.decorators = [
    { type: Component, args: [{
                selector: 'mat-clock-view',
                template: "<div class=\"mat-clock\">\r\n  <div class=\"mat-clock-center\"></div>\r\n  <div class=\"mat-clock-hand\" [ngStyle]=\"_hand\"></div>\r\n\r\n  <div class=\"mat-clock-hours\" [class.active]=\"hourView\">\r\n    <div *ngFor=\"let item of _hours\"\r\n      class=\"mat-clock-cell\"\r\n      [class.mat-clock-cell-selected]=\"_selectedHour == item.value\"\r\n      [class.mat-clock-cell-disabled]=\"!item.enabled\"\r\n      [style.top.%]=\"item.top\"\r\n      [style.left.%]=\"item.left\"\r\n      [style.fontSize]=\"item.fontSize\">\r\n      {{ item.displayValue }}\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"mat-clock-minutes\" [class.active]=\"!hourView\">\r\n    <div *ngFor=\"let item of _minutes\"\r\n      class=\"mat-clock-cell\"\r\n      [class.mat-clock-cell-selected]=\"_selectedMinute == item.value\"\r\n      [class.mat-clock-cell-disabled]=\"!item.enabled\"\r\n      [style.top.%]=\"item.top\"\r\n      [style.left.%]=\"item.left\">\r\n      {{ item.displayValue }}\r\n    </div>\r\n  </div>\r\n</div>\r\n",
                exportAs: 'matClockView',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    role: 'clock',
                    '(mousedown)': '_handleMousedown($event)'
                },
                preserveWhitespaces: false
            }] }
];
/** @nocollapse */
MatClockView.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: DateAdapter, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_DATE_FORMATS,] }] }
];
MatClockView.propDecorators = {
    activeDate: [{ type: Input }],
    selected: [{ type: Input }],
    minDate: [{ type: Input }],
    maxDate: [{ type: Input }],
    dateFilter: [{ type: Input }],
    clockStep: [{ type: Input }],
    twelveHour: [{ type: Input }],
    hourView: [{ type: Input }],
    selectedTime: [{ type: Output }],
    selectedChange: [{ type: Output }],
    changeView: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const slideCalendar = trigger('slideCalendar', [
    transition('* => left', [
        animate(180, keyframes([
            style({ transform: 'translateX(50%)', offset: 0.5, opacity: 0 }),
            style({ transform: 'translateX(-50%)', offset: 0.51, opacity: 0 }),
            style({ transform: 'translateX(0)', offset: 1, opacity: 1 })
        ]))
    ]),
    transition('* => right', [
        animate(180, keyframes([
            style({ transform: 'translateX(-50%)', offset: 0.5, opacity: 0 }),
            style({ transform: 'translateX(50%)', offset: 0.51, opacity: 0 }),
            style({ transform: 'translateX(0)', offset: 1, opacity: 1 })
        ]))
    ])
]);
/** @type {?} */
const controlActive = trigger('controlActive', [
    transition('* => active', [
        animate('0.4s linear', keyframes([
            style({ transform: 'scale(0.9)' }),
            style({ transform: 'scale(1.1)' }),
            style({ transform: 'scale(1)' })
        ]))
    ])
]);
/** @type {?} */
const transformPanel = trigger('transformPanel', [
    state('void', style({ opacity: 0, transform: 'scale(1, 0)' })),
    state('enter', style({ opacity: 1, transform: 'scale(1, 1)' })),
    transition('void => enter', group([
        query('@fadeInCalendar', animateChild()),
        animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')
    ])),
    transition('* => void', animate('100ms linear', style({ opacity: 0 })))
]);
/** @type {?} */
const fadeInCalendar = trigger('fadeInCalendar', [
    state('void', style({ opacity: 0 })),
    state('enter', style({ opacity: 1 })),
    transition('void => *', animate('400ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)'))
]);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Datepicker data that requires internationalization.
 */
class MatDatepickerIntl {
    constructor() {
        /**
         * Stream that emits whenever the labels here are changed. Use this to notify
         * components if the labels have changed after initialization.
         */
        this.changes = new Subject();
        /**
         * A label for the calendar popup (used by screen readers).
         */
        this.calendarLabel = 'Calendar';
        /**
         * A label for the button used to open the calendar popup (used by screen readers).
         */
        this.openCalendarLabel = 'Open calendar';
        /**
         * A label for the previous month button (used by screen readers).
         */
        this.prevMonthLabel = 'Previous month';
        /**
         * A label for the next month button (used by screen readers).
         */
        this.nextMonthLabel = 'Next month';
        /**
         * A label for the previous year button (used by screen readers).
         */
        this.prevYearLabel = 'Previous year';
        /**
         * A label for the next year button (used by screen readers).
         */
        this.nextYearLabel = 'Next year';
        /**
         * A label for the 'AM' button (used by screen readers).
         */
        this.setToAMLabel = 'Set date to AM';
        /**
         * A label for the 'PM' button (used by screen readers).
         */
        this.setToPMLabel = 'Set date to PM';
        /**
         * A label for the 'switch to minute view' button (used by screen readers).
         */
        this.switchToMinuteViewLabel = 'Change to minute view';
        /**
         * A label for the 'switch to hour view' button (used by screen readers).
         */
        this.switchToHourViewLabel = 'Change to hour view';
        /**
         * A label for the 'switch to month view' button (used by screen readers).
         */
        this.switchToMonthViewLabel = 'Change to month view';
        /**
         * A label for the 'switch to year view' button (used by screen readers).
         */
        this.switchToYearViewLabel = 'Change to year view';
        /**
         * A label for the 'switch to years view' button (used by screen readers).
         */
        this.switchToYearsViewLabel = 'Change to years view';
        /**
         * Text for the 'submit' button.
         */
        this.buttonSubmitText = 'Ok';
        /**
         * A label for the 'submit' button (used by screen readers).
         */
        this.buttonSubmitLabel = 'Choose the current date';
        /**
         * Text for the 'cancel' button.
         */
        this.buttonCancelText = 'Cancel';
        /**
         * A label for the 'cancel' button (used by screen readers).
         */
        this.buttonCancelLabel = 'Cancel the date selection';
    }
}
MatDatepickerIntl.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ MatDatepickerIntl.ngInjectableDef = defineInjectable({ factory: function MatDatepickerIntl_Factory() { return new MatDatepickerIntl(); }, token: MatDatepickerIntl, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * An internal class that represents the data corresponding to a single calendar cell.
 * \@docs-private
 */
class MatCalendarCell {
    /**
     * @param {?} value
     * @param {?} displayValue
     * @param {?} ariaLabel
     * @param {?} enabled
     */
    constructor(value, displayValue, ariaLabel, enabled) {
        this.value = value;
        this.displayValue = displayValue;
        this.ariaLabel = ariaLabel;
        this.enabled = enabled;
    }
}
/**
 * An internal component used to display calendar data in a table.
 * \@docs-private
 */
class MatCalendarBody {
    /**
     * @param {?} _elementRef
     * @param {?} _ngZone
     */
    constructor(_elementRef, _ngZone) {
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
        /**
         * The number of columns in the table.
         */
        this.numCols = 7;
        /**
         * Whether to allow selection of disabled cells.
         */
        this.allowDisabledSelection = false;
        /**
         * The cell number of the active cell in the table.
         */
        this.activeCell = 0;
        /**
         * The aspect ratio (width / height) to use for the cells in the table. This aspect ratio will be
         * maintained even as the table resizes.
         */
        this.cellAspectRatio = 0.55;
        /**
         * Emits when a new value is selected.
         */
        this.selectedValueChange = new EventEmitter();
    }
    /**
     * @param {?} cell
     * @return {?}
     */
    _cellClicked(cell) {
        if (!this.allowDisabledSelection && !cell.enabled) {
            return;
        }
        this.selectedValueChange.emit(cell.value);
    }
    /**
     * The number of blank cells to put at the beginning for the first row.
     * @return {?}
     */
    get _firstRowOffset() {
        return this.rows && this.rows.length && this.rows[0].length
            ? this.numCols - this.rows[0].length
            : 0;
    }
    /**
     * @param {?} rowIndex
     * @param {?} colIndex
     * @return {?}
     */
    _isActiveCell(rowIndex, colIndex) {
        /** @type {?} */
        let cellNumber = rowIndex * this.numCols + colIndex;
        // Account for the fact that the first row may not have as many cells.
        if (rowIndex) {
            cellNumber -= this._firstRowOffset;
        }
        return cellNumber === this.activeCell;
    }
    /**
     * Focuses the active cell after the microtask queue is empty.
     * @return {?}
     */
    _focusActiveCell() {
        this._ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this._ngZone.onStable
                .asObservable()
                .pipe(take(1))
                .subscribe((/**
             * @return {?}
             */
            () => {
                this._elementRef.nativeElement.querySelector('.mat-calendar-body-active').focus();
            }));
        }));
    }
}
MatCalendarBody.decorators = [
    { type: Component, args: [{
                selector: '[mat-calendar-body]',
                template: "<!--\r\n  If there's not enough space in the first row, create a separate label row. We mark this row as\r\n  aria-hidden because we don't want it to be read out as one of the weeks in the month.\r\n-->\r\n<tr *ngIf=\"label && _firstRowOffset < labelMinRequiredCells\" aria-hidden=\"true\">\r\n  <td class=\"mat-calendar-body-label\"\r\n      [attr.colspan]=\"numCols\"\r\n      [style.paddingTop.%]=\"50 * cellAspectRatio / numCols\"\r\n      [style.paddingBottom.%]=\"50 * cellAspectRatio / numCols\">\r\n    {{ label }}\r\n  </td>\r\n</tr>\r\n\r\n<!-- Create the first row separately so we can include a special spacer cell. -->\r\n<tr *ngFor=\"let row of rows; let rowIndex = index\" role=\"row\">\r\n  <!--\r\n    We mark this cell as aria-hidden so it doesn't get read out as one of the days in the week.\r\n    The aspect ratio of the table cells is maintained by setting the top and bottom padding as a\r\n    percentage of the width (a variant of the trick described here:\r\n    https://www.w3schools.com/howto/howto_css_aspect_ratio.asp).\r\n  -->\r\n  <td *ngIf=\"rowIndex === 0 && _firstRowOffset\"\r\n      aria-hidden=\"true\"\r\n      class=\"mat-calendar-body-label\"\r\n      [attr.colspan]=\"_firstRowOffset\"\r\n      [style.paddingTop.%]=\"50 * cellAspectRatio / numCols\"\r\n      [style.paddingBottom.%]=\"50 * cellAspectRatio / numCols\">\r\n    {{ _firstRowOffset >= labelMinRequiredCells ? label : '' }}\r\n  </td>\r\n  <td *ngFor=\"let item of row; let colIndex = index\"\r\n      role=\"gridcell\"\r\n      class=\"mat-calendar-body-cell\"\r\n      [tabindex]=\"_isActiveCell(rowIndex, colIndex) ? 0 : -1\"\r\n      [class.mat-calendar-body-disabled]=\"!item.enabled\"\r\n      [class.mat-calendar-body-active]=\"_isActiveCell(rowIndex, colIndex)\"\r\n      [attr.aria-label]=\"item.ariaLabel\"\r\n      [attr.aria-disabled]=\"!item.enabled || null\"\r\n      (click)=\"_cellClicked(item)\"\r\n      [style.width.%]=\"100 / numCols\"\r\n      [style.paddingTop.%]=\"50 * cellAspectRatio / numCols\"\r\n      [style.paddingBottom.%]=\"50 * cellAspectRatio / numCols\">\r\n    <div class=\"mat-calendar-body-cell-background\"\r\n         [class.mat-calendar-body-selected]=\"selectedValue === item.value\"\r\n         [class.mat-calendar-body-active]=\"activeValue === item.value\"\r\n         [class.mat-calendar-body-today]=\"todayValue === item.value\">\r\n    </div>\r\n    <span class=\"mat-calendar-body-cell-content\">{{ item.displayValue }}</span>\r\n  </td>\r\n</tr>\r\n",
                // styleUrls: ['calendar-body.scss'],
                host: {
                    class: 'mat-calendar-body',
                    role: 'grid',
                    'attr.aria-readonly': 'true'
                },
                exportAs: 'matCalendarBody',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false
            }] }
];
/** @nocollapse */
MatCalendarBody.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone }
];
MatCalendarBody.propDecorators = {
    label: [{ type: Input }],
    rows: [{ type: Input }],
    todayValue: [{ type: Input }],
    activeValue: [{ type: Input }],
    selectedValue: [{ type: Input }],
    labelMinRequiredCells: [{ type: Input }],
    numCols: [{ type: Input }],
    allowDisabledSelection: [{ type: Input }],
    activeCell: [{ type: Input }],
    cellAspectRatio: [{ type: Input }],
    selectedValueChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const DAYS_PER_WEEK = 7;
/**
 * An internal component used to display a single month in the datepicker.
 * \@docs-private
 * @template D
 */
class MatMonthView {
    /**
     * @param {?} _changeDetectorRef
     * @param {?} _dateFormats
     * @param {?} _dateAdapter
     * @param {?=} _dir
     */
    constructor(_changeDetectorRef, _dateFormats, _dateAdapter, _dir) {
        this._changeDetectorRef = _changeDetectorRef;
        this._dateFormats = _dateFormats;
        this._dateAdapter = _dateAdapter;
        this._dir = _dir;
        /**
         * Emits when a new date is selected.
         */
        this.selectedChange = new EventEmitter();
        /**
         * Emits when any date is selected.
         */
        this._userSelection = new EventEmitter();
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
        /** @type {?} */
        const firstDayOfWeek = this._dateAdapter.getFirstDayOfWeek();
        /** @type {?} */
        const narrowWeekdays = this._dateAdapter.getDayOfWeekNames('narrow');
        /** @type {?} */
        const longWeekdays = this._dateAdapter.getDayOfWeekNames('long');
        // Rotate the labels for days of the week based on the configured first day of the week.
        /** @type {?} */
        const weekdays = longWeekdays.map((/**
         * @param {?} long
         * @param {?} i
         * @return {?}
         */
        (long, i) => {
            return { long, narrow: narrowWeekdays[i].slice(0, 1) };
        }));
        this._weekdays = weekdays.slice(firstDayOfWeek).concat(weekdays.slice(0, firstDayOfWeek));
    }
    /**
     * The date to display in this month view (everything other than the month and year is ignored).
     * @return {?}
     */
    get activeDate() {
        return this._activeDate;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set activeDate(value) {
        /** @type {?} */
        const oldActiveDate = this._activeDate;
        /** @type {?} */
        const validDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value)) || this._dateAdapter.today();
        this._activeDate = this._dateAdapter.clampDate(validDate, this.minDate, this.maxDate);
        this._activeValue = this._getDateInCurrentMonth(this.activeDate);
        if (oldActiveDate && !this._hasSameMonthAndYear(oldActiveDate, this._activeDate)) {
            this._init();
        }
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
        this._selectedDate = this._getDateInCurrentMonth(this._selected);
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
     * @return {?}
     */
    ngAfterContentInit() {
        this._init();
    }
    /**
     * Handles when a new date is selected.
     * @param {?} date
     * @return {?}
     */
    _dateSelected(date) {
        if (this._selectedDate !== date) {
            /** @type {?} */
            const selectedYear = this._dateAdapter.getYear(this.activeDate);
            /** @type {?} */
            const selectedMonth = this._dateAdapter.getMonth(this.activeDate);
            /** @type {?} */
            const selectedHours = this._dateAdapter.getHours(this.activeDate);
            /** @type {?} */
            const selectedMinutes = this._dateAdapter.getMinutes(this.activeDate);
            /** @type {?} */
            const selectedDate = this._dateAdapter.createDate(selectedYear, selectedMonth, date, selectedHours, selectedMinutes);
            this.selectedChange.emit(selectedDate);
        }
        this._userSelection.emit();
    }
    /**
     * Handles keydown events on the calendar body when calendar is in month view.
     * @param {?} event
     * @return {?}
     */
    _handleCalendarBodyKeydown(event) {
        // TODO(mmalerba): We currently allow keyboard navigation to disabled dates, but just prevent
        // disabled ones from being selected. This may not be ideal, we should look into whether
        // navigation should skip over disabled dates, and if so, how to implement that efficiently.
        // TODO(mmalerba): We currently allow keyboard navigation to disabled dates, but just prevent
        // disabled ones from being selected. This may not be ideal, we should look into whether
        // navigation should skip over disabled dates, and if so, how to implement that efficiently.
        /** @type {?} */
        const oldActiveDate = this._activeDate;
        /** @type {?} */
        const isRtl = this._isRtl();
        switch (event.keyCode) {
            case LEFT_ARROW:
                this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate, isRtl ? 1 : -1);
                break;
            case RIGHT_ARROW:
                this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate, isRtl ? -1 : 1);
                break;
            case UP_ARROW:
                this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate, -7);
                break;
            case DOWN_ARROW:
                this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate, 7);
                break;
            case HOME:
                this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate, 1 - this._dateAdapter.getDate(this._activeDate));
                break;
            case END:
                this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate, this._dateAdapter.getNumDaysInMonth(this._activeDate) - this._dateAdapter.getDate(this._activeDate));
                break;
            case PAGE_UP:
                this.activeDate = event.altKey
                    ? this._dateAdapter.addCalendarYears(this._activeDate, -1)
                    : this._dateAdapter.addCalendarMonths(this._activeDate, -1);
                break;
            case PAGE_DOWN:
                this.activeDate = event.altKey
                    ? this._dateAdapter.addCalendarYears(this._activeDate, 1)
                    : this._dateAdapter.addCalendarMonths(this._activeDate, 1);
                break;
            case ENTER:
                if (!this.dateFilter || this.dateFilter(this._activeDate)) {
                    this._dateSelected(this._dateAdapter.getDate(this._activeDate));
                    this._userSelection.emit();
                    // Prevent unexpected default actions such as form submission.
                    event.preventDefault();
                }
                return;
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
    }
    /**
     * Initializes this month view.
     * @return {?}
     */
    _init() {
        this._activeValue = this._getDateInCurrentMonth(this.activeDate);
        this._selectedDate = this._getDateInCurrentMonth(this.selected);
        this._todayDate = this._getDateInCurrentMonth(this._dateAdapter.today());
        this._monthLabel = this._dateAdapter
            .getMonthNames('short')[this._dateAdapter.getMonth(this.activeDate)].toLocaleUpperCase();
        /** @type {?} */
        const firstOfMonth = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), this._dateAdapter.getMonth(this.activeDate), 1);
        this._firstWeekOffset =
            (DAYS_PER_WEEK + this._dateAdapter.getDayOfWeek(firstOfMonth) - this._dateAdapter.getFirstDayOfWeek()) %
                DAYS_PER_WEEK;
        this._createWeekCells();
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Focuses the active cell after the microtask queue is empty.
     * @return {?}
     */
    _focusActiveCell() {
        this._matCalendarBody._focusActiveCell();
    }
    /**
     * Creates MatCalendarCells for the dates in this month.
     * @private
     * @return {?}
     */
    _createWeekCells() {
        /** @type {?} */
        const daysInMonth = this._dateAdapter.getNumDaysInMonth(this.activeDate);
        /** @type {?} */
        const dateNames = this._dateAdapter.getDateNames();
        this._weeks = [[]];
        for (let i = 0, cell = this._firstWeekOffset; i < daysInMonth; i++, cell++) {
            if (cell === DAYS_PER_WEEK) {
                this._weeks.push([]);
                cell = 0;
            }
            /** @type {?} */
            const date = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), this._dateAdapter.getMonth(this.activeDate), i + 1);
            /** @type {?} */
            const enabled = this._shouldEnableDate(date);
            /** @type {?} */
            const ariaLabel = this._dateAdapter.format(date, this._dateFormats.display.dateA11yLabel);
            this._weeks[this._weeks.length - 1].push(new MatCalendarCell(i + 1, dateNames[i], ariaLabel, enabled));
        }
    }
    /**
     * Date filter for the month
     * @private
     * @param {?} date
     * @return {?}
     */
    _shouldEnableDate(date) {
        return (!!date &&
            (!this.dateFilter || this.dateFilter(date, 'day')) &&
            (!this.minDate || this._dateAdapter.compareDate(date, this.minDate, 'day') >= 0) &&
            (!this.maxDate || this._dateAdapter.compareDate(date, this.maxDate, 'day') <= 0));
    }
    /**
     * Gets the date in this month that the given Date falls on.
     * Returns null if the given Date is in another month.
     * @private
     * @param {?} date
     * @return {?}
     */
    _getDateInCurrentMonth(date) {
        return date && this._hasSameMonthAndYear(date, this.activeDate) ? this._dateAdapter.getDate(date) : null;
    }
    /**
     * Checks whether the 2 dates are non-null and fall within the same month of the same year.
     * @private
     * @param {?} d1
     * @param {?} d2
     * @return {?}
     */
    _hasSameMonthAndYear(d1, d2) {
        return !!(d1 && d2 && this._dateAdapter.compareDate(d1, d2, 'month') === 0);
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
     * Determines whether the user has the RTL layout direction.
     * @private
     * @return {?}
     */
    _isRtl() {
        return this._dir && this._dir.value === 'rtl';
    }
}
MatMonthView.decorators = [
    { type: Component, args: [{
                selector: 'mat-month-view',
                template: "<table class=\"mat-calendar-table\">\r\n  <thead class=\"mat-calendar-table-header\">\r\n    <tr><th *ngFor=\"let day of _weekdays\" [attr.aria-label]=\"day.long\">{{ day.narrow }}</th></tr>\r\n  </thead>\r\n  <tbody mat-calendar-body\r\n    [@slideCalendar]=\"animationDir\"\r\n    role=\"grid\"\r\n    [rows]=\"_weeks\"\r\n    [todayValue]=\"_todayDate\"\r\n    [activeValue]=\"_activeValue\"\r\n    [selectedValue]=\"_selectedDate\"\r\n    [labelMinRequiredCells]=\"3\"\r\n    [activeCell]=\"_dateAdapter.getDate(activeDate) - 1\"\r\n    (selectedValueChange)=\"_dateSelected($event)\"\r\n    (keydown)=\"_handleCalendarBodyKeydown($event)\">\r\n  </tbody>\r\n</table>\r\n",
                exportAs: 'matMonthView',
                animations: [slideCalendar],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false
            }] }
];
/** @nocollapse */
MatMonthView.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_DATE_FORMATS,] }] },
    { type: DateAdapter, decorators: [{ type: Optional }] },
    { type: Directionality, decorators: [{ type: Optional }] }
];
MatMonthView.propDecorators = {
    activeDate: [{ type: Input }],
    selected: [{ type: Input }],
    minDate: [{ type: Input }],
    maxDate: [{ type: Input }],
    dateFilter: [{ type: Input }],
    animationDir: [{ type: Input }],
    selectedChange: [{ type: Output }],
    _userSelection: [{ type: Output }],
    activeDateChange: [{ type: Output }],
    _matCalendarBody: [{ type: ViewChild, args: [MatCalendarBody,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * An internal component used to display a single year in the datepicker.
 * \@docs-private
 * @template D
 */
class MatYearView {
    /**
     * @param {?} _changeDetectorRef
     * @param {?} _dateFormats
     * @param {?} _dateAdapter
     * @param {?=} _dir
     */
    constructor(_changeDetectorRef, _dateFormats, _dateAdapter, _dir) {
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
    /**
     * The date to display in this year view (everything other than the year is ignored).
     * @return {?}
     */
    get activeDate() {
        return this._activeDate;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set activeDate(value) {
        /** @type {?} */
        const oldActiveDate = this._activeDate;
        /** @type {?} */
        const validDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value)) || this._dateAdapter.today();
        this._activeDate = this._dateAdapter.clampDate(validDate, this.minDate, this.maxDate);
        if (oldActiveDate &&
            this._dateAdapter.getYear(oldActiveDate) !== this._dateAdapter.getYear(this._activeDate)) {
            this._init();
        }
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
        this._selectedMonth = this._getMonthInCurrentYear(this._selected);
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
     * @return {?}
     */
    ngAfterContentInit() {
        this._init();
    }
    /**
     * Handles when a new month is selected.
     * @param {?} month
     * @return {?}
     */
    _monthSelected(month) {
        /** @type {?} */
        const daysInMonth = this._dateAdapter.getNumDaysInMonth(this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), month, 1));
        /** @type {?} */
        const selectedYear = this._dateAdapter.getYear(this.activeDate);
        /** @type {?} */
        const selectedDay = this._dateAdapter.getDate(this.activeDate);
        /** @type {?} */
        const selectedHours = this._dateAdapter.getHours(this.activeDate);
        /** @type {?} */
        const selectedMinutes = this._dateAdapter.getMinutes(this.activeDate);
        /** @type {?} */
        const date = this._dateAdapter.createDate(selectedYear, month, Math.min(selectedDay, daysInMonth), selectedHours, selectedMinutes);
        this.selectedChange.emit(date);
    }
    /**
     * Initializes this year view.
     * @return {?}
     */
    _init() {
        this._selectedMonth = this._getMonthInCurrentYear(this.selected);
        this._todayMonth = this._getMonthInCurrentYear(this._dateAdapter.today());
        this._yearLabel = this._dateAdapter.getYearName(this.activeDate);
        /** @type {?} */
        const monthNames = this._dateAdapter.getMonthNames('short');
        // First row of months only contains 5 elements so we can fit the year label on the same row.
        this._months = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11]].map((/**
         * @param {?} row
         * @return {?}
         */
        row => row.map((/**
         * @param {?} month
         * @return {?}
         */
        month => this._createCellForMonth(month, monthNames[month])))));
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Gets the month in this year that the given Date falls on.
     * Returns null if the given Date is in another year.
     * @private
     * @param {?} date
     * @return {?}
     */
    _getMonthInCurrentYear(date) {
        return date && this._dateAdapter.getYear(date) === this._dateAdapter.getYear(this.activeDate)
            ? this._dateAdapter.getMonth(date)
            : null;
    }
    /**
     * Creates an MatCalendarCell for the given month.
     * @private
     * @param {?} month
     * @param {?} monthName
     * @return {?}
     */
    _createCellForMonth(month, monthName) {
        /** @type {?} */
        const ariaLabel = this._dateAdapter.format(this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), month, 1), this._dateFormats.display.monthYearA11yLabel);
        return new MatCalendarCell(month, monthName.toLocaleUpperCase(), ariaLabel, this._shouldEnableMonth(month));
    }
    /**
     * Whether the given month is enabled.
     * @private
     * @param {?} month
     * @return {?}
     */
    _shouldEnableMonth(month) {
        /** @type {?} */
        const activeYear = this._dateAdapter.getYear(this.activeDate);
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
        const firstOfMonth = this._dateAdapter.createDate(activeYear, month, 1);
        // If any date in the month is enabled count the month as enabled.
        for (let d = firstOfMonth; this._dateAdapter.getMonth(d) == month; d = this._dateAdapter.addCalendarDays(d, 1)) {
            if (this.dateFilter(d, 'day')) {
                return true;
            }
        }
        return false;
    }
    /**
     * Tests whether the combination month/year is after this.maxDate, considering
     * just the month and year of this.maxDate
     * @private
     * @param {?} year
     * @param {?} month
     * @return {?}
     */
    _isYearAndMonthAfterMaxDate(year, month) {
        if (this.maxDate) {
            /** @type {?} */
            const maxYear = this._dateAdapter.getYear(this.maxDate);
            /** @type {?} */
            const maxMonth = this._dateAdapter.getMonth(this.maxDate);
            return year > maxYear || (year === maxYear && month > maxMonth);
        }
        return false;
    }
    /**
     * Tests whether the combination month/year is before this.minDate, considering
     * just the month and year of this.minDate
     * @private
     * @param {?} year
     * @param {?} month
     * @return {?}
     */
    _isYearAndMonthBeforeMinDate(year, month) {
        if (this.minDate) {
            /** @type {?} */
            const minYear = this._dateAdapter.getYear(this.minDate);
            /** @type {?} */
            const minMonth = this._dateAdapter.getMonth(this.minDate);
            return year < minYear || (year === minYear && month < minMonth);
        }
    }
    /**
     * Handles keydown events on the calendar body when calendar is in year view.
     * @param {?} event
     * @return {?}
     */
    _handleCalendarBodyKeydown(event) {
        // TODO(mmalerba): We currently allow keyboard navigation to disabled dates, but just prevent
        // disabled ones from being selected. This may not be ideal, we should look into whether
        // navigation should skip over disabled dates, and if so, how to implement that efficiently.
        // TODO(mmalerba): We currently allow keyboard navigation to disabled dates, but just prevent
        // disabled ones from being selected. This may not be ideal, we should look into whether
        // navigation should skip over disabled dates, and if so, how to implement that efficiently.
        /** @type {?} */
        const oldActiveDate = this._activeDate;
        /** @type {?} */
        const isRtl = this._isRtl();
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
    }
    /**
     * @return {?}
     */
    _focusActiveCell() {
        this._matCalendarBody._focusActiveCell();
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
     * Determines whether the user has the RTL layout direction.
     * @private
     * @return {?}
     */
    _isRtl() {
        return this._dir && this._dir.value === 'rtl';
    }
}
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
MatYearView.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_DATE_FORMATS,] }] },
    { type: DateAdapter, decorators: [{ type: Optional }] },
    { type: Directionality, decorators: [{ type: Optional }] }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const YEAR_LINE_HEIGHT = 35;
/**
 * An internal component used to display a year selector in the datepicker.
 * \@docs-private
 * @template D
 */
class MatYearsView {
    /**
     * @param {?} _changeDetectorRef
     * @param {?} element
     * @param {?} _dateAdapter
     * @param {?} _dateFormats
     */
    constructor(_changeDetectorRef, element, _dateAdapter, _dateFormats) {
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
    /**
     * The date to display in this view (everything other than the year is ignored).
     * @return {?}
     */
    get activeDate() {
        return this._activeDate;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set activeDate(value) {
        /** @type {?} */
        let oldActiveDate = this._activeDate;
        /** @type {?} */
        const validDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value)) || this._dateAdapter.today();
        this._activeDate = this._dateAdapter.clampDate(validDate, this.minDate, this.maxDate);
        if (oldActiveDate &&
            this._dateAdapter.getYear(oldActiveDate) != this._dateAdapter.getYear(this._activeDate)) {
            this._init();
        }
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
        this._selectedYear = this._selected && this._dateAdapter.getYear(this._selected);
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
     * @return {?}
     */
    ngAfterContentInit() {
        /** @type {?} */
        const lastPosition = { scrolled: 0 };
        this._disposeScroller = fromEvent(this.element.nativeElement, 'scroll')
            .pipe(sampleTime(300), mergeMap((/**
         * @param {?} ev
         * @return {?}
         */
        (ev) => of(this._calculatePoints()))))
            .subscribe((/**
         * @param {?} pos
         * @return {?}
         */
        (pos) => this._handleScroll(pos, lastPosition)));
        this._init();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._disposeScroller.unsubscribe();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    abs(value) {
        return Math.abs(value);
    }
    /**
     * Initializes this year view.
     * @return {?}
     */
    _init() {
        this._selectedYear = this._dateAdapter.getYear(this.selected ? this.selected : this.activeDate);
        /** @type {?} */
        const date = this._dateAdapter.createDate(this._selectedYear, this._dateAdapter.getMonth(this.activeDate), this._dateAdapter.getDate(this.activeDate), this._dateAdapter.getHours(this.activeDate), this._dateAdapter.getMinutes(this.activeDate));
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
        () => {
            this.element.nativeElement.scrollTop -=
                this.element.nativeElement.offsetHeight / 2 - YEAR_LINE_HEIGHT / 2;
        }), 20);
    }
    /**
     * @param {?=} down
     * @return {?}
     */
    _populateYears(down = false) {
        if ((!down && !this._years[0].enabled) ||
            (down && !this._years[this._years.length - 1].enabled)) {
            return;
        }
        /** @type {?} */
        const selectedMonth = this._dateAdapter.getMonth(this.activeDate);
        /** @type {?} */
        const selectedDay = this._dateAdapter.getDate(this.activeDate);
        /** @type {?} */
        const selectedHours = this._dateAdapter.getHours(this.activeDate);
        /** @type {?} */
        const selectedMinutes = this._dateAdapter.getMinutes(this.activeDate);
        /** @type {?} */
        let scroll = 0;
        for (let y = 1; y <= 10; y++) {
            /** @type {?} */
            let year = this._years[this._years.length - 1].value;
            /** @type {?} */
            let date = this._dateAdapter.createDate(year + 1, selectedMonth, selectedDay, selectedHours, selectedMinutes);
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
        () => {
            this.element.nativeElement.scrollTop += down ? YEAR_LINE_HEIGHT : scroll;
        }), 10);
        this._changeDetectorRef.markForCheck();
    }
    /**
     * @param {?} year
     * @return {?}
     */
    _yearSelected(year) {
        /** @type {?} */
        const selectedMonth = this._dateAdapter.getMonth(this.activeDate);
        /** @type {?} */
        const selectedDay = this._dateAdapter.getDate(this.activeDate);
        /** @type {?} */
        const selectedHours = this._dateAdapter.getHours(this.activeDate);
        /** @type {?} */
        const selectedMinutes = this._dateAdapter.getMinutes(this.activeDate);
        this.selectedChange.emit(this._dateAdapter.createDate(year, selectedMonth, selectedDay, selectedHours, selectedMinutes));
    }
    /**
     * @return {?}
     */
    _calculatePoints() {
        /** @type {?} */
        const el = this.element.nativeElement;
        return {
            height: el.offsetHeight,
            scrolled: el.scrollTop,
            total: el.scrollHeight
        };
    }
    /**
     * @param {?} position
     * @param {?} lastPosition
     * @return {?}
     */
    _handleScroll(position, lastPosition) {
        if (position.scrolled === 0 && lastPosition.scrolled > 0) {
            this._populateYears(false);
        }
        else if (position.height + position.scrolled === position.total) {
            this._populateYears(true);
        }
        lastPosition.scrolled = position.scrolled;
    }
    /**
     * Handles keydown events on the calendar body when calendar is in multi-year view.
     * @param {?} event
     * @return {?}
     */
    _handleCalendarBodyKeydown(event) {
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
    }
    /**
     * @return {?}
     */
    _focusActiveCell() { }
    /**
     * @private
     * @param {?} obj The object to check.
     * @return {?} The given object if it is both a date instance and valid, otherwise null.
     */
    _getValidDateOrNull(obj) {
        return this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj) ? obj : null;
    }
}
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
MatYearsView.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: DateAdapter, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_DATE_FORMATS,] }] }
];
MatYearsView.propDecorators = {
    activeDate: [{ type: Input }],
    selected: [{ type: Input }],
    minDate: [{ type: Input }],
    maxDate: [{ type: Input }],
    dateFilter: [{ type: Input }],
    selectedChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A calendar that is used as part of the datepicker.
 * \@docs-private
 * @template D
 */
class MatCalendar {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Used to generate a unique ID for each datepicker instance.
 * @type {?}
 */
let datepickerUid = 0;
/**
 * Injection token that determines the scroll handling while the calendar is open.
 * @type {?}
 */
const MAT_DATEPICKER_SCROLL_STRATEGY = new InjectionToken('mat-datepicker-scroll-strategy');
/**
 * \@docs-private
 * @param {?} overlay
 * @return {?}
 */
function MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY(overlay) {
    return (/**
     * @return {?}
     */
    () => overlay.scrollStrategies.reposition());
}
/**
 * \@docs-private
 * @type {?}
 */
const MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: MAT_DATEPICKER_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY
};
/**
 * Component used as the content for the datepicker dialog and popup. We use this instead of using
 * MatCalendar directly as the content so we can control the initial focus. This also gives us a
 * place to put additional features of the popup that are not part of the calendar itself in the
 * future. (e.g. confirmation buttons).
 * \@docs-private
 * @template D
 */
class MatDatepickerContent {
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._calendar.focusActiveCell();
    }
    /**
     * Handles keydown event on datepicker content.
     * @param {?} event The event.
     * @return {?}
     */
    _handleKeydown(event) {
        if (event.keyCode === ESCAPE) {
            this.datepicker.close();
            event.preventDefault();
            event.stopPropagation();
        }
    }
}
MatDatepickerContent.decorators = [
    { type: Component, args: [{
                selector: 'mat-datepicker-content',
                template: "<mat-calendar cdkTrapFocus\r\n    [id]=\"datepicker.id\"\r\n    [ngClass]=\"datepicker.panelClass\"\r\n    [type]=\"datepicker.type\"\r\n    [startAt]=\"datepicker.startAt\"\r\n    [startView]=\"datepicker.startView\"\r\n    [clockStep]=\"datepicker.clockStep\"\r\n    [twelveHour]=\"datepicker.twelveHour\"\r\n    [minDate]=\"datepicker._minDate\"\r\n    [maxDate]=\"datepicker._maxDate\"\r\n    [dateFilter]=\"datepicker._dateFilter\"\r\n    [selected]=\"datepicker._selected\"\r\n    [@fadeInCalendar]=\"'enter'\"\r\n    (selectedChange)=\"datepicker._select($event)\"\r\n    (_userSelection)=\"datepicker.close()\">\r\n</mat-calendar>\r\n",
                // styleUrls: ['datepicker-content.scss'],
                host: {
                    class: 'mat-datepicker-content',
                    '[@transformPanel]': '"enter"',
                    '[class.mat-datepicker-content-touch]': 'datepicker.touchUi',
                    '(keydown)': '_handleKeydown($event)'
                },
                animations: [transformPanel, fadeInCalendar],
                exportAs: 'matDatepickerContent',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false
            }] }
];
MatDatepickerContent.propDecorators = {
    _calendar: [{ type: ViewChild, args: [MatCalendar,] }]
};
// TODO(mmalerba): We use a component instead of a directive here so the user can use implicit
// template reference variables (e.g. #d vs #d="matDatepicker"). We can change this to a directive
// if angular adds support for `exportAs: '$implicit'` on directives.
/**
 * Component responsible for managing the datepicker popup/dialog.
 * @template D
 */
class MatDatepicker {
    /**
     * @param {?} _dialog
     * @param {?} _overlay
     * @param {?} _ngZone
     * @param {?} _viewContainerRef
     * @param {?} _scrollStrategy
     * @param {?} _dateAdapter
     * @param {?} _dir
     * @param {?} _document
     */
    constructor(_dialog, _overlay, _ngZone, _viewContainerRef, _scrollStrategy, _dateAdapter, _dir, _document) {
        this._dialog = _dialog;
        this._overlay = _overlay;
        this._ngZone = _ngZone;
        this._viewContainerRef = _viewContainerRef;
        this._scrollStrategy = _scrollStrategy;
        this._dateAdapter = _dateAdapter;
        this._dir = _dir;
        this._document = _document;
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
        this.twelveHour = true;
        this._touchUi = true;
        /**
         * Emits when the datepicker has been opened.
         */
        this.openedStream = new EventEmitter();
        /**
         * Emits when the datepicker has been closed.
         */
        this.closedStream = new EventEmitter();
        this._opened = false;
        /**
         * The id for the datepicker calendar.
         */
        this.id = `mat-datepicker-${datepickerUid++}`;
        this._validSelected = null;
        /**
         * The element that was focused before the datepicker was opened.
         */
        this._focusedElementBeforeOpen = null;
        /**
         * Subscription to value changes in the associated input element.
         */
        this._inputSubscription = Subscription.EMPTY;
        /**
         * Emits when the datepicker is disabled.
         */
        this._disabledChange = new Subject();
        /**
         * Emits new selected date when selected date changes.
         */
        this._selectedChanged = new Subject();
        if (!this._dateAdapter) {
            throw createMissingDateImplError('DateAdapter');
        }
    }
    /**
     * The date to open the calendar to initially.
     * @return {?}
     */
    get startAt() {
        // If an explicit startAt is set we start there, otherwise we start at whatever the currently
        // selected value is.
        return this._startAt || (this._datepickerInput ? this._datepickerInput.value : null);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set startAt(value) {
        this._startAt = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
    }
    /**
     * Whether the calendar UI is in touch mode. In touch mode the calendar opens in a dialog rather
     * than a popup and elements have more padding to allow for bigger touch targets.
     * @return {?}
     */
    get touchUi() {
        return this._touchUi;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set touchUi(value) {
        this._touchUi = coerceBooleanProperty(value);
    }
    /**
     * Whether the datepicker pop-up should be disabled.
     * @return {?}
     */
    get disabled() {
        return this._disabled === undefined && this._datepickerInput
            ? this._datepickerInput.disabled
            : !!this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        /** @type {?} */
        const newValue = coerceBooleanProperty(value);
        if (newValue !== this._disabled) {
            this._disabled = newValue;
            this._disabledChange.next(newValue);
        }
    }
    /**
     * Whether the datepicker is connected to a date type one
     * @param {?} value
     * @return {?}
     */
    set matDatepicker(value) {
        if (value) {
            this._datepicker = value;
        }
    }
    /**
     * Whether the calendar is open.
     * @return {?}
     */
    get opened() {
        return this._opened;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set opened(value) {
        value ? this.open() : this.close();
    }
    /**
     * The currently selected date.
     * @return {?}
     */
    get _selected() {
        return this._validSelected;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set _selected(value) {
        /** @type {?} */
        const valid = this._dateAdapter.clampDate(value, this._minDate, this._maxDate);
        if (valid) {
            // round the minutes
            /** @type {?} */
            let minutes = this._dateAdapter.getMinutes(valid);
            minutes = Math.round(minutes / this.clockStep) * this.clockStep;
            this._dateAdapter.setMinutes(valid, minutes);
            this._dateAdapter.setSeconds(valid, 0);
        }
        this._validSelected = valid;
    }
    /**
     * The minimum selectable date.
     * @return {?}
     */
    get _minDate() {
        return this._datepickerInput && this._datepickerInput.min;
    }
    /**
     * The maximum selectable date.
     * @return {?}
     */
    get _maxDate() {
        return this._datepickerInput && this._datepickerInput.max;
    }
    /**
     * @return {?}
     */
    get _dateFilter() {
        return this._datepickerInput && this._datepickerInput._dateFilter;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // prevent inconsistent type and view
        switch (this.type) {
            case 'date':
                this.startView = this.startView !== 'clock' ? this.startView : 'month';
                break;
            case 'time':
                this.startView = 'clock';
                break;
            default:
                this.startView = this.startView;
        }
        if (this._datepicker) {
            this._datepicker._selectedChanged.subscribe((/**
             * @param {?} date
             * @return {?}
             */
            (date) => {
                /** @type {?} */
                const value = this._dateAdapter.createDate(this._dateAdapter.getYear(date), this._dateAdapter.getMonth(date), this._dateAdapter.getDate(date), this._selected ? this._dateAdapter.getHours(this._selected) : 0, this._selected ? this._dateAdapter.getMinutes(this._selected) : 0);
                // update the corresponding changes
                this._select(value);
            }));
        }
        // refresh the input
        this._datepickerInput.value = this._selected;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.close();
        this._inputSubscription.unsubscribe();
        this._selectedChanged.complete();
        this._disabledChange.complete();
        if (this._popupRef) {
            this._popupRef.dispose();
            this._popupComponentRef = null;
        }
    }
    /**
     * Selects the given date
     * @param {?} date
     * @return {?}
     */
    _select(date) {
        /** @type {?} */
        const oldValue = this._selected;
        this._selected = date;
        /** @type {?} */
        const unit = this.type.indexOf('time') >= 0 ? 'minute' : 'day';
        if (!this._dateAdapter.sameDate(oldValue, this._selected, unit)) {
            this._selectedChanged.next(date);
        }
    }
    /**
     * Register an input with this datepicker.
     * @param {?} input The datepicker input to register with this datepicker.
     * @return {?}
     */
    _registerInput(input) {
        if (this._datepickerInput) {
            throw Error('A MatDatepicker can only be associated with a single input.');
        }
        this._datepickerInput = input;
        this._inputSubscription = this._datepickerInput._valueChange.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        (value) => (this._selected =
            value && this._dateAdapter.isDateInstance(value) ? this._dateAdapter.clone(value) : null)));
    }
    /**
     * Open the calendar.
     * @return {?}
     */
    open() {
        if (this._opened || this.disabled) {
            return;
        }
        if (!this._datepickerInput) {
            throw Error('Attempted to open an MatDatepicker with no associated input.');
        }
        if (this._document) {
            this._focusedElementBeforeOpen = this._document.activeElement;
        }
        this.touchUi ? this._openAsDialog() : this._openAsPopup();
        this._opened = true;
        this.openedStream.emit();
    }
    /**
     * @param {?=} value
     * @return {?}
     */
    reset(value) {
        this._datepickerInput.reset(value);
    }
    /**
     * Close the calendar.
     * @return {?}
     */
    close() {
        if (!this._opened) {
            return;
        }
        if (this._popupRef && this._popupRef.hasAttached()) {
            this._popupRef.detach();
        }
        if (this._dialogRef) {
            this._dialogRef.close();
            this._dialogRef = null;
        }
        if (this._calendarPortal && this._calendarPortal.isAttached) {
            this._calendarPortal.detach();
        }
        /** @type {?} */
        const completeClose = (/**
         * @return {?}
         */
        () => {
            // The `_opened` could've been reset already if
            // we got two events in quick succession.
            if (this._opened) {
                this._opened = false;
                this.closedStream.emit();
                this._focusedElementBeforeOpen = null;
            }
        });
        if (this._focusedElementBeforeOpen &&
            typeof this._focusedElementBeforeOpen.focus === 'function') {
            // Because IE moves focus asynchronously, we can't count on it being restored before we've
            // marked the datepicker as closed. If the event fires out of sequence and the element that
            // we're refocusing opens the datepicker on focus, the user could be stuck with not being
            // able to close the calendar at all. We work around it by making the logic, that marks
            // the datepicker as closed, async as well.
            this._focusedElementBeforeOpen.focus();
            setTimeout(completeClose);
        }
        else {
            completeClose();
        }
    }
    /**
     * Open the calendar as a dialog.
     * @private
     * @return {?}
     */
    _openAsDialog() {
        this._dialogRef = this._dialog.open(MatDatepickerContent, {
            direction: this._dir ? this._dir.value : 'ltr',
            viewContainerRef: this._viewContainerRef,
            panelClass: 'mat-datepicker-dialog'
        });
        this._dialogRef.afterClosed().subscribe((/**
         * @return {?}
         */
        () => this.close()));
        this._dialogRef.componentInstance.datepicker = this;
    }
    /**
     * Open the calendar as a popup.
     * @private
     * @return {?}
     */
    _openAsPopup() {
        if (!this._calendarPortal) {
            this._calendarPortal = new ComponentPortal(MatDatepickerContent, this._viewContainerRef);
        }
        if (!this._popupRef) {
            this._createPopup();
        }
        if (!this._popupRef.hasAttached()) {
            this._popupComponentRef = this._popupRef.attach(this._calendarPortal);
            this._popupComponentRef.instance.datepicker = this;
            // Update the position once the calendar has rendered.
            this._ngZone.onStable
                .asObservable()
                .pipe(take(1))
                .subscribe((/**
             * @return {?}
             */
            () => {
                this._popupRef.updatePosition();
            }));
        }
    }
    /**
     * Create the popup.
     * @private
     * @return {?}
     */
    _createPopup() {
        /** @type {?} */
        const overlayConfig = new OverlayConfig({
            positionStrategy: this._createPopupPositionStrategy(),
            hasBackdrop: true,
            backdropClass: 'mat-overlay-transparent-backdrop',
            direction: this._dir,
            scrollStrategy: this._scrollStrategy(),
            panelClass: 'mat-datepicker-popup'
        });
        this._popupRef = this._overlay.create(overlayConfig);
        merge(this._popupRef.backdropClick(), this._popupRef.detachments(), this._popupRef.keydownEvents().pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            // Closing on alt + up is only valid when there's an input associated with the datepicker.
            return (event.keyCode === ESCAPE ||
                (this._datepickerInput && event.altKey && event.keyCode === UP_ARROW));
        })))).subscribe((/**
         * @return {?}
         */
        () => this.close()));
    }
    /**
     * Create the popup PositionStrategy.
     * @private
     * @return {?}
     */
    _createPopupPositionStrategy() {
        return this._overlay
            .position()
            .flexibleConnectedTo(this._datepickerInput.getPopupConnectionElementRef())
            .withTransformOriginOn('.mat-datepicker-content')
            .withFlexibleDimensions(false)
            .withViewportMargin(8)
            .withPush(false)
            .withPositions([
            {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top'
            },
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'bottom'
            },
            {
                originX: 'end',
                originY: 'bottom',
                overlayX: 'end',
                overlayY: 'top'
            },
            {
                originX: 'end',
                originY: 'top',
                overlayX: 'end',
                overlayY: 'bottom'
            }
        ]);
    }
    /**
     * @private
     * @param {?} obj The object to check.
     * @return {?} The given object if it is both a date instance and valid, otherwise null.
     */
    _getValidDateOrNull(obj) {
        return this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj) ? obj : null;
    }
}
MatDatepicker.decorators = [
    { type: Component, args: [{
                selector: 'mat-datepicker',
                template: '',
                exportAs: 'matDatepicker',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                preserveWhitespaces: false
            }] }
];
/** @nocollapse */
MatDatepicker.ctorParameters = () => [
    { type: MatDialog },
    { type: Overlay },
    { type: NgZone },
    { type: ViewContainerRef },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_DATEPICKER_SCROLL_STRATEGY,] }] },
    { type: DateAdapter, decorators: [{ type: Optional }] },
    { type: Directionality, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] }
];
MatDatepicker.propDecorators = {
    startAt: [{ type: Input }],
    type: [{ type: Input }],
    startView: [{ type: Input }],
    clockStep: [{ type: Input }],
    twelveHour: [{ type: Input }],
    touchUi: [{ type: Input }],
    disabled: [{ type: Input }],
    matDatepicker: [{ type: Input }],
    panelClass: [{ type: Input }],
    openedStream: [{ type: Output, args: ['opened',] }],
    closedStream: [{ type: Output, args: ['closed',] }],
    opened: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const MAT_DATEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => MatDatepickerInput)),
    multi: true
};
/** @type {?} */
const MAT_DATEPICKER_VALIDATORS = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => MatDatepickerInput)),
    multi: true
};
/**
 * An event used for datepicker input and change events. We don't always have access to a native
 * input or change event because the event may have been triggered by the user clicking on the
 * calendar popup. For consistency, we always use MatDatepickerInputEvent instead.
 * @template D
 */
class MatDatepickerInputEvent {
    /**
     * @param {?} target
     * @param {?} targetElement
     */
    constructor(target, targetElement) {
        this.target = target;
        this.targetElement = targetElement;
        this.value = this.target.value;
    }
}
/**
 * Directive used to connect an input to a MatDatepicker.
 * @template D
 */
class MatDatepickerInput {
    /**
     * @param {?} _elementRef
     * @param {?} _dateAdapter
     * @param {?} _dateFormats
     * @param {?} _formField
     */
    constructor(_elementRef, _dateAdapter, _dateFormats, _formField) {
        this._elementRef = _elementRef;
        this._dateAdapter = _dateAdapter;
        this._dateFormats = _dateFormats;
        this._formField = _formField;
        /**
         * Emits when a `change` event is fired on this `<input>`.
         */
        this.dateChange = new EventEmitter();
        /**
         * Emits when an `input` event is fired on this `<input>`.
         */
        this.dateInput = new EventEmitter();
        /**
         * Emits when the value changes (either due to user input or programmatic change).
         */
        this._valueChange = new EventEmitter();
        /**
         * Emits when the disabled state has changed
         */
        this._disabledChange = new EventEmitter();
        this._onTouched = (/**
         * @return {?}
         */
        () => { });
        this._cvaOnChange = (/**
         * @return {?}
         */
        () => { });
        this._validatorOnChange = (/**
         * @return {?}
         */
        () => { });
        this._datepickerSubscription = Subscription.EMPTY;
        this._localeSubscription = Subscription.EMPTY;
        /**
         * The form control validator for whether the input parses.
         */
        this._parseValidator = (/**
         * @return {?}
         */
        () => {
            return this._lastValueValid
                ? null
                : { matDatepickerParse: { text: this._elementRef.nativeElement.value } };
        });
        /**
         * The form control validator for the min date.
         */
        this._minValidator = (/**
         * @param {?} control
         * @return {?}
         */
        (control) => {
            /** @type {?} */
            const controlValue = this._getValidDateOrNull(this._dateAdapter.deserialize(control.value));
            return !this.min || !controlValue || this._dateAdapter.compareDate(this.min, controlValue) <= 0
                ? null
                : { matDatepickerMin: { min: this.min, actual: controlValue } };
        });
        /**
         * The form control validator for the max date.
         */
        this._maxValidator = (/**
         * @param {?} control
         * @return {?}
         */
        (control) => {
            /** @type {?} */
            const controlValue = this._getValidDateOrNull(this._dateAdapter.deserialize(control.value));
            return !this.max || !controlValue || this._dateAdapter.compareDate(this.max, controlValue) >= 0
                ? null
                : { matDatepickerMax: { max: this.max, actual: controlValue } };
        });
        /**
         * The form control validator for the date filter.
         */
        this._filterValidator = (/**
         * @param {?} control
         * @return {?}
         */
        (control) => {
            /** @type {?} */
            const controlValue = this._getValidDateOrNull(this._dateAdapter.deserialize(control.value));
            return !this._dateFilter || !controlValue || this._dateFilter(controlValue)
                ? null
                : { matDatepickerFilter: true };
        });
        /**
         * The combined form control validator for this input.
         */
        this._validator = Validators.compose([
            this._parseValidator,
            this._minValidator,
            this._maxValidator,
            this._filterValidator
        ]);
        /**
         * Whether the last value set on the input was valid.
         */
        this._lastValueValid = false;
        if (!this._dateAdapter) {
            throw createMissingDateImplError('DateAdapter');
        }
        if (!this._dateFormats) {
            throw createMissingDateImplError('MAT_DATE_FORMATS');
        }
    }
    /**
     * The datepicker that this input is associated with.
     * @param {?} value
     * @return {?}
     */
    set matDatepicker(value) {
        this.registerDatepicker(value);
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    registerDatepicker(value) {
        if (value) {
            this._datepicker = value;
            this._datepicker._registerInput(this);
        }
    }
    /**
     * Function that can be used to filter out dates within the datepicker.
     * @param {?} filter
     * @return {?}
     */
    set matDatepickerFilter(filter) {
        this._dateFilter = filter;
        this._validatorOnChange();
    }
    /**
     * The value of the input.
     * @return {?}
     */
    get value() {
        return this._value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        value = this._dateAdapter.deserialize(value);
        this._lastValueValid = !value || this._dateAdapter.isValid(value);
        value = this._getValidDateOrNull(value);
        /** @type {?} */
        const oldDate = this.value;
        this._value = value;
        this._formatValue(value);
        if (!this._dateAdapter.sameDate(oldDate, value)) {
            this._valueChange.emit(value);
        }
    }
    /**
     * The minimum valid date.
     * @return {?}
     */
    get min() {
        return this._min;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set min(value) {
        this._min = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
        this._validatorOnChange();
    }
    /**
     * The maximum valid date.
     * @return {?}
     */
    get max() {
        return this._max;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set max(value) {
        this._max = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
        this._validatorOnChange();
    }
    /**
     * Whether the datepicker-input is disabled.
     * @return {?}
     */
    get disabled() {
        return !!this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        /** @type {?} */
        const newValue = coerceBooleanProperty(value);
        /** @type {?} */
        const element = this._elementRef.nativeElement;
        if (this._disabled !== newValue) {
            this._disabled = newValue;
            this._disabledChange.emit(newValue);
        }
        // We need to null check the `blur` method, because it's undefined during SSR.
        if (newValue && element.blur) {
            // Normally, native input elements automatically blur if they turn disabled. This behavior
            // is problematic, because it would mean that it triggers another change detection cycle,
            // which then causes a changed after checked error if the input element was focused before.
            element.blur();
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // Update the displayed date when the locale changes.
        this._localeSubscription = this._dateAdapter.localeChanges.subscribe((/**
         * @return {?}
         */
        () => {
            this.value = this.value;
        }));
        if (this._datepicker) {
            this._datepickerSubscription = this._datepicker._selectedChanged.subscribe((/**
             * @param {?} selected
             * @return {?}
             */
            (selected) => {
                this.value = selected;
                this._cvaOnChange(selected);
                this._onTouched();
                this.dateInput.emit(new MatDatepickerInputEvent(this, this._elementRef.nativeElement));
                this.dateChange.emit(new MatDatepickerInputEvent(this, this._elementRef.nativeElement));
            }));
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._datepickerSubscription.unsubscribe();
        this._localeSubscription.unsubscribe();
        this._valueChange.complete();
        this._disabledChange.complete();
    }
    /**
     * @param {?=} value
     * @return {?}
     */
    reset(value) {
        this.value = value !== undefined ? value : this._firstValue;
        this._cvaOnChange(this._value);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnValidatorChange(fn) {
        this._validatorOnChange = fn;
    }
    /**
     * @param {?} c
     * @return {?}
     */
    validate(c) {
        return this._validator ? this._validator(c) : null;
    }
    /**
     * @deprecated
     * \@deletion-target 7.0.0 Use `getConnectedOverlayOrigin` instead
     * @return {?}
     */
    getPopupConnectionElementRef() {
        return this.getConnectedOverlayOrigin();
    }
    /**
     * Gets the element that the datepicker popup should be connected to.
     * @return {?} The element to connect the popup to.
     */
    getConnectedOverlayOrigin() {
        return this._formField ? this._formField.getConnectedOverlayOrigin() : this._elementRef;
    }
    // Implemented as part of ControlValueAccessor
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (this._firstValue === undefined) {
            this._firstValue = value;
        }
        this.value = value;
    }
    // Implemented as part of ControlValueAccessor
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this._cvaOnChange = fn;
    }
    // Implemented as part of ControlValueAccessor
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    // Implemented as part of ControlValueAccessor
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _onKeydown(event) {
        if (event.altKey && event.keyCode === DOWN_ARROW) {
            this._datepicker.open();
            event.preventDefault();
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _onInput(value) {
        /** @type {?} */
        const type = this._datepicker.type;
        /** @type {?} */
        let date = this._dateAdapter.parse(value, this._dateFormats.parse[type]);
        this._lastValueValid = (!value && !date) || this._dateAdapter.isValid(date);
        date = this._getValidDateOrNull(date);
        if (!this._dateAdapter.sameDate(date, this._value)) {
            this._value = date;
            this._valueChange.emit(date);
            this.dateInput.emit(new MatDatepickerInputEvent(this, this._elementRef.nativeElement));
        }
        // update on every (input) change
        this._cvaOnChange(date);
    }
    /**
     * @return {?}
     */
    _onChange() {
        this.dateChange.emit(new MatDatepickerInputEvent(this, this._elementRef.nativeElement));
    }
    /**
     * Handles blur events on the input.
     * @return {?}
     */
    _onBlur() {
        // Reformat the input only if we have a valid value.
        if (this.value) {
            this._formatValue(this.value);
        }
        this._onTouched();
    }
    /**
     * Formats a value and sets it on the input element.
     * @private
     * @param {?} value
     * @return {?}
     */
    _formatValue(value) {
        /** @type {?} */
        const type = this._datepicker.type;
        this._elementRef.nativeElement.value = value
            ? this._dateAdapter.format(value, this._dateFormats.display[type])
            : '';
    }
    /**
     * @private
     * @param {?} obj The object to check.
     * @return {?} The given object if it is both a date instance and valid, otherwise null.
     */
    _getValidDateOrNull(obj) {
        return this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj) ? obj : null;
    }
}
MatDatepickerInput.decorators = [
    { type: Directive, args: [{
                selector: 'input[matDatepicker]',
                providers: [
                    MAT_DATEPICKER_VALUE_ACCESSOR,
                    MAT_DATEPICKER_VALIDATORS,
                    { provide: MAT_INPUT_VALUE_ACCESSOR, useExisting: MatDatepickerInput }
                ],
                host: {
                    '[attr.aria-haspopup]': 'true',
                    '[attr.aria-owns]': '(_datepicker?.opened && _datepicker.id) || null',
                    '[attr.min]': 'min ? _dateAdapter.toIso8601(min) : null',
                    '[attr.max]': 'max ? _dateAdapter.toIso8601(max) : null',
                    '[attr.disabled]': 'disabled',
                    '(input)': '_onInput($event.target.value)',
                    '(change)': '_onChange()',
                    '(blur)': '_onBlur()',
                    '(keydown)': '_onKeydown($event)'
                },
                exportAs: 'matDatepickerInput'
            },] }
];
/** @nocollapse */
MatDatepickerInput.ctorParameters = () => [
    { type: ElementRef },
    { type: DateAdapter, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_DATE_FORMATS,] }] },
    { type: MatFormField, decorators: [{ type: Optional }] }
];
MatDatepickerInput.propDecorators = {
    matDatepicker: [{ type: Input }],
    matDatepickerFilter: [{ type: Input }],
    value: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    disabled: [{ type: Input }],
    dateChange: [{ type: Output }],
    dateInput: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Can be used to override the icon of a `matDatepickerToggle`.
 */
class MatDatepickerToggleIcon {
}
MatDatepickerToggleIcon.decorators = [
    { type: Directive, args: [{
                selector: '[matDatepickerToggleIcon]'
            },] }
];
/**
 * @template D
 */
class MatDatepickerToggle {
    /**
     * @param {?} _intl
     * @param {?} _changeDetectorRef
     */
    constructor(_intl, _changeDetectorRef) {
        this._intl = _intl;
        this._changeDetectorRef = _changeDetectorRef;
        this._stateChanges = Subscription.EMPTY;
    }
    /**
     * Whether the toggle button is disabled.
     * @return {?}
     */
    get disabled() {
        return this._disabled === undefined ? this.datepicker.disabled : !!this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.datepicker) {
            this._watchStateChanges();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._stateChanges.unsubscribe();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._watchStateChanges();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _open(event) {
        if (this.datepicker && !this.disabled) {
            this.datepicker.open();
            event.stopPropagation();
        }
    }
    /**
     * @private
     * @return {?}
     */
    _watchStateChanges() {
        /** @type {?} */
        const datepickerDisabled = this.datepicker ? this.datepicker._disabledChange : of();
        /** @type {?} */
        const inputDisabled = this.datepicker && this.datepicker._datepickerInput
            ? this.datepicker._datepickerInput._disabledChange
            : of();
        /** @type {?} */
        const datepickerToggled = this.datepicker
            ? merge(this.datepicker.openedStream, this.datepicker.closedStream)
            : of();
        this._stateChanges.unsubscribe();
        this._stateChanges = merge(this._intl.changes, datepickerDisabled, inputDisabled, datepickerToggled).subscribe((/**
         * @return {?}
         */
        () => this._changeDetectorRef.markForCheck()));
    }
}
MatDatepickerToggle.decorators = [
    { type: Component, args: [{
                selector: 'mat-datepicker-toggle',
                template: "<button mat-icon-button type=\"button\" [attr.aria-label]=\"_intl.openCalendarLabel\"\r\n  [attr.disabled]=\"disabled ? '' : null\" (click)=\"_open($event)\">\r\n\r\n  <svg\r\n    *ngIf=\"!_customIcon\"\r\n    class=\"mat-datepicker-toggle-default-icon\"\r\n    viewBox=\"0 0 24 24\"\r\n    width=\"24px\"\r\n    height=\"24px\"\r\n    fill=\"currentColor\"\r\n    focusable=\"false\">\r\n    <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\r\n    <path d=\"M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z\"/>\r\n  </svg>\r\n\r\n  <ng-content select=\"[matDatepickerToggleIcon]\"></ng-content>\r\n</button>\r\n",
                // styleUrls: ['datepicker-toggle.css'],
                host: {
                    class: 'mat-datepicker-toggle',
                    '[class.mat-datepicker-toggle-active]': 'datepicker && datepicker.opened'
                },
                exportAs: 'matDatepickerToggle',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false
            }] }
];
/** @nocollapse */
MatDatepickerToggle.ctorParameters = () => [
    { type: MatDatepickerIntl },
    { type: ChangeDetectorRef }
];
MatDatepickerToggle.propDecorators = {
    datepicker: [{ type: Input, args: ['for',] }],
    disabled: [{ type: Input }],
    _customIcon: [{ type: ContentChild, args: [MatDatepickerToggleIcon,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MatDatepickerModule {
}
MatDatepickerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MatButtonModule,
                    MatDialogModule,
                    MatIconModule,
                    OverlayModule,
                    A11yModule
                ],
                exports: [
                    MatCalendar,
                    MatCalendarBody,
                    MatDatepicker,
                    MatDatepickerContent,
                    MatDatepickerInput,
                    MatDatepickerToggle,
                    MatDatepickerToggleIcon,
                    MatClockView,
                    MatMonthView,
                    MatYearView,
                    MatYearsView
                ],
                declarations: [
                    MatCalendar,
                    MatCalendarBody,
                    MatDatepicker,
                    MatDatepickerContent,
                    MatDatepickerInput,
                    MatDatepickerToggle,
                    MatDatepickerToggleIcon,
                    MatClockView,
                    MatMonthView,
                    MatYearView,
                    MatYearsView
                ],
                providers: [MatDatepickerIntl, MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER],
                entryComponents: [MatDatepickerContent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { CLOCK_INNER_RADIUS, CLOCK_OUTER_RADIUS, CLOCK_RADIUS, CLOCK_TICK_RADIUS, DateAdapter, MAT_DATEPICKER_SCROLL_STRATEGY, MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY, MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER, MAT_DATEPICKER_VALIDATORS, MAT_DATEPICKER_VALUE_ACCESSOR, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_DATE_LOCALE_FACTORY, MAT_DATE_LOCALE_PROVIDER, MAT_MOMENT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, MatCalendar, MatCalendarBody, MatCalendarCell, MatClockView, MatDatepicker, MatDatepickerContent, MatDatepickerInput, MatDatepickerInputEvent, MatDatepickerIntl, MatDatepickerModule, MatDatepickerToggle, MatDatepickerToggleIcon, MatMomentDateModule, MatMonthView, MatNativeDateModule, MatYearView, MatYearsView, MomentDateAdapter, MomentDateModule, NativeDateAdapter, NativeDateModule, slideCalendar as ɵa, controlActive as ɵb, transformPanel as ɵc, fadeInCalendar as ɵd };
//# sourceMappingURL=martindalec-datepicker.js.map
