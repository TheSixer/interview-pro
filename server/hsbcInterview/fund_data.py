# fund_data.py
from typing import List, Optional
from pydantic import BaseModel
from constants import AlphaVantageDomain, AlphaVantageKey
from utils import format_daily_data, format_endpoint_data, format_endpoint_list
import requests


class FundResponse(BaseModel):
    code: int
    message: Optional[str] = ""
    data: List[dict]


# 查询股票代码
def get_endpoint_by_kw(kw):
    parameters = {
        "function": "SYMBOL_SEARCH",
        "keywords": kw,
        "apikey": AlphaVantageKey,
        "datatype": 'json'
    }
    response = requests.get(AlphaVantageDomain, params=parameters)
    data = response.json()
    return format_endpoint_list(data)


# 获取基金全部数据
def get_mutual_fund_data(symbol, outputsize='compact'):
    parameters = {
        "function": "TIME_SERIES_DAILY",
        "symbol": symbol,
        "apikey": AlphaVantageKey,
        "datatype": 'json',
        "outputsize": outputsize
    }
    response = requests.get(AlphaVantageDomain, params=parameters)
    data = response.json()
    return format_daily_data(data)


# 获取基金最新价格和交易量信息
def get_mutual_fund_info(symbol):
    parameters = {
        "function": 'GLOBAL_QUOTE',
        "symbol": symbol,
        "apikey": AlphaVantageKey,
        "datatype": 'json',
    }
    response = requests.get(AlphaVantageDomain, params=parameters)
    data = response.json()
    return format_endpoint_data(data)
