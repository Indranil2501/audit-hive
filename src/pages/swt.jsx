import { Typography, Box } from '@mui/material';

const SWT = () => {
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
        <Typography variant="h4">SWT Page</Typography>
        <Typography variant="body1">Details about Software Tax.</Typography>
      </Box>
    </Box>
  );
};

export default SWT;