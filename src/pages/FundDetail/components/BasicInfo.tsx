import type { DescriptionsProps } from 'antd';
import { Skeleton } from 'antd';

const BasicInfo = ({ info }: any) => {
  if (!info) {
    return <Skeleton active title={false} paragraph={{ rows: 3 }} />;
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
      <p>{info?.longBusinessSummary || 'No long business summary'}</p>
    </div>
  );
};

export default BasicInfo;
