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
import { Platform } from '@angular/cdk/platform';
import { Inject, Injectable, Optional } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from './date-adapter';
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
export class NativeDateAdapter extends DateAdapter {
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
if (false) {
    /**
     * Whether to clamp the date between 1 and 9999 to avoid IE and Edge errors.
     * @type {?}
     * @private
     */
    NativeDateAdapter.prototype._clampDate;
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
     * @type {?}
     */
    NativeDateAdapter.prototype.useUtcForDisplay;
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlLWRhdGUtYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtYXJ0aW5kYWxlYy9kYXRlcGlja2VyLyIsInNvdXJjZXMiOlsiY29yZS9uYXRpdmUtZGF0ZS1hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7TUFJeEQsaUJBQWlCLEdBQUcsT0FBTyxJQUFJLEtBQUssV0FBVzs7Ozs7TUFHL0MsbUJBQW1CLEdBQUc7SUFDMUIsSUFBSSxFQUFFO1FBQ0osU0FBUztRQUNULFVBQVU7UUFDVixPQUFPO1FBQ1AsT0FBTztRQUNQLEtBQUs7UUFDTCxNQUFNO1FBQ04sTUFBTTtRQUNOLFFBQVE7UUFDUixXQUFXO1FBQ1gsU0FBUztRQUNULFVBQVU7UUFDVixVQUFVO0tBQ1g7SUFDRCxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztJQUMzRixNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztDQUNyRTs7Ozs7QUFHb0MsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7Ozs7TUFBakQsa0JBQWtCLEdBQUcsS0FB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Q2hCLElBQUksQ0FBQyxHQUFHLENBQ04sSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUNsQixJQUFJLENBQUMsUUFBUSxFQUFFLEVBQ2YsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUNkLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFDZixJQUFJLENBQUMsVUFBVSxFQUFFLEVBQ2pCLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFDakIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUN2QixDQUNGO1FBQ0QsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7OztZQWxWRixVQUFVOzs7O1lBN0RGLFFBQVE7eUNBaUZaLFFBQVEsWUFDUixNQUFNLFNBQUMsZUFBZTs7Ozs7Ozs7SUFsQnpCLHVDQUFxQzs7Ozs7Ozs7Ozs7OztJQWFyQyw2Q0FBaUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcclxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxyXG4gKi9cclxuXHJcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcclxuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEYXRlQWRhcHRlciwgTUFUX0RBVEVfTE9DQUxFIH0gZnJvbSAnLi9kYXRlLWFkYXB0ZXInO1xyXG5cclxuLy8gVE9ETyhtbWFsZXJiYSk6IFJlbW92ZSB3aGVuIHdlIG5vIGxvbmdlciBzdXBwb3J0IHNhZmFyaSA5LlxyXG4vKiogV2hldGhlciB0aGUgYnJvd3NlciBzdXBwb3J0cyB0aGUgSW50bCBBUEkuICovXHJcbmNvbnN0IFNVUFBPUlRTX0lOVExfQVBJID0gdHlwZW9mIEludGwgIT09ICd1bmRlZmluZWQnO1xyXG5cclxuLyoqIFRoZSBkZWZhdWx0IG1vbnRoIG5hbWVzIHRvIHVzZSBpZiBJbnRsIEFQSSBpcyBub3QgYXZhaWxhYmxlLiAqL1xyXG5jb25zdCBERUZBVUxUX01PTlRIX05BTUVTID0ge1xyXG4gIGxvbmc6IFtcclxuICAgICdKYW51YXJ5JyxcclxuICAgICdGZWJydWFyeScsXHJcbiAgICAnTWFyY2gnLFxyXG4gICAgJ0FwcmlsJyxcclxuICAgICdNYXknLFxyXG4gICAgJ0p1bmUnLFxyXG4gICAgJ0p1bHknLFxyXG4gICAgJ0F1Z3VzdCcsXHJcbiAgICAnU2VwdGVtYmVyJyxcclxuICAgICdPY3RvYmVyJyxcclxuICAgICdOb3ZlbWJlcicsXHJcbiAgICAnRGVjZW1iZXInXHJcbiAgXSxcclxuICBzaG9ydDogWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsICdPY3QnLCAnTm92JywgJ0RlYyddLFxyXG4gIG5hcnJvdzogWydKJywgJ0YnLCAnTScsICdBJywgJ00nLCAnSicsICdKJywgJ0EnLCAnUycsICdPJywgJ04nLCAnRCddXHJcbn07XHJcblxyXG4vKiogVGhlIGRlZmF1bHQgZGF0ZSBuYW1lcyB0byB1c2UgaWYgSW50bCBBUEkgaXMgbm90IGF2YWlsYWJsZS4gKi9cclxuY29uc3QgREVGQVVMVF9EQVRFX05BTUVTID0gcmFuZ2UoMzEsIGkgPT4gU3RyaW5nKGkgKyAxKSk7XHJcblxyXG4vKiogVGhlIGRlZmF1bHQgaG91ciBuYW1lcyB0byB1c2UgaWYgSW50bCBBUEkgaXMgbm90IGF2YWlsYWJsZS4gKi9cclxuY29uc3QgREVGQVVMVF9IT1VSX05BTUVTID0gcmFuZ2UoMjQsIFN0cmluZyk7XHJcblxyXG4vKiogVGhlIGRlZmF1bHQgbWludXRlIG5hbWVzIHRvIHVzZSBpZiBJbnRsIEFQSSBpcyBub3QgYXZhaWxhYmxlLiAqL1xyXG5jb25zdCBERUZBVUxUX01JTlVURV9OQU1FUyA9IHJhbmdlKDYwLCBTdHJpbmcpO1xyXG5cclxuLyoqIFRoZSBkZWZhdWx0IGRheSBvZiB0aGUgd2VlayBuYW1lcyB0byB1c2UgaWYgSW50bCBBUEkgaXMgbm90IGF2YWlsYWJsZS4gKi9cclxuY29uc3QgREVGQVVMVF9EQVlfT0ZfV0VFS19OQU1FUyA9IHtcclxuICBsb25nOiBbJ1N1bmRheScsICdNb25kYXknLCAnVHVlc2RheScsICdXZWRuZXNkYXknLCAnVGh1cnNkYXknLCAnRnJpZGF5JywgJ1NhdHVyZGF5J10sXHJcbiAgc2hvcnQ6IFsnU3VuJywgJ01vbicsICdUdWUnLCAnV2VkJywgJ1RodScsICdGcmknLCAnU2F0J10sXHJcbiAgbmFycm93OiBbJ1MnLCAnTScsICdUJywgJ1cnLCAnVCcsICdGJywgJ1MnXVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIE1hdGNoZXMgc3RyaW5ncyB0aGF0IGhhdmUgdGhlIGZvcm0gb2YgYSB2YWxpZCBSRkMgMzMzOSBzdHJpbmdcclxuICogKGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzMzM5KS4gTm90ZSB0aGF0IHRoZSBzdHJpbmcgbWF5IG5vdCBhY3R1YWxseSBiZSBhIHZhbGlkIGRhdGVcclxuICogYmVjYXVzZSB0aGUgcmVnZXggd2lsbCBtYXRjaCBzdHJpbmdzIGFuIHdpdGggb3V0IG9mIGJvdW5kcyBtb250aCwgZGF0ZSwgZXRjLlxyXG4gKi9cclxuY29uc3QgSVNPXzg2MDFfUkVHRVggPSAvXlxcZHs0fS1cXGR7Mn0tXFxkezJ9KD86VFxcZHsyfTpcXGR7Mn06XFxkezJ9KD86XFwuXFxkKyk/KD86WnwoPzooPzpcXCt8LSlcXGR7Mn06XFxkezJ9KSk/KT8kLztcclxuXHJcbi8qKiBDcmVhdGVzIGFuIGFycmF5IGFuZCBmaWxscyBpdCB3aXRoIHZhbHVlcy4gKi9cclxuZnVuY3Rpb24gcmFuZ2U8VD4obGVuZ3RoOiBudW1iZXIsIHZhbHVlRnVuY3Rpb246IChpbmRleDogbnVtYmVyKSA9PiBUKTogVFtdIHtcclxuICBjb25zdCB2YWx1ZXNBcnJheSA9IEFycmF5KGxlbmd0aCk7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgdmFsdWVzQXJyYXlbaV0gPSB2YWx1ZUZ1bmN0aW9uKGkpO1xyXG4gIH1cclxuICByZXR1cm4gdmFsdWVzQXJyYXk7XHJcbn1cclxuXHJcbi8qKiBBZGFwdHMgdGhlIG5hdGl2ZSBKUyBEYXRlIGZvciB1c2Ugd2l0aCBjZGstYmFzZWQgY29tcG9uZW50cyB0aGF0IHdvcmsgd2l0aCBkYXRlcy4gKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTmF0aXZlRGF0ZUFkYXB0ZXIgZXh0ZW5kcyBEYXRlQWRhcHRlcjxEYXRlPiB7XHJcbiAgLyoqIFdoZXRoZXIgdG8gY2xhbXAgdGhlIGRhdGUgYmV0d2VlbiAxIGFuZCA5OTk5IHRvIGF2b2lkIElFIGFuZCBFZGdlIGVycm9ycy4gKi9cclxuICBwcml2YXRlIHJlYWRvbmx5IF9jbGFtcERhdGU6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZXRoZXIgdG8gdXNlIGB0aW1lWm9uZTogJ3V0YydgIHdpdGggYEludGwuRGF0ZVRpbWVGb3JtYXRgIHdoZW4gZm9ybWF0dGluZyBkYXRlcy5cclxuICAgKiBXaXRob3V0IHRoaXMgYEludGwuRGF0ZVRpbWVGb3JtYXRgIHNvbWV0aW1lcyBjaG9vc2VzIHRoZSB3cm9uZyB0aW1lWm9uZSwgd2hpY2ggY2FuIHRocm93IG9mZlxyXG4gICAqIHRoZSByZXN1bHQuIChlLmcuIGluIHRoZSBlbi1VUyBsb2NhbGUgYG5ldyBEYXRlKDE4MDAsIDcsIDE0KS50b0xvY2FsZURhdGVTdHJpbmcoKWBcclxuICAgKiB3aWxsIHByb2R1Y2UgYCc4LzEzLzE4MDAnYC5cclxuICAgKlxyXG4gICAqIFRPRE8obW1hbGVyYmEpOiBkcm9wIHRoaXMgdmFyaWFibGUuIEl0J3Mgbm90IGJlaW5nIHVzZWQgaW4gdGhlIGNvZGUgcmlnaHQgbm93LiBXZSdyZSBub3dcclxuICAgKiBnZXR0aW5nIHRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSBEYXRlIG9iamVjdCBmcm9tIGl0J3MgdXRjIHJlcHJlc2VudGF0aW9uLiBXZSdyZSBrZWVwaW5nXHJcbiAgICogaXQgaGVyZSBmb3Igc29tZXRpbWUsIGp1c3QgZm9yIHByZWNhdXRpb24sIGluIGNhc2Ugd2UgZGVjaWRlIHRvIHJldmVydCBzb21lIG9mIHRoZXNlIGNoYW5nZXNcclxuICAgKiB0aG91Z2guXHJcbiAgICovXHJcbiAgdXNlVXRjRm9yRGlzcGxheTogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcGxhdGZvcm06IFBsYXRmb3JtLFxyXG4gICAgQE9wdGlvbmFsKClcclxuICAgIEBJbmplY3QoTUFUX0RBVEVfTE9DQUxFKVxyXG4gICAgbWF0RGF0ZUxvY2FsZTogc3RyaW5nXHJcbiAgKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgc3VwZXIuc2V0TG9jYWxlKG1hdERhdGVMb2NhbGUpO1xyXG5cclxuICAgIC8vIElFIGRvZXMgaXRzIG93biB0aW1lIHpvbmUgY29ycmVjdGlvbiwgc28gd2UgZGlzYWJsZSB0aGlzIG9uIElFLlxyXG4gICAgdGhpcy51c2VVdGNGb3JEaXNwbGF5ID0gIXBsYXRmb3JtLlRSSURFTlQ7XHJcbiAgICB0aGlzLl9jbGFtcERhdGUgPSBwbGF0Zm9ybS5UUklERU5UIHx8IHBsYXRmb3JtLkVER0U7XHJcbiAgfVxyXG5cclxuICBnZXRZZWFyKGRhdGU6IERhdGUpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIGRhdGUuZ2V0RnVsbFllYXIoKTtcclxuICB9XHJcblxyXG4gIGdldE1vbnRoKGRhdGU6IERhdGUpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIGRhdGUuZ2V0TW9udGgoKTtcclxuICB9XHJcblxyXG4gIGdldERhdGUoZGF0ZTogRGF0ZSk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gZGF0ZS5nZXREYXRlKCk7XHJcbiAgfVxyXG5cclxuICBnZXRIb3VycyhkYXRlOiBEYXRlKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBkYXRlLmdldEhvdXJzKCk7XHJcbiAgfVxyXG5cclxuICBzZXRIb3VycyhkYXRlOiBEYXRlLCB2YWx1ZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICBkYXRlLnNldEhvdXJzKHZhbHVlKTtcclxuICB9XHJcblxyXG4gIGdldE1pbnV0ZXMoZGF0ZTogRGF0ZSk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gZGF0ZS5nZXRNaW51dGVzKCk7XHJcbiAgfVxyXG5cclxuICBzZXRNaW51dGVzKGRhdGU6IERhdGUsIHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcclxuICAgIGRhdGUuc2V0TWludXRlcyh2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBzZXRTZWNvbmRzKGRhdGU6IERhdGUsIHZhbHVlOiBudW1iZXIsIG1zPzogbnVtYmVyKTogdm9pZCB7XHJcbiAgICBkYXRlLnNldFNlY29uZHModmFsdWUsIG1zKTtcclxuICB9XHJcblxyXG4gIGdldERheU9mV2VlayhkYXRlOiBEYXRlKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBkYXRlLmdldERheSgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0TW9udGhOYW1lcyhzdHlsZTogJ2xvbmcnIHwgJ3Nob3J0JyB8ICduYXJyb3cnKTogc3RyaW5nW10ge1xyXG4gICAgaWYgKFNVUFBPUlRTX0lOVExfQVBJKSB7XHJcbiAgICAgIGNvbnN0IGR0ZiA9IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KHRoaXMubG9jYWxlLCB7IG1vbnRoOiBzdHlsZSwgdGltZVpvbmU6ICd1dGMnIH0pO1xyXG4gICAgICByZXR1cm4gcmFuZ2UoMTIsIGkgPT4gdGhpcy5fc3RyaXBEaXJlY3Rpb25hbGl0eUNoYXJhY3RlcnModGhpcy5fZm9ybWF0KGR0ZiwgbmV3IERhdGUoMjAxNywgaSwgMSkpKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gREVGQVVMVF9NT05USF9OQU1FU1tzdHlsZV07XHJcbiAgfVxyXG5cclxuICBnZXREYXRlTmFtZXMoKTogc3RyaW5nW10ge1xyXG4gICAgaWYgKFNVUFBPUlRTX0lOVExfQVBJKSB7XHJcbiAgICAgIGNvbnN0IGR0ZiA9IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KHRoaXMubG9jYWxlLCB7IGRheTogJ251bWVyaWMnLCB0aW1lWm9uZTogJ3V0YycgfSk7XHJcbiAgICAgIHJldHVybiByYW5nZSgzMSwgaSA9PiB0aGlzLl9zdHJpcERpcmVjdGlvbmFsaXR5Q2hhcmFjdGVycyh0aGlzLl9mb3JtYXQoZHRmLCBuZXcgRGF0ZSgyMDE3LCAwLCBpICsgMSkpKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gREVGQVVMVF9EQVRFX05BTUVTO1xyXG4gIH1cclxuXHJcbiAgZ2V0SG91ck5hbWVzKCk6IHN0cmluZ1tdIHtcclxuICAgIGlmIChTVVBQT1JUU19JTlRMX0FQSSkge1xyXG4gICAgICBjb25zdCBkdGYgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCh0aGlzLmxvY2FsZSwgeyBob3VyOiAnbnVtZXJpYycsIHRpbWVab25lOiAndXRjJyB9KTtcclxuICAgICAgcmV0dXJuIHJhbmdlKDI0LCBpID0+IHRoaXMuX3N0cmlwRGlyZWN0aW9uYWxpdHlDaGFyYWN0ZXJzKGR0Zi5mb3JtYXQobmV3IERhdGUoMjAxNywgMCwgMCwgaSkpKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gREVGQVVMVF9IT1VSX05BTUVTO1xyXG4gIH1cclxuXHJcbiAgZ2V0TWludXRlTmFtZXMoKTogc3RyaW5nW10ge1xyXG4gICAgaWYgKFNVUFBPUlRTX0lOVExfQVBJKSB7XHJcbiAgICAgIGNvbnN0IGR0ZiA9IG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KHRoaXMubG9jYWxlLCB7IG1pbnV0ZTogJ251bWVyaWMnLCB0aW1lWm9uZTogJ3V0YycgfSk7XHJcbiAgICAgIHJldHVybiByYW5nZSg2MCwgaSA9PiB0aGlzLl9zdHJpcERpcmVjdGlvbmFsaXR5Q2hhcmFjdGVycyhkdGYuZm9ybWF0KG5ldyBEYXRlKDIwMTcsIDAsIDAsIDAsIGkpKSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIERFRkFVTFRfTUlOVVRFX05BTUVTO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGF5T2ZXZWVrTmFtZXMoc3R5bGU6ICdsb25nJyB8ICdzaG9ydCcgfCAnbmFycm93Jyk6IHN0cmluZ1tdIHtcclxuICAgIGlmIChTVVBQT1JUU19JTlRMX0FQSSkge1xyXG4gICAgICBjb25zdCBkdGYgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCh0aGlzLmxvY2FsZSwgeyB3ZWVrZGF5OiBzdHlsZSwgdGltZVpvbmU6ICd1dGMnIH0pO1xyXG4gICAgICByZXR1cm4gcmFuZ2UoNywgaSA9PiB0aGlzLl9zdHJpcERpcmVjdGlvbmFsaXR5Q2hhcmFjdGVycyh0aGlzLl9mb3JtYXQoZHRmLCBuZXcgRGF0ZSgyMDE3LCAwLCBpICsgMSkpKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gREVGQVVMVF9EQVlfT0ZfV0VFS19OQU1FU1tzdHlsZV07XHJcbiAgfVxyXG5cclxuICBnZXRZZWFyTmFtZShkYXRlOiBEYXRlKTogc3RyaW5nIHtcclxuICAgIGlmIChTVVBQT1JUU19JTlRMX0FQSSkge1xyXG4gICAgICBjb25zdCBkdGYgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCh0aGlzLmxvY2FsZSwgeyB5ZWFyOiAnbnVtZXJpYycsIHRpbWVab25lOiAndXRjJyB9KTtcclxuICAgICAgcmV0dXJuIHRoaXMuX3N0cmlwRGlyZWN0aW9uYWxpdHlDaGFyYWN0ZXJzKHRoaXMuX2Zvcm1hdChkdGYsIGRhdGUpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBTdHJpbmcodGhpcy5nZXRZZWFyKGRhdGUpKTtcclxuICB9XHJcblxyXG4gIGdldEZpcnN0RGF5T2ZXZWVrKCk6IG51bWJlciB7XHJcbiAgICAvLyBXZSBjYW4ndCB0ZWxsIHVzaW5nIG5hdGl2ZSBKUyBEYXRlIHdoYXQgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2VlayBpcywgd2UgZGVmYXVsdCB0byBTdW5kYXkuXHJcbiAgICByZXR1cm4gMDtcclxuICB9XHJcblxyXG4gIGdldE51bURheXNJbk1vbnRoKGRhdGU6IERhdGUpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0RGF0ZSh0aGlzLl9jcmVhdGVEYXRlV2l0aE92ZXJmbG93KHRoaXMuZ2V0WWVhcihkYXRlKSwgdGhpcy5nZXRNb250aChkYXRlKSArIDEsIDApKTtcclxuICB9XHJcblxyXG4gIGNsb25lKGRhdGU6IERhdGUpOiBEYXRlIHtcclxuICAgIHJldHVybiB0aGlzLmNyZWF0ZURhdGUoXHJcbiAgICAgIHRoaXMuZ2V0WWVhcihkYXRlKSxcclxuICAgICAgdGhpcy5nZXRNb250aChkYXRlKSxcclxuICAgICAgdGhpcy5nZXREYXRlKGRhdGUpLFxyXG4gICAgICB0aGlzLmdldEhvdXJzKGRhdGUpLFxyXG4gICAgICB0aGlzLmdldE1pbnV0ZXMoZGF0ZSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVEYXRlKHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlciwgZGF0ZTogbnVtYmVyLCBob3Vycz86IG51bWJlciwgbWludXRlcz86IG51bWJlcik6IERhdGUge1xyXG4gICAgLy8gQ2hlY2sgZm9yIGludmFsaWQgbW9udGggYW5kIGRhdGUgKGV4Y2VwdCB1cHBlciBib3VuZCBvbiBkYXRlIHdoaWNoIHdlIGhhdmUgdG8gY2hlY2sgYWZ0ZXJcclxuICAgIC8vIGNyZWF0aW5nIHRoZSBEYXRlKS5cclxuICAgIGlmIChtb250aCA8IDAgfHwgbW9udGggPiAxMSkge1xyXG4gICAgICB0aHJvdyBFcnJvcihgSW52YWxpZCBtb250aCBpbmRleCBcIiR7bW9udGh9XCIuIE1vbnRoIGluZGV4IGhhcyB0byBiZSBiZXR3ZWVuIDAgYW5kIDExLmApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkYXRlIDwgMSkge1xyXG4gICAgICB0aHJvdyBFcnJvcihgSW52YWxpZCBkYXRlIFwiJHtkYXRlfVwiLiBEYXRlIGhhcyB0byBiZSBncmVhdGVyIHRoYW4gMC5gKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLl9jcmVhdGVEYXRlV2l0aE92ZXJmbG93KHllYXIsIG1vbnRoLCBkYXRlLCBob3VycywgbWludXRlcyk7XHJcblxyXG4gICAgLy8gQ2hlY2sgdGhhdCB0aGUgZGF0ZSB3YXNuJ3QgYWJvdmUgdGhlIHVwcGVyIGJvdW5kIGZvciB0aGUgbW9udGgsIGNhdXNpbmcgdGhlIG1vbnRoIHRvIG92ZXJmbG93XHJcbiAgICBpZiAocmVzdWx0LmdldE1vbnRoKCkgIT09IG1vbnRoKSB7XHJcbiAgICAgIHRocm93IEVycm9yKGBJbnZhbGlkIGRhdGUgXCIke2RhdGV9XCIgZm9yIG1vbnRoIHdpdGggaW5kZXggXCIke21vbnRofVwiLmApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICB0b2RheSgpOiBEYXRlIHtcclxuICAgIHJldHVybiBuZXcgRGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgcGFyc2UodmFsdWU6IGFueSk6IERhdGUgfCBudWxsIHtcclxuICAgIC8vIFdlIGhhdmUgbm8gd2F5IHVzaW5nIHRoZSBuYXRpdmUgSlMgRGF0ZSB0byBzZXQgdGhlIHBhcnNlIGZvcm1hdCBvciBsb2NhbGUsIHNvIHdlIGlnbm9yZSB0aGVzZVxyXG4gICAgLy8gcGFyYW1ldGVycy5cclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XHJcbiAgICAgIHJldHVybiBuZXcgRGF0ZSh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsdWUgPyBuZXcgRGF0ZShEYXRlLnBhcnNlKHZhbHVlKSkgOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgZm9ybWF0KGRhdGU6IERhdGUsIGRpc3BsYXlGb3JtYXQ6IE9iamVjdCk6IHN0cmluZyB7XHJcbiAgICBpZiAoIXRoaXMuaXNWYWxpZChkYXRlKSkge1xyXG4gICAgICB0aHJvdyBFcnJvcignTmF0aXZlRGF0ZUFkYXB0ZXI6IENhbm5vdCBmb3JtYXQgaW52YWxpZCBkYXRlLicpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChTVVBQT1JUU19JTlRMX0FQSSkge1xyXG4gICAgICAvLyBPbiBJRSBhbmQgRWRnZSB0aGUgaTE4biBBUEkgd2lsbCB0aHJvdyBhIGhhcmQgZXJyb3IgdGhhdCBjYW4gY3Jhc2ggdGhlIGVudGlyZSBhcHBcclxuICAgICAgLy8gaWYgd2UgYXR0ZW1wdCB0byBmb3JtYXQgYSBkYXRlIHdob3NlIHllYXIgaXMgbGVzcyB0aGFuIDEgb3IgZ3JlYXRlciB0aGFuIDk5OTkuXHJcbiAgICAgIGlmICh0aGlzLl9jbGFtcERhdGUgJiYgKGRhdGUuZ2V0RnVsbFllYXIoKSA8IDEgfHwgZGF0ZS5nZXRGdWxsWWVhcigpID4gOTk5OSkpIHtcclxuICAgICAgICBkYXRlID0gdGhpcy5jbG9uZShkYXRlKTtcclxuICAgICAgICBkYXRlLnNldEZ1bGxZZWFyKE1hdGgubWF4KDEsIE1hdGgubWluKDk5OTksIGRhdGUuZ2V0RnVsbFllYXIoKSkpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZGlzcGxheUZvcm1hdCA9IHsgLi4uZGlzcGxheUZvcm1hdCwgdGltZVpvbmU6ICd1dGMnIH07XHJcblxyXG4gICAgICBjb25zdCBkdGYgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCh0aGlzLmxvY2FsZSwgZGlzcGxheUZvcm1hdCk7XHJcbiAgICAgIHJldHVybiB0aGlzLl9zdHJpcERpcmVjdGlvbmFsaXR5Q2hhcmFjdGVycyh0aGlzLl9mb3JtYXQoZHRmLCBkYXRlKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5fc3RyaXBEaXJlY3Rpb25hbGl0eUNoYXJhY3RlcnMoZGF0ZS50b0RhdGVTdHJpbmcoKSk7XHJcbiAgfVxyXG5cclxuICBhZGRDYWxlbmRhclllYXJzKGRhdGU6IERhdGUsIHllYXJzOiBudW1iZXIpOiBEYXRlIHtcclxuICAgIHJldHVybiB0aGlzLmFkZENhbGVuZGFyTW9udGhzKGRhdGUsIHllYXJzICogMTIpO1xyXG4gIH1cclxuXHJcbiAgYWRkQ2FsZW5kYXJNb250aHMoZGF0ZTogRGF0ZSwgbW9udGhzOiBudW1iZXIpOiBEYXRlIHtcclxuICAgIGxldCBuZXdEYXRlID0gdGhpcy5fY3JlYXRlRGF0ZVdpdGhPdmVyZmxvdyhcclxuICAgICAgdGhpcy5nZXRZZWFyKGRhdGUpLFxyXG4gICAgICB0aGlzLmdldE1vbnRoKGRhdGUpICsgbW9udGhzLFxyXG4gICAgICB0aGlzLmdldERhdGUoZGF0ZSksXHJcbiAgICAgIHRoaXMuZ2V0SG91cnMoZGF0ZSksXHJcbiAgICAgIHRoaXMuZ2V0TWludXRlcyhkYXRlKVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBJdCdzIHBvc3NpYmxlIHRvIHdpbmQgdXAgaW4gdGhlIHdyb25nIG1vbnRoIGlmIHRoZSBvcmlnaW5hbCBtb250aCBoYXMgbW9yZSBkYXlzIHRoYW4gdGhlIG5ld1xyXG4gICAgLy8gbW9udGguIEluIHRoaXMgY2FzZSB3ZSB3YW50IHRvIGdvIHRvIHRoZSBsYXN0IGRheSBvZiB0aGUgZGVzaXJlZCBtb250aC5cclxuICAgIC8vIE5vdGU6IHRoZSBhZGRpdGlvbmFsICsgMTIgJSAxMiBlbnN1cmVzIHdlIGVuZCB1cCB3aXRoIGEgcG9zaXRpdmUgbnVtYmVyLCBzaW5jZSBKUyAlIGRvZXNuJ3RcclxuICAgIC8vIGd1YXJhbnRlZSB0aGlzLlxyXG4gICAgaWYgKHRoaXMuZ2V0TW9udGgobmV3RGF0ZSkgIT09ICgodGhpcy5nZXRNb250aChkYXRlKSArIG1vbnRocykgJSAxMiArIDEyKSAlIDEyKSB7XHJcbiAgICAgIG5ld0RhdGUgPSB0aGlzLl9jcmVhdGVEYXRlV2l0aE92ZXJmbG93KHRoaXMuZ2V0WWVhcihuZXdEYXRlKSwgdGhpcy5nZXRNb250aChuZXdEYXRlKSwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ld0RhdGU7XHJcbiAgfVxyXG5cclxuICBhZGRDYWxlbmRhckRheXMoZGF0ZTogRGF0ZSwgZGF5czogbnVtYmVyKTogRGF0ZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY3JlYXRlRGF0ZVdpdGhPdmVyZmxvdyhcclxuICAgICAgdGhpcy5nZXRZZWFyKGRhdGUpLFxyXG4gICAgICB0aGlzLmdldE1vbnRoKGRhdGUpLFxyXG4gICAgICB0aGlzLmdldERhdGUoZGF0ZSkgKyBkYXlzLFxyXG4gICAgICB0aGlzLmdldEhvdXJzKGRhdGUpLFxyXG4gICAgICB0aGlzLmdldE1pbnV0ZXMoZGF0ZSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBhZGRDYWxlbmRhckhvdXJzKGRhdGU6IERhdGUsIGhvdXJzOiBudW1iZXIpOiBEYXRlIHtcclxuICAgIHJldHVybiB0aGlzLl9jcmVhdGVEYXRlV2l0aE92ZXJmbG93KFxyXG4gICAgICB0aGlzLmdldFllYXIoZGF0ZSksXHJcbiAgICAgIHRoaXMuZ2V0TW9udGgoZGF0ZSksXHJcbiAgICAgIHRoaXMuZ2V0RGF0ZShkYXRlKSxcclxuICAgICAgdGhpcy5nZXRIb3VycyhkYXRlKSArIGhvdXJzLFxyXG4gICAgICB0aGlzLmdldE1pbnV0ZXMoZGF0ZSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBhZGRDYWxlbmRhck1pbnV0ZXMoZGF0ZTogRGF0ZSwgbWludXRlczogbnVtYmVyKTogRGF0ZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY3JlYXRlRGF0ZVdpdGhPdmVyZmxvdyhcclxuICAgICAgdGhpcy5nZXRZZWFyKGRhdGUpLFxyXG4gICAgICB0aGlzLmdldE1vbnRoKGRhdGUpLFxyXG4gICAgICB0aGlzLmdldERhdGUoZGF0ZSksXHJcbiAgICAgIHRoaXMuZ2V0SG91cnMoZGF0ZSksXHJcbiAgICAgIHRoaXMuZ2V0TWludXRlcyhkYXRlKSArIG1pbnV0ZXNcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICB0b0lzbzg2MDEoZGF0ZTogRGF0ZSk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gW2RhdGUuZ2V0VVRDRnVsbFllYXIoKSwgdGhpcy5fMmRpZ2l0KGRhdGUuZ2V0VVRDTW9udGgoKSArIDEpLCB0aGlzLl8yZGlnaXQoZGF0ZS5nZXRVVENEYXRlKCkpXS5qb2luKCctJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBnaXZlbiB2YWx1ZSBpZiBnaXZlbiBhIHZhbGlkIERhdGUgb3IgbnVsbC4gRGVzZXJpYWxpemVzIHZhbGlkIElTTyA4NjAxIHN0cmluZ3NcclxuICAgKiAoaHR0cHM6Ly93d3cuaWV0Zi5vcmcvcmZjL3JmYzMzMzkudHh0KSBpbnRvIHZhbGlkIERhdGVzIGFuZCBlbXB0eSBzdHJpbmcgaW50byBudWxsLiBSZXR1cm5zIGFuXHJcbiAgICogaW52YWxpZCBkYXRlIGZvciBhbGwgb3RoZXIgdmFsdWVzLlxyXG4gICAqL1xyXG4gIGRlc2VyaWFsaXplKHZhbHVlOiBhbnkpOiBEYXRlIHwgbnVsbCB7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICBpZiAoIXZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuICAgICAgLy8gVGhlIGBEYXRlYCBjb25zdHJ1Y3RvciBhY2NlcHRzIGZvcm1hdHMgb3RoZXIgdGhhbiBJU08gODYwMSwgc28gd2UgbmVlZCB0byBtYWtlIHN1cmUgdGhlXHJcbiAgICAgIC8vIHN0cmluZyBpcyB0aGUgcmlnaHQgZm9ybWF0IGZpcnN0LlxyXG4gICAgICBpZiAoSVNPXzg2MDFfUkVHRVgudGVzdCh2YWx1ZSkpIHtcclxuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKHZhbHVlKTtcclxuICAgICAgICBpZiAodGhpcy5pc1ZhbGlkKGRhdGUpKSB7XHJcbiAgICAgICAgICByZXR1cm4gZGF0ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBzdXBlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBpc0RhdGVJbnN0YW5jZShvYmo6IGFueSkge1xyXG4gICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIERhdGU7XHJcbiAgfVxyXG5cclxuICBpc1ZhbGlkKGRhdGU6IERhdGUpIHtcclxuICAgIHJldHVybiAhaXNOYU4oZGF0ZS5nZXRUaW1lKCkpO1xyXG4gIH1cclxuXHJcbiAgaW52YWxpZCgpOiBEYXRlIHtcclxuICAgIHJldHVybiBuZXcgRGF0ZShOYU4pO1xyXG4gIH1cclxuXHJcbiAgLyoqIENyZWF0ZXMgYSBkYXRlIGJ1dCBhbGxvd3MgdGhlIG1vbnRoIGFuZCBkYXRlIHRvIG92ZXJmbG93LiAqL1xyXG4gIHByaXZhdGUgX2NyZWF0ZURhdGVXaXRoT3ZlcmZsb3coeWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyLCBkYXRlOiBudW1iZXIsIGhvdXJzPzogbnVtYmVyLCBtaW51dGVzPzogbnVtYmVyKSB7XHJcbiAgICBjb25zdCByZXN1bHQgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgZGF0ZSwgaG91cnMsIG1pbnV0ZXMsIDApO1xyXG5cclxuICAgIC8vIFdlIG5lZWQgdG8gY29ycmVjdCBmb3IgdGhlIGZhY3QgdGhhdCBKUyBuYXRpdmUgRGF0ZSB0cmVhdHMgeWVhcnMgaW4gcmFuZ2UgWzAsIDk5XSBhc1xyXG4gICAgLy8gYWJicmV2aWF0aW9ucyBmb3IgMTl4eC5cclxuICAgIGlmICh5ZWFyID49IDAgJiYgeWVhciA8IDEwMCkge1xyXG4gICAgICByZXN1bHQuc2V0RnVsbFllYXIodGhpcy5nZXRZZWFyKHJlc3VsdCkgLSAxOTAwKTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQYWRzIGEgbnVtYmVyIHRvIG1ha2UgaXQgdHdvIGRpZ2l0cy5cclxuICAgKiBAcGFyYW0gbiBUaGUgbnVtYmVyIHRvIHBhZC5cclxuICAgKiBAcmV0dXJucyBUaGUgcGFkZGVkIG51bWJlci5cclxuICAgKi9cclxuICBwcml2YXRlIF8yZGlnaXQobjogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gKCcwMCcgKyBuKS5zbGljZSgtMik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdHJpcCBvdXQgdW5pY29kZSBMVFIgYW5kIFJUTCBjaGFyYWN0ZXJzLiBFZGdlIGFuZCBJRSBpbnNlcnQgdGhlc2UgaW50byBmb3JtYXR0ZWQgZGF0ZXMgd2hpbGVcclxuICAgKiBvdGhlciBicm93c2VycyBkbyBub3QuIFdlIHJlbW92ZSB0aGVtIHRvIG1ha2Ugb3V0cHV0IGNvbnNpc3RlbnQgYW5kIGJlY2F1c2UgdGhleSBpbnRlcmZlcmUgd2l0aFxyXG4gICAqIGRhdGUgcGFyc2luZy5cclxuICAgKiBAcGFyYW0gc3RyIFRoZSBzdHJpbmcgdG8gc3RyaXAgZGlyZWN0aW9uIGNoYXJhY3RlcnMgZnJvbS5cclxuICAgKiBAcmV0dXJucyBUaGUgc3RyaXBwZWQgc3RyaW5nLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3N0cmlwRGlyZWN0aW9uYWxpdHlDaGFyYWN0ZXJzKHN0cjogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1tcXHUyMDBlXFx1MjAwZl0vZywgJycpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBjb252ZXJ0aW5nIERhdGUgb2JqZWN0IHRvIHN0cmluZywgamF2YXNjcmlwdCBidWlsdC1pbiBmdW5jdGlvbnMgbWF5IHJldHVybiB3cm9uZ1xyXG4gICAqIHJlc3VsdHMgYmVjYXVzZSBpdCBhcHBsaWVzIGl0cyBpbnRlcm5hbCBEU1QgcnVsZXMuIFRoZSBEU1QgcnVsZXMgYXJvdW5kIHRoZSB3b3JsZCBjaGFuZ2VcclxuICAgKiB2ZXJ5IGZyZXF1ZW50bHksIGFuZCB0aGUgY3VycmVudCB2YWxpZCBydWxlIGlzIG5vdCBhbHdheXMgdmFsaWQgaW4gcHJldmlvdXMgeWVhcnMgdGhvdWdoLlxyXG4gICAqIFdlIHdvcmsgYXJvdW5kIHRoaXMgcHJvYmxlbSBidWlsZGluZyBhIG5ldyBEYXRlIG9iamVjdCB3aGljaCBoYXMgaXRzIGludGVybmFsIFVUQ1xyXG4gICAqIHJlcHJlc2VudGF0aW9uIHdpdGggdGhlIGxvY2FsIGRhdGUgYW5kIHRpbWUuXHJcbiAgICogQHBhcmFtIGR0ZiBJbnRsLkRhdGVUaW1lRm9ybWF0IG9iamVjdCwgY29udGFpbmcgdGhlIGRlc2lyZWQgc3RyaW5nIGZvcm1hdC4gSXQgbXVzdCBoYXZlXHJcbiAgICogICAgdGltZVpvbmUgc2V0IHRvICd1dGMnIHRvIHdvcmsgZmluZS5cclxuICAgKiBAcGFyYW0gZGF0ZSBEYXRlIGZyb20gd2hpY2ggd2Ugd2FudCB0byBnZXQgdGhlIHN0cmluZyByZXByZXNlbnRhdGlvbiBhY2NvcmRpbmcgdG8gZHRmXHJcbiAgICogQHJldHVybnMgQSBEYXRlIG9iamVjdCB3aXRoIGl0cyBVVEMgcmVwcmVzZW50YXRpb24gYmFzZWQgb24gdGhlIHBhc3NlZCBpbiBkYXRlIGluZm9cclxuICAgKi9cclxuICBwcml2YXRlIF9mb3JtYXQoZHRmOiBJbnRsLkRhdGVUaW1lRm9ybWF0LCBkYXRlOiBEYXRlKSB7XHJcbiAgICBjb25zdCBkID0gbmV3IERhdGUoXHJcbiAgICAgIERhdGUuVVRDKFxyXG4gICAgICAgIGRhdGUuZ2V0RnVsbFllYXIoKSxcclxuICAgICAgICBkYXRlLmdldE1vbnRoKCksXHJcbiAgICAgICAgZGF0ZS5nZXREYXRlKCksXHJcbiAgICAgICAgZGF0ZS5nZXRIb3VycygpLFxyXG4gICAgICAgIGRhdGUuZ2V0TWludXRlcygpLFxyXG4gICAgICAgIGRhdGUuZ2V0U2Vjb25kcygpLFxyXG4gICAgICAgIGRhdGUuZ2V0TWlsbGlzZWNvbmRzKClcclxuICAgICAgKVxyXG4gICAgKTtcclxuICAgIHJldHVybiBkdGYuZm9ybWF0KGQpO1xyXG4gIH1cclxufVxyXG4iXX0=