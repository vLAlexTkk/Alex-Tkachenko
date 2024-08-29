declare module 'react-charts' {
  import { ComponentType, ReactElement } from 'react';

  export interface ChartProps {
    options: any;
  }

  export const Chart: ComponentType<ChartProps>;
  export default Chart;
}
