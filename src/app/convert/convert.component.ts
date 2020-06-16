import { Component, OnInit } from "@angular/core";

import { RatesService } from "../shared/rates.service";

import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/models/app-state.model";

import { HistoryItem } from "../store/models/history-item.model";

import { AddHistoryItemAction } from "src/app/store/actions/history.actions";

@Component({
  selector: "app-convert",
  templateUrl: "./convert.component.html",
  styleUrls: ["./convert.component.css"],
})
export class ConvertComponent implements OnInit {
  currencyCodes: Array<string>;
  fromAmount: number;
  fromCurrencyCode: string;
  toAmount: number;
  toCurrencyCode: string;
  optionalDate: Date;
  exchangeDate: string;
  loadingMsg: string;
  errorMsg: string;

  constructor(
    private ratesService: RatesService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.loadingMsg = "loading currency codes";
    this.ratesService.getRates("latest").subscribe((response: any) => {
      this.loadingMsg = "";
      if (response && response.success) {
        const rates = response.rates;
        this.currencyCodes = [];
        for (let key in rates) {
          this.currencyCodes.push(key);
        }
      } else {
        if (response.error) this.errorMsg = "Failed to load currency codes";
      }
    });
  }

  convert() {
    this.errorMsg = "";
    const date = this.optionalDate ? this.optionalDate : "latest";
    this.ratesService.getRates(date).subscribe((response: any) => {
      //console.log(response);
      if (response && response.success) {
        const rates = response.rates;
        this.exchangeDate = response.date;
        this.calculateToAmount(rates);
      } else {
        if (response.error) this.errorMsg = response.error.info;
      }
    });
  }

  calculateToAmount(rates) {
    if (!rates[this.fromCurrencyCode]) {
      this.errorMsg = `FROM: currency code '${this.fromCurrencyCode}' did not match available currency codes`;
      return;
    }
    if (!rates[this.toCurrencyCode]) {
      this.errorMsg = `TO: currency code '${this.toCurrencyCode}' did not match available currency codes`;
      return;
    }

    const amountInEUR = this.fromAmount / rates[this.fromCurrencyCode];
    this.toAmount = amountInEUR * rates[this.toCurrencyCode];

    const timeNow = new Date();
    const newHistoryItem: HistoryItem = {
      queryTime: timeNow,
      fromAmount: this.fromAmount,
      fromCurrencyCode: this.fromCurrencyCode,
      toAmount: this.toAmount,
      toCurrencyCode: this.toCurrencyCode,
      exchangeDate: this.exchangeDate,
    };

    this.store.dispatch(new AddHistoryItemAction(newHistoryItem));
  }

  clearResult() {
    this.toAmount = null;
  }
}
