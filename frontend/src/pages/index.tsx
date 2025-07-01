import Head from 'next/head';
import Link from 'next/link';
import { Grid } from '@mui/material';
import Layout from '../components/layout';
import  DatabaseLineChart from '../components/line_chart';
import  DatabaseBarChart from '../components/bar_chart';
import DataPieChart from '../components/pie_chart'
import Form from '@/components/form';
import { Item } from '@/components/styledBox';
import BasicCard from '@/components/post_card';
import Typography from '@mui/material/Typography';


import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../store'


export default function FirstPost() {
  const dispatch = useDispatch<AppDispatch>()
  const dbResult= useSelector((state: RootState) => state.dbResult)
  const postgresql_response = dbResult?.postgresql_response || {};
  const redis_response = dbResult?.redis_response || {};
  const {
    fastestTime: postgresqlFastestTime, 
    averageTime: postgresqlAverageTime, 
    slowestTime: postgresqlSlowestTime,
  } = postgresql_response;
  const {
    averageTime: redisAverageTime,
    fastestTime: redisFastestTime,
    slowestTime: redisSlowestTime,
    hitRate:  redisCacheHitRate
  } = redis_response
  const simulationCount = dbResult?.simulate_count|| 0;
  let no_data = dbResult?.no_data ?? true;

  return (
    <Layout home={false}>
      <Head>
        <title>Simulate DB</title>
      </Head>
      <Grid size={12} sx={{
        textAlign: 'center',
      }}>
      </Grid>
      <Grid  size={12} sx={{
        alignItems: 'center',
        textAlign: 'center',
      }}>
        {no_data ? (
          <Typography variant="h6" component="div" sx={{ mb: 2, color: 'text.secondary',}}>
            No Data ...
          </Typography>
        ):
        <Grid container spacing={4} >
        <Grid size={{ xs: 6, md: 3 }}>
          <Item>
            <BasicCard rawData={{
              primaryKey: postgresqlFastestTime, 
              title:'PostgreSQL Fast Time', 
              color:'#1e88e5', 
              unit: 'ms',
              averageTime: postgresqlAverageTime,
              slowestTime: postgresqlSlowestTime
            }}/>
          </Item>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <Item>
            <BasicCard rawData={{
              primaryKey: redisFastestTime, 
              title:'Redis Fast Time', 
              color:'#1e88e5', 
              unit: 'ms',
              averageTime: redisAverageTime,
              slowestTime: redisSlowestTime
            }}/>
          </Item>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <Item>
            <BasicCard rawData={{
              primaryKey:redisCacheHitRate, 
              title:'Hit Rate', 
              color:'#1e88e5', 
              unit: '%'}}
            />
          </Item>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <Item>
            <BasicCard rawData={{
              primaryKey:simulationCount, 
              title:'Cumulative simulation', 
              color:'#1e88e5', 
              unit: 'times'}}
            />
          </Item>
        </Grid>
        <Grid size={{ xs: 6, md: 8}}>
          <Item>
            <DatabaseLineChart/>
          </Item>
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
          <Item>
             <DataPieChart/>
          </Item>
        </Grid>
      </Grid>
        }
      </Grid>
    </Layout>
  );
}