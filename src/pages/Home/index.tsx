import services from '@/services/stock';
import { PageContainer } from '@ant-design/pro-components';
import { useState } from 'react';

import DebounceSelect from './components/DebounceSelect';
import styles from './index.less';

interface EndPointValue {
  label: string;
  value: string;
}

const { searchEndPointByKw } = services.StockController;

async function fetchEndpointsList(kw: string): Promise<EndPointValue[]> {
  return searchEndPointByKw({ kw }).then(
    ({ data }) =>
      data?.map(({ name, symbol }) => ({ label: name, value: symbol })) || [],
  );
}

const HomePage: React.FC = () => {
  const [value, setValue] = useState<EndPointValue>();

  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <DebounceSelect
          value={value}
          size="middle"
          placeholder="Search Symbols By Keyword"
          fetchOptions={fetchEndpointsList}
          onChange={(newValue: EndPointValue) => {
            setValue(newValue as EndPointValue);
          }}
          style={{ width: '100%' }}
        />
      </div>
    </PageContainer>
  );
};

export default HomePage;
