import { Box, Card, CardContent, Typography, Button, Breadcrumbs, Link } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const Dashboard = () => {
  const gridData = [
    { id: 1, name: 'John Doe', role: 'Auditor' },
    { id: 2, name: 'Jane Smith', role: 'Manager' },
    { id: 3, name: 'Alice Johnson', role: 'Analyst' },
  ];

  const gridColumns = [
    { headerName: 'ID', field: 'id', flex: 1 },
    { headerName: 'Name', field: 'name', flex: 2 },
    { headerName: 'Role', field: 'role', flex: 2 },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '90vh',
        backgroundColor: '#f5f5f5',
        overflow: 'hidden',
        padding: 2,
      }}
    >
      <Card
        sx={{
          width: '100%',
          marginBottom: 2,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          borderRadius: 2,
          backgroundColor: '#ffffff',
          flexShrink: 0,
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              color: '#333',
              textAlign: 'center',
            }}
          >
            Audit Hive
          </Typography>
        </CardContent>
      </Card>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '100%',
          marginBottom: 2,
          flexShrink: 0,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            textTransform: 'none',
          }}
        >
          Upload File
        </Button>
      </Box>
      <Card
        sx={{
          flex: 1,
          width: '100%',
          maxHeight: '80vh',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          borderRadius: 2,
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <CardContent
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: 2,
          }}
        >
          {/* Breadcrumbs */}
          <Breadcrumbs
            sx={{
              marginBottom: 2,
            }}
            aria-label="breadcrumb"
          >
            <Link
              underline="hover"
              color="inherit"
              href="#"
            >
              Home
            </Link>
            <Typography color="text.primary">Dashboard</Typography>
          </Breadcrumbs>

          {/* ag-Grid */}
          <Box
            className="ag-theme-alpine"
            sx={{
              flex: 1,
              width: '100%',
              overflow: 'hidden',
            }}
          >
            <AgGridReact
              rowData={gridData}
              columnDefs={gridColumns}
              domLayout="normal"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;