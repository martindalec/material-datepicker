(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/cdk/platform'), require('@angular/core'), require('rxjs'), require('moment-timezone'), require('@angular/cdk/a11y'), require('@angular/cdk/overlay'), require('@angular/common'), require('@angular/material/button'), require('@angular/material/dialog'), require('@angular/material/icon'), require('@angular/animations'), require('@angular/cdk/keycodes'), require('@angular/cdk/bidi'), require('rxjs/operators'), require('@angular/cdk/coercion'), require('@angular/cdk/portal'), require('@angular/forms'), require('@angular/material/input'), require('@angular/material/form-field')) :
    typeof define === 'function' && define.amd ? define('@martindalec/datepicker', ['exports', '@angular/cdk/platform', '@angular/core', 'rxjs', 'moment-timezone', '@angular/cdk/a11y', '@angular/cdk/overlay', '@angular/common', '@angular/material/button', '@angular/material/dialog', '@angular/material/icon', '@angular/animations', '@angular/cdk/keycodes', '@angular/cdk/bidi', 'rxjs/operators', '@angular/cdk/coercion', '@angular/cdk/portal', '@angular/forms', '@angular/material/input', '@angular/material/form-field'], factory) :
    (global = global || self, factory((global.martindalec = global.martindalec || {}, global.martindalec.datepicker = {}), global.ng.cdk.platform, global.ng.core, global.rxjs, global['moment-timezone'], global.ng.cdk.a11y, global.ng.cdk.overlay, global.ng.common, global.ng.material.button, global.ng.material.dialog, global.ng.material.icon, global.ng.animations, global.ng.cdk.keycodes, global.ng.cdk.bidi, global.rxjs.operators, global.ng.cdk.coercion, global.ng.cdk.portal, global.ng.forms, global.ng.material.input, global.ng.material['form-field']));
}(this, (function (exports, platform, core, rxjs, momentNs, a11y, overlay, common, button, dialog, icon, animations, keycodes, bidi, operators, coercion, portal, forms, input, formField) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: core/date-adapter.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * InjectionToken for datepicker that can be used to override default locale code.
     * @type {?}
     */
    var MAT_DATE_LOCALE = new core.InjectionToken('MAT_DATE_LOCALE', {
        providedIn: 'root',
        factory: MAT_DATE_LOCALE_FACTORY
    });
    /**
     * \@docs-private
     * @return {?}
     */
    function MAT_DATE_LOCALE_FACTORY() {
        return core.inject(core.LOCALE_ID);
    }
    /**
     * No longer needed since MAT_DATE_LOCALE has been changed to a scoped injectable.
     * If you are importing and providing this in your code you can simply remove it.
     * @deprecated
     * \@deletion-target 7.0.0
     * @type {?}
     */
    var MAT_DATE_LOCALE_PROVIDER = { provide: MAT_DATE_LOCALE, useExisting: core.LOCALE_ID };
    /**
     * Adapts type `D` to be usable as a date by cdk-based components that work with dates.
     * @abstract
     * @template D
     */
    var   /**
     * Adapts type `D` to be usable as a date by cdk-based components that work with dates.
     * @abstract
     * @template D
     */
    DateAdapter = /** @class */ (function () {
        function DateAdapter() {
            this._localeChanges = new rxjs.Subject();
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

    /**
     * @fileoverview added by tsickle
     * Generated from: core/date-formats.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function MatDateFormats() { }
    if (false) {
        /** @type {?} */
        MatDateFormats.prototype.parse;
        /** @type {?} */
        MatDateFormats.prototype.display;
    }
    /** @type {?} */
    var MAT_DATE_FORMATS = new core.InjectionToken('mat-date-formats');

    /**
     * @fileoverview added by tsickle
     * Generated from: core/native-date-adapter.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // TODO(mmalerba): Remove when we no longer support safari 9.
    /**
     * Whether the browser supports the Intl API.
     * @type {?}
     */
    var SUPPORTS_INTL_API = typeof Intl !== 'undefined';
    /**
     * The default month names to use if Intl API is not available.
     * @type {?}
     */
    var DEFAULT_MONTH_NAMES = {
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
    var ɵ0 = /**
     * @param {?} i
     * @return {?}
     */
    function (i) { return String(i + 1); };
    /**
     * The default date names to use if Intl API is not available.
     * @type {?}
     */
    var DEFAULT_DATE_NAMES = range(31, (ɵ0));
    /**
     * The default hour names to use if Intl API is not available.
     * @type {?}
     */
    var DEFAULT_HOUR_NAMES = range(24, String);
    /**
     * The default minute names to use if Intl API is not available.
     * @type {?}
     */
    var DEFAULT_MINUTE_NAMES = range(60, String);
    /**
     * The default day of the week names to use if Intl API is not available.
     * @type {?}
     */
    var DEFAULT_DAY_OF_WEEK_NAMES = {
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
    var ISO_8601_REGEX = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|(?:(?:\+|-)\d{2}:\d{2}))?)?$/;
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
     * Adapts the native JS Date for use with cdk-based components that work with dates.
     */
    var NativeDateAdapter = /** @class */ (function (_super) {
        __extends(NativeDateAdapter, _super);
        function NativeDateAdapter(platform, matDateLocale) {
            var _this = _super.call(this) || this;
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
            _this.useUtcForDisplay = true;
            _super.prototype.setLocale.call(_this, matDateLocale);
            // IE does its own time zone correction, so we disable this on IE.
            _this.useUtcForDisplay = !platform.TRIDENT;
            _this._clampDate = platform.TRIDENT || platform.EDGE;
            return _this;
        }
        /**
         * @param {?} date
         * @return {?}
         */
        NativeDateAdapter.prototype.getYear = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return date.getFullYear();
        };
        /**
         * @param {?} date
         * @return {?}
         */
        NativeDateAdapter.prototype.getMonth = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return date.getMonth();
        };
        /**
         * @param {?} date
         * @return {?}
         */
        NativeDateAdapter.prototype.getDate = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return date.getDate();
        };
        /**
         * @param {?} date
         * @return {?}
         */
        NativeDateAdapter.prototype.getHours = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return date.getHours();
        };
        /**
         * @param {?} date
         * @param {?} value
         * @return {?}
         */
        NativeDateAdapter.prototype.setHours = /**
         * @param {?} date
         * @param {?} value
         * @return {?}
         */
        function (date, value) {
            date.setHours(value);
        };
        /**
         * @param {?} date
         * @return {?}
         */
        NativeDateAdapter.prototype.getMinutes = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return date.getMinutes();
        };
        /**
         * @param {?} date
         * @param {?} value
         * @return {?}
         */
        NativeDateAdapter.prototype.setMinutes = /**
         * @param {?} date
         * @param {?} value
         * @return {?}
         */
        function (date, value) {
            date.setMinutes(value);
        };
        /**
         * @param {?} date
         * @param {?} value
         * @param {?=} ms
         * @return {?}
         */
        NativeDateAdapter.prototype.setSeconds = /**
         * @param {?} date
         * @param {?} value
         * @param {?=} ms
         * @return {?}
         */
        function (date, value, ms) {
            date.setSeconds(value, ms);
        };
        /**
         * @param {?} date
         * @return {?}
         */
        NativeDateAdapter.prototype.getDayOfWeek = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return date.getDay();
        };
        /**
         * @param {?} style
         * @return {?}
         */
        NativeDateAdapter.prototype.getMonthNames = /**
         * @param {?} style
         * @return {?}
         */
        function (style) {
            var _this = this;
            if (SUPPORTS_INTL_API) {
                /** @type {?} */
                var dtf_1 = new Intl.DateTimeFormat(this.locale, { month: style, timeZone: 'utc' });
                return range(12, (/**
                 * @param {?} i
                 * @return {?}
                 */
                function (i) { return _this._stripDirectionalityCharacters(_this._format(dtf_1, new Date(2017, i, 1))); }));
            }
            return DEFAULT_MONTH_NAMES[style];
        };
        /**
         * @return {?}
         */
        NativeDateAdapter.prototype.getDateNames = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (SUPPORTS_INTL_API) {
                /** @type {?} */
                var dtf_2 = new Intl.DateTimeFormat(this.locale, { day: 'numeric', timeZone: 'utc' });
                return range(31, (/**
                 * @param {?} i
                 * @return {?}
                 */
                function (i) { return _this._stripDirectionalityCharacters(_this._format(dtf_2, new Date(2017, 0, i + 1))); }));
            }
            return DEFAULT_DATE_NAMES;
        };
        /**
         * @return {?}
         */
        NativeDateAdapter.prototype.getHourNames = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (SUPPORTS_INTL_API) {
                /** @type {?} */
                var dtf_3 = new Intl.DateTimeFormat(this.locale, { hour: 'numeric', timeZone: 'utc' });
                return range(24, (/**
                 * @param {?} i
                 * @return {?}
                 */
                function (i) { return _this._stripDirectionalityCharacters(dtf_3.format(new Date(2017, 0, 0, i))); }));
            }
            return DEFAULT_HOUR_NAMES;
        };
        /**
         * @return {?}
         */
        NativeDateAdapter.prototype.getMinuteNames = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (SUPPORTS_INTL_API) {
                /** @type {?} */
                var dtf_4 = new Intl.DateTimeFormat(this.locale, { minute: 'numeric', timeZone: 'utc' });
                return range(60, (/**
                 * @param {?} i
                 * @return {?}
                 */
                function (i) { return _this._stripDirectionalityCharacters(dtf_4.format(new Date(2017, 0, 0, 0, i))); }));
            }
            return DEFAULT_MINUTE_NAMES;
        };
        /**
         * @param {?} style
         * @return {?}
         */
        NativeDateAdapter.prototype.getDayOfWeekNames = /**
         * @param {?} style
         * @return {?}
         */
        function (style) {
            var _this = this;
            if (SUPPORTS_INTL_API) {
                /** @type {?} */
                var dtf_5 = new Intl.DateTimeFormat(this.locale, { weekday: style, timeZone: 'utc' });
                return range(7, (/**
                 * @param {?} i
                 * @return {?}
                 */
                function (i) { return _this._stripDirectionalityCharacters(_this._format(dtf_5, new Date(2017, 0, i + 1))); }));
            }
            return DEFAULT_DAY_OF_WEEK_NAMES[style];
        };
        /**
         * @param {?} date
         * @return {?}
         */
        NativeDateAdapter.prototype.getYearName = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            if (SUPPORTS_INTL_API) {
                /** @type {?} */
                var dtf = new Intl.DateTimeFormat(this.locale, { year: 'numeric', timeZone: 'utc' });
                return this._stripDirectionalityCharacters(this._format(dtf, date));
            }
            return String(this.getYear(date));
        };
        /**
         * @return {?}
         */
        NativeDateAdapter.prototype.getFirstDayOfWeek = /**
         * @return {?}
         */
        function () {
            // We can't tell using native JS Date what the first day of the week is, we default to Sunday.
            return 0;
        };
        /**
         * @param {?} date
         * @return {?}
         */
        NativeDateAdapter.prototype.getNumDaysInMonth = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return this.getDate(this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + 1, 0));
        };
        /**
         * @param {?} date
         * @return {?}
         */
        NativeDateAdapter.prototype.clone = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return this.createDate(this.getYear(date), this.getMonth(date), this.getDate(date), this.getHours(date), this.getMinutes(date));
        };
        /**
         * @param {?} year
         * @param {?} month
         * @param {?} date
         * @param {?=} hours
         * @param {?=} minutes
         * @return {?}
         */
        NativeDateAdapter.prototype.createDate = /**
         * @param {?} year
         * @param {?} month
         * @param {?} date
         * @param {?=} hours
         * @param {?=} minutes
         * @return {?}
         */
        function (year, month, date, hours, minutes) {
            // Check for invalid month and date (except upper bound on date which we have to check after
            // creating the Date).
            if (month < 0 || month > 11) {
                throw Error("Invalid month index \"" + month + "\". Month index has to be between 0 and 11.");
            }
            if (date < 1) {
                throw Error("Invalid date \"" + date + "\". Date has to be greater than 0.");
            }
            /** @type {?} */
            var result = this._createDateWithOverflow(year, month, date, hours, minutes);
            // Check that the date wasn't above the upper bound for the month, causing the month to overflow
            if (result.getMonth() !== month) {
                throw Error("Invalid date \"" + date + "\" for month with index \"" + month + "\".");
            }
            return result;
        };
        /**
         * @return {?}
         */
        NativeDateAdapter.prototype.today = /**
         * @return {?}
         */
        function () {
            return new Date();
        };
        /**
         * @param {?} value
         * @return {?}
         */
        NativeDateAdapter.prototype.parse = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            // We have no way using the native JS Date to set the parse format or locale, so we ignore these
            // parameters.
            if (typeof value === 'number') {
                return new Date(value);
            }
            return value ? new Date(Date.parse(value)) : null;
        };
        /**
         * @param {?} date
         * @param {?} displayFormat
         * @return {?}
         */
        NativeDateAdapter.prototype.format = /**
         * @param {?} date
         * @param {?} displayFormat
         * @return {?}
         */
        function (date, displayFormat) {
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
                displayFormat = __assign(__assign({}, displayFormat), { timeZone: 'utc' });
                /** @type {?} */
                var dtf = new Intl.DateTimeFormat(this.locale, displayFormat);
                return this._stripDirectionalityCharacters(this._format(dtf, date));
            }
            return this._stripDirectionalityCharacters(date.toDateString());
        };
        /**
         * @param {?} date
         * @param {?} years
         * @return {?}
         */
        NativeDateAdapter.prototype.addCalendarYears = /**
         * @param {?} date
         * @param {?} years
         * @return {?}
         */
        function (date, years) {
            return this.addCalendarMonths(date, years * 12);
        };
        /**
         * @param {?} date
         * @param {?} months
         * @return {?}
         */
        NativeDateAdapter.prototype.addCalendarMonths = /**
         * @param {?} date
         * @param {?} months
         * @return {?}
         */
        function (date, months) {
            /** @type {?} */
            var newDate = this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + months, this.getDate(date), this.getHours(date), this.getMinutes(date));
            // It's possible to wind up in the wrong month if the original month has more days than the new
            // month. In this case we want to go to the last day of the desired month.
            // Note: the additional + 12 % 12 ensures we end up with a positive number, since JS % doesn't
            // guarantee this.
            if (this.getMonth(newDate) !== ((this.getMonth(date) + months) % 12 + 12) % 12) {
                newDate = this._createDateWithOverflow(this.getYear(newDate), this.getMonth(newDate), 0);
            }
            return newDate;
        };
        /**
         * @param {?} date
         * @param {?} days
         * @return {?}
         */
        NativeDateAdapter.prototype.addCalendarDays = /**
         * @param {?} date
         * @param {?} days
         * @return {?}
         */
        function (date, days) {
            return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date) + days, this.getHours(date), this.getMinutes(date));
        };
        /**
         * @param {?} date
         * @param {?} hours
         * @return {?}
         */
        NativeDateAdapter.prototype.addCalendarHours = /**
         * @param {?} date
         * @param {?} hours
         * @return {?}
         */
        function (date, hours) {
            return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date), this.getHours(date) + hours, this.getMinutes(date));
        };
        /**
         * @param {?} date
         * @param {?} minutes
         * @return {?}
         */
        NativeDateAdapter.prototype.addCalendarMinutes = /**
         * @param {?} date
         * @param {?} minutes
         * @return {?}
         */
        function (date, minutes) {
            return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date), this.getHours(date), this.getMinutes(date) + minutes);
        };
        /**
         * @param {?} date
         * @return {?}
         */
        NativeDateAdapter.prototype.toIso8601 = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return [date.getUTCFullYear(), this._2digit(date.getUTCMonth() + 1), this._2digit(date.getUTCDate())].join('-');
        };
        /**
         * Returns the given value if given a valid Date or null. Deserializes valid ISO 8601 strings
         * (https://www.ietf.org/rfc/rfc3339.txt) into valid Dates and empty string into null. Returns an
         * invalid date for all other values.
         */
        /**
         * Returns the given value if given a valid Date or null. Deserializes valid ISO 8601 strings
         * (https://www.ietf.org/rfc/rfc3339.txt) into valid Dates and empty string into null. Returns an
         * invalid date for all other values.
         * @param {?} value
         * @return {?}
         */
        NativeDateAdapter.prototype.deserialize = /**
         * Returns the given value if given a valid Date or null. Deserializes valid ISO 8601 strings
         * (https://www.ietf.org/rfc/rfc3339.txt) into valid Dates and empty string into null. Returns an
         * invalid date for all other values.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (typeof value === 'string') {
                if (!value) {
                    return null;
                }
                // The `Date` constructor accepts formats other than ISO 8601, so we need to make sure the
                // string is the right format first.
                if (ISO_8601_REGEX.test(value)) {
                    /** @type {?} */
                    var date = new Date(value);
                    if (this.isValid(date)) {
                        return date;
                    }
                }
            }
            return _super.prototype.deserialize.call(this, value);
        };
        /**
         * @param {?} obj
         * @return {?}
         */
        NativeDateAdapter.prototype.isDateInstance = /**
         * @param {?} obj
         * @return {?}
         */
        function (obj) {
            return obj instanceof Date;
        };
        /**
         * @param {?} date
         * @return {?}
         */
        NativeDateAdapter.prototype.isValid = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return !isNaN(date.getTime());
        };
        /**
         * @return {?}
         */
        NativeDateAdapter.prototype.invalid = /**
         * @return {?}
         */
        function () {
            return new Date(NaN);
        };
        /** Creates a date but allows the month and date to overflow. */
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
        NativeDateAdapter.prototype._createDateWithOverflow = /**
         * Creates a date but allows the month and date to overflow.
         * @private
         * @param {?} year
         * @param {?} month
         * @param {?} date
         * @param {?=} hours
         * @param {?=} minutes
         * @return {?}
         */
        function (year, month, date, hours, minutes) {
            /** @type {?} */
            var result = new Date(year, month, date, hours, minutes, 0);
            // We need to correct for the fact that JS native Date treats years in range [0, 99] as
            // abbreviations for 19xx.
            if (year >= 0 && year < 100) {
                result.setFullYear(this.getYear(result) - 1900);
            }
            return result;
        };
        /**
         * Pads a number to make it two digits.
         * @param n The number to pad.
         * @returns The padded number.
         */
        /**
         * Pads a number to make it two digits.
         * @private
         * @param {?} n The number to pad.
         * @return {?} The padded number.
         */
        NativeDateAdapter.prototype._2digit = /**
         * Pads a number to make it two digits.
         * @private
         * @param {?} n The number to pad.
         * @return {?} The padded number.
         */
        function (n) {
            return ('00' + n).slice(-2);
        };
        /**
         * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
         * other browsers do not. We remove them to make output consistent and because they interfere with
         * date parsing.
         * @param str The string to strip direction characters from.
         * @returns The stripped string.
         */
        /**
         * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
         * other browsers do not. We remove them to make output consistent and because they interfere with
         * date parsing.
         * @private
         * @param {?} str The string to strip direction characters from.
         * @return {?} The stripped string.
         */
        NativeDateAdapter.prototype._stripDirectionalityCharacters = /**
         * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
         * other browsers do not. We remove them to make output consistent and because they interfere with
         * date parsing.
         * @private
         * @param {?} str The string to strip direction characters from.
         * @return {?} The stripped string.
         */
        function (str) {
            return str.replace(/[\u200e\u200f]/g, '');
        };
        /**
         * When converting Date object to string, javascript built-in functions may return wrong
         * results because it applies its internal DST rules. The DST rules around the world change
         * very frequently, and the current valid rule is not always valid in previous years though.
         * We work around this problem building a new Date object which has its internal UTC
         * representation with the local date and time.
         * @param dtf Intl.DateTimeFormat object, containg the desired string format. It must have
         *    timeZone set to 'utc' to work fine.
         * @param date Date from which we want to get the string representation according to dtf
         * @returns A Date object with its UTC representation based on the passed in date info
         */
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
        NativeDateAdapter.prototype._format = /**
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
        function (dtf, date) {
            /** @type {?} */
            var d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
            return dtf.format(d);
        };
        NativeDateAdapter.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        NativeDateAdapter.ctorParameters = function () { return [
            { type: platform.Platform },
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [MAT_DATE_LOCALE,] }] }
        ]; };
        return NativeDateAdapter;
    }(DateAdapter));
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

    /**
     * @fileoverview added by tsickle
     * Generated from: core/native-date-formats.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /** @type {?} */
    var MAT_NATIVE_DATE_FORMATS = {
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
     * Generated from: core/index.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NativeDateModule = /** @class */ (function () {
        function NativeDateModule() {
        }
        NativeDateModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [platform.PlatformModule],
                        providers: [{ provide: DateAdapter, useClass: NativeDateAdapter }]
                    },] }
        ];
        return NativeDateModule;
    }());
    var ɵ0$1 = MAT_NATIVE_DATE_FORMATS;
    var MatNativeDateModule = /** @class */ (function () {
        function MatNativeDateModule() {
        }
        MatNativeDateModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [NativeDateModule],
                        providers: [{ provide: MAT_DATE_FORMATS, useValue: ɵ0$1 }]
                    },] }
        ];
        return MatNativeDateModule;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: moment-adapter/moment-date-adapter.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var moment = momentNs;
    /**
     * Creates an array and fills it with values.
     * @template T
     * @param {?} length
     * @param {?} valueFunction
     * @return {?}
     */
    function range$1(length, valueFunction) {
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
        __extends(MomentDateAdapter, _super);
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
                dates: range$1(31, (/**
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
            return range$1(24, String);
        };
        /**
         * @return {?}
         */
        MomentDateAdapter.prototype.getMinuteNames = /**
         * @return {?}
         */
        function () {
            // TODO SUPPORTS_INTL_API
            return range$1(60, String);
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
            { type: core.Injectable }
        ];
        /** @nocollapse */
        MomentDateAdapter.ctorParameters = function () { return [
            { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [MAT_DATE_LOCALE,] }] }
        ]; };
        return MomentDateAdapter;
    }(DateAdapter));
    if (false) {
        /**
         * @type {?}
         * @private
         */
        MomentDateAdapter.prototype._localeData;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: moment-adapter/moment-date-formats.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /** @type {?} */
    var MAT_MOMENT_DATE_FORMATS = {
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
     * Generated from: moment-adapter/index.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var MomentDateModule = /** @class */ (function () {
        function MomentDateModule() {
        }
        MomentDateModule.decorators = [
            { type: core.NgModule, args: [{
                        providers: [{ provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] }]
                    },] }
        ];
        return MomentDateModule;
    }());
    var ɵ0$2 = MAT_MOMENT_DATE_FORMATS;
    var MatMomentDateModule = /** @class */ (function () {
        function MatMomentDateModule() {
        }
        MatMomentDateModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [MomentDateModule],
                        providers: [{ provide: MAT_DATE_FORMATS, useValue: ɵ0$2 }]
                    },] }
        ];
        return MatMomentDateModule;
    }());

    /**
     * @fileoverview added by tsickle
     * Generated from: datepicker-errors.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        return Error("MatDatepicker: No provider found for " + provider + ". You must import one of the following " +
            "modules at your application root: MatNativeDateModule, MatMomentDateModule " +
            "or provide a custom implementation.");
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: clock-view.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var CLOCK_RADIUS = 50;
    /** @type {?} */
    var CLOCK_INNER_RADIUS = 27.5;
    /** @type {?} */
    var CLOCK_OUTER_RADIUS = 41.25;
    /** @type {?} */
    var CLOCK_TICK_RADIUS = 7.0833;
    /**
     * A clock that is used as part of the datepicker.
     * \@docs-private
     * @template D
     */
    var MatClockView = /** @class */ (function () {
        function MatClockView(_changeDetectorRef, _element, _dateAdapter, _dateFormats) {
            var _this = this;
            this._changeDetectorRef = _changeDetectorRef;
            this._element = _element;
            this._dateAdapter = _dateAdapter;
            this._dateFormats = _dateFormats;
            this.clockStep = 1;
            this.twelveHour = false;
            // Whether the clock is in hour view.
            this.hourView = true;
            // Emits when the final time was selected.
            this.selectedTime = new core.EventEmitter();
            // Emits when the currently selected date changes.
            this.selectedChange = new core.EventEmitter();
            // Emits when the currently selected date changes.
            this.changeView = new core.EventEmitter();
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
            function (event) {
                _this._handleMousemove(event);
            });
            this.mouseUpListener = (/**
             * @return {?}
             */
            function () {
                _this._handleMouseup();
            });
        }
        Object.defineProperty(MatClockView.prototype, "activeDate", {
            /**
             * The time to display in this clock view. (the rest is ignored)
             */
            get: /**
             * The time to display in this clock view. (the rest is ignored)
             * @return {?}
             */
            function () {
                return this._activeDate;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                /** @type {?} */
                var oldActiveDate = this._activeDate;
                /** @type {?} */
                var validDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value)) || this._dateAdapter.today();
                this._activeDate = this._dateAdapter.clampDate(validDate, this.minDate, this.maxDate);
                if (oldActiveDate && this._dateAdapter.compareDate(oldActiveDate, this._activeDate, 'minute')) {
                    this._init();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatClockView.prototype, "selected", {
            // The currently selected date.
            get: 
            // The currently selected date.
            /**
             * @return {?}
             */
            function () {
                return this._selected;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._selected = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatClockView.prototype, "minDate", {
            /** The minimum selectable date. */
            get: /**
             * The minimum selectable date.
             * @return {?}
             */
            function () {
                return this._minDate;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._minDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatClockView.prototype, "maxDate", {
            /** The maximum selectable date. */
            get: /**
             * The maximum selectable date.
             * @return {?}
             */
            function () {
                return this._maxDate;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._maxDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatClockView.prototype, "_hand", {
            get: /**
             * @return {?}
             */
            function () {
                this._selectedHour = this._dateAdapter.getHours(this.activeDate);
                this._selectedMinute = this._dateAdapter.getMinutes(this.activeDate);
                /** @type {?} */
                var radius = CLOCK_OUTER_RADIUS;
                /** @type {?} */
                var deg = 0;
                if (this.twelveHour) {
                    this._selectedHour = this._selectedHour < 12 ? this._selectedHour : this._selectedHour - 12;
                    this._selectedHour = this._selectedHour === 0 ? 12 : this._selectedHour;
                }
                if (this.hourView) {
                    /** @type {?} */
                    var outer = this._selectedHour > 0 && this._selectedHour < 13;
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
                    transform: "rotate(" + deg + "deg)",
                    height: radius + "%",
                    'margin-top': 50 - radius + "%"
                };
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        MatClockView.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            this._init();
        };
        // Handles mousedown events on the clock body.
        // Handles mousedown events on the clock body.
        /**
         * @param {?} event
         * @return {?}
         */
        MatClockView.prototype._handleMousedown = 
        // Handles mousedown events on the clock body.
        /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            this.setTime(event);
            document.addEventListener('mousemove', this.mouseMoveListener);
            document.addEventListener('touchmove', this.mouseMoveListener);
            document.addEventListener('mouseup', this.mouseUpListener);
            document.addEventListener('touchend', this.mouseUpListener);
        };
        /**
         * @param {?} event
         * @return {?}
         */
        MatClockView.prototype._handleMousemove = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            event.preventDefault();
            this.setTime(event);
        };
        /**
         * @return {?}
         */
        MatClockView.prototype._handleMouseup = /**
         * @return {?}
         */
        function () {
            document.removeEventListener('mousemove', this.mouseMoveListener);
            document.removeEventListener('touchmove', this.mouseMoveListener);
            document.removeEventListener('mouseup', this.mouseUpListener);
            document.removeEventListener('touchend', this.mouseUpListener);
        };
        // Initializes this clock view.
        // Initializes this clock view.
        /**
         * @return {?}
         */
        MatClockView.prototype._init = 
        // Initializes this clock view.
        /**
         * @return {?}
         */
        function () {
            this._hours.length = 0;
            this._minutes.length = 0;
            /** @type {?} */
            var hourNames = this._dateAdapter.getHourNames();
            /** @type {?} */
            var minuteNames = this._dateAdapter.getMinuteNames();
            if (this.twelveHour) {
                this._anteMeridian = this._dateAdapter.getHours(this.activeDate) < 12;
                for (var i = 0; i < hourNames.length / 2; i++) {
                    /** @type {?} */
                    var radian = i / 6 * Math.PI;
                    /** @type {?} */
                    var radius = CLOCK_OUTER_RADIUS;
                    /** @type {?} */
                    var date = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), this._dateAdapter.getMonth(this.activeDate), this._dateAdapter.getDate(this.activeDate), this._anteMeridian ? i : i + 12);
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
                for (var i = 0; i < hourNames.length; i++) {
                    /** @type {?} */
                    var radian = i / 6 * Math.PI;
                    /** @type {?} */
                    var outer = i > 0 && i < 13;
                    /** @type {?} */
                    var radius = outer ? CLOCK_OUTER_RADIUS : CLOCK_INNER_RADIUS;
                    /** @type {?} */
                    var date = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), this._dateAdapter.getMonth(this.activeDate), this._dateAdapter.getDate(this.activeDate), i);
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
            for (var i = 0; i < minuteNames.length; i += 5) {
                /** @type {?} */
                var radian = i / 30 * Math.PI;
                /** @type {?} */
                var date = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), this._dateAdapter.getMonth(this.activeDate), this._dateAdapter.getDate(this.activeDate), this._dateAdapter.getHours(this.activeDate), i);
                this._minutes.push({
                    value: i,
                    displayValue: i === 0 ? '00' : minuteNames[i],
                    enabled: !this.dateFilter || this.dateFilter(date, 'minute'),
                    top: CLOCK_RADIUS - Math.cos(radian) * CLOCK_OUTER_RADIUS - CLOCK_TICK_RADIUS,
                    left: CLOCK_RADIUS + Math.sin(radian) * CLOCK_OUTER_RADIUS - CLOCK_TICK_RADIUS
                });
            }
            this._changeDetectorRef.markForCheck();
        };
        // Set Time
        // Set Time
        /**
         * @private
         * @param {?} event
         * @return {?}
         */
        MatClockView.prototype.setTime = 
        // Set Time
        /**
         * @private
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var trigger = this._element.nativeElement;
            /** @type {?} */
            var triggerRect = trigger.getBoundingClientRect();
            /** @type {?} */
            var width = trigger.offsetWidth;
            /** @type {?} */
            var height = trigger.offsetHeight;
            /** @type {?} */
            var pageX = event.pageX !== undefined ? event.pageX : event.touches[0].pageX;
            /** @type {?} */
            var pageY = event.pageY !== undefined ? event.pageY : event.touches[0].pageY;
            /** @type {?} */
            var x = width / 2 - (pageX - triggerRect.left - window.pageXOffset);
            /** @type {?} */
            var y = height / 2 - (pageY - triggerRect.top - window.pageYOffset);
            /** @type {?} */
            var unit = Math.PI / (this.hourView ? 6 : this.clockStep ? 30 / this.clockStep : 30);
            /** @type {?} */
            var z = Math.sqrt(x * x + y * y);
            /** @type {?} */
            var outer = this.hourView && z > (width * (CLOCK_OUTER_RADIUS / 100) + width * (CLOCK_INNER_RADIUS / 100)) / 2;
            /** @type {?} */
            var radian = Math.atan2(-x, y);
            if (radian < 0) {
                radian = Math.PI * 2 + radian;
            }
            /** @type {?} */
            var value = Math.round(radian / unit);
            /** @type {?} */
            var date = this._dateAdapter.clone(this.activeDate);
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
        };
        /**
         * @return {?}
         */
        MatClockView.prototype._focusActiveCell = /**
         * @return {?}
         */
        function () { };
        /**
         * @param obj The object to check.
         * @returns The given object if it is both a date instance and valid, otherwise null.
         */
        /**
         * @private
         * @param {?} obj The object to check.
         * @return {?} The given object if it is both a date instance and valid, otherwise null.
         */
        MatClockView.prototype._getValidDateOrNull = /**
         * @private
         * @param {?} obj The object to check.
         * @return {?} The given object if it is both a date instance and valid, otherwise null.
         */
        function (obj) {
            return this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj) ? obj : null;
        };
        MatClockView.decorators = [
            { type: core.Component, args: [{
                        selector: 'mat-clock-view',
                        template: "<div class=\"mat-clock\">\r\n  <div class=\"mat-clock-center\"></div>\r\n  <div class=\"mat-clock-hand\" [ngStyle]=\"_hand\"></div>\r\n\r\n  <div class=\"mat-clock-hours\" [class.active]=\"hourView\">\r\n    <div *ngFor=\"let item of _hours\"\r\n      class=\"mat-clock-cell\"\r\n      [class.mat-clock-cell-selected]=\"_selectedHour == item.value\"\r\n      [class.mat-clock-cell-disabled]=\"!item.enabled\"\r\n      [style.top.%]=\"item.top\"\r\n      [style.left.%]=\"item.left\"\r\n      [style.fontSize]=\"item.fontSize\">\r\n      {{ item.displayValue }}\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"mat-clock-minutes\" [class.active]=\"!hourView\">\r\n    <div *ngFor=\"let item of _minutes\"\r\n      class=\"mat-clock-cell\"\r\n      [class.mat-clock-cell-selected]=\"_selectedMinute == item.value\"\r\n      [class.mat-clock-cell-disabled]=\"!item.enabled\"\r\n      [style.top.%]=\"item.top\"\r\n      [style.left.%]=\"item.left\">\r\n      {{ item.displayValue }}\r\n    </div>\r\n  </div>\r\n</div>\r\n",
                        exportAs: 'matClockView',
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        host: {
                            role: 'clock',
                            '(mousedown)': '_handleMousedown($event)'
                        },
                        preserveWhitespaces: false
                    }] }
        ];
        /** @nocollapse */
        MatClockView.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: DateAdapter, decorators: [{ type: core.Optional }] },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [MAT_DATE_FORMATS,] }] }
        ]; };
        MatClockView.propDecorators = {
            activeDate: [{ type: core.Input }],
            selected: [{ type: core.Input }],
            minDate: [{ type: core.Input }],
            maxDate: [{ type: core.Input }],
            dateFilter: [{ type: core.Input }],
            clockStep: [{ type: core.Input }],
            twelveHour: [{ type: core.Input }],
            hourView: [{ type: core.Input }],
            selectedTime: [{ type: core.Output }],
            selectedChange: [{ type: core.Output }],
            changeView: [{ type: core.Output }]
        };
        return MatClockView;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        MatClockView.prototype._activeDate;
        /**
         * @type {?}
         * @private
         */
        MatClockView.prototype._selected;
        /**
         * @type {?}
         * @private
         */
        MatClockView.prototype._minDate;
        /**
         * @type {?}
         * @private
         */
        MatClockView.prototype._maxDate;
        /** @type {?} */
        MatClockView.prototype.dateFilter;
        /** @type {?} */
        MatClockView.prototype.clockStep;
        /** @type {?} */
        MatClockView.prototype.twelveHour;
        /** @type {?} */
        MatClockView.prototype.hourView;
        /** @type {?} */
        MatClockView.prototype.selectedTime;
        /** @type {?} */
        MatClockView.prototype.selectedChange;
        /** @type {?} */
        MatClockView.prototype.changeView;
        /** @type {?} */
        MatClockView.prototype._hours;
        /** @type {?} */
        MatClockView.prototype._minutes;
        /** @type {?} */
        MatClockView.prototype._selectedHour;
        /** @type {?} */
        MatClockView.prototype._selectedMinute;
        /** @type {?} */
        MatClockView.prototype._anteMeridian;
        /**
         * @type {?}
         * @private
         */
        MatClockView.prototype.mouseMoveListener;
        /**
         * @type {?}
         * @private
         */
        MatClockView.prototype.mouseUpListener;
        /**
         * @type {?}
         * @private
         */
        MatClockView.prototype._changeDetectorRef;
        /**
         * @type {?}
         * @private
         */
        MatClockView.prototype._element;
        /** @type {?} */
        MatClockView.prototype._dateAdapter;
        /**
         * @type {?}
         * @private
         */
        MatClockView.prototype._dateFormats;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: datepicker-animations.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var slideCalendar = animations.trigger('slideCalendar', [
        animations.transition('* => left', [
            animations.animate(180, animations.keyframes([
                animations.style({ transform: 'translateX(50%)', offset: 0.5, opacity: 0 }),
                animations.style({ transform: 'translateX(-50%)', offset: 0.51, opacity: 0 }),
                animations.style({ transform: 'translateX(0)', offset: 1, opacity: 1 })
            ]))
        ]),
        animations.transition('* => right', [
            animations.animate(180, animations.keyframes([
                animations.style({ transform: 'translateX(-50%)', offset: 0.5, opacity: 0 }),
                animations.style({ transform: 'translateX(50%)', offset: 0.51, opacity: 0 }),
                animations.style({ transform: 'translateX(0)', offset: 1, opacity: 1 })
            ]))
        ])
    ]);
    /** @type {?} */
    var controlActive = animations.trigger('controlActive', [
        animations.transition('* => active', [
            animations.animate('0.4s linear', animations.keyframes([
                animations.style({ transform: 'scale(0.9)' }),
                animations.style({ transform: 'scale(1.1)' }),
                animations.style({ transform: 'scale(1)' })
            ]))
        ])
    ]);
    /** @type {?} */
    var transformPanel = animations.trigger('transformPanel', [
        animations.state('void', animations.style({ opacity: 0, transform: 'scale(1, 0)' })),
        animations.state('enter', animations.style({ opacity: 1, transform: 'scale(1, 1)' })),
        animations.transition('void => enter', animations.group([
            animations.query('@fadeInCalendar', animations.animateChild()),
            animations.animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')
        ])),
        animations.transition('* => void', animations.animate('100ms linear', animations.style({ opacity: 0 })))
    ]);
    /** @type {?} */
    var fadeInCalendar = animations.trigger('fadeInCalendar', [
        animations.state('void', animations.style({ opacity: 0 })),
        animations.state('enter', animations.style({ opacity: 1 })),
        animations.transition('void => *', animations.animate('400ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)'))
    ]);

    /**
     * @fileoverview added by tsickle
     * Generated from: datepicker-intl.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function MatDatepickerIntlCatalog() { }
    if (false) {
        /** @type {?} */
        MatDatepickerIntlCatalog.prototype.calendarLabel;
        /** @type {?} */
        MatDatepickerIntlCatalog.prototype.openCalendarLabel;
        /** @type {?} */
        MatDatepickerIntlCatalog.prototype.prevMonthLabel;
        /** @type {?} */
        MatDatepickerIntlCatalog.prototype.nextMonthLabel;
        /** @type {?} */
        MatDatepickerIntlCatalog.prototype.prevYearLabel;
        /** @type {?} */
        MatDatepickerIntlCatalog.prototype.nextYearLabel;
        /** @type {?} */
        MatDatepickerIntlCatalog.prototype.setToAMLabel;
        /** @type {?} */
        MatDatepickerIntlCatalog.prototype.setToPMLabel;
        /** @type {?} */
        MatDatepickerIntlCatalog.prototype.switchToMinuteViewLabel;
        /** @type {?} */
        MatDatepickerIntlCatalog.prototype.switchToHourViewLabel;
        /** @type {?} */
        MatDatepickerIntlCatalog.prototype.switchToMonthViewLabel;
        /** @type {?} */
        MatDatepickerIntlCatalog.prototype.switchToYearViewLabel;
        /** @type {?} */
        MatDatepickerIntlCatalog.prototype.switchToYearsViewLabel;
        /** @type {?} */
        MatDatepickerIntlCatalog.prototype.buttonSubmitText;
        /** @type {?} */
        MatDatepickerIntlCatalog.prototype.buttonSubmitLabel;
        /** @type {?} */
        MatDatepickerIntlCatalog.prototype.buttonCancelText;
        /** @type {?} */
        MatDatepickerIntlCatalog.prototype.buttonCancelLabel;
    }
    /**
     * Datepicker data that requires internationalization.
     */
    var MatDatepickerIntl = /** @class */ (function () {
        function MatDatepickerIntl() {
            /**
             * Stream that emits whenever the labels here are changed. Use this to notify
             * components if the labels have changed after initialization.
             */
            this.changes = new rxjs.Subject();
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
        MatDatepickerIntl.decorators = [
            { type: core.Injectable, args: [{ providedIn: 'root' },] }
        ];
        /** @nocollapse */ MatDatepickerIntl.ɵprov = core["ɵɵdefineInjectable"]({ factory: function MatDatepickerIntl_Factory() { return new MatDatepickerIntl(); }, token: MatDatepickerIntl, providedIn: "root" });
        return MatDatepickerIntl;
    }());
    if (false) {
        /**
         * Stream that emits whenever the labels here are changed. Use this to notify
         * components if the labels have changed after initialization.
         * @type {?}
         */
        MatDatepickerIntl.prototype.changes;
        /**
         * A label for the calendar popup (used by screen readers).
         * @type {?}
         */
        MatDatepickerIntl.prototype.calendarLabel;
        /**
         * A label for the button used to open the calendar popup (used by screen readers).
         * @type {?}
         */
        MatDatepickerIntl.prototype.openCalendarLabel;
        /**
         * A label for the previous month button (used by screen readers).
         * @type {?}
         */
        MatDatepickerIntl.prototype.prevMonthLabel;
        /**
         * A label for the next month button (used by screen readers).
         * @type {?}
         */
        MatDatepickerIntl.prototype.nextMonthLabel;
        /**
         * A label for the previous year button (used by screen readers).
         * @type {?}
         */
        MatDatepickerIntl.prototype.prevYearLabel;
        /**
         * A label for the next year button (used by screen readers).
         * @type {?}
         */
        MatDatepickerIntl.prototype.nextYearLabel;
        /**
         * A label for the 'AM' button (used by screen readers).
         * @type {?}
         */
        MatDatepickerIntl.prototype.setToAMLabel;
        /**
         * A label for the 'PM' button (used by screen readers).
         * @type {?}
         */
        MatDatepickerIntl.prototype.setToPMLabel;
        /**
         * A label for the 'switch to minute view' button (used by screen readers).
         * @type {?}
         */
        MatDatepickerIntl.prototype.switchToMinuteViewLabel;
        /**
         * A label for the 'switch to hour view' button (used by screen readers).
         * @type {?}
         */
        MatDatepickerIntl.prototype.switchToHourViewLabel;
        /**
         * A label for the 'switch to month view' button (used by screen readers).
         * @type {?}
         */
        MatDatepickerIntl.prototype.switchToMonthViewLabel;
        /**
         * A label for the 'switch to year view' button (used by screen readers).
         * @type {?}
         */
        MatDatepickerIntl.prototype.switchToYearViewLabel;
        /**
         * A label for the 'switch to years view' button (used by screen readers).
         * @type {?}
         */
        MatDatepickerIntl.prototype.switchToYearsViewLabel;
        /**
         * Text for the 'submit' button.
         * @type {?}
         */
        MatDatepickerIntl.prototype.buttonSubmitText;
        /**
         * A label for the 'submit' button (used by screen readers).
         * @type {?}
         */
        MatDatepickerIntl.prototype.buttonSubmitLabel;
        /**
         * Text for the 'cancel' button.
         * @type {?}
         */
        MatDatepickerIntl.prototype.buttonCancelText;
        /**
         * A label for the 'cancel' button (used by screen readers).
         * @type {?}
         */
        MatDatepickerIntl.prototype.buttonCancelLabel;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: calendar-body.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * An internal class that represents the data corresponding to a single calendar cell.
     * \@docs-private
     */
    var   /**
     * An internal class that represents the data corresponding to a single calendar cell.
     * \@docs-private
     */
    MatCalendarCell = /** @class */ (function () {
        function MatCalendarCell(value, displayValue, ariaLabel, enabled) {
            this.value = value;
            this.displayValue = displayValue;
            this.ariaLabel = ariaLabel;
            this.enabled = enabled;
        }
        return MatCalendarCell;
    }());
    if (false) {
        /** @type {?} */
        MatCalendarCell.prototype.value;
        /** @type {?} */
        MatCalendarCell.prototype.displayValue;
        /** @type {?} */
        MatCalendarCell.prototype.ariaLabel;
        /** @type {?} */
        MatCalendarCell.prototype.enabled;
    }
    /**
     * An internal component used to display calendar data in a table.
     * \@docs-private
     */
    var MatCalendarBody = /** @class */ (function () {
        function MatCalendarBody(_elementRef, _ngZone) {
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
            this.selectedValueChange = new core.EventEmitter();
        }
        /**
         * @param {?} cell
         * @return {?}
         */
        MatCalendarBody.prototype._cellClicked = /**
         * @param {?} cell
         * @return {?}
         */
        function (cell) {
            if (!this.allowDisabledSelection && !cell.enabled) {
                return;
            }
            this.selectedValueChange.emit(cell.value);
        };
        Object.defineProperty(MatCalendarBody.prototype, "_firstRowOffset", {
            /** The number of blank cells to put at the beginning for the first row. */
            get: /**
             * The number of blank cells to put at the beginning for the first row.
             * @return {?}
             */
            function () {
                return this.rows && this.rows.length && this.rows[0].length
                    ? this.numCols - this.rows[0].length
                    : 0;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} rowIndex
         * @param {?} colIndex
         * @return {?}
         */
        MatCalendarBody.prototype._isActiveCell = /**
         * @param {?} rowIndex
         * @param {?} colIndex
         * @return {?}
         */
        function (rowIndex, colIndex) {
            /** @type {?} */
            var cellNumber = rowIndex * this.numCols + colIndex;
            // Account for the fact that the first row may not have as many cells.
            if (rowIndex) {
                cellNumber -= this._firstRowOffset;
            }
            return cellNumber === this.activeCell;
        };
        /** Focuses the active cell after the microtask queue is empty. */
        /**
         * Focuses the active cell after the microtask queue is empty.
         * @return {?}
         */
        MatCalendarBody.prototype._focusActiveCell = /**
         * Focuses the active cell after the microtask queue is empty.
         * @return {?}
         */
        function () {
            var _this = this;
            this._ngZone.runOutsideAngular((/**
             * @return {?}
             */
            function () {
                _this._ngZone.onStable
                    .asObservable()
                    .pipe(operators.take(1))
                    .subscribe((/**
                 * @return {?}
                 */
                function () {
                    _this._elementRef.nativeElement.querySelector('.mat-calendar-body-active').focus();
                }));
            }));
        };
        MatCalendarBody.decorators = [
            { type: core.Component, args: [{
                        selector: '[mat-calendar-body]',
                        template: "<!--\r\n  If there's not enough space in the first row, create a separate label row. We mark this row as\r\n  aria-hidden because we don't want it to be read out as one of the weeks in the month.\r\n-->\r\n<tr *ngIf=\"label && _firstRowOffset < labelMinRequiredCells\" aria-hidden=\"true\">\r\n  <td class=\"mat-calendar-body-label\"\r\n      [attr.colspan]=\"numCols\"\r\n      [style.paddingTop.%]=\"50 * cellAspectRatio / numCols\"\r\n      [style.paddingBottom.%]=\"50 * cellAspectRatio / numCols\">\r\n    {{ label }}\r\n  </td>\r\n</tr>\r\n\r\n<!-- Create the first row separately so we can include a special spacer cell. -->\r\n<tr *ngFor=\"let row of rows; let rowIndex = index\" role=\"row\">\r\n  <!--\r\n    We mark this cell as aria-hidden so it doesn't get read out as one of the days in the week.\r\n    The aspect ratio of the table cells is maintained by setting the top and bottom padding as a\r\n    percentage of the width (a variant of the trick described here:\r\n    https://www.w3schools.com/howto/howto_css_aspect_ratio.asp).\r\n  -->\r\n  <td *ngIf=\"rowIndex === 0 && _firstRowOffset\"\r\n      aria-hidden=\"true\"\r\n      class=\"mat-calendar-body-label\"\r\n      [attr.colspan]=\"_firstRowOffset\"\r\n      [style.paddingTop.%]=\"50 * cellAspectRatio / numCols\"\r\n      [style.paddingBottom.%]=\"50 * cellAspectRatio / numCols\">\r\n    {{ _firstRowOffset >= labelMinRequiredCells ? label : '' }}\r\n  </td>\r\n  <td *ngFor=\"let item of row; let colIndex = index\"\r\n      role=\"gridcell\"\r\n      class=\"mat-calendar-body-cell\"\r\n      [tabindex]=\"_isActiveCell(rowIndex, colIndex) ? 0 : -1\"\r\n      [class.mat-calendar-body-disabled]=\"!item.enabled\"\r\n      [class.mat-calendar-body-active]=\"_isActiveCell(rowIndex, colIndex)\"\r\n      [attr.aria-label]=\"item.ariaLabel\"\r\n      [attr.aria-disabled]=\"!item.enabled || null\"\r\n      (click)=\"_cellClicked(item)\"\r\n      [style.width.%]=\"100 / numCols\"\r\n      [style.paddingTop.%]=\"50 * cellAspectRatio / numCols\"\r\n      [style.paddingBottom.%]=\"50 * cellAspectRatio / numCols\">\r\n    <div class=\"mat-calendar-body-cell-background\"\r\n         [class.mat-calendar-body-selected]=\"selectedValue === item.value\"\r\n         [class.mat-calendar-body-active]=\"activeValue === item.value\"\r\n         [class.mat-calendar-body-today]=\"todayValue === item.value\">\r\n    </div>\r\n    <span class=\"mat-calendar-body-cell-content\">{{ item.displayValue }}</span>\r\n  </td>\r\n</tr>\r\n",
                        // styleUrls: ['calendar-body.scss'],
                        host: {
                            class: 'mat-calendar-body',
                            role: 'grid',
                            'attr.aria-readonly': 'true'
                        },
                        exportAs: 'matCalendarBody',
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        preserveWhitespaces: false
                    }] }
        ];
        /** @nocollapse */
        MatCalendarBody.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        MatCalendarBody.propDecorators = {
            label: [{ type: core.Input }],
            rows: [{ type: core.Input }],
            todayValue: [{ type: core.Input }],
            activeValue: [{ type: core.Input }],
            selectedValue: [{ type: core.Input }],
            labelMinRequiredCells: [{ type: core.Input }],
            numCols: [{ type: core.Input }],
            allowDisabledSelection: [{ type: core.Input }],
            activeCell: [{ type: core.Input }],
            cellAspectRatio: [{ type: core.Input }],
            selectedValueChange: [{ type: core.Output }]
        };
        return MatCalendarBody;
    }());
    if (false) {
        /**
         * The label for the table. (e.g. "Jan 2017").
         * @type {?}
         */
        MatCalendarBody.prototype.label;
        /**
         * The cells to display in the table.
         * @type {?}
         */
        MatCalendarBody.prototype.rows;
        /**
         * The value in the table that corresponds to today.
         * @type {?}
         */
        MatCalendarBody.prototype.todayValue;
        /**
         * The value in the table that is active.
         * @type {?}
         */
        MatCalendarBody.prototype.activeValue;
        /**
         * The value in the table that is currently selected.
         * @type {?}
         */
        MatCalendarBody.prototype.selectedValue;
        /**
         * The minimum number of free cells needed to fit the label in the first row.
         * @type {?}
         */
        MatCalendarBody.prototype.labelMinRequiredCells;
        /**
         * The number of columns in the table.
         * @type {?}
         */
        MatCalendarBody.prototype.numCols;
        /**
         * Whether to allow selection of disabled cells.
         * @type {?}
         */
        MatCalendarBody.prototype.allowDisabledSelection;
        /**
         * The cell number of the active cell in the table.
         * @type {?}
         */
        MatCalendarBody.prototype.activeCell;
        /**
         * The aspect ratio (width / height) to use for the cells in the table. This aspect ratio will be
         * maintained even as the table resizes.
         * @type {?}
         */
        MatCalendarBody.prototype.cellAspectRatio;
        /**
         * Emits when a new value is selected.
         * @type {?}
         */
        MatCalendarBody.prototype.selectedValueChange;
        /**
         * @type {?}
         * @private
         */
        MatCalendarBody.prototype._elementRef;
        /**
         * @type {?}
         * @private
         */
        MatCalendarBody.prototype._ngZone;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: month-view.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var DAYS_PER_WEEK = 7;
    /**
     * An internal component used to display a single month in the datepicker.
     * \@docs-private
     * @template D
     */
    var MatMonthView = /** @class */ (function () {
        function MatMonthView(_changeDetectorRef, _dateFormats, _dateAdapter, _dir) {
            this._changeDetectorRef = _changeDetectorRef;
            this._dateFormats = _dateFormats;
            this._dateAdapter = _dateAdapter;
            this._dir = _dir;
            /**
             * Emits when a new date is selected.
             */
            this.selectedChange = new core.EventEmitter();
            /**
             * Emits when any date is selected.
             */
            this._userSelection = new core.EventEmitter();
            /**
             * Emits when any date is activated.
             */
            this.activeDateChange = new core.EventEmitter();
            if (!this._dateAdapter) {
                throw createMissingDateImplError('DateAdapter');
            }
            if (!this._dateFormats) {
                throw createMissingDateImplError('MAT_DATE_FORMATS');
            }
            /** @type {?} */
            var firstDayOfWeek = this._dateAdapter.getFirstDayOfWeek();
            /** @type {?} */
            var narrowWeekdays = this._dateAdapter.getDayOfWeekNames('narrow');
            /** @type {?} */
            var longWeekdays = this._dateAdapter.getDayOfWeekNames('long');
            // Rotate the labels for days of the week based on the configured first day of the week.
            /** @type {?} */
            var weekdays = longWeekdays.map((/**
             * @param {?} long
             * @param {?} i
             * @return {?}
             */
            function (long, i) {
                return { long: long, narrow: narrowWeekdays[i].slice(0, 1) };
            }));
            this._weekdays = weekdays.slice(firstDayOfWeek).concat(weekdays.slice(0, firstDayOfWeek));
        }
        Object.defineProperty(MatMonthView.prototype, "activeDate", {
            /**
             * The date to display in this month view (everything other than the month and year is ignored).
             */
            get: /**
             * The date to display in this month view (everything other than the month and year is ignored).
             * @return {?}
             */
            function () {
                return this._activeDate;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                /** @type {?} */
                var oldActiveDate = this._activeDate;
                /** @type {?} */
                var validDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value)) || this._dateAdapter.today();
                this._activeDate = this._dateAdapter.clampDate(validDate, this.minDate, this.maxDate);
                this._activeValue = this._getDateInCurrentMonth(this.activeDate);
                if (oldActiveDate && !this._hasSameMonthAndYear(oldActiveDate, this._activeDate)) {
                    this._init();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatMonthView.prototype, "selected", {
            /** The currently selected date. */
            get: /**
             * The currently selected date.
             * @return {?}
             */
            function () {
                return this._selected;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._selected = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
                this._selectedDate = this._getDateInCurrentMonth(this._selected);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatMonthView.prototype, "minDate", {
            /** The minimum selectable date. */
            get: /**
             * The minimum selectable date.
             * @return {?}
             */
            function () {
                return this._minDate;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._minDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatMonthView.prototype, "maxDate", {
            /** The maximum selectable date. */
            get: /**
             * The maximum selectable date.
             * @return {?}
             */
            function () {
                return this._maxDate;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._maxDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        MatMonthView.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            this._init();
        };
        /** Handles when a new date is selected. */
        /**
         * Handles when a new date is selected.
         * @param {?} date
         * @return {?}
         */
        MatMonthView.prototype._dateSelected = /**
         * Handles when a new date is selected.
         * @param {?} date
         * @return {?}
         */
        function (date) {
            if (this._selectedDate !== date) {
                /** @type {?} */
                var selectedYear = this._dateAdapter.getYear(this.activeDate);
                /** @type {?} */
                var selectedMonth = this._dateAdapter.getMonth(this.activeDate);
                /** @type {?} */
                var selectedHours = this._dateAdapter.getHours(this.activeDate);
                /** @type {?} */
                var selectedMinutes = this._dateAdapter.getMinutes(this.activeDate);
                /** @type {?} */
                var selectedDate = this._dateAdapter.createDate(selectedYear, selectedMonth, date, selectedHours, selectedMinutes);
                this.selectedChange.emit(selectedDate);
            }
            this._userSelection.emit();
        };
        /** Handles keydown events on the calendar body when calendar is in month view. */
        /**
         * Handles keydown events on the calendar body when calendar is in month view.
         * @param {?} event
         * @return {?}
         */
        MatMonthView.prototype._handleCalendarBodyKeydown = /**
         * Handles keydown events on the calendar body when calendar is in month view.
         * @param {?} event
         * @return {?}
         */
        function (event) {
            // TODO(mmalerba): We currently allow keyboard navigation to disabled dates, but just prevent
            // disabled ones from being selected. This may not be ideal, we should look into whether
            // navigation should skip over disabled dates, and if so, how to implement that efficiently.
            // TODO(mmalerba): We currently allow keyboard navigation to disabled dates, but just prevent
            // disabled ones from being selected. This may not be ideal, we should look into whether
            // navigation should skip over disabled dates, and if so, how to implement that efficiently.
            /** @type {?} */
            var oldActiveDate = this._activeDate;
            /** @type {?} */
            var isRtl = this._isRtl();
            switch (event.keyCode) {
                case keycodes.LEFT_ARROW:
                    this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate, isRtl ? 1 : -1);
                    break;
                case keycodes.RIGHT_ARROW:
                    this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate, isRtl ? -1 : 1);
                    break;
                case keycodes.UP_ARROW:
                    this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate, -7);
                    break;
                case keycodes.DOWN_ARROW:
                    this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate, 7);
                    break;
                case keycodes.HOME:
                    this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate, 1 - this._dateAdapter.getDate(this._activeDate));
                    break;
                case keycodes.END:
                    this.activeDate = this._dateAdapter.addCalendarDays(this._activeDate, this._dateAdapter.getNumDaysInMonth(this._activeDate) - this._dateAdapter.getDate(this._activeDate));
                    break;
                case keycodes.PAGE_UP:
                    this.activeDate = event.altKey
                        ? this._dateAdapter.addCalendarYears(this._activeDate, -1)
                        : this._dateAdapter.addCalendarMonths(this._activeDate, -1);
                    break;
                case keycodes.PAGE_DOWN:
                    this.activeDate = event.altKey
                        ? this._dateAdapter.addCalendarYears(this._activeDate, 1)
                        : this._dateAdapter.addCalendarMonths(this._activeDate, 1);
                    break;
                case keycodes.ENTER:
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
        };
        /** Initializes this month view. */
        /**
         * Initializes this month view.
         * @return {?}
         */
        MatMonthView.prototype._init = /**
         * Initializes this month view.
         * @return {?}
         */
        function () {
            this._activeValue = this._getDateInCurrentMonth(this.activeDate);
            this._selectedDate = this._getDateInCurrentMonth(this.selected);
            this._todayDate = this._getDateInCurrentMonth(this._dateAdapter.today());
            this._monthLabel = this._dateAdapter
                .getMonthNames('short')[this._dateAdapter.getMonth(this.activeDate)].toLocaleUpperCase();
            /** @type {?} */
            var firstOfMonth = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), this._dateAdapter.getMonth(this.activeDate), 1);
            this._firstWeekOffset =
                (DAYS_PER_WEEK + this._dateAdapter.getDayOfWeek(firstOfMonth) - this._dateAdapter.getFirstDayOfWeek()) %
                    DAYS_PER_WEEK;
            this._createWeekCells();
            this._changeDetectorRef.markForCheck();
        };
        /** Focuses the active cell after the microtask queue is empty. */
        /**
         * Focuses the active cell after the microtask queue is empty.
         * @return {?}
         */
        MatMonthView.prototype._focusActiveCell = /**
         * Focuses the active cell after the microtask queue is empty.
         * @return {?}
         */
        function () {
            this._matCalendarBody._focusActiveCell();
        };
        /** Creates MatCalendarCells for the dates in this month. */
        /**
         * Creates MatCalendarCells for the dates in this month.
         * @private
         * @return {?}
         */
        MatMonthView.prototype._createWeekCells = /**
         * Creates MatCalendarCells for the dates in this month.
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var daysInMonth = this._dateAdapter.getNumDaysInMonth(this.activeDate);
            /** @type {?} */
            var dateNames = this._dateAdapter.getDateNames();
            this._weeks = [[]];
            for (var i = 0, cell = this._firstWeekOffset; i < daysInMonth; i++, cell++) {
                if (cell === DAYS_PER_WEEK) {
                    this._weeks.push([]);
                    cell = 0;
                }
                /** @type {?} */
                var date = this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), this._dateAdapter.getMonth(this.activeDate), i + 1);
                /** @type {?} */
                var enabled = this._shouldEnableDate(date);
                /** @type {?} */
                var ariaLabel = this._dateAdapter.format(date, this._dateFormats.display.dateA11yLabel);
                this._weeks[this._weeks.length - 1].push(new MatCalendarCell(i + 1, dateNames[i], ariaLabel, enabled));
            }
        };
        /** Date filter for the month */
        /**
         * Date filter for the month
         * @private
         * @param {?} date
         * @return {?}
         */
        MatMonthView.prototype._shouldEnableDate = /**
         * Date filter for the month
         * @private
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return (!!date &&
                (!this.dateFilter || this.dateFilter(date, 'day')) &&
                (!this.minDate || this._dateAdapter.compareDate(date, this.minDate, 'day') >= 0) &&
                (!this.maxDate || this._dateAdapter.compareDate(date, this.maxDate, 'day') <= 0));
        };
        /**
         * Gets the date in this month that the given Date falls on.
         * Returns null if the given Date is in another month.
         */
        /**
         * Gets the date in this month that the given Date falls on.
         * Returns null if the given Date is in another month.
         * @private
         * @param {?} date
         * @return {?}
         */
        MatMonthView.prototype._getDateInCurrentMonth = /**
         * Gets the date in this month that the given Date falls on.
         * Returns null if the given Date is in another month.
         * @private
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return date && this._hasSameMonthAndYear(date, this.activeDate) ? this._dateAdapter.getDate(date) : null;
        };
        /** Checks whether the 2 dates are non-null and fall within the same month of the same year. */
        /**
         * Checks whether the 2 dates are non-null and fall within the same month of the same year.
         * @private
         * @param {?} d1
         * @param {?} d2
         * @return {?}
         */
        MatMonthView.prototype._hasSameMonthAndYear = /**
         * Checks whether the 2 dates are non-null and fall within the same month of the same year.
         * @private
         * @param {?} d1
         * @param {?} d2
         * @return {?}
         */
        function (d1, d2) {
            return !!(d1 && d2 && this._dateAdapter.compareDate(d1, d2, 'month') === 0);
        };
        /**
         * @param obj The object to check.
         * @returns The given object if it is both a date instance and valid, otherwise null.
         */
        /**
         * @private
         * @param {?} obj The object to check.
         * @return {?} The given object if it is both a date instance and valid, otherwise null.
         */
        MatMonthView.prototype._getValidDateOrNull = /**
         * @private
         * @param {?} obj The object to check.
         * @return {?} The given object if it is both a date instance and valid, otherwise null.
         */
        function (obj) {
            return this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj) ? obj : null;
        };
        /** Determines whether the user has the RTL layout direction. */
        /**
         * Determines whether the user has the RTL layout direction.
         * @private
         * @return {?}
         */
        MatMonthView.prototype._isRtl = /**
         * Determines whether the user has the RTL layout direction.
         * @private
         * @return {?}
         */
        function () {
            return this._dir && this._dir.value === 'rtl';
        };
        MatMonthView.decorators = [
            { type: core.Component, args: [{
                        selector: 'mat-month-view',
                        template: "<table class=\"mat-calendar-table\">\r\n  <thead class=\"mat-calendar-table-header\">\r\n    <tr><th *ngFor=\"let day of _weekdays\" [attr.aria-label]=\"day.long\">{{ day.narrow }}</th></tr>\r\n  </thead>\r\n  <tbody mat-calendar-body\r\n    [@slideCalendar]=\"animationDir\"\r\n    role=\"grid\"\r\n    [rows]=\"_weeks\"\r\n    [todayValue]=\"_todayDate\"\r\n    [activeValue]=\"_activeValue\"\r\n    [selectedValue]=\"_selectedDate\"\r\n    [labelMinRequiredCells]=\"3\"\r\n    [activeCell]=\"_dateAdapter.getDate(activeDate) - 1\"\r\n    (selectedValueChange)=\"_dateSelected($event)\"\r\n    (keydown)=\"_handleCalendarBodyKeydown($event)\">\r\n  </tbody>\r\n</table>\r\n",
                        exportAs: 'matMonthView',
                        animations: [slideCalendar],
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        preserveWhitespaces: false
                    }] }
        ];
        /** @nocollapse */
        MatMonthView.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [MAT_DATE_FORMATS,] }] },
            { type: DateAdapter, decorators: [{ type: core.Optional }] },
            { type: bidi.Directionality, decorators: [{ type: core.Optional }] }
        ]; };
        MatMonthView.propDecorators = {
            activeDate: [{ type: core.Input }],
            selected: [{ type: core.Input }],
            minDate: [{ type: core.Input }],
            maxDate: [{ type: core.Input }],
            dateFilter: [{ type: core.Input }],
            animationDir: [{ type: core.Input }],
            selectedChange: [{ type: core.Output }],
            _userSelection: [{ type: core.Output }],
            activeDateChange: [{ type: core.Output }],
            _matCalendarBody: [{ type: core.ViewChild, args: [MatCalendarBody,] }]
        };
        return MatMonthView;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        MatMonthView.prototype._activeDate;
        /**
         * @type {?}
         * @private
         */
        MatMonthView.prototype._selected;
        /**
         * @type {?}
         * @private
         */
        MatMonthView.prototype._minDate;
        /**
         * @type {?}
         * @private
         */
        MatMonthView.prototype._maxDate;
        /**
         * A function used to filter which dates are selectable.
         * @type {?}
         */
        MatMonthView.prototype.dateFilter;
        /**
         * Animations handler
         * @type {?}
         */
        MatMonthView.prototype.animationDir;
        /**
         * Emits when a new date is selected.
         * @type {?}
         */
        MatMonthView.prototype.selectedChange;
        /**
         * Emits when any date is selected.
         * @type {?}
         */
        MatMonthView.prototype._userSelection;
        /**
         * Emits when any date is activated.
         * @type {?}
         */
        MatMonthView.prototype.activeDateChange;
        /**
         * The body of calendar table
         * @type {?}
         */
        MatMonthView.prototype._matCalendarBody;
        /**
         * The label for this month (e.g. "January 2017").
         * @type {?}
         */
        MatMonthView.prototype._monthLabel;
        /**
         * Grid of calendar cells representing the dates of the month.
         * @type {?}
         */
        MatMonthView.prototype._weeks;
        /**
         * The number of blank cells in the first row before the 1st of the month.
         * @type {?}
         */
        MatMonthView.prototype._firstWeekOffset;
        /**
         * The active date on the calendar.
         * @type {?}
         */
        MatMonthView.prototype._activeValue;
        /**
         * The date of the month that the currently selected Date falls on.
         * Null if the currently selected Date is in another month.
         * @type {?}
         */
        MatMonthView.prototype._selectedDate;
        /**
         * The date of the month that today falls on. Null if today is in another month.
         * @type {?}
         */
        MatMonthView.prototype._todayDate;
        /**
         * The names of the weekdays.
         * @type {?}
         */
        MatMonthView.prototype._weekdays;
        /**
         * @type {?}
         * @private
         */
        MatMonthView.prototype._changeDetectorRef;
        /**
         * @type {?}
         * @private
         */
        MatMonthView.prototype._dateFormats;
        /** @type {?} */
        MatMonthView.prototype._dateAdapter;
        /**
         * @type {?}
         * @private
         */
        MatMonthView.prototype._dir;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: year-view.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * An internal component used to display a single year in the datepicker.
     * \@docs-private
     * @template D
     */
    var MatYearView = /** @class */ (function () {
        function MatYearView(_changeDetectorRef, _dateFormats, _dateAdapter, _dir) {
            this._changeDetectorRef = _changeDetectorRef;
            this._dateFormats = _dateFormats;
            this._dateAdapter = _dateAdapter;
            this._dir = _dir;
            /**
             * Emits when a new month is selected.
             */
            this.selectedChange = new core.EventEmitter();
            /**
             * Emits when any date is activated.
             */
            this.activeDateChange = new core.EventEmitter();
            if (!this._dateAdapter) {
                throw createMissingDateImplError('DateAdapter');
            }
            if (!this._dateFormats) {
                throw createMissingDateImplError('MAT_DATE_FORMATS');
            }
        }
        Object.defineProperty(MatYearView.prototype, "activeDate", {
            /** The date to display in this year view (everything other than the year is ignored). */
            get: /**
             * The date to display in this year view (everything other than the year is ignored).
             * @return {?}
             */
            function () {
                return this._activeDate;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                /** @type {?} */
                var oldActiveDate = this._activeDate;
                /** @type {?} */
                var validDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value)) || this._dateAdapter.today();
                this._activeDate = this._dateAdapter.clampDate(validDate, this.minDate, this.maxDate);
                if (oldActiveDate &&
                    this._dateAdapter.getYear(oldActiveDate) !== this._dateAdapter.getYear(this._activeDate)) {
                    this._init();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatYearView.prototype, "selected", {
            /** The currently selected date. */
            get: /**
             * The currently selected date.
             * @return {?}
             */
            function () {
                return this._selected;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._selected = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
                this._selectedMonth = this._getMonthInCurrentYear(this._selected);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatYearView.prototype, "minDate", {
            /** The minimum selectable date. */
            get: /**
             * The minimum selectable date.
             * @return {?}
             */
            function () {
                return this._minDate;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._minDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatYearView.prototype, "maxDate", {
            /** The maximum selectable date. */
            get: /**
             * The maximum selectable date.
             * @return {?}
             */
            function () {
                return this._maxDate;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._maxDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        MatYearView.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            this._init();
        };
        /** Handles when a new month is selected. */
        /**
         * Handles when a new month is selected.
         * @param {?} month
         * @return {?}
         */
        MatYearView.prototype._monthSelected = /**
         * Handles when a new month is selected.
         * @param {?} month
         * @return {?}
         */
        function (month) {
            /** @type {?} */
            var daysInMonth = this._dateAdapter.getNumDaysInMonth(this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), month, 1));
            /** @type {?} */
            var selectedYear = this._dateAdapter.getYear(this.activeDate);
            /** @type {?} */
            var selectedDay = this._dateAdapter.getDate(this.activeDate);
            /** @type {?} */
            var selectedHours = this._dateAdapter.getHours(this.activeDate);
            /** @type {?} */
            var selectedMinutes = this._dateAdapter.getMinutes(this.activeDate);
            /** @type {?} */
            var date = this._dateAdapter.createDate(selectedYear, month, Math.min(selectedDay, daysInMonth), selectedHours, selectedMinutes);
            this.selectedChange.emit(date);
        };
        /** Initializes this year view. */
        /**
         * Initializes this year view.
         * @return {?}
         */
        MatYearView.prototype._init = /**
         * Initializes this year view.
         * @return {?}
         */
        function () {
            var _this = this;
            this._selectedMonth = this._getMonthInCurrentYear(this.selected);
            this._todayMonth = this._getMonthInCurrentYear(this._dateAdapter.today());
            this._yearLabel = this._dateAdapter.getYearName(this.activeDate);
            /** @type {?} */
            var monthNames = this._dateAdapter.getMonthNames('short');
            // First row of months only contains 5 elements so we can fit the year label on the same row.
            this._months = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11]].map((/**
             * @param {?} row
             * @return {?}
             */
            function (row) {
                return row.map((/**
                 * @param {?} month
                 * @return {?}
                 */
                function (month) { return _this._createCellForMonth(month, monthNames[month]); }));
            }));
            this._changeDetectorRef.markForCheck();
        };
        /**
         * Gets the month in this year that the given Date falls on.
         * Returns null if the given Date is in another year.
         */
        /**
         * Gets the month in this year that the given Date falls on.
         * Returns null if the given Date is in another year.
         * @private
         * @param {?} date
         * @return {?}
         */
        MatYearView.prototype._getMonthInCurrentYear = /**
         * Gets the month in this year that the given Date falls on.
         * Returns null if the given Date is in another year.
         * @private
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return date && this._dateAdapter.getYear(date) === this._dateAdapter.getYear(this.activeDate)
                ? this._dateAdapter.getMonth(date)
                : null;
        };
        /** Creates an MatCalendarCell for the given month. */
        /**
         * Creates an MatCalendarCell for the given month.
         * @private
         * @param {?} month
         * @param {?} monthName
         * @return {?}
         */
        MatYearView.prototype._createCellForMonth = /**
         * Creates an MatCalendarCell for the given month.
         * @private
         * @param {?} month
         * @param {?} monthName
         * @return {?}
         */
        function (month, monthName) {
            /** @type {?} */
            var ariaLabel = this._dateAdapter.format(this._dateAdapter.createDate(this._dateAdapter.getYear(this.activeDate), month, 1), this._dateFormats.display.monthYearA11yLabel);
            return new MatCalendarCell(month, monthName.toLocaleUpperCase(), ariaLabel, this._shouldEnableMonth(month));
        };
        /** Whether the given month is enabled. */
        /**
         * Whether the given month is enabled.
         * @private
         * @param {?} month
         * @return {?}
         */
        MatYearView.prototype._shouldEnableMonth = /**
         * Whether the given month is enabled.
         * @private
         * @param {?} month
         * @return {?}
         */
        function (month) {
            /** @type {?} */
            var activeYear = this._dateAdapter.getYear(this.activeDate);
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
            var firstOfMonth = this._dateAdapter.createDate(activeYear, month, 1);
            // If any date in the month is enabled count the month as enabled.
            for (var d = firstOfMonth; this._dateAdapter.getMonth(d) == month; d = this._dateAdapter.addCalendarDays(d, 1)) {
                if (this.dateFilter(d, 'day')) {
                    return true;
                }
            }
            return false;
        };
        /**
         * Tests whether the combination month/year is after this.maxDate, considering
         * just the month and year of this.maxDate
         */
        /**
         * Tests whether the combination month/year is after this.maxDate, considering
         * just the month and year of this.maxDate
         * @private
         * @param {?} year
         * @param {?} month
         * @return {?}
         */
        MatYearView.prototype._isYearAndMonthAfterMaxDate = /**
         * Tests whether the combination month/year is after this.maxDate, considering
         * just the month and year of this.maxDate
         * @private
         * @param {?} year
         * @param {?} month
         * @return {?}
         */
        function (year, month) {
            if (this.maxDate) {
                /** @type {?} */
                var maxYear = this._dateAdapter.getYear(this.maxDate);
                /** @type {?} */
                var maxMonth = this._dateAdapter.getMonth(this.maxDate);
                return year > maxYear || (year === maxYear && month > maxMonth);
            }
            return false;
        };
        /**
         * Tests whether the combination month/year is before this.minDate, considering
         * just the month and year of this.minDate
         */
        /**
         * Tests whether the combination month/year is before this.minDate, considering
         * just the month and year of this.minDate
         * @private
         * @param {?} year
         * @param {?} month
         * @return {?}
         */
        MatYearView.prototype._isYearAndMonthBeforeMinDate = /**
         * Tests whether the combination month/year is before this.minDate, considering
         * just the month and year of this.minDate
         * @private
         * @param {?} year
         * @param {?} month
         * @return {?}
         */
        function (year, month) {
            if (this.minDate) {
                /** @type {?} */
                var minYear = this._dateAdapter.getYear(this.minDate);
                /** @type {?} */
                var minMonth = this._dateAdapter.getMonth(this.minDate);
                return year < minYear || (year === minYear && month < minMonth);
            }
        };
        /** Handles keydown events on the calendar body when calendar is in year view. */
        /**
         * Handles keydown events on the calendar body when calendar is in year view.
         * @param {?} event
         * @return {?}
         */
        MatYearView.prototype._handleCalendarBodyKeydown = /**
         * Handles keydown events on the calendar body when calendar is in year view.
         * @param {?} event
         * @return {?}
         */
        function (event) {
            // TODO(mmalerba): We currently allow keyboard navigation to disabled dates, but just prevent
            // disabled ones from being selected. This may not be ideal, we should look into whether
            // navigation should skip over disabled dates, and if so, how to implement that efficiently.
            // TODO(mmalerba): We currently allow keyboard navigation to disabled dates, but just prevent
            // disabled ones from being selected. This may not be ideal, we should look into whether
            // navigation should skip over disabled dates, and if so, how to implement that efficiently.
            /** @type {?} */
            var oldActiveDate = this._activeDate;
            /** @type {?} */
            var isRtl = this._isRtl();
            switch (event.keyCode) {
                case keycodes.LEFT_ARROW:
                    this.activeDate = this._dateAdapter.addCalendarMonths(this._activeDate, isRtl ? 1 : -1);
                    break;
                case keycodes.RIGHT_ARROW:
                    this.activeDate = this._dateAdapter.addCalendarMonths(this._activeDate, isRtl ? -1 : 1);
                    break;
                case keycodes.UP_ARROW:
                    this.activeDate = this._dateAdapter.addCalendarMonths(this._activeDate, -4);
                    break;
                case keycodes.DOWN_ARROW:
                    this.activeDate = this._dateAdapter.addCalendarMonths(this._activeDate, 4);
                    break;
                case keycodes.HOME:
                    this.activeDate = this._dateAdapter.addCalendarMonths(this._activeDate, this._dateAdapter.getMonth(this._activeDate));
                    break;
                case keycodes.END:
                    this.activeDate = this._dateAdapter.addCalendarMonths(this._activeDate, 11 - this._dateAdapter.getMonth(this._activeDate));
                    break;
                case keycodes.PAGE_UP:
                    this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, event.altKey ? -10 : -1);
                    break;
                case keycodes.PAGE_DOWN:
                    this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, event.altKey ? 10 : 1);
                    break;
                case keycodes.ENTER:
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
        };
        /**
         * @return {?}
         */
        MatYearView.prototype._focusActiveCell = /**
         * @return {?}
         */
        function () {
            this._matCalendarBody._focusActiveCell();
        };
        /**
         * @param obj The object to check.
         * @returns The given object if it is both a date instance and valid, otherwise null.
         */
        /**
         * @private
         * @param {?} obj The object to check.
         * @return {?} The given object if it is both a date instance and valid, otherwise null.
         */
        MatYearView.prototype._getValidDateOrNull = /**
         * @private
         * @param {?} obj The object to check.
         * @return {?} The given object if it is both a date instance and valid, otherwise null.
         */
        function (obj) {
            return this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj) ? obj : null;
        };
        /** Determines whether the user has the RTL layout direction. */
        /**
         * Determines whether the user has the RTL layout direction.
         * @private
         * @return {?}
         */
        MatYearView.prototype._isRtl = /**
         * Determines whether the user has the RTL layout direction.
         * @private
         * @return {?}
         */
        function () {
            return this._dir && this._dir.value === 'rtl';
        };
        MatYearView.decorators = [
            { type: core.Component, args: [{
                        selector: 'mat-year-view',
                        template: "<table class=\"mat-calendar-table\">\r\n  <tbody mat-calendar-body\r\n    [@slideCalendar]=\"animationDir\"\r\n    role=\"grid\"\r\n    allowDisabledSelection=\"true\"\r\n    [rows]=\"_months\"\r\n    [todayValue]=\"_todayMonth\"\r\n    [selectedValue]=\"_selectedMonth\"\r\n    [labelMinRequiredCells]=\"2\"\r\n    [numCols]=\"4\"\r\n    [cellAspectRatio]=\"4 / 7\"\r\n    [activeCell]=\"_dateAdapter.getMonth(activeDate)\"\r\n    (selectedValueChange)=\"_monthSelected($event)\"\r\n    (keydown)=\"_handleCalendarBodyKeydown($event)\">\r\n  </tbody>\r\n</table>\r\n",
                        exportAs: 'matYearView',
                        animations: [slideCalendar],
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        preserveWhitespaces: false
                    }] }
        ];
        /** @nocollapse */
        MatYearView.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [MAT_DATE_FORMATS,] }] },
            { type: DateAdapter, decorators: [{ type: core.Optional }] },
            { type: bidi.Directionality, decorators: [{ type: core.Optional }] }
        ]; };
        MatYearView.propDecorators = {
            activeDate: [{ type: core.Input }],
            selected: [{ type: core.Input }],
            minDate: [{ type: core.Input }],
            maxDate: [{ type: core.Input }],
            dateFilter: [{ type: core.Input }],
            animationDir: [{ type: core.Input }],
            selectedChange: [{ type: core.Output }],
            activeDateChange: [{ type: core.Output }],
            _matCalendarBody: [{ type: core.ViewChild, args: [MatCalendarBody,] }]
        };
        return MatYearView;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        MatYearView.prototype._activeDate;
        /**
         * @type {?}
         * @private
         */
        MatYearView.prototype._selected;
        /**
         * @type {?}
         * @private
         */
        MatYearView.prototype._minDate;
        /**
         * @type {?}
         * @private
         */
        MatYearView.prototype._maxDate;
        /**
         * A function used to filter which dates are selectable.
         * @type {?}
         */
        MatYearView.prototype.dateFilter;
        /**
         * Animations handler
         * @type {?}
         */
        MatYearView.prototype.animationDir;
        /**
         * Emits when a new month is selected.
         * @type {?}
         */
        MatYearView.prototype.selectedChange;
        /**
         * Emits when any date is activated.
         * @type {?}
         */
        MatYearView.prototype.activeDateChange;
        /**
         * The body of calendar table
         * @type {?}
         */
        MatYearView.prototype._matCalendarBody;
        /**
         * Grid of calendar cells representing the months of the year.
         * @type {?}
         */
        MatYearView.prototype._months;
        /**
         * The label for this year (e.g. "2017").
         * @type {?}
         */
        MatYearView.prototype._yearLabel;
        /**
         * The month in this year that today falls on. Null if today is in a different year.
         * @type {?}
         */
        MatYearView.prototype._todayMonth;
        /**
         * The month in this year that the selected Date falls on.
         * Null if the selected Date is in a different year.
         * @type {?}
         */
        MatYearView.prototype._selectedMonth;
        /**
         * @type {?}
         * @private
         */
        MatYearView.prototype._changeDetectorRef;
        /**
         * @type {?}
         * @private
         */
        MatYearView.prototype._dateFormats;
        /** @type {?} */
        MatYearView.prototype._dateAdapter;
        /**
         * @type {?}
         * @private
         */
        MatYearView.prototype._dir;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: years-view.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var YEAR_LINE_HEIGHT = 35;
    /**
     * An internal component used to display a year selector in the datepicker.
     * \@docs-private
     * @template D
     */
    var MatYearsView = /** @class */ (function () {
        function MatYearsView(_changeDetectorRef, element, _dateAdapter, _dateFormats) {
            this._changeDetectorRef = _changeDetectorRef;
            this.element = element;
            this._dateAdapter = _dateAdapter;
            this._dateFormats = _dateFormats;
            /**
             * Emits when a new month is selected.
             */
            this.selectedChange = new core.EventEmitter();
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
        Object.defineProperty(MatYearsView.prototype, "activeDate", {
            /** The date to display in this view (everything other than the year is ignored). */
            get: /**
             * The date to display in this view (everything other than the year is ignored).
             * @return {?}
             */
            function () {
                return this._activeDate;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                /** @type {?} */
                var oldActiveDate = this._activeDate;
                /** @type {?} */
                var validDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value)) || this._dateAdapter.today();
                this._activeDate = this._dateAdapter.clampDate(validDate, this.minDate, this.maxDate);
                if (oldActiveDate &&
                    this._dateAdapter.getYear(oldActiveDate) != this._dateAdapter.getYear(this._activeDate)) {
                    this._init();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatYearsView.prototype, "selected", {
            /** The currently selected date. */
            get: /**
             * The currently selected date.
             * @return {?}
             */
            function () {
                return this._selected;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._selected = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
                this._selectedYear = this._selected && this._dateAdapter.getYear(this._selected);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatYearsView.prototype, "minDate", {
            /** The minimum selectable date. */
            get: /**
             * The minimum selectable date.
             * @return {?}
             */
            function () {
                return this._minDate;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._minDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatYearsView.prototype, "maxDate", {
            /** The maximum selectable date. */
            get: /**
             * The maximum selectable date.
             * @return {?}
             */
            function () {
                return this._maxDate;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._maxDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        MatYearsView.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var lastPosition = { scrolled: 0 };
            this._disposeScroller = rxjs.fromEvent(this.element.nativeElement, 'scroll')
                .pipe(operators.sampleTime(300), operators.mergeMap((/**
             * @param {?} ev
             * @return {?}
             */
            function (ev) { return rxjs.of(_this._calculatePoints()); })))
                .subscribe((/**
             * @param {?} pos
             * @return {?}
             */
            function (pos) { return _this._handleScroll(pos, lastPosition); }));
            this._init();
        };
        /**
         * @return {?}
         */
        MatYearsView.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this._disposeScroller.unsubscribe();
        };
        /**
         * @param {?} value
         * @return {?}
         */
        MatYearsView.prototype.abs = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            return Math.abs(value);
        };
        /** Initializes this year view. */
        /**
         * Initializes this year view.
         * @return {?}
         */
        MatYearsView.prototype._init = /**
         * Initializes this year view.
         * @return {?}
         */
        function () {
            var _this = this;
            this._selectedYear = this._dateAdapter.getYear(this.selected ? this.selected : this.activeDate);
            /** @type {?} */
            var date = this._dateAdapter.createDate(this._selectedYear, this._dateAdapter.getMonth(this.activeDate), this._dateAdapter.getDate(this.activeDate), this._dateAdapter.getHours(this.activeDate), this._dateAdapter.getMinutes(this.activeDate));
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
            function () {
                _this.element.nativeElement.scrollTop -=
                    _this.element.nativeElement.offsetHeight / 2 - YEAR_LINE_HEIGHT / 2;
            }), 20);
        };
        /**
         * @param {?=} down
         * @return {?}
         */
        MatYearsView.prototype._populateYears = /**
         * @param {?=} down
         * @return {?}
         */
        function (down) {
            var _this = this;
            if (down === void 0) { down = false; }
            if ((!down && !this._years[0].enabled) ||
                (down && !this._years[this._years.length - 1].enabled)) {
                return;
            }
            /** @type {?} */
            var selectedMonth = this._dateAdapter.getMonth(this.activeDate);
            /** @type {?} */
            var selectedDay = this._dateAdapter.getDate(this.activeDate);
            /** @type {?} */
            var selectedHours = this._dateAdapter.getHours(this.activeDate);
            /** @type {?} */
            var selectedMinutes = this._dateAdapter.getMinutes(this.activeDate);
            /** @type {?} */
            var scroll = 0;
            for (var y = 1; y <= 10; y++) {
                /** @type {?} */
                var year = this._years[this._years.length - 1].value;
                /** @type {?} */
                var date = this._dateAdapter.createDate(year + 1, selectedMonth, selectedDay, selectedHours, selectedMinutes);
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
            function () {
                _this.element.nativeElement.scrollTop += down ? YEAR_LINE_HEIGHT : scroll;
            }), 10);
            this._changeDetectorRef.markForCheck();
        };
        /**
         * @param {?} year
         * @return {?}
         */
        MatYearsView.prototype._yearSelected = /**
         * @param {?} year
         * @return {?}
         */
        function (year) {
            /** @type {?} */
            var selectedMonth = this._dateAdapter.getMonth(this.activeDate);
            /** @type {?} */
            var selectedDay = this._dateAdapter.getDate(this.activeDate);
            /** @type {?} */
            var selectedHours = this._dateAdapter.getHours(this.activeDate);
            /** @type {?} */
            var selectedMinutes = this._dateAdapter.getMinutes(this.activeDate);
            this.selectedChange.emit(this._dateAdapter.createDate(year, selectedMonth, selectedDay, selectedHours, selectedMinutes));
        };
        /**
         * @return {?}
         */
        MatYearsView.prototype._calculatePoints = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var el = this.element.nativeElement;
            return {
                height: el.offsetHeight,
                scrolled: el.scrollTop,
                total: el.scrollHeight
            };
        };
        /**
         * @param {?} position
         * @param {?} lastPosition
         * @return {?}
         */
        MatYearsView.prototype._handleScroll = /**
         * @param {?} position
         * @param {?} lastPosition
         * @return {?}
         */
        function (position, lastPosition) {
            if (position.scrolled === 0 && lastPosition.scrolled > 0) {
                this._populateYears(false);
            }
            else if (position.height + position.scrolled === position.total) {
                this._populateYears(true);
            }
            lastPosition.scrolled = position.scrolled;
        };
        /** Handles keydown events on the calendar body when calendar is in multi-year view. */
        /**
         * Handles keydown events on the calendar body when calendar is in multi-year view.
         * @param {?} event
         * @return {?}
         */
        MatYearsView.prototype._handleCalendarBodyKeydown = /**
         * Handles keydown events on the calendar body when calendar is in multi-year view.
         * @param {?} event
         * @return {?}
         */
        function (event) {
            // TODO handle @angular/cdk/keycode
            switch (event.keyCode) {
                case keycodes.UP_ARROW:
                    this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, -1);
                    break;
                case keycodes.DOWN_ARROW:
                    this.activeDate = this._dateAdapter.addCalendarYears(this._activeDate, 1);
                    break;
                case keycodes.ENTER:
                    this._yearSelected(this._dateAdapter.getYear(this._activeDate));
                    break;
                default:
                    // Don't prevent default or focus active cell on keys that we don't explicitly handle.
                    return;
            }
            this._focusActiveCell();
            // Prevent unexpected default actions such as form submission.
            event.preventDefault();
        };
        /**
         * @return {?}
         */
        MatYearsView.prototype._focusActiveCell = /**
         * @return {?}
         */
        function () { };
        /**
         * @param obj The object to check.
         * @returns The given object if it is both a date instance and valid, otherwise null.
         */
        /**
         * @private
         * @param {?} obj The object to check.
         * @return {?} The given object if it is both a date instance and valid, otherwise null.
         */
        MatYearsView.prototype._getValidDateOrNull = /**
         * @private
         * @param {?} obj The object to check.
         * @return {?} The given object if it is both a date instance and valid, otherwise null.
         */
        function (obj) {
            return this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj) ? obj : null;
        };
        MatYearsView.decorators = [
            { type: core.Component, args: [{
                        selector: 'mat-years-view',
                        template: "<div class=\"mat-calendar-years\" (keydown)=\"_handleCalendarBodyKeydown($event)\">\r\n  <span *ngFor=\"let year of _years\"\r\n  [class]=\"'mat-calendar-years-item mat-calendar-years-item-diff' + abs(year.value - _selectedYear)\"\r\n  [class.mat-calendar-years-item-active]=\"year.value === _selectedYear\"\r\n  [class.mat-calendar-years-item-disabled]=\"!year.enabled\"\r\n  (click)=\"year.enabled ? _yearSelected(year.value) : null\">\r\n    {{ year.value }}\r\n  </span>\r\n</div>\r\n",
                        exportAs: 'matYearsView',
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        preserveWhitespaces: false
                    }] }
        ];
        /** @nocollapse */
        MatYearsView.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: DateAdapter, decorators: [{ type: core.Optional }] },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [MAT_DATE_FORMATS,] }] }
        ]; };
        MatYearsView.propDecorators = {
            activeDate: [{ type: core.Input }],
            selected: [{ type: core.Input }],
            minDate: [{ type: core.Input }],
            maxDate: [{ type: core.Input }],
            dateFilter: [{ type: core.Input }],
            selectedChange: [{ type: core.Output }]
        };
        return MatYearsView;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        MatYearsView.prototype._activeDate;
        /**
         * @type {?}
         * @private
         */
        MatYearsView.prototype._selected;
        /**
         * @type {?}
         * @private
         */
        MatYearsView.prototype._minDate;
        /**
         * @type {?}
         * @private
         */
        MatYearsView.prototype._maxDate;
        /**
         * A function used to filter which dates are selectable.
         * @type {?}
         */
        MatYearsView.prototype.dateFilter;
        /**
         * Emits when a new month is selected.
         * @type {?}
         */
        MatYearsView.prototype.selectedChange;
        /**
         * List of years.
         * @type {?}
         */
        MatYearsView.prototype._years;
        /**
         * The selected year.
         * @type {?}
         */
        MatYearsView.prototype._selectedYear;
        /**
         * Scroller subscription.
         * @type {?}
         */
        MatYearsView.prototype._disposeScroller;
        /**
         * @type {?}
         * @private
         */
        MatYearsView.prototype._changeDetectorRef;
        /**
         * @type {?}
         * @private
         */
        MatYearsView.prototype.element;
        /** @type {?} */
        MatYearsView.prototype._dateAdapter;
        /**
         * @type {?}
         * @private
         */
        MatYearsView.prototype._dateFormats;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: calendar.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * A calendar that is used as part of the datepicker.
     * \@docs-private
     * @template D
     */
    var MatCalendar = /** @class */ (function () {
        function MatCalendar(_intl, _dateAdapter, _dateFormats, changeDetectorRef) {
            var _this = this;
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
            this.selectedChange = new core.EventEmitter();
            /**
             * Emits when any date is selected.
             */
            this._userSelection = new core.EventEmitter();
            /**
             * Date filter for the month and year views.
             */
            this._dateFilterForViews = (/**
             * @param {?} date
             * @param {?=} unit
             * @return {?}
             */
            function (date, unit) {
                if (unit === void 0) { unit = 'minute'; }
                return (!!date &&
                    (!_this.dateFilter || _this.dateFilter(date)) &&
                    (!_this.minDate || _this._dateAdapter.compareDate(date, _this.minDate, unit) >= 0) &&
                    (!_this.maxDate || _this._dateAdapter.compareDate(date, _this.maxDate, unit) <= 0));
            });
            /**
             * Emits whenever there is a state change that the header may need to respond to.
             */
            this.stateChanges = new rxjs.Subject();
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
            function () {
                changeDetectorRef.markForCheck();
                _this.stateChanges.next();
            }));
        }
        Object.defineProperty(MatCalendar.prototype, "startAt", {
            /** A date representing the period (month or year) to start the calendar in. */
            get: /**
             * A date representing the period (month or year) to start the calendar in.
             * @return {?}
             */
            function () {
                return this._startAt;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._startAt = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatCalendar.prototype, "selected", {
            /** The currently selected date. */
            get: /**
             * The currently selected date.
             * @return {?}
             */
            function () {
                return this._selected;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._selected = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
                this.activeDate = this._selected;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatCalendar.prototype, "minDate", {
            /** The minimum selectable date. */
            get: /**
             * The minimum selectable date.
             * @return {?}
             */
            function () {
                return this._minDate;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._minDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatCalendar.prototype, "maxDate", {
            /** The maximum selectable date. */
            get: /**
             * The maximum selectable date.
             * @return {?}
             */
            function () {
                return this._maxDate;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._maxDate = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatCalendar.prototype, "activeDate", {
            /**
             * The current active date. This determines which time period is shown and which date is
             * highlighted when using keyboard navigation.
             */
            get: /**
             * The current active date. This determines which time period is shown and which date is
             * highlighted when using keyboard navigation.
             * @return {?}
             */
            function () {
                return this._clampedActiveDate;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                /** @type {?} */
                var oldActiveDate = this._clampedActiveDate;
                this._clampedActiveDate = this._dateAdapter.clampDate(value, this.minDate, this.maxDate);
                this._isAm = this._dateAdapter.getHours(this._clampedActiveDate) < 12;
                /** @type {?} */
                var unit = this.view === 'year' ? 'year' : 'month';
                /** @type {?} */
                var diff = this._dateAdapter.compareDate(oldActiveDate, this._clampedActiveDate, unit);
                if (diff) {
                    this._animationDir = diff > 0 ? 'left' : 'right';
                }
                // update the labels
                /** @type {?} */
                var day = this._dateAdapter.getDayOfWeek(this.activeDate);
                /** @type {?} */
                var hours = this._dateAdapter.getHours(this.activeDate);
                if (this.twelveHour) {
                    hours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
                }
                /** @type {?} */
                var minutes = this._dateAdapter.getMinutes(this.activeDate);
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
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatCalendar.prototype, "currentView", {
            /** Whether the calendar is in month view. */
            get: /**
             * Whether the calendar is in month view.
             * @return {?}
             */
            function () {
                return this._currentView;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._currentView = value;
                this._moveFocusOnNextTick = true;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        MatCalendar.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            this.activeDate = this.startAt || this._dateAdapter.today();
            this.changeView(this.startView, false);
        };
        /**
         * @return {?}
         */
        MatCalendar.prototype.ngAfterViewChecked = /**
         * @return {?}
         */
        function () {
            if (this._moveFocusOnNextTick) {
                this._moveFocusOnNextTick = false;
                this.focusActiveCell();
            }
        };
        /**
         * @return {?}
         */
        MatCalendar.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this._intlChanges.unsubscribe();
            this.stateChanges.complete();
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        MatCalendar.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            this._hasTime = this.type.indexOf('time') >= 0;
            /** @type {?} */
            var change = changes.selected || changes.minDate || changes.maxDate || changes.dateFilter;
            if (change && !change.firstChange) {
                /** @type {?} */
                var view = this._getCurrentViewComponent();
                if (view) {
                    view._init();
                }
            }
            this.stateChanges.next();
        };
        /**
         * @param {?} view
         * @param {?=} focus
         * @return {?}
         */
        MatCalendar.prototype.changeView = /**
         * @param {?} view
         * @param {?=} focus
         * @return {?}
         */
        function (view, focus) {
            if (focus === void 0) { focus = true; }
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
        };
        /**
         * @return {?}
         */
        MatCalendar.prototype.focusActiveCell = /**
         * @return {?}
         */
        function () {
            this._getCurrentViewComponent()._focusActiveCell();
        };
        /**
         * @return {?}
         */
        MatCalendar.prototype._submitClicked = /**
         * @return {?}
         */
        function () {
            this.selectedChange.emit(this.activeDate);
            this._userSelection.emit();
        };
        /**
         * @return {?}
         */
        MatCalendar.prototype._cancelClicked = /**
         * @return {?}
         */
        function () {
            this._userSelection.emit();
        };
        /** Handles date selection in the clock view. */
        /**
         * Handles date selection in the clock view.
         * @param {?} date
         * @return {?}
         */
        MatCalendar.prototype._timeChanged = /**
         * Handles date selection in the clock view.
         * @param {?} date
         * @return {?}
         */
        function (date) {
            this.selected = date;
        };
        /**
         * @param {?} date
         * @return {?}
         */
        MatCalendar.prototype._timeSelected = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            // if (this.autoOk && this.type === 'time') {
            //   this.selectedChange.emit(date);
            //   this._userSelection.emit();
            // }
            this.selected = date;
        };
        /** Handles date selection in the month view. */
        /**
         * Handles date selection in the month view.
         * @param {?} date
         * @return {?}
         */
        MatCalendar.prototype._dateSelected = /**
         * Handles date selection in the month view.
         * @param {?} date
         * @return {?}
         */
        function (date) {
            this.selected = date;
            if (this._hasTime) {
                this.changeView('clock');
            }
        };
        /** Handles month selection in the year view. */
        /**
         * Handles month selection in the year view.
         * @param {?} month
         * @return {?}
         */
        MatCalendar.prototype._monthSelected = /**
         * Handles month selection in the year view.
         * @param {?} month
         * @return {?}
         */
        function (month) {
            this.selected = month;
            this.changeView('month');
        };
        /**
         * @param {?} year
         * @return {?}
         */
        MatCalendar.prototype._yearSelected = /**
         * @param {?} year
         * @return {?}
         */
        function (year) {
            this.selected = year;
            this.changeView('year');
        };
        /** Handles user clicks on the period label. */
        /**
         * Handles user clicks on the period label.
         * @return {?}
         */
        MatCalendar.prototype._currentPeriodClicked = /**
         * Handles user clicks on the period label.
         * @return {?}
         */
        function () {
            this.changeView(this.view === 'month' ? 'year' : 'years');
        };
        /** Handles user clicks on the previous button. */
        /**
         * Handles user clicks on the previous button.
         * @return {?}
         */
        MatCalendar.prototype._previousClicked = /**
         * Handles user clicks on the previous button.
         * @return {?}
         */
        function () {
            this._navCalendar(-1);
        };
        /** Handles user clicks on the next button. */
        /**
         * Handles user clicks on the next button.
         * @return {?}
         */
        MatCalendar.prototype._nextClicked = /**
         * Handles user clicks on the next button.
         * @return {?}
         */
        function () {
            this._navCalendar(1);
        };
        /** Handles user clicks on the time labels. */
        /**
         * Handles user clicks on the time labels.
         * @return {?}
         */
        MatCalendar.prototype._showHourView = /**
         * Handles user clicks on the time labels.
         * @return {?}
         */
        function () {
            if (this._hasTime) {
                this._hourView = true;
                this.changeView('clock');
            }
        };
        /**
         * @return {?}
         */
        MatCalendar.prototype._showMinuteView = /**
         * @return {?}
         */
        function () {
            this._hourView = false;
            this.changeView('clock');
        };
        /**
         * @param {?} am
         * @return {?}
         */
        MatCalendar.prototype._toggleAmPm = /**
         * @param {?} am
         * @return {?}
         */
        function (am) {
            this._isAm = !this._isAm;
            /** @type {?} */
            var date = this._dateAdapter.addCalendarHours(this.activeDate, this._isAm ? -12 : 12);
            if (this._dateFilterForViews(date, 'minute')) {
                this.selected = date;
            }
            // if (this._isAm !== am) {
            //   const date = this._dateAdapter.addCalendarHours(this.activeDate, this._isAm ? 12 : -12);
            //   if (this._dateFilterForViews(date, 'minute')) {
            //     this.selected = date;
            //   }
            // }
        };
        /** Whether the previous period button is enabled. */
        /**
         * Whether the previous period button is enabled.
         * @return {?}
         */
        MatCalendar.prototype._previousEnabled = /**
         * Whether the previous period button is enabled.
         * @return {?}
         */
        function () {
            if (!this.minDate) {
                return true;
            }
            return !this.minDate || !this._isSameView(this.activeDate, this.minDate);
        };
        /** Whether the next period button is enabled. */
        /**
         * Whether the next period button is enabled.
         * @return {?}
         */
        MatCalendar.prototype._nextEnabled = /**
         * Whether the next period button is enabled.
         * @return {?}
         */
        function () {
            return !this.maxDate || !this._isSameView(this.activeDate, this.maxDate);
        };
        /** Handles calendar diffs. */
        /**
         * Handles calendar diffs.
         * @param {?} diff
         * @return {?}
         */
        MatCalendar.prototype._navCalendar = /**
         * Handles calendar diffs.
         * @param {?} diff
         * @return {?}
         */
        function (diff) {
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
        };
        /** Whether the two dates represent the same view in the current view mode (month or year). */
        /**
         * Whether the two dates represent the same view in the current view mode (month or year).
         * @private
         * @param {?} date1
         * @param {?} date2
         * @return {?}
         */
        MatCalendar.prototype._isSameView = /**
         * Whether the two dates represent the same view in the current view mode (month or year).
         * @private
         * @param {?} date1
         * @param {?} date2
         * @return {?}
         */
        function (date1, date2) {
            switch (this.view) {
                case 'year':
                    return this._dateAdapter.getYear(date1) === this._dateAdapter.getYear(date2);
                case 'month':
                    /** @type {?} */
                    var monthYear = this._dateFormats.display.monthYearLabel;
                    return this._dateAdapter.format(date1, monthYear) === this._dateAdapter.format(date2, monthYear);
                case 'clock':
                    /** @type {?} */
                    var hourMinute = this._dateFormats.display.timeLabel;
                    return this._dateAdapter.format(date1, hourMinute) === this._dateAdapter.format(date2, hourMinute);
            }
        };
        /**
         * @param obj The object to check.
         * @returns The given object if it is both a date instance and valid, otherwise null.
         */
        /**
         * @private
         * @param {?} obj The object to check.
         * @return {?} The given object if it is both a date instance and valid, otherwise null.
         */
        MatCalendar.prototype._getValidDateOrNull = /**
         * @private
         * @param {?} obj The object to check.
         * @return {?} The given object if it is both a date instance and valid, otherwise null.
         */
        function (obj) {
            return this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj) ? obj : null;
        };
        /** Returns the component instance that corresponds to the current calendar view. */
        /**
         * Returns the component instance that corresponds to the current calendar view.
         * @private
         * @return {?}
         */
        MatCalendar.prototype._getCurrentViewComponent = /**
         * Returns the component instance that corresponds to the current calendar view.
         * @private
         * @return {?}
         */
        function () {
            return this.clockView || this.monthView || this.yearView || this.yearsView;
        };
        MatCalendar.decorators = [
            { type: core.Component, args: [{
                        selector: 'mat-calendar',
                        template: "<div [class]=\"'mat-calendar-header mat-calendar-type-' + type\">\r\n\r\n  <div class=\"mat-calendar-header-date\">\r\n    <button mat-button class=\"mat-calendar-header-date-year mat-calendar-control\"\r\n    [class.mat-calendar-control-active]=\"view == 'years'\"\r\n    [@controlActive]=\"view == 'years' ? 'active' : ''\"\r\n    [attr.aria-label]=\"_intl.switchToYearViewLabel\"\r\n    (click)=\"changeView('years')\">\r\n      {{ _yearButtonText }}\r\n    </button>\r\n\r\n    <button mat-button class=\"mat-calendar-header-date-month mat-calendar-control\"\r\n    [class.mat-calendar-control-active]=\"view == 'month' || view == 'year'\"\r\n    [@controlActive]=\"view == 'month' || view == 'year' ? 'active' : ''\"\r\n    [attr.aria-label]=\"_intl.switchToMonthViewLabel\"\r\n    (click)=\"changeView('month')\">\r\n      <span class=\"mat-calendar-header-date-dayname\">{{ _dayButtonText }} </span>\r\n      <span class=\"mat-calendar-header-date-monthday\">{{ _monthdayButtonText }}</span>\r\n    </button>\r\n  </div>\r\n\r\n  <div class=\"mat-calendar-header-time\">\r\n    <div class=\"mat-calendar-header-time-hour\">\r\n        <button class=\"mat-calendar-control\"\r\n        [class.mat-calendar-control-active]=\"view == 'clock' && _hourView\"\r\n        [@controlActive]=\"view == 'clock' && _hourView ? 'active' : ''\"\r\n        [attr.aria-label]=\"_intl.switchToHourViewLabel\"\r\n        (click)=\"_showHourView()\">\r\n          {{ _hourButtonText }}\r\n        </button>\r\n        <span>:</span>\r\n        <button class=\"mat-calendar-control\"\r\n        [class.mat-calendar-control-active]=\"view == 'clock' && !_hourView\"\r\n        [@controlActive]=\"view == 'clock' && !_hourView ? 'active' : ''\"\r\n        [attr.aria-label]=\"_intl.switchToMinuteViewLabel\"\r\n        (click)=\"_showMinuteView()\">\r\n          {{ _minuteButtonText }}\r\n        </button>\r\n      <!-- <button class=\"mat-calendar-control\"\r\n      [class.mat-calendar-control-active]=\"view == 'clock' && _hourView\"\r\n      [@controlActive]=\"view == 'clock' && _hourView ? 'active' : ''\"\r\n      [attr.aria-label]=\"_intl.switchToHourViewLabel\"\r\n      (click)=\"_showHourView()\">\r\n        {{ _hourButtonText }}\r\n      </button>\r\n      <span>:</span>\r\n      <button class=\"mat-calendar-control\"\r\n      [class.mat-calendar-control-active]=\"view == 'clock' && !_hourView\"\r\n      [@controlActive]=\"view == 'clock' && !_hourView ? 'active' : ''\"\r\n      [attr.aria-label]=\"_intl.switchToMinuteViewLabel\"\r\n      (click)=\"_showMinuteView()\">\r\n        {{ _minuteButtonText }}\r\n      </button> -->\r\n    </div>\r\n    <div class=\"mat-calendar-header-time-ampm\" *ngIf=\"twelveHour\">\r\n      <button class=\"mat-calendar-control\"\r\n      [class.mat-calendar-control-active]=\"view == 'clock'\"\r\n      [@controlActive]=\"view == 'clock' ? 'active' : ''\"\r\n      [attr.aria-label]=\"_intl.setToAMLabel\"\r\n      (click)=\"_toggleAmPm(true)\">\r\n        {{_isAm ? 'AM' : 'PM'}}\r\n      </button>\r\n      <!-- <button class=\"mat-calendar-control\"\r\n      [class.mat-calendar-control-active]=\"_isAm\"\r\n      [@controlActive]=\"_isAm ? 'active' : ''\"\r\n      [attr.aria-label]=\"_intl.setToAMLabel\"\r\n      (click)=\"_toggleAmPm(true)\">\r\n        AM\r\n      </button>\r\n      <button class=\"mat-calendar-control\"\r\n      [class.mat-calendar-control-active]=\"!_isAm\"\r\n      [@controlActive]=\"!_isAm ? 'active' : ''\"\r\n      [attr.aria-label]=\"_intl.setToPMLabel\"\r\n      (click)=\"_toggleAmPm(false)\">\r\n        PM\r\n      </button>  -->\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div [class]=\"'mat-calendar-content mat-calendar-view-' + view\">\r\n\r\n  <div class=\"mat-calendar-heading\" *ngIf=\"view === 'month' || view === 'year'\">\r\n    <button mat-icon-button class=\"mat-calendar-previous-button\"\r\n      (click)=\"_previousClicked()\" [attr.disabled]=\"!_previousEnabled() ? '' : null\"\r\n      [attr.aria-label]=\"_prevButtonLabel\">\r\n    </button>\r\n\r\n    <button mat-button class=\"mat-calendar-heading-period mat-calendar-control mat-calendar-control-active\"\r\n    [@slideCalendar]=\"_animationDir\" (@slideCalendar.done)=\"_animationDir = ''\"\r\n    (click)=\"_currentPeriodClicked()\"\r\n    [attr.aria-label]=\"_periodButtonLabel\">\r\n      <strong>{{ _periodButtonText }}</strong>\r\n    </button>\r\n\r\n    <button mat-icon-button class=\"mat-calendar-next-button\"\r\n      (click)=\"_nextClicked()\" [attr.disabled]=\"!_nextEnabled() ? '' : null\"\r\n      [attr.aria-label]=\"_nextButtonLabel\">\r\n    </button>\r\n  </div>\r\n\r\n  <div class=\"mat-calendar-main\" [ngSwitch]=\"view\" cdkMonitorSubtreeFocus tabindex=\"-1\">\r\n\r\n    <mat-clock-view\r\n      *ngSwitchCase=\"'clock'\"\r\n      [(activeDate)]=\"activeDate\"\r\n      [selected]=\"selected\"\r\n      [dateFilter]=\"_dateFilterForViews\"\r\n      [clockStep]=\"clockStep\"\r\n      [twelveHour]=\"twelveHour\"\r\n      [hourView]=\"_hourView\"\r\n      (selectedTime)=\"_timeSelected($event)\"\r\n      (selectedChange)=\"_timeChanged($event)\"\r\n      (changeView)=\"_hourView = !_hourView\">\r\n    </mat-clock-view>\r\n\r\n    <mat-month-view\r\n      *ngSwitchCase=\"'month'\"\r\n      [(activeDate)]=\"activeDate\"\r\n      [selected]=\"selected\"\r\n      [dateFilter]=\"_dateFilterForViews\"\r\n      [maxDate]=\"maxDate\"\r\n      [minDate]=\"minDate\"\r\n      [animationDir]=\"_animationDir\"\r\n      (selectedChange)=\"_dateSelected($event)\"\r\n      (_userSelection)=\"_showHourView()\">\r\n    </mat-month-view>\r\n\r\n    <mat-year-view\r\n      *ngSwitchCase=\"'year'\"\r\n      [(activeDate)]=\"activeDate\"\r\n      [selected]=\"selected\"\r\n      [dateFilter]=\"_dateFilterForViews\"\r\n      [maxDate]=\"maxDate\"\r\n      [minDate]=\"minDate\"\r\n      [animationDir]=\"_animationDir\"\r\n      (selectedChange)=\"_monthSelected($event)\">\r\n    </mat-year-view>\r\n\r\n    <mat-years-view\r\n      *ngSwitchCase=\"'years'\"\r\n      [(activeDate)]=\"activeDate\"\r\n      [selected]=\"selected\"\r\n      [dateFilter]=\"_dateFilterForViews\"\r\n      [maxDate]=\"maxDate\"\r\n      [minDate]=\"minDate\"\r\n      (selectedChange)=\"_yearSelected($event)\">\r\n    </mat-years-view>\r\n  </div>\r\n\r\n  <div class=\"mat-calendar-footer\">\r\n    <button mat-button\r\n    (click)=\"_cancelClicked()\"\r\n    [attr.aria-label]=\"_intl.buttonCancelLabel\">\r\n      {{ _intl.buttonCancelText }}\r\n    </button>\r\n\r\n    <button mat-button\r\n    (click)=\"_submitClicked()\"\r\n    [attr.aria-label]=\"_intl.buttonSubmitLabel\">\r\n      {{ _intl.buttonSubmitText }}\r\n    </button>\r\n  </div>\r\n</div>\r\n",
                        // styleUrls: ['calendar.css'],
                        host: {
                            class: 'mat-calendar'
                        },
                        animations: [controlActive, slideCalendar],
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        preserveWhitespaces: false
                    }] }
        ];
        /** @nocollapse */
        MatCalendar.ctorParameters = function () { return [
            { type: MatDatepickerIntl },
            { type: DateAdapter, decorators: [{ type: core.Optional }] },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [MAT_DATE_FORMATS,] }] },
            { type: core.ChangeDetectorRef }
        ]; };
        MatCalendar.propDecorators = {
            startAt: [{ type: core.Input }],
            type: [{ type: core.Input }],
            startView: [{ type: core.Input }],
            selected: [{ type: core.Input }],
            minDate: [{ type: core.Input }],
            maxDate: [{ type: core.Input }],
            dateFilter: [{ type: core.Input }],
            clockStep: [{ type: core.Input }],
            twelveHour: [{ type: core.Input }],
            selectedChange: [{ type: core.Output }],
            _userSelection: [{ type: core.Output }],
            clockView: [{ type: core.ViewChild, args: [MatClockView,] }],
            monthView: [{ type: core.ViewChild, args: [MatMonthView,] }],
            yearView: [{ type: core.ViewChild, args: [MatYearView,] }],
            yearsView: [{ type: core.ViewChild, args: [MatYearsView,] }]
        };
        return MatCalendar;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        MatCalendar.prototype._intlChanges;
        /**
         * Used for scheduling that focus should be moved to the active cell on the next tick.
         * We need to schedule it, rather than do it immediately, because we have to wait
         * for Angular to re-evaluate the view children.
         * @type {?}
         * @private
         */
        MatCalendar.prototype._moveFocusOnNextTick;
        /**
         * @type {?}
         * @private
         */
        MatCalendar.prototype._startAt;
        /**
         * The type of value handled by the calendar.
         * @type {?}
         */
        MatCalendar.prototype.type;
        /**
         * Which view the calendar should be started in.
         * @type {?}
         */
        MatCalendar.prototype.startView;
        /**
         * Current calendar view
         * @type {?}
         */
        MatCalendar.prototype.view;
        /**
         * @type {?}
         * @private
         */
        MatCalendar.prototype._selected;
        /**
         * @type {?}
         * @private
         */
        MatCalendar.prototype._minDate;
        /**
         * @type {?}
         * @private
         */
        MatCalendar.prototype._maxDate;
        /**
         * A function used to filter which dates are selectable.
         * @type {?}
         */
        MatCalendar.prototype.dateFilter;
        /**
         * Clock interval
         * @type {?}
         */
        MatCalendar.prototype.clockStep;
        /**
         * Clock hour format
         * @type {?}
         */
        MatCalendar.prototype.twelveHour;
        /**
         * Emits when the currently selected date changes.
         * @type {?}
         */
        MatCalendar.prototype.selectedChange;
        /**
         * Emits when any date is selected.
         * @type {?}
         */
        MatCalendar.prototype._userSelection;
        /**
         * Reference to the current clock view component.
         * @type {?}
         */
        MatCalendar.prototype.clockView;
        /**
         * Reference to the current month view component.
         * @type {?}
         */
        MatCalendar.prototype.monthView;
        /**
         * Reference to the current year view component.
         * @type {?}
         */
        MatCalendar.prototype.yearView;
        /**
         * Reference to the current years view component.
         * @type {?}
         */
        MatCalendar.prototype.yearsView;
        /**
         * Date filter for the month and year views.
         * @type {?}
         */
        MatCalendar.prototype._dateFilterForViews;
        /**
         * @type {?}
         * @private
         */
        MatCalendar.prototype._clampedActiveDate;
        /**
         * @type {?}
         * @private
         */
        MatCalendar.prototype._currentView;
        /**
         * Emits whenever there is a state change that the header may need to respond to.
         * @type {?}
         */
        MatCalendar.prototype.stateChanges;
        /**
         * Animations handler
         * @type {?}
         */
        MatCalendar.prototype._animationDir;
        /**
         * Whether the active date is AM or not
         * @type {?}
         */
        MatCalendar.prototype._isAm;
        /**
         * Whether the calendar process the time.
         * @type {?}
         */
        MatCalendar.prototype._hasTime;
        /**
         * Whether the calendar is in hour view.
         * @type {?}
         */
        MatCalendar.prototype._hourView;
        /**
         * The label for the calendar header buttons.
         * @type {?}
         */
        MatCalendar.prototype._yearButtonText;
        /** @type {?} */
        MatCalendar.prototype._dayButtonText;
        /** @type {?} */
        MatCalendar.prototype._monthdayButtonText;
        /** @type {?} */
        MatCalendar.prototype._hourButtonText;
        /** @type {?} */
        MatCalendar.prototype._minuteButtonText;
        /**
         * The label for the current calendar view.
         * @type {?}
         */
        MatCalendar.prototype._periodButtonText;
        /** @type {?} */
        MatCalendar.prototype._periodButtonLabel;
        /**
         * The label for the the previous button.
         * @type {?}
         */
        MatCalendar.prototype._prevButtonLabel;
        /**
         * The label for the the next button.
         * @type {?}
         */
        MatCalendar.prototype._nextButtonLabel;
        /** @type {?} */
        MatCalendar.prototype._intl;
        /**
         * @type {?}
         * @private
         */
        MatCalendar.prototype._dateAdapter;
        /**
         * @type {?}
         * @private
         */
        MatCalendar.prototype._dateFormats;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: datepicker.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Used to generate a unique ID for each datepicker instance.
     * @type {?}
     */
    var datepickerUid = 0;
    /**
     * Injection token that determines the scroll handling while the calendar is open.
     * @type {?}
     */
    var MAT_DATEPICKER_SCROLL_STRATEGY = new core.InjectionToken('mat-datepicker-scroll-strategy');
    /**
     * \@docs-private
     * @param {?} overlay
     * @return {?}
     */
    function MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY(overlay) {
        return (/**
         * @return {?}
         */
        function () { return overlay.scrollStrategies.reposition(); });
    }
    /**
     * \@docs-private
     * @type {?}
     */
    var MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER = {
        provide: MAT_DATEPICKER_SCROLL_STRATEGY,
        deps: [overlay.Overlay],
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
    var MatDatepickerContent = /** @class */ (function () {
        function MatDatepickerContent() {
        }
        /**
         * @return {?}
         */
        MatDatepickerContent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            this._calendar.focusActiveCell();
        };
        /**
         * Handles keydown event on datepicker content.
         * @param event The event.
         */
        /**
         * Handles keydown event on datepicker content.
         * @param {?} event The event.
         * @return {?}
         */
        MatDatepickerContent.prototype._handleKeydown = /**
         * Handles keydown event on datepicker content.
         * @param {?} event The event.
         * @return {?}
         */
        function (event) {
            if (event.keyCode === keycodes.ESCAPE) {
                this.datepicker.close();
                event.preventDefault();
                event.stopPropagation();
            }
        };
        MatDatepickerContent.decorators = [
            { type: core.Component, args: [{
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
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        preserveWhitespaces: false
                    }] }
        ];
        MatDatepickerContent.propDecorators = {
            _calendar: [{ type: core.ViewChild, args: [MatCalendar,] }]
        };
        return MatDatepickerContent;
    }());
    if (false) {
        /**
         * Reference to the internal calendar component.
         * @type {?}
         */
        MatDatepickerContent.prototype._calendar;
        /**
         * Reference to the datepicker that created the overlay.
         * @type {?}
         */
        MatDatepickerContent.prototype.datepicker;
        /**
         * Whether the datepicker is above or below the input.
         * @type {?}
         */
        MatDatepickerContent.prototype._isAbove;
    }
    // TODO(mmalerba): We use a component instead of a directive here so the user can use implicit
    // template reference variables (e.g. #d vs #d="matDatepicker"). We can change this to a directive
    // if angular adds support for `exportAs: '$implicit'` on directives.
    /**
     * Component responsible for managing the datepicker popup/dialog.
     * @template D
     */
    var MatDatepicker = /** @class */ (function () {
        function MatDatepicker(_dialog, _overlay, _ngZone, _viewContainerRef, _scrollStrategy, _dateAdapter, _dir, _document) {
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
            this.openedStream = new core.EventEmitter();
            /**
             * Emits when the datepicker has been closed.
             */
            this.closedStream = new core.EventEmitter();
            this._opened = false;
            /**
             * The id for the datepicker calendar.
             */
            this.id = "mat-datepicker-" + datepickerUid++;
            this._validSelected = null;
            /**
             * The element that was focused before the datepicker was opened.
             */
            this._focusedElementBeforeOpen = null;
            /**
             * Subscription to value changes in the associated input element.
             */
            this._inputSubscription = rxjs.Subscription.EMPTY;
            /**
             * Emits when the datepicker is disabled.
             */
            this._disabledChange = new rxjs.Subject();
            /**
             * Emits new selected date when selected date changes.
             */
            this._selectedChanged = new rxjs.Subject();
            if (!this._dateAdapter) {
                throw createMissingDateImplError('DateAdapter');
            }
        }
        Object.defineProperty(MatDatepicker.prototype, "startAt", {
            /** The date to open the calendar to initially. */
            get: /**
             * The date to open the calendar to initially.
             * @return {?}
             */
            function () {
                // If an explicit startAt is set we start there, otherwise we start at whatever the currently
                // selected value is.
                return this._startAt || (this._datepickerInput ? this._datepickerInput.value : null);
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._startAt = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatDatepicker.prototype, "touchUi", {
            /**
             * Whether the calendar UI is in touch mode. In touch mode the calendar opens in a dialog rather
             * than a popup and elements have more padding to allow for bigger touch targets.
             */
            get: /**
             * Whether the calendar UI is in touch mode. In touch mode the calendar opens in a dialog rather
             * than a popup and elements have more padding to allow for bigger touch targets.
             * @return {?}
             */
            function () {
                return this._touchUi;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._touchUi = coercion.coerceBooleanProperty(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatDatepicker.prototype, "disabled", {
            /** Whether the datepicker pop-up should be disabled. */
            get: /**
             * Whether the datepicker pop-up should be disabled.
             * @return {?}
             */
            function () {
                return this._disabled === undefined && this._datepickerInput
                    ? this._datepickerInput.disabled
                    : !!this._disabled;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                /** @type {?} */
                var newValue = coercion.coerceBooleanProperty(value);
                if (newValue !== this._disabled) {
                    this._disabled = newValue;
                    this._disabledChange.next(newValue);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatDatepicker.prototype, "matDatepicker", {
            /** Whether the datepicker is connected to a date type one */
            set: /**
             * Whether the datepicker is connected to a date type one
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (value) {
                    this._datepicker = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatDatepicker.prototype, "opened", {
            /** Whether the calendar is open. */
            get: /**
             * Whether the calendar is open.
             * @return {?}
             */
            function () {
                return this._opened;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                value ? this.open() : this.close();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatDatepicker.prototype, "_selected", {
            /** The currently selected date. */
            get: /**
             * The currently selected date.
             * @return {?}
             */
            function () {
                return this._validSelected;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                /** @type {?} */
                var valid = this._dateAdapter.clampDate(value, this._minDate, this._maxDate);
                if (valid) {
                    // round the minutes
                    /** @type {?} */
                    var minutes = this._dateAdapter.getMinutes(valid);
                    minutes = Math.round(minutes / this.clockStep) * this.clockStep;
                    this._dateAdapter.setMinutes(valid, minutes);
                    this._dateAdapter.setSeconds(valid, 0);
                }
                this._validSelected = valid;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatDatepicker.prototype, "_minDate", {
            /** The minimum selectable date. */
            get: /**
             * The minimum selectable date.
             * @return {?}
             */
            function () {
                return this._datepickerInput && this._datepickerInput.min;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatDatepicker.prototype, "_maxDate", {
            /** The maximum selectable date. */
            get: /**
             * The maximum selectable date.
             * @return {?}
             */
            function () {
                return this._datepickerInput && this._datepickerInput.max;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatDatepicker.prototype, "_dateFilter", {
            get: /**
             * @return {?}
             */
            function () {
                return this._datepickerInput && this._datepickerInput._dateFilter;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        MatDatepicker.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
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
                function (date) {
                    /** @type {?} */
                    var value = _this._dateAdapter.createDate(_this._dateAdapter.getYear(date), _this._dateAdapter.getMonth(date), _this._dateAdapter.getDate(date), _this._selected ? _this._dateAdapter.getHours(_this._selected) : 0, _this._selected ? _this._dateAdapter.getMinutes(_this._selected) : 0);
                    // update the corresponding changes
                    _this._select(value);
                }));
            }
            // refresh the input
            this._datepickerInput.value = this._selected;
        };
        /**
         * @return {?}
         */
        MatDatepicker.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.close();
            this._inputSubscription.unsubscribe();
            this._selectedChanged.complete();
            this._disabledChange.complete();
            if (this._popupRef) {
                this._popupRef.dispose();
                this._popupComponentRef = null;
            }
        };
        /** Selects the given date */
        /**
         * Selects the given date
         * @param {?} date
         * @return {?}
         */
        MatDatepicker.prototype._select = /**
         * Selects the given date
         * @param {?} date
         * @return {?}
         */
        function (date) {
            /** @type {?} */
            var oldValue = this._selected;
            this._selected = date;
            /** @type {?} */
            var unit = this.type.indexOf('time') >= 0 ? 'minute' : 'day';
            if (!this._dateAdapter.sameDate(oldValue, this._selected, unit)) {
                this._selectedChanged.next(date);
            }
        };
        /**
         * Register an input with this datepicker.
         * @param input The datepicker input to register with this datepicker.
         */
        /**
         * Register an input with this datepicker.
         * @param {?} input The datepicker input to register with this datepicker.
         * @return {?}
         */
        MatDatepicker.prototype._registerInput = /**
         * Register an input with this datepicker.
         * @param {?} input The datepicker input to register with this datepicker.
         * @return {?}
         */
        function (input) {
            var _this = this;
            if (this._datepickerInput) {
                throw Error('A MatDatepicker can only be associated with a single input.');
            }
            this._datepickerInput = input;
            this._inputSubscription = this._datepickerInput._valueChange.subscribe((/**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                return (_this._selected =
                    value && _this._dateAdapter.isDateInstance(value) ? _this._dateAdapter.clone(value) : null);
            }));
        };
        /** Open the calendar. */
        /**
         * Open the calendar.
         * @return {?}
         */
        MatDatepicker.prototype.open = /**
         * Open the calendar.
         * @return {?}
         */
        function () {
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
        };
        /**
         * @param {?=} value
         * @return {?}
         */
        MatDatepicker.prototype.reset = /**
         * @param {?=} value
         * @return {?}
         */
        function (value) {
            this._datepickerInput.reset(value);
        };
        /** Close the calendar. */
        /**
         * Close the calendar.
         * @return {?}
         */
        MatDatepicker.prototype.close = /**
         * Close the calendar.
         * @return {?}
         */
        function () {
            var _this = this;
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
            var completeClose = (/**
             * @return {?}
             */
            function () {
                // The `_opened` could've been reset already if
                // we got two events in quick succession.
                if (_this._opened) {
                    _this._opened = false;
                    _this.closedStream.emit();
                    _this._focusedElementBeforeOpen = null;
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
        };
        /** Open the calendar as a dialog. */
        /**
         * Open the calendar as a dialog.
         * @private
         * @return {?}
         */
        MatDatepicker.prototype._openAsDialog = /**
         * Open the calendar as a dialog.
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            this._dialogRef = this._dialog.open(MatDatepickerContent, {
                direction: this._dir ? this._dir.value : 'ltr',
                viewContainerRef: this._viewContainerRef,
                panelClass: 'mat-datepicker-dialog'
            });
            this._dialogRef.afterClosed().subscribe((/**
             * @return {?}
             */
            function () { return _this.close(); }));
            this._dialogRef.componentInstance.datepicker = this;
        };
        /** Open the calendar as a popup. */
        /**
         * Open the calendar as a popup.
         * @private
         * @return {?}
         */
        MatDatepicker.prototype._openAsPopup = /**
         * Open the calendar as a popup.
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            if (!this._calendarPortal) {
                this._calendarPortal = new portal.ComponentPortal(MatDatepickerContent, this._viewContainerRef);
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
                    .pipe(operators.take(1))
                    .subscribe((/**
                 * @return {?}
                 */
                function () {
                    _this._popupRef.updatePosition();
                }));
            }
        };
        /** Create the popup. */
        /**
         * Create the popup.
         * @private
         * @return {?}
         */
        MatDatepicker.prototype._createPopup = /**
         * Create the popup.
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var overlayConfig = new overlay.OverlayConfig({
                positionStrategy: this._createPopupPositionStrategy(),
                hasBackdrop: true,
                backdropClass: 'mat-overlay-transparent-backdrop',
                direction: this._dir,
                scrollStrategy: this._scrollStrategy(),
                panelClass: 'mat-datepicker-popup'
            });
            this._popupRef = this._overlay.create(overlayConfig);
            rxjs.merge(this._popupRef.backdropClick(), this._popupRef.detachments(), this._popupRef.keydownEvents().pipe(operators.filter((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                // Closing on alt + up is only valid when there's an input associated with the datepicker.
                return (event.keyCode === keycodes.ESCAPE ||
                    (_this._datepickerInput && event.altKey && event.keyCode === keycodes.UP_ARROW));
            })))).subscribe((/**
             * @return {?}
             */
            function () { return _this.close(); }));
        };
        /** Create the popup PositionStrategy. */
        /**
         * Create the popup PositionStrategy.
         * @private
         * @return {?}
         */
        MatDatepicker.prototype._createPopupPositionStrategy = /**
         * Create the popup PositionStrategy.
         * @private
         * @return {?}
         */
        function () {
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
        };
        /**
         * @param obj The object to check.
         * @returns The given object if it is both a date instance and valid, otherwise null.
         */
        /**
         * @private
         * @param {?} obj The object to check.
         * @return {?} The given object if it is both a date instance and valid, otherwise null.
         */
        MatDatepicker.prototype._getValidDateOrNull = /**
         * @private
         * @param {?} obj The object to check.
         * @return {?} The given object if it is both a date instance and valid, otherwise null.
         */
        function (obj) {
            return this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj) ? obj : null;
        };
        MatDatepicker.decorators = [
            { type: core.Component, args: [{
                        selector: 'mat-datepicker',
                        template: '',
                        exportAs: 'matDatepicker',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        preserveWhitespaces: false
                    }] }
        ];
        /** @nocollapse */
        MatDatepicker.ctorParameters = function () { return [
            { type: dialog.MatDialog },
            { type: overlay.Overlay },
            { type: core.NgZone },
            { type: core.ViewContainerRef },
            { type: undefined, decorators: [{ type: core.Inject, args: [MAT_DATEPICKER_SCROLL_STRATEGY,] }] },
            { type: DateAdapter, decorators: [{ type: core.Optional }] },
            { type: bidi.Directionality, decorators: [{ type: core.Optional }] },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [common.DOCUMENT,] }] }
        ]; };
        MatDatepicker.propDecorators = {
            startAt: [{ type: core.Input }],
            type: [{ type: core.Input }],
            startView: [{ type: core.Input }],
            clockStep: [{ type: core.Input }],
            twelveHour: [{ type: core.Input }],
            touchUi: [{ type: core.Input }],
            disabled: [{ type: core.Input }],
            matDatepicker: [{ type: core.Input }],
            panelClass: [{ type: core.Input }],
            openedStream: [{ type: core.Output, args: ['opened',] }],
            closedStream: [{ type: core.Output, args: ['closed',] }],
            opened: [{ type: core.Input }]
        };
        return MatDatepicker;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        MatDatepicker.prototype._startAt;
        /**
         * The type of value handled by the calendar.
         * @type {?}
         */
        MatDatepicker.prototype.type;
        /**
         * Which view the calendar should be started in.
         * @type {?}
         */
        MatDatepicker.prototype.startView;
        /**
         * Clock interval
         * @type {?}
         */
        MatDatepicker.prototype.clockStep;
        /**
         * Clock hour format
         * @type {?}
         */
        MatDatepicker.prototype.twelveHour;
        /**
         * @type {?}
         * @private
         */
        MatDatepicker.prototype._touchUi;
        /**
         * @type {?}
         * @private
         */
        MatDatepicker.prototype._disabled;
        /** @type {?} */
        MatDatepicker.prototype._datepicker;
        /**
         * Classes to be passed to the date picker panel. Supports the same syntax as `ngClass`.
         * @type {?}
         */
        MatDatepicker.prototype.panelClass;
        /**
         * Emits when the datepicker has been opened.
         * @type {?}
         */
        MatDatepicker.prototype.openedStream;
        /**
         * Emits when the datepicker has been closed.
         * @type {?}
         */
        MatDatepicker.prototype.closedStream;
        /**
         * @type {?}
         * @private
         */
        MatDatepicker.prototype._opened;
        /**
         * The id for the datepicker calendar.
         * @type {?}
         */
        MatDatepicker.prototype.id;
        /**
         * @type {?}
         * @private
         */
        MatDatepicker.prototype._validSelected;
        /**
         * A reference to the overlay when the calendar is opened as a popup.
         * @type {?}
         */
        MatDatepicker.prototype._popupRef;
        /**
         * A reference to the dialog when the calendar is opened as a dialog.
         * @type {?}
         * @private
         */
        MatDatepicker.prototype._dialogRef;
        /**
         * A portal containing the calendar for this datepicker.
         * @type {?}
         * @private
         */
        MatDatepicker.prototype._calendarPortal;
        /**
         * Reference to the component instantiated in popup mode.
         * @type {?}
         * @private
         */
        MatDatepicker.prototype._popupComponentRef;
        /**
         * The element that was focused before the datepicker was opened.
         * @type {?}
         * @private
         */
        MatDatepicker.prototype._focusedElementBeforeOpen;
        /**
         * Subscription to value changes in the associated input element.
         * @type {?}
         * @private
         */
        MatDatepicker.prototype._inputSubscription;
        /**
         * The input element this datepicker is associated with.
         * @type {?}
         */
        MatDatepicker.prototype._datepickerInput;
        /**
         * Emits when the datepicker is disabled.
         * @type {?}
         */
        MatDatepicker.prototype._disabledChange;
        /**
         * Emits new selected date when selected date changes.
         * @type {?}
         */
        MatDatepicker.prototype._selectedChanged;
        /**
         * @type {?}
         * @private
         */
        MatDatepicker.prototype._dialog;
        /**
         * @type {?}
         * @private
         */
        MatDatepicker.prototype._overlay;
        /**
         * @type {?}
         * @private
         */
        MatDatepicker.prototype._ngZone;
        /**
         * @type {?}
         * @private
         */
        MatDatepicker.prototype._viewContainerRef;
        /**
         * @type {?}
         * @private
         */
        MatDatepicker.prototype._scrollStrategy;
        /** @type {?} */
        MatDatepicker.prototype._dateAdapter;
        /**
         * @type {?}
         * @private
         */
        MatDatepicker.prototype._dir;
        /**
         * @type {?}
         * @private
         */
        MatDatepicker.prototype._document;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: datepicker-input.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var MAT_DATEPICKER_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef((/**
         * @return {?}
         */
        function () { return MatDatepickerInput; })),
        multi: true
    };
    /** @type {?} */
    var MAT_DATEPICKER_VALIDATORS = {
        provide: forms.NG_VALIDATORS,
        useExisting: core.forwardRef((/**
         * @return {?}
         */
        function () { return MatDatepickerInput; })),
        multi: true
    };
    /**
     * An event used for datepicker input and change events. We don't always have access to a native
     * input or change event because the event may have been triggered by the user clicking on the
     * calendar popup. For consistency, we always use MatDatepickerInputEvent instead.
     * @template D
     */
    var   /**
     * An event used for datepicker input and change events. We don't always have access to a native
     * input or change event because the event may have been triggered by the user clicking on the
     * calendar popup. For consistency, we always use MatDatepickerInputEvent instead.
     * @template D
     */
    MatDatepickerInputEvent = /** @class */ (function () {
        function MatDatepickerInputEvent(target, targetElement) {
            this.target = target;
            this.targetElement = targetElement;
            this.value = this.target.value;
        }
        return MatDatepickerInputEvent;
    }());
    if (false) {
        /**
         * The new value for the target datepicker input.
         * @type {?}
         */
        MatDatepickerInputEvent.prototype.value;
        /**
         * Reference to the datepicker input component that emitted the event.
         * @type {?}
         */
        MatDatepickerInputEvent.prototype.target;
        /**
         * Reference to the native input element associated with the datepicker input.
         * @type {?}
         */
        MatDatepickerInputEvent.prototype.targetElement;
    }
    /**
     * Directive used to connect an input to a MatDatepicker.
     * @template D
     */
    var MatDatepickerInput = /** @class */ (function () {
        function MatDatepickerInput(_elementRef, _dateAdapter, _dateFormats, _formField) {
            var _this = this;
            this._elementRef = _elementRef;
            this._dateAdapter = _dateAdapter;
            this._dateFormats = _dateFormats;
            this._formField = _formField;
            /**
             * Emits when a `change` event is fired on this `<input>`.
             */
            this.dateChange = new core.EventEmitter();
            /**
             * Emits when an `input` event is fired on this `<input>`.
             */
            this.dateInput = new core.EventEmitter();
            /**
             * Emits when the value changes (either due to user input or programmatic change).
             */
            this._valueChange = new core.EventEmitter();
            /**
             * Emits when the disabled state has changed
             */
            this._disabledChange = new core.EventEmitter();
            this._onTouched = (/**
             * @return {?}
             */
            function () { });
            this._cvaOnChange = (/**
             * @return {?}
             */
            function () { });
            this._validatorOnChange = (/**
             * @return {?}
             */
            function () { });
            this._datepickerSubscription = rxjs.Subscription.EMPTY;
            this._localeSubscription = rxjs.Subscription.EMPTY;
            /**
             * The form control validator for whether the input parses.
             */
            this._parseValidator = (/**
             * @return {?}
             */
            function () {
                return _this._lastValueValid
                    ? null
                    : { matDatepickerParse: { text: _this._elementRef.nativeElement.value } };
            });
            /**
             * The form control validator for the min date.
             */
            this._minValidator = (/**
             * @param {?} control
             * @return {?}
             */
            function (control) {
                /** @type {?} */
                var controlValue = _this._getValidDateOrNull(_this._dateAdapter.deserialize(control.value));
                return !_this.min || !controlValue || _this._dateAdapter.compareDate(_this.min, controlValue) <= 0
                    ? null
                    : { matDatepickerMin: { min: _this.min, actual: controlValue } };
            });
            /**
             * The form control validator for the max date.
             */
            this._maxValidator = (/**
             * @param {?} control
             * @return {?}
             */
            function (control) {
                /** @type {?} */
                var controlValue = _this._getValidDateOrNull(_this._dateAdapter.deserialize(control.value));
                return !_this.max || !controlValue || _this._dateAdapter.compareDate(_this.max, controlValue) >= 0
                    ? null
                    : { matDatepickerMax: { max: _this.max, actual: controlValue } };
            });
            /**
             * The form control validator for the date filter.
             */
            this._filterValidator = (/**
             * @param {?} control
             * @return {?}
             */
            function (control) {
                /** @type {?} */
                var controlValue = _this._getValidDateOrNull(_this._dateAdapter.deserialize(control.value));
                return !_this._dateFilter || !controlValue || _this._dateFilter(controlValue)
                    ? null
                    : { matDatepickerFilter: true };
            });
            /**
             * The combined form control validator for this input.
             */
            this._validator = forms.Validators.compose([
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
        Object.defineProperty(MatDatepickerInput.prototype, "matDatepicker", {
            /** The datepicker that this input is associated with. */
            set: /**
             * The datepicker that this input is associated with.
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this.registerDatepicker(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         * @param {?} value
         * @return {?}
         */
        MatDatepickerInput.prototype.registerDatepicker = /**
         * @private
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this._datepicker = value;
                this._datepicker._registerInput(this);
            }
        };
        Object.defineProperty(MatDatepickerInput.prototype, "matDatepickerFilter", {
            /** Function that can be used to filter out dates within the datepicker. */
            set: /**
             * Function that can be used to filter out dates within the datepicker.
             * @param {?} filter
             * @return {?}
             */
            function (filter) {
                this._dateFilter = filter;
                this._validatorOnChange();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatDatepickerInput.prototype, "value", {
            /** The value of the input. */
            get: /**
             * The value of the input.
             * @return {?}
             */
            function () {
                return this._value;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                value = this._dateAdapter.deserialize(value);
                this._lastValueValid = !value || this._dateAdapter.isValid(value);
                value = this._getValidDateOrNull(value);
                /** @type {?} */
                var oldDate = this.value;
                this._value = value;
                this._formatValue(value);
                if (!this._dateAdapter.sameDate(oldDate, value)) {
                    this._valueChange.emit(value);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatDatepickerInput.prototype, "min", {
            /** The minimum valid date. */
            get: /**
             * The minimum valid date.
             * @return {?}
             */
            function () {
                return this._min;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._min = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
                this._validatorOnChange();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatDatepickerInput.prototype, "max", {
            /** The maximum valid date. */
            get: /**
             * The maximum valid date.
             * @return {?}
             */
            function () {
                return this._max;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._max = this._getValidDateOrNull(this._dateAdapter.deserialize(value));
                this._validatorOnChange();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MatDatepickerInput.prototype, "disabled", {
            /** Whether the datepicker-input is disabled. */
            get: /**
             * Whether the datepicker-input is disabled.
             * @return {?}
             */
            function () {
                return !!this._disabled;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                /** @type {?} */
                var newValue = coercion.coerceBooleanProperty(value);
                /** @type {?} */
                var element = this._elementRef.nativeElement;
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
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        MatDatepickerInput.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            // Update the displayed date when the locale changes.
            this._localeSubscription = this._dateAdapter.localeChanges.subscribe((/**
             * @return {?}
             */
            function () {
                _this.value = _this.value;
            }));
            if (this._datepicker) {
                this._datepickerSubscription = this._datepicker._selectedChanged.subscribe((/**
                 * @param {?} selected
                 * @return {?}
                 */
                function (selected) {
                    _this.value = selected;
                    _this._cvaOnChange(selected);
                    _this._onTouched();
                    _this.dateInput.emit(new MatDatepickerInputEvent(_this, _this._elementRef.nativeElement));
                    _this.dateChange.emit(new MatDatepickerInputEvent(_this, _this._elementRef.nativeElement));
                }));
            }
        };
        /**
         * @return {?}
         */
        MatDatepickerInput.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this._datepickerSubscription.unsubscribe();
            this._localeSubscription.unsubscribe();
            this._valueChange.complete();
            this._disabledChange.complete();
        };
        /**
         * @param {?=} value
         * @return {?}
         */
        MatDatepickerInput.prototype.reset = /**
         * @param {?=} value
         * @return {?}
         */
        function (value) {
            this.value = value !== undefined ? value : this._firstValue;
            this._cvaOnChange(this._value);
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        MatDatepickerInput.prototype.registerOnValidatorChange = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this._validatorOnChange = fn;
        };
        /**
         * @param {?} c
         * @return {?}
         */
        MatDatepickerInput.prototype.validate = /**
         * @param {?} c
         * @return {?}
         */
        function (c) {
            return this._validator ? this._validator(c) : null;
        };
        /**
         * @deprecated
         * @deletion-target 7.0.0 Use `getConnectedOverlayOrigin` instead
         */
        /**
         * @deprecated
         * \@deletion-target 7.0.0 Use `getConnectedOverlayOrigin` instead
         * @return {?}
         */
        MatDatepickerInput.prototype.getPopupConnectionElementRef = /**
         * @deprecated
         * \@deletion-target 7.0.0 Use `getConnectedOverlayOrigin` instead
         * @return {?}
         */
        function () {
            return this.getConnectedOverlayOrigin();
        };
        /**
         * Gets the element that the datepicker popup should be connected to.
         * @return The element to connect the popup to.
         */
        /**
         * Gets the element that the datepicker popup should be connected to.
         * @return {?} The element to connect the popup to.
         */
        MatDatepickerInput.prototype.getConnectedOverlayOrigin = /**
         * Gets the element that the datepicker popup should be connected to.
         * @return {?} The element to connect the popup to.
         */
        function () {
            return this._formField ? this._formField.getConnectedOverlayOrigin() : this._elementRef;
        };
        // Implemented as part of ControlValueAccessor
        // Implemented as part of ControlValueAccessor
        /**
         * @param {?} value
         * @return {?}
         */
        MatDatepickerInput.prototype.writeValue = 
        // Implemented as part of ControlValueAccessor
        /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this._firstValue === undefined) {
                this._firstValue = value;
            }
            this.value = value;
        };
        // Implemented as part of ControlValueAccessor
        // Implemented as part of ControlValueAccessor
        /**
         * @param {?} fn
         * @return {?}
         */
        MatDatepickerInput.prototype.registerOnChange = 
        // Implemented as part of ControlValueAccessor
        /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this._cvaOnChange = fn;
        };
        // Implemented as part of ControlValueAccessor
        // Implemented as part of ControlValueAccessor
        /**
         * @param {?} fn
         * @return {?}
         */
        MatDatepickerInput.prototype.registerOnTouched = 
        // Implemented as part of ControlValueAccessor
        /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this._onTouched = fn;
        };
        // Implemented as part of ControlValueAccessor
        // Implemented as part of ControlValueAccessor
        /**
         * @param {?} isDisabled
         * @return {?}
         */
        MatDatepickerInput.prototype.setDisabledState = 
        // Implemented as part of ControlValueAccessor
        /**
         * @param {?} isDisabled
         * @return {?}
         */
        function (isDisabled) {
            this.disabled = isDisabled;
        };
        /**
         * @param {?} event
         * @return {?}
         */
        MatDatepickerInput.prototype._onKeydown = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (event.altKey && event.keyCode === keycodes.DOWN_ARROW) {
                this._datepicker.open();
                event.preventDefault();
            }
        };
        /**
         * @param {?} value
         * @return {?}
         */
        MatDatepickerInput.prototype._onInput = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var type = this._datepicker.type;
            /** @type {?} */
            var date = this._dateAdapter.parse(value, this._dateFormats.parse[type]);
            this._lastValueValid = (!value && !date) || this._dateAdapter.isValid(date);
            date = this._getValidDateOrNull(date);
            if (!this._dateAdapter.sameDate(date, this._value)) {
                this._value = date;
                this._valueChange.emit(date);
                this.dateInput.emit(new MatDatepickerInputEvent(this, this._elementRef.nativeElement));
            }
            // update on every (input) change
            this._cvaOnChange(date);
        };
        /**
         * @return {?}
         */
        MatDatepickerInput.prototype._onChange = /**
         * @return {?}
         */
        function () {
            this.dateChange.emit(new MatDatepickerInputEvent(this, this._elementRef.nativeElement));
        };
        /** Handles blur events on the input. */
        /**
         * Handles blur events on the input.
         * @return {?}
         */
        MatDatepickerInput.prototype._onBlur = /**
         * Handles blur events on the input.
         * @return {?}
         */
        function () {
            // Reformat the input only if we have a valid value.
            if (this.value) {
                this._formatValue(this.value);
            }
            this._onTouched();
        };
        /** Formats a value and sets it on the input element. */
        /**
         * Formats a value and sets it on the input element.
         * @private
         * @param {?} value
         * @return {?}
         */
        MatDatepickerInput.prototype._formatValue = /**
         * Formats a value and sets it on the input element.
         * @private
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var type = this._datepicker.type;
            this._elementRef.nativeElement.value = value
                ? this._dateAdapter.format(value, this._dateFormats.display[type])
                : '';
        };
        /**
         * @param obj The object to check.
         * @returns The given object if it is both a date instance and valid, otherwise null.
         */
        /**
         * @private
         * @param {?} obj The object to check.
         * @return {?} The given object if it is both a date instance and valid, otherwise null.
         */
        MatDatepickerInput.prototype._getValidDateOrNull = /**
         * @private
         * @param {?} obj The object to check.
         * @return {?} The given object if it is both a date instance and valid, otherwise null.
         */
        function (obj) {
            return this._dateAdapter.isDateInstance(obj) && this._dateAdapter.isValid(obj) ? obj : null;
        };
        MatDatepickerInput.decorators = [
            { type: core.Directive, args: [{
                        selector: 'input[matDatepicker]',
                        providers: [
                            MAT_DATEPICKER_VALUE_ACCESSOR,
                            MAT_DATEPICKER_VALIDATORS,
                            { provide: input.MAT_INPUT_VALUE_ACCESSOR, useExisting: MatDatepickerInput }
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
        MatDatepickerInput.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: DateAdapter, decorators: [{ type: core.Optional }] },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [MAT_DATE_FORMATS,] }] },
            { type: formField.MatFormField, decorators: [{ type: core.Optional }] }
        ]; };
        MatDatepickerInput.propDecorators = {
            matDatepicker: [{ type: core.Input }],
            matDatepickerFilter: [{ type: core.Input }],
            value: [{ type: core.Input }],
            min: [{ type: core.Input }],
            max: [{ type: core.Input }],
            disabled: [{ type: core.Input }],
            dateChange: [{ type: core.Output }],
            dateInput: [{ type: core.Output }]
        };
        return MatDatepickerInput;
    }());
    if (false) {
        /** @type {?} */
        MatDatepickerInput.prototype._datepicker;
        /** @type {?} */
        MatDatepickerInput.prototype._dateFilter;
        /**
         * @type {?}
         * @private
         */
        MatDatepickerInput.prototype._value;
        /**
         * @type {?}
         * @private
         */
        MatDatepickerInput.prototype._firstValue;
        /**
         * @type {?}
         * @private
         */
        MatDatepickerInput.prototype._min;
        /**
         * @type {?}
         * @private
         */
        MatDatepickerInput.prototype._max;
        /**
         * @type {?}
         * @private
         */
        MatDatepickerInput.prototype._disabled;
        /**
         * Emits when a `change` event is fired on this `<input>`.
         * @type {?}
         */
        MatDatepickerInput.prototype.dateChange;
        /**
         * Emits when an `input` event is fired on this `<input>`.
         * @type {?}
         */
        MatDatepickerInput.prototype.dateInput;
        /**
         * Emits when the value changes (either due to user input or programmatic change).
         * @type {?}
         */
        MatDatepickerInput.prototype._valueChange;
        /**
         * Emits when the disabled state has changed
         * @type {?}
         */
        MatDatepickerInput.prototype._disabledChange;
        /** @type {?} */
        MatDatepickerInput.prototype._onTouched;
        /**
         * @type {?}
         * @private
         */
        MatDatepickerInput.prototype._cvaOnChange;
        /**
         * @type {?}
         * @private
         */
        MatDatepickerInput.prototype._validatorOnChange;
        /**
         * @type {?}
         * @private
         */
        MatDatepickerInput.prototype._datepickerSubscription;
        /**
         * @type {?}
         * @private
         */
        MatDatepickerInput.prototype._localeSubscription;
        /**
         * The form control validator for whether the input parses.
         * @type {?}
         * @private
         */
        MatDatepickerInput.prototype._parseValidator;
        /**
         * The form control validator for the min date.
         * @type {?}
         * @private
         */
        MatDatepickerInput.prototype._minValidator;
        /**
         * The form control validator for the max date.
         * @type {?}
         * @private
         */
        MatDatepickerInput.prototype._maxValidator;
        /**
         * The form control validator for the date filter.
         * @type {?}
         * @private
         */
        MatDatepickerInput.prototype._filterValidator;
        /**
         * The combined form control validator for this input.
         * @type {?}
         * @private
         */
        MatDatepickerInput.prototype._validator;
        /**
         * Whether the last value set on the input was valid.
         * @type {?}
         * @private
         */
        MatDatepickerInput.prototype._lastValueValid;
        /**
         * @type {?}
         * @private
         */
        MatDatepickerInput.prototype._elementRef;
        /** @type {?} */
        MatDatepickerInput.prototype._dateAdapter;
        /**
         * @type {?}
         * @private
         */
        MatDatepickerInput.prototype._dateFormats;
        /**
         * @type {?}
         * @private
         */
        MatDatepickerInput.prototype._formField;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: datepicker-toggle.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Can be used to override the icon of a `matDatepickerToggle`.
     */
    var MatDatepickerToggleIcon = /** @class */ (function () {
        function MatDatepickerToggleIcon() {
        }
        MatDatepickerToggleIcon.decorators = [
            { type: core.Directive, args: [{
                        selector: '[matDatepickerToggleIcon]'
                    },] }
        ];
        return MatDatepickerToggleIcon;
    }());
    /**
     * @template D
     */
    var MatDatepickerToggle = /** @class */ (function () {
        function MatDatepickerToggle(_intl, _changeDetectorRef) {
            this._intl = _intl;
            this._changeDetectorRef = _changeDetectorRef;
            this._stateChanges = rxjs.Subscription.EMPTY;
        }
        Object.defineProperty(MatDatepickerToggle.prototype, "disabled", {
            /** Whether the toggle button is disabled. */
            get: /**
             * Whether the toggle button is disabled.
             * @return {?}
             */
            function () {
                return this._disabled === undefined ? this.datepicker.disabled : !!this._disabled;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._disabled = coercion.coerceBooleanProperty(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} changes
         * @return {?}
         */
        MatDatepickerToggle.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            if (changes.datepicker) {
                this._watchStateChanges();
            }
        };
        /**
         * @return {?}
         */
        MatDatepickerToggle.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this._stateChanges.unsubscribe();
        };
        /**
         * @return {?}
         */
        MatDatepickerToggle.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            this._watchStateChanges();
        };
        /**
         * @param {?} event
         * @return {?}
         */
        MatDatepickerToggle.prototype._open = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (this.datepicker && !this.disabled) {
                this.datepicker.open();
                event.stopPropagation();
            }
        };
        /**
         * @private
         * @return {?}
         */
        MatDatepickerToggle.prototype._watchStateChanges = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var datepickerDisabled = this.datepicker ? this.datepicker._disabledChange : rxjs.of();
            /** @type {?} */
            var inputDisabled = this.datepicker && this.datepicker._datepickerInput
                ? this.datepicker._datepickerInput._disabledChange
                : rxjs.of();
            /** @type {?} */
            var datepickerToggled = this.datepicker
                ? rxjs.merge(this.datepicker.openedStream, this.datepicker.closedStream)
                : rxjs.of();
            this._stateChanges.unsubscribe();
            this._stateChanges = rxjs.merge(this._intl.changes, datepickerDisabled, inputDisabled, datepickerToggled).subscribe((/**
             * @return {?}
             */
            function () { return _this._changeDetectorRef.markForCheck(); }));
        };
        MatDatepickerToggle.decorators = [
            { type: core.Component, args: [{
                        selector: 'mat-datepicker-toggle',
                        template: "<button mat-icon-button type=\"button\" [attr.aria-label]=\"_intl.openCalendarLabel\"\r\n  [attr.disabled]=\"disabled ? '' : null\" (click)=\"_open($event)\">\r\n\r\n  <svg\r\n    *ngIf=\"!_customIcon\"\r\n    class=\"mat-datepicker-toggle-default-icon\"\r\n    viewBox=\"0 0 24 24\"\r\n    width=\"24px\"\r\n    height=\"24px\"\r\n    fill=\"currentColor\"\r\n    focusable=\"false\">\r\n    <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\r\n    <path d=\"M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z\"/>\r\n  </svg>\r\n\r\n  <ng-content select=\"[matDatepickerToggleIcon]\"></ng-content>\r\n</button>\r\n",
                        // styleUrls: ['datepicker-toggle.css'],
                        host: {
                            class: 'mat-datepicker-toggle',
                            '[class.mat-datepicker-toggle-active]': 'datepicker && datepicker.opened'
                        },
                        exportAs: 'matDatepickerToggle',
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        preserveWhitespaces: false
                    }] }
        ];
        /** @nocollapse */
        MatDatepickerToggle.ctorParameters = function () { return [
            { type: MatDatepickerIntl },
            { type: core.ChangeDetectorRef }
        ]; };
        MatDatepickerToggle.propDecorators = {
            datepicker: [{ type: core.Input, args: ['for',] }],
            disabled: [{ type: core.Input }],
            _customIcon: [{ type: core.ContentChild, args: [MatDatepickerToggleIcon,] }]
        };
        return MatDatepickerToggle;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        MatDatepickerToggle.prototype._stateChanges;
        /**
         * Datepicker instance that the button will toggle.
         * @type {?}
         */
        MatDatepickerToggle.prototype.datepicker;
        /**
         * @type {?}
         * @private
         */
        MatDatepickerToggle.prototype._disabled;
        /**
         * Custom icon set by the consumer.
         * @type {?}
         */
        MatDatepickerToggle.prototype._customIcon;
        /** @type {?} */
        MatDatepickerToggle.prototype._intl;
        /**
         * @type {?}
         * @private
         */
        MatDatepickerToggle.prototype._changeDetectorRef;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: datepicker-module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var MatDatepickerModule = /** @class */ (function () {
        function MatDatepickerModule() {
        }
        MatDatepickerModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            button.MatButtonModule,
                            dialog.MatDialogModule,
                            icon.MatIconModule,
                            overlay.OverlayModule,
                            a11y.A11yModule
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
        return MatDatepickerModule;
    }());

    exports.CLOCK_INNER_RADIUS = CLOCK_INNER_RADIUS;
    exports.CLOCK_OUTER_RADIUS = CLOCK_OUTER_RADIUS;
    exports.CLOCK_RADIUS = CLOCK_RADIUS;
    exports.CLOCK_TICK_RADIUS = CLOCK_TICK_RADIUS;
    exports.DateAdapter = DateAdapter;
    exports.MAT_DATEPICKER_SCROLL_STRATEGY = MAT_DATEPICKER_SCROLL_STRATEGY;
    exports.MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY = MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY;
    exports.MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER = MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER;
    exports.MAT_DATEPICKER_VALIDATORS = MAT_DATEPICKER_VALIDATORS;
    exports.MAT_DATEPICKER_VALUE_ACCESSOR = MAT_DATEPICKER_VALUE_ACCESSOR;
    exports.MAT_DATE_FORMATS = MAT_DATE_FORMATS;
    exports.MAT_DATE_LOCALE = MAT_DATE_LOCALE;
    exports.MAT_DATE_LOCALE_FACTORY = MAT_DATE_LOCALE_FACTORY;
    exports.MAT_DATE_LOCALE_PROVIDER = MAT_DATE_LOCALE_PROVIDER;
    exports.MAT_MOMENT_DATE_FORMATS = MAT_MOMENT_DATE_FORMATS;
    exports.MAT_NATIVE_DATE_FORMATS = MAT_NATIVE_DATE_FORMATS;
    exports.MatCalendar = MatCalendar;
    exports.MatCalendarBody = MatCalendarBody;
    exports.MatCalendarCell = MatCalendarCell;
    exports.MatClockView = MatClockView;
    exports.MatDatepicker = MatDatepicker;
    exports.MatDatepickerContent = MatDatepickerContent;
    exports.MatDatepickerInput = MatDatepickerInput;
    exports.MatDatepickerInputEvent = MatDatepickerInputEvent;
    exports.MatDatepickerIntl = MatDatepickerIntl;
    exports.MatDatepickerModule = MatDatepickerModule;
    exports.MatDatepickerToggle = MatDatepickerToggle;
    exports.MatDatepickerToggleIcon = MatDatepickerToggleIcon;
    exports.MatMomentDateModule = MatMomentDateModule;
    exports.MatMonthView = MatMonthView;
    exports.MatNativeDateModule = MatNativeDateModule;
    exports.MatYearView = MatYearView;
    exports.MatYearsView = MatYearsView;
    exports.MomentDateAdapter = MomentDateAdapter;
    exports.MomentDateModule = MomentDateModule;
    exports.NativeDateAdapter = NativeDateAdapter;
    exports.NativeDateModule = NativeDateModule;
    exports.ɵa = slideCalendar;
    exports.ɵb = controlActive;
    exports.ɵc = transformPanel;
    exports.ɵd = fadeInCalendar;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=martindalec-datepicker.umd.js.map
