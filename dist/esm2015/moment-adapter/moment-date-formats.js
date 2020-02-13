/**
 * @fileoverview added by tsickle
 * Generated from: moment-adapter/moment-date-formats.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** @type {?} */
export const MAT_MOMENT_DATE_FORMATS = {
    parse: {
        date: ['YYYY-MM-DD', 'YYYY/MM/DD', 'll'],
        datetime: ['YYYY-MM-DD HH:mm', 'YYYY/MM/DD HH:mm', 'll h:mma'],
        time: ['H:mm', 'HH:mm', 'h:mm a', 'hh:mm a']
    },
    display: {
        date: 'll',
        datetime: 'll h:mma',
        time: 'h:mm a',
        dateA11yLabel: 'LL',
        monthDayLabel: 'MMM D',
        monthDayA11yLabel: 'MMMM D',
        monthYearLabel: 'MMMM YYYY',
        monthYearA11yLabel: 'MMMM YYYY',
        timeLabel: 'HH:mm'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9tZW50LWRhdGUtZm9ybWF0cy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtYXJ0aW5kYWxlYy9kYXRlcGlja2VyLyIsInNvdXJjZXMiOlsibW9tZW50LWFkYXB0ZXIvbW9tZW50LWRhdGUtZm9ybWF0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBVUEsTUFBTSxPQUFPLHVCQUF1QixHQUFtQjtJQUNyRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQztRQUN4QyxRQUFRLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxrQkFBa0IsRUFBRSxVQUFVLENBQUM7UUFDOUQsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDO0tBQzdDO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLElBQUk7UUFDVixRQUFRLEVBQUUsVUFBVTtRQUNwQixJQUFJLEVBQUUsUUFBUTtRQUNkLGFBQWEsRUFBRSxJQUFJO1FBQ25CLGFBQWEsRUFBRSxPQUFPO1FBQ3RCLGlCQUFpQixFQUFFLFFBQVE7UUFDM0IsY0FBYyxFQUFFLFdBQVc7UUFDM0Isa0JBQWtCLEVBQUUsV0FBVztRQUMvQixTQUFTLEVBQUUsT0FBTztLQUNuQjtDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBsaWNlbnNlXHJcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKlxyXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxyXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgTWF0RGF0ZUZvcm1hdHMgfSBmcm9tICcuLi9jb3JlL2luZGV4JztcclxuXHJcbmV4cG9ydCBjb25zdCBNQVRfTU9NRU5UX0RBVEVfRk9STUFUUzogTWF0RGF0ZUZvcm1hdHMgPSB7XHJcbiAgcGFyc2U6IHtcclxuICAgIGRhdGU6IFsnWVlZWS1NTS1ERCcsICdZWVlZL01NL0REJywgJ2xsJ10sXHJcbiAgICBkYXRldGltZTogWydZWVlZLU1NLUREIEhIOm1tJywgJ1lZWVkvTU0vREQgSEg6bW0nLCAnbGwgaDptbWEnXSxcclxuICAgIHRpbWU6IFsnSDptbScsICdISDptbScsICdoOm1tIGEnLCAnaGg6bW0gYSddXHJcbiAgfSxcclxuICBkaXNwbGF5OiB7XHJcbiAgICBkYXRlOiAnbGwnLFxyXG4gICAgZGF0ZXRpbWU6ICdsbCBoOm1tYScsXHJcbiAgICB0aW1lOiAnaDptbSBhJyxcclxuICAgIGRhdGVBMTF5TGFiZWw6ICdMTCcsXHJcbiAgICBtb250aERheUxhYmVsOiAnTU1NIEQnLFxyXG4gICAgbW9udGhEYXlBMTF5TGFiZWw6ICdNTU1NIEQnLFxyXG4gICAgbW9udGhZZWFyTGFiZWw6ICdNTU1NIFlZWVknLFxyXG4gICAgbW9udGhZZWFyQTExeUxhYmVsOiAnTU1NTSBZWVlZJyxcclxuICAgIHRpbWVMYWJlbDogJ0hIOm1tJ1xyXG4gIH1cclxufTtcclxuIl19