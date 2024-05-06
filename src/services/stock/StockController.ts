/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /api/v1/queryStockDetail */
export async function queryStockDetail(
  params: {
    symbol: string;
    period: string;
  },
  options?: { [key: string]: any },
) {
  return request<StockAPI.Result_StockInfo__>(
    `/api/stock/${params.symbol}/history`,
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 GET /api/v1/queryStockInfo */
export async function queryStockInfo(
  params: {
    symbol: string;
  },
  options?: { [key: string]: any },
) {
  return request<StockAPI.Result_FundInfo__>(
    `/api/stock/${params.symbol}/info`,
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 GET /api/v1/searchEndPointByKw */
export async function searchEndPointByKw(
  params: {
    kw: string;
  },
  options?: { [key: string]: any },
) {
  return request<StockAPI.Result_Endpoints__>('/api/search/endpoint', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/stock/my_stocks */
export async function queryFunds(
  params: {
    symbols: string;
  },
  options?: { [key: string]: any },
) {
  return request<StockAPI.Result_Funds__>('/api/stock/my_stocks', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
