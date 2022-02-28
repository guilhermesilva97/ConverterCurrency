import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConverterResponse } from '../models/converter-response.model';
import { Converter } from '../models/converter.model';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {
  
  private readonly BASE_URL = "http://data.fixer.io/api/latest";

  constructor(private http: HttpClient) {}

  GetConverter(converter: Converter): Observable<any> {

  let params = `?base=${converter.currencyOf}&symbols=${converter.currencyFor}&access_key=5aa1b3f2b7eb5e2855d4ab62d97fc615`;
   
       return this.http.get(this.BASE_URL + params);
  }

  priceFor(converterResponse: ConverterResponse, 
  converter: Converter): number {
  if (converterResponse === undefined) {
  return 0;
  }
  return converterResponse.rates[converter.currencyFor];
  }
  

  priceOf(converterResponse: ConverterResponse, 
    converter: Converter): string {
  if (converterResponse === undefined) {
  return '0';
  }
  return (1 / converterResponse.rates[converter.currencyOf])
  .toFixed(4);
  }
  
}
