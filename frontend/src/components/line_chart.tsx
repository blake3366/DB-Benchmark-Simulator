import { LineChart, Line, CartesianGrid, ReferenceLine ,XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Container, Typography } from '@mui/material';
import { RootState } from '../store'
import { useSelector } from 'react-redux'
interface DataPoint {
  times: number;
  index: number; // x 軸索引
}
export default function DatabaseLineChart() {
  const postgresql_response= useSelector((state: RootState) => state.dbResult.postgresql_response) || {}
  if (!postgresql_response) return null // 如果你有 SSR 可加這行保護
  const { totalTimes, fastestTime, slowestTime } = postgresql_response 
  if (totalTimes.length === 0) return <Typography textAlign="center">No data available</Typography>
  const data: DataPoint[] =  totalTimes.map((value, index) => ({
      times: value, // 數據值
      index: index + 1, // x 軸索引，從 1 開始
    }));
  return (
    <Container sx={{bgcolor: 'white', borderRadius: 2}}>
      <Typography variant="subtitle2" gutterBottom sx={{ color: 'black', textAlign: 'center'}}>
        PostgreSQL
      </Typography>
      <ResponsiveContainer width="100%" height={300}> 
      <LineChart data={data} margin={{ top: 10, right: 50, left: 20, bottom: 20 }}> 
        <Line type="monotone" dataKey="times" stroke="#82a498" strokeWidth={3}/>
        <CartesianGrid stroke="#ccc" />
        <ReferenceLine y={slowestTime} stroke="red" label="Max PV PAGE" />
        <ReferenceLine y={fastestTime} label="Max" stroke="red" />
        <XAxis 
          dataKey="index" 
          label={{ value: "index", position: "insideBottom", offset: -5 }}
          tick={{ fontSize: 12 }}
        />
        <YAxis 
          label={{ value: "responese (ms)", angle: -90, position: "insideBottomLeft", offset: 0 }} 
          tick={{ fontSize: 12 }}
        />
        <Tooltip />
      </LineChart>
      </ResponsiveContainer>
    </Container>
  );
}