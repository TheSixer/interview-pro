# utils.py

# 格式化日线数据
def format_daily_data(raw_data):
    # Alpha Vantage specific parsing
    meta_data = raw_data.get("Meta Data")

    formatted_metadata = {
        "information": meta_data.get("1. Information"),
        "symbol": meta_data.get("2. Symbol"),
        "last_refreshed": meta_data.get("3. Last Refreshed"),
        "output_size": meta_data.get("4. Output Size"),
        "timezone": meta_data.get("5. Time Zone")
    }

    time_series = raw_data.get("Time Series (Daily)")
    if not time_series:
        time_series = []

    # Reformatting data
    formatted_data = [
        {
            "date": date,
            "open": float(data["1. open"]),
            "close": float(data["4. close"]),
            "high": float(data["2. high"]),
            "low": float(data["3. low"]),
            "volume": int(data["5. volume"])
        }
        for date, data in time_series.items()
    ]
    # sorted by date
    formatted_data = sorted(formatted_data, key=lambda x: x['date'], reverse=True)
    # Return data
    return {
        "metadata": formatted_metadata,
        "data": formatted_data
    }


#  格式化endpoint
def format_endpoint_data(data):
    # Alpha Vantage specific parsing
    global_quote = data.get("Global Quote")

    if not global_quote:
        return {}

    formatted_metadata = {
        "symbol": global_quote.get("01. symbol"),
        "open": float(global_quote["02. open"]),
        "high": float(global_quote["03. high"]),
        "low": float(global_quote["04. low"]),
        "price": float(global_quote["05. price"]),
        "volume": float(global_quote["06. volume"]),
        "latest_trading_day": global_quote.get("07. latest trading day"),
        "previous close": global_quote.get("08. previous close"),
        "change": global_quote.get("09. change"),
        "change_percent": global_quote.get("10. change percent"),
    }

    return formatted_metadata


#  格式化endpoint列表
def format_endpoint_list(data):
    # Alpha Vantage specific parsing
    endpoint_list = data.get("bestMatches")
    if not endpoint_list:
        return []

    # Reformatting data
    formatted_data = [
        {
            "symbol": data.get("1. symbol"),
            "name": data.get("2. name"),
            "type": data.get("3. type"),
            "region": data.get("4. region"),
            "marketOpen": data.get("5. marketOpen"),
            "marketClose": data.get("6. marketClose"),
            "timezone": data.get("7. timezone"),
            "currency": data.get("8. currency"),
            "matchScore": data.get("9. matchScore"),
        }
        for data in endpoint_list
    ]
    return formatted_data
