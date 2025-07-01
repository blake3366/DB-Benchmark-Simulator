import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Container, Typography } from '@mui/material';
import { RootState } from '../store'
import { useSelector } from 'react-redux'
interface DataPoint {
  postgresql_times: number;
  redis_times: number;
  index: number; // x 軸索引
}
export default function DatabaseLineChart() {
  const postgresql_response= useSelector((state: RootState) => state.dbResult.postgresql_response) || {}
  const redis_response= useSelector((state: RootState) => state.dbResult.redis_response) || {}
  if (!postgresql_response) return null // 如果你有 SSR 可加這行保護
  const { totalTimes: postgresqlTotalTimes } = postgresql_response
  const { totalTimes: redisTotalTimes } = redis_response
  if (postgresqlTotalTimes.length === 0 || redisTotalTimes.length === 0 ) return <Typography textAlign="center">No data available</Typography>
  const data: DataPoint[] =  postgresqlTotalTimes.map((value, index) => ({
      postgresql_times: value, // 數據值
      redis_times: redisTotalTimes[index] || 0, // Redis 數據值，若無則為 0
      index: index + 1, // x 軸索引，從 1 開始
    }));
  return (
    <Container sx={{bgcolor: 'white', borderRadius: 2, height:'400px', alignItems:'center', justifyContent:'center', display:'flex', flexDirection:'column'}}>
      <Typography variant="subtitle2" gutterBottom sx={{ color: 'black', textAlign: 'center'}}>
        PostgreSQL vs Redis Response Times
      </Typography>
      <ResponsiveContainer width="100%" height={300}> 
      <LineChart data={data} margin={{ top: 10, right: 50, left: 20, bottom: 20}}> 
        <Line type="monotone" dataKey="postgresql_times" stroke="#4dd0e1" strokeWidth={3}/>
        <Line type="monotone" dataKey="redis_times" stroke="#82ca9d" strokeWidth={3}/>
        <CartesianGrid stroke="#ccc" />
        {/* <ReferenceLine y={slowestTime} stroke="red" label="Max PV PAGE" />
        <ReferenceLine y={fastestTime} label="Max" stroke="red" /> */}
        <XAxis 
          dataKey="index" 
          label={{ value: "index", position: "insideBottom", offset: -5 }}
          tick={{ fontSize: 12 }}
        />
        <YAxis 
          label={{ value: "responese (ms)", angle: -90, position: "insideBottomLeft", offset: 0 }} 
          tick={{ fontSize: 12 }}
        />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div style={{ backgroundColor: 'white', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                  <p>{`No.${label}`}</p>
                  <p>{`PostgreSQL Times: ${payload[0].value} ms`}</p>
                  <p>{`Redis Times: ${payload[1].value} ms`}</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Legend
            wrapperStyle={{ marginTop: '100px' }} 
            formatter={(value) => {
              if (value === 'postgresql_times') return 'PostgreSQL Response Times';
              if (value === 'redis_times') return 'Redis Response Times';
              return value; 
            }}
          />
      </LineChart>
      </ResponsiveContainer>
    </Container>
  );
}