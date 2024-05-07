import type { DescriptionsProps } from 'antd';
import { Skeleton } from 'antd';

const BasicInfo = ({ info }: any) => {
  if (!info) {
    return <Skeleton active paragraph={{ rows: 3 }} />;
  }

  const items: DescriptionsProps['items'] = [];

  for (const key in info) {
    if (key === 'longBusinessSummary') {
      continue;
    }
    items.push({
      key,
      label: key,
      children: info[key],
    });
  }

  return (
    <div>
      <h4>Business Summary:</h4>
      <p style={{ lineHeight: 2.0 }}>
        {info?.longBusinessSummary || 'No long business summary'}
      </p>
    </div>
  );
};

export default BasicInfo;
