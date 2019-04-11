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
/** @type {?} */
export var MAT_MOMENT_DATE_FORMATS = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9tZW50LWRhdGUtZm9ybWF0cy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtYXJ0aW5kYWxlYy9kYXRlcGlja2VyLyIsInNvdXJjZXMiOlsibW9tZW50LWFkYXB0ZXIvbW9tZW50LWRhdGUtZm9ybWF0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFVQSxNQUFNLEtBQU8sdUJBQXVCLEdBQW1CO0lBQ3JELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDO1FBQ3hDLFFBQVEsRUFBRSxDQUFDLGtCQUFrQixFQUFFLGtCQUFrQixFQUFFLFVBQVUsQ0FBQztRQUM5RCxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUM7S0FDN0M7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsSUFBSTtRQUNWLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLElBQUksRUFBRSxRQUFRO1FBQ2QsYUFBYSxFQUFFLElBQUk7UUFDbkIsYUFBYSxFQUFFLE9BQU87UUFDdEIsaUJBQWlCLEVBQUUsUUFBUTtRQUMzQixjQUFjLEVBQUUsV0FBVztRQUMzQixrQkFBa0IsRUFBRSxXQUFXO1FBQy9CLFNBQVMsRUFBRSxPQUFPO0tBQ25CO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXHJcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcclxuICovXHJcblxyXG5pbXBvcnQgeyBNYXREYXRlRm9ybWF0cyB9IGZyb20gJy4uL2NvcmUvaW5kZXgnO1xyXG5cclxuZXhwb3J0IGNvbnN0IE1BVF9NT01FTlRfREFURV9GT1JNQVRTOiBNYXREYXRlRm9ybWF0cyA9IHtcclxuICBwYXJzZToge1xyXG4gICAgZGF0ZTogWydZWVlZLU1NLUREJywgJ1lZWVkvTU0vREQnLCAnbGwnXSxcclxuICAgIGRhdGV0aW1lOiBbJ1lZWVktTU0tREQgSEg6bW0nLCAnWVlZWS9NTS9ERCBISDptbScsICdsbCBoOm1tYSddLFxyXG4gICAgdGltZTogWydIOm1tJywgJ0hIOm1tJywgJ2g6bW0gYScsICdoaDptbSBhJ11cclxuICB9LFxyXG4gIGRpc3BsYXk6IHtcclxuICAgIGRhdGU6ICdsbCcsXHJcbiAgICBkYXRldGltZTogJ2xsIGg6bW1hJyxcclxuICAgIHRpbWU6ICdoOm1tIGEnLFxyXG4gICAgZGF0ZUExMXlMYWJlbDogJ0xMJyxcclxuICAgIG1vbnRoRGF5TGFiZWw6ICdNTU0gRCcsXHJcbiAgICBtb250aERheUExMXlMYWJlbDogJ01NTU0gRCcsXHJcbiAgICBtb250aFllYXJMYWJlbDogJ01NTU0gWVlZWScsXHJcbiAgICBtb250aFllYXJBMTF5TGFiZWw6ICdNTU1NIFlZWVknLFxyXG4gICAgdGltZUxhYmVsOiAnSEg6bW0nXHJcbiAgfVxyXG59O1xyXG4iXX0=