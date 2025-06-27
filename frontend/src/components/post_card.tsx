import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

interface DatabaseBarChartProps {
    rawData: {
        primaryKey: string | number; // 可以是數字或字串
        color: string;
        title: string;
        unit: string;
        slowestTime?: number; // 可選屬性
        averageTime?: number; // 可選屬性
    }
}

export default function BasicCard({rawData}: DatabaseBarChartProps) {
  const { primaryKey, color, title, unit, slowestTime, averageTime} = rawData;
  return (
   <Box sx={{textAlign: 'center'}}>
     <Typography variant="h6" component="div" sx={{ mb: 2, color: 'text.secondary',}}>
         {title}
     </Typography>
     {/* <Tooltip title="This is the average response time for the database operation."> */}
     <Typography variant="h3" component="div" sx={{ mb: 4, color: color}}>
        {primaryKey} <em/>
        <Typography variant="subtitle2" component="span" sx={{ fontSize: '0.5em', color: 'text.secondary',ml: 0.5 }}>
            {unit}
        </Typography>
     </Typography>
     {/* </Tooltip> */}
     <Typography variant="body2" component="div" sx={{ color: 'text.secondary' }}>
  {unit === 'ms' && (
    <>
      Avg.: {averageTime?.toFixed(2)} ms / Slowest: {slowestTime?.toFixed(2)} ms
    </>
  )}
</Typography>
   </Box>
  );
}