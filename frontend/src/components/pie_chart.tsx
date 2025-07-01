import { PieChart, Pie, Sector, Cell, Tooltip,  ResponsiveContainer } from 'recharts';
import { Container, Typography } from '@mui/material';
import { RootState } from '../store'
import { useSelector } from 'react-redux'

const COLORS = ['#00C49F', '#e57373', '#FFBB28', '#FF8042'];

const renderActiveShape = (props:any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 20) * cos;
    const my = cy + (outerRadius + 20) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 10;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
  
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} fontSize="16">
          Cache {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333" fontSize="10">{`${payload.name} Count : ${value}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={10} textAnchor={textAnchor} fill="#999" fontSize="10">
          {`${payload.name} Rate ${(percent * 100).toFixed(2)}%`}
        </text>
      </g>
    );
};
export default function DataPieChart (){
    const redis_response = useSelector((state: RootState) => state.dbResult.redis_response) || {}
    const { hitCount, missCount } = redis_response
    const data = [
        { name: 'Hit', value: hitCount },
        { name: 'Miss', value: missCount },
    ];
    return (
        <Container sx={{ mt: 2, mb: 2, p: 2, bgcolor: 'white',  overflow: 'visible', position: 'relative', height:'300px', alignItems:'center', justifyContent:'center', display:'flex', flexDirection:'column'}}>
          <Typography variant="subtitle2" gutterBottom sx={{ color: 'black', textAlign: 'center'}}>
             Redis Cache Hit vs Miss
          </Typography>
        <ResponsiveContainer width="100%" height={250} style={{ overflow: 'visible' }}> 
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            activeShape={renderActiveShape}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<></>} />
        </PieChart>
        </ResponsiveContainer>
        </Container>
    );
}