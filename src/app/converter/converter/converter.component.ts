import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConverterResponse } from '../models/converter-response.model';
import { Converter } from '../models/converter.model';
import { Currency } from '../models/currency.model';
import { ConverterService } from '../services/converter.service';
import { CurrencyService } from '../services/currency.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {

  _listCurrency: Currency[];
  _converter: Converter;
  _error: boolean;
  _converterResponse: ConverterResponse;
  showResults: boolean = false;
  newConsult: boolean = true;

  @ViewChild("converterForm", { static: true }) converterForm: NgForm;
  constructor(
    private currencyService: CurrencyService,
    private converterService: ConverterService,
  ) 
  {
    this._converter = new Converter();
   }


  ngOnInit(): void {
    this._listCurrency = this.currencyService.ListAll();
    this.init();
  }

  init(): void {
  	this._converter = new Converter('EUR', 'BRL', null);
  	this._error = false;
  }

  converter(): void {
  	if (this.converterForm.form.valid) {
          
  	  this.converterService
        .GetConverter(this._converter)
        .subscribe(
          response =>{ 
          this._converterResponse = response;
        }
          ,
          error => this._error = true
        );
        this.showResults = true;
        this.newConsult = false;
  	}
  }

  startNewConsult(): void{
    this.showResults = false;
    this.newConsult = true;
    this._converter.value = 0;
  }

  get valorConvertido(): string {
    if (this._converterResponse === undefined) {
      return '0';
    }
    
    return (this._converter.value * 
      this._converterResponse.rates[this._converter.currencyFor])
        .toFixed(2);
  }

  get cotacaoPara(): number {
    return this.converterService.priceFor(
      this._converterResponse, this._converter);
  }
}
