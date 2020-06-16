import { Component, OnInit } from "@angular/core";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState } from "src/app/store/models/app-state.model";

import { HistoryItem } from "../store/models/history-item.model";

@Component({
  selector: "app-search-history",
  templateUrl: "./search-history.component.html",
  styleUrls: ["./search-history.component.css"],
})
export class SearchHistoryComponent implements OnInit {
  historyItems$: Observable<HistoryItem[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.historyItems$ = this.store.select((store) => store.history.list);
  }

  formatDate(date) {
    let dateString = `${date.getFullYear()}-${date.getMonth().toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    dateString += ` / ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return dateString;
  }
}
