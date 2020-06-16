import { Component, OnInit } from "@angular/core";

import { RatesService } from "../shared/rates.service";

@Component({
  selector: "app-all-currency-rates",
  templateUrl: "./all-currency-rates.component.html",
  styleUrls: ["./all-currency-rates.component.css"],
})
export class AllCurrencyRatesComponent implements OnInit {
  fromCurrencyCode: string;
  fromAmount: number = 1;
  optionalDate: string;
  exchangeDate: string;
  allRates: Array<any>;
  errorMsg: string;

  constructor(private ratesService: RatesService) {}

  ngOnInit(): void {}

  getRates() {
    this.errorMsg = "";
    const date = this.optionalDate ? this.optionalDate : "latest";
    this.ratesService.getRates(date).subscribe((response: any) => {
      //console.log(response);
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
    //console.log(rates);
    this.allRates = [];
    for (let key in rates) {
      const amountInEUR = this.fromAmount / rates[this.fromCurrencyCode];
      const amount = amountInEUR * rates[key];

      let rate = {
        currencyCode: key,
        amount: amount,
      };
      this.allRates.push(rate);
      //console.log(rates[i]);
    }
  }
  clearResult() {
    this.allRates = null;
  }
}
