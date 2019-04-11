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
import { PlatformModule } from '@angular/cdk/platform';
import { NgModule } from '@angular/core';
import { DateAdapter } from './date-adapter';
import { MAT_DATE_FORMATS } from './date-formats';
import { NativeDateAdapter } from './native-date-adapter';
import { MAT_NATIVE_DATE_FORMATS } from './native-date-formats';
export { MAT_DATE_LOCALE_FACTORY, MAT_DATE_LOCALE, MAT_DATE_LOCALE_PROVIDER, DateAdapter } from './date-adapter';
export { MAT_DATE_FORMATS } from './date-formats';
export { NativeDateAdapter } from './native-date-adapter';
export { MAT_NATIVE_DATE_FORMATS } from './native-date-formats';
var NativeDateModule = /** @class */ (function () {
    function NativeDateModule() {
    }
    NativeDateModule.decorators = [
        { type: NgModule, args: [{
                    imports: [PlatformModule],
                    providers: [{ provide: DateAdapter, useClass: NativeDateAdapter }]
                },] }
    ];
    return NativeDateModule;
}());
export { NativeDateModule };
var ɵ0 = MAT_NATIVE_DATE_FORMATS;
var MatNativeDateModule = /** @class */ (function () {
    function MatNativeDateModule() {
    }
    MatNativeDateModule.decorators = [
        { type: NgModule, args: [{
                    imports: [NativeDateModule],
                    providers: [{ provide: MAT_DATE_FORMATS, useValue: ɵ0 }]
                },] }
    ];
    return MatNativeDateModule;
}());
export { MatNativeDateModule };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWFydGluZGFsZWMvZGF0ZXBpY2tlci8iLCJzb3VyY2VzIjpbImNvcmUvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFaEUsZ0dBQWMsZ0JBQWdCLENBQUM7QUFDL0IsaUNBQWMsZ0JBQWdCLENBQUM7QUFDL0Isa0NBQWMsdUJBQXVCLENBQUM7QUFDdEMsd0NBQWMsdUJBQXVCLENBQUM7QUFFdEM7SUFBQTtJQUkrQixDQUFDOztnQkFKL0IsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLGNBQWMsQ0FBQztvQkFDekIsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxDQUFDO2lCQUNuRTs7SUFDOEIsdUJBQUM7Q0FBQSxBQUpoQyxJQUlnQztTQUFuQixnQkFBZ0I7U0FJd0IsdUJBQXVCO0FBRjVFO0lBQUE7SUFJa0MsQ0FBQzs7Z0JBSmxDLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztvQkFDM0IsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxJQUF5QixFQUFFLENBQUM7aUJBQzlFOztJQUNpQywwQkFBQztDQUFBLEFBSm5DLElBSW1DO1NBQXRCLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKlxyXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxyXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgUGxhdGZvcm1Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEYXRlQWRhcHRlciB9IGZyb20gJy4vZGF0ZS1hZGFwdGVyJztcclxuaW1wb3J0IHsgTUFUX0RBVEVfRk9STUFUUyB9IGZyb20gJy4vZGF0ZS1mb3JtYXRzJztcclxuaW1wb3J0IHsgTmF0aXZlRGF0ZUFkYXB0ZXIgfSBmcm9tICcuL25hdGl2ZS1kYXRlLWFkYXB0ZXInO1xyXG5pbXBvcnQgeyBNQVRfTkFUSVZFX0RBVEVfRk9STUFUUyB9IGZyb20gJy4vbmF0aXZlLWRhdGUtZm9ybWF0cyc7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL2RhdGUtYWRhcHRlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vZGF0ZS1mb3JtYXRzJztcclxuZXhwb3J0ICogZnJvbSAnLi9uYXRpdmUtZGF0ZS1hZGFwdGVyJztcclxuZXhwb3J0ICogZnJvbSAnLi9uYXRpdmUtZGF0ZS1mb3JtYXRzJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1BsYXRmb3JtTW9kdWxlXSxcclxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IERhdGVBZGFwdGVyLCB1c2VDbGFzczogTmF0aXZlRGF0ZUFkYXB0ZXIgfV1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5hdGl2ZURhdGVNb2R1bGUge31cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW05hdGl2ZURhdGVNb2R1bGVdLFxyXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogTUFUX0RBVEVfRk9STUFUUywgdXNlVmFsdWU6IE1BVF9OQVRJVkVfREFURV9GT1JNQVRTIH1dXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXROYXRpdmVEYXRlTW9kdWxlIHt9XHJcbiJdfQ==