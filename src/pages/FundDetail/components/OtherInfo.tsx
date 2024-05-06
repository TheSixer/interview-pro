import type { DescriptionsProps } from 'antd';
import { Descriptions } from 'antd';

const BasicInfo = ({ info }: any) => {
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
    <Descriptions
      title="Fund Info"
      column={{ xs: 2, sm: 3, md: 4, lg: 6 }}
      items={items}
    />
  );
};

export default BasicInfo;
