export interface HistoryItem {
  queryTime: Date;
  fromAmount: number;
  fromCurrencyCode: string;
  toAmount: number;
  toCurrencyCode: string;
  exchangeDate: string;
}
