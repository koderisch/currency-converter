import { HistoryActionTypes, HistoryAction } from "../actions/history.actions";

import { HistoryItem } from '../models/history-item.model';

export interface HistoryState {
  list: HistoryItem[];
}

const initialState: HistoryState = {
  list: [],
};

export function HistoryReducer(
  state: HistoryState = initialState,
  action: HistoryAction
) {
  switch (action.type) {
    case HistoryActionTypes.ADD_HISTORY_ITEM:
      return {
        ...state,
        list: [...state.list, action.payload],
        loading: false,
      };

    default:
      return state;
  }
}
