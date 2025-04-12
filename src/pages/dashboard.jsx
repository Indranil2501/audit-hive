import { Box, Card, CardContent, Typography } from '@mui/material';

const Dashboard = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
        backgroundColor: '#f5f5f5', // Neutral light gray background
        overflow: 'hidden', // Prevent scrollbar
      }}
    >
      <Card
        sx={{
          width: '90%',
          textAlign: 'center',
          boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
          borderRadius: 4,
          backgroundColor: '#ffffff',
          padding: 3, // Add padding for better spacing
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: '#333',
              textDecoration: 'none',
            }}
          >
            Audit Hive
          </Typography>
          <Typography variant="body1" sx={{ color: '#555', lineHeight: 1.6 }}>
            Where tax audits meet simplicity.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;