import { Avatar, Input, List } from 'antd';
import { EventSourcePolyfill } from 'event-source-polyfill';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
import { cloneDeep } from 'lodash';
import { useRef, useState } from 'react';
import styles from './index.less';

let md = require('markdown-it')({
  highlight: function (str: string) {
    return hljs.highlightAuto(str).value;
  },
});

let evtSource: any = null;

const Chat = () => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [messageList, setMessageList] = useState<any>([]);
  const [value, setValue] = useState('');
  // const [isLoading, setLoding] = useState(false);
  const index = useRef(0);

  const chat = useRef<any>(null);

  const scrollToBottom = () => {
    if (chat.current?.scrollHeight > chat.current?.clientHeight) {
      setTimeout(() => {
        chat.current.scrollTop = chat.current.scrollHeight;
      }, 100);
    }
  };

  const submit = async () => {
    // if (isLoading) {
    //   return
    // }
    // setLoding(true)
    setQuestions([...questions, value.trim()]);
    setValue('');
    scrollToBottom();

    let text = '';

    evtSource = new EventSourcePolyfill(
      `/api/chat/completions?question=${value.trim()}`,
    );
    // evtSource = new EventSourcePolyfill(`/api/stream`);

    evtSource.onmessage = function (e: any) {
      try {
        console.log(e.data);
        const data = JSON.parse(e.data);

        if (data.end) {
          index.current += 1;
          evtSource.close();
          // setLoding(false)
        }

        if (!data.message) {
          return;
        }
        text = text + data.message;
        const crt = {
          role: 1,
          content: md.render(text),
        };
        const list: any = cloneDeep(messageList);
        list[index.current] = crt;
        setMessageList(list);
        scrollToBottom();
      } catch (e) {}
    };
  };

  return (
    <>
      <article
        ref={chat}
        className={'relative main pt-24 h-screen basis-2/3 overflow-y-scroll'}
      >
        <div>
          <h1 className="mt-4 text-4xl font-black text-center">ChatGPT</h1>
        </div>

        <div className={styles.empty_view}>
          <List>
            {questions.map((question, index) => (
              <>
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar alt="LO" style={{ backgroundColor: '#9a3412' }}>
                        You
                      </Avatar>
                    }
                    title="You"
                    description={question}
                  />
                </List.Item>

                {messageList[index] ? (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar alt="LO" style={{ backgroundColor: 'black' }}>
                          AI
                        </Avatar>
                      }
                      title="ChatGPT"
                      description={
                        <p
                          dangerouslySetInnerHTML={{
                            __html: messageList[index].content,
                          }}
                        ></p>
                      }
                    />
                  </List.Item>
                ) : null}
              </>
            ))}
          </List>
        </div>
        <div
          className={`${styles.enterView} sticky flex items-center justify-center w-full h-40 bottom-0 left-0`}
        >
          <Input
            value={value}
            placeholder="Input Question"
            onChange={(e) => setValue(e.target.value)}
            onPressEnter={submit}
          />
        </div>
      </article>
    </>
  );
};

export default Chat;
