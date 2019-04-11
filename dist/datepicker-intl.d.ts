/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Subject } from 'rxjs';
export interface MatDatepickerIntlCatalog {
    calendarLabel: string;
    openCalendarLabel: string;
    prevMonthLabel: string;
    nextMonthLabel: string;
    prevYearLabel: string;
    nextYearLabel: string;
    setToAMLabel: string;
    setToPMLabel: string;
    switchToMinuteViewLabel: string;
    switchToHourViewLabel: string;
    switchToMonthViewLabel: string;
    switchToYearViewLabel: string;
    switchToYearsViewLabel: string;
    buttonSubmitText: string;
    buttonSubmitLabel: string;
    buttonCancelText: string;
    buttonCancelLabel: string;
}
/** Datepicker data that requires internationalization. */
export declare class MatDatepickerIntl implements MatDatepickerIntlCatalog {
    /**
     * Stream that emits whenever the labels here are changed. Use this to notify
     * components if the labels have changed after initialization.
     */
    readonly changes: Subject<void>;
    /** A label for the calendar popup (used by screen readers). */
    calendarLabel: string;
    /** A label for the button used to open the calendar popup (used by screen readers). */
    openCalendarLabel: string;
    /** A label for the previous month button (used by screen readers). */
    prevMonthLabel: string;
    /** A label for the next month button (used by screen readers). */
    nextMonthLabel: string;
    /** A label for the previous year button (used by screen readers). */
    prevYearLabel: string;
    /** A label for the next year button (used by screen readers). */
    nextYearLabel: string;
    /** A label for the 'AM' button (used by screen readers). */
    setToAMLabel: string;
    /** A label for the 'PM' button (used by screen readers). */
    setToPMLabel: string;
    /** A label for the 'switch to minute view' button (used by screen readers). */
    switchToMinuteViewLabel: string;
    /** A label for the 'switch to hour view' button (used by screen readers). */
    switchToHourViewLabel: string;
    /** A label for the 'switch to month view' button (used by screen readers). */
    switchToMonthViewLabel: string;
    /** A label for the 'switch to year view' button (used by screen readers). */
    switchToYearViewLabel: string;
    /** A label for the 'switch to years view' button (used by screen readers). */
    switchToYearsViewLabel: string;
    /** Text for the 'submit' button. */
    buttonSubmitText: string;
    /** A label for the 'submit' button (used by screen readers). */
    buttonSubmitLabel: string;
    /** Text for the 'cancel' button. */
    buttonCancelText: string;
    /** A label for the 'cancel' button (used by screen readers). */
    buttonCancelLabel: string;
}
