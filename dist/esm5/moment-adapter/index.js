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
var MomentDateModule = /** @class */ (function () {
    function MomentDateModule() {
    }
    MomentDateModule.decorators = [
        { type: NgModule, args: [{
                    providers: [{ provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] }]
                },] }
    ];
    return MomentDateModule;
}());
export { MomentDateModule };
var ɵ0 = MAT_MOMENT_DATE_FORMATS;
var MatMomentDateModule = /** @class */ (function () {
    function MatMomentDateModule() {
    }
    MatMomentDateModule.decorators = [
        { type: NgModule, args: [{
                    imports: [MomentDateModule],
                    providers: [{ provide: MAT_DATE_FORMATS, useValue: ɵ0 }]
                },] }
    ];
    return MatMomentDateModule;
}());
export { MatMomentDateModule };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWFydGluZGFsZWMvZGF0ZXBpY2tlci8iLCJzb3VyY2VzIjpbIm1vbWVudC1hZGFwdGVyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBUUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUVoRSxrQ0FBYyx1QkFBdUIsQ0FBQztBQUN0Qyx3Q0FBYyx1QkFBdUIsQ0FBQztBQUN0QyxPQUFPLEVBQUUsV0FBVyxFQUFrQixnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFL0Y7SUFBQTtJQUcrQixDQUFDOztnQkFIL0IsUUFBUSxTQUFDO29CQUNSLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQztpQkFDNUY7O0lBQzhCLHVCQUFDO0NBQUEsQUFIaEMsSUFHZ0M7U0FBbkIsZ0JBQWdCO1NBSXdCLHVCQUF1QjtBQUY1RTtJQUFBO0lBSWtDLENBQUM7O2dCQUpsQyxRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7b0JBQzNCLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsSUFBeUIsRUFBRSxDQUFDO2lCQUM5RTs7SUFDaUMsMEJBQUM7Q0FBQSxBQUpuQyxJQUltQztTQUF0QixtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXHJcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcclxuICovXHJcblxyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEYXRlQWRhcHRlciwgTUFUX0RBVEVfRk9STUFUUywgTUFUX0RBVEVfTE9DQUxFIH0gZnJvbSAnLi4vY29yZS9pbmRleCc7XHJcbmltcG9ydCB7IE1vbWVudERhdGVBZGFwdGVyIH0gZnJvbSAnLi9tb21lbnQtZGF0ZS1hZGFwdGVyJztcclxuaW1wb3J0IHsgTUFUX01PTUVOVF9EQVRFX0ZPUk1BVFMgfSBmcm9tICcuL21vbWVudC1kYXRlLWZvcm1hdHMnO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9tb21lbnQtZGF0ZS1hZGFwdGVyJztcclxuZXhwb3J0ICogZnJvbSAnLi9tb21lbnQtZGF0ZS1mb3JtYXRzJztcclxuZXhwb3J0IHsgRGF0ZUFkYXB0ZXIsIE1hdERhdGVGb3JtYXRzLCBNQVRfREFURV9GT1JNQVRTLCBNQVRfREFURV9MT0NBTEUgfSBmcm9tICcuLi9jb3JlL2luZGV4JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBEYXRlQWRhcHRlciwgdXNlQ2xhc3M6IE1vbWVudERhdGVBZGFwdGVyLCBkZXBzOiBbTUFUX0RBVEVfTE9DQUxFXSB9XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTW9tZW50RGF0ZU1vZHVsZSB7fVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbTW9tZW50RGF0ZU1vZHVsZV0sXHJcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBNQVRfREFURV9GT1JNQVRTLCB1c2VWYWx1ZTogTUFUX01PTUVOVF9EQVRFX0ZPUk1BVFMgfV1cclxufSlcclxuZXhwb3J0IGNsYXNzIE1hdE1vbWVudERhdGVNb2R1bGUge31cclxuIl19