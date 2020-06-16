import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { environment } from "./../../environments/environment";

import { Rate } from "./rate.model";

@Injectable({
  providedIn: "root",
})
export class RatesService {
  constructor(private http: HttpClient) {}

  getRates(date): Observable<Rate[]> {
    const FIXER_ACCESS_KEY = environment.FIXER_ACCESS_KEY;
    const url = `http://data.fixer.io/api/${date}?access_key=${FIXER_ACCESS_KEY}`;
    return this.http.get<Rate[]>(url);
  }
}
