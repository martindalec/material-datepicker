/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var moment = momentNs;
/**
 * Creates an array and fills it with values.
 * @template T
 * @param {?} length
 * @param {?} valueFunction
 * @return {?}
 */
function range(length, valueFunction) {
    /** @type {?} */
    var valuesArray = Array(length);
    for (var i = 0; i < length; i++) {
        valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
}
/**
 * Adapts Moment.js Dates for use with Angular Material.
 */
var MomentDateAdapter = /** @class */ (function (_super) {
    tslib_1.__extends(MomentDateAdapter, _super);
    function MomentDateAdapter(dateLocale) {
        var _this = _super.call(this) || this;
        _this.setLocale(dateLocale || moment.locale());
        return _this;
    }
    /**
     * @param {?} locale
     * @return {?}
     */
    MomentDateAdapter.prototype.setLocale = /**
     * @param {?} locale
     * @return {?}
     */
    function (locale) {
        var _this = this;
        _super.prototype.setLocale.call(this, locale);
        /** @type {?} */
        var momentLocaleData = moment.localeData(locale);
        this._localeData = {
            firstDayOfWeek: momentLocaleData.firstDayOfWeek(),
            longMonths: momentLocaleData.months(),
            shortMonths: momentLocaleData.monthsShort(),
            dates: range(31, (/**
             * @param {?} i
             * @return {?}
             */
            function (i) { return _this.createDate(2017, 0, i + 1).format('D'); })),
            longDaysOfWeek: momentLocaleData.weekdays(),
            shortDaysOfWeek: momentLocaleData.weekdaysShort(),
            narrowDaysOfWeek: momentLocaleData.weekdaysMin()
        };
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.getYear = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).year();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.getMonth = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).month();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.getDate = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).date();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.getHours = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).hours();
    };
    /**
     * @param {?} date
     * @param {?} value
     * @return {?}
     */
    MomentDateAdapter.prototype.setHours = /**
     * @param {?} date
     * @param {?} value
     * @return {?}
     */
    function (date, value) {
        date.hours(value);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.getMinutes = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).minutes();
    };
    /**
     * @param {?} date
     * @param {?} value
     * @return {?}
     */
    MomentDateAdapter.prototype.setMinutes = /**
     * @param {?} date
     * @param {?} value
     * @return {?}
     */
    function (date, value) {
        date.minutes(value);
    };
    /**
     * @param {?} date
     * @param {?} value
     * @param {?=} ms
     * @return {?}
     */
    MomentDateAdapter.prototype.setSeconds = /**
     * @param {?} date
     * @param {?} value
     * @param {?=} ms
     * @return {?}
     */
    function (date, value, ms) {
        date.seconds(value);
        if (ms) {
            date.milliseconds(ms);
        }
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.getDayOfWeek = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).day();
    };
    /**
     * @param {?} style
     * @return {?}
     */
    MomentDateAdapter.prototype.getMonthNames = /**
     * @param {?} style
     * @return {?}
     */
    function (style) {
        // Moment.js doesn't support narrow month names, so we just use short if narrow is requested.
        return style === 'long' ? this._localeData.longMonths : this._localeData.shortMonths;
    };
    /**
     * @return {?}
     */
    MomentDateAdapter.prototype.getDateNames = /**
     * @return {?}
     */
    function () {
        return this._localeData.dates;
    };
    /**
     * @return {?}
     */
    MomentDateAdapter.prototype.getHourNames = /**
     * @return {?}
     */
    function () {
        // TODO SUPPORTS_INTL_API
        return range(24, String);
    };
    /**
     * @return {?}
     */
    MomentDateAdapter.prototype.getMinuteNames = /**
     * @return {?}
     */
    function () {
        // TODO SUPPORTS_INTL_API
        return range(60, String);
    };
    /**
     * @param {?} style
     * @return {?}
     */
    MomentDateAdapter.prototype.getDayOfWeekNames = /**
     * @param {?} style
     * @return {?}
     */
    function (style) {
        if (style === 'long') {
            return this._localeData.longDaysOfWeek;
        }
        if (style === 'short') {
            return this._localeData.shortDaysOfWeek;
        }
        return this._localeData.narrowDaysOfWeek;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.getYearName = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).format('YYYY');
    };
    /**
     * @return {?}
     */
    MomentDateAdapter.prototype.getFirstDayOfWeek = /**
     * @return {?}
     */
    function () {
        return this._localeData.firstDayOfWeek;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.getNumDaysInMonth = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).daysInMonth();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.clone = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var obj = date ? moment(date) : moment();
        return obj.locale(this.locale);
    };
    /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @param {?=} hours
     * @param {?=} minutes
     * @return {?}
     */
    MomentDateAdapter.prototype.createDate = /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @param {?=} hours
     * @param {?=} minutes
     * @return {?}
     */
    function (year, month, date, hours, minutes) {
        // Moment.js will create an invalid date if any of the components are out of bounds, but we
        // explicitly check each case so we can throw more descriptive errors.
        if (month < 0 || month > 11) {
            throw Error("Invalid month index \"" + month + "\". Month index has to be between 0 and 11.");
        }
        if (date < 1) {
            throw Error("Invalid date \"" + date + "\". Date has to be greater than 0.");
        }
        /** @type {?} */
        var result = moment({ year: year, month: month, date: date, hours: hours, minutes: minutes, seconds: 0 });
        // If the result isn't valid, the date must have been out of bounds for this month.
        if (!result.isValid()) {
            throw Error("Invalid date \"" + date + "\" for month with index \"" + month + "\".");
        }
        return result.locale(this.locale);
    };
    /**
     * @return {?}
     */
    MomentDateAdapter.prototype.today = /**
     * @return {?}
     */
    function () {
        return moment().locale(this.locale);
    };
    /**
     * @param {?} value
     * @param {?} parseFormat
     * @return {?}
     */
    MomentDateAdapter.prototype.parse = /**
     * @param {?} value
     * @param {?} parseFormat
     * @return {?}
     */
    function (value, parseFormat) {
        if (parseFormat && value && typeof value === 'string') {
            return moment(value, parseFormat, this.locale, true);
        }
        return value ? moment(value).locale(this.locale) : null;
    };
    /**
     * @param {?} date
     * @param {?} displayFormat
     * @return {?}
     */
    MomentDateAdapter.prototype.format = /**
     * @param {?} date
     * @param {?} displayFormat
     * @return {?}
     */
    function (date, displayFormat) {
        date = this.clone(date);
        if (!this.isValid(date)) {
            throw Error('MomentDateAdapter: Cannot format invalid date.');
        }
        return date.format(displayFormat);
    };
    /**
     * @param {?} date
     * @param {?} years
     * @return {?}
     */
    MomentDateAdapter.prototype.addCalendarYears = /**
     * @param {?} date
     * @param {?} years
     * @return {?}
     */
    function (date, years) {
        return this.clone(date).add({ years: years });
    };
    /**
     * @param {?} date
     * @param {?} months
     * @return {?}
     */
    MomentDateAdapter.prototype.addCalendarMonths = /**
     * @param {?} date
     * @param {?} months
     * @return {?}
     */
    function (date, months) {
        return this.clone(date).add({ months: months });
    };
    /**
     * @param {?} date
     * @param {?} days
     * @return {?}
     */
    MomentDateAdapter.prototype.addCalendarDays = /**
     * @param {?} date
     * @param {?} days
     * @return {?}
     */
    function (date, days) {
        return this.clone(date).add({ days: days });
    };
    /**
     * @param {?} date
     * @param {?} hours
     * @return {?}
     */
    MomentDateAdapter.prototype.addCalendarHours = /**
     * @param {?} date
     * @param {?} hours
     * @return {?}
     */
    function (date, hours) {
        return this.clone(date).add({ hours: hours });
    };
    /**
     * @param {?} date
     * @param {?} minutes
     * @return {?}
     */
    MomentDateAdapter.prototype.addCalendarMinutes = /**
     * @param {?} date
     * @param {?} minutes
     * @return {?}
     */
    function (date, minutes) {
        return this.clone(date).add({ minutes: minutes });
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.toIso8601 = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).format();
    };
    /**
     * Returns the given value if given a valid Moment or null. Deserializes valid ISO 8601 strings
     * (https://www.ietf.org/rfc/rfc3339.txt) and valid Date objects into valid Moments and empty
     * string into null. Returns an invalid date for all other values.
     */
    /**
     * Returns the given value if given a valid Moment or null. Deserializes valid ISO 8601 strings
     * (https://www.ietf.org/rfc/rfc3339.txt) and valid Date objects into valid Moments and empty
     * string into null. Returns an invalid date for all other values.
     * @param {?} value
     * @return {?}
     */
    MomentDateAdapter.prototype.deserialize = /**
     * Returns the given value if given a valid Moment or null. Deserializes valid ISO 8601 strings
     * (https://www.ietf.org/rfc/rfc3339.txt) and valid Date objects into valid Moments and empty
     * string into null. Returns an invalid date for all other values.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var date;
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
        return _super.prototype.deserialize.call(this, value);
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    MomentDateAdapter.prototype.isDateInstance = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        return moment.isMoment(obj) ? this.clone(obj).isValid() : moment(obj).isValid();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.isValid = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).isValid();
    };
    /**
     * @return {?}
     */
    MomentDateAdapter.prototype.invalid = /**
     * @return {?}
     */
    function () {
        return moment.invalid();
    };
    MomentDateAdapter.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    MomentDateAdapter.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [MAT_DATE_LOCALE,] }] }
    ]; };
    return MomentDateAdapter;
}(DateAdapter));
export { MomentDateAdapter };
if (false) {
    /**
     * @type {?}
     * @private
     */
    MomentDateAdapter.prototype._localeData;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9tZW50LWRhdGUtYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtYXJ0aW5kYWxlYy9kYXRlcGlja2VyLyIsInNvdXJjZXMiOlsibW9tZW50LWFkYXB0ZXIvbW9tZW50LWRhdGUtYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBRzdELE9BQU8sS0FBSyxRQUFRLE1BQU0saUJBQWlCLENBQUM7O0lBRXRDLE1BQU0sR0FBRyxRQUFROzs7Ozs7OztBQUd2QixTQUFTLEtBQUssQ0FBSSxNQUFjLEVBQUUsYUFBbUM7O1FBQzdELFdBQVcsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQ2pDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDL0IsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNuQztJQUNELE9BQU8sV0FBVyxDQUFDO0FBQ3JCLENBQUM7Ozs7QUFHRDtJQUN1Qyw2Q0FBbUI7SUFnQnhELDJCQUdFLFVBQWtCO1FBSHBCLFlBS0UsaUJBQU8sU0FFUjtRQURDLEtBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDOztJQUNoRCxDQUFDOzs7OztJQUVELHFDQUFTOzs7O0lBQVQsVUFBVSxNQUFjO1FBQXhCLGlCQWFDO1FBWkMsaUJBQU0sU0FBUyxZQUFDLE1BQU0sQ0FBQyxDQUFDOztZQUVsQixnQkFBZ0IsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztRQUNsRCxJQUFJLENBQUMsV0FBVyxHQUFHO1lBQ2pCLGNBQWMs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Ozs7O0lBRUQsbUNBQU87OztJQUFQO1FBQ0UsT0FBTyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDMUIsQ0FBQzs7Z0JBOU5GLFVBQVU7Ozs7NkNBa0JOLFFBQVEsWUFDUixNQUFNLFNBQUMsZUFBZTs7SUE0TTNCLHdCQUFDO0NBQUEsQUEvTkQsQ0FDdUMsV0FBVyxHQThOakQ7U0E5TlksaUJBQWlCOzs7Ozs7SUFNNUIsd0NBUUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXHJcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcclxuICovXHJcblxyXG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERhdGVBZGFwdGVyLCBNQVRfREFURV9MT0NBTEUgfSBmcm9tICcuLi9jb3JlL2luZGV4JztcclxuXHJcbi8vIFRPRE8obW1hbGVyYmEpOiBTZWUgaWYgd2UgY2FuIGNsZWFuIHRoaXMgdXAgYXQgc29tZSBwb2ludC5cclxuaW1wb3J0ICogYXMgbW9tZW50TnMgZnJvbSAnbW9tZW50LXRpbWV6b25lJztcclxuZXhwb3J0IHR5cGUgTW9tZW50ID0gbW9tZW50TnMuTW9tZW50O1xyXG5jb25zdCBtb21lbnQgPSBtb21lbnROcztcclxuXHJcbi8qKiBDcmVhdGVzIGFuIGFycmF5IGFuZCBmaWxscyBpdCB3aXRoIHZhbHVlcy4gKi9cclxuZnVuY3Rpb24gcmFuZ2U8VD4obGVuZ3RoOiBudW1iZXIsIHZhbHVlRnVuY3Rpb246IChpbmRleDogbnVtYmVyKSA9PiBUKTogVFtdIHtcclxuICBjb25zdCB2YWx1ZXNBcnJheSA9IEFycmF5KGxlbmd0aCk7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgdmFsdWVzQXJyYXlbaV0gPSB2YWx1ZUZ1bmN0aW9uKGkpO1xyXG4gIH1cclxuICByZXR1cm4gdmFsdWVzQXJyYXk7XHJcbn1cclxuXHJcbi8qKiBBZGFwdHMgTW9tZW50LmpzIERhdGVzIGZvciB1c2Ugd2l0aCBBbmd1bGFyIE1hdGVyaWFsLiAqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBNb21lbnREYXRlQWRhcHRlciBleHRlbmRzIERhdGVBZGFwdGVyPE1vbWVudD4ge1xyXG4gIC8vIE5vdGU6IGFsbCBvZiB0aGUgbWV0aG9kcyB0aGF0IGFjY2VwdCBhIGBNb21lbnRgIGlucHV0IHBhcmFtZXRlciBpbW1lZGlhdGVseSBjYWxsIGB0aGlzLmNsb25lYFxyXG4gIC8vIG9uIGl0LiBUaGlzIGlzIHRvIGVuc3VyZSB0aGF0IHdlJ3JlIHdvcmtpbmcgd2l0aCBhIGBNb21lbnRgIHRoYXQgaGFzIHRoZSBjb3JyZWN0IGxvY2FsZSBzZXR0aW5nXHJcbiAgLy8gd2hpbGUgYXZvaWRpbmcgbXV0YXRpbmcgdGhlIG9yaWdpbmFsIG9iamVjdCBwYXNzZWQgdG8gdXMuIEp1c3QgY2FsbGluZyBgLmxvY2FsZSguLi4pYCBvbiB0aGVcclxuICAvLyBpbnB1dCB3b3VsZCBtdXRhdGUgdGhlIG9iamVjdC5cclxuXHJcbiAgcHJpdmF0ZSBfbG9jYWxlRGF0YToge1xyXG4gICAgZmlyc3REYXlPZldlZWs6IG51bWJlcjtcclxuICAgIGxvbmdNb250aHM6IHN0cmluZ1tdO1xyXG4gICAgc2hvcnRNb250aHM6IHN0cmluZ1tdO1xyXG4gICAgZGF0ZXM6IHN0cmluZ1tdO1xyXG4gICAgbG9uZ0RheXNPZldlZWs6IHN0cmluZ1tdO1xyXG4gICAgc2hvcnREYXlzT2ZXZWVrOiBzdHJpbmdbXTtcclxuICAgIG5hcnJvd0RheXNPZldlZWs6IHN0cmluZ1tdO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQE9wdGlvbmFsKClcclxuICAgIEBJbmplY3QoTUFUX0RBVEVfTE9DQUxFKVxyXG4gICAgZGF0ZUxvY2FsZTogc3RyaW5nXHJcbiAgKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5zZXRMb2NhbGUoZGF0ZUxvY2FsZSB8fCBtb21lbnQubG9jYWxlKCkpO1xyXG4gIH1cclxuXHJcbiAgc2V0TG9jYWxlKGxvY2FsZTogc3RyaW5nKSB7XHJcbiAgICBzdXBlci5zZXRMb2NhbGUobG9jYWxlKTtcclxuXHJcbiAgICBjb25zdCBtb21lbnRMb2NhbGVEYXRhID0gbW9tZW50LmxvY2FsZURhdGEobG9jYWxlKTtcclxuICAgIHRoaXMuX2xvY2FsZURhdGEgPSB7XHJcbiAgICAgIGZpcnN0RGF5T2ZXZWVrOiBtb21lbnRMb2NhbGVEYXRhLmZpcnN0RGF5T2ZXZWVrKCksXHJcbiAgICAgIGxvbmdNb250aHM6IG1vbWVudExvY2FsZURhdGEubW9udGhzKCksXHJcbiAgICAgIHNob3J0TW9udGhzOiBtb21lbnRMb2NhbGVEYXRhLm1vbnRoc1Nob3J0KCksXHJcbiAgICAgIGRhdGVzOiByYW5nZSgzMSwgaSA9PiB0aGlzLmNyZWF0ZURhdGUoMjAxNywgMCwgaSArIDEpLmZvcm1hdCgnRCcpKSxcclxuICAgICAgbG9uZ0RheXNPZldlZWs6IG1vbWVudExvY2FsZURhdGEud2Vla2RheXMoKSxcclxuICAgICAgc2hvcnREYXlzT2ZXZWVrOiBtb21lbnRMb2NhbGVEYXRhLndlZWtkYXlzU2hvcnQoKSxcclxuICAgICAgbmFycm93RGF5c09mV2VlazogbW9tZW50TG9jYWxlRGF0YS53ZWVrZGF5c01pbigpXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgZ2V0WWVhcihkYXRlOiBNb21lbnQpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkueWVhcigpO1xyXG4gIH1cclxuXHJcbiAgZ2V0TW9udGgoZGF0ZTogTW9tZW50KTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLm1vbnRoKCk7XHJcbiAgfVxyXG5cclxuICBnZXREYXRlKGRhdGU6IE1vbWVudCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5kYXRlKCk7XHJcbiAgfVxyXG5cclxuICBnZXRIb3VycyhkYXRlOiBNb21lbnQpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuaG91cnMoKTtcclxuICB9XHJcblxyXG4gIHNldEhvdXJzKGRhdGU6IE1vbWVudCwgdmFsdWU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgZGF0ZS5ob3Vycyh2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBnZXRNaW51dGVzKGRhdGU6IE1vbWVudCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5taW51dGVzKCk7XHJcbiAgfVxyXG5cclxuICBzZXRNaW51dGVzKGRhdGU6IE1vbWVudCwgdmFsdWU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgZGF0ZS5taW51dGVzKHZhbHVlKTtcclxuICB9XHJcblxyXG4gIHNldFNlY29uZHMoZGF0ZTogTW9tZW50LCB2YWx1ZTogbnVtYmVyLCBtcz86IG51bWJlcik6IHZvaWQge1xyXG4gICAgZGF0ZS5zZWNvbmRzKHZhbHVlKTtcclxuICAgIGlmIChtcykge1xyXG4gICAgICBkYXRlLm1pbGxpc2Vjb25kcyhtcyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXREYXlPZldlZWsoZGF0ZTogTW9tZW50KTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmRheSgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0TW9udGhOYW1lcyhzdHlsZTogJ2xvbmcnIHwgJ3Nob3J0JyB8ICduYXJyb3cnKTogc3RyaW5nW10ge1xyXG4gICAgLy8gTW9tZW50LmpzIGRvZXNuJ3Qgc3VwcG9ydCBuYXJyb3cgbW9udGggbmFtZXMsIHNvIHdlIGp1c3QgdXNlIHNob3J0IGlmIG5hcnJvdyBpcyByZXF1ZXN0ZWQuXHJcbiAgICByZXR1cm4gc3R5bGUgPT09ICdsb25nJyA/IHRoaXMuX2xvY2FsZURhdGEubG9uZ01vbnRocyA6IHRoaXMuX2xvY2FsZURhdGEuc2hvcnRNb250aHM7XHJcbiAgfVxyXG5cclxuICBnZXREYXRlTmFtZXMoKTogc3RyaW5nW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2xvY2FsZURhdGEuZGF0ZXM7XHJcbiAgfVxyXG5cclxuICBnZXRIb3VyTmFtZXMoKTogc3RyaW5nW10ge1xyXG4gICAgLy8gVE9ETyBTVVBQT1JUU19JTlRMX0FQSVxyXG4gICAgcmV0dXJuIHJhbmdlKDI0LCBTdHJpbmcpO1xyXG4gIH1cclxuXHJcbiAgZ2V0TWludXRlTmFtZXMoKTogc3RyaW5nW10ge1xyXG4gICAgLy8gVE9ETyBTVVBQT1JUU19JTlRMX0FQSVxyXG4gICAgcmV0dXJuIHJhbmdlKDYwLCBTdHJpbmcpO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGF5T2ZXZWVrTmFtZXMoc3R5bGU6ICdsb25nJyB8ICdzaG9ydCcgfCAnbmFycm93Jyk6IHN0cmluZ1tdIHtcclxuICAgIGlmIChzdHlsZSA9PT0gJ2xvbmcnKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9sb2NhbGVEYXRhLmxvbmdEYXlzT2ZXZWVrO1xyXG4gICAgfVxyXG4gICAgaWYgKHN0eWxlID09PSAnc2hvcnQnKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9sb2NhbGVEYXRhLnNob3J0RGF5c09mV2VlaztcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLl9sb2NhbGVEYXRhLm5hcnJvd0RheXNPZldlZWs7XHJcbiAgfVxyXG5cclxuICBnZXRZZWFyTmFtZShkYXRlOiBNb21lbnQpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuZm9ybWF0KCdZWVlZJyk7XHJcbiAgfVxyXG5cclxuICBnZXRGaXJzdERheU9mV2VlaygpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX2xvY2FsZURhdGEuZmlyc3REYXlPZldlZWs7XHJcbiAgfVxyXG5cclxuICBnZXROdW1EYXlzSW5Nb250aChkYXRlOiBNb21lbnQpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuZGF5c0luTW9udGgoKTtcclxuICB9XHJcblxyXG4gIGNsb25lKGRhdGU6IE1vbWVudCk6IE1vbWVudCB7XHJcbiAgICBjb25zdCBvYmogPSBkYXRlID8gbW9tZW50KGRhdGUpIDogbW9tZW50KCk7XHJcbiAgICByZXR1cm4gb2JqLmxvY2FsZSh0aGlzLmxvY2FsZSk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVEYXRlKHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlciwgZGF0ZTogbnVtYmVyLCBob3Vycz86IG51bWJlciwgbWludXRlcz86IG51bWJlcik6IE1vbWVudCB7XHJcbiAgICAvLyBNb21lbnQuanMgd2lsbCBjcmVhdGUgYW4gaW52YWxpZCBkYXRlIGlmIGFueSBvZiB0aGUgY29tcG9uZW50cyBhcmUgb3V0IG9mIGJvdW5kcywgYnV0IHdlXHJcbiAgICAvLyBleHBsaWNpdGx5IGNoZWNrIGVhY2ggY2FzZSBzbyB3ZSBjYW4gdGhyb3cgbW9yZSBkZXNjcmlwdGl2ZSBlcnJvcnMuXHJcbiAgICBpZiAobW9udGggPCAwIHx8IG1vbnRoID4gMTEpIHtcclxuICAgICAgdGhyb3cgRXJyb3IoYEludmFsaWQgbW9udGggaW5kZXggXCIke21vbnRofVwiLiBNb250aCBpbmRleCBoYXMgdG8gYmUgYmV0d2VlbiAwIGFuZCAxMS5gKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZGF0ZSA8IDEpIHtcclxuICAgICAgdGhyb3cgRXJyb3IoYEludmFsaWQgZGF0ZSBcIiR7ZGF0ZX1cIi4gRGF0ZSBoYXMgdG8gYmUgZ3JlYXRlciB0aGFuIDAuYCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVzdWx0ID0gbW9tZW50KHsgeWVhciwgbW9udGgsIGRhdGUsIGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzOiAwIH0pO1xyXG5cclxuICAgIC8vIElmIHRoZSByZXN1bHQgaXNuJ3QgdmFsaWQsIHRoZSBkYXRlIG11c3QgaGF2ZSBiZWVuIG91dCBvZiBib3VuZHMgZm9yIHRoaXMgbW9udGguXHJcbiAgICBpZiAoIXJlc3VsdC5pc1ZhbGlkKCkpIHtcclxuICAgICAgdGhyb3cgRXJyb3IoYEludmFsaWQgZGF0ZSBcIiR7ZGF0ZX1cIiBmb3IgbW9udGggd2l0aCBpbmRleCBcIiR7bW9udGh9XCIuYCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdC5sb2NhbGUodGhpcy5sb2NhbGUpO1xyXG4gIH1cclxuXHJcbiAgdG9kYXkoKTogTW9tZW50IHtcclxuICAgIHJldHVybiBtb21lbnQoKS5sb2NhbGUodGhpcy5sb2NhbGUpO1xyXG4gIH1cclxuXHJcbiAgcGFyc2UodmFsdWU6IGFueSwgcGFyc2VGb3JtYXQ6IHN0cmluZyB8IHN0cmluZ1tdKTogTW9tZW50IHwgbnVsbCB7XHJcbiAgICBpZiAocGFyc2VGb3JtYXQgJiYgdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICByZXR1cm4gbW9tZW50KHZhbHVlLCBwYXJzZUZvcm1hdCwgdGhpcy5sb2NhbGUsIHRydWUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbHVlID8gbW9tZW50KHZhbHVlKS5sb2NhbGUodGhpcy5sb2NhbGUpIDogbnVsbDtcclxuICB9XHJcblxyXG4gIGZvcm1hdChkYXRlOiBNb21lbnQsIGRpc3BsYXlGb3JtYXQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICBkYXRlID0gdGhpcy5jbG9uZShkYXRlKTtcclxuICAgIGlmICghdGhpcy5pc1ZhbGlkKGRhdGUpKSB7XHJcbiAgICAgIHRocm93IEVycm9yKCdNb21lbnREYXRlQWRhcHRlcjogQ2Fubm90IGZvcm1hdCBpbnZhbGlkIGRhdGUuJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGF0ZS5mb3JtYXQoZGlzcGxheUZvcm1hdCk7XHJcbiAgfVxyXG5cclxuICBhZGRDYWxlbmRhclllYXJzKGRhdGU6IE1vbWVudCwgeWVhcnM6IG51bWJlcik6IE1vbWVudCB7XHJcbiAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5hZGQoeyB5ZWFycyB9KTtcclxuICB9XHJcblxyXG4gIGFkZENhbGVuZGFyTW9udGhzKGRhdGU6IE1vbWVudCwgbW9udGhzOiBudW1iZXIpOiBNb21lbnQge1xyXG4gICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuYWRkKHsgbW9udGhzIH0pO1xyXG4gIH1cclxuXHJcbiAgYWRkQ2FsZW5kYXJEYXlzKGRhdGU6IE1vbWVudCwgZGF5czogbnVtYmVyKTogTW9tZW50IHtcclxuICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmFkZCh7IGRheXMgfSk7XHJcbiAgfVxyXG5cclxuICBhZGRDYWxlbmRhckhvdXJzKGRhdGU6IE1vbWVudCwgaG91cnM6IG51bWJlcik6IE1vbWVudCB7XHJcbiAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5hZGQoeyBob3VycyB9KTtcclxuICB9XHJcblxyXG4gIGFkZENhbGVuZGFyTWludXRlcyhkYXRlOiBNb21lbnQsIG1pbnV0ZXM6IG51bWJlcik6IE1vbWVudCB7XHJcbiAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5hZGQoeyBtaW51dGVzIH0pO1xyXG4gIH1cclxuXHJcbiAgdG9Jc284NjAxKGRhdGU6IE1vbWVudCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5mb3JtYXQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIGdpdmVuIHZhbHVlIGlmIGdpdmVuIGEgdmFsaWQgTW9tZW50IG9yIG51bGwuIERlc2VyaWFsaXplcyB2YWxpZCBJU08gODYwMSBzdHJpbmdzXHJcbiAgICogKGh0dHBzOi8vd3d3LmlldGYub3JnL3JmYy9yZmMzMzM5LnR4dCkgYW5kIHZhbGlkIERhdGUgb2JqZWN0cyBpbnRvIHZhbGlkIE1vbWVudHMgYW5kIGVtcHR5XHJcbiAgICogc3RyaW5nIGludG8gbnVsbC4gUmV0dXJucyBhbiBpbnZhbGlkIGRhdGUgZm9yIGFsbCBvdGhlciB2YWx1ZXMuXHJcbiAgICovXHJcbiAgZGVzZXJpYWxpemUodmFsdWU6IGFueSk6IE1vbWVudCB8IG51bGwge1xyXG4gICAgbGV0IGRhdGU7XHJcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XHJcbiAgICAgIGRhdGUgPSBtb21lbnQodmFsdWUpO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgaWYgKCF2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9XHJcbiAgICAgIGRhdGUgPSBtb21lbnQodmFsdWUsIG1vbWVudC5JU09fODYwMSkubG9jYWxlKHRoaXMubG9jYWxlKTtcclxuICAgIH1cclxuICAgIGlmIChkYXRlICYmIHRoaXMuaXNWYWxpZChkYXRlKSkge1xyXG4gICAgICByZXR1cm4gZGF0ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdXBlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBpc0RhdGVJbnN0YW5jZShvYmo6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIG1vbWVudC5pc01vbWVudChvYmopID8gdGhpcy5jbG9uZShvYmopLmlzVmFsaWQoKSA6IG1vbWVudChvYmopLmlzVmFsaWQoKTtcclxuICB9XHJcblxyXG4gIGlzVmFsaWQoZGF0ZTogTW9tZW50KTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5pc1ZhbGlkKCk7XHJcbiAgfVxyXG5cclxuICBpbnZhbGlkKCk6IE1vbWVudCB7XHJcbiAgICByZXR1cm4gbW9tZW50LmludmFsaWQoKTtcclxuICB9XHJcbn1cclxuIl19