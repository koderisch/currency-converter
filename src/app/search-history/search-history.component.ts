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
    let dateString = `${date.getFullYear()}`;
    dateString += `-${this.twoDigits(date.getMonth())}`;
    dateString += `-${this.twoDigits(date.getDate())}`;
    dateString += ` / ${this.twoDigits(date.getHours())}`;
    dateString += `:${this.twoDigits(date.getMinutes())}`;
    dateString += `:${this.twoDigits(date.getSeconds())}`;
    return dateString;
  }

  twoDigits(no) {
    return no.toString().padStart(2, "0");
  }
}
