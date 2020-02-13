/**
 * @fileoverview added by tsickle
 * Generated from: core/date-adapter.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { inject, InjectionToken, LOCALE_ID } from '@angular/core';
import { Subject } from 'rxjs';
/**
 * InjectionToken for datepicker that can be used to override default locale code.
 * @type {?}
 */
export var MAT_DATE_LOCALE = new InjectionToken('MAT_DATE_LOCALE', {
    providedIn: 'root',
    factory: MAT_DATE_LOCALE_FACTORY
});
/**
 * \@docs-private
 * @return {?}
 */
export function MAT_DATE_LOCALE_FACTORY() {
    return inject(LOCALE_ID);
}
/**
 * No longer needed since MAT_DATE_LOCALE has been changed to a scoped injectable.
 * If you are importing and providing this in your code you can simply remove it.
 * @deprecated
 * \@deletion-target 7.0.0
 * @type {?}
 */
export var MAT_DATE_LOCALE_PROVIDER = { provide: MAT_DATE_LOCALE, useExisting: LOCALE_ID };
/**
 * Adapts type `D` to be usable as a date by cdk-based components that work with dates.
 * @abstract
 * @template D
 */
var /**
 * Adapts type `D` to be usable as a date by cdk-based components that work with dates.
 * @abstract
 * @template D
 */
DateAdapter = /** @class */ (function () {
    function DateAdapter() {
        this._localeChanges = new Subject();
    }
    Object.defineProperty(DateAdapter.prototype, "localeChanges", {
        /** A stream that emits when the locale changes. */
        get: /**
         * A stream that emits when the locale changes.
         * @return {?}
         */
        function () {
            return this._localeChanges;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Attempts to deserialize a value to a valid date object. This is different from parsing in that
     * deserialize should only accept non-ambiguous, locale-independent formats (e.g. a ISO 8601
     * string). The default implementation does not allow any deserialization, it simply checks that
     * the given value is already a valid date object or null. The `<mat-datepicker>` will call this
     * method on all of it's `@Input()` properties that accept dates. It is therefore possible to
     * support passing values from your backend directly to these properties by overriding this method
     * to also deserialize the format used by your backend.
     * @param value The value to be deserialized into a date object.
     * @returns The deserialized date object, either a valid date, null if the value can be
     *     deserialized into a null date (e.g. the empty string), or an invalid date.
     */
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
    DateAdapter.prototype.deserialize = /**
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
    function (value) {
        if (value == null || (this.isDateInstance(value) && this.isValid(value))) {
            return value;
        }
        return this.invalid();
    };
    /**
     * Sets the locale used for all dates.
     * @param locale The new locale.
     */
    /**
     * Sets the locale used for all dates.
     * @param {?} locale The new locale.
     * @return {?}
     */
    DateAdapter.prototype.setLocale = /**
     * Sets the locale used for all dates.
     * @param {?} locale The new locale.
     * @return {?}
     */
    function (locale) {
        this.locale = locale;
        this._localeChanges.next();
    };
    /**
     * Compares two dates.
     * @param first The first date to compare.
     * @param second The second date to compare.
     * @param unit Unit deep of the comparision.
     * @returns 0 if the dates are equal, a number less than 0 if the first date is earlier,
     *     a number greater than 0 if the first date is later.
     */
    /**
     * Compares two dates.
     * @param {?} first The first date to compare.
     * @param {?} second The second date to compare.
     * @param {?=} unit Unit deep of the comparision.
     * @return {?} 0 if the dates are equal, a number less than 0 if the first date is earlier,
     *     a number greater than 0 if the first date is later.
     */
    DateAdapter.prototype.compareDate = /**
     * Compares two dates.
     * @param {?} first The first date to compare.
     * @param {?} second The second date to compare.
     * @param {?=} unit Unit deep of the comparision.
     * @return {?} 0 if the dates are equal, a number less than 0 if the first date is earlier,
     *     a number greater than 0 if the first date is later.
     */
    function (first, second, unit) {
        if (unit === void 0) { unit = 'minute'; }
        /** @type {?} */
        var f = this.getYear(first).toString();
        /** @type {?} */
        var s = this.getYear(second).toString();
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
    };
    /**
     * Checks if two dates are equal.
     * @param first The first date to check.
     * @param second The second date to check.
     * @param unit Unit deep of the comparision.
     * @returns Whether the two dates are equal.
     *     Null dates are considered equal to other null dates.
     */
    /**
     * Checks if two dates are equal.
     * @param {?} first The first date to check.
     * @param {?} second The second date to check.
     * @param {?=} unit Unit deep of the comparision.
     * @return {?} Whether the two dates are equal.
     *     Null dates are considered equal to other null dates.
     */
    DateAdapter.prototype.sameDate = /**
     * Checks if two dates are equal.
     * @param {?} first The first date to check.
     * @param {?} second The second date to check.
     * @param {?=} unit Unit deep of the comparision.
     * @return {?} Whether the two dates are equal.
     *     Null dates are considered equal to other null dates.
     */
    function (first, second, unit) {
        if (unit === void 0) { unit = 'minute'; }
        return first && second ? !this.compareDate(first, second, unit) : first === second;
    };
    /**
     * Clamp the given date between min and max dates.
     * @param date The date to clamp.
     * @param min The minimum value to allow. If null or omitted no min is enforced.
     * @param max The maximum value to allow. If null or omitted no max is enforced.
     * @param unit Unit deep of the comparision.
     * @returns `min` if `date` is less than `min`, `max` if date is greater than `max`,
     *     otherwise `date`.
     */
    /**
     * Clamp the given date between min and max dates.
     * @param {?} date The date to clamp.
     * @param {?=} min The minimum value to allow. If null or omitted no min is enforced.
     * @param {?=} max The maximum value to allow. If null or omitted no max is enforced.
     * @param {?=} unit Unit deep of the comparision.
     * @return {?} `min` if `date` is less than `min`, `max` if date is greater than `max`,
     *     otherwise `date`.
     */
    DateAdapter.prototype.clampDate = /**
     * Clamp the given date between min and max dates.
     * @param {?} date The date to clamp.
     * @param {?=} min The minimum value to allow. If null or omitted no min is enforced.
     * @param {?=} max The maximum value to allow. If null or omitted no max is enforced.
     * @param {?=} unit Unit deep of the comparision.
     * @return {?} `min` if `date` is less than `min`, `max` if date is greater than `max`,
     *     otherwise `date`.
     */
    function (date, min, max, unit) {
        if (unit === void 0) { unit = 'minute'; }
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
    };
    return DateAdapter;
}());
/**
 * Adapts type `D` to be usable as a date by cdk-based components that work with dates.
 * @abstract
 * @template D
 */
export { DateAdapter };
if (false) {
    /**
     * The locale to use for all dates.
     * @type {?}
     * @protected
     */
    DateAdapter.prototype.locale;
    /**
     * @type {?}
     * @protected
     */
    DateAdapter.prototype._localeChanges;
    /**
     * Gets the year component of the given date.
     * @abstract
     * @param {?} date The date to extract the year from.
     * @return {?} The year component.
     */
    DateAdapter.prototype.getYear = function (date) { };
    /**
     * Gets the month component of the given date.
     * @abstract
     * @param {?} date The date to extract the month from.
     * @return {?} The month component (0-indexed, 0 = January).
     */
    DateAdapter.prototype.getMonth = function (date) { };
    /**
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DateAdapter.prototype.getHours = function (date) { };
    /**
     * @abstract
     * @param {?} date
     * @param {?} value
     * @return {?}
     */
    DateAdapter.prototype.setHours = function (date, value) { };
    /**
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DateAdapter.prototype.getMinutes = function (date) { };
    /**
     * @abstract
     * @param {?} date
     * @param {?} value
     * @return {?}
     */
    DateAdapter.prototype.setMinutes = function (date, value) { };
    /**
     * @abstract
     * @param {?} date
     * @param {?} value
     * @param {?=} ms
     * @return {?}
     */
    DateAdapter.prototype.setSeconds = function (date, value, ms) { };
    /**
     * Gets the date of the month component of the given date.
     * @abstract
     * @param {?} date The date to extract the date of the month from.
     * @return {?} The month component (1-indexed, 1 = first of month).
     */
    DateAdapter.prototype.getDate = function (date) { };
    /**
     * Gets the day of the week component of the given date.
     * @abstract
     * @param {?} date The date to extract the day of the week from.
     * @return {?} The month component (0-indexed, 0 = Sunday).
     */
    DateAdapter.prototype.getDayOfWeek = function (date) { };
    /**
     * Gets a list of names for the months.
     * @abstract
     * @param {?} style The naming style (e.g. long = 'January', short = 'Jan', narrow = 'J').
     * @return {?} An ordered list of all month names, starting with January.
     */
    DateAdapter.prototype.getMonthNames = function (style) { };
    /**
     * Gets a list of names for the dates of the month.
     * @abstract
     * @return {?} An ordered list of all date of the month names, starting with '1'.
     */
    DateAdapter.prototype.getDateNames = function () { };
    /**
     * @abstract
     * @return {?}
     */
    DateAdapter.prototype.getHourNames = function () { };
    /**
     * @abstract
     * @return {?}
     */
    DateAdapter.prototype.getMinuteNames = function () { };
    /**
     * Gets a list of names for the days of the week.
     * @abstract
     * @param {?} style The naming style (e.g. long = 'Sunday', short = 'Sun', narrow = 'S').
     * @return {?} An ordered list of all weekday names, starting with Sunday.
     */
    DateAdapter.prototype.getDayOfWeekNames = function (style) { };
    /**
     * Gets the name for the year of the given date.
     * @abstract
     * @param {?} date The date to get the year name for.
     * @return {?} The name of the given year (e.g. '2017').
     */
    DateAdapter.prototype.getYearName = function (date) { };
    /**
     * Gets the first day of the week.
     * @abstract
     * @return {?} The first day of the week (0-indexed, 0 = Sunday).
     */
    DateAdapter.prototype.getFirstDayOfWeek = function () { };
    /**
     * Gets the number of days in the month of the given date.
     * @abstract
     * @param {?} date The date whose month should be checked.
     * @return {?} The number of days in the month of the given date.
     */
    DateAdapter.prototype.getNumDaysInMonth = function (date) { };
    /**
     * Clones the given date.
     * @abstract
     * @param {?} date The date to clone
     * @return {?} A new date equal to the given date.
     */
    DateAdapter.prototype.clone = function (date) { };
    /**
     * Creates a date with the given year, month, and date. Does not allow over/under-flow of the
     * month and date.
     * @abstract
     * @param {?} year The full year of the date. (e.g. 89 means the year 89, not the year 1989).
     * @param {?} month The month of the date (0-indexed, 0 = January). Must be an integer 0 - 11.
     * @param {?} date The date of month of the date. Must be an integer 1 - length of the given month.
     * @param {?=} hours
     * @param {?=} minutes
     * @return {?} The new date, or null if invalid.
     */
    DateAdapter.prototype.createDate = function (year, month, date, hours, minutes) { };
    /**
     * Gets today's date.
     * @abstract
     * @return {?} Today's date.
     */
    DateAdapter.prototype.today = function () { };
    /**
     * Parses a date from a user-provided value.
     * @abstract
     * @param {?} value The value to parse.
     * @param {?} parseFormat The expected format of the value being parsed
     *     (type is implementation-dependent).
     * @return {?} The parsed date.
     */
    DateAdapter.prototype.parse = function (value, parseFormat) { };
    /**
     * Formats a date as a string according to the given format.
     * @abstract
     * @param {?} date The value to format.
     * @param {?} displayFormat The format to use to display the date as a string.
     * @return {?} The formatted date string.
     */
    DateAdapter.prototype.format = function (date, displayFormat) { };
    /**
     * Adds the given number of years to the date. Years are counted as if flipping 12 pages on the
     * calendar for each year and then finding the closest date in the new month. For example when
     * adding 1 year to Feb 29, 2016, the resulting date will be Feb 28, 2017.
     * @abstract
     * @param {?} date The date to add years to.
     * @param {?} years The number of years to add (may be negative).
     * @return {?} A new date equal to the given one with the specified number of years added.
     */
    DateAdapter.prototype.addCalendarYears = function (date, years) { };
    /**
     * Adds the given number of months to the date. Months are counted as if flipping a page on the
     * calendar for each month and then finding the closest date in the new month. For example when
     * adding 1 month to Jan 31, 2017, the resulting date will be Feb 28, 2017.
     * @abstract
     * @param {?} date The date to add months to.
     * @param {?} months The number of months to add (may be negative).
     * @return {?} A new date equal to the given one with the specified number of months added.
     */
    DateAdapter.prototype.addCalendarMonths = function (date, months) { };
    /**
     * Adds the given number of days to the date. Days are counted as if moving one cell on the
     * calendar for each day.
     * @abstract
     * @param {?} date The date to add days to.
     * @param {?} days The number of days to add (may be negative).
     * @return {?} A new date equal to the given one with the specified number of days added.
     */
    DateAdapter.prototype.addCalendarDays = function (date, days) { };
    /**
     * @abstract
     * @param {?} date
     * @param {?} hours
     * @return {?}
     */
    DateAdapter.prototype.addCalendarHours = function (date, hours) { };
    /**
     * @abstract
     * @param {?} date
     * @param {?} minutes
     * @return {?}
     */
    DateAdapter.prototype.addCalendarMinutes = function (date, minutes) { };
    /**
     * Gets the RFC 3339 compatible string (https://tools.ietf.org/html/rfc3339) for the given date.
     * This method is used to generate date strings that are compatible with native HTML attributes
     * such as the `min` or `max` attribute of an `<input>`.
     * @abstract
     * @param {?} date The date to get the ISO date string for.
     * @return {?} The ISO date string date string.
     */
    DateAdapter.prototype.toIso8601 = function (date) { };
    /**
     * Checks whether the given object is considered a date instance by this DateAdapter.
     * @abstract
     * @param {?} obj The object to check
     * @return {?} Whether the object is a date instance.
     */
    DateAdapter.prototype.isDateInstance = function (obj) { };
    /**
     * Checks whether the given date is valid.
     * @abstract
     * @param {?} date The date to check.
     * @return {?} Whether the date is valid.
     */
    DateAdapter.prototype.isValid = function (date) { };
    /**
     * Gets date instance that is not valid.
     * @abstract
     * @return {?} An invalid date.
     */
    DateAdapter.prototype.invalid = function () { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG1hcnRpbmRhbGVjL2RhdGVwaWNrZXIvIiwic291cmNlcyI6WyJjb3JlL2RhdGUtYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEUsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7Ozs7QUFHM0MsTUFBTSxLQUFPLGVBQWUsR0FBRyxJQUFJLGNBQWMsQ0FBUyxpQkFBaUIsRUFBRTtJQUMzRSxVQUFVLEVBQUUsTUFBTTtJQUNsQixPQUFPLEVBQUUsdUJBQXVCO0NBQ2pDLENBQUM7Ozs7O0FBR0YsTUFBTSxVQUFVLHVCQUF1QjtJQUNyQyxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMzQixDQUFDOzs7Ozs7OztBQVFELE1BQU0sS0FBTyx3QkFBd0IsR0FBRyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRTs7Ozs7O0FBRzVGOzs7Ozs7SUFBQTtRQVFZLG1CQUFjLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztJQWtTakQsQ0FBQztJQXJTQyxzQkFBSSxzQ0FBYTtRQURqQixtREFBbUQ7Ozs7O1FBQ25EO1lBQ0UsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQzdCLENBQUM7OztPQUFBO0lBMkxEOzs7Ozs7Ozs7OztPQVdHOzs7Ozs7Ozs7Ozs7O0lBQ0gsaUNBQVc7Ozs7Ozs7Ozs7OztJQUFYLFVBQVksS0FBVTtRQUNwQixJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUN4RSxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsT0FBTyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsK0JBQVM7Ozs7O0lBQVQsVUFBVSxNQUFXO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVEOzs7Ozs7O09BT0c7Ozs7Ozs7OztJQUNILGlDQUFXOzs7Ozs7OztJQUFYLFVBQVksS0FBUSxFQUFFLE1BQVMsRUFBRSxJQUFlO1FBQWYscUJBQUEsRUFBQSxlQUFlOztZQUMxQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLEVBQUU7O1lBQ2xDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRTtRQUV2QyxJQUFJLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzdDLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM5QjthQUFNO1lBQ0wsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEQsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDeEQ7UUFFRCxJQUFJLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQy9DLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM5QjthQUFNO1lBQ0wsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckQsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdkQ7UUFFRCxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzNDLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM5QjthQUFNO1lBQ0wsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEQsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDeEQ7UUFFRCxJQUFJLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzdDLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM5QjthQUFNO1lBQ0wsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEQsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDMUQ7UUFFRCxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7Ozs7O09BT0c7Ozs7Ozs7OztJQUNILDhCQUFROzs7Ozs7OztJQUFSLFVBQVMsS0FBZSxFQUFFLE1BQWdCLEVBQUUsSUFBZTtRQUFmLHFCQUFBLEVBQUEsZUFBZTtRQUN6RCxPQUFPLEtBQUssSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssTUFBTSxDQUFDO0lBQ3JGLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRzs7Ozs7Ozs7OztJQUNILCtCQUFTOzs7Ozs7Ozs7SUFBVCxVQUFVLElBQWMsRUFBRSxHQUFjLEVBQUUsR0FBYyxFQUFFLElBQWU7UUFBZixxQkFBQSxFQUFBLGVBQWU7UUFDdkUsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2hELE9BQU8sR0FBRyxDQUFDO1NBQ1o7UUFDRCxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2hELE9BQU8sR0FBRyxDQUFDO1NBQ1o7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDSCxrQkFBQztBQUFELENBQUMsQUExU0QsSUEwU0M7Ozs7Ozs7Ozs7Ozs7SUF4U0MsNkJBQXNCOzs7OztJQU10QixxQ0FBK0M7Ozs7Ozs7SUFPL0Msb0RBQWtDOzs7Ozs7O0lBT2xDLHFEQUFtQzs7Ozs7O0lBRW5DLHFEQUFtQzs7Ozs7OztJQUVuQyw0REFBZ0Q7Ozs7OztJQUVoRCx1REFBcUM7Ozs7Ozs7SUFFckMsOERBQWtEOzs7Ozs7OztJQUVsRCxrRUFBK0Q7Ozs7Ozs7SUFPL0Qsb0RBQWtDOzs7Ozs7O0lBT2xDLHlEQUF1Qzs7Ozs7OztJQU92QywyREFBcUU7Ozs7OztJQU1yRSxxREFBa0M7Ozs7O0lBRWxDLHFEQUFrQzs7Ozs7SUFFbEMsdURBQW9DOzs7Ozs7O0lBT3BDLCtEQUF5RTs7Ozs7OztJQU96RSx3REFBc0M7Ozs7OztJQU10QywwREFBcUM7Ozs7Ozs7SUFPckMsOERBQTRDOzs7Ozs7O0lBTzVDLGtEQUEyQjs7Ozs7Ozs7Ozs7O0lBVTNCLG9GQUFvRzs7Ozs7O0lBTXBHLDhDQUFvQjs7Ozs7Ozs7O0lBU3BCLGdFQUF1RDs7Ozs7Ozs7SUFRdkQsa0VBQXFEOzs7Ozs7Ozs7O0lBVXJELG9FQUFxRDs7Ozs7Ozs7OztJQVVyRCxzRUFBdUQ7Ozs7Ozs7OztJQVN2RCxrRUFBbUQ7Ozs7Ozs7SUFFbkQsb0VBQXFEOzs7Ozs7O0lBRXJELHdFQUF5RDs7Ozs7Ozs7O0lBU3pELHNEQUFvQzs7Ozs7OztJQU9wQywwREFBMkM7Ozs7Ozs7SUFPM0Msb0RBQW1DOzs7Ozs7SUFNbkMsZ0RBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXHJcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcclxuICovXHJcblxyXG5pbXBvcnQgeyBpbmplY3QsIEluamVjdGlvblRva2VuLCBMT0NBTEVfSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuLyoqIEluamVjdGlvblRva2VuIGZvciBkYXRlcGlja2VyIHRoYXQgY2FuIGJlIHVzZWQgdG8gb3ZlcnJpZGUgZGVmYXVsdCBsb2NhbGUgY29kZS4gKi9cclxuZXhwb3J0IGNvbnN0IE1BVF9EQVRFX0xPQ0FMRSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxzdHJpbmc+KCdNQVRfREFURV9MT0NBTEUnLCB7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxyXG4gIGZhY3Rvcnk6IE1BVF9EQVRFX0xPQ0FMRV9GQUNUT1JZXHJcbn0pO1xyXG5cclxuLyoqIEBkb2NzLXByaXZhdGUgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIE1BVF9EQVRFX0xPQ0FMRV9GQUNUT1JZKCk6IHN0cmluZyB7XHJcbiAgcmV0dXJuIGluamVjdChMT0NBTEVfSUQpO1xyXG59XHJcblxyXG4vKipcclxuICogTm8gbG9uZ2VyIG5lZWRlZCBzaW5jZSBNQVRfREFURV9MT0NBTEUgaGFzIGJlZW4gY2hhbmdlZCB0byBhIHNjb3BlZCBpbmplY3RhYmxlLlxyXG4gKiBJZiB5b3UgYXJlIGltcG9ydGluZyBhbmQgcHJvdmlkaW5nIHRoaXMgaW4geW91ciBjb2RlIHlvdSBjYW4gc2ltcGx5IHJlbW92ZSBpdC5cclxuICogQGRlcHJlY2F0ZWRcclxuICogQGRlbGV0aW9uLXRhcmdldCA3LjAuMFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IE1BVF9EQVRFX0xPQ0FMRV9QUk9WSURFUiA9IHsgcHJvdmlkZTogTUFUX0RBVEVfTE9DQUxFLCB1c2VFeGlzdGluZzogTE9DQUxFX0lEIH07XHJcblxyXG4vKiogQWRhcHRzIHR5cGUgYERgIHRvIGJlIHVzYWJsZSBhcyBhIGRhdGUgYnkgY2RrLWJhc2VkIGNvbXBvbmVudHMgdGhhdCB3b3JrIHdpdGggZGF0ZXMuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEYXRlQWRhcHRlcjxEPiB7XHJcbiAgLyoqIFRoZSBsb2NhbGUgdG8gdXNlIGZvciBhbGwgZGF0ZXMuICovXHJcbiAgcHJvdGVjdGVkIGxvY2FsZTogYW55O1xyXG5cclxuICAvKiogQSBzdHJlYW0gdGhhdCBlbWl0cyB3aGVuIHRoZSBsb2NhbGUgY2hhbmdlcy4gKi9cclxuICBnZXQgbG9jYWxlQ2hhbmdlcygpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcclxuICAgIHJldHVybiB0aGlzLl9sb2NhbGVDaGFuZ2VzO1xyXG4gIH1cclxuICBwcm90ZWN0ZWQgX2xvY2FsZUNoYW5nZXMgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHRoZSB5ZWFyIGNvbXBvbmVudCBvZiB0aGUgZ2l2ZW4gZGF0ZS5cclxuICAgKiBAcGFyYW0gZGF0ZSBUaGUgZGF0ZSB0byBleHRyYWN0IHRoZSB5ZWFyIGZyb20uXHJcbiAgICogQHJldHVybnMgVGhlIHllYXIgY29tcG9uZW50LlxyXG4gICAqL1xyXG4gIGFic3RyYWN0IGdldFllYXIoZGF0ZTogRCk6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgbW9udGggY29tcG9uZW50IG9mIHRoZSBnaXZlbiBkYXRlLlxyXG4gICAqIEBwYXJhbSBkYXRlIFRoZSBkYXRlIHRvIGV4dHJhY3QgdGhlIG1vbnRoIGZyb20uXHJcbiAgICogQHJldHVybnMgVGhlIG1vbnRoIGNvbXBvbmVudCAoMC1pbmRleGVkLCAwID0gSmFudWFyeSkuXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgZ2V0TW9udGgoZGF0ZTogRCk6IG51bWJlcjtcclxuXHJcbiAgYWJzdHJhY3QgZ2V0SG91cnMoZGF0ZTogRCk6IG51bWJlcjtcclxuXHJcbiAgYWJzdHJhY3Qgc2V0SG91cnMoZGF0ZTogRCwgdmFsdWU6IG51bWJlcik6IHZvaWQ7XHJcblxyXG4gIGFic3RyYWN0IGdldE1pbnV0ZXMoZGF0ZTogRCk6IG51bWJlcjtcclxuXHJcbiAgYWJzdHJhY3Qgc2V0TWludXRlcyhkYXRlOiBELCB2YWx1ZTogbnVtYmVyKTogdm9pZDtcclxuXHJcbiAgYWJzdHJhY3Qgc2V0U2Vjb25kcyhkYXRlOiBELCB2YWx1ZTogbnVtYmVyLCBtcz86IG51bWJlcik6IHZvaWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdGhlIGRhdGUgb2YgdGhlIG1vbnRoIGNvbXBvbmVudCBvZiB0aGUgZ2l2ZW4gZGF0ZS5cclxuICAgKiBAcGFyYW0gZGF0ZSBUaGUgZGF0ZSB0byBleHRyYWN0IHRoZSBkYXRlIG9mIHRoZSBtb250aCBmcm9tLlxyXG4gICAqIEByZXR1cm5zIFRoZSBtb250aCBjb21wb25lbnQgKDEtaW5kZXhlZCwgMSA9IGZpcnN0IG9mIG1vbnRoKS5cclxuICAgKi9cclxuICBhYnN0cmFjdCBnZXREYXRlKGRhdGU6IEQpOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdGhlIGRheSBvZiB0aGUgd2VlayBjb21wb25lbnQgb2YgdGhlIGdpdmVuIGRhdGUuXHJcbiAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gZXh0cmFjdCB0aGUgZGF5IG9mIHRoZSB3ZWVrIGZyb20uXHJcbiAgICogQHJldHVybnMgVGhlIG1vbnRoIGNvbXBvbmVudCAoMC1pbmRleGVkLCAwID0gU3VuZGF5KS5cclxuICAgKi9cclxuICBhYnN0cmFjdCBnZXREYXlPZldlZWsoZGF0ZTogRCk6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyBhIGxpc3Qgb2YgbmFtZXMgZm9yIHRoZSBtb250aHMuXHJcbiAgICogQHBhcmFtIHN0eWxlIFRoZSBuYW1pbmcgc3R5bGUgKGUuZy4gbG9uZyA9ICdKYW51YXJ5Jywgc2hvcnQgPSAnSmFuJywgbmFycm93ID0gJ0onKS5cclxuICAgKiBAcmV0dXJucyBBbiBvcmRlcmVkIGxpc3Qgb2YgYWxsIG1vbnRoIG5hbWVzLCBzdGFydGluZyB3aXRoIEphbnVhcnkuXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgZ2V0TW9udGhOYW1lcyhzdHlsZTogJ2xvbmcnIHwgJ3Nob3J0JyB8ICduYXJyb3cnKTogc3RyaW5nW107XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgYSBsaXN0IG9mIG5hbWVzIGZvciB0aGUgZGF0ZXMgb2YgdGhlIG1vbnRoLlxyXG4gICAqIEByZXR1cm5zIEFuIG9yZGVyZWQgbGlzdCBvZiBhbGwgZGF0ZSBvZiB0aGUgbW9udGggbmFtZXMsIHN0YXJ0aW5nIHdpdGggJzEnLlxyXG4gICAqL1xyXG4gIGFic3RyYWN0IGdldERhdGVOYW1lcygpOiBzdHJpbmdbXTtcclxuXHJcbiAgYWJzdHJhY3QgZ2V0SG91ck5hbWVzKCk6IHN0cmluZ1tdO1xyXG5cclxuICBhYnN0cmFjdCBnZXRNaW51dGVOYW1lcygpOiBzdHJpbmdbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyBhIGxpc3Qgb2YgbmFtZXMgZm9yIHRoZSBkYXlzIG9mIHRoZSB3ZWVrLlxyXG4gICAqIEBwYXJhbSBzdHlsZSBUaGUgbmFtaW5nIHN0eWxlIChlLmcuIGxvbmcgPSAnU3VuZGF5Jywgc2hvcnQgPSAnU3VuJywgbmFycm93ID0gJ1MnKS5cclxuICAgKiBAcmV0dXJucyBBbiBvcmRlcmVkIGxpc3Qgb2YgYWxsIHdlZWtkYXkgbmFtZXMsIHN0YXJ0aW5nIHdpdGggU3VuZGF5LlxyXG4gICAqL1xyXG4gIGFic3RyYWN0IGdldERheU9mV2Vla05hbWVzKHN0eWxlOiAnbG9uZycgfCAnc2hvcnQnIHwgJ25hcnJvdycpOiBzdHJpbmdbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgbmFtZSBmb3IgdGhlIHllYXIgb2YgdGhlIGdpdmVuIGRhdGUuXHJcbiAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gZ2V0IHRoZSB5ZWFyIG5hbWUgZm9yLlxyXG4gICAqIEByZXR1cm5zIFRoZSBuYW1lIG9mIHRoZSBnaXZlbiB5ZWFyIChlLmcuICcyMDE3JykuXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgZ2V0WWVhck5hbWUoZGF0ZTogRCk6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrLlxyXG4gICAqIEByZXR1cm5zIFRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWsgKDAtaW5kZXhlZCwgMCA9IFN1bmRheSkuXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgZ2V0Rmlyc3REYXlPZldlZWsoKTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHRoZSBudW1iZXIgb2YgZGF5cyBpbiB0aGUgbW9udGggb2YgdGhlIGdpdmVuIGRhdGUuXHJcbiAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgd2hvc2UgbW9udGggc2hvdWxkIGJlIGNoZWNrZWQuXHJcbiAgICogQHJldHVybnMgVGhlIG51bWJlciBvZiBkYXlzIGluIHRoZSBtb250aCBvZiB0aGUgZ2l2ZW4gZGF0ZS5cclxuICAgKi9cclxuICBhYnN0cmFjdCBnZXROdW1EYXlzSW5Nb250aChkYXRlOiBEKTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBDbG9uZXMgdGhlIGdpdmVuIGRhdGUuXHJcbiAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gY2xvbmVcclxuICAgKiBAcmV0dXJucyBBIG5ldyBkYXRlIGVxdWFsIHRvIHRoZSBnaXZlbiBkYXRlLlxyXG4gICAqL1xyXG4gIGFic3RyYWN0IGNsb25lKGRhdGU6IEQpOiBEO1xyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIGEgZGF0ZSB3aXRoIHRoZSBnaXZlbiB5ZWFyLCBtb250aCwgYW5kIGRhdGUuIERvZXMgbm90IGFsbG93IG92ZXIvdW5kZXItZmxvdyBvZiB0aGVcclxuICAgKiBtb250aCBhbmQgZGF0ZS5cclxuICAgKiBAcGFyYW0geWVhciBUaGUgZnVsbCB5ZWFyIG9mIHRoZSBkYXRlLiAoZS5nLiA4OSBtZWFucyB0aGUgeWVhciA4OSwgbm90IHRoZSB5ZWFyIDE5ODkpLlxyXG4gICAqIEBwYXJhbSBtb250aCBUaGUgbW9udGggb2YgdGhlIGRhdGUgKDAtaW5kZXhlZCwgMCA9IEphbnVhcnkpLiBNdXN0IGJlIGFuIGludGVnZXIgMCAtIDExLlxyXG4gICAqIEBwYXJhbSBkYXRlIFRoZSBkYXRlIG9mIG1vbnRoIG9mIHRoZSBkYXRlLiBNdXN0IGJlIGFuIGludGVnZXIgMSAtIGxlbmd0aCBvZiB0aGUgZ2l2ZW4gbW9udGguXHJcbiAgICogQHJldHVybnMgVGhlIG5ldyBkYXRlLCBvciBudWxsIGlmIGludmFsaWQuXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgY3JlYXRlRGF0ZSh5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIGRhdGU6IG51bWJlciwgaG91cnM/OiBudW1iZXIsIG1pbnV0ZXM/OiBudW1iZXIpOiBEO1xyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHRvZGF5J3MgZGF0ZS5cclxuICAgKiBAcmV0dXJucyBUb2RheSdzIGRhdGUuXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgdG9kYXkoKTogRDtcclxuXHJcbiAgLyoqXHJcbiAgICogUGFyc2VzIGEgZGF0ZSBmcm9tIGEgdXNlci1wcm92aWRlZCB2YWx1ZS5cclxuICAgKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHBhcnNlLlxyXG4gICAqIEBwYXJhbSBwYXJzZUZvcm1hdCBUaGUgZXhwZWN0ZWQgZm9ybWF0IG9mIHRoZSB2YWx1ZSBiZWluZyBwYXJzZWRcclxuICAgKiAgICAgKHR5cGUgaXMgaW1wbGVtZW50YXRpb24tZGVwZW5kZW50KS5cclxuICAgKiBAcmV0dXJucyBUaGUgcGFyc2VkIGRhdGUuXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgcGFyc2UodmFsdWU6IGFueSwgcGFyc2VGb3JtYXQ6IGFueSk6IEQgfCBudWxsO1xyXG5cclxuICAvKipcclxuICAgKiBGb3JtYXRzIGEgZGF0ZSBhcyBhIHN0cmluZyBhY2NvcmRpbmcgdG8gdGhlIGdpdmVuIGZvcm1hdC5cclxuICAgKiBAcGFyYW0gZGF0ZSBUaGUgdmFsdWUgdG8gZm9ybWF0LlxyXG4gICAqIEBwYXJhbSBkaXNwbGF5Rm9ybWF0IFRoZSBmb3JtYXQgdG8gdXNlIHRvIGRpc3BsYXkgdGhlIGRhdGUgYXMgYSBzdHJpbmcuXHJcbiAgICogQHJldHVybnMgVGhlIGZvcm1hdHRlZCBkYXRlIHN0cmluZy5cclxuICAgKi9cclxuICBhYnN0cmFjdCBmb3JtYXQoZGF0ZTogRCwgZGlzcGxheUZvcm1hdDogYW55KTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBBZGRzIHRoZSBnaXZlbiBudW1iZXIgb2YgeWVhcnMgdG8gdGhlIGRhdGUuIFllYXJzIGFyZSBjb3VudGVkIGFzIGlmIGZsaXBwaW5nIDEyIHBhZ2VzIG9uIHRoZVxyXG4gICAqIGNhbGVuZGFyIGZvciBlYWNoIHllYXIgYW5kIHRoZW4gZmluZGluZyB0aGUgY2xvc2VzdCBkYXRlIGluIHRoZSBuZXcgbW9udGguIEZvciBleGFtcGxlIHdoZW5cclxuICAgKiBhZGRpbmcgMSB5ZWFyIHRvIEZlYiAyOSwgMjAxNiwgdGhlIHJlc3VsdGluZyBkYXRlIHdpbGwgYmUgRmViIDI4LCAyMDE3LlxyXG4gICAqIEBwYXJhbSBkYXRlIFRoZSBkYXRlIHRvIGFkZCB5ZWFycyB0by5cclxuICAgKiBAcGFyYW0geWVhcnMgVGhlIG51bWJlciBvZiB5ZWFycyB0byBhZGQgKG1heSBiZSBuZWdhdGl2ZSkuXHJcbiAgICogQHJldHVybnMgQSBuZXcgZGF0ZSBlcXVhbCB0byB0aGUgZ2l2ZW4gb25lIHdpdGggdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgeWVhcnMgYWRkZWQuXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgYWRkQ2FsZW5kYXJZZWFycyhkYXRlOiBELCB5ZWFyczogbnVtYmVyKTogRDtcclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyB0aGUgZ2l2ZW4gbnVtYmVyIG9mIG1vbnRocyB0byB0aGUgZGF0ZS4gTW9udGhzIGFyZSBjb3VudGVkIGFzIGlmIGZsaXBwaW5nIGEgcGFnZSBvbiB0aGVcclxuICAgKiBjYWxlbmRhciBmb3IgZWFjaCBtb250aCBhbmQgdGhlbiBmaW5kaW5nIHRoZSBjbG9zZXN0IGRhdGUgaW4gdGhlIG5ldyBtb250aC4gRm9yIGV4YW1wbGUgd2hlblxyXG4gICAqIGFkZGluZyAxIG1vbnRoIHRvIEphbiAzMSwgMjAxNywgdGhlIHJlc3VsdGluZyBkYXRlIHdpbGwgYmUgRmViIDI4LCAyMDE3LlxyXG4gICAqIEBwYXJhbSBkYXRlIFRoZSBkYXRlIHRvIGFkZCBtb250aHMgdG8uXHJcbiAgICogQHBhcmFtIG1vbnRocyBUaGUgbnVtYmVyIG9mIG1vbnRocyB0byBhZGQgKG1heSBiZSBuZWdhdGl2ZSkuXHJcbiAgICogQHJldHVybnMgQSBuZXcgZGF0ZSBlcXVhbCB0byB0aGUgZ2l2ZW4gb25lIHdpdGggdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgbW9udGhzIGFkZGVkLlxyXG4gICAqL1xyXG4gIGFic3RyYWN0IGFkZENhbGVuZGFyTW9udGhzKGRhdGU6IEQsIG1vbnRoczogbnVtYmVyKTogRDtcclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyB0aGUgZ2l2ZW4gbnVtYmVyIG9mIGRheXMgdG8gdGhlIGRhdGUuIERheXMgYXJlIGNvdW50ZWQgYXMgaWYgbW92aW5nIG9uZSBjZWxsIG9uIHRoZVxyXG4gICAqIGNhbGVuZGFyIGZvciBlYWNoIGRheS5cclxuICAgKiBAcGFyYW0gZGF0ZSBUaGUgZGF0ZSB0byBhZGQgZGF5cyB0by5cclxuICAgKiBAcGFyYW0gZGF5cyBUaGUgbnVtYmVyIG9mIGRheXMgdG8gYWRkIChtYXkgYmUgbmVnYXRpdmUpLlxyXG4gICAqIEByZXR1cm5zIEEgbmV3IGRhdGUgZXF1YWwgdG8gdGhlIGdpdmVuIG9uZSB3aXRoIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIGRheXMgYWRkZWQuXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgYWRkQ2FsZW5kYXJEYXlzKGRhdGU6IEQsIGRheXM6IG51bWJlcik6IEQ7XHJcblxyXG4gIGFic3RyYWN0IGFkZENhbGVuZGFySG91cnMoZGF0ZTogRCwgaG91cnM6IG51bWJlcik6IEQ7XHJcblxyXG4gIGFic3RyYWN0IGFkZENhbGVuZGFyTWludXRlcyhkYXRlOiBELCBtaW51dGVzOiBudW1iZXIpOiBEO1xyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHRoZSBSRkMgMzMzOSBjb21wYXRpYmxlIHN0cmluZyAoaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzMzMzkpIGZvciB0aGUgZ2l2ZW4gZGF0ZS5cclxuICAgKiBUaGlzIG1ldGhvZCBpcyB1c2VkIHRvIGdlbmVyYXRlIGRhdGUgc3RyaW5ncyB0aGF0IGFyZSBjb21wYXRpYmxlIHdpdGggbmF0aXZlIEhUTUwgYXR0cmlidXRlc1xyXG4gICAqIHN1Y2ggYXMgdGhlIGBtaW5gIG9yIGBtYXhgIGF0dHJpYnV0ZSBvZiBhbiBgPGlucHV0PmAuXHJcbiAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gZ2V0IHRoZSBJU08gZGF0ZSBzdHJpbmcgZm9yLlxyXG4gICAqIEByZXR1cm5zIFRoZSBJU08gZGF0ZSBzdHJpbmcgZGF0ZSBzdHJpbmcuXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgdG9Jc284NjAxKGRhdGU6IEQpOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrcyB3aGV0aGVyIHRoZSBnaXZlbiBvYmplY3QgaXMgY29uc2lkZXJlZCBhIGRhdGUgaW5zdGFuY2UgYnkgdGhpcyBEYXRlQWRhcHRlci5cclxuICAgKiBAcGFyYW0gb2JqIFRoZSBvYmplY3QgdG8gY2hlY2tcclxuICAgKiBAcmV0dXJucyBXaGV0aGVyIHRoZSBvYmplY3QgaXMgYSBkYXRlIGluc3RhbmNlLlxyXG4gICAqL1xyXG4gIGFic3RyYWN0IGlzRGF0ZUluc3RhbmNlKG9iajogYW55KTogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIGRhdGUgaXMgdmFsaWQuXHJcbiAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gY2hlY2suXHJcbiAgICogQHJldHVybnMgV2hldGhlciB0aGUgZGF0ZSBpcyB2YWxpZC5cclxuICAgKi9cclxuICBhYnN0cmFjdCBpc1ZhbGlkKGRhdGU6IEQpOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBHZXRzIGRhdGUgaW5zdGFuY2UgdGhhdCBpcyBub3QgdmFsaWQuXHJcbiAgICogQHJldHVybnMgQW4gaW52YWxpZCBkYXRlLlxyXG4gICAqL1xyXG4gIGFic3RyYWN0IGludmFsaWQoKTogRDtcclxuXHJcbiAgLyoqXHJcbiAgICogQXR0ZW1wdHMgdG8gZGVzZXJpYWxpemUgYSB2YWx1ZSB0byBhIHZhbGlkIGRhdGUgb2JqZWN0LiBUaGlzIGlzIGRpZmZlcmVudCBmcm9tIHBhcnNpbmcgaW4gdGhhdFxyXG4gICAqIGRlc2VyaWFsaXplIHNob3VsZCBvbmx5IGFjY2VwdCBub24tYW1iaWd1b3VzLCBsb2NhbGUtaW5kZXBlbmRlbnQgZm9ybWF0cyAoZS5nLiBhIElTTyA4NjAxXHJcbiAgICogc3RyaW5nKS4gVGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gZG9lcyBub3QgYWxsb3cgYW55IGRlc2VyaWFsaXphdGlvbiwgaXQgc2ltcGx5IGNoZWNrcyB0aGF0XHJcbiAgICogdGhlIGdpdmVuIHZhbHVlIGlzIGFscmVhZHkgYSB2YWxpZCBkYXRlIG9iamVjdCBvciBudWxsLiBUaGUgYDxtYXQtZGF0ZXBpY2tlcj5gIHdpbGwgY2FsbCB0aGlzXHJcbiAgICogbWV0aG9kIG9uIGFsbCBvZiBpdCdzIGBASW5wdXQoKWAgcHJvcGVydGllcyB0aGF0IGFjY2VwdCBkYXRlcy4gSXQgaXMgdGhlcmVmb3JlIHBvc3NpYmxlIHRvXHJcbiAgICogc3VwcG9ydCBwYXNzaW5nIHZhbHVlcyBmcm9tIHlvdXIgYmFja2VuZCBkaXJlY3RseSB0byB0aGVzZSBwcm9wZXJ0aWVzIGJ5IG92ZXJyaWRpbmcgdGhpcyBtZXRob2RcclxuICAgKiB0byBhbHNvIGRlc2VyaWFsaXplIHRoZSBmb3JtYXQgdXNlZCBieSB5b3VyIGJhY2tlbmQuXHJcbiAgICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byBiZSBkZXNlcmlhbGl6ZWQgaW50byBhIGRhdGUgb2JqZWN0LlxyXG4gICAqIEByZXR1cm5zIFRoZSBkZXNlcmlhbGl6ZWQgZGF0ZSBvYmplY3QsIGVpdGhlciBhIHZhbGlkIGRhdGUsIG51bGwgaWYgdGhlIHZhbHVlIGNhbiBiZVxyXG4gICAqICAgICBkZXNlcmlhbGl6ZWQgaW50byBhIG51bGwgZGF0ZSAoZS5nLiB0aGUgZW1wdHkgc3RyaW5nKSwgb3IgYW4gaW52YWxpZCBkYXRlLlxyXG4gICAqL1xyXG4gIGRlc2VyaWFsaXplKHZhbHVlOiBhbnkpOiBEIHwgbnVsbCB7XHJcbiAgICBpZiAodmFsdWUgPT0gbnVsbCB8fCAodGhpcy5pc0RhdGVJbnN0YW5jZSh2YWx1ZSkgJiYgdGhpcy5pc1ZhbGlkKHZhbHVlKSkpIHtcclxuICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuaW52YWxpZCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgbG9jYWxlIHVzZWQgZm9yIGFsbCBkYXRlcy5cclxuICAgKiBAcGFyYW0gbG9jYWxlIFRoZSBuZXcgbG9jYWxlLlxyXG4gICAqL1xyXG4gIHNldExvY2FsZShsb2NhbGU6IGFueSkge1xyXG4gICAgdGhpcy5sb2NhbGUgPSBsb2NhbGU7XHJcbiAgICB0aGlzLl9sb2NhbGVDaGFuZ2VzLm5leHQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbXBhcmVzIHR3byBkYXRlcy5cclxuICAgKiBAcGFyYW0gZmlyc3QgVGhlIGZpcnN0IGRhdGUgdG8gY29tcGFyZS5cclxuICAgKiBAcGFyYW0gc2Vjb25kIFRoZSBzZWNvbmQgZGF0ZSB0byBjb21wYXJlLlxyXG4gICAqIEBwYXJhbSB1bml0IFVuaXQgZGVlcCBvZiB0aGUgY29tcGFyaXNpb24uXHJcbiAgICogQHJldHVybnMgMCBpZiB0aGUgZGF0ZXMgYXJlIGVxdWFsLCBhIG51bWJlciBsZXNzIHRoYW4gMCBpZiB0aGUgZmlyc3QgZGF0ZSBpcyBlYXJsaWVyLFxyXG4gICAqICAgICBhIG51bWJlciBncmVhdGVyIHRoYW4gMCBpZiB0aGUgZmlyc3QgZGF0ZSBpcyBsYXRlci5cclxuICAgKi9cclxuICBjb21wYXJlRGF0ZShmaXJzdDogRCwgc2Vjb25kOiBELCB1bml0ID0gJ21pbnV0ZScpOiBudW1iZXIge1xyXG4gICAgbGV0IGYgPSB0aGlzLmdldFllYXIoZmlyc3QpLnRvU3RyaW5nKCk7XHJcbiAgICBsZXQgcyA9IHRoaXMuZ2V0WWVhcihzZWNvbmQpLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgaWYgKFsneScsICd5ZWFyJywgJ3llYXJzJ10uaW5kZXhPZih1bml0KSA+PSAwKSB7XHJcbiAgICAgIHJldHVybiBOdW1iZXIoZikgLSBOdW1iZXIocyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBmID0gZi5jb25jYXQoKCcwMCcgKyB0aGlzLmdldE1vbnRoKGZpcnN0KSkuc2xpY2UoLTIpKTtcclxuICAgICAgcyA9IHMuY29uY2F0KCgnMDAnICsgdGhpcy5nZXRNb250aChzZWNvbmQpKS5zbGljZSgtMikpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChbJ00nLCAnbW9udGgnLCAnbW9udGhzJ10uaW5kZXhPZih1bml0KSA+PSAwKSB7XHJcbiAgICAgIHJldHVybiBOdW1iZXIoZikgLSBOdW1iZXIocyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBmID0gZi5jb25jYXQoKCcwMCcgKyB0aGlzLmdldERhdGUoZmlyc3QpKS5zbGljZSgtMikpO1xyXG4gICAgICBzID0gcy5jb25jYXQoKCcwMCcgKyB0aGlzLmdldERhdGUoc2Vjb25kKSkuc2xpY2UoLTIpKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoWydkJywgJ2RheScsICdkYXlzJ10uaW5kZXhPZih1bml0KSA+PSAwKSB7XHJcbiAgICAgIHJldHVybiBOdW1iZXIoZikgLSBOdW1iZXIocyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBmID0gZi5jb25jYXQoKCcwMCcgKyB0aGlzLmdldEhvdXJzKGZpcnN0KSkuc2xpY2UoLTIpKTtcclxuICAgICAgcyA9IHMuY29uY2F0KCgnMDAnICsgdGhpcy5nZXRIb3VycyhzZWNvbmQpKS5zbGljZSgtMikpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChbJ2gnLCAnaG91cicsICdob3VycyddLmluZGV4T2YodW5pdCkgPj0gMCkge1xyXG4gICAgICByZXR1cm4gTnVtYmVyKGYpIC0gTnVtYmVyKHMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZiA9IGYuY29uY2F0KCgnMDAnICsgdGhpcy5nZXRNaW51dGVzKGZpcnN0KSkuc2xpY2UoLTIpKTtcclxuICAgICAgcyA9IHMuY29uY2F0KCgnMDAnICsgdGhpcy5nZXRNaW51dGVzKHNlY29uZCkpLnNsaWNlKC0yKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIE51bWJlcihmKSAtIE51bWJlcihzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrcyBpZiB0d28gZGF0ZXMgYXJlIGVxdWFsLlxyXG4gICAqIEBwYXJhbSBmaXJzdCBUaGUgZmlyc3QgZGF0ZSB0byBjaGVjay5cclxuICAgKiBAcGFyYW0gc2Vjb25kIFRoZSBzZWNvbmQgZGF0ZSB0byBjaGVjay5cclxuICAgKiBAcGFyYW0gdW5pdCBVbml0IGRlZXAgb2YgdGhlIGNvbXBhcmlzaW9uLlxyXG4gICAqIEByZXR1cm5zIFdoZXRoZXIgdGhlIHR3byBkYXRlcyBhcmUgZXF1YWwuXHJcbiAgICogICAgIE51bGwgZGF0ZXMgYXJlIGNvbnNpZGVyZWQgZXF1YWwgdG8gb3RoZXIgbnVsbCBkYXRlcy5cclxuICAgKi9cclxuICBzYW1lRGF0ZShmaXJzdDogRCB8IG51bGwsIHNlY29uZDogRCB8IG51bGwsIHVuaXQgPSAnbWludXRlJyk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIGZpcnN0ICYmIHNlY29uZCA/ICF0aGlzLmNvbXBhcmVEYXRlKGZpcnN0LCBzZWNvbmQsIHVuaXQpIDogZmlyc3QgPT09IHNlY29uZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsYW1wIHRoZSBnaXZlbiBkYXRlIGJldHdlZW4gbWluIGFuZCBtYXggZGF0ZXMuXHJcbiAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gY2xhbXAuXHJcbiAgICogQHBhcmFtIG1pbiBUaGUgbWluaW11bSB2YWx1ZSB0byBhbGxvdy4gSWYgbnVsbCBvciBvbWl0dGVkIG5vIG1pbiBpcyBlbmZvcmNlZC5cclxuICAgKiBAcGFyYW0gbWF4IFRoZSBtYXhpbXVtIHZhbHVlIHRvIGFsbG93LiBJZiBudWxsIG9yIG9taXR0ZWQgbm8gbWF4IGlzIGVuZm9yY2VkLlxyXG4gICAqIEBwYXJhbSB1bml0IFVuaXQgZGVlcCBvZiB0aGUgY29tcGFyaXNpb24uXHJcbiAgICogQHJldHVybnMgYG1pbmAgaWYgYGRhdGVgIGlzIGxlc3MgdGhhbiBgbWluYCwgYG1heGAgaWYgZGF0ZSBpcyBncmVhdGVyIHRoYW4gYG1heGAsXHJcbiAgICogICAgIG90aGVyd2lzZSBgZGF0ZWAuXHJcbiAgICovXHJcbiAgY2xhbXBEYXRlKGRhdGU6IEQgfCBudWxsLCBtaW4/OiBEIHwgbnVsbCwgbWF4PzogRCB8IG51bGwsIHVuaXQgPSAnbWludXRlJyk6IEQgfCBudWxsIHtcclxuICAgIGlmICghZGF0ZSkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGlmIChtaW4gJiYgdGhpcy5jb21wYXJlRGF0ZShkYXRlLCBtaW4sIHVuaXQpIDwgMCkge1xyXG4gICAgICByZXR1cm4gbWluO1xyXG4gICAgfVxyXG4gICAgaWYgKG1heCAmJiB0aGlzLmNvbXBhcmVEYXRlKGRhdGUsIG1heCwgdW5pdCkgPiAwKSB7XHJcbiAgICAgIHJldHVybiBtYXg7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGF0ZTtcclxuICB9XHJcbn1cclxuIl19