import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ConverterComponent } from './converter/converter.component';
import { CurrencyService } from './services/currency.service';
import { ConverterService } from './services/converter.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ConverterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    ConverterComponent
  ],
  providers: [
    CurrencyService,
    ConverterService
  ]
})
export class ConverterModule { }
