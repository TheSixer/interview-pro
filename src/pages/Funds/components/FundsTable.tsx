import type { TableProps } from 'antd';
import { Table } from 'antd';
import React from 'react';
import { NumericFormat } from 'react-number-format';

interface FundsTableProps {
  dataSource: StockAPI.Funds_[];
  loading: boolean;
}

const columns: TableProps<StockAPI.Funds_>['columns'] = [
  {
    title: '基金名称',
    dataIndex: 'fullName',
    key: 'fullName',
    render: (text, record) => (
      <>
        <a href={`/fund/${record.symbol}`}>{text}</a>
        <p>{record.symbol}</p>
      </>
    ),
  },
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '当前价格',
    key: 'latest',
    dataIndex: 'latest',
    render: (latest) => (
      <NumericFormat
        value={latest.toFixed(2)}
        thousandsGroupStyle="lakh"
        thousandSeparator=","
        displayType="text"
        renderText={(value) => <b>{value}</b>}
      />
    ),
  },
  {
    title: '净值',
    key: 'nav',
    dataIndex: 'nav',
    render: (nav) => {
      const color = nav > 0 ? 'red' : 'green';
      return (
        <span style={{ color }}>
          {nav > 0 ? '+' : '-'}{' '}
          <NumericFormat
            value={nav.toFixed(2)}
            thousandsGroupStyle="lakh"
            thousandSeparator=","
            displayType="text"
            renderText={(value) => <b>{value}</b>}
          />
        </span>
      );
    },
  },
  {
    title: '净值百分比（%）',
    key: 'navChangePercentage',
    dataIndex: 'navChangePercentage',
    render: (navChangePercentage) => {
      const color = navChangePercentage > 0 ? 'red' : 'green';
      return (
        <span style={{ color }}>
          {navChangePercentage > 0 ? '+' : '-'}{' '}
          <NumericFormat
            value={navChangePercentage.toFixed(2)}
            thousandsGroupStyle="lakh"
            thousandSeparator=","
            displayType="text"
            renderText={(value) => <b>{value}</b>}
          />
          %
        </span>
      );
    },
  },
];

const FundsTable: React.FC<FundsTableProps> = ({ dataSource, loading }) => (
  <Table loading={loading} columns={columns} dataSource={dataSource} />
);

export default FundsTable;
