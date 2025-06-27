import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

export const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
    // border: '1px solid #eee', // ✅ 加細邊框
    boxShadow: 'none',
    '&:hover': {
      boxShadow: theme.shadows[4],
    },
    overflow: 'visible'

}));