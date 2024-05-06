import yfinance as yf
import pandas as pd

# 定义共同基金列表
funds = ['VFIAX', 'VTSAX', 'VGTSX']  # 示例共同基金代码

# 使用 yf.Tickers 来加载多个基金的数据
tickers = yf.Tickers(funds)

# 存储最新数据的列表
latest_data_list = []

# 获取每个基金最近一个交易日的数据
for fund in funds:
    data = tickers.tickers[fund].history(period="5d")
    if not data.empty:
        latest_data = data.iloc[-1]
        previous_day_data = data.iloc[-2]
        # 为了保留基金代码，我们手动添加一个 'Symbol' 字段

        # 计算净值变化百分比
        nav_change_percent = ((latest_data['Close'] - previous_day_data['Close']) / previous_day_data['Close']) * 100

        # 创建包含所需信息的字典
        fund_data = {
            'Symbol': fund,
            'Date': latest_data.name.strftime('%Y-%m-%d'),
            'NAV': latest_data['Close'],
            'NAV Change Percentage': f"{nav_change_percent:.2f}%"
        }
        latest_data_list.append(fund_data)

# 最终的 latest_data_list 是一个字典列表，每个字典包含一个基金的最新数据
print(latest_data_list)
