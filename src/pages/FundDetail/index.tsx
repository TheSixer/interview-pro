import services from '@/services/stock';
import { queryStockInfo } from '@/services/stock/StockController';
import { PageContainer } from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
import { Button, Space, Spin, Tag } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import BasicInfo from './components/BasicInfo';
import EchartBar from './components/EChart';
import News from './components/News';
import OtherInfo from './components/OtherInfo';

const { queryStockDetail } = services.StockController;

const FundDetail: React.FC<unknown> = () => {
  const { symbol = '' } = useParams();

  const [period, setPeriod] = useState<string>('1y');
  const [data, setData] = useState<(string | number)[][]>([]);
  const [basicInfo, setBasicInfo] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  const options = useMemo(
    () => ({
      tooltip: {
        trigger: 'axis',
        position: (pt: any[]) => {
          return [pt[0], '10%'];
        },
      },
      title: {
        left: 'center',
        text: 'Large Ara Chart',
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: 'none',
          },
          restore: {},
          saveAsImage: {},
        },
      },
      xAxis: {
        type: 'time',
        boundaryGap: false,
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
      },
      // dataZoom: [
      //   {
      //     type: 'inside',
      //     start: 0,
      //     end: 20
      //   },
      //   {
      //     start: 0,
      //     end: 20
      //   }
      // ],
      series: [
        {
          name: 'NAV',
          type: 'line',
          smooth: true,
          symbol: 'none',
          areaStyle: {},
          data: data,
        },
      ],
    }),
    [data],
  );

  useEffect(() => {
    setLoading(true);
    queryStockDetail({
      symbol,
      period,
    }).then(({ data }) => {
      setData(
        data?.map(({ Date, Close }) => [Date, Math.round(Close * 100) / 100]) ||
          [],
      );
      setLoading(false);
    });
  }, [symbol, period]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    Boolean(symbol) &&
      queryStockInfo({
        symbol,
      }).then(({ data }) => {
        console.log(data);
        setBasicInfo(data);
      });
  }, []);

  return (
    <PageContainer
      header={{
        title: basicInfo?.info?.longName || symbol?.toLocaleUpperCase(),
        subTitle: symbol?.toLocaleUpperCase(),
        extra: basicInfo?.info
          ? [
              <Tag bordered={false} key={0}>
                {basicInfo?.info?.date}
              </Tag>,
              <Tag bordered={false} color="blue" key={1}>
                <NumericFormat
                  value={basicInfo?.info?.previousClose.toFixed(2)}
                  thousandsGroupStyle="lakh"
                  thousandSeparator=","
                  displayType="text"
                  renderText={(value) => <b>{value}</b>}
                />
              </Tag>,
              <Tag
                bordered={false}
                color={basicInfo?.info?.nav > 0 ? 'red' : 'success'}
                key={2}
              >
                {basicInfo?.info?.nav > 0 ? '+' : '-'}{' '}
                <NumericFormat
                  value={basicInfo?.info?.nav.toFixed(2)}
                  thousandsGroupStyle="lakh"
                  thousandSeparator=","
                  displayType="text"
                  renderText={(value) => <b>{value}</b>}
                />
              </Tag>,
              <Tag
                bordered={false}
                color={
                  basicInfo?.info?.nav_change_percent > 0 ? 'red' : 'success'
                }
                key={2}
              >
                {basicInfo?.info?.nav_change_percent > 0 ? '+' : '-'}{' '}
                <NumericFormat
                  value={basicInfo?.info?.nav_change_percent.toFixed(2)}
                  thousandsGroupStyle="lakh"
                  thousandSeparator=","
                  displayType="text"
                  renderText={(value) => <b>{value}</b>}
                />
                %
              </Tag>,
            ]
          : [],
      }}
    >
      <BasicInfo info={basicInfo?.info} />

      <Space style={{ marginBottom: 16 }}>
        {[
          { period: '1mo', label: '1 Month' },
          { period: '3mo', label: '3 Months' },
          { period: '6mo', label: '6 Months' },
          { period: '1y', label: '1 Year' },
          { period: '3y', label: '3 Years' },
          { period: '5y', label: '5 Years' },
          { period: 'max', label: 'All' },
        ].map((item) => (
          <Button
            key={item.period}
            onClick={() => setPeriod(item.period)}
            type={period === item.period ? 'primary' : 'default'}
          >
            {item.label}
          </Button>
        ))}
      </Space>

      <Spin tip="Loading..." spinning={loading}>
        {data?.length > 0 && <EchartBar option={options} />}
      </Spin>

      <OtherInfo info={{ ...(basicInfo?.info || {}) }} />

      <News data={basicInfo?.news || []} />
    </PageContainer>
  );
};

export default FundDetail;
