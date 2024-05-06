# stock_data.py

from typing import List, Optional
from pydantic import BaseModel
import yfinance as yf


class StockResponse(BaseModel):
    code: int
    message: Optional[str] = ""
    data: List[dict]


class StocksRes(BaseModel):
    code: int
    message: Optional[str] = ""
    data: dict


# 获取股票信息
def get_stock_data(symbol: str, period: Optional[str] = '1y', end_date: Optional[str] = None) -> List[dict]:
    symbol_data = yf.Ticker(symbol)
    symbol_data_hist = symbol_data.history(period, interval='1d')
    symbol_data_hist.reset_index(inplace=True)
    # Format the Date column
    symbol_data_hist['Date'] = symbol_data_hist['Date'].dt.strftime('%Y-%m-%d')

    # 定义中文到英文的映射关系
    # chinese_to_english = {
    #     '日期': 'datetime',
    #     '开盘': 'openPrice',
    #     '收盘': 'closePrice',
    #     '最高': 'highPrice',
    #     '最低': 'lowPrice',
    #     '成交量': 'tradingVolume',
    #     '成交额': 'transactionAmount',
    #     '振幅': 'amplitude',
    #     '涨跌幅': 'percentageChange',
    #     '涨跌额': 'priceChange',
    #     '换手率': 'turnoverRate'
    #     # 添加其他表头的映射关系
    # }
    # df.rename(columns=chinese_to_english, inplace=True)
    print(symbol_data_hist)
    return symbol_data_hist.to_dict(orient="records")


# 获取股票/基金的基本信息
def get_stock_info(symbol: str):
    ticker = yf.Ticker(symbol)
    symbol_data_hist = ticker.history(period="5d")
    latest_data = symbol_data_hist.iloc[-1]
    previous_day_data = symbol_data_hist.iloc[-2]
    # 计算净值变化百分比
    nav_change_percent = ((latest_data['Close'] - previous_day_data['Close']) / previous_day_data[
        'Close']) * 100
    # get all stock info
    return {
        "info": {
            **ticker.info,
            'date': latest_data.name.strftime('%Y-%m-%d'),
            "nav": latest_data['Close'] - previous_day_data['Close'],
            "nav_change_percent": nav_change_percent
        },
        "history_metadata": ticker.history_metadata,
        # "actions": ticker.actions,
        # "dividends": ticker.dividends,
        # "splits": ticker.splits,
        # "capital_gains": ticker.capital_gains,
        # "share_count": ticker.get_shares_full(start="2022-01-01", end=None),
        # "income_stmt": ticker.income_stmt,
        # "quarterly_income_stmt": ticker.quarterly_income_stmt,
        # "balance_sheet": ticker.balance_sheet,
        # "quarterly_balance_sheet": ticker.quarterly_balance_sheet,
        # "cashflow": ticker.cashflow,
        # "quarterly_cashflow": ticker.quarterly_cashflow,
        # show recommendations
        "recommendations": ticker.recommendations,
        # show options expirations
        "options": ticker.options,
        "news": ticker.news,
    }


def get_my_stocks(companies: list):
    # 使用 yf.Tickers 来加载多个基金的数据
    tickers = yf.Tickers(companies)

    # 存储最新数据的列表
    latest_data_list = []

    # 获取每个基金最近一个交易日的数据
    for fund in companies:
        data = tickers.tickers[fund].history(period="5d")
        # 获取基金的全名
        long_name = tickers.tickers[fund].info.get('longName', fund)  # 使用基金代码作为备选名称
        if not data.empty:
            latest_data = data.iloc[-1]
            previous_day_data = data.iloc[-2]
            # 为了保留基金代码，我们手动添加一个 'Symbol' 字段
            # 计算净值变化百分比
            nav_change_percent = ((latest_data['Close'] - previous_day_data['Close']) / previous_day_data[
                'Close']) * 100

            # 创建包含所需信息的字典
            fund_data = {
                'symbol': fund,
                'fullName': long_name,
                'date': latest_data.name.strftime('%Y-%m-%d'),
                'nav': latest_data['Close'] - previous_day_data['Close'],
                'latest': latest_data['Close'],
                'navChangePercentage': nav_change_percent
            }
            latest_data_list.append(fund_data)
    return latest_data_list
