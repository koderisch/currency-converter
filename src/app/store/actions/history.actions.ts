import { Action } from "@ngrx/store";

import { HistoryItem } from "../../store/models/history-item.model";

export enum HistoryActionTypes {
  ADD_HISTORY_ITEM = "[HISTORY] Add History Item",
}

export class AddHistoryItemAction implements Action {
  readonly type = HistoryActionTypes.ADD_HISTORY_ITEM;
  constructor(public payload: HistoryItem) {}
}

export type HistoryAction = AddHistoryItemAction;
