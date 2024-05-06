import services from '@/services/stock';
import { PageContainer } from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import EchartBar from './components/EChart';

const { queryStockDetail } = services.StockController;

const upColor = '#ec0000';
const downColor = '#00da3c';

const TableList: React.FC<unknown> = () => {
  const { symbol = '' } = useParams();

  const [data, setData] = useState<number[][]>([]);
  const [categoryData, setCategoryData] = useState<string[]>([]);

  const calculateMA = useCallback(
    (dayCount: number) => {
      let result = [];
      for (let i = 0, len = data.length; i < len; i++) {
        if (i < dayCount) {
          result.push('-');
          continue;
        }
        let sum = 0;
        for (let j = 0; j < dayCount; j++) {
          sum += +data[i - j][1];
        }
        result.push(sum / dayCount);
      }
      return result;
    },
    [data],
  );

  const options = useMemo(
    () => ({
      title: {
        text: symbol?.toLocaleUpperCase() || '',
        left: 0,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
      },
      legend: {
        data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30'],
      },
      grid: {
        left: '10%',
        right: '10%',
        bottom: '15%',
      },
      xAxis: {
        type: 'category',
        data: categoryData,
        boundaryGap: false,
        axisLine: { onZero: false },
        splitLine: { show: false },
        min: 'dataMin',
        max: 'dataMax',
      },
      yAxis: {
        scale: true,
        splitArea: {
          show: true,
        },
      },
      dataZoom: [
        {
          type: 'inside',
          start: 50,
          end: 100,
        },
        {
          show: true,
          type: 'slider',
          top: '90%',
          start: 50,
          end: 100,
        },
      ],
      series: [
        {
          name: '日K',
          type: 'candlestick',
          data: data,
          itemStyle: {
            color: upColor,
            color0: downColor,
          },
          markPoint: {
            label: {
              formatter: function (param: any) {
                return param !== null ? Math.round(param.value) + '' : '';
              },
            },
            data: [
              {
                name: 'Mark',
                coord: ['2013/5/31', 2300],
                value: 2300,
                itemStyle: {
                  color: 'rgb(41,60,85)',
                },
              },
              {
                name: 'highest value',
                type: 'max',
                valueDim: 'highest',
              },
              {
                name: 'lowest value',
                type: 'min',
                valueDim: 'lowest',
              },
              {
                name: 'average value on close',
                type: 'average',
                valueDim: 'close',
              },
            ],
            tooltip: {
              formatter: function (param: any) {
                return param.name + '<br>' + (param.data.coord || '');
              },
            },
          },
          markLine: {
            symbol: ['none', 'none'],
            data: [
              [
                {
                  name: 'from lowest to highest',
                  type: 'min',
                  valueDim: 'lowest',
                  symbol: 'circle',
                  symbolSize: 10,
                  label: {
                    show: false,
                  },
                  emphasis: {
                    label: {
                      show: false,
                    },
                  },
                },
                {
                  type: 'max',
                  valueDim: 'highest',
                  symbol: 'circle',
                  symbolSize: 10,
                  label: {
                    show: false,
                  },
                  emphasis: {
                    label: {
                      show: false,
                    },
                  },
                },
              ],
              {
                name: 'min line on close',
                type: 'min',
                valueDim: 'close',
              },
              {
                name: 'max line on close',
                type: 'max',
                valueDim: 'close',
              },
            ],
          },
        },
        {
          name: 'MA5',
          type: 'line',
          data: calculateMA(5),
          smooth: true,
          lineStyle: {
            opacity: 0.5,
          },
        },
        {
          name: 'MA10',
          type: 'line',
          data: calculateMA(10),
          smooth: true,
          lineStyle: {
            opacity: 0.5,
          },
        },
        {
          name: 'MA20',
          type: 'line',
          data: calculateMA(20),
          smooth: true,
          lineStyle: {
            opacity: 0.5,
          },
        },
        {
          name: 'MA30',
          type: 'line',
          data: calculateMA(30),
          smooth: true,
          lineStyle: {
            opacity: 0.5,
          },
        },
      ],
    }),
    [data, categoryData],
  );

  useEffect(() => {
    queryStockDetail({
      symbol,
      period: '1y',
    }).then(({ data }) => {
      setData(
        data?.map(({ Open, Close, High, Low }) => [Close, Open, Low, High]) ||
          [],
      );
      setCategoryData(data?.map(({ Date }) => Date) || []);
    });
  }, []);

  return (
    <PageContainer
      header={{
        title: `${symbol?.toLocaleUpperCase() || ''}详情`,
      }}
    >
      {data?.length > 0 && <EchartBar option={options} />}
    </PageContainer>
  );
};

export default TableList;
