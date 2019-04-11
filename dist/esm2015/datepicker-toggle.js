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
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, Directive, Input, ViewEncapsulation } from '@angular/core';
import { merge, of as obsOf, Subscription } from 'rxjs';
import { MatDatepicker } from './datepicker';
import { MatDatepickerIntl } from './datepicker-intl';
/**
 * Can be used to override the icon of a `matDatepickerToggle`.
 */
export class MatDatepickerToggleIcon {
}
MatDatepickerToggleIcon.decorators = [
    { type: Directive, args: [{
                selector: '[matDatepickerToggleIcon]'
            },] }
];
/**
 * @template D
 */
export class MatDatepickerToggle {
    /**
     * @param {?} _intl
     * @param {?} _changeDetectorRef
     */
    constructor(_intl, _changeDetectorRef) {
        this._intl = _intl;
        this._changeDetectorRef = _changeDetectorRef;
        this._stateChanges = Subscription.EMPTY;
    }
    /**
     * Whether the toggle button is disabled.
     * @return {?}
     */
    get disabled() {
        return this._disabled === undefined ? this.datepicker.disabled : !!this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.datepicker) {
            this._watchStateChanges();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._stateChanges.unsubscribe();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._watchStateChanges();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _open(event) {
        if (this.datepicker && !this.disabled) {
            this.datepicker.open();
            event.stopPropagation();
        }
    }
    /**
     * @private
     * @return {?}
     */
    _watchStateChanges() {
        /** @type {?} */
        const datepickerDisabled = this.datepicker ? this.datepicker._disabledChange : obsOf();
        /** @type {?} */
        const inputDisabled = this.datepicker && this.datepicker._datepickerInput
            ? this.datepicker._datepickerInput._disabledChange
            : obsOf();
        /** @type {?} */
        const datepickerToggled = this.datepicker
            ? merge(this.datepicker.openedStream, this.datepicker.closedStream)
            : obsOf();
        this._stateChanges.unsubscribe();
        this._stateChanges = merge(this._intl.changes, datepickerDisabled, inputDisabled, datepickerToggled).subscribe((/**
         * @return {?}
         */
        () => this._changeDetectorRef.markForCheck()));
    }
}
MatDatepickerToggle.decorators = [
    { type: Component, args: [{
                selector: 'mat-datepicker-toggle',
                template: "<button mat-icon-button type=\"button\" [attr.aria-label]=\"_intl.openCalendarLabel\"\r\n  [attr.disabled]=\"disabled ? '' : null\" (click)=\"_open($event)\">\r\n\r\n  <svg\r\n    *ngIf=\"!_customIcon\"\r\n    class=\"mat-datepicker-toggle-default-icon\"\r\n    viewBox=\"0 0 24 24\"\r\n    width=\"24px\"\r\n    height=\"24px\"\r\n    fill=\"currentColor\"\r\n    focusable=\"false\">\r\n    <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\r\n    <path d=\"M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z\"/>\r\n  </svg>\r\n\r\n  <ng-content select=\"[matDatepickerToggleIcon]\"></ng-content>\r\n</button>\r\n",
                // styleUrls: ['datepicker-toggle.css'],
                host: {
                    class: 'mat-datepicker-toggle',
                    '[class.mat-datepicker-toggle-active]': 'datepicker && datepicker.opened'
                },
                exportAs: 'matDatepickerToggle',
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false
            }] }
];
/** @nocollapse */
MatDatepickerToggle.ctorParameters = () => [
    { type: MatDatepickerIntl },
    { type: ChangeDetectorRef }
];
MatDatepickerToggle.propDecorators = {
    datepicker: [{ type: Input, args: ['for',] }],
    disabled: [{ type: Input }],
    _customIcon: [{ type: ContentChild, args: [MatDatepickerToggleIcon,] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci10b2dnbGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWFydGluZGFsZWMvZGF0ZXBpY2tlci8iLCJzb3VyY2VzIjpbImRhdGVwaWNrZXItdG9nZ2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixTQUFTLEVBQ1QsS0FBSyxFQUlMLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxLQUFLLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3hELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDN0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7Ozs7QUFNdEQsTUFBTSxPQUFPLHVCQUF1Qjs7O1lBSG5DLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsMkJBQTJCO2FBQ3RDOzs7OztBQWdCRCxNQUFNLE9BQU8sbUJBQW1COzs7OztJQW1COUIsWUFBbUIsS0FBd0IsRUFBVSxrQkFBcUM7UUFBdkUsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUFBVSx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBbEJsRixrQkFBYSxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFrQmtELENBQUM7Ozs7O0lBWjlGLElBQ0ksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUNwRixDQUFDOzs7OztJQUNELElBQUksUUFBUSxDQUFDLEtBQWM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoRCxDQUFDOzs7OztJQVFELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sQ0FBQyxVQUFVLEVBQUU7WUFDdEIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7U0FDM0I7SUFDSCxDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbkMsQ0FBQzs7OztJQUVELGtCQUFrQjtRQUNoQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM1QixDQUFDOzs7OztJQUVELEtBQUssQ0FBQyxLQUFZO1FBQ2hCLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDckMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDekI7SUFDSCxDQUFDOzs7OztJQUVPLGtCQUFrQjs7Y0FDbEIsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRTs7Y0FFaEYsYUFBYSxHQUNqQixJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCO1lBQ2pELENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLGVBQWU7WUFDbEQsQ0FBQyxDQUFDLEtBQUssRUFBRTs7Y0FFUCxpQkFBaUIsR0FBRyxJQUFJLENBQUMsVUFBVTtZQUN2QyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDO1lBQ25FLENBQUMsQ0FBQyxLQUFLLEVBQUU7UUFFWCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFDbEIsa0JBQWtCLEVBQ2xCLGFBQWEsRUFDYixpQkFBaUIsQ0FDbEIsQ0FBQyxTQUFTOzs7UUFBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLEVBQUMsQ0FBQztJQUM1RCxDQUFDOzs7WUExRUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLDRyQkFBcUM7O2dCQUVyQyxJQUFJLEVBQUU7b0JBQ0osS0FBSyxFQUFFLHVCQUF1QjtvQkFDOUIsc0NBQXNDLEVBQUUsaUNBQWlDO2lCQUMxRTtnQkFDRCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLG1CQUFtQixFQUFFLEtBQUs7YUFDM0I7Ozs7WUFwQlEsaUJBQWlCO1lBWnhCLGlCQUFpQjs7O3lCQXFDaEIsS0FBSyxTQUFDLEtBQUs7dUJBR1gsS0FBSzswQkFVTCxZQUFZLFNBQUMsdUJBQXVCOzs7Ozs7O0lBaEJyQyw0Q0FBMkM7Ozs7O0lBRzNDLHlDQUEyQzs7Ozs7SUFVM0Msd0NBQTJCOzs7OztJQUczQiwwQ0FBNEU7O0lBRWhFLG9DQUErQjs7Ozs7SUFBRSxpREFBNkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcclxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxyXG4gKi9cclxuXHJcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XHJcbmltcG9ydCB7XHJcbiAgQWZ0ZXJDb250ZW50SW5pdCxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBDb21wb25lbnQsXHJcbiAgQ29udGVudENoaWxkLFxyXG4gIERpcmVjdGl2ZSxcclxuICBJbnB1dCxcclxuICBPbkNoYW5nZXMsXHJcbiAgT25EZXN0cm95LFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbiAgVmlld0VuY2Fwc3VsYXRpb25cclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgbWVyZ2UsIG9mIGFzIG9ic09mLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgTWF0RGF0ZXBpY2tlciB9IGZyb20gJy4vZGF0ZXBpY2tlcic7XHJcbmltcG9ydCB7IE1hdERhdGVwaWNrZXJJbnRsIH0gZnJvbSAnLi9kYXRlcGlja2VyLWludGwnO1xyXG5cclxuLyoqIENhbiBiZSB1c2VkIHRvIG92ZXJyaWRlIHRoZSBpY29uIG9mIGEgYG1hdERhdGVwaWNrZXJUb2dnbGVgLiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1ttYXREYXRlcGlja2VyVG9nZ2xlSWNvbl0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXREYXRlcGlja2VyVG9nZ2xlSWNvbiB7fVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdtYXQtZGF0ZXBpY2tlci10b2dnbGUnLFxyXG4gIHRlbXBsYXRlVXJsOiAnZGF0ZXBpY2tlci10b2dnbGUuaHRtbCcsXHJcbiAgLy8gc3R5bGVVcmxzOiBbJ2RhdGVwaWNrZXItdG9nZ2xlLmNzcyddLFxyXG4gIGhvc3Q6IHtcclxuICAgIGNsYXNzOiAnbWF0LWRhdGVwaWNrZXItdG9nZ2xlJyxcclxuICAgICdbY2xhc3MubWF0LWRhdGVwaWNrZXItdG9nZ2xlLWFjdGl2ZV0nOiAnZGF0ZXBpY2tlciAmJiBkYXRlcGlja2VyLm9wZW5lZCdcclxuICB9LFxyXG4gIGV4cG9ydEFzOiAnbWF0RGF0ZXBpY2tlclRvZ2dsZScsXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWF0RGF0ZXBpY2tlclRvZ2dsZTxEPiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcclxuICBwcml2YXRlIF9zdGF0ZUNoYW5nZXMgPSBTdWJzY3JpcHRpb24uRU1QVFk7XHJcblxyXG4gIC8qKiBEYXRlcGlja2VyIGluc3RhbmNlIHRoYXQgdGhlIGJ1dHRvbiB3aWxsIHRvZ2dsZS4gKi9cclxuICBASW5wdXQoJ2ZvcicpIGRhdGVwaWNrZXI6IE1hdERhdGVwaWNrZXI8RD47XHJcblxyXG4gIC8qKiBXaGV0aGVyIHRoZSB0b2dnbGUgYnV0dG9uIGlzIGRpc2FibGVkLiAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkID09PSB1bmRlZmluZWQgPyB0aGlzLmRhdGVwaWNrZXIuZGlzYWJsZWQgOiAhIXRoaXMuX2Rpc2FibGVkO1xyXG4gIH1cclxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW47XHJcblxyXG4gIC8qKiBDdXN0b20gaWNvbiBzZXQgYnkgdGhlIGNvbnN1bWVyLiAqL1xyXG4gIEBDb250ZW50Q2hpbGQoTWF0RGF0ZXBpY2tlclRvZ2dsZUljb24pIF9jdXN0b21JY29uOiBNYXREYXRlcGlja2VyVG9nZ2xlSWNvbjtcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIF9pbnRsOiBNYXREYXRlcGlja2VySW50bCwgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7fVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBpZiAoY2hhbmdlcy5kYXRlcGlja2VyKSB7XHJcbiAgICAgIHRoaXMuX3dhdGNoU3RhdGVDaGFuZ2VzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuX3N0YXRlQ2hhbmdlcy51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgdGhpcy5fd2F0Y2hTdGF0ZUNoYW5nZXMoKTtcclxuICB9XHJcblxyXG4gIF9vcGVuKGV2ZW50OiBFdmVudCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuZGF0ZXBpY2tlciAmJiAhdGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICB0aGlzLmRhdGVwaWNrZXIub3BlbigpO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3dhdGNoU3RhdGVDaGFuZ2VzKCkge1xyXG4gICAgY29uc3QgZGF0ZXBpY2tlckRpc2FibGVkID0gdGhpcy5kYXRlcGlja2VyID8gdGhpcy5kYXRlcGlja2VyLl9kaXNhYmxlZENoYW5nZSA6IG9ic09mKCk7XHJcblxyXG4gICAgY29uc3QgaW5wdXREaXNhYmxlZCA9XHJcbiAgICAgIHRoaXMuZGF0ZXBpY2tlciAmJiB0aGlzLmRhdGVwaWNrZXIuX2RhdGVwaWNrZXJJbnB1dFxyXG4gICAgICAgID8gdGhpcy5kYXRlcGlja2VyLl9kYXRlcGlja2VySW5wdXQuX2Rpc2FibGVkQ2hhbmdlXHJcbiAgICAgICAgOiBvYnNPZigpO1xyXG5cclxuICAgIGNvbnN0IGRhdGVwaWNrZXJUb2dnbGVkID0gdGhpcy5kYXRlcGlja2VyXHJcbiAgICAgID8gbWVyZ2UodGhpcy5kYXRlcGlja2VyLm9wZW5lZFN0cmVhbSwgdGhpcy5kYXRlcGlja2VyLmNsb3NlZFN0cmVhbSlcclxuICAgICAgOiBvYnNPZigpO1xyXG5cclxuICAgIHRoaXMuX3N0YXRlQ2hhbmdlcy51bnN1YnNjcmliZSgpO1xyXG4gICAgdGhpcy5fc3RhdGVDaGFuZ2VzID0gbWVyZ2UoXHJcbiAgICAgIHRoaXMuX2ludGwuY2hhbmdlcyxcclxuICAgICAgZGF0ZXBpY2tlckRpc2FibGVkLFxyXG4gICAgICBpbnB1dERpc2FibGVkLFxyXG4gICAgICBkYXRlcGlja2VyVG9nZ2xlZFxyXG4gICAgKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCkpO1xyXG4gIH1cclxufVxyXG4iXX0=