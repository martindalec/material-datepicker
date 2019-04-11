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
/** @type {?} */
export const MAT_NATIVE_DATE_FORMATS = {
    parse: {
        date: null,
        datetime: null,
        time: null
    },
    display: {
        date: { year: 'numeric', month: 'numeric', day: 'numeric' },
        datetime: {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hours: 'numeric',
            minutes: 'numeric'
        },
        time: { hours: 'numeric', minutes: 'numeric' },
        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthDayLabel: { month: 'short', day: 'numeric' },
        monthDayA11yLabel: { month: 'long', day: 'numeric' },
        monthYearLabel: { year: 'numeric', month: 'short' },
        monthYearA11yLabel: { year: 'numeric', month: 'long' },
        timeLabel: { hours: 'numeric', minutes: 'numeric' }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlLWRhdGUtZm9ybWF0cy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtYXJ0aW5kYWxlYy9kYXRlcGlja2VyLyIsInNvdXJjZXMiOlsiY29yZS9uYXRpdmUtZGF0ZS1mb3JtYXRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQVVBLE1BQU0sT0FBTyx1QkFBdUIsR0FBbUI7SUFDckQsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLElBQUk7UUFDVixRQUFRLEVBQUUsSUFBSTtRQUNkLElBQUksRUFBRSxJQUFJO0tBQ1g7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRTtRQUMzRCxRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsU0FBUztZQUNmLEtBQUssRUFBRSxTQUFTO1lBQ2hCLEdBQUcsRUFBRSxTQUFTO1lBQ2QsS0FBSyxFQUFFLFNBQVM7WUFDaEIsT0FBTyxFQUFFLFNBQVM7U0FDbkI7UUFDRCxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUU7UUFDOUMsYUFBYSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUU7UUFDakUsYUFBYSxFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFO1FBQ2pELGlCQUFpQixFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFO1FBQ3BELGNBQWMsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRTtRQUNuRCxrQkFBa0IsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRTtRQUN0RCxTQUFTLEVBQUUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUU7S0FDcEQ7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAbGljZW5zZVxyXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKlxyXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxyXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgTWF0RGF0ZUZvcm1hdHMgfSBmcm9tICcuL2RhdGUtZm9ybWF0cyc7XHJcblxyXG5leHBvcnQgY29uc3QgTUFUX05BVElWRV9EQVRFX0ZPUk1BVFM6IE1hdERhdGVGb3JtYXRzID0ge1xyXG4gIHBhcnNlOiB7XHJcbiAgICBkYXRlOiBudWxsLFxyXG4gICAgZGF0ZXRpbWU6IG51bGwsXHJcbiAgICB0aW1lOiBudWxsXHJcbiAgfSxcclxuICBkaXNwbGF5OiB7XHJcbiAgICBkYXRlOiB7IHllYXI6ICdudW1lcmljJywgbW9udGg6ICdudW1lcmljJywgZGF5OiAnbnVtZXJpYycgfSxcclxuICAgIGRhdGV0aW1lOiB7XHJcbiAgICAgIHllYXI6ICdudW1lcmljJyxcclxuICAgICAgbW9udGg6ICdudW1lcmljJyxcclxuICAgICAgZGF5OiAnbnVtZXJpYycsXHJcbiAgICAgIGhvdXJzOiAnbnVtZXJpYycsXHJcbiAgICAgIG1pbnV0ZXM6ICdudW1lcmljJ1xyXG4gICAgfSxcclxuICAgIHRpbWU6IHsgaG91cnM6ICdudW1lcmljJywgbWludXRlczogJ251bWVyaWMnIH0sXHJcbiAgICBkYXRlQTExeUxhYmVsOiB7IHllYXI6ICdudW1lcmljJywgbW9udGg6ICdsb25nJywgZGF5OiAnbnVtZXJpYycgfSxcclxuICAgIG1vbnRoRGF5TGFiZWw6IHsgbW9udGg6ICdzaG9ydCcsIGRheTogJ251bWVyaWMnIH0sXHJcbiAgICBtb250aERheUExMXlMYWJlbDogeyBtb250aDogJ2xvbmcnLCBkYXk6ICdudW1lcmljJyB9LFxyXG4gICAgbW9udGhZZWFyTGFiZWw6IHsgeWVhcjogJ251bWVyaWMnLCBtb250aDogJ3Nob3J0JyB9LFxyXG4gICAgbW9udGhZZWFyQTExeUxhYmVsOiB7IHllYXI6ICdudW1lcmljJywgbW9udGg6ICdsb25nJyB9LFxyXG4gICAgdGltZUxhYmVsOiB7IGhvdXJzOiAnbnVtZXJpYycsIG1pbnV0ZXM6ICdudW1lcmljJyB9XHJcbiAgfVxyXG59O1xyXG4iXX0=