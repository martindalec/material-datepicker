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
import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCalendar } from './calendar';
import { MatCalendarBody } from './calendar-body';
import { MatClockView } from './clock-view';
import { MAT_DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER, MatDatepicker, MatDatepickerContent } from './datepicker';
import { MatDatepickerInput } from './datepicker-input';
import { MatDatepickerIntl } from './datepicker-intl';
import { MatDatepickerToggle, MatDatepickerToggleIcon } from './datepicker-toggle';
import { MatMonthView } from './month-view';
import { MatYearView } from './year-view';
import { MatYearsView } from './years-view';
var MatDatepickerModule = /** @class */ (function () {
    function MatDatepickerModule() {
    }
    MatDatepickerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        MatButtonModule,
                        MatDialogModule,
                        MatIconModule,
                        OverlayModule,
                        A11yModule
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
export { MatDatepickerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci1tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWFydGluZGFsZWMvZGF0ZXBpY2tlci8iLCJzb3VyY2VzIjpbImRhdGVwaWNrZXItbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzNELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzVDLE9BQU8sRUFDTCwrQ0FBK0MsRUFDL0MsYUFBYSxFQUNiLG9CQUFvQixFQUNyQixNQUFNLGNBQWMsQ0FBQztBQUN0QixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzVDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDMUMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUU1QztJQUFBO0lBc0NrQyxDQUFDOztnQkF0Q2xDLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixlQUFlO3dCQUNmLGVBQWU7d0JBQ2YsYUFBYTt3QkFDYixhQUFhO3dCQUNiLFVBQVU7cUJBQ1g7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLFdBQVc7d0JBQ1gsZUFBZTt3QkFDZixhQUFhO3dCQUNiLG9CQUFvQjt3QkFDcEIsa0JBQWtCO3dCQUNsQixtQkFBbUI7d0JBQ25CLHVCQUF1Qjt3QkFDdkIsWUFBWTt3QkFDWixZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsWUFBWTtxQkFDYjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osV0FBVzt3QkFDWCxlQUFlO3dCQUNmLGFBQWE7d0JBQ2Isb0JBQW9CO3dCQUNwQixrQkFBa0I7d0JBQ2xCLG1CQUFtQjt3QkFDbkIsdUJBQXVCO3dCQUN2QixZQUFZO3dCQUNaLFlBQVk7d0JBQ1osV0FBVzt3QkFDWCxZQUFZO3FCQUNiO29CQUNELFNBQVMsRUFBRSxDQUFDLGlCQUFpQixFQUFFLCtDQUErQyxDQUFDO29CQUMvRSxlQUFlLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztpQkFDeEM7O0lBQ2lDLDBCQUFDO0NBQUEsQUF0Q25DLElBc0NtQztTQUF0QixtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcclxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxyXG4gKi9cclxuXHJcbmltcG9ydCB7IEExMXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XHJcbmltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XHJcbmltcG9ydCB7IE1hdERpYWxvZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XHJcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcclxuaW1wb3J0IHsgTWF0Q2FsZW5kYXIgfSBmcm9tICcuL2NhbGVuZGFyJztcclxuaW1wb3J0IHsgTWF0Q2FsZW5kYXJCb2R5IH0gZnJvbSAnLi9jYWxlbmRhci1ib2R5JztcclxuaW1wb3J0IHsgTWF0Q2xvY2tWaWV3IH0gZnJvbSAnLi9jbG9jay12aWV3JztcclxuaW1wb3J0IHtcclxuICBNQVRfREFURVBJQ0tFUl9TQ1JPTExfU1RSQVRFR1lfRkFDVE9SWV9QUk9WSURFUixcclxuICBNYXREYXRlcGlja2VyLFxyXG4gIE1hdERhdGVwaWNrZXJDb250ZW50XHJcbn0gZnJvbSAnLi9kYXRlcGlja2VyJztcclxuaW1wb3J0IHsgTWF0RGF0ZXBpY2tlcklucHV0IH0gZnJvbSAnLi9kYXRlcGlja2VyLWlucHV0JztcclxuaW1wb3J0IHsgTWF0RGF0ZXBpY2tlckludGwgfSBmcm9tICcuL2RhdGVwaWNrZXItaW50bCc7XHJcbmltcG9ydCB7IE1hdERhdGVwaWNrZXJUb2dnbGUsIE1hdERhdGVwaWNrZXJUb2dnbGVJY29uIH0gZnJvbSAnLi9kYXRlcGlja2VyLXRvZ2dsZSc7XHJcbmltcG9ydCB7IE1hdE1vbnRoVmlldyB9IGZyb20gJy4vbW9udGgtdmlldyc7XHJcbmltcG9ydCB7IE1hdFllYXJWaWV3IH0gZnJvbSAnLi95ZWFyLXZpZXcnO1xyXG5pbXBvcnQgeyBNYXRZZWFyc1ZpZXcgfSBmcm9tICcuL3llYXJzLXZpZXcnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICBNYXREaWFsb2dNb2R1bGUsXHJcbiAgICBNYXRJY29uTW9kdWxlLFxyXG4gICAgT3ZlcmxheU1vZHVsZSxcclxuICAgIEExMXlNb2R1bGVcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIE1hdENhbGVuZGFyLFxyXG4gICAgTWF0Q2FsZW5kYXJCb2R5LFxyXG4gICAgTWF0RGF0ZXBpY2tlcixcclxuICAgIE1hdERhdGVwaWNrZXJDb250ZW50LFxyXG4gICAgTWF0RGF0ZXBpY2tlcklucHV0LFxyXG4gICAgTWF0RGF0ZXBpY2tlclRvZ2dsZSxcclxuICAgIE1hdERhdGVwaWNrZXJUb2dnbGVJY29uLFxyXG4gICAgTWF0Q2xvY2tWaWV3LFxyXG4gICAgTWF0TW9udGhWaWV3LFxyXG4gICAgTWF0WWVhclZpZXcsXHJcbiAgICBNYXRZZWFyc1ZpZXdcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgTWF0Q2FsZW5kYXIsXHJcbiAgICBNYXRDYWxlbmRhckJvZHksXHJcbiAgICBNYXREYXRlcGlja2VyLFxyXG4gICAgTWF0RGF0ZXBpY2tlckNvbnRlbnQsXHJcbiAgICBNYXREYXRlcGlja2VySW5wdXQsXHJcbiAgICBNYXREYXRlcGlja2VyVG9nZ2xlLFxyXG4gICAgTWF0RGF0ZXBpY2tlclRvZ2dsZUljb24sXHJcbiAgICBNYXRDbG9ja1ZpZXcsXHJcbiAgICBNYXRNb250aFZpZXcsXHJcbiAgICBNYXRZZWFyVmlldyxcclxuICAgIE1hdFllYXJzVmlld1xyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbTWF0RGF0ZXBpY2tlckludGwsIE1BVF9EQVRFUElDS0VSX1NDUk9MTF9TVFJBVEVHWV9GQUNUT1JZX1BST1ZJREVSXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtNYXREYXRlcGlja2VyQ29udGVudF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE1hdERhdGVwaWNrZXJNb2R1bGUge31cclxuIl19