/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { NgModule } from '@angular/core';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MAT_DATE_LOCALE_PROVIDER
} from './core';
import { MomentDateAdapter } from './moment-adapter/moment-date-adapter';
import { MAT_MOMENT_DATE_FORMATS } from './moment-adapter/moment-date-formats';

export * from './moment-adapter/moment-date-adapter';
export * from './moment-adapter/moment-date-formats';

@NgModule({
  providers: [
    MAT_DATE_LOCALE_PROVIDER,
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] }
  ]
})
export class MomentDateModule {}

@NgModule({
  imports: [MomentDateModule],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }]
})
export class MatMomentDateModule {}