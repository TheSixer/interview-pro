/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！

declare namespace StockAPI {
  interface Result_StockInfo__ {
    code: number;
    data?: StockInfo_[];
    message?: string;
  }

  interface StockInfo_ {
    Date: string;
    Open: number;
    High: number;
    Low: number;
    Close: number;
    Volume: number;
    Dividends: number;
    'Stock Splits': number;
  }

  interface Endpoints_ {
    symbol: string;
    name: string;
    type: string;
    region: string;
    marketOpen: string;
    marketClose: string;
    timezone: string;
    currency: string;
    matchScore: string;
  }

  interface Funds_ {
    symbol: string;
    fullName: string;
    date: string;
    nav: number;
    latest: number;
    navChangePercentage: number;
  }

  interface Result_Endpoints__ extends Result_StockInfo__ {
    data?: Endpoints_[];
  }

  interface Result_Funds__ extends Result_StockInfo__ {
    data?: Funds_[];
  }

  interface Result_FundInfo__ extends Result_StockInfo__ {
    data?: any;
  }
}
