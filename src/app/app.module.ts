import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { StoreModule } from "@ngrx/store";
import { HistoryReducer } from "./store/reducers/history.reducer";

import { AppComponent } from "./app.component";
import { ConvertComponent } from "./convert/convert.component";
import { AllCurrencyRatesComponent } from "./all-currency-rates/all-currency-rates.component";
import { SearchHistoryComponent } from "./search-history/search-history.component";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";

@NgModule({
  declarations: [
    AppComponent,
    ConvertComponent,
    AllCurrencyRatesComponent,
    SearchHistoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({ history: HistoryReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
