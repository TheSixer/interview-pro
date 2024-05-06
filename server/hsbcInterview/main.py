# main.py
import asyncio
import io

import uvicorn
from typing import Optional
from fastapi import FastAPI
from fastapi.responses import StreamingResponse

from chat_data import generate_stream, message_streamer
from stock_data import get_stock_data, StockResponse, get_my_stocks, get_stock_info
from fund_data import get_mutual_fund_data, get_mutual_fund_info, get_endpoint_by_kw
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()


# 定义接口路径和方法
@app.get("/search/endpoint")
async def search_endpoint(kw: str):
    try:
        # 获取股票历史行情数据
        endpoint_list = get_endpoint_by_kw(kw)
        # 格式化数据
        formatted_data = {
            "code": 0,
            "message": "success",
            "data": endpoint_list
        }
        # 返回数据
        return formatted_data
    except Exception as e:
        # 如果发生异常，返回错误信息
        return {"code": 1, "message": str(e)}


# 定义接口路径和方法
@app.get("/fund/{symbol}/history")
async def get_fund_history(symbol: str):
    try:
        # 获取股票历史行情数据
        fund_data_list = get_mutual_fund_data(symbol)
        # 格式化数据
        formatted_data = {
            "code": 0,
            "message": "success",
            "data": fund_data_list
        }
        # 返回数据
        return formatted_data
    except Exception as e:
        # 如果发生异常，返回错误信息
        return {"code": 1, "message": str(e)}


# 定义接口路径和方法
@app.get("/fund/{symbol}/endpoint")
async def get_fund_endpoint(symbol: str):
    try:
        # 获取股票历史行情数据
        fund_data_info = get_mutual_fund_info(symbol)
        # 格式化数据
        formatted_data = {
            "code": 0,
            "message": "success",
            "data": fund_data_info
        }
        # 返回数据
        return formatted_data
    except Exception as e:
        # 如果发生异常，返回错误信息
        return {"code": 1, "message": str(e)}


# 定义接口路径和方法
@app.get("/stock/{symbol}/history", response_model=StockResponse)
async def get_stock_history(symbol: str, period: Optional[str] = None):
    try:
        # 获取股票历史行情数据
        stock_data_list = get_stock_data(symbol, period)
        # 格式化数据
        formatted_data = {
            "code": 0,
            "message": "success",
            "data": stock_data_list
        }
        # 返回数据
        return formatted_data
    except Exception as e:
        # 如果发生异常，返回错误信息
        return {"code": 1, "message": str(e)}


# 定义接口路径和方法
@app.get("/stock/{symbol}/info")
async def get_stock_history(symbol: str):
    try:
        # 获取股票基本信息
        stock_data_info = get_stock_info(symbol)
        # 格式化数据
        formatted_data = {
            "code": 0,
            "message": "success",
            "data": stock_data_info
        }
        # 返回数据
        return formatted_data
    except Exception as e:
        # 如果发生异常，返回错误信息
        return {"code": 1, "message": str(e)}


# 定义接口路径和方法
@app.get("/stock/my_stocks", response_model=StockResponse)
async def get_realtime_stocks(symbols: str):
    """
        获取股票数据的 API 接口
        """
    try:
        # 获取股票数据
        # companies = ['AMZN', 'GOOG', 'WMT', 'TSLA', 'META']
        stock_data = get_my_stocks(symbols.split(','))
        # 格式化数据
        formatted_data = {
            "code": 0,
            "message": "success",
            "data": stock_data
        }
        # 返回数据
        return formatted_data
    except Exception as e:
        # 如果发生异常，返回错误信息
        return {"error": str(e)}


# 定义接口路径和方法
@app.get("/chat/completions")
async def get_chat_stream(question: str):
    try:
        # 返回数据
        return StreamingResponse(generate_stream(question), media_type="text/event-stream")
    except Exception as e:
        # 如果发生异常，返回错误信息
        return {"error": str(e)}


@app.get("/stream")
async def stream_response():
    return StreamingResponse(message_streamer(), media_type="text/event-stream")


if __name__ == "__main__":
    uvicorn.run("main:app")
