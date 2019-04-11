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
import { inject, InjectionToken, LOCALE_ID } from '@angular/core';
import { Subject } from 'rxjs';
/**
 * InjectionToken for datepicker that can be used to override default locale code.
 * @type {?}
 */
export const MAT_DATE_LOCALE = new InjectionToken('MAT_DATE_LOCALE', {
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
export const MAT_DATE_LOCALE_PROVIDER = { provide: MAT_DATE_LOCALE, useExisting: LOCALE_ID };
/**
 * Adapts type `D` to be usable as a date by cdk-based components that work with dates.
 * @abstract
 * @template D
 */
export class DateAdapter {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG1hcnRpbmRhbGVjL2RhdGVwaWNrZXIvIiwic291cmNlcyI6WyJjb3JlL2RhdGUtYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRSxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7OztBQUczQyxNQUFNLE9BQU8sZUFBZSxHQUFHLElBQUksY0FBYyxDQUFTLGlCQUFpQixFQUFFO0lBQzNFLFVBQVUsRUFBRSxNQUFNO0lBQ2xCLE9BQU8sRUFBRSx1QkFBdUI7Q0FDakMsQ0FBQzs7Ozs7QUFHRixNQUFNLFVBQVUsdUJBQXVCO0lBQ3JDLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzNCLENBQUM7Ozs7Ozs7O0FBUUQsTUFBTSxPQUFPLHdCQUF3QixHQUFHLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFOzs7Ozs7QUFHNUYsTUFBTSxPQUFnQixXQUFXO0lBQWpDO1FBUVksbUJBQWMsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO0lBa1NqRCxDQUFDOzs7OztJQXJTQyxJQUFJLGFBQWE7UUFDZixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDN0IsQ0FBQzs7Ozs7Ozs7Ozs7OztJQXVNRCxXQUFXLENBQUMsS0FBVTtRQUNwQixJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUN4RSxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsT0FBTyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7Ozs7O0lBTUQsU0FBUyxDQUFDLE1BQVc7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM3QixDQUFDOzs7Ozs7Ozs7SUFVRCxXQUFXLENBQUMsS0FBUSxFQUFFLE1BQVMsRUFBRSxJQUFJLEdBQUcsUUFBUTs7WUFDMUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxFQUFFOztZQUNsQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUU7UUFFdkMsSUFBSSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM3QyxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDOUI7YUFBTTtZQUNMLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RELENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3hEO1FBRUQsSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUMvQyxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDOUI7YUFBTTtZQUNMLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JELENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3ZEO1FBRUQsSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUMzQyxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDOUI7YUFBTTtZQUNMLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RELENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3hEO1FBRUQsSUFBSSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM3QyxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDOUI7YUFBTTtZQUNMLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hELENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzFEO1FBRUQsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9CLENBQUM7Ozs7Ozs7OztJQVVELFFBQVEsQ0FBQyxLQUFlLEVBQUUsTUFBZ0IsRUFBRSxJQUFJLEdBQUcsUUFBUTtRQUN6RCxPQUFPLEtBQUssSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssTUFBTSxDQUFDO0lBQ3JGLENBQUM7Ozs7Ozs7Ozs7SUFXRCxTQUFTLENBQUMsSUFBYyxFQUFFLEdBQWMsRUFBRSxHQUFjLEVBQUUsSUFBSSxHQUFHLFFBQVE7UUFDdkUsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2hELE9BQU8sR0FBRyxDQUFDO1NBQ1o7UUFDRCxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2hELE9BQU8sR0FBRyxDQUFDO1NBQ1o7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Q0FDRjs7Ozs7OztJQXhTQyw2QkFBc0I7Ozs7O0lBTXRCLHFDQUErQzs7Ozs7OztJQU8vQyxvREFBa0M7Ozs7Ozs7SUFPbEMscURBQW1DOzs7Ozs7SUFFbkMscURBQW1DOzs7Ozs7O0lBRW5DLDREQUFnRDs7Ozs7O0lBRWhELHVEQUFxQzs7Ozs7OztJQUVyQyw4REFBa0Q7Ozs7Ozs7O0lBRWxELGtFQUErRDs7Ozs7OztJQU8vRCxvREFBa0M7Ozs7Ozs7SUFPbEMseURBQXVDOzs7Ozs7O0lBT3ZDLDJEQUFxRTs7Ozs7O0lBTXJFLHFEQUFrQzs7Ozs7SUFFbEMscURBQWtDOzs7OztJQUVsQyx1REFBb0M7Ozs7Ozs7SUFPcEMsK0RBQXlFOzs7Ozs7O0lBT3pFLHdEQUFzQzs7Ozs7O0lBTXRDLDBEQUFxQzs7Ozs7OztJQU9yQyw4REFBNEM7Ozs7Ozs7SUFPNUMsa0RBQTJCOzs7Ozs7Ozs7Ozs7SUFVM0Isb0ZBQW9HOzs7Ozs7SUFNcEcsOENBQW9COzs7Ozs7Ozs7SUFTcEIsZ0VBQXVEOzs7Ozs7OztJQVF2RCxrRUFBcUQ7Ozs7Ozs7Ozs7SUFVckQsb0VBQXFEOzs7Ozs7Ozs7O0lBVXJELHNFQUF1RDs7Ozs7Ozs7O0lBU3ZELGtFQUFtRDs7Ozs7OztJQUVuRCxvRUFBcUQ7Ozs7Ozs7SUFFckQsd0VBQXlEOzs7Ozs7Ozs7SUFTekQsc0RBQW9DOzs7Ozs7O0lBT3BDLDBEQUEyQzs7Ozs7OztJQU8zQyxvREFBbUM7Ozs7OztJQU1uQyxnREFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcclxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxyXG4gKi9cclxuXHJcbmltcG9ydCB7IGluamVjdCwgSW5qZWN0aW9uVG9rZW4sIExPQ0FMRV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG4vKiogSW5qZWN0aW9uVG9rZW4gZm9yIGRhdGVwaWNrZXIgdGhhdCBjYW4gYmUgdXNlZCB0byBvdmVycmlkZSBkZWZhdWx0IGxvY2FsZSBjb2RlLiAqL1xyXG5leHBvcnQgY29uc3QgTUFUX0RBVEVfTE9DQUxFID0gbmV3IEluamVjdGlvblRva2VuPHN0cmluZz4oJ01BVF9EQVRFX0xPQ0FMRScsIHtcclxuICBwcm92aWRlZEluOiAncm9vdCcsXHJcbiAgZmFjdG9yeTogTUFUX0RBVEVfTE9DQUxFX0ZBQ1RPUllcclxufSk7XHJcblxyXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xyXG5leHBvcnQgZnVuY3Rpb24gTUFUX0RBVEVfTE9DQUxFX0ZBQ1RPUlkoKTogc3RyaW5nIHtcclxuICByZXR1cm4gaW5qZWN0KExPQ0FMRV9JRCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBObyBsb25nZXIgbmVlZGVkIHNpbmNlIE1BVF9EQVRFX0xPQ0FMRSBoYXMgYmVlbiBjaGFuZ2VkIHRvIGEgc2NvcGVkIGluamVjdGFibGUuXHJcbiAqIElmIHlvdSBhcmUgaW1wb3J0aW5nIGFuZCBwcm92aWRpbmcgdGhpcyBpbiB5b3VyIGNvZGUgeW91IGNhbiBzaW1wbHkgcmVtb3ZlIGl0LlxyXG4gKiBAZGVwcmVjYXRlZFxyXG4gKiBAZGVsZXRpb24tdGFyZ2V0IDcuMC4wXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgTUFUX0RBVEVfTE9DQUxFX1BST1ZJREVSID0geyBwcm92aWRlOiBNQVRfREFURV9MT0NBTEUsIHVzZUV4aXN0aW5nOiBMT0NBTEVfSUQgfTtcclxuXHJcbi8qKiBBZGFwdHMgdHlwZSBgRGAgdG8gYmUgdXNhYmxlIGFzIGEgZGF0ZSBieSBjZGstYmFzZWQgY29tcG9uZW50cyB0aGF0IHdvcmsgd2l0aCBkYXRlcy4gKi9cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIERhdGVBZGFwdGVyPEQ+IHtcclxuICAvKiogVGhlIGxvY2FsZSB0byB1c2UgZm9yIGFsbCBkYXRlcy4gKi9cclxuICBwcm90ZWN0ZWQgbG9jYWxlOiBhbnk7XHJcblxyXG4gIC8qKiBBIHN0cmVhbSB0aGF0IGVtaXRzIHdoZW4gdGhlIGxvY2FsZSBjaGFuZ2VzLiAqL1xyXG4gIGdldCBsb2NhbGVDaGFuZ2VzKCk6IE9ic2VydmFibGU8dm9pZD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2xvY2FsZUNoYW5nZXM7XHJcbiAgfVxyXG4gIHByb3RlY3RlZCBfbG9jYWxlQ2hhbmdlcyA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdGhlIHllYXIgY29tcG9uZW50IG9mIHRoZSBnaXZlbiBkYXRlLlxyXG4gICAqIEBwYXJhbSBkYXRlIFRoZSBkYXRlIHRvIGV4dHJhY3QgdGhlIHllYXIgZnJvbS5cclxuICAgKiBAcmV0dXJucyBUaGUgeWVhciBjb21wb25lbnQuXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgZ2V0WWVhcihkYXRlOiBEKTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHRoZSBtb250aCBjb21wb25lbnQgb2YgdGhlIGdpdmVuIGRhdGUuXHJcbiAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gZXh0cmFjdCB0aGUgbW9udGggZnJvbS5cclxuICAgKiBAcmV0dXJucyBUaGUgbW9udGggY29tcG9uZW50ICgwLWluZGV4ZWQsIDAgPSBKYW51YXJ5KS5cclxuICAgKi9cclxuICBhYnN0cmFjdCBnZXRNb250aChkYXRlOiBEKTogbnVtYmVyO1xyXG5cclxuICBhYnN0cmFjdCBnZXRIb3VycyhkYXRlOiBEKTogbnVtYmVyO1xyXG5cclxuICBhYnN0cmFjdCBzZXRIb3VycyhkYXRlOiBELCB2YWx1ZTogbnVtYmVyKTogdm9pZDtcclxuXHJcbiAgYWJzdHJhY3QgZ2V0TWludXRlcyhkYXRlOiBEKTogbnVtYmVyO1xyXG5cclxuICBhYnN0cmFjdCBzZXRNaW51dGVzKGRhdGU6IEQsIHZhbHVlOiBudW1iZXIpOiB2b2lkO1xyXG5cclxuICBhYnN0cmFjdCBzZXRTZWNvbmRzKGRhdGU6IEQsIHZhbHVlOiBudW1iZXIsIG1zPzogbnVtYmVyKTogdm9pZDtcclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgZGF0ZSBvZiB0aGUgbW9udGggY29tcG9uZW50IG9mIHRoZSBnaXZlbiBkYXRlLlxyXG4gICAqIEBwYXJhbSBkYXRlIFRoZSBkYXRlIHRvIGV4dHJhY3QgdGhlIGRhdGUgb2YgdGhlIG1vbnRoIGZyb20uXHJcbiAgICogQHJldHVybnMgVGhlIG1vbnRoIGNvbXBvbmVudCAoMS1pbmRleGVkLCAxID0gZmlyc3Qgb2YgbW9udGgpLlxyXG4gICAqL1xyXG4gIGFic3RyYWN0IGdldERhdGUoZGF0ZTogRCk6IG51bWJlcjtcclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgZGF5IG9mIHRoZSB3ZWVrIGNvbXBvbmVudCBvZiB0aGUgZ2l2ZW4gZGF0ZS5cclxuICAgKiBAcGFyYW0gZGF0ZSBUaGUgZGF0ZSB0byBleHRyYWN0IHRoZSBkYXkgb2YgdGhlIHdlZWsgZnJvbS5cclxuICAgKiBAcmV0dXJucyBUaGUgbW9udGggY29tcG9uZW50ICgwLWluZGV4ZWQsIDAgPSBTdW5kYXkpLlxyXG4gICAqL1xyXG4gIGFic3RyYWN0IGdldERheU9mV2VlayhkYXRlOiBEKTogbnVtYmVyO1xyXG5cclxuICAvKipcclxuICAgKiBHZXRzIGEgbGlzdCBvZiBuYW1lcyBmb3IgdGhlIG1vbnRocy5cclxuICAgKiBAcGFyYW0gc3R5bGUgVGhlIG5hbWluZyBzdHlsZSAoZS5nLiBsb25nID0gJ0phbnVhcnknLCBzaG9ydCA9ICdKYW4nLCBuYXJyb3cgPSAnSicpLlxyXG4gICAqIEByZXR1cm5zIEFuIG9yZGVyZWQgbGlzdCBvZiBhbGwgbW9udGggbmFtZXMsIHN0YXJ0aW5nIHdpdGggSmFudWFyeS5cclxuICAgKi9cclxuICBhYnN0cmFjdCBnZXRNb250aE5hbWVzKHN0eWxlOiAnbG9uZycgfCAnc2hvcnQnIHwgJ25hcnJvdycpOiBzdHJpbmdbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyBhIGxpc3Qgb2YgbmFtZXMgZm9yIHRoZSBkYXRlcyBvZiB0aGUgbW9udGguXHJcbiAgICogQHJldHVybnMgQW4gb3JkZXJlZCBsaXN0IG9mIGFsbCBkYXRlIG9mIHRoZSBtb250aCBuYW1lcywgc3RhcnRpbmcgd2l0aCAnMScuXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgZ2V0RGF0ZU5hbWVzKCk6IHN0cmluZ1tdO1xyXG5cclxuICBhYnN0cmFjdCBnZXRIb3VyTmFtZXMoKTogc3RyaW5nW107XHJcblxyXG4gIGFic3RyYWN0IGdldE1pbnV0ZU5hbWVzKCk6IHN0cmluZ1tdO1xyXG5cclxuICAvKipcclxuICAgKiBHZXRzIGEgbGlzdCBvZiBuYW1lcyBmb3IgdGhlIGRheXMgb2YgdGhlIHdlZWsuXHJcbiAgICogQHBhcmFtIHN0eWxlIFRoZSBuYW1pbmcgc3R5bGUgKGUuZy4gbG9uZyA9ICdTdW5kYXknLCBzaG9ydCA9ICdTdW4nLCBuYXJyb3cgPSAnUycpLlxyXG4gICAqIEByZXR1cm5zIEFuIG9yZGVyZWQgbGlzdCBvZiBhbGwgd2Vla2RheSBuYW1lcywgc3RhcnRpbmcgd2l0aCBTdW5kYXkuXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgZ2V0RGF5T2ZXZWVrTmFtZXMoc3R5bGU6ICdsb25nJyB8ICdzaG9ydCcgfCAnbmFycm93Jyk6IHN0cmluZ1tdO1xyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHRoZSBuYW1lIGZvciB0aGUgeWVhciBvZiB0aGUgZ2l2ZW4gZGF0ZS5cclxuICAgKiBAcGFyYW0gZGF0ZSBUaGUgZGF0ZSB0byBnZXQgdGhlIHllYXIgbmFtZSBmb3IuXHJcbiAgICogQHJldHVybnMgVGhlIG5hbWUgb2YgdGhlIGdpdmVuIHllYXIgKGUuZy4gJzIwMTcnKS5cclxuICAgKi9cclxuICBhYnN0cmFjdCBnZXRZZWFyTmFtZShkYXRlOiBEKTogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWsuXHJcbiAgICogQHJldHVybnMgVGhlIGZpcnN0IGRheSBvZiB0aGUgd2VlayAoMC1pbmRleGVkLCAwID0gU3VuZGF5KS5cclxuICAgKi9cclxuICBhYnN0cmFjdCBnZXRGaXJzdERheU9mV2VlaygpOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdGhlIG51bWJlciBvZiBkYXlzIGluIHRoZSBtb250aCBvZiB0aGUgZ2l2ZW4gZGF0ZS5cclxuICAgKiBAcGFyYW0gZGF0ZSBUaGUgZGF0ZSB3aG9zZSBtb250aCBzaG91bGQgYmUgY2hlY2tlZC5cclxuICAgKiBAcmV0dXJucyBUaGUgbnVtYmVyIG9mIGRheXMgaW4gdGhlIG1vbnRoIG9mIHRoZSBnaXZlbiBkYXRlLlxyXG4gICAqL1xyXG4gIGFic3RyYWN0IGdldE51bURheXNJbk1vbnRoKGRhdGU6IEQpOiBudW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIENsb25lcyB0aGUgZ2l2ZW4gZGF0ZS5cclxuICAgKiBAcGFyYW0gZGF0ZSBUaGUgZGF0ZSB0byBjbG9uZVxyXG4gICAqIEByZXR1cm5zIEEgbmV3IGRhdGUgZXF1YWwgdG8gdGhlIGdpdmVuIGRhdGUuXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgY2xvbmUoZGF0ZTogRCk6IEQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYSBkYXRlIHdpdGggdGhlIGdpdmVuIHllYXIsIG1vbnRoLCBhbmQgZGF0ZS4gRG9lcyBub3QgYWxsb3cgb3Zlci91bmRlci1mbG93IG9mIHRoZVxyXG4gICAqIG1vbnRoIGFuZCBkYXRlLlxyXG4gICAqIEBwYXJhbSB5ZWFyIFRoZSBmdWxsIHllYXIgb2YgdGhlIGRhdGUuIChlLmcuIDg5IG1lYW5zIHRoZSB5ZWFyIDg5LCBub3QgdGhlIHllYXIgMTk4OSkuXHJcbiAgICogQHBhcmFtIG1vbnRoIFRoZSBtb250aCBvZiB0aGUgZGF0ZSAoMC1pbmRleGVkLCAwID0gSmFudWFyeSkuIE11c3QgYmUgYW4gaW50ZWdlciAwIC0gMTEuXHJcbiAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgb2YgbW9udGggb2YgdGhlIGRhdGUuIE11c3QgYmUgYW4gaW50ZWdlciAxIC0gbGVuZ3RoIG9mIHRoZSBnaXZlbiBtb250aC5cclxuICAgKiBAcmV0dXJucyBUaGUgbmV3IGRhdGUsIG9yIG51bGwgaWYgaW52YWxpZC5cclxuICAgKi9cclxuICBhYnN0cmFjdCBjcmVhdGVEYXRlKHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlciwgZGF0ZTogbnVtYmVyLCBob3Vycz86IG51bWJlciwgbWludXRlcz86IG51bWJlcik6IEQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdG9kYXkncyBkYXRlLlxyXG4gICAqIEByZXR1cm5zIFRvZGF5J3MgZGF0ZS5cclxuICAgKi9cclxuICBhYnN0cmFjdCB0b2RheSgpOiBEO1xyXG5cclxuICAvKipcclxuICAgKiBQYXJzZXMgYSBkYXRlIGZyb20gYSB1c2VyLXByb3ZpZGVkIHZhbHVlLlxyXG4gICAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gcGFyc2UuXHJcbiAgICogQHBhcmFtIHBhcnNlRm9ybWF0IFRoZSBleHBlY3RlZCBmb3JtYXQgb2YgdGhlIHZhbHVlIGJlaW5nIHBhcnNlZFxyXG4gICAqICAgICAodHlwZSBpcyBpbXBsZW1lbnRhdGlvbi1kZXBlbmRlbnQpLlxyXG4gICAqIEByZXR1cm5zIFRoZSBwYXJzZWQgZGF0ZS5cclxuICAgKi9cclxuICBhYnN0cmFjdCBwYXJzZSh2YWx1ZTogYW55LCBwYXJzZUZvcm1hdDogYW55KTogRCB8IG51bGw7XHJcblxyXG4gIC8qKlxyXG4gICAqIEZvcm1hdHMgYSBkYXRlIGFzIGEgc3RyaW5nIGFjY29yZGluZyB0byB0aGUgZ2l2ZW4gZm9ybWF0LlxyXG4gICAqIEBwYXJhbSBkYXRlIFRoZSB2YWx1ZSB0byBmb3JtYXQuXHJcbiAgICogQHBhcmFtIGRpc3BsYXlGb3JtYXQgVGhlIGZvcm1hdCB0byB1c2UgdG8gZGlzcGxheSB0aGUgZGF0ZSBhcyBhIHN0cmluZy5cclxuICAgKiBAcmV0dXJucyBUaGUgZm9ybWF0dGVkIGRhdGUgc3RyaW5nLlxyXG4gICAqL1xyXG4gIGFic3RyYWN0IGZvcm1hdChkYXRlOiBELCBkaXNwbGF5Rm9ybWF0OiBhbnkpOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZHMgdGhlIGdpdmVuIG51bWJlciBvZiB5ZWFycyB0byB0aGUgZGF0ZS4gWWVhcnMgYXJlIGNvdW50ZWQgYXMgaWYgZmxpcHBpbmcgMTIgcGFnZXMgb24gdGhlXHJcbiAgICogY2FsZW5kYXIgZm9yIGVhY2ggeWVhciBhbmQgdGhlbiBmaW5kaW5nIHRoZSBjbG9zZXN0IGRhdGUgaW4gdGhlIG5ldyBtb250aC4gRm9yIGV4YW1wbGUgd2hlblxyXG4gICAqIGFkZGluZyAxIHllYXIgdG8gRmViIDI5LCAyMDE2LCB0aGUgcmVzdWx0aW5nIGRhdGUgd2lsbCBiZSBGZWIgMjgsIDIwMTcuXHJcbiAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gYWRkIHllYXJzIHRvLlxyXG4gICAqIEBwYXJhbSB5ZWFycyBUaGUgbnVtYmVyIG9mIHllYXJzIHRvIGFkZCAobWF5IGJlIG5lZ2F0aXZlKS5cclxuICAgKiBAcmV0dXJucyBBIG5ldyBkYXRlIGVxdWFsIHRvIHRoZSBnaXZlbiBvbmUgd2l0aCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiB5ZWFycyBhZGRlZC5cclxuICAgKi9cclxuICBhYnN0cmFjdCBhZGRDYWxlbmRhclllYXJzKGRhdGU6IEQsIHllYXJzOiBudW1iZXIpOiBEO1xyXG5cclxuICAvKipcclxuICAgKiBBZGRzIHRoZSBnaXZlbiBudW1iZXIgb2YgbW9udGhzIHRvIHRoZSBkYXRlLiBNb250aHMgYXJlIGNvdW50ZWQgYXMgaWYgZmxpcHBpbmcgYSBwYWdlIG9uIHRoZVxyXG4gICAqIGNhbGVuZGFyIGZvciBlYWNoIG1vbnRoIGFuZCB0aGVuIGZpbmRpbmcgdGhlIGNsb3Nlc3QgZGF0ZSBpbiB0aGUgbmV3IG1vbnRoLiBGb3IgZXhhbXBsZSB3aGVuXHJcbiAgICogYWRkaW5nIDEgbW9udGggdG8gSmFuIDMxLCAyMDE3LCB0aGUgcmVzdWx0aW5nIGRhdGUgd2lsbCBiZSBGZWIgMjgsIDIwMTcuXHJcbiAgICogQHBhcmFtIGRhdGUgVGhlIGRhdGUgdG8gYWRkIG1vbnRocyB0by5cclxuICAgKiBAcGFyYW0gbW9udGhzIFRoZSBudW1iZXIgb2YgbW9udGhzIHRvIGFkZCAobWF5IGJlIG5lZ2F0aXZlKS5cclxuICAgKiBAcmV0dXJucyBBIG5ldyBkYXRlIGVxdWFsIHRvIHRoZSBnaXZlbiBvbmUgd2l0aCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBtb250aHMgYWRkZWQuXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgYWRkQ2FsZW5kYXJNb250aHMoZGF0ZTogRCwgbW9udGhzOiBudW1iZXIpOiBEO1xyXG5cclxuICAvKipcclxuICAgKiBBZGRzIHRoZSBnaXZlbiBudW1iZXIgb2YgZGF5cyB0byB0aGUgZGF0ZS4gRGF5cyBhcmUgY291bnRlZCBhcyBpZiBtb3Zpbmcgb25lIGNlbGwgb24gdGhlXHJcbiAgICogY2FsZW5kYXIgZm9yIGVhY2ggZGF5LlxyXG4gICAqIEBwYXJhbSBkYXRlIFRoZSBkYXRlIHRvIGFkZCBkYXlzIHRvLlxyXG4gICAqIEBwYXJhbSBkYXlzIFRoZSBudW1iZXIgb2YgZGF5cyB0byBhZGQgKG1heSBiZSBuZWdhdGl2ZSkuXHJcbiAgICogQHJldHVybnMgQSBuZXcgZGF0ZSBlcXVhbCB0byB0aGUgZ2l2ZW4gb25lIHdpdGggdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgZGF5cyBhZGRlZC5cclxuICAgKi9cclxuICBhYnN0cmFjdCBhZGRDYWxlbmRhckRheXMoZGF0ZTogRCwgZGF5czogbnVtYmVyKTogRDtcclxuXHJcbiAgYWJzdHJhY3QgYWRkQ2FsZW5kYXJIb3VycyhkYXRlOiBELCBob3VyczogbnVtYmVyKTogRDtcclxuXHJcbiAgYWJzdHJhY3QgYWRkQ2FsZW5kYXJNaW51dGVzKGRhdGU6IEQsIG1pbnV0ZXM6IG51bWJlcik6IEQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdGhlIFJGQyAzMzM5IGNvbXBhdGlibGUgc3RyaW5nIChodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzMzOSkgZm9yIHRoZSBnaXZlbiBkYXRlLlxyXG4gICAqIFRoaXMgbWV0aG9kIGlzIHVzZWQgdG8gZ2VuZXJhdGUgZGF0ZSBzdHJpbmdzIHRoYXQgYXJlIGNvbXBhdGlibGUgd2l0aCBuYXRpdmUgSFRNTCBhdHRyaWJ1dGVzXHJcbiAgICogc3VjaCBhcyB0aGUgYG1pbmAgb3IgYG1heGAgYXR0cmlidXRlIG9mIGFuIGA8aW5wdXQ+YC5cclxuICAgKiBAcGFyYW0gZGF0ZSBUaGUgZGF0ZSB0byBnZXQgdGhlIElTTyBkYXRlIHN0cmluZyBmb3IuXHJcbiAgICogQHJldHVybnMgVGhlIElTTyBkYXRlIHN0cmluZyBkYXRlIHN0cmluZy5cclxuICAgKi9cclxuICBhYnN0cmFjdCB0b0lzbzg2MDEoZGF0ZTogRCk6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGdpdmVuIG9iamVjdCBpcyBjb25zaWRlcmVkIGEgZGF0ZSBpbnN0YW5jZSBieSB0aGlzIERhdGVBZGFwdGVyLlxyXG4gICAqIEBwYXJhbSBvYmogVGhlIG9iamVjdCB0byBjaGVja1xyXG4gICAqIEByZXR1cm5zIFdoZXRoZXIgdGhlIG9iamVjdCBpcyBhIGRhdGUgaW5zdGFuY2UuXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgaXNEYXRlSW5zdGFuY2Uob2JqOiBhbnkpOiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBDaGVja3Mgd2hldGhlciB0aGUgZ2l2ZW4gZGF0ZSBpcyB2YWxpZC5cclxuICAgKiBAcGFyYW0gZGF0ZSBUaGUgZGF0ZSB0byBjaGVjay5cclxuICAgKiBAcmV0dXJucyBXaGV0aGVyIHRoZSBkYXRlIGlzIHZhbGlkLlxyXG4gICAqL1xyXG4gIGFic3RyYWN0IGlzVmFsaWQoZGF0ZTogRCk6IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgZGF0ZSBpbnN0YW5jZSB0aGF0IGlzIG5vdCB2YWxpZC5cclxuICAgKiBAcmV0dXJucyBBbiBpbnZhbGlkIGRhdGUuXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgaW52YWxpZCgpOiBEO1xyXG5cclxuICAvKipcclxuICAgKiBBdHRlbXB0cyB0byBkZXNlcmlhbGl6ZSBhIHZhbHVlIHRvIGEgdmFsaWQgZGF0ZSBvYmplY3QuIFRoaXMgaXMgZGlmZmVyZW50IGZyb20gcGFyc2luZyBpbiB0aGF0XHJcbiAgICogZGVzZXJpYWxpemUgc2hvdWxkIG9ubHkgYWNjZXB0IG5vbi1hbWJpZ3VvdXMsIGxvY2FsZS1pbmRlcGVuZGVudCBmb3JtYXRzIChlLmcuIGEgSVNPIDg2MDFcclxuICAgKiBzdHJpbmcpLiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBkb2VzIG5vdCBhbGxvdyBhbnkgZGVzZXJpYWxpemF0aW9uLCBpdCBzaW1wbHkgY2hlY2tzIHRoYXRcclxuICAgKiB0aGUgZ2l2ZW4gdmFsdWUgaXMgYWxyZWFkeSBhIHZhbGlkIGRhdGUgb2JqZWN0IG9yIG51bGwuIFRoZSBgPG1hdC1kYXRlcGlja2VyPmAgd2lsbCBjYWxsIHRoaXNcclxuICAgKiBtZXRob2Qgb24gYWxsIG9mIGl0J3MgYEBJbnB1dCgpYCBwcm9wZXJ0aWVzIHRoYXQgYWNjZXB0IGRhdGVzLiBJdCBpcyB0aGVyZWZvcmUgcG9zc2libGUgdG9cclxuICAgKiBzdXBwb3J0IHBhc3NpbmcgdmFsdWVzIGZyb20geW91ciBiYWNrZW5kIGRpcmVjdGx5IHRvIHRoZXNlIHByb3BlcnRpZXMgYnkgb3ZlcnJpZGluZyB0aGlzIG1ldGhvZFxyXG4gICAqIHRvIGFsc28gZGVzZXJpYWxpemUgdGhlIGZvcm1hdCB1c2VkIGJ5IHlvdXIgYmFja2VuZC5cclxuICAgKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIGJlIGRlc2VyaWFsaXplZCBpbnRvIGEgZGF0ZSBvYmplY3QuXHJcbiAgICogQHJldHVybnMgVGhlIGRlc2VyaWFsaXplZCBkYXRlIG9iamVjdCwgZWl0aGVyIGEgdmFsaWQgZGF0ZSwgbnVsbCBpZiB0aGUgdmFsdWUgY2FuIGJlXHJcbiAgICogICAgIGRlc2VyaWFsaXplZCBpbnRvIGEgbnVsbCBkYXRlIChlLmcuIHRoZSBlbXB0eSBzdHJpbmcpLCBvciBhbiBpbnZhbGlkIGRhdGUuXHJcbiAgICovXHJcbiAgZGVzZXJpYWxpemUodmFsdWU6IGFueSk6IEQgfCBudWxsIHtcclxuICAgIGlmICh2YWx1ZSA9PSBudWxsIHx8ICh0aGlzLmlzRGF0ZUluc3RhbmNlKHZhbHVlKSAmJiB0aGlzLmlzVmFsaWQodmFsdWUpKSkge1xyXG4gICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5pbnZhbGlkKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHRoZSBsb2NhbGUgdXNlZCBmb3IgYWxsIGRhdGVzLlxyXG4gICAqIEBwYXJhbSBsb2NhbGUgVGhlIG5ldyBsb2NhbGUuXHJcbiAgICovXHJcbiAgc2V0TG9jYWxlKGxvY2FsZTogYW55KSB7XHJcbiAgICB0aGlzLmxvY2FsZSA9IGxvY2FsZTtcclxuICAgIHRoaXMuX2xvY2FsZUNoYW5nZXMubmV4dCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29tcGFyZXMgdHdvIGRhdGVzLlxyXG4gICAqIEBwYXJhbSBmaXJzdCBUaGUgZmlyc3QgZGF0ZSB0byBjb21wYXJlLlxyXG4gICAqIEBwYXJhbSBzZWNvbmQgVGhlIHNlY29uZCBkYXRlIHRvIGNvbXBhcmUuXHJcbiAgICogQHBhcmFtIHVuaXQgVW5pdCBkZWVwIG9mIHRoZSBjb21wYXJpc2lvbi5cclxuICAgKiBAcmV0dXJucyAwIGlmIHRoZSBkYXRlcyBhcmUgZXF1YWwsIGEgbnVtYmVyIGxlc3MgdGhhbiAwIGlmIHRoZSBmaXJzdCBkYXRlIGlzIGVhcmxpZXIsXHJcbiAgICogICAgIGEgbnVtYmVyIGdyZWF0ZXIgdGhhbiAwIGlmIHRoZSBmaXJzdCBkYXRlIGlzIGxhdGVyLlxyXG4gICAqL1xyXG4gIGNvbXBhcmVEYXRlKGZpcnN0OiBELCBzZWNvbmQ6IEQsIHVuaXQgPSAnbWludXRlJyk6IG51bWJlciB7XHJcbiAgICBsZXQgZiA9IHRoaXMuZ2V0WWVhcihmaXJzdCkudG9TdHJpbmcoKTtcclxuICAgIGxldCBzID0gdGhpcy5nZXRZZWFyKHNlY29uZCkudG9TdHJpbmcoKTtcclxuXHJcbiAgICBpZiAoWyd5JywgJ3llYXInLCAneWVhcnMnXS5pbmRleE9mKHVuaXQpID49IDApIHtcclxuICAgICAgcmV0dXJuIE51bWJlcihmKSAtIE51bWJlcihzKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGYgPSBmLmNvbmNhdCgoJzAwJyArIHRoaXMuZ2V0TW9udGgoZmlyc3QpKS5zbGljZSgtMikpO1xyXG4gICAgICBzID0gcy5jb25jYXQoKCcwMCcgKyB0aGlzLmdldE1vbnRoKHNlY29uZCkpLnNsaWNlKC0yKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKFsnTScsICdtb250aCcsICdtb250aHMnXS5pbmRleE9mKHVuaXQpID49IDApIHtcclxuICAgICAgcmV0dXJuIE51bWJlcihmKSAtIE51bWJlcihzKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGYgPSBmLmNvbmNhdCgoJzAwJyArIHRoaXMuZ2V0RGF0ZShmaXJzdCkpLnNsaWNlKC0yKSk7XHJcbiAgICAgIHMgPSBzLmNvbmNhdCgoJzAwJyArIHRoaXMuZ2V0RGF0ZShzZWNvbmQpKS5zbGljZSgtMikpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChbJ2QnLCAnZGF5JywgJ2RheXMnXS5pbmRleE9mKHVuaXQpID49IDApIHtcclxuICAgICAgcmV0dXJuIE51bWJlcihmKSAtIE51bWJlcihzKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGYgPSBmLmNvbmNhdCgoJzAwJyArIHRoaXMuZ2V0SG91cnMoZmlyc3QpKS5zbGljZSgtMikpO1xyXG4gICAgICBzID0gcy5jb25jYXQoKCcwMCcgKyB0aGlzLmdldEhvdXJzKHNlY29uZCkpLnNsaWNlKC0yKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKFsnaCcsICdob3VyJywgJ2hvdXJzJ10uaW5kZXhPZih1bml0KSA+PSAwKSB7XHJcbiAgICAgIHJldHVybiBOdW1iZXIoZikgLSBOdW1iZXIocyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBmID0gZi5jb25jYXQoKCcwMCcgKyB0aGlzLmdldE1pbnV0ZXMoZmlyc3QpKS5zbGljZSgtMikpO1xyXG4gICAgICBzID0gcy5jb25jYXQoKCcwMCcgKyB0aGlzLmdldE1pbnV0ZXMoc2Vjb25kKSkuc2xpY2UoLTIpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gTnVtYmVyKGYpIC0gTnVtYmVyKHMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2tzIGlmIHR3byBkYXRlcyBhcmUgZXF1YWwuXHJcbiAgICogQHBhcmFtIGZpcnN0IFRoZSBmaXJzdCBkYXRlIHRvIGNoZWNrLlxyXG4gICAqIEBwYXJhbSBzZWNvbmQgVGhlIHNlY29uZCBkYXRlIHRvIGNoZWNrLlxyXG4gICAqIEBwYXJhbSB1bml0IFVuaXQgZGVlcCBvZiB0aGUgY29tcGFyaXNpb24uXHJcbiAgICogQHJldHVybnMgV2hldGhlciB0aGUgdHdvIGRhdGVzIGFyZSBlcXVhbC5cclxuICAgKiAgICAgTnVsbCBkYXRlcyBhcmUgY29uc2lkZXJlZCBlcXVhbCB0byBvdGhlciBudWxsIGRhdGVzLlxyXG4gICAqL1xyXG4gIHNhbWVEYXRlKGZpcnN0OiBEIHwgbnVsbCwgc2Vjb25kOiBEIHwgbnVsbCwgdW5pdCA9ICdtaW51dGUnKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gZmlyc3QgJiYgc2Vjb25kID8gIXRoaXMuY29tcGFyZURhdGUoZmlyc3QsIHNlY29uZCwgdW5pdCkgOiBmaXJzdCA9PT0gc2Vjb25kO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xhbXAgdGhlIGdpdmVuIGRhdGUgYmV0d2VlbiBtaW4gYW5kIG1heCBkYXRlcy5cclxuICAgKiBAcGFyYW0gZGF0ZSBUaGUgZGF0ZSB0byBjbGFtcC5cclxuICAgKiBAcGFyYW0gbWluIFRoZSBtaW5pbXVtIHZhbHVlIHRvIGFsbG93LiBJZiBudWxsIG9yIG9taXR0ZWQgbm8gbWluIGlzIGVuZm9yY2VkLlxyXG4gICAqIEBwYXJhbSBtYXggVGhlIG1heGltdW0gdmFsdWUgdG8gYWxsb3cuIElmIG51bGwgb3Igb21pdHRlZCBubyBtYXggaXMgZW5mb3JjZWQuXHJcbiAgICogQHBhcmFtIHVuaXQgVW5pdCBkZWVwIG9mIHRoZSBjb21wYXJpc2lvbi5cclxuICAgKiBAcmV0dXJucyBgbWluYCBpZiBgZGF0ZWAgaXMgbGVzcyB0aGFuIGBtaW5gLCBgbWF4YCBpZiBkYXRlIGlzIGdyZWF0ZXIgdGhhbiBgbWF4YCxcclxuICAgKiAgICAgb3RoZXJ3aXNlIGBkYXRlYC5cclxuICAgKi9cclxuICBjbGFtcERhdGUoZGF0ZTogRCB8IG51bGwsIG1pbj86IEQgfCBudWxsLCBtYXg/OiBEIHwgbnVsbCwgdW5pdCA9ICdtaW51dGUnKTogRCB8IG51bGwge1xyXG4gICAgaWYgKCFkYXRlKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgaWYgKG1pbiAmJiB0aGlzLmNvbXBhcmVEYXRlKGRhdGUsIG1pbiwgdW5pdCkgPCAwKSB7XHJcbiAgICAgIHJldHVybiBtaW47XHJcbiAgICB9XHJcbiAgICBpZiAobWF4ICYmIHRoaXMuY29tcGFyZURhdGUoZGF0ZSwgbWF4LCB1bml0KSA+IDApIHtcclxuICAgICAgcmV0dXJuIG1heDtcclxuICAgIH1cclxuICAgIHJldHVybiBkYXRlO1xyXG4gIH1cclxufVxyXG4iXX0=