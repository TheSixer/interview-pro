import {
  CopyOutlined,
  FieldTimeOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import { Button, Flex, List, Space } from 'antd';
import dayjs from 'dayjs';
import React from 'react';

interface NewsItem {
  title: string;
  href: string;
  description: string;
  content: string;
  thumbnail: any;
  publisher: string;
  link: string;
  type: string;
  providerPublishTime: number;
  relatedTickers: string[];
}

interface NewsProps {
  data: NewsItem[];
}

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const News: React.FC<NewsProps> = ({ data }) => (
  <List
    itemLayout="vertical"
    size="large"
    dataSource={data}
    renderItem={(item) => (
      <List.Item
        key={item.title}
        actions={[
          <IconText
            icon={LinkOutlined}
            text={`Publisher: ${item.publisher}`}
            key="list-vertical-star-o"
          />,
          <IconText
            icon={CopyOutlined}
            text={`Type: ${item.type}`}
            key="list-vertical-like-o"
          />,
          <IconText
            icon={FieldTimeOutlined}
            key="list-vertical-like-d"
            text={`Date: ${dayjs(item.providerPublishTime * 1000).format(
              'YYYY-MM-DD HH:mm:ss',
            )}`}
          />,
        ]}
        extra={item?.thumbnail?.resolutions
          ?.slice(0, 1)
          ?.map((img: any, i: number) => (
            <img width={272} alt="logo" src={img.url} key={i} />
          ))}
      >
        <List.Item.Meta
          title={
            <a href={item.link} target="_blank" rel="noreferrer">
              {item.title}
            </a>
          }
          description={item.title}
        />
        <Flex gap="small" align="center" justify="space-between" wrap>
          <span>RelatedTickers: </span>
          {item?.relatedTickers?.slice?.(0, 4).map((tick) => (
            <Button type="link" key={tick} href={`/fund/${tick}`}>
              {tick}
            </Button>
          ))}
        </Flex>
      </List.Item>
    )}
  />
);

export default News;
