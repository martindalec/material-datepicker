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
export class NativeDateModule {
}
NativeDateModule.decorators = [
    { type: NgModule, args: [{
                imports: [PlatformModule],
                providers: [{ provide: DateAdapter, useClass: NativeDateAdapter }]
            },] }
];
const ɵ0 = MAT_NATIVE_DATE_FORMATS;
export class MatNativeDateModule {
}
MatNativeDateModule.decorators = [
    { type: NgModule, args: [{
                imports: [NativeDateModule],
                providers: [{ provide: MAT_DATE_FORMATS, useValue: ɵ0 }]
            },] }
];
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWFydGluZGFsZWMvZGF0ZXBpY2tlci8iLCJzb3VyY2VzIjpbImNvcmUvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFaEUsZ0dBQWMsZ0JBQWdCLENBQUM7QUFDL0IsaUNBQWMsZ0JBQWdCLENBQUM7QUFDL0Isa0NBQWMsdUJBQXVCLENBQUM7QUFDdEMsd0NBQWMsdUJBQXVCLENBQUM7QUFNdEMsTUFBTSxPQUFPLGdCQUFnQjs7O1lBSjVCLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxjQUFjLENBQUM7Z0JBQ3pCLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQzthQUNuRTs7V0FLb0QsdUJBQXVCO0FBRTVFLE1BQU0sT0FBTyxtQkFBbUI7OztZQUovQixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7Z0JBQzNCLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsSUFBeUIsRUFBRSxDQUFDO2FBQzlFIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXHJcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcclxuICovXHJcblxyXG5pbXBvcnQgeyBQbGF0Zm9ybU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERhdGVBZGFwdGVyIH0gZnJvbSAnLi9kYXRlLWFkYXB0ZXInO1xyXG5pbXBvcnQgeyBNQVRfREFURV9GT1JNQVRTIH0gZnJvbSAnLi9kYXRlLWZvcm1hdHMnO1xyXG5pbXBvcnQgeyBOYXRpdmVEYXRlQWRhcHRlciB9IGZyb20gJy4vbmF0aXZlLWRhdGUtYWRhcHRlcic7XHJcbmltcG9ydCB7IE1BVF9OQVRJVkVfREFURV9GT1JNQVRTIH0gZnJvbSAnLi9uYXRpdmUtZGF0ZS1mb3JtYXRzJztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vZGF0ZS1hZGFwdGVyJztcclxuZXhwb3J0ICogZnJvbSAnLi9kYXRlLWZvcm1hdHMnO1xyXG5leHBvcnQgKiBmcm9tICcuL25hdGl2ZS1kYXRlLWFkYXB0ZXInO1xyXG5leHBvcnQgKiBmcm9tICcuL25hdGl2ZS1kYXRlLWZvcm1hdHMnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbUGxhdGZvcm1Nb2R1bGVdLFxyXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogRGF0ZUFkYXB0ZXIsIHVzZUNsYXNzOiBOYXRpdmVEYXRlQWRhcHRlciB9XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmF0aXZlRGF0ZU1vZHVsZSB7fVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbTmF0aXZlRGF0ZU1vZHVsZV0sXHJcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBNQVRfREFURV9GT1JNQVRTLCB1c2VWYWx1ZTogTUFUX05BVElWRV9EQVRFX0ZPUk1BVFMgfV1cclxufSlcclxuZXhwb3J0IGNsYXNzIE1hdE5hdGl2ZURhdGVNb2R1bGUge31cclxuIl19