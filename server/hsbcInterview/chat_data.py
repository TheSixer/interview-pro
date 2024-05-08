# chat_data.py

import time
import json

from openai import OpenAI

client = OpenAI()


def message_streamer():
    messages = [
        {"message": "", "messageType": "TEXT"},
        {"message": "你", "messageType": "TEXT"},
        {"message": "好", "messageType": "TEXT"},
        {"message": "！", "messageType": "TEXT"},
        {"message": "有", "messageType": "TEXT"},
        {"message": "什", "messageType": "TEXT"}
    ]
    for msg in messages:
        data = json.dumps(msg)
        yield f"data: {data}\n\n"
        time.sleep(0.2)

    # 发送结束标记
    end_message = json.dumps({"end": True})
    yield f"data: {end_message}\n\n"


def generate_stream(question: str):
    stream = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": question}],
        stream=True,
    )
    print('start')
    for chunk in stream:
        if chunk.choices[0].delta.content is not None:
            data = json.dumps({"messageType": "TEXT", "message": chunk.choices[0].delta.content})
            print(data)
            yield f"data: {data}\n\n"
            time.sleep(0.1)

    print('end')
    # 发送结束标记
    end_message = json.dumps({"end": True})
    yield f"data: {end_message}\n\n"
