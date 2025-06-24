import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { Container, Typography } from '@mui/material';
interface DataPoint {
  times: number;
  index: number; // x 軸索引
}

interface DatabaseLineChartProps {
  rawData: {
    totalTimes: number[]; // 所有反應時間
    averageTime: number; // 平均反應時間
    fastestTime: number; // 最快反應時間
    slowestTime: number; // 最慢反應時間
    variance: number; // 變異數
  };
}

export default function DatabaseLineChart({ rawData }: DatabaseLineChartProps) {
  const {totalTimes, fastestTime,slowestTime , variance} = rawData
  const data: DataPoint[] = totalTimes.map((value, index) => ({
    times: value, // 數據值
    index: index + 1, // x 軸索引，從 1 開始
  }));
  return (
    <Container maxWidth="sm" sx={{ mt: 2, mb: 2, p: 2, bgcolor: 'white', borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ color: 'black', textAlign: 'center'}}>
        PostgreSQL
      </Typography>
      <LineChart width={600} height={300} data={data} margin={{ top: 10, right: 50, left: 20, bottom: 20 }}>
        <Line type="monotone" dataKey="times" stroke="#82a498" strokeWidth={3}/>
        <CartesianGrid stroke="#ccc" />
        <XAxis 
          dataKey="index" 
          label={{ value: "index", position: "insideBottom", offset: -5 }}
          tick={{ fontSize: 12 }}
        />
        <YAxis 
          label={{ value: "responese (ms)", angle: -90, position: "insideBottomLeft", offset: 0 }} 
          domain={[Math.round(fastestTime - 3*variance), Math.round(slowestTime+3*variance)]}
          tick={{ fontSize: 12 }}
        />
        <Tooltip />
      </LineChart>
    </Container>
  );
}