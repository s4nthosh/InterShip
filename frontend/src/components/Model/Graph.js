import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { base_url } from '../../Constant/ApiUrl';

export default function GridDemo() {
  const { data: showdata, isLoading, isError } = useQuery({
    queryKey: ['alldata'],
    queryFn: async () => {
      const res = await axios.get(`${base_url}/IntershipDetails.php`);
      return res.data;
    },
  });

  // Month labels
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const monthCount = new Array(12).fill(0);

  if (showdata) {
    showdata.forEach((item) => {
      const date = new Date(item.ApplicationDate);
      const month = date.getMonth(); // 0 for Jan, 1 for Feb, etc.
      monthCount[month]++;
    });
  }

  // Create dataset for LineChart
  const dataset = monthCount.map((count, index) => ({
    x: index,
    y: count,
  }));

  return (
    <LineChart
      dataset={dataset}
      xAxis={[
        {
          dataKey: 'x',
          valueFormatter: (value) => months[value],
          tickMinStep: 1,
        },
      ]}
      series={[{ dataKey: 'y', label: 'Applications' }]}
      height={300}
      margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
      grid={false}
      loading={isLoading}
    />
  );
}
