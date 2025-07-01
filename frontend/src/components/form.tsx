import { Box, Button, TextField, Container} from "@mui/material";
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import api from "../../lib/api"; 
import { useState } from "react";
import { RootState, AppDispatch } from '../store'
import { useDispatch, useSelector } from 'react-redux'


export default function Form() {
   const dispatch = useDispatch<AppDispatch>()
   const { loading }= useSelector((state: RootState) => state.dbResult) 
    const [count, setCount] = useState<string | number>("");
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch({ type: 'dbResult/addSimulateCount' }); 
        dispatch({ type: 'dbResult/openLoading' }); 
        await api.post('/api/benchmark/postgres', { count: count}) 
          .then(res => {
            console.log('API 回傳資料：', res.data);
            dispatch({ type: 'dbResult/setPostgresqlResult', payload: res.data }); 
          })
          .catch(err => {
            dispatch({ type: 'dbResult/setError', payload: `API 錯誤: ${err}` });
            console.error('API 錯誤：', err);
        });
        await api.post('/api/benchmark/redis', { count: count})
          .then(res => {
            // update the state with the response data redis
            dispatch({ type: 'dbResult/setRedisResult', payload: res.data });
          })
          .catch(err => {
            dispatch({ type: 'dbResult/setError', payload: `API 錯誤: ${err}` });
            console.error('API 錯誤：', err);
        });
        dispatch({ type: 'dbResult/closeLoading' }); 
        dispatch({ type: 'dbResult/closeNoData' });
    };
    const handleClearCache = async () => {
      api.post('/api/redis/flush')
        .then(() => {
          console.log('11');
        })
        .catch(err => {
          dispatch({ type: 'dbResult/setError', payload: `API 錯誤: ${err}` });
          console.error('API 錯誤：', err);
        });
    }
    
  return (
    <Container sx={{margin:'0 5px' ,p: 2, bgcolor: 'white'}}>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 2, // 設定垂直間距
          alignItems: 'center', 
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          label="people"
          variant="outlined"
          type="number"
          size="small"
          fullWidth
          value={count}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            if (!isNaN(value)) {
              const clamped = Math.min(1000, Math.max(1, value));
              setCount(clamped);
            } else {
              setCount('');
            }
          }}
          placeholder="Enter number of people"
          helperText={Number(count) > 1000 ? '人數上限為 1000' : ''}
          inputProps={{ min: 1, max: 1000 }}
        />
        <Button 
            variant="contained"
            type="submit"
            startIcon={<DirectionsRunIcon />}
            loading={loading}
            loadingPosition="start"
            sx={{whiteSpace: 'nowrap', minWidth: '180px'}}
        >
          Run
        </Button>
        <Button 
            type="button"
            startIcon={<AutoDeleteIcon />}
            loadingPosition="start"
            sx={{whiteSpace: 'nowrap', minWidth: '180px'}}
            variant="outlined"
            color="warning"
            onClick={handleClearCache}
        >
          Clear Cache
        </Button>
      </Box>
    </Container>
  );
}
