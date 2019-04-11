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
/** @nocollapse */ MatDatepickerIntl.ngInjectableDef = i0.defineInjectable({ factory: function MatDatepickerIntl_Factory() { return new MatDatepickerIntl(); }, token: MatDatepickerIntl, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1pbnRsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG1hcnRpbmRhbGVjL2RhdGVwaWNrZXIvIiwic291cmNlcyI6WyJkYXRlcGlja2VyLWludGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7O0FBRS9CLDhDQWtCQzs7O0lBakJDLGlEQUFzQjs7SUFDdEIscURBQTBCOztJQUMxQixrREFBdUI7O0lBQ3ZCLGtEQUF1Qjs7SUFDdkIsaURBQXNCOztJQUN0QixpREFBc0I7O0lBQ3RCLGdEQUFxQjs7SUFDckIsZ0RBQXFCOztJQUNyQiwyREFBZ0M7O0lBQ2hDLHlEQUE4Qjs7SUFDOUIsMERBQStCOztJQUMvQix5REFBOEI7O0lBQzlCLDBEQUErQjs7SUFDL0Isb0RBQXlCOztJQUN6QixxREFBMEI7O0lBQzFCLG9EQUF5Qjs7SUFDekIscURBQTBCOzs7OztBQUs1QixNQUFNLE9BQU8saUJBQWlCO0lBRDlCOzs7OztRQU1XLFlBQU8sR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDOzs7O1FBR3ZDLGtCQUFhLEdBQUcsVUFBVSxDQUFDOzs7O1FBRzNCLHNCQUFpQixHQUFHLGVBQWUsQ0FBQzs7OztRQUdwQyxtQkFBYyxHQUFHLGdCQUFnQixDQUFDOzs7O1FBR2xDLG1CQUFjLEdBQUcsWUFBWSxDQUFDOzs7O1FBRzlCLGtCQUFhLEdBQUcsZUFBZSxDQUFDOzs7O1FBR2hDLGtCQUFhLEdBQUcsV0FBVyxDQUFDOzs7O1FBRzVCLGlCQUFZLEdBQUcsZ0JBQWdCLENBQUM7Ozs7UUFHaEMsaUJBQVksR0FBRyxnQkFBZ0IsQ0FBQzs7OztRQUdoQyw0QkFBdUIsR0FBRyx1QkFBdUIsQ0FBQzs7OztRQUdsRCwwQkFBcUIsR0FBRyxxQkFBcUIsQ0FBQzs7OztRQUc5QywyQkFBc0IsR0FBRyxzQkFBc0IsQ0FBQzs7OztRQUdoRCwwQkFBcUIsR0FBRyxxQkFBcUIsQ0FBQzs7OztRQUc5QywyQkFBc0IsR0FBRyxzQkFBc0IsQ0FBQzs7OztRQUdoRCxxQkFBZ0IsR0FBRyxJQUFJLENBQUM7Ozs7UUFHeEIsc0JBQWlCLEdBQUcseUJBQXlCLENBQUM7Ozs7UUFHOUMscUJBQWdCLEdBQUcsUUFBUSxDQUFDOzs7O1FBRzVCLHNCQUFpQixHQUFHLDJCQUEyQixDQUFDO0tBQ2pEOzs7WUExREEsVUFBVSxTQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7Ozs7Ozs7O0lBTWhDLG9DQUF1Qzs7Ozs7SUFHdkMsMENBQTJCOzs7OztJQUczQiw4Q0FBb0M7Ozs7O0lBR3BDLDJDQUFrQzs7Ozs7SUFHbEMsMkNBQThCOzs7OztJQUc5QiwwQ0FBZ0M7Ozs7O0lBR2hDLDBDQUE0Qjs7Ozs7SUFHNUIseUNBQWdDOzs7OztJQUdoQyx5Q0FBZ0M7Ozs7O0lBR2hDLG9EQUFrRDs7Ozs7SUFHbEQsa0RBQThDOzs7OztJQUc5QyxtREFBZ0Q7Ozs7O0lBR2hELGtEQUE4Qzs7Ozs7SUFHOUMsbURBQWdEOzs7OztJQUdoRCw2Q0FBd0I7Ozs7O0lBR3hCLDhDQUE4Qzs7Ozs7SUFHOUMsNkNBQTRCOzs7OztJQUc1Qiw4Q0FBZ0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcclxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxyXG4gKi9cclxuXHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBNYXREYXRlcGlja2VySW50bENhdGFsb2cge1xyXG4gIGNhbGVuZGFyTGFiZWw6IHN0cmluZztcclxuICBvcGVuQ2FsZW5kYXJMYWJlbDogc3RyaW5nO1xyXG4gIHByZXZNb250aExhYmVsOiBzdHJpbmc7XHJcbiAgbmV4dE1vbnRoTGFiZWw6IHN0cmluZztcclxuICBwcmV2WWVhckxhYmVsOiBzdHJpbmc7XHJcbiAgbmV4dFllYXJMYWJlbDogc3RyaW5nO1xyXG4gIHNldFRvQU1MYWJlbDogc3RyaW5nO1xyXG4gIHNldFRvUE1MYWJlbDogc3RyaW5nO1xyXG4gIHN3aXRjaFRvTWludXRlVmlld0xhYmVsOiBzdHJpbmc7XHJcbiAgc3dpdGNoVG9Ib3VyVmlld0xhYmVsOiBzdHJpbmc7XHJcbiAgc3dpdGNoVG9Nb250aFZpZXdMYWJlbDogc3RyaW5nO1xyXG4gIHN3aXRjaFRvWWVhclZpZXdMYWJlbDogc3RyaW5nO1xyXG4gIHN3aXRjaFRvWWVhcnNWaWV3TGFiZWw6IHN0cmluZztcclxuICBidXR0b25TdWJtaXRUZXh0OiBzdHJpbmc7XHJcbiAgYnV0dG9uU3VibWl0TGFiZWw6IHN0cmluZztcclxuICBidXR0b25DYW5jZWxUZXh0OiBzdHJpbmc7XHJcbiAgYnV0dG9uQ2FuY2VsTGFiZWw6IHN0cmluZztcclxufVxyXG5cclxuLyoqIERhdGVwaWNrZXIgZGF0YSB0aGF0IHJlcXVpcmVzIGludGVybmF0aW9uYWxpemF0aW9uLiAqL1xyXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxyXG5leHBvcnQgY2xhc3MgTWF0RGF0ZXBpY2tlckludGwgaW1wbGVtZW50cyBNYXREYXRlcGlja2VySW50bENhdGFsb2cge1xyXG4gIC8qKlxyXG4gICAqIFN0cmVhbSB0aGF0IGVtaXRzIHdoZW5ldmVyIHRoZSBsYWJlbHMgaGVyZSBhcmUgY2hhbmdlZC4gVXNlIHRoaXMgdG8gbm90aWZ5XHJcbiAgICogY29tcG9uZW50cyBpZiB0aGUgbGFiZWxzIGhhdmUgY2hhbmdlZCBhZnRlciBpbml0aWFsaXphdGlvbi5cclxuICAgKi9cclxuICByZWFkb25seSBjaGFuZ2VzID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcclxuXHJcbiAgLyoqIEEgbGFiZWwgZm9yIHRoZSBjYWxlbmRhciBwb3B1cCAodXNlZCBieSBzY3JlZW4gcmVhZGVycykuICovXHJcbiAgY2FsZW5kYXJMYWJlbCA9ICdDYWxlbmRhcic7XHJcblxyXG4gIC8qKiBBIGxhYmVsIGZvciB0aGUgYnV0dG9uIHVzZWQgdG8gb3BlbiB0aGUgY2FsZW5kYXIgcG9wdXAgKHVzZWQgYnkgc2NyZWVuIHJlYWRlcnMpLiAqL1xyXG4gIG9wZW5DYWxlbmRhckxhYmVsID0gJ09wZW4gY2FsZW5kYXInO1xyXG5cclxuICAvKiogQSBsYWJlbCBmb3IgdGhlIHByZXZpb3VzIG1vbnRoIGJ1dHRvbiAodXNlZCBieSBzY3JlZW4gcmVhZGVycykuICovXHJcbiAgcHJldk1vbnRoTGFiZWwgPSAnUHJldmlvdXMgbW9udGgnO1xyXG5cclxuICAvKiogQSBsYWJlbCBmb3IgdGhlIG5leHQgbW9udGggYnV0dG9uICh1c2VkIGJ5IHNjcmVlbiByZWFkZXJzKS4gKi9cclxuICBuZXh0TW9udGhMYWJlbCA9ICdOZXh0IG1vbnRoJztcclxuXHJcbiAgLyoqIEEgbGFiZWwgZm9yIHRoZSBwcmV2aW91cyB5ZWFyIGJ1dHRvbiAodXNlZCBieSBzY3JlZW4gcmVhZGVycykuICovXHJcbiAgcHJldlllYXJMYWJlbCA9ICdQcmV2aW91cyB5ZWFyJztcclxuXHJcbiAgLyoqIEEgbGFiZWwgZm9yIHRoZSBuZXh0IHllYXIgYnV0dG9uICh1c2VkIGJ5IHNjcmVlbiByZWFkZXJzKS4gKi9cclxuICBuZXh0WWVhckxhYmVsID0gJ05leHQgeWVhcic7XHJcblxyXG4gIC8qKiBBIGxhYmVsIGZvciB0aGUgJ0FNJyBidXR0b24gKHVzZWQgYnkgc2NyZWVuIHJlYWRlcnMpLiAqL1xyXG4gIHNldFRvQU1MYWJlbCA9ICdTZXQgZGF0ZSB0byBBTSc7XHJcblxyXG4gIC8qKiBBIGxhYmVsIGZvciB0aGUgJ1BNJyBidXR0b24gKHVzZWQgYnkgc2NyZWVuIHJlYWRlcnMpLiAqL1xyXG4gIHNldFRvUE1MYWJlbCA9ICdTZXQgZGF0ZSB0byBQTSc7XHJcblxyXG4gIC8qKiBBIGxhYmVsIGZvciB0aGUgJ3N3aXRjaCB0byBtaW51dGUgdmlldycgYnV0dG9uICh1c2VkIGJ5IHNjcmVlbiByZWFkZXJzKS4gKi9cclxuICBzd2l0Y2hUb01pbnV0ZVZpZXdMYWJlbCA9ICdDaGFuZ2UgdG8gbWludXRlIHZpZXcnO1xyXG5cclxuICAvKiogQSBsYWJlbCBmb3IgdGhlICdzd2l0Y2ggdG8gaG91ciB2aWV3JyBidXR0b24gKHVzZWQgYnkgc2NyZWVuIHJlYWRlcnMpLiAqL1xyXG4gIHN3aXRjaFRvSG91clZpZXdMYWJlbCA9ICdDaGFuZ2UgdG8gaG91ciB2aWV3JztcclxuXHJcbiAgLyoqIEEgbGFiZWwgZm9yIHRoZSAnc3dpdGNoIHRvIG1vbnRoIHZpZXcnIGJ1dHRvbiAodXNlZCBieSBzY3JlZW4gcmVhZGVycykuICovXHJcbiAgc3dpdGNoVG9Nb250aFZpZXdMYWJlbCA9ICdDaGFuZ2UgdG8gbW9udGggdmlldyc7XHJcblxyXG4gIC8qKiBBIGxhYmVsIGZvciB0aGUgJ3N3aXRjaCB0byB5ZWFyIHZpZXcnIGJ1dHRvbiAodXNlZCBieSBzY3JlZW4gcmVhZGVycykuICovXHJcbiAgc3dpdGNoVG9ZZWFyVmlld0xhYmVsID0gJ0NoYW5nZSB0byB5ZWFyIHZpZXcnO1xyXG5cclxuICAvKiogQSBsYWJlbCBmb3IgdGhlICdzd2l0Y2ggdG8geWVhcnMgdmlldycgYnV0dG9uICh1c2VkIGJ5IHNjcmVlbiByZWFkZXJzKS4gKi9cclxuICBzd2l0Y2hUb1llYXJzVmlld0xhYmVsID0gJ0NoYW5nZSB0byB5ZWFycyB2aWV3JztcclxuXHJcbiAgLyoqIFRleHQgZm9yIHRoZSAnc3VibWl0JyBidXR0b24uICovXHJcbiAgYnV0dG9uU3VibWl0VGV4dCA9ICdPayc7XHJcblxyXG4gIC8qKiBBIGxhYmVsIGZvciB0aGUgJ3N1Ym1pdCcgYnV0dG9uICh1c2VkIGJ5IHNjcmVlbiByZWFkZXJzKS4gKi9cclxuICBidXR0b25TdWJtaXRMYWJlbCA9ICdDaG9vc2UgdGhlIGN1cnJlbnQgZGF0ZSc7XHJcblxyXG4gIC8qKiBUZXh0IGZvciB0aGUgJ2NhbmNlbCcgYnV0dG9uLiAqL1xyXG4gIGJ1dHRvbkNhbmNlbFRleHQgPSAnQ2FuY2VsJztcclxuXHJcbiAgLyoqIEEgbGFiZWwgZm9yIHRoZSAnY2FuY2VsJyBidXR0b24gKHVzZWQgYnkgc2NyZWVuIHJlYWRlcnMpLiAqL1xyXG4gIGJ1dHRvbkNhbmNlbExhYmVsID0gJ0NhbmNlbCB0aGUgZGF0ZSBzZWxlY3Rpb24nO1xyXG59XHJcbiJdfQ==