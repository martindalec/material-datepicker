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
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ESCAPE, UP_ARROW } from '@angular/cdk/keycodes';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, InjectionToken, Input, NgZone, Optional, Output, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take, filter } from 'rxjs/operators';
import { merge, Subject, Subscription } from 'rxjs';
import { MatCalendar } from './calendar';
import { DateAdapter } from './core/index';
import { fadeInCalendar, transformPanel } from './datepicker-animations';
import { createMissingDateImplError } from './datepicker-errors';
/**
 * Used to generate a unique ID for each datepicker instance.
 * @type {?}
 */
var datepickerUid = 0;
/**
 * Injection token that determines the scroll handling while the calendar is open.
 * @type {?}
 */
export var MAT_DATEPICKER_SCROLL_STRATEGY = new InjectionToken('mat-datepicker-scroll-strategy');
/**
 * \@docs-private
 * @param {?} overlay
 * @return {?}
 */
export function MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY(overlay) {
    return (/**
     * @return {?}
     */
    function () { return overlay.scrollStrategies.reposition(); });
}
/**
 * \@docs-private
 * @type {?}
 */
export var MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: MAT_DATEPICKER_SCROLL_STRATEGY,
    deps: [Overlay],
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
        if (event.keyCode === ESCAPE) {
            this.datepicker.close();
            event.preventDefault();
            event.stopPropagation();
        }
    };
    MatDatepickerContent.decorators = [
        { type: Component, args: [{
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
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    preserveWhitespaces: false
                }] }
    ];
    MatDatepickerContent.propDecorators = {
        _calendar: [{ type: ViewChild, args: [MatCalendar,] }]
    };
    return MatDatepickerContent;
}());
export { MatDatepickerContent };
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
        this.openedStream = new EventEmitter();
        /**
         * Emits when the datepicker has been closed.
         */
        this.closedStream = new EventEmitter();
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
        this._inputSubscription = Subscription.EMPTY;
        /**
         * Emits when the datepicker is disabled.
         */
        this._disabledChange = new Subject();
        /**
         * Emits new selected date when selected date changes.
         */
        this._selectedChanged = new Subject();
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
            this._touchUi = coerceBooleanProperty(value);
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
            var newValue = coerceBooleanProperty(value);
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
            this._calendarPortal = new ComponentPortal(MatDatepickerContent, this._viewContainerRef);
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
                .pipe(take(1))
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
        var overlayConfig = new OverlayConfig({
            positionStrategy: this._createPopupPositionStrategy(),
            hasBackdrop: true,
            backdropClass: 'mat-overlay-transparent-backdrop',
            direction: this._dir,
            scrollStrategy: this._scrollStrategy(),
            panelClass: 'mat-datepicker-popup'
        });
        this._popupRef = this._overlay.create(overlayConfig);
        merge(this._popupRef.backdropClick(), this._popupRef.detachments(), this._popupRef.keydownEvents().pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            // Closing on alt + up is only valid when there's an input associated with the datepicker.
            return (event.keyCode === ESCAPE ||
                (_this._datepickerInput && event.altKey && event.keyCode === UP_ARROW));
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
        { type: Component, args: [{
                    selector: 'mat-datepicker',
                    template: '',
                    exportAs: 'matDatepicker',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    preserveWhitespaces: false
                }] }
    ];
    /** @nocollapse */
    MatDatepicker.ctorParameters = function () { return [
        { type: MatDialog },
        { type: Overlay },
        { type: NgZone },
        { type: ViewContainerRef },
        { type: undefined, decorators: [{ type: Inject, args: [MAT_DATEPICKER_SCROLL_STRATEGY,] }] },
        { type: DateAdapter, decorators: [{ type: Optional }] },
        { type: Directionality, decorators: [{ type: Optional }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] }
    ]; };
    MatDatepicker.propDecorators = {
        startAt: [{ type: Input }],
        type: [{ type: Input }],
        startView: [{ type: Input }],
        clockStep: [{ type: Input }],
        twelveHour: [{ type: Input }],
        touchUi: [{ type: Input }],
        disabled: [{ type: Input }],
        matDatepicker: [{ type: Input }],
        panelClass: [{ type: Input }],
        openedStream: [{ type: Output, args: ['opened',] }],
        closedStream: [{ type: Output, args: ['closed',] }],
        opened: [{ type: Input }]
    };
    return MatDatepicker;
}());
export { MatDatepicker };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtYXJ0aW5kYWxlYy9kYXRlcGlja2VyLyIsInNvdXJjZXMiOlsiZGF0ZXBpY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3pELE9BQU8sRUFDTCxPQUFPLEVBQ1AsYUFBYSxFQUlkLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFFVCxZQUFZLEVBQ1osTUFBTSxFQUNOLGNBQWMsRUFDZCxLQUFLLEVBQ0wsTUFBTSxFQUdOLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxFQUNULGdCQUFnQixFQUNoQixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBZ0IsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwRCxPQUFPLEVBQUUsV0FBVyxFQUFvQyxNQUFNLFlBQVksQ0FBQztBQUMzRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDekUsT0FBTyxFQUFFLDBCQUEwQixF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UUFBUTs7OzBCQXZKakIsS0FBSzt1QkFZTCxLQUFLOzRCQUdMLEtBQUs7NEJBR0wsS0FBSzs2QkFHTCxLQUFLOzBCQU1MLEtBQUs7MkJBVUwsS0FBSztnQ0FpQkwsS0FBSzs2QkFTTCxLQUFLOytCQUdMLE1BQU0sU0FBQyxRQUFROytCQUdmLE1BQU0sU0FBQyxRQUFRO3lCQUdmLEtBQUs7O0lBMFVSLG9CQUFDO0NBQUEsQUE1WkQsSUE0WkM7U0FwWlksYUFBYTs7Ozs7O0lBV3hCLGlDQUEyQjs7Ozs7SUFHM0IsNkJBQXdDOzs7OztJQUd4QyxrQ0FBOEM7Ozs7O0lBRzlDLGtDQUF1Qjs7Ozs7SUFHdkIsbUNBQTJCOzs7OztJQWEzQixpQ0FBd0I7Ozs7O0lBaUJ4QixrQ0FBMkI7O0lBUzNCLG9DQUE4Qjs7Ozs7SUFHOUIsbUNBQXVDOzs7OztJQUd2QyxxQ0FBOEU7Ozs7O0lBRzlFLHFDQUE4RTs7Ozs7SUFVOUUsZ0NBQXdCOzs7OztJQUd4QiwyQkFBeUM7Ozs7O0lBaUJ6Qyx1Q0FBd0M7Ozs7O0lBaUJ4QyxrQ0FBc0I7Ozs7OztJQUd0QixtQ0FBaUU7Ozs7OztJQUdqRSx3Q0FBa0U7Ozs7OztJQUdsRSwyQ0FBeUU7Ozs7OztJQUd6RSxrREFBNkQ7Ozs7OztJQUc3RCwyQ0FBZ0Q7Ozs7O0lBR2hELHlDQUF3Qzs7Ozs7SUFHeEMsd0NBQWtEOzs7OztJQUdsRCx5Q0FBNkM7Ozs7O0lBRzNDLGdDQUEwQjs7Ozs7SUFDMUIsaUNBQXlCOzs7OztJQUN6QixnQ0FBdUI7Ozs7O0lBQ3ZCLDBDQUEyQzs7Ozs7SUFDM0Msd0NBQStEOztJQUMvRCxxQ0FBK0M7Ozs7O0lBQy9DLDZCQUF3Qzs7Ozs7SUFDeEMsa0NBRXNCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXHJcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcclxuICovXHJcblxyXG5pbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcclxuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcclxuaW1wb3J0IHsgRVNDQVBFLCBVUF9BUlJPVyB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XHJcbmltcG9ydCB7XHJcbiAgT3ZlcmxheSxcclxuICBPdmVybGF5Q29uZmlnLFxyXG4gIE92ZXJsYXlSZWYsXHJcbiAgUG9zaXRpb25TdHJhdGVneSxcclxuICBTY3JvbGxTdHJhdGVneVxyXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcclxuaW1wb3J0IHsgQ29tcG9uZW50UG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XHJcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENvbXBvbmVudCxcclxuICBDb21wb25lbnRSZWYsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIEluamVjdCxcclxuICBJbmplY3Rpb25Ub2tlbixcclxuICBJbnB1dCxcclxuICBOZ1pvbmUsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9uSW5pdCxcclxuICBPcHRpb25hbCxcclxuICBPdXRwdXQsXHJcbiAgVmlld0NoaWxkLFxyXG4gIFZpZXdDb250YWluZXJSZWYsXHJcbiAgVmlld0VuY2Fwc3VsYXRpb25cclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTWF0RGlhbG9nLCBNYXREaWFsb2dSZWYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xyXG5pbXBvcnQgeyB0YWtlLCBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IG1lcmdlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgTWF0Q2FsZW5kYXIsIE1hdENhbGVuZGFyVHlwZSwgTWF0Q2FsZW5kYXJWaWV3IH0gZnJvbSAnLi9jYWxlbmRhcic7XHJcbmltcG9ydCB7IERhdGVBZGFwdGVyIH0gZnJvbSAnLi9jb3JlL2luZGV4JztcclxuaW1wb3J0IHsgZmFkZUluQ2FsZW5kYXIsIHRyYW5zZm9ybVBhbmVsIH0gZnJvbSAnLi9kYXRlcGlja2VyLWFuaW1hdGlvbnMnO1xyXG5pbXBvcnQgeyBjcmVhdGVNaXNzaW5nRGF0ZUltcGxFcnJvciB9IGZyb20gJy4vZGF0ZXBpY2tlci1lcnJvcnMnO1xyXG5pbXBvcnQgeyBNYXREYXRlcGlja2VySW5wdXQgfSBmcm9tICcuL2RhdGVwaWNrZXItaW5wdXQnO1xyXG5cclxuLyoqIFVzZWQgdG8gZ2VuZXJhdGUgYSB1bmlxdWUgSUQgZm9yIGVhY2ggZGF0ZXBpY2tlciBpbnN0YW5jZS4gKi9cclxubGV0IGRhdGVwaWNrZXJVaWQgPSAwO1xyXG5cclxuLyoqIEluamVjdGlvbiB0b2tlbiB0aGF0IGRldGVybWluZXMgdGhlIHNjcm9sbCBoYW5kbGluZyB3aGlsZSB0aGUgY2FsZW5kYXIgaXMgb3Blbi4gKi9cclxuZXhwb3J0IGNvbnN0IE1BVF9EQVRFUElDS0VSX1NDUk9MTF9TVFJBVEVHWSA9IG5ldyBJbmplY3Rpb25Ub2tlbjwoKSA9PiBTY3JvbGxTdHJhdGVneT4oXHJcbiAgJ21hdC1kYXRlcGlja2VyLXNjcm9sbC1zdHJhdGVneSdcclxuKTtcclxuXHJcbi8qKiBAZG9jcy1wcml2YXRlICovXHJcbmV4cG9ydCBmdW5jdGlvbiBNQVRfREFURVBJQ0tFUl9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWShvdmVybGF5OiBPdmVybGF5KTogKCkgPT4gU2Nyb2xsU3RyYXRlZ3kge1xyXG4gIHJldHVybiAoKSA9PiBvdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMucmVwb3NpdGlvbigpO1xyXG59XHJcblxyXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xyXG5leHBvcnQgY29uc3QgTUFUX0RBVEVQSUNLRVJfU0NST0xMX1NUUkFURUdZX0ZBQ1RPUllfUFJPVklERVIgPSB7XHJcbiAgcHJvdmlkZTogTUFUX0RBVEVQSUNLRVJfU0NST0xMX1NUUkFURUdZLFxyXG4gIGRlcHM6IFtPdmVybGF5XSxcclxuICB1c2VGYWN0b3J5OiBNQVRfREFURVBJQ0tFUl9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIENvbXBvbmVudCB1c2VkIGFzIHRoZSBjb250ZW50IGZvciB0aGUgZGF0ZXBpY2tlciBkaWFsb2cgYW5kIHBvcHVwLiBXZSB1c2UgdGhpcyBpbnN0ZWFkIG9mIHVzaW5nXHJcbiAqIE1hdENhbGVuZGFyIGRpcmVjdGx5IGFzIHRoZSBjb250ZW50IHNvIHdlIGNhbiBjb250cm9sIHRoZSBpbml0aWFsIGZvY3VzLiBUaGlzIGFsc28gZ2l2ZXMgdXMgYVxyXG4gKiBwbGFjZSB0byBwdXQgYWRkaXRpb25hbCBmZWF0dXJlcyBvZiB0aGUgcG9wdXAgdGhhdCBhcmUgbm90IHBhcnQgb2YgdGhlIGNhbGVuZGFyIGl0c2VsZiBpbiB0aGVcclxuICogZnV0dXJlLiAoZS5nLiBjb25maXJtYXRpb24gYnV0dG9ucykuXHJcbiAqIEBkb2NzLXByaXZhdGVcclxuICovXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbWF0LWRhdGVwaWNrZXItY29udGVudCcsXHJcbiAgdGVtcGxhdGVVcmw6ICdkYXRlcGlja2VyLWNvbnRlbnQuaHRtbCcsXHJcbiAgLy8gc3R5bGVVcmxzOiBbJ2RhdGVwaWNrZXItY29udGVudC5zY3NzJ10sXHJcbiAgaG9zdDoge1xyXG4gICAgY2xhc3M6ICdtYXQtZGF0ZXBpY2tlci1jb250ZW50JyxcclxuICAgICdbQHRyYW5zZm9ybVBhbmVsXSc6ICdcImVudGVyXCInLFxyXG4gICAgJ1tjbGFzcy5tYXQtZGF0ZXBpY2tlci1jb250ZW50LXRvdWNoXSc6ICdkYXRlcGlja2VyLnRvdWNoVWknLFxyXG4gICAgJyhrZXlkb3duKSc6ICdfaGFuZGxlS2V5ZG93bigkZXZlbnQpJ1xyXG4gIH0sXHJcbiAgYW5pbWF0aW9uczogW3RyYW5zZm9ybVBhbmVsLCBmYWRlSW5DYWxlbmRhcl0sXHJcbiAgZXhwb3J0QXM6ICdtYXREYXRlcGlja2VyQ29udGVudCcsXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWF0RGF0ZXBpY2tlckNvbnRlbnQ8RD4gaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcclxuICAvKiogUmVmZXJlbmNlIHRvIHRoZSBpbnRlcm5hbCBjYWxlbmRhciBjb21wb25lbnQuICovXHJcbiAgQFZpZXdDaGlsZChNYXRDYWxlbmRhcikgX2NhbGVuZGFyOiBNYXRDYWxlbmRhcjxEPjtcclxuXHJcbiAgLyoqIFJlZmVyZW5jZSB0byB0aGUgZGF0ZXBpY2tlciB0aGF0IGNyZWF0ZWQgdGhlIG92ZXJsYXkuICovXHJcbiAgZGF0ZXBpY2tlcjogTWF0RGF0ZXBpY2tlcjxEPjtcclxuXHJcbiAgLyoqIFdoZXRoZXIgdGhlIGRhdGVwaWNrZXIgaXMgYWJvdmUgb3IgYmVsb3cgdGhlIGlucHV0LiAqL1xyXG4gIF9pc0Fib3ZlOiBib29sZWFuO1xyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICB0aGlzLl9jYWxlbmRhci5mb2N1c0FjdGl2ZUNlbGwoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhhbmRsZXMga2V5ZG93biBldmVudCBvbiBkYXRlcGlja2VyIGNvbnRlbnQuXHJcbiAgICogQHBhcmFtIGV2ZW50IFRoZSBldmVudC5cclxuICAgKi9cclxuICBfaGFuZGxlS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xyXG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IEVTQ0FQRSkge1xyXG4gICAgICB0aGlzLmRhdGVwaWNrZXIuY2xvc2UoKTtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vLyBUT0RPKG1tYWxlcmJhKTogV2UgdXNlIGEgY29tcG9uZW50IGluc3RlYWQgb2YgYSBkaXJlY3RpdmUgaGVyZSBzbyB0aGUgdXNlciBjYW4gdXNlIGltcGxpY2l0XHJcbi8vIHRlbXBsYXRlIHJlZmVyZW5jZSB2YXJpYWJsZXMgKGUuZy4gI2QgdnMgI2Q9XCJtYXREYXRlcGlja2VyXCIpLiBXZSBjYW4gY2hhbmdlIHRoaXMgdG8gYSBkaXJlY3RpdmVcclxuLy8gaWYgYW5ndWxhciBhZGRzIHN1cHBvcnQgZm9yIGBleHBvcnRBczogJyRpbXBsaWNpdCdgIG9uIGRpcmVjdGl2ZXMuXHJcbi8qKiBDb21wb25lbnQgcmVzcG9uc2libGUgZm9yIG1hbmFnaW5nIHRoZSBkYXRlcGlja2VyIHBvcHVwL2RpYWxvZy4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdtYXQtZGF0ZXBpY2tlcicsXHJcbiAgdGVtcGxhdGU6ICcnLFxyXG4gIGV4cG9ydEFzOiAnbWF0RGF0ZXBpY2tlcicsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWF0RGF0ZXBpY2tlcjxEPiBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICAvKiogVGhlIGRhdGUgdG8gb3BlbiB0aGUgY2FsZW5kYXIgdG8gaW5pdGlhbGx5LiAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHN0YXJ0QXQoKTogRCB8IG51bGwge1xyXG4gICAgLy8gSWYgYW4gZXhwbGljaXQgc3RhcnRBdCBpcyBzZXQgd2Ugc3RhcnQgdGhlcmUsIG90aGVyd2lzZSB3ZSBzdGFydCBhdCB3aGF0ZXZlciB0aGUgY3VycmVudGx5XHJcbiAgICAvLyBzZWxlY3RlZCB2YWx1ZSBpcy5cclxuICAgIHJldHVybiB0aGlzLl9zdGFydEF0IHx8ICh0aGlzLl9kYXRlcGlja2VySW5wdXQgPyB0aGlzLl9kYXRlcGlja2VySW5wdXQudmFsdWUgOiBudWxsKTtcclxuICB9XHJcbiAgc2V0IHN0YXJ0QXQodmFsdWU6IEQgfCBudWxsKSB7XHJcbiAgICB0aGlzLl9zdGFydEF0ID0gdGhpcy5fZ2V0VmFsaWREYXRlT3JOdWxsKHRoaXMuX2RhdGVBZGFwdGVyLmRlc2VyaWFsaXplKHZhbHVlKSk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3N0YXJ0QXQ6IEQgfCBudWxsO1xyXG5cclxuICAvKiogVGhlIHR5cGUgb2YgdmFsdWUgaGFuZGxlZCBieSB0aGUgY2FsZW5kYXIuICovXHJcbiAgQElucHV0KCkgdHlwZTogTWF0Q2FsZW5kYXJUeXBlID0gJ2RhdGUnO1xyXG5cclxuICAvKiogV2hpY2ggdmlldyB0aGUgY2FsZW5kYXIgc2hvdWxkIGJlIHN0YXJ0ZWQgaW4uICovXHJcbiAgQElucHV0KCkgc3RhcnRWaWV3OiBNYXRDYWxlbmRhclZpZXcgPSAnbW9udGgnO1xyXG5cclxuICAvKiogQ2xvY2sgaW50ZXJ2YWwgKi9cclxuICBASW5wdXQoKSBjbG9ja1N0ZXAgPSAxO1xyXG5cclxuICAvKiogQ2xvY2sgaG91ciBmb3JtYXQgKi9cclxuICBASW5wdXQoKSB0d2VsdmVIb3VyID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0aGUgY2FsZW5kYXIgVUkgaXMgaW4gdG91Y2ggbW9kZS4gSW4gdG91Y2ggbW9kZSB0aGUgY2FsZW5kYXIgb3BlbnMgaW4gYSBkaWFsb2cgcmF0aGVyXHJcbiAgICogdGhhbiBhIHBvcHVwIGFuZCBlbGVtZW50cyBoYXZlIG1vcmUgcGFkZGluZyB0byBhbGxvdyBmb3IgYmlnZ2VyIHRvdWNoIHRhcmdldHMuXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBnZXQgdG91Y2hVaSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl90b3VjaFVpO1xyXG4gIH1cclxuICBzZXQgdG91Y2hVaSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fdG91Y2hVaSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3RvdWNoVWkgPSB0cnVlO1xyXG5cclxuICAvKiogV2hldGhlciB0aGUgZGF0ZXBpY2tlciBwb3AtdXAgc2hvdWxkIGJlIGRpc2FibGVkLiAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkID09PSB1bmRlZmluZWQgJiYgdGhpcy5fZGF0ZXBpY2tlcklucHV0XHJcbiAgICAgID8gdGhpcy5fZGF0ZXBpY2tlcklucHV0LmRpc2FibGVkXHJcbiAgICAgIDogISF0aGlzLl9kaXNhYmxlZDtcclxuICB9XHJcbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICBjb25zdCBuZXdWYWx1ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XHJcblxyXG4gICAgaWYgKG5ld1ZhbHVlICE9PSB0aGlzLl9kaXNhYmxlZCkge1xyXG4gICAgICB0aGlzLl9kaXNhYmxlZCA9IG5ld1ZhbHVlO1xyXG4gICAgICB0aGlzLl9kaXNhYmxlZENoYW5nZS5uZXh0KG5ld1ZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcbiAgcHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW47XHJcblxyXG4gIC8qKiBXaGV0aGVyIHRoZSBkYXRlcGlja2VyIGlzIGNvbm5lY3RlZCB0byBhIGRhdGUgdHlwZSBvbmUgKi9cclxuICBASW5wdXQoKVxyXG4gIHNldCBtYXREYXRlcGlja2VyKHZhbHVlOiBNYXREYXRlcGlja2VyPEQ+KSB7XHJcbiAgICBpZiAodmFsdWUpIHtcclxuICAgICAgdGhpcy5fZGF0ZXBpY2tlciA9IHZhbHVlO1xyXG4gICAgfVxyXG4gIH1cclxuICBfZGF0ZXBpY2tlcjogTWF0RGF0ZXBpY2tlcjxEPjtcclxuXHJcbiAgLyoqIENsYXNzZXMgdG8gYmUgcGFzc2VkIHRvIHRoZSBkYXRlIHBpY2tlciBwYW5lbC4gU3VwcG9ydHMgdGhlIHNhbWUgc3ludGF4IGFzIGBuZ0NsYXNzYC4gKi9cclxuICBASW5wdXQoKSBwYW5lbENsYXNzOiBzdHJpbmcgfCBzdHJpbmdbXTtcclxuXHJcbiAgLyoqIEVtaXRzIHdoZW4gdGhlIGRhdGVwaWNrZXIgaGFzIGJlZW4gb3BlbmVkLiAqL1xyXG4gIEBPdXRwdXQoJ29wZW5lZCcpIG9wZW5lZFN0cmVhbTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xyXG5cclxuICAvKiogRW1pdHMgd2hlbiB0aGUgZGF0ZXBpY2tlciBoYXMgYmVlbiBjbG9zZWQuICovXHJcbiAgQE91dHB1dCgnY2xvc2VkJykgY2xvc2VkU3RyZWFtOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XHJcblxyXG4gIC8qKiBXaGV0aGVyIHRoZSBjYWxlbmRhciBpcyBvcGVuLiAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IG9wZW5lZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9vcGVuZWQ7XHJcbiAgfVxyXG4gIHNldCBvcGVuZWQodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHZhbHVlID8gdGhpcy5vcGVuKCkgOiB0aGlzLmNsb3NlKCk7XHJcbiAgfVxyXG4gIHByaXZhdGUgX29wZW5lZCA9IGZhbHNlO1xyXG5cclxuICAvKiogVGhlIGlkIGZvciB0aGUgZGF0ZXBpY2tlciBjYWxlbmRhci4gKi9cclxuICBpZCA9IGBtYXQtZGF0ZXBpY2tlci0ke2RhdGVwaWNrZXJVaWQrK31gO1xyXG5cclxuICAvKiogVGhlIGN1cnJlbnRseSBzZWxlY3RlZCBkYXRlLiAqL1xyXG4gIGdldCBfc2VsZWN0ZWQoKTogRCB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMuX3ZhbGlkU2VsZWN0ZWQ7XHJcbiAgfVxyXG4gIHNldCBfc2VsZWN0ZWQodmFsdWU6IEQgfCBudWxsKSB7XHJcbiAgICBjb25zdCB2YWxpZCA9IHRoaXMuX2RhdGVBZGFwdGVyLmNsYW1wRGF0ZSh2YWx1ZSwgdGhpcy5fbWluRGF0ZSwgdGhpcy5fbWF4RGF0ZSk7XHJcbiAgICBpZiAodmFsaWQpIHtcclxuICAgICAgLy8gcm91bmQgdGhlIG1pbnV0ZXNcclxuICAgICAgbGV0IG1pbnV0ZXMgPSB0aGlzLl9kYXRlQWRhcHRlci5nZXRNaW51dGVzKHZhbGlkKTtcclxuICAgICAgbWludXRlcyA9IE1hdGgucm91bmQobWludXRlcyAvIHRoaXMuY2xvY2tTdGVwKSAqIHRoaXMuY2xvY2tTdGVwO1xyXG4gICAgICB0aGlzLl9kYXRlQWRhcHRlci5zZXRNaW51dGVzKHZhbGlkLCBtaW51dGVzKTtcclxuICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIuc2V0U2Vjb25kcyh2YWxpZCwgMCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl92YWxpZFNlbGVjdGVkID0gdmFsaWQ7XHJcbiAgfVxyXG4gIHByaXZhdGUgX3ZhbGlkU2VsZWN0ZWQ6IEQgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgLyoqIFRoZSBtaW5pbXVtIHNlbGVjdGFibGUgZGF0ZS4gKi9cclxuICBnZXQgX21pbkRhdGUoKTogRCB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RhdGVwaWNrZXJJbnB1dCAmJiB0aGlzLl9kYXRlcGlja2VySW5wdXQubWluO1xyXG4gIH1cclxuXHJcbiAgLyoqIFRoZSBtYXhpbXVtIHNlbGVjdGFibGUgZGF0ZS4gKi9cclxuICBnZXQgX21heERhdGUoKTogRCB8IG51bGwge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RhdGVwaWNrZXJJbnB1dCAmJiB0aGlzLl9kYXRlcGlja2VySW5wdXQubWF4O1xyXG4gIH1cclxuXHJcbiAgZ2V0IF9kYXRlRmlsdGVyKCk6IChkYXRlOiBEIHwgbnVsbCwgdW5pdD86IHN0cmluZykgPT4gYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGF0ZXBpY2tlcklucHV0ICYmIHRoaXMuX2RhdGVwaWNrZXJJbnB1dC5fZGF0ZUZpbHRlcjtcclxuICB9XHJcblxyXG4gIC8qKiBBIHJlZmVyZW5jZSB0byB0aGUgb3ZlcmxheSB3aGVuIHRoZSBjYWxlbmRhciBpcyBvcGVuZWQgYXMgYSBwb3B1cC4gKi9cclxuICBfcG9wdXBSZWY6IE92ZXJsYXlSZWY7XHJcblxyXG4gIC8qKiBBIHJlZmVyZW5jZSB0byB0aGUgZGlhbG9nIHdoZW4gdGhlIGNhbGVuZGFyIGlzIG9wZW5lZCBhcyBhIGRpYWxvZy4gKi9cclxuICBwcml2YXRlIF9kaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxNYXREYXRlcGlja2VyQ29udGVudDxEPj4gfCBudWxsO1xyXG5cclxuICAvKiogQSBwb3J0YWwgY29udGFpbmluZyB0aGUgY2FsZW5kYXIgZm9yIHRoaXMgZGF0ZXBpY2tlci4gKi9cclxuICBwcml2YXRlIF9jYWxlbmRhclBvcnRhbDogQ29tcG9uZW50UG9ydGFsPE1hdERhdGVwaWNrZXJDb250ZW50PEQ+PjtcclxuXHJcbiAgLyoqIFJlZmVyZW5jZSB0byB0aGUgY29tcG9uZW50IGluc3RhbnRpYXRlZCBpbiBwb3B1cCBtb2RlLiAqL1xyXG4gIHByaXZhdGUgX3BvcHVwQ29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8TWF0RGF0ZXBpY2tlckNvbnRlbnQ8RD4+IHwgbnVsbDtcclxuXHJcbiAgLyoqIFRoZSBlbGVtZW50IHRoYXQgd2FzIGZvY3VzZWQgYmVmb3JlIHRoZSBkYXRlcGlja2VyIHdhcyBvcGVuZWQuICovXHJcbiAgcHJpdmF0ZSBfZm9jdXNlZEVsZW1lbnRCZWZvcmVPcGVuOiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xyXG5cclxuICAvKiogU3Vic2NyaXB0aW9uIHRvIHZhbHVlIGNoYW5nZXMgaW4gdGhlIGFzc29jaWF0ZWQgaW5wdXQgZWxlbWVudC4gKi9cclxuICBwcml2YXRlIF9pbnB1dFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcclxuXHJcbiAgLyoqIFRoZSBpbnB1dCBlbGVtZW50IHRoaXMgZGF0ZXBpY2tlciBpcyBhc3NvY2lhdGVkIHdpdGguICovXHJcbiAgX2RhdGVwaWNrZXJJbnB1dDogTWF0RGF0ZXBpY2tlcklucHV0PEQ+O1xyXG5cclxuICAvKiogRW1pdHMgd2hlbiB0aGUgZGF0ZXBpY2tlciBpcyBkaXNhYmxlZC4gKi9cclxuICByZWFkb25seSBfZGlzYWJsZWRDaGFuZ2UgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xyXG5cclxuICAvKiogRW1pdHMgbmV3IHNlbGVjdGVkIGRhdGUgd2hlbiBzZWxlY3RlZCBkYXRlIGNoYW5nZXMuICovXHJcbiAgcmVhZG9ubHkgX3NlbGVjdGVkQ2hhbmdlZCA9IG5ldyBTdWJqZWN0PEQ+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBfZGlhbG9nOiBNYXREaWFsb2csXHJcbiAgICBwcml2YXRlIF9vdmVybGF5OiBPdmVybGF5LFxyXG4gICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsXHJcbiAgICBwcml2YXRlIF92aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgQEluamVjdChNQVRfREFURVBJQ0tFUl9TQ1JPTExfU1RSQVRFR1kpIHByaXZhdGUgX3Njcm9sbFN0cmF0ZWd5LFxyXG4gICAgQE9wdGlvbmFsKCkgcHVibGljIF9kYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXI8RD4sXHJcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9kaXI6IERpcmVjdGlvbmFsaXR5LFxyXG4gICAgQE9wdGlvbmFsKClcclxuICAgIEBJbmplY3QoRE9DVU1FTlQpXHJcbiAgICBwcml2YXRlIF9kb2N1bWVudDogYW55XHJcbiAgKSB7XHJcbiAgICBpZiAoIXRoaXMuX2RhdGVBZGFwdGVyKSB7XHJcbiAgICAgIHRocm93IGNyZWF0ZU1pc3NpbmdEYXRlSW1wbEVycm9yKCdEYXRlQWRhcHRlcicpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICAvLyBwcmV2ZW50IGluY29uc2lzdGVudCB0eXBlIGFuZCB2aWV3XHJcbiAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xyXG4gICAgICBjYXNlICdkYXRlJzpcclxuICAgICAgICB0aGlzLnN0YXJ0VmlldyA9IHRoaXMuc3RhcnRWaWV3ICE9PSAnY2xvY2snID8gdGhpcy5zdGFydFZpZXcgOiAnbW9udGgnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd0aW1lJzpcclxuICAgICAgICB0aGlzLnN0YXJ0VmlldyA9ICdjbG9jayc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgdGhpcy5zdGFydFZpZXcgPSB0aGlzLnN0YXJ0VmlldztcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fZGF0ZXBpY2tlcikge1xyXG4gICAgICB0aGlzLl9kYXRlcGlja2VyLl9zZWxlY3RlZENoYW5nZWQuc3Vic2NyaWJlKChkYXRlOiBEKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLl9kYXRlQWRhcHRlci5jcmVhdGVEYXRlKFxyXG4gICAgICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0WWVhcihkYXRlKSxcclxuICAgICAgICAgIHRoaXMuX2RhdGVBZGFwdGVyLmdldE1vbnRoKGRhdGUpLFxyXG4gICAgICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0RGF0ZShkYXRlKSxcclxuICAgICAgICAgIHRoaXMuX3NlbGVjdGVkID8gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0SG91cnModGhpcy5fc2VsZWN0ZWQpIDogMCxcclxuICAgICAgICAgIHRoaXMuX3NlbGVjdGVkID8gdGhpcy5fZGF0ZUFkYXB0ZXIuZ2V0TWludXRlcyh0aGlzLl9zZWxlY3RlZCkgOiAwXHJcbiAgICAgICAgKTtcclxuICAgICAgICAvLyB1cGRhdGUgdGhlIGNvcnJlc3BvbmRpbmcgY2hhbmdlc1xyXG4gICAgICAgIHRoaXMuX3NlbGVjdCh2YWx1ZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHJlZnJlc2ggdGhlIGlucHV0XHJcbiAgICB0aGlzLl9kYXRlcGlja2VySW5wdXQudmFsdWUgPSB0aGlzLl9zZWxlY3RlZDtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgdGhpcy5faW5wdXRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIHRoaXMuX3NlbGVjdGVkQ2hhbmdlZC5jb21wbGV0ZSgpO1xyXG4gICAgdGhpcy5fZGlzYWJsZWRDaGFuZ2UuY29tcGxldGUoKTtcclxuXHJcbiAgICBpZiAodGhpcy5fcG9wdXBSZWYpIHtcclxuICAgICAgdGhpcy5fcG9wdXBSZWYuZGlzcG9zZSgpO1xyXG4gICAgICB0aGlzLl9wb3B1cENvbXBvbmVudFJlZiA9IG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKiogU2VsZWN0cyB0aGUgZ2l2ZW4gZGF0ZSAqL1xyXG4gIF9zZWxlY3QoZGF0ZTogRCk6IHZvaWQge1xyXG4gICAgY29uc3Qgb2xkVmFsdWUgPSB0aGlzLl9zZWxlY3RlZDtcclxuICAgIHRoaXMuX3NlbGVjdGVkID0gZGF0ZTtcclxuICAgIGNvbnN0IHVuaXQgPSB0aGlzLnR5cGUuaW5kZXhPZigndGltZScpID49IDAgPyAnbWludXRlJyA6ICdkYXknO1xyXG4gICAgaWYgKCF0aGlzLl9kYXRlQWRhcHRlci5zYW1lRGF0ZShvbGRWYWx1ZSwgdGhpcy5fc2VsZWN0ZWQsIHVuaXQpKSB7XHJcbiAgICAgIHRoaXMuX3NlbGVjdGVkQ2hhbmdlZC5uZXh0KGRhdGUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVnaXN0ZXIgYW4gaW5wdXQgd2l0aCB0aGlzIGRhdGVwaWNrZXIuXHJcbiAgICogQHBhcmFtIGlucHV0IFRoZSBkYXRlcGlja2VyIGlucHV0IHRvIHJlZ2lzdGVyIHdpdGggdGhpcyBkYXRlcGlja2VyLlxyXG4gICAqL1xyXG4gIF9yZWdpc3RlcklucHV0KGlucHV0OiBNYXREYXRlcGlja2VySW5wdXQ8RD4pOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLl9kYXRlcGlja2VySW5wdXQpIHtcclxuICAgICAgdGhyb3cgRXJyb3IoJ0EgTWF0RGF0ZXBpY2tlciBjYW4gb25seSBiZSBhc3NvY2lhdGVkIHdpdGggYSBzaW5nbGUgaW5wdXQuJyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9kYXRlcGlja2VySW5wdXQgPSBpbnB1dDtcclxuICAgIHRoaXMuX2lucHV0U3Vic2NyaXB0aW9uID0gdGhpcy5fZGF0ZXBpY2tlcklucHV0Ll92YWx1ZUNoYW5nZS5zdWJzY3JpYmUoXHJcbiAgICAgICh2YWx1ZTogRCB8IG51bGwpID0+XHJcbiAgICAgICAgKHRoaXMuX3NlbGVjdGVkID1cclxuICAgICAgICAgIHZhbHVlICYmIHRoaXMuX2RhdGVBZGFwdGVyLmlzRGF0ZUluc3RhbmNlKHZhbHVlKSA/IHRoaXMuX2RhdGVBZGFwdGVyLmNsb25lKHZhbHVlKSA6IG51bGwpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqIE9wZW4gdGhlIGNhbGVuZGFyLiAqL1xyXG4gIG9wZW4oKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5fb3BlbmVkIHx8IHRoaXMuZGlzYWJsZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLl9kYXRlcGlja2VySW5wdXQpIHtcclxuICAgICAgdGhyb3cgRXJyb3IoJ0F0dGVtcHRlZCB0byBvcGVuIGFuIE1hdERhdGVwaWNrZXIgd2l0aCBubyBhc3NvY2lhdGVkIGlucHV0LicpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuX2RvY3VtZW50KSB7XHJcbiAgICAgIHRoaXMuX2ZvY3VzZWRFbGVtZW50QmVmb3JlT3BlbiA9IHRoaXMuX2RvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy50b3VjaFVpID8gdGhpcy5fb3BlbkFzRGlhbG9nKCkgOiB0aGlzLl9vcGVuQXNQb3B1cCgpO1xyXG4gICAgdGhpcy5fb3BlbmVkID0gdHJ1ZTtcclxuICAgIHRoaXMub3BlbmVkU3RyZWFtLmVtaXQoKTtcclxuICB9XHJcblxyXG4gIHJlc2V0KHZhbHVlPzogRCB8IG51bGwpIHtcclxuICAgIHRoaXMuX2RhdGVwaWNrZXJJbnB1dC5yZXNldCh2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICAvKiogQ2xvc2UgdGhlIGNhbGVuZGFyLiAqL1xyXG4gIGNsb3NlKCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLl9vcGVuZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuX3BvcHVwUmVmICYmIHRoaXMuX3BvcHVwUmVmLmhhc0F0dGFjaGVkKCkpIHtcclxuICAgICAgdGhpcy5fcG9wdXBSZWYuZGV0YWNoKCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5fZGlhbG9nUmVmKSB7XHJcbiAgICAgIHRoaXMuX2RpYWxvZ1JlZi5jbG9zZSgpO1xyXG4gICAgICB0aGlzLl9kaWFsb2dSZWYgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuX2NhbGVuZGFyUG9ydGFsICYmIHRoaXMuX2NhbGVuZGFyUG9ydGFsLmlzQXR0YWNoZWQpIHtcclxuICAgICAgdGhpcy5fY2FsZW5kYXJQb3J0YWwuZGV0YWNoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY29tcGxldGVDbG9zZSA9ICgpID0+IHtcclxuICAgICAgLy8gVGhlIGBfb3BlbmVkYCBjb3VsZCd2ZSBiZWVuIHJlc2V0IGFscmVhZHkgaWZcclxuICAgICAgLy8gd2UgZ290IHR3byBldmVudHMgaW4gcXVpY2sgc3VjY2Vzc2lvbi5cclxuICAgICAgaWYgKHRoaXMuX29wZW5lZCkge1xyXG4gICAgICAgIHRoaXMuX29wZW5lZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2xvc2VkU3RyZWFtLmVtaXQoKTtcclxuICAgICAgICB0aGlzLl9mb2N1c2VkRWxlbWVudEJlZm9yZU9wZW4gPSBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChcclxuICAgICAgdGhpcy5fZm9jdXNlZEVsZW1lbnRCZWZvcmVPcGVuICYmXHJcbiAgICAgIHR5cGVvZiB0aGlzLl9mb2N1c2VkRWxlbWVudEJlZm9yZU9wZW4uZm9jdXMgPT09ICdmdW5jdGlvbidcclxuICAgICkge1xyXG4gICAgICAvLyBCZWNhdXNlIElFIG1vdmVzIGZvY3VzIGFzeW5jaHJvbm91c2x5LCB3ZSBjYW4ndCBjb3VudCBvbiBpdCBiZWluZyByZXN0b3JlZCBiZWZvcmUgd2UndmVcclxuICAgICAgLy8gbWFya2VkIHRoZSBkYXRlcGlja2VyIGFzIGNsb3NlZC4gSWYgdGhlIGV2ZW50IGZpcmVzIG91dCBvZiBzZXF1ZW5jZSBhbmQgdGhlIGVsZW1lbnQgdGhhdFxyXG4gICAgICAvLyB3ZSdyZSByZWZvY3VzaW5nIG9wZW5zIHRoZSBkYXRlcGlja2VyIG9uIGZvY3VzLCB0aGUgdXNlciBjb3VsZCBiZSBzdHVjayB3aXRoIG5vdCBiZWluZ1xyXG4gICAgICAvLyBhYmxlIHRvIGNsb3NlIHRoZSBjYWxlbmRhciBhdCBhbGwuIFdlIHdvcmsgYXJvdW5kIGl0IGJ5IG1ha2luZyB0aGUgbG9naWMsIHRoYXQgbWFya3NcclxuICAgICAgLy8gdGhlIGRhdGVwaWNrZXIgYXMgY2xvc2VkLCBhc3luYyBhcyB3ZWxsLlxyXG4gICAgICB0aGlzLl9mb2N1c2VkRWxlbWVudEJlZm9yZU9wZW4uZm9jdXMoKTtcclxuICAgICAgc2V0VGltZW91dChjb21wbGV0ZUNsb3NlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbXBsZXRlQ2xvc2UoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBPcGVuIHRoZSBjYWxlbmRhciBhcyBhIGRpYWxvZy4gKi9cclxuICBwcml2YXRlIF9vcGVuQXNEaWFsb2coKTogdm9pZCB7XHJcbiAgICB0aGlzLl9kaWFsb2dSZWYgPSB0aGlzLl9kaWFsb2cub3BlbjxNYXREYXRlcGlja2VyQ29udGVudDxEPj4oTWF0RGF0ZXBpY2tlckNvbnRlbnQsIHtcclxuICAgICAgZGlyZWN0aW9uOiB0aGlzLl9kaXIgPyB0aGlzLl9kaXIudmFsdWUgOiAnbHRyJyxcclxuICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy5fdmlld0NvbnRhaW5lclJlZixcclxuICAgICAgcGFuZWxDbGFzczogJ21hdC1kYXRlcGlja2VyLWRpYWxvZydcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuX2RpYWxvZ1JlZi5hZnRlckNsb3NlZCgpLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNsb3NlKCkpO1xyXG4gICAgdGhpcy5fZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmRhdGVwaWNrZXIgPSB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqIE9wZW4gdGhlIGNhbGVuZGFyIGFzIGEgcG9wdXAuICovXHJcbiAgcHJpdmF0ZSBfb3BlbkFzUG9wdXAoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuX2NhbGVuZGFyUG9ydGFsKSB7XHJcbiAgICAgIHRoaXMuX2NhbGVuZGFyUG9ydGFsID0gbmV3IENvbXBvbmVudFBvcnRhbDxNYXREYXRlcGlja2VyQ29udGVudDxEPj4oXHJcbiAgICAgICAgTWF0RGF0ZXBpY2tlckNvbnRlbnQsXHJcbiAgICAgICAgdGhpcy5fdmlld0NvbnRhaW5lclJlZlxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5fcG9wdXBSZWYpIHtcclxuICAgICAgdGhpcy5fY3JlYXRlUG9wdXAoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMuX3BvcHVwUmVmLmhhc0F0dGFjaGVkKCkpIHtcclxuICAgICAgdGhpcy5fcG9wdXBDb21wb25lbnRSZWYgPSB0aGlzLl9wb3B1cFJlZi5hdHRhY2godGhpcy5fY2FsZW5kYXJQb3J0YWwpO1xyXG4gICAgICB0aGlzLl9wb3B1cENvbXBvbmVudFJlZi5pbnN0YW5jZS5kYXRlcGlja2VyID0gdGhpcztcclxuXHJcbiAgICAgIC8vIFVwZGF0ZSB0aGUgcG9zaXRpb24gb25jZSB0aGUgY2FsZW5kYXIgaGFzIHJlbmRlcmVkLlxyXG4gICAgICB0aGlzLl9uZ1pvbmUub25TdGFibGVcclxuICAgICAgICAuYXNPYnNlcnZhYmxlKClcclxuICAgICAgICAucGlwZSh0YWtlKDEpKVxyXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5fcG9wdXBSZWYudXBkYXRlUG9zaXRpb24oKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBDcmVhdGUgdGhlIHBvcHVwLiAqL1xyXG4gIHByaXZhdGUgX2NyZWF0ZVBvcHVwKCk6IHZvaWQge1xyXG4gICAgY29uc3Qgb3ZlcmxheUNvbmZpZyA9IG5ldyBPdmVybGF5Q29uZmlnKHtcclxuICAgICAgcG9zaXRpb25TdHJhdGVneTogdGhpcy5fY3JlYXRlUG9wdXBQb3NpdGlvblN0cmF0ZWd5KCksXHJcbiAgICAgIGhhc0JhY2tkcm9wOiB0cnVlLFxyXG4gICAgICBiYWNrZHJvcENsYXNzOiAnbWF0LW92ZXJsYXktdHJhbnNwYXJlbnQtYmFja2Ryb3AnLFxyXG4gICAgICBkaXJlY3Rpb246IHRoaXMuX2RpcixcclxuICAgICAgc2Nyb2xsU3RyYXRlZ3k6IHRoaXMuX3Njcm9sbFN0cmF0ZWd5KCksXHJcbiAgICAgIHBhbmVsQ2xhc3M6ICdtYXQtZGF0ZXBpY2tlci1wb3B1cCdcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuX3BvcHVwUmVmID0gdGhpcy5fb3ZlcmxheS5jcmVhdGUob3ZlcmxheUNvbmZpZyk7XHJcblxyXG4gICAgbWVyZ2UoXHJcbiAgICAgIHRoaXMuX3BvcHVwUmVmLmJhY2tkcm9wQ2xpY2soKSxcclxuICAgICAgdGhpcy5fcG9wdXBSZWYuZGV0YWNobWVudHMoKSxcclxuICAgICAgdGhpcy5fcG9wdXBSZWYua2V5ZG93bkV2ZW50cygpLnBpcGUoXHJcbiAgICAgICAgZmlsdGVyKGV2ZW50ID0+IHtcclxuICAgICAgICAgIC8vIENsb3Npbmcgb24gYWx0ICsgdXAgaXMgb25seSB2YWxpZCB3aGVuIHRoZXJlJ3MgYW4gaW5wdXQgYXNzb2NpYXRlZCB3aXRoIHRoZSBkYXRlcGlja2VyLlxyXG4gICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgZXZlbnQua2V5Q29kZSA9PT0gRVNDQVBFIHx8XHJcbiAgICAgICAgICAgICh0aGlzLl9kYXRlcGlja2VySW5wdXQgJiYgZXZlbnQuYWx0S2V5ICYmIGV2ZW50LmtleUNvZGUgPT09IFVQX0FSUk9XKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9KVxyXG4gICAgICApXHJcbiAgICApLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNsb3NlKCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqIENyZWF0ZSB0aGUgcG9wdXAgUG9zaXRpb25TdHJhdGVneS4gKi9cclxuICBwcml2YXRlIF9jcmVhdGVQb3B1cFBvc2l0aW9uU3RyYXRlZ3koKTogUG9zaXRpb25TdHJhdGVneSB7XHJcbiAgICByZXR1cm4gdGhpcy5fb3ZlcmxheVxyXG4gICAgICAucG9zaXRpb24oKVxyXG4gICAgICAuZmxleGlibGVDb25uZWN0ZWRUbyh0aGlzLl9kYXRlcGlja2VySW5wdXQuZ2V0UG9wdXBDb25uZWN0aW9uRWxlbWVudFJlZigpKVxyXG4gICAgICAud2l0aFRyYW5zZm9ybU9yaWdpbk9uKCcubWF0LWRhdGVwaWNrZXItY29udGVudCcpXHJcbiAgICAgIC53aXRoRmxleGlibGVEaW1lbnNpb25zKGZhbHNlKVxyXG4gICAgICAud2l0aFZpZXdwb3J0TWFyZ2luKDgpXHJcbiAgICAgIC53aXRoUHVzaChmYWxzZSlcclxuICAgICAgLndpdGhQb3NpdGlvbnMoW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIG9yaWdpblg6ICdzdGFydCcsXHJcbiAgICAgICAgICBvcmlnaW5ZOiAnYm90dG9tJyxcclxuICAgICAgICAgIG92ZXJsYXlYOiAnc3RhcnQnLFxyXG4gICAgICAgICAgb3ZlcmxheVk6ICd0b3AnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBvcmlnaW5YOiAnc3RhcnQnLFxyXG4gICAgICAgICAgb3JpZ2luWTogJ3RvcCcsXHJcbiAgICAgICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcclxuICAgICAgICAgIG92ZXJsYXlZOiAnYm90dG9tJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgb3JpZ2luWDogJ2VuZCcsXHJcbiAgICAgICAgICBvcmlnaW5ZOiAnYm90dG9tJyxcclxuICAgICAgICAgIG92ZXJsYXlYOiAnZW5kJyxcclxuICAgICAgICAgIG92ZXJsYXlZOiAndG9wJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgb3JpZ2luWDogJ2VuZCcsXHJcbiAgICAgICAgICBvcmlnaW5ZOiAndG9wJyxcclxuICAgICAgICAgIG92ZXJsYXlYOiAnZW5kJyxcclxuICAgICAgICAgIG92ZXJsYXlZOiAnYm90dG9tJ1xyXG4gICAgICAgIH1cclxuICAgICAgXSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gb2JqIFRoZSBvYmplY3QgdG8gY2hlY2suXHJcbiAgICogQHJldHVybnMgVGhlIGdpdmVuIG9iamVjdCBpZiBpdCBpcyBib3RoIGEgZGF0ZSBpbnN0YW5jZSBhbmQgdmFsaWQsIG90aGVyd2lzZSBudWxsLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2dldFZhbGlkRGF0ZU9yTnVsbChvYmo6IGFueSk6IEQgfCBudWxsIHtcclxuICAgIHJldHVybiB0aGlzLl9kYXRlQWRhcHRlci5pc0RhdGVJbnN0YW5jZShvYmopICYmIHRoaXMuX2RhdGVBZGFwdGVyLmlzVmFsaWQob2JqKSA/IG9iaiA6IG51bGw7XHJcbiAgfVxyXG59XHJcbiJdfQ==