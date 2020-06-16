import { Component, OnInit } from "@angular/core";

import { RatesService } from "../shared/rates.service";

@Component({
  selector: "app-all-currency-rates",
  templateUrl: "./all-currency-rates.component.html",
  styleUrls: ["./all-currency-rates.component.css"],
})
export class AllCurrencyRatesComponent implements OnInit {
  currencyCodes: Array<string>;
  fromCurrencyCode: string;
  fromAmount: number = 1;
  optionalDate: string;
  exchangeDate: string;
  allRates: Array<any>;
  loadingMsg: string;
  errorMsg: string;

  constructor(private ratesService: RatesService) {}

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

  getRates() {
    this.errorMsg = "";
    const date = this.optionalDate ? this.optionalDate : "latest";
    this.ratesService.getRates(date).subscribe((response: any) => {
      if (response && response.success) {
        const rates = response.rates;
        this.exchangeDate = response.date;
        this.calculateRates(rates);
      } else {
        if (response.error) this.errorMsg = response.error.info;
      }
    });
  }

  calculateRates(rates) {
    if (!rates[this.fromCurrencyCode]) {
      this.errorMsg = `FROM: currency code '${this.fromCurrencyCode}' did not match available currency codes`;
      return;
    }
    this.allRates = [];
    for (let key in rates) {
      const amountInEUR = this.fromAmount / rates[this.fromCurrencyCode];
      const amount = amountInEUR * rates[key];

      let rate = {
        currencyCode: key,
        amount: amount,
      };
      this.allRates.push(rate);
    }
  }
  clearResult() {
    this.allRates = null;
  }
}
