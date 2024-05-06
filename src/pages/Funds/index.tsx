import services from '@/services/stock';
import { PageContainer } from '@ant-design/pro-components';

import { useEffect, useState } from 'react';
import FundsTable from './components/FundsTable';
import styles from './index.less';

const { queryFunds } = services.StockController;

const symbols: string[] = [
  'VFIAX',
  'FCNTX',
  'PRFDX',
  'VTSAX',
  'VBTLX',
  'PRGTX',
  'VDIGX',
  'VGSLX',
  'VGHCX',
  'TRRMX',
];

const FundsPage: React.FC = () => {
  const [dataSource, setDataSource] = useState<StockAPI.Funds_[]>([]);
  const [loading, setLoading] = useState(false);

  const _initData = async () => {
    setLoading(true);
    const { data } = await queryFunds({
      symbols: symbols.join(','),
    });
    setDataSource(data || []);
    setLoading(false);
  };

  useEffect(() => {
    _initData();
  }, []);

  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <FundsTable loading={loading} dataSource={dataSource} />
      </div>
    </PageContainer>
  );
};

export default FundsPage;
