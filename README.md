# Material DatePicker based on Material DatePicker by CoachCare

Fork of the official Material Datepicker for Angular v6 with timepicker support.

The datepicker allows users to enter a date either through text input, or by choosing a date from the calendar.  
It is made up of several components and directives that work together.

Further documentation can be found at the official docs:
https://material.angular.io/components/datepicker/overview

```
<mat-form-field>
  <input matInput [matDatepicker]="picker" placeholder="Choose a date">
  <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-datepicker #picker></mat-datepicker>
</mat-form-field>
```

The `mat-datepicker` has the following _input_ parameters:

- `startAt`: start Date/Moment, otherwise the current selected value
- `type`: `date | datetime | time` output type and available views. default: date
- `startView`: `clock | month | year | years` initial view to load. default: month
- `clockStep`: interval to use in the clock view. defailt: 1
- `twelveHour`: whether to use 12 or 24 hrs format. default: false
- `touchUi`: calendar UI mode. default: true (recommended)
- `disabled`: whether the datepicker pop-up should be disabled
- `matDatepicker`: whether the datepicker is connected to a date type one

and the `input[matDatepicker]` has the _output_:

- `dateChange`: Emits when a `change` event is fired on this `<input>`.
- `dateInput`: Emits when a `input` event is fired on this `<input>`.

## Installation

As usual run `npm install @martindalec/datepicker`.  
This module requires `moment` and `moment-timezome` for the MomentDateAdapter.

Now add the modules to your Angular Module:

```
import {
    MatDatepickerModule, MatMomentDateModule, MAT_DATE_FORMATS,
    MAT_DATE_LOCALE, MomentDateModule, MomentDateAdapter, DateAdapter,
    MatDateFormats
} from '@martindalec/datepicker';

/* Format as you desire, based on moment.js format strings */
export const MaterialDateFormats: MatDateFormats = {
    parse: {
        date: 'M/D/YYYY',
        datetime: 'M/D/YYYY hh:mm A',
        time: 'hh:mm A'
    },
    display: {
        date: 'MMMM/D/YYYY',
        datetime: 'M/D/YYYY hh:mm A',
        time: 'hh:mm A',
        dateA11yLabel: 'LL',
        monthDayLabel: 'MMMM DD, YYYY',
        monthDayA11yLabel: 'MMMM D',
        monthYearLabel: 'MMMM YYYY',
        monthYearA11yLabel: 'MMMM YYYY',
        timeLabel: 'HH:mm'
    },
};

@NgModule({
  imports: [
    MatDatepickerModule,
    MatMomentDateModule,
    ...
  ],
  providers: [
    ...,
    {
        provide: MAT_DATE_LOCALE,
        useValue: 'en'
    },
    {
        provide: DateAdapter,
        useClass: MomentDateAdapter,
        deps: [MAT_DATE_LOCALE]
    },
    {
        provide: MAT_DATE_FORMATS,
        useValue: MaterialDateFormats
    },
    ...
  ]
})
export class AppModule {}
```

**Note** that the `MatDatepickerModule` can be loaded into feature modules,  
but it requires the providers given by `MatMomentDateModule`,  
so it's recommended to be imported in your root Module.

## Styling

This module supports the Angular Material prebuilt themes that can be included in `angular.json`:

```
"styles": [
  "node_modules/@martindalec/datepicker/themes/indigo-pink.scss",
  ...
],
```

available themes are `deeppurple-amber`, `indigo-pink`, `pink-bluegrey` and `purple-green`.

You can use your customized Material Theme as usual:

```
@import '~@martindalec/datepicker/theming';

@include mat-datepicker-theme($theme);
```

Also, the primary color can be customized with CSS variables. The required ones are:

```
body {
  --bg-dialog: white;
  --primary: rgba(73, 200, 242, 1);
  --primary-contrast: #fff;
  --primary-a60: rgba(73, 200, 242, 0.6);
  --primary-a80: rgba(73, 200, 242, 0.8);
}
```

## Date Formats Customization

This fork uses an extended set of DateFormats,  
so please check [this file](https://github.com/martindalec/material-datepicker/blob/master/datepicker/src/lib/moment-adapter/moment-date-formats.ts#L11) if you're building your own.

## Usage Examples

### DateTime picker (year, month, date and clock views)

```
<mat-datepicker type="datetime" clockStep="5" #pickerStart></mat-datepicker>
```

### DateTime picker (starting on the clock view)

```
<mat-datepicker type="datetime" startView="clock" #startPicker></mat-datepicker>
```

### Time picker (clock views, with 5 minutes jump)

```
<mat-datepicker type="time" clockStep="5" #timeStart></mat-datepicker>
```
