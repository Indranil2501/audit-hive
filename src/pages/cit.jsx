import { Typography, Box } from '@mui/material';

const CIT = () => {
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
        <Typography variant="h4">CIT Page</Typography>
        <Typography variant="body1">Details about Corporate Income Tax.</Typography>
      </Box>
    </Box>
  );
};

export default CIT;