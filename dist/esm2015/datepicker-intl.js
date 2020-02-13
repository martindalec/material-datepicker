/**
 * @fileoverview added by tsickle
 * Generated from: datepicker-intl.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * @record
 */
export function MatDatepickerIntlCatalog() { }
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
export class MatDatepickerIntl {
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
/** @nocollapse */ MatDatepickerIntl.ɵprov = i0.ɵɵdefineInjectable({ factory: function MatDatepickerIntl_Factory() { return new MatDatepickerIntl(); }, token: MatDatepickerIntl, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1pbnRsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG1hcnRpbmRhbGVjL2RhdGVwaWNrZXIvIiwic291cmNlcyI6WyJkYXRlcGlja2VyLWludGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7OztBQUUvQiw4Q0FrQkM7OztJQWpCQyxpREFBc0I7O0lBQ3RCLHFEQUEwQjs7SUFDMUIsa0RBQXVCOztJQUN2QixrREFBdUI7O0lBQ3ZCLGlEQUFzQjs7SUFDdEIsaURBQXNCOztJQUN0QixnREFBcUI7O0lBQ3JCLGdEQUFxQjs7SUFDckIsMkRBQWdDOztJQUNoQyx5REFBOEI7O0lBQzlCLDBEQUErQjs7SUFDL0IseURBQThCOztJQUM5QiwwREFBK0I7O0lBQy9CLG9EQUF5Qjs7SUFDekIscURBQTBCOztJQUMxQixvREFBeUI7O0lBQ3pCLHFEQUEwQjs7Ozs7QUFLNUIsTUFBTSxPQUFPLGlCQUFpQjtJQUQ5Qjs7Ozs7UUFNVyxZQUFPLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQzs7OztRQUd2QyxrQkFBYSxHQUFHLFVBQVUsQ0FBQzs7OztRQUczQixzQkFBaUIsR0FBRyxlQUFlLENBQUM7Ozs7UUFHcEMsbUJBQWMsR0FBRyxnQkFBZ0IsQ0FBQzs7OztRQUdsQyxtQkFBYyxHQUFHLFlBQVksQ0FBQzs7OztRQUc5QixrQkFBYSxHQUFHLGVBQWUsQ0FBQzs7OztRQUdoQyxrQkFBYSxHQUFHLFdBQVcsQ0FBQzs7OztRQUc1QixpQkFBWSxHQUFHLGdCQUFnQixDQUFDOzs7O1FBR2hDLGlCQUFZLEdBQUcsZ0JBQWdCLENBQUM7Ozs7UUFHaEMsNEJBQXVCLEdBQUcsdUJBQXVCLENBQUM7Ozs7UUFHbEQsMEJBQXFCLEdBQUcscUJBQXFCLENBQUM7Ozs7UUFHOUMsMkJBQXNCLEdBQUcsc0JBQXNCLENBQUM7Ozs7UUFHaEQsMEJBQXFCLEdBQUcscUJBQXFCLENBQUM7Ozs7UUFHOUMsMkJBQXNCLEdBQUcsc0JBQXNCLENBQUM7Ozs7UUFHaEQscUJBQWdCLEdBQUcsSUFBSSxDQUFDOzs7O1FBR3hCLHNCQUFpQixHQUFHLHlCQUF5QixDQUFDOzs7O1FBRzlDLHFCQUFnQixHQUFHLFFBQVEsQ0FBQzs7OztRQUc1QixzQkFBaUIsR0FBRywyQkFBMkIsQ0FBQztLQUNqRDs7O1lBMURBLFVBQVUsU0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7Ozs7Ozs7OztJQU1oQyxvQ0FBdUM7Ozs7O0lBR3ZDLDBDQUEyQjs7Ozs7SUFHM0IsOENBQW9DOzs7OztJQUdwQywyQ0FBa0M7Ozs7O0lBR2xDLDJDQUE4Qjs7Ozs7SUFHOUIsMENBQWdDOzs7OztJQUdoQywwQ0FBNEI7Ozs7O0lBRzVCLHlDQUFnQzs7Ozs7SUFHaEMseUNBQWdDOzs7OztJQUdoQyxvREFBa0Q7Ozs7O0lBR2xELGtEQUE4Qzs7Ozs7SUFHOUMsbURBQWdEOzs7OztJQUdoRCxrREFBOEM7Ozs7O0lBRzlDLG1EQUFnRDs7Ozs7SUFHaEQsNkNBQXdCOzs7OztJQUd4Qiw4Q0FBOEM7Ozs7O0lBRzlDLDZDQUE0Qjs7Ozs7SUFHNUIsOENBQWdEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXHJcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcclxuICovXHJcblxyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgTWF0RGF0ZXBpY2tlckludGxDYXRhbG9nIHtcclxuICBjYWxlbmRhckxhYmVsOiBzdHJpbmc7XHJcbiAgb3BlbkNhbGVuZGFyTGFiZWw6IHN0cmluZztcclxuICBwcmV2TW9udGhMYWJlbDogc3RyaW5nO1xyXG4gIG5leHRNb250aExhYmVsOiBzdHJpbmc7XHJcbiAgcHJldlllYXJMYWJlbDogc3RyaW5nO1xyXG4gIG5leHRZZWFyTGFiZWw6IHN0cmluZztcclxuICBzZXRUb0FNTGFiZWw6IHN0cmluZztcclxuICBzZXRUb1BNTGFiZWw6IHN0cmluZztcclxuICBzd2l0Y2hUb01pbnV0ZVZpZXdMYWJlbDogc3RyaW5nO1xyXG4gIHN3aXRjaFRvSG91clZpZXdMYWJlbDogc3RyaW5nO1xyXG4gIHN3aXRjaFRvTW9udGhWaWV3TGFiZWw6IHN0cmluZztcclxuICBzd2l0Y2hUb1llYXJWaWV3TGFiZWw6IHN0cmluZztcclxuICBzd2l0Y2hUb1llYXJzVmlld0xhYmVsOiBzdHJpbmc7XHJcbiAgYnV0dG9uU3VibWl0VGV4dDogc3RyaW5nO1xyXG4gIGJ1dHRvblN1Ym1pdExhYmVsOiBzdHJpbmc7XHJcbiAgYnV0dG9uQ2FuY2VsVGV4dDogc3RyaW5nO1xyXG4gIGJ1dHRvbkNhbmNlbExhYmVsOiBzdHJpbmc7XHJcbn1cclxuXHJcbi8qKiBEYXRlcGlja2VyIGRhdGEgdGhhdCByZXF1aXJlcyBpbnRlcm5hdGlvbmFsaXphdGlvbi4gKi9cclxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcclxuZXhwb3J0IGNsYXNzIE1hdERhdGVwaWNrZXJJbnRsIGltcGxlbWVudHMgTWF0RGF0ZXBpY2tlckludGxDYXRhbG9nIHtcclxuICAvKipcclxuICAgKiBTdHJlYW0gdGhhdCBlbWl0cyB3aGVuZXZlciB0aGUgbGFiZWxzIGhlcmUgYXJlIGNoYW5nZWQuIFVzZSB0aGlzIHRvIG5vdGlmeVxyXG4gICAqIGNvbXBvbmVudHMgaWYgdGhlIGxhYmVscyBoYXZlIGNoYW5nZWQgYWZ0ZXIgaW5pdGlhbGl6YXRpb24uXHJcbiAgICovXHJcbiAgcmVhZG9ubHkgY2hhbmdlcyA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcblxyXG4gIC8qKiBBIGxhYmVsIGZvciB0aGUgY2FsZW5kYXIgcG9wdXAgKHVzZWQgYnkgc2NyZWVuIHJlYWRlcnMpLiAqL1xyXG4gIGNhbGVuZGFyTGFiZWwgPSAnQ2FsZW5kYXInO1xyXG5cclxuICAvKiogQSBsYWJlbCBmb3IgdGhlIGJ1dHRvbiB1c2VkIHRvIG9wZW4gdGhlIGNhbGVuZGFyIHBvcHVwICh1c2VkIGJ5IHNjcmVlbiByZWFkZXJzKS4gKi9cclxuICBvcGVuQ2FsZW5kYXJMYWJlbCA9ICdPcGVuIGNhbGVuZGFyJztcclxuXHJcbiAgLyoqIEEgbGFiZWwgZm9yIHRoZSBwcmV2aW91cyBtb250aCBidXR0b24gKHVzZWQgYnkgc2NyZWVuIHJlYWRlcnMpLiAqL1xyXG4gIHByZXZNb250aExhYmVsID0gJ1ByZXZpb3VzIG1vbnRoJztcclxuXHJcbiAgLyoqIEEgbGFiZWwgZm9yIHRoZSBuZXh0IG1vbnRoIGJ1dHRvbiAodXNlZCBieSBzY3JlZW4gcmVhZGVycykuICovXHJcbiAgbmV4dE1vbnRoTGFiZWwgPSAnTmV4dCBtb250aCc7XHJcblxyXG4gIC8qKiBBIGxhYmVsIGZvciB0aGUgcHJldmlvdXMgeWVhciBidXR0b24gKHVzZWQgYnkgc2NyZWVuIHJlYWRlcnMpLiAqL1xyXG4gIHByZXZZZWFyTGFiZWwgPSAnUHJldmlvdXMgeWVhcic7XHJcblxyXG4gIC8qKiBBIGxhYmVsIGZvciB0aGUgbmV4dCB5ZWFyIGJ1dHRvbiAodXNlZCBieSBzY3JlZW4gcmVhZGVycykuICovXHJcbiAgbmV4dFllYXJMYWJlbCA9ICdOZXh0IHllYXInO1xyXG5cclxuICAvKiogQSBsYWJlbCBmb3IgdGhlICdBTScgYnV0dG9uICh1c2VkIGJ5IHNjcmVlbiByZWFkZXJzKS4gKi9cclxuICBzZXRUb0FNTGFiZWwgPSAnU2V0IGRhdGUgdG8gQU0nO1xyXG5cclxuICAvKiogQSBsYWJlbCBmb3IgdGhlICdQTScgYnV0dG9uICh1c2VkIGJ5IHNjcmVlbiByZWFkZXJzKS4gKi9cclxuICBzZXRUb1BNTGFiZWwgPSAnU2V0IGRhdGUgdG8gUE0nO1xyXG5cclxuICAvKiogQSBsYWJlbCBmb3IgdGhlICdzd2l0Y2ggdG8gbWludXRlIHZpZXcnIGJ1dHRvbiAodXNlZCBieSBzY3JlZW4gcmVhZGVycykuICovXHJcbiAgc3dpdGNoVG9NaW51dGVWaWV3TGFiZWwgPSAnQ2hhbmdlIHRvIG1pbnV0ZSB2aWV3JztcclxuXHJcbiAgLyoqIEEgbGFiZWwgZm9yIHRoZSAnc3dpdGNoIHRvIGhvdXIgdmlldycgYnV0dG9uICh1c2VkIGJ5IHNjcmVlbiByZWFkZXJzKS4gKi9cclxuICBzd2l0Y2hUb0hvdXJWaWV3TGFiZWwgPSAnQ2hhbmdlIHRvIGhvdXIgdmlldyc7XHJcblxyXG4gIC8qKiBBIGxhYmVsIGZvciB0aGUgJ3N3aXRjaCB0byBtb250aCB2aWV3JyBidXR0b24gKHVzZWQgYnkgc2NyZWVuIHJlYWRlcnMpLiAqL1xyXG4gIHN3aXRjaFRvTW9udGhWaWV3TGFiZWwgPSAnQ2hhbmdlIHRvIG1vbnRoIHZpZXcnO1xyXG5cclxuICAvKiogQSBsYWJlbCBmb3IgdGhlICdzd2l0Y2ggdG8geWVhciB2aWV3JyBidXR0b24gKHVzZWQgYnkgc2NyZWVuIHJlYWRlcnMpLiAqL1xyXG4gIHN3aXRjaFRvWWVhclZpZXdMYWJlbCA9ICdDaGFuZ2UgdG8geWVhciB2aWV3JztcclxuXHJcbiAgLyoqIEEgbGFiZWwgZm9yIHRoZSAnc3dpdGNoIHRvIHllYXJzIHZpZXcnIGJ1dHRvbiAodXNlZCBieSBzY3JlZW4gcmVhZGVycykuICovXHJcbiAgc3dpdGNoVG9ZZWFyc1ZpZXdMYWJlbCA9ICdDaGFuZ2UgdG8geWVhcnMgdmlldyc7XHJcblxyXG4gIC8qKiBUZXh0IGZvciB0aGUgJ3N1Ym1pdCcgYnV0dG9uLiAqL1xyXG4gIGJ1dHRvblN1Ym1pdFRleHQgPSAnT2snO1xyXG5cclxuICAvKiogQSBsYWJlbCBmb3IgdGhlICdzdWJtaXQnIGJ1dHRvbiAodXNlZCBieSBzY3JlZW4gcmVhZGVycykuICovXHJcbiAgYnV0dG9uU3VibWl0TGFiZWwgPSAnQ2hvb3NlIHRoZSBjdXJyZW50IGRhdGUnO1xyXG5cclxuICAvKiogVGV4dCBmb3IgdGhlICdjYW5jZWwnIGJ1dHRvbi4gKi9cclxuICBidXR0b25DYW5jZWxUZXh0ID0gJ0NhbmNlbCc7XHJcblxyXG4gIC8qKiBBIGxhYmVsIGZvciB0aGUgJ2NhbmNlbCcgYnV0dG9uICh1c2VkIGJ5IHNjcmVlbiByZWFkZXJzKS4gKi9cclxuICBidXR0b25DYW5jZWxMYWJlbCA9ICdDYW5jZWwgdGhlIGRhdGUgc2VsZWN0aW9uJztcclxufVxyXG4iXX0=