import { Typography, Box } from '@mui/material';

const GST = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
        backgroundColor: 'background.default', // Use theme background
      }}
    >
      <Box sx={{ textAlign: 'center', p: 3 }}>
        <Typography variant="h4">GST Page</Typography>
        <Typography variant="body1">Details about Goods and Services Tax.</Typography>
      </Box>
    </Box>
  );
};

export default GST;