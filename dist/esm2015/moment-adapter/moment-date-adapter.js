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
import { Inject, Injectable, Optional } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '../core/index';
// TODO(mmalerba): See if we can clean this up at some point.
import * as momentNs from 'moment-timezone';
/** @type {?} */
const moment = momentNs;
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
 * Adapts Moment.js Dates for use with Angular Material.
 */
export class MomentDateAdapter extends DateAdapter {
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
            dates: range(31, (/**
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
        return range(24, String);
    }
    /**
     * @return {?}
     */
    getMinuteNames() {
        // TODO SUPPORTS_INTL_API
        return range(60, String);
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
if (false) {
    /**
     * @type {?}
     * @private
     */
    MomentDateAdapter.prototype._localeData;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9tZW50LWRhdGUtYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtYXJ0aW5kYWxlYy9kYXRlcGlja2VyLyIsInNvdXJjZXMiOlsibW9tZW50LWFkYXB0ZXIvbW9tZW50LWRhdGUtYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFHN0QsT0FBTyxLQUFLLFFBQVEsTUFBTSxpQkFBaUIsQ0FBQzs7TUFFdEMsTUFBTSxHQUFHLFFBQVE7Ozs7Ozs7O0FBR3ZCLFNBQVMsS0FBSyxDQUFJLE1BQWMsRUFBRSxhQUFtQzs7VUFDN0QsV0FBVyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDakMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUMvQixXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ25DO0lBQ0QsT0FBTyxXQUFXLENBQUM7QUFDckIsQ0FBQzs7OztBQUlELE1BQU0sT0FBTyxpQkFBa0IsU0FBUSxXQUFtQjs7OztJQWdCeEQsWUFHRSxVQUFrQjtRQUVsQixLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ2hELENBQUM7Ozs7O0lBRUQsU0FBUyxDQUFDLE1BQWM7UUFDdEIsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Y0FFbEIsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDbEQsSUFBSSxDQUFDLFdBQVcsR0FBRztZQUNqQixjQUFjLEVB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QUNiO1lBQ0QsSUFBSSxHQUFHLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDM0Q7UUFDRCxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzlCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxPQUFPLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7Ozs7SUFFRCxjQUFjLENBQUMsR0FBUTtRQUNyQixPQUFPLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNsRixDQUFDOzs7OztJQUVELE9BQU8sQ0FBQyxJQUFZO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNwQyxDQUFDOzs7O0lBRUQsT0FBTztRQUNMLE9BQU8sTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzFCLENBQUM7OztZQTlORixVQUFVOzs7O3lDQWtCTixRQUFRLFlBQ1IsTUFBTSxTQUFDLGVBQWU7Ozs7Ozs7SUFaekIsd0NBUUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXHJcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcclxuICovXHJcblxyXG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERhdGVBZGFwdGVyLCBNQVRfREFURV9MT0NBTEUgfSBmcm9tICcuLi9jb3JlL2luZGV4JztcclxuXHJcbi8vIFRPRE8obW1hbGVyYmEpOiBTZWUgaWYgd2UgY2FuIGNsZWFuIHRoaXMgdXAgYXQgc29tZSBwb2ludC5cclxuaW1wb3J0ICogYXMgbW9tZW50TnMgZnJvbSAnbW9tZW50LXRpbWV6b25lJztcclxuZXhwb3J0IHR5cGUgTW9tZW50ID0gbW9tZW50TnMuTW9tZW50O1xyXG5jb25zdCBtb21lbnQgPSBtb21lbnROcztcclxuXHJcbi8qKiBDcmVhdGVzIGFuIGFycmF5IGFuZCBmaWxscyBpdCB3aXRoIHZhbHVlcy4gKi9cclxuZnVuY3Rpb24gcmFuZ2U8VD4obGVuZ3RoOiBudW1iZXIsIHZhbHVlRnVuY3Rpb246IChpbmRleDogbnVtYmVyKSA9PiBUKTogVFtdIHtcclxuICBjb25zdCB2YWx1ZXNBcnJheSA9IEFycmF5KGxlbmd0aCk7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgdmFsdWVzQXJyYXlbaV0gPSB2YWx1ZUZ1bmN0aW9uKGkpO1xyXG4gIH1cclxuICByZXR1cm4gdmFsdWVzQXJyYXk7XHJcbn1cclxuXHJcbi8qKiBBZGFwdHMgTW9tZW50LmpzIERhdGVzIGZvciB1c2Ugd2l0aCBBbmd1bGFyIE1hdGVyaWFsLiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBNb21lbnREYXRlQWRhcHRlciBleHRlbmRzIERhdGVBZGFwdGVyPE1vbWVudD4ge1xyXG4gIC8vIE5vdGU6IGFsbCBvZiB0aGUgbWV0aG9kcyB0aGF0IGFjY2VwdCBhIGBNb21lbnRgIGlucHV0IHBhcmFtZXRlciBpbW1lZGlhdGVseSBjYWxsIGB0aGlzLmNsb25lYFxyXG4gIC8vIG9uIGl0LiBUaGlzIGlzIHRvIGVuc3VyZSB0aGF0IHdlJ3JlIHdvcmtpbmcgd2l0aCBhIGBNb21lbnRgIHRoYXQgaGFzIHRoZSBjb3JyZWN0IGxvY2FsZSBzZXR0aW5nXHJcbiAgLy8gd2hpbGUgYXZvaWRpbmcgbXV0YXRpbmcgdGhlIG9yaWdpbmFsIG9iamVjdCBwYXNzZWQgdG8gdXMuIEp1c3QgY2FsbGluZyBgLmxvY2FsZSguLi4pYCBvbiB0aGVcclxuICAvLyBpbnB1dCB3b3VsZCBtdXRhdGUgdGhlIG9iamVjdC5cclxuXHJcbiAgcHJpdmF0ZSBfbG9jYWxlRGF0YToge1xyXG4gICAgZmlyc3REYXlPZldlZWs6IG51bWJlcjtcclxuICAgIGxvbmdNb250aHM6IHN0cmluZ1tdO1xyXG4gICAgc2hvcnRNb250aHM6IHN0cmluZ1tdO1xyXG4gICAgZGF0ZXM6IHN0cmluZ1tdO1xyXG4gICAgbG9uZ0RheXNPZldlZWs6IHN0cmluZ1tdO1xyXG4gICAgc2hvcnREYXlzT2ZXZWVrOiBzdHJpbmdbXTtcclxuICAgIG5hcnJvd0RheXNPZldlZWs6IHN0cmluZ1tdO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQE9wdGlvbmFsKClcclxuICAgIEBJbmplY3QoTUFUX0RBVEVfTE9DQUxFKVxyXG4gICAgZGF0ZUxvY2FsZTogc3RyaW5nXHJcbiAgKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5zZXRMb2NhbGUoZGF0ZUxvY2FsZSB8fCBtb21lbnQubG9jYWxlKCkpO1xyXG4gIH1cclxuXHJcbiAgc2V0TG9jYWxlKGxvY2FsZTogc3RyaW5nKSB7XHJcbiAgICBzdXBlci5zZXRMb2NhbGUobG9jYWxlKTtcclxuXHJcbiAgICBjb25zdCBtb21lbnRMb2NhbGVEYXRhID0gbW9tZW50LmxvY2FsZURhdGEobG9jYWxlKTtcclxuICAgIHRoaXMuX2xvY2FsZURhdGEgPSB7XHJcbiAgICAgIGZpcnN0RGF5T2ZXZWVrOiBtb21lbnRMb2NhbGVEYXRhLmZpcnN0RGF5T2ZXZWVrKCksXHJcbiAgICAgIGxvbmdNb250aHM6IG1vbWVudExvY2FsZURhdGEubW9udGhzKCksXHJcbiAgICAgIHNob3J0TW9udGhzOiBtb21lbnRMb2NhbGVEYXRhLm1vbnRoc1Nob3J0KCksXHJcbiAgICAgIGRhdGVzOiByYW5nZSgzMSwgaSA9PiB0aGlzLmNyZWF0ZURhdGUoMjAxNywgMCwgaSArIDEpLmZvcm1hdCgnRCcpKSxcclxuICAgICAgbG9uZ0RheXNPZldlZWs6IG1vbWVudExvY2FsZURhdGEud2Vla2RheXMoKSxcclxuICAgICAgc2hvcnREYXlzT2ZXZWVrOiBtb21lbnRMb2NhbGVEYXRhLndlZWtkYXlzU2hvcnQoKSxcclxuICAgICAgbmFycm93RGF5c09mV2VlazogbW9tZW50TG9jYWxlRGF0YS53ZWVrZGF5c01pbigpXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgZ2V0WWVhcihkYXRlOiBNb21lbnQpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkueWVhcigpO1xyXG4gIH1cclxuXHJcbiAgZ2V0TW9udGgoZGF0ZTogTW9tZW50KTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLm1vbnRoKCk7XHJcbiAgfVxyXG5cclxuICBnZXREYXRlKGRhdGU6IE1vbWVudCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5kYXRlKCk7XHJcbiAgfVxyXG5cclxuICBnZXRIb3VycyhkYXRlOiBNb21lbnQpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuaG91cnMoKTtcclxuICB9XHJcblxyXG4gIHNldEhvdXJzKGRhdGU6IE1vbWVudCwgdmFsdWU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgZGF0ZS5ob3Vycyh2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBnZXRNaW51dGVzKGRhdGU6IE1vbWVudCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5taW51dGVzKCk7XHJcbiAgfVxyXG5cclxuICBzZXRNaW51dGVzKGRhdGU6IE1vbWVudCwgdmFsdWU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgZGF0ZS5taW51dGVzKHZhbHVlKTtcclxuICB9XHJcblxyXG4gIHNldFNlY29uZHMoZGF0ZTogTW9tZW50LCB2YWx1ZTogbnVtYmVyLCBtcz86IG51bWJlcik6IHZvaWQge1xyXG4gICAgZGF0ZS5zZWNvbmRzKHZhbHVlKTtcclxuICAgIGlmIChtcykge1xyXG4gICAgICBkYXRlLm1pbGxpc2Vjb25kcyhtcyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXREYXlPZldlZWsoZGF0ZTogTW9tZW50KTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmRheSgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0TW9udGhOYW1lcyhzdHlsZTogJ2xvbmcnIHwgJ3Nob3J0JyB8ICduYXJyb3cnKTogc3RyaW5nW10ge1xyXG4gICAgLy8gTW9tZW50LmpzIGRvZXNuJ3Qgc3VwcG9ydCBuYXJyb3cgbW9udGggbmFtZXMsIHNvIHdlIGp1c3QgdXNlIHNob3J0IGlmIG5hcnJvdyBpcyByZXF1ZXN0ZWQuXHJcbiAgICByZXR1cm4gc3R5bGUgPT09ICdsb25nJyA/IHRoaXMuX2xvY2FsZURhdGEubG9uZ01vbnRocyA6IHRoaXMuX2xvY2FsZURhdGEuc2hvcnRNb250aHM7XHJcbiAgfVxyXG5cclxuICBnZXREYXRlTmFtZXMoKTogc3RyaW5nW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2xvY2FsZURhdGEuZGF0ZXM7XHJcbiAgfVxyXG5cclxuICBnZXRIb3VyTmFtZXMoKTogc3RyaW5nW10ge1xyXG4gICAgLy8gVE9ETyBTVVBQT1JUU19JTlRMX0FQSVxyXG4gICAgcmV0dXJuIHJhbmdlKDI0LCBTdHJpbmcpO1xyXG4gIH1cclxuXHJcbiAgZ2V0TWludXRlTmFtZXMoKTogc3RyaW5nW10ge1xyXG4gICAgLy8gVE9ETyBTVVBQT1JUU19JTlRMX0FQSVxyXG4gICAgcmV0dXJuIHJhbmdlKDYwLCBTdHJpbmcpO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGF5T2ZXZWVrTmFtZXMoc3R5bGU6ICdsb25nJyB8ICdzaG9ydCcgfCAnbmFycm93Jyk6IHN0cmluZ1tdIHtcclxuICAgIGlmIChzdHlsZSA9PT0gJ2xvbmcnKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9sb2NhbGVEYXRhLmxvbmdEYXlzT2ZXZWVrO1xyXG4gICAgfVxyXG4gICAgaWYgKHN0eWxlID09PSAnc2hvcnQnKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9sb2NhbGVEYXRhLnNob3J0RGF5c09mV2VlaztcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLl9sb2NhbGVEYXRhLm5hcnJvd0RheXNPZldlZWs7XHJcbiAgfVxyXG5cclxuICBnZXRZZWFyTmFtZShkYXRlOiBNb21lbnQpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuZm9ybWF0KCdZWVlZJyk7XHJcbiAgfVxyXG5cclxuICBnZXRGaXJzdERheU9mV2VlaygpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX2xvY2FsZURhdGEuZmlyc3REYXlPZldlZWs7XHJcbiAgfVxyXG5cclxuICBnZXROdW1EYXlzSW5Nb250aChkYXRlOiBNb21lbnQpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuZGF5c0luTW9udGgoKTtcclxuICB9XHJcblxyXG4gIGNsb25lKGRhdGU6IE1vbWVudCk6IE1vbWVudCB7XHJcbiAgICBjb25zdCBvYmogPSBkYXRlID8gbW9tZW50KGRhdGUpIDogbW9tZW50KCk7XHJcbiAgICByZXR1cm4gb2JqLmxvY2FsZSh0aGlzLmxvY2FsZSk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVEYXRlKHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlciwgZGF0ZTogbnVtYmVyLCBob3Vycz86IG51bWJlciwgbWludXRlcz86IG51bWJlcik6IE1vbWVudCB7XHJcbiAgICAvLyBNb21lbnQuanMgd2lsbCBjcmVhdGUgYW4gaW52YWxpZCBkYXRlIGlmIGFueSBvZiB0aGUgY29tcG9uZW50cyBhcmUgb3V0IG9mIGJvdW5kcywgYnV0IHdlXHJcbiAgICAvLyBleHBsaWNpdGx5IGNoZWNrIGVhY2ggY2FzZSBzbyB3ZSBjYW4gdGhyb3cgbW9yZSBkZXNjcmlwdGl2ZSBlcnJvcnMuXHJcbiAgICBpZiAobW9udGggPCAwIHx8IG1vbnRoID4gMTEpIHtcclxuICAgICAgdGhyb3cgRXJyb3IoYEludmFsaWQgbW9udGggaW5kZXggXCIke21vbnRofVwiLiBNb250aCBpbmRleCBoYXMgdG8gYmUgYmV0d2VlbiAwIGFuZCAxMS5gKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZGF0ZSA8IDEpIHtcclxuICAgICAgdGhyb3cgRXJyb3IoYEludmFsaWQgZGF0ZSBcIiR7ZGF0ZX1cIi4gRGF0ZSBoYXMgdG8gYmUgZ3JlYXRlciB0aGFuIDAuYCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVzdWx0ID0gbW9tZW50KHsgeWVhciwgbW9udGgsIGRhdGUsIGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzOiAwIH0pO1xyXG5cclxuICAgIC8vIElmIHRoZSByZXN1bHQgaXNuJ3QgdmFsaWQsIHRoZSBkYXRlIG11c3QgaGF2ZSBiZWVuIG91dCBvZiBib3VuZHMgZm9yIHRoaXMgbW9udGguXHJcbiAgICBpZiAoIXJlc3VsdC5pc1ZhbGlkKCkpIHtcclxuICAgICAgdGhyb3cgRXJyb3IoYEludmFsaWQgZGF0ZSBcIiR7ZGF0ZX1cIiBmb3IgbW9udGggd2l0aCBpbmRleCBcIiR7bW9udGh9XCIuYCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdC5sb2NhbGUodGhpcy5sb2NhbGUpO1xyXG4gIH1cclxuXHJcbiAgdG9kYXkoKTogTW9tZW50IHtcclxuICAgIHJldHVybiBtb21lbnQoKS5sb2NhbGUodGhpcy5sb2NhbGUpO1xyXG4gIH1cclxuXHJcbiAgcGFyc2UodmFsdWU6IGFueSwgcGFyc2VGb3JtYXQ6IHN0cmluZyB8IHN0cmluZ1tdKTogTW9tZW50IHwgbnVsbCB7XHJcbiAgICBpZiAocGFyc2VGb3JtYXQgJiYgdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICByZXR1cm4gbW9tZW50KHZhbHVlLCBwYXJzZUZvcm1hdCwgdGhpcy5sb2NhbGUsIHRydWUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbHVlID8gbW9tZW50KHZhbHVlKS5sb2NhbGUodGhpcy5sb2NhbGUpIDogbnVsbDtcclxuICB9XHJcblxyXG4gIGZvcm1hdChkYXRlOiBNb21lbnQsIGRpc3BsYXlGb3JtYXQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICBkYXRlID0gdGhpcy5jbG9uZShkYXRlKTtcclxuICAgIGlmICghdGhpcy5pc1ZhbGlkKGRhdGUpKSB7XHJcbiAgICAgIHRocm93IEVycm9yKCdNb21lbnREYXRlQWRhcHRlcjogQ2Fubm90IGZvcm1hdCBpbnZhbGlkIGRhdGUuJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGF0ZS5mb3JtYXQoZGlzcGxheUZvcm1hdCk7XHJcbiAgfVxyXG5cclxuICBhZGRDYWxlbmRhclllYXJzKGRhdGU6IE1vbWVudCwgeWVhcnM6IG51bWJlcik6IE1vbWVudCB7XHJcbiAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5hZGQoeyB5ZWFycyB9KTtcclxuICB9XHJcblxyXG4gIGFkZENhbGVuZGFyTW9udGhzKGRhdGU6IE1vbWVudCwgbW9udGhzOiBudW1iZXIpOiBNb21lbnQge1xyXG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuYWRkKHsgbW9udGhzIH0pO1xyXG4gIH1cclxuXHJcbiAgYWRkQ2FsZW5kYXJEYXlzKGRhdGU6IE1vbWVudCwgZGF5czogbnVtYmVyKTogTW9tZW50IHtcclxuICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmFkZCh7IGRheXMgfSk7XHJcbiAgfVxyXG5cclxuICBhZGRDYWxlbmRhckhvdXJzKGRhdGU6IE1vbWVudCwgaG91cnM6IG51bWJlcik6IE1vbWVudCB7XHJcbiAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5hZGQoeyBob3VycyB9KTtcclxuICB9XHJcblxyXG4gIGFkZENhbGVuZGFyTWludXRlcyhkYXRlOiBNb21lbnQsIG1pbnV0ZXM6IG51bWJlcik6IE1vbWVudCB7XHJcbiAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5hZGQoeyBtaW51dGVzIH0pO1xyXG4gIH1cclxuXHJcbiAgdG9Jc284NjAxKGRhdGU6IE1vbWVudCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5mb3JtYXQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIGdpdmVuIHZhbHVlIGlmIGdpdmVuIGEgdmFsaWQgTW9tZW50IG9yIG51bGwuIERlc2VyaWFsaXplcyB2YWxpZCBJU08gODYwMSBzdHJpbmdzXHJcbiAgICogKGh0dHBzOi8vd3d3LmlldGYub3JnL3JmYy9yZmMzMzM5LnR4dCkgYW5kIHZhbGlkIERhdGUgb2JqZWN0cyBpbnRvIHZhbGlkIE1vbWVudHMgYW5kIGVtcHR5XHJcbiAgICogc3RyaW5nIGludG8gbnVsbC4gUmV0dXJucyBhbiBpbnZhbGlkIGRhdGUgZm9yIGFsbCBvdGhlciB2YWx1ZXMuXHJcbiAgICovXHJcbiAgZGVzZXJpYWxpemUodmFsdWU6IGFueSk6IE1vbWVudCB8IG51bGwge1xyXG4gICAgbGV0IGRhdGU7XHJcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XHJcbiAgICAgIGRhdGUgPSBtb21lbnQodmFsdWUpO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgaWYgKCF2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9XHJcbiAgICAgIGRhdGUgPSBtb21lbnQodmFsdWUsIG1vbWVudC5JU09fODYwMSkubG9jYWxlKHRoaXMubG9jYWxlKTtcclxuICAgIH1cclxuICAgIGlmIChkYXRlICYmIHRoaXMuaXNWYWxpZChkYXRlKSkge1xyXG4gICAgICByZXR1cm4gZGF0ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdXBlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBpc0RhdGVJbnN0YW5jZShvYmo6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIG1vbWVudC5pc01vbWVudChvYmopID8gdGhpcy5jbG9uZShvYmopLmlzVmFsaWQoKSA6IG1vbWVudChvYmopLmlzVmFsaWQoKTtcclxuICB9XHJcblxyXG4gIGlzVmFsaWQoZGF0ZTogTW9tZW50KTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5pc1ZhbGlkKCk7XHJcbiAgfVxyXG5cclxuICBpbnZhbGlkKCk6IE1vbWVudCB7XHJcbiAgICByZXR1cm4gbW9tZW50LmludmFsaWQoKTtcclxuICB9XHJcbn1cclxuIl19