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
import { DOWN_ARROW, ENTER, UP_ARROW } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Input, Optional, Output, ViewEncapsulation } from '@angular/core';
import { of as obsOf, fromEvent } from 'rxjs';
import { mergeMap, sampleTime } from 'rxjs/operators';
import { MAT_DATE_FORMATS } from './core/index';
import { DateAdapter } from './core/index';
import { createMissingDateImplError } from './datepicker-errors';
/** @type {?} */
const YEAR_LINE_HEIGHT = 35;
/**
 * An internal component used to display a year selector in the datepicker.
 * \@docs-private
 * @template D
 */
export class MatYearsView {
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
        (ev) => obsOf(this._calculatePoints()))))
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWVhcnMtdmlldy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtYXJ0aW5kYWxlYy9kYXRlcGlja2VyLyIsInNvdXJjZXMiOlsieWVhcnMtdmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BFLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBRUwsUUFBUSxFQUNSLE1BQU0sRUFDTixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLEVBQUUsSUFBSSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGdCQUFnQixFQUFrQixNQUFNLGNBQWMsQ0FBQztBQUNoRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzNDLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHFCQUFxQixDQUFDOztNQUUzRCxnQkFBZ0IsR0FBRyxFQUFFOzs7Ozs7QUFjM0IsTUFBTSxPQUFPLFlBQVk7Ozs7Ozs7SUFtRXZCLFlBQ1Usa0JBQXFDLEVBQ3JDLE9BQW1CLEVBQ1IsWUFBNEIsRUFHdkMsWUFBNEI7UUFMNUIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQUNyQyxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ1IsaUJBQVksR0FBWixZQUFZLENBQWdCO1FBR3ZDLGlCQUFZLEdBQVosWUFBWSxDQUFnQjs7OztRQWpCbkIsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBSyxDQUFDOzs7O1FBRzFELFdBQU0sR0FBK0MsRUFBRSxDQUFDO1FBZ0J0RCxJQUFJLENBQUMs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Q1AsbUNBQXVCOzs7OztJQVd2QixpQ0FBNEI7Ozs7O0lBVTVCLGdDQUEyQjs7Ozs7SUFVM0IsZ0NBQTJCOzs7OztJQUczQixrQ0FBeUQ7Ozs7O0lBR3pELHNDQUEwRDs7Ozs7SUFHMUQsOEJBQXdEOzs7OztJQUd4RCxxQ0FBNkI7Ozs7O0lBRzdCLHdDQUErQjs7Ozs7SUFHN0IsMENBQTZDOzs7OztJQUM3QywrQkFBMkI7O0lBQzNCLG9DQUErQzs7Ozs7SUFDL0Msb0NBRW9DIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXHJcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcclxuICovXHJcblxyXG5pbXBvcnQgeyBET1dOX0FSUk9XLCBFTlRFUiwgVVBfQVJST1cgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xyXG5pbXBvcnQge1xyXG4gIEFmdGVyQ29udGVudEluaXQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ29tcG9uZW50LFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIEluamVjdCxcclxuICBJbnB1dCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT3B0aW9uYWwsXHJcbiAgT3V0cHV0LFxyXG4gIFZpZXdFbmNhcHN1bGF0aW9uXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBvZiBhcyBvYnNPZiwgZnJvbUV2ZW50IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1lcmdlTWFwLCBzYW1wbGVUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBNQVRfREFURV9GT1JNQVRTLCBNYXREYXRlRm9ybWF0cyB9IGZyb20gJy4vY29yZS9pbmRleCc7XHJcbmltcG9ydCB7IERhdGVBZGFwdGVyIH0gZnJvbSAnLi9jb3JlL2luZGV4JztcclxuaW1wb3J0IHsgY3JlYXRlTWlzc2luZ0RhdGVJbXBsRXJyb3IgfSBmcm9tICcuL2RhdGVwaWNrZXItZXJyb3JzJztcclxuXHJcbmNvbnN0IFlFQVJfTElORV9IRUlHSFQgPSAzNTtcclxuXHJcbi8qKlxyXG4gKiBBbiBpbnRlcm5hbCBjb21wb25lbnQgdXNlZCB0byBkaXNwbGF5IGEgeWVhciBzZWxlY3RvciBpbiB0aGUgZGF0ZXBpY2tlci5cclxuICogQGRvY3MtcHJpdmF0ZVxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdtYXQteWVhcnMtdmlldycsXHJcbiAgdGVtcGxhdGVVcmw6ICd5ZWFycy12aWV3Lmh0bWwnLFxyXG4gIGV4cG9ydEFzOiAnbWF0WWVhcnNWaWV3JyxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXRZZWFyc1ZpZXc8RD4gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xyXG4gIC8qKiBUaGUgZGF0ZSB0byBkaXNwbGF5IGluIHRoaXMgdmlldyAoZXZlcnl0aGluZyBvdGhlciB0aGFuIHRoZSB5ZWFyIGlzIGlnbm9yZWQpLiAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGFjdGl2ZURhdGUoKTogRCB7XHJcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlRGF0ZTtcclxuICB9XHJcbiAgc2V0IGFjdGl2ZURhdGUodmFsdWU6IEQpIHtcclxuICAgIGxldCBvbGRBY3RpdmVEYXRlID0gdGhpcy5fYWN0aXZlRGF0ZTtcclxuICAgIGNvbnN0IHZhbGlkRGF0ZSA9XHJcbiAgICAgIHRoaXMuX2dldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLl9kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpIHx8IHRoaXMuX2RhdGVBZGFwdGVyLnRvZGF5KCk7XHJcbiAgICB0aGlzLl9hY3RpdmVEYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuY2xhbXBEYXRlKHZhbGlkRGF0ZSwgdGhpcy5taW5EYXRlLCB0aGlzLm1heERhdGUpO1xyXG5cclxuICAgIGlmIChcclxuICAgICAgb2xkQWN0aXZlRGF0ZSAmJlxyXG4gICAgICB0aGlzLl9kYXRlQWRhcHRlci5nZXRZZWFyKG9sZEFjdGl2ZURhdGUpICE9IHRoaXMuX2RhdGVBZGFwdGVyLmdldFllYXIodGhpcy5fYWN0aXZlRGF0ZSlcclxuICAgICkge1xyXG4gICAgICB0aGlzLl9pbml0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHByaXZhdGUgX2FjdGl2ZURhdGU6IEQ7XHJcblxyXG4gIC8qKiBUaGUgY3VycmVudGx5IHNlbGVjdGVkIGRhdGUuICovXHJcbiAgQElucHV0KClcclxuICBnZXQgc2VsZWN0ZWQoKTogRCB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xyXG4gIH1cclxuICBzZXQgc2VsZWN0ZWQodmFsdWU6IEQgfCBudWxsKSB7XHJcbiAgICB0aGlzLl9zZWxlY3RlZCA9IHRoaXMuX2dldFZhbGlkRGF0ZU9yTnVsbCh0aGlzLl9kYXRlQWRhcHRlci5kZXNlcmlhbGl6ZSh2YWx1ZSkpO1xyXG4gICAgdGhpcy5fc2VsZWN0ZWRZZWFyID0gdGhpcy5fc2VsZWN0ZWQgJiYgdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0WWVhcih0aGlzLl9zZWxlY3RlZCk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3NlbGVjdGVkOiBEIHwgbnVsbDtcclxuXHJcbiAgLyoqIFRoZSBtaW5pbXVtIHNlbGVjdGFibGUgZGF0ZS4gKi9cclxuICBASW5wdXQoKVxyXG4gIGdldCBtaW5EYXRlKCk6IEQgfCBudWxsIHtcclxuICAgIHJldHVybiB0aGlzLl9taW5EYXRlO1xyXG4gIH1cclxuICBzZXQgbWluRGF0ZSh2YWx1ZTogRCB8IG51bGwpIHtcclxuICAgIHRoaXMuX21pbkRhdGUgPSB0aGlzLl9nZXRWYWxpZERhdGVPck51bGwodGhpcy5fZGF0ZUFkYXB0ZXIuZGVzZXJpYWxpemUodmFsdWUpKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfbWluRGF0ZTogRCB8IG51bGw7XHJcblxyXG4gIC8qKiBUaGUgbWF4aW11bSBzZWxlY3RhYmxlIGRhdGUuICovXHJcbiAgQElucHV0KClcclxuICBnZXQgbWF4RGF0ZSgpOiBEIHwgbnVsbCB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWF4RGF0ZTtcclxuICB9XHJcbiAgc2V0IG1heERhdGUodmFsdWU6IEQgfCBudWxsKSB7XHJcbiAgICB0aGlzLl9tYXhEYXRlID0gdGhpcy5fZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuX2RhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX21heERhdGU6IEQgfCBudWxsO1xyXG5cclxuICAvKiogQSBmdW5jdGlvbiB1c2VkIHRvIGZpbHRlciB3aGljaCBkYXRlcyBhcmUgc2VsZWN0YWJsZS4gKi9cclxuICBASW5wdXQoKSBkYXRlRmlsdGVyOiAoZGF0ZTogRCwgdW5pdD86IHN0cmluZykgPT4gYm9vbGVhbjtcclxuXHJcbiAgLyoqIEVtaXRzIHdoZW4gYSBuZXcgbW9udGggaXMgc2VsZWN0ZWQuICovXHJcbiAgQE91dHB1dCgpIHJlYWRvbmx5IHNlbGVjdGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxEPigpO1xyXG5cclxuICAvKiogTGlzdCBvZiB5ZWFycy4gKi9cclxuICBfeWVhcnM6IEFycmF5PHsgdmFsdWU6IG51bWJlcjsgZW5hYmxlZDogYm9vbGVhbiB9PiA9IFtdO1xyXG5cclxuICAvKiogVGhlIHNlbGVjdGVkIHllYXIuICovXHJcbiAgX3NlbGVjdGVkWWVhcjogbnVtYmVyIHwgbnVsbDtcclxuXHJcbiAgLyoqIFNjcm9sbGVyIHN1YnNjcmlwdGlvbi4gKi9cclxuICBfZGlzcG9zZVNjcm9sbGVyOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxyXG4gICAgQE9wdGlvbmFsKCkgcHVibGljIF9kYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXI8RD4sXHJcbiAgICBAT3B0aW9uYWwoKVxyXG4gICAgQEluamVjdChNQVRfREFURV9GT1JNQVRTKVxyXG4gICAgcHJpdmF0ZSBfZGF0ZUZvcm1hdHM6IE1hdERhdGVGb3JtYXRzXHJcbiAgKSB7XHJcbiAgICBpZiAoIXRoaXMuX2RhdGVBZGFwdGVyKSB7XHJcbiAgICAgIHRocm93IGNyZWF0ZU1pc3NpbmdEYXRlSW1wbEVycm9yKCdEYXRlQWRhcHRlcicpO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLl9kYXRlRm9ybWF0cykge1xyXG4gICAgICB0aHJvdyBjcmVhdGVNaXNzaW5nRGF0ZUltcGxFcnJvcignTUFUX0RBVEVfRk9STUFUUycpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgY29uc3QgbGFzdFBvc2l0aW9uID0geyBzY3JvbGxlZDogMCB9O1xyXG4gICAgdGhpcy5fZGlzcG9zZVNjcm9sbGVyID0gZnJvbUV2ZW50KHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnc2Nyb2xsJylcclxuICAgICAgLnBpcGUoc2FtcGxlVGltZSgzMDApLCBtZXJnZU1hcCgoZXY6IGFueSkgPT4gb2JzT2YodGhpcy5fY2FsY3VsYXRlUG9pbnRzKCkpKSlcclxuICAgICAgLnN1YnNjcmliZSgocG9zOiBhbnkpID0+IHRoaXMuX2hhbmRsZVNjcm9sbChwb3MsIGxhc3RQb3NpdGlvbikpO1xyXG5cclxuICAgIHRoaXMuX2luaXQoKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5fZGlzcG9zZVNjcm9sbGVyLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBhYnModmFsdWU6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIE1hdGguYWJzKHZhbHVlKTtcclxuICB9XHJcblxyXG4gIC8qKiBJbml0aWFsaXplcyB0aGlzIHllYXIgdmlldy4gKi9cclxuICBfaW5pdCgpIHtcclxuICAgIHRoaXMuX3NlbGVjdGVkWWVhciA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldFllYXIodGhpcy5zZWxlY3RlZCA/IHRoaXMuc2VsZWN0ZWQgOiB0aGlzLmFjdGl2ZURhdGUpO1xyXG5cclxuICAgIGNvbnN0IGRhdGUgPSB0aGlzLl9kYXRlQWRhcHRlci5jcmVhdGVEYXRlKFxyXG4gICAgICB0aGlzLl9zZWxlY3RlZFllYXIsXHJcbiAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmdldE1vbnRoKHRoaXMuYWN0aXZlRGF0ZSksXHJcbiAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmdldERhdGUodGhpcy5hY3RpdmVEYXRlKSxcclxuICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0SG91cnModGhpcy5hY3RpdmVEYXRlKSxcclxuICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0TWludXRlcyh0aGlzLmFjdGl2ZURhdGUpXHJcbiAgICApO1xyXG4gICAgdGhpcy5feWVhcnMgPSBbXHJcbiAgICAgIHtcclxuICAgICAgICB2YWx1ZTogdGhpcy5fc2VsZWN0ZWRZZWFyLFxyXG4gICAgICAgIGVuYWJsZWQ6ICF0aGlzLmRhdGVGaWx0ZXIgfHwgdGhpcy5kYXRlRmlsdGVyKGRhdGUsICdtaW51dGUnKVxyXG4gICAgICB9XHJcbiAgICBdO1xyXG5cclxuICAgIHRoaXMuX3BvcHVsYXRlWWVhcnMoKTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wIC09XHJcbiAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0IC8gMiAtIFlFQVJfTElORV9IRUlHSFQgLyAyO1xyXG4gICAgfSwgMjApO1xyXG4gIH1cclxuXHJcbiAgX3BvcHVsYXRlWWVhcnMoZG93biA9IGZhbHNlKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgICghZG93biAmJiAhdGhpcy5feWVhcnNbMF0uZW5hYmxlZCkgfHxcclxuICAgICAgKGRvd24gJiYgIXRoaXMuX3llYXJzW3RoaXMuX3llYXJzLmxlbmd0aCAtIDFdLmVuYWJsZWQpXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNlbGVjdGVkTW9udGggPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRNb250aCh0aGlzLmFjdGl2ZURhdGUpO1xyXG4gICAgY29uc3Qgc2VsZWN0ZWREYXkgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXREYXRlKHRoaXMuYWN0aXZlRGF0ZSk7XHJcbiAgICBjb25zdCBzZWxlY3RlZEhvdXJzID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0SG91cnModGhpcy5hY3RpdmVEYXRlKTtcclxuICAgIGNvbnN0IHNlbGVjdGVkTWludXRlcyA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldE1pbnV0ZXModGhpcy5hY3RpdmVEYXRlKTtcclxuXHJcbiAgICBsZXQgc2Nyb2xsID0gMDtcclxuICAgIGZvciAobGV0IHkgPSAxOyB5IDw9IDEwOyB5KyspIHtcclxuICAgICAgbGV0IHllYXIgPSB0aGlzLl95ZWFyc1t0aGlzLl95ZWFycy5sZW5ndGggLSAxXS52YWx1ZTtcclxuICAgICAgbGV0IGRhdGUgPSB0aGlzLl9kYXRlQWRhcHRlci5jcmVhdGVEYXRlKFxyXG4gICAgICAgIHllYXIgKyAxLFxyXG4gICAgICAgIHNlbGVjdGVkTW9udGgsXHJcbiAgICAgICAgc2VsZWN0ZWREYXksXHJcbiAgICAgICAgc2VsZWN0ZWRIb3VycyxcclxuICAgICAgICBzZWxlY3RlZE1pbnV0ZXNcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5feWVhcnMucHVzaCh7XHJcbiAgICAgICAgdmFsdWU6IHllYXIgKyAxLFxyXG4gICAgICAgIGVuYWJsZWQ6ICF0aGlzLmRhdGVGaWx0ZXIgfHwgdGhpcy5kYXRlRmlsdGVyKGRhdGUsICdtaW51dGUnKVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHllYXIgPSB0aGlzLl95ZWFyc1swXS52YWx1ZTtcclxuICAgICAgZGF0ZSA9IHRoaXMuX2RhdGVBZGFwdGVyLmNyZWF0ZURhdGUoXHJcbiAgICAgICAgeWVhciAtIDEsXHJcbiAgICAgICAgc2VsZWN0ZWRNb250aCxcclxuICAgICAgICBzZWxlY3RlZERheSxcclxuICAgICAgICBzZWxlY3RlZEhvdXJzLFxyXG4gICAgICAgIHNlbGVjdGVkTWludXRlc1xyXG4gICAgICApO1xyXG4gICAgICB0aGlzLl95ZWFycy51bnNoaWZ0KHtcclxuICAgICAgICB2YWx1ZTogeWVhciAtIDEsXHJcbiAgICAgICAgZW5hYmxlZDogIXRoaXMuZGF0ZUZpbHRlciB8fCB0aGlzLmRhdGVGaWx0ZXIoZGF0ZSwgJ21pbnV0ZScpXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgc2Nyb2xsICs9IFlFQVJfTElORV9IRUlHSFQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCArPSBkb3duID8gWUVBUl9MSU5FX0hFSUdIVCA6IHNjcm9sbDtcclxuICAgIH0sIDEwKTtcclxuXHJcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcclxuICB9XHJcblxyXG4gIF95ZWFyU2VsZWN0ZWQoeWVhcjogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBzZWxlY3RlZE1vbnRoID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0TW9udGgodGhpcy5hY3RpdmVEYXRlKTtcclxuICAgIGNvbnN0IHNlbGVjdGVkRGF5ID0gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0RGF0ZSh0aGlzLmFjdGl2ZURhdGUpO1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRIb3VycyA9IHRoaXMuX2RhdGVBZGFwdGVyLmdldEhvdXJzKHRoaXMuYWN0aXZlRGF0ZSk7XHJcbiAgICBjb25zdCBzZWxlY3RlZE1pbnV0ZXMgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRNaW51dGVzKHRoaXMuYWN0aXZlRGF0ZSk7XHJcbiAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQoXHJcbiAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmNyZWF0ZURhdGUoeWVhciwgc2VsZWN0ZWRNb250aCwgc2VsZWN0ZWREYXksIHNlbGVjdGVkSG91cnMsIHNlbGVjdGVkTWludXRlcylcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBfY2FsY3VsYXRlUG9pbnRzKCkge1xyXG4gICAgY29uc3QgZWwgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGhlaWdodDogZWwub2Zmc2V0SGVpZ2h0LFxyXG4gICAgICBzY3JvbGxlZDogZWwuc2Nyb2xsVG9wLFxyXG4gICAgICB0b3RhbDogZWwuc2Nyb2xsSGVpZ2h0XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgX2hhbmRsZVNjcm9sbChwb3NpdGlvbiwgbGFzdFBvc2l0aW9uKSB7XHJcbiAgICBpZiAocG9zaXRpb24uc2Nyb2xsZWQgPT09IDAgJiYgbGFzdFBvc2l0aW9uLnNjcm9sbGVkID4gMCkge1xyXG4gICAgICB0aGlzLl9wb3B1bGF0ZVllYXJzKGZhbHNlKTtcclxuICAgIH0gZWxzZSBpZiAocG9zaXRpb24uaGVpZ2h0ICsgcG9zaXRpb24uc2Nyb2xsZWQgPT09IHBvc2l0aW9uLnRvdGFsKSB7XHJcbiAgICAgIHRoaXMuX3BvcHVsYXRlWWVhcnModHJ1ZSk7XHJcbiAgICB9XHJcbiAgICBsYXN0UG9zaXRpb24uc2Nyb2xsZWQgPSBwb3NpdGlvbi5zY3JvbGxlZDtcclxuICB9XHJcblxyXG4gIC8qKiBIYW5kbGVzIGtleWRvd24gZXZlbnRzIG9uIHRoZSBjYWxlbmRhciBib2R5IHdoZW4gY2FsZW5kYXIgaXMgaW4gbXVsdGkteWVhciB2aWV3LiAqL1xyXG4gIF9oYW5kbGVDYWxlbmRhckJvZHlLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XHJcbiAgICAvLyBUT0RPIGhhbmRsZSBAYW5ndWxhci9jZGsva2V5Y29kZVxyXG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XHJcbiAgICAgIGNhc2UgVVBfQVJST1c6XHJcbiAgICAgICAgdGhpcy5hY3RpdmVEYXRlID0gdGhpcy5fZGF0ZUFkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyh0aGlzLl9hY3RpdmVEYXRlLCAtMSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgRE9XTl9BUlJPVzpcclxuICAgICAgICB0aGlzLmFjdGl2ZURhdGUgPSB0aGlzLl9kYXRlQWRhcHRlci5hZGRDYWxlbmRhclllYXJzKHRoaXMuX2FjdGl2ZURhdGUsIDEpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIEVOVEVSOlxyXG4gICAgICAgIHRoaXMuX3llYXJTZWxlY3RlZCh0aGlzLl9kYXRlQWRhcHRlci5nZXRZZWFyKHRoaXMuX2FjdGl2ZURhdGUpKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICAvLyBEb24ndCBwcmV2ZW50IGRlZmF1bHQgb3IgZm9jdXMgYWN0aXZlIGNlbGwgb24ga2V5cyB0aGF0IHdlIGRvbid0IGV4cGxpY2l0bHkgaGFuZGxlLlxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9mb2N1c0FjdGl2ZUNlbGwoKTtcclxuICAgIC8vIFByZXZlbnQgdW5leHBlY3RlZCBkZWZhdWx0IGFjdGlvbnMgc3VjaCBhcyBmb3JtIHN1Ym1pc3Npb24uXHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH1cclxuXHJcbiAgX2ZvY3VzQWN0aXZlQ2VsbCgpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBvYmogVGhlIG9iamVjdCB0byBjaGVjay5cclxuICAgKiBAcmV0dXJucyBUaGUgZ2l2ZW4gb2JqZWN0IGlmIGl0IGlzIGJvdGggYSBkYXRlIGluc3RhbmNlIGFuZCB2YWxpZCwgb3RoZXJ3aXNlIG51bGwuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZ2V0VmFsaWREYXRlT3JOdWxsKG9iajogYW55KTogRCB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RhdGVBZGFwdGVyLmlzRGF0ZUluc3RhbmNlKG9iaikgJiYgdGhpcy5fZGF0ZUFkYXB0ZXIuaXNWYWxpZChvYmopID8gb2JqIDogbnVsbDtcclxuICB9XHJcbn1cclxuIl19