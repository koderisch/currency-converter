import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ConvertComponent } from "./convert/convert.component";
import { AllCurrencyRatesComponent } from './all-currency-rates/all-currency-rates.component';
import { SearchHistoryComponent } from './search-history/search-history.component';

const routes: Routes = [
  { path: "convert", component: ConvertComponent },
  { path: "all-currency-rates", component: AllCurrencyRatesComponent },
  { path: "search-history", component: SearchHistoryComponent },
  
  { path: "**", redirectTo: "/convert" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
