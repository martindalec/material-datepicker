/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '../core/index';
import { MomentDateAdapter } from './moment-date-adapter';
import { MAT_MOMENT_DATE_FORMATS } from './moment-date-formats';
export { MomentDateAdapter } from './moment-date-adapter';
export { MAT_MOMENT_DATE_FORMATS } from './moment-date-formats';
export { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '../core/index';
export class MomentDateModule {
}
MomentDateModule.decorators = [
    { type: NgModule, args: [{
                providers: [{ provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] }]
            },] }
];
const ɵ0 = MAT_MOMENT_DATE_FORMATS;
export class MatMomentDateModule {
}
MatMomentDateModule.decorators = [
    { type: NgModule, args: [{
                imports: [MomentDateModule],
                providers: [{ provide: MAT_DATE_FORMATS, useValue: ɵ0 }]
            },] }
];
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWFydGluZGFsZWMvZGF0ZXBpY2tlci8iLCJzb3VyY2VzIjpbIm1vbWVudC1hZGFwdGVyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUVoRSxrQ0FBYyx1QkFBdUIsQ0FBQztBQUN0Qyx3Q0FBYyx1QkFBdUIsQ0FBQztBQUN0QyxPQUFPLEVBQUUsV0FBVyxFQUFrQixnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFLL0YsTUFBTSxPQUFPLGdCQUFnQjs7O1lBSDVCLFFBQVEsU0FBQztnQkFDUixTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUM7YUFDNUY7O1dBS29ELHVCQUF1QjtBQUU1RSxNQUFNLE9BQU8sbUJBQW1COzs7WUFKL0IsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLGdCQUFnQixDQUFDO2dCQUMzQixTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLElBQXlCLEVBQUUsQ0FBQzthQUM5RSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcclxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxyXG4gKi9cclxuXHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERhdGVBZGFwdGVyLCBNQVRfREFURV9GT1JNQVRTLCBNQVRfREFURV9MT0NBTEUgfSBmcm9tICcuLi9jb3JlL2luZGV4JztcclxuaW1wb3J0IHsgTW9tZW50RGF0ZUFkYXB0ZXIgfSBmcm9tICcuL21vbWVudC1kYXRlLWFkYXB0ZXInO1xyXG5pbXBvcnQgeyBNQVRfTU9NRU5UX0RBVEVfRk9STUFUUyB9IGZyb20gJy4vbW9tZW50LWRhdGUtZm9ybWF0cyc7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL21vbWVudC1kYXRlLWFkYXB0ZXInO1xyXG5leHBvcnQgKiBmcm9tICcuL21vbWVudC1kYXRlLWZvcm1hdHMnO1xyXG5leHBvcnQgeyBEYXRlQWRhcHRlciwgTWF0RGF0ZUZvcm1hdHMsIE1BVF9EQVRFX0ZPUk1BVFMsIE1BVF9EQVRFX0xPQ0FMRSB9IGZyb20gJy4uL2NvcmUvaW5kZXgnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IERhdGVBZGFwdGVyLCB1c2VDbGFzczogTW9tZW50RGF0ZUFkYXB0ZXIsIGRlcHM6IFtNQVRfREFURV9MT0NBTEVdIH1dXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNb21lbnREYXRlTW9kdWxlIHt9XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtNb21lbnREYXRlTW9kdWxlXSxcclxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IE1BVF9EQVRFX0ZPUk1BVFMsIHVzZVZhbHVlOiBNQVRfTU9NRU5UX0RBVEVfRk9STUFUUyB9XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWF0TW9tZW50RGF0ZU1vZHVsZSB7fVxyXG4iXX0=