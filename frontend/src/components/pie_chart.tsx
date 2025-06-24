import { PieChart, Pie, Sector, Cell, Tooltip  } from 'recharts';
import { Container, Typography } from '@mui/material';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

interface DatabasePieChartProps {
  rawData: {
    hitCount: number; 
    missCount: number; 
  };
}

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
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
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999" fontSize="10">
          {`${payload.name} Rate ${(percent * 100).toFixed(2)}%`}
        </text>
      </g>
    );
};
export default function DataPieChart ({ rawData }: DatabasePieChartProps){
    const { hitCount, missCount } = rawData
    const data = [
        { name: 'Hit', value: hitCount },
        { name: 'Miss', value: missCount },
    ];
    return (
        <Container maxWidth="xs" sx={{ mt: 2, mb: 2, p: 2, bgcolor: 'white', borderRadius: 2, boxShadow: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="subtitle2" gutterBottom sx={{ color: 'black', textAlign: 'center'}}>
             Redis Cache Hit vs Miss
          </Typography>
        <PieChart width={600} height={200}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            // label={renderCustomizedLabel}
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
        </Container>
    );
}