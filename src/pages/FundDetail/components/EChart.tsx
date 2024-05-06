import * as echarts from 'echarts';
import React, { useEffect, useRef } from 'react';

interface EchartBarProps {
  option: any;
}

// 脚手架示例组件
const EchartBar: React.FC<EchartBarProps> = ({ option }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const chart = echarts.init(ref.current);
      chart.setOption(option);
    }
  }, [option]);

  return <div ref={ref} style={{ width: '80vw', height: '500px' }}></div>;
};

export default EchartBar;
