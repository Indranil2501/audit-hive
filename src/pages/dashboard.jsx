import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Button, Breadcrumbs, Link, CircularProgress, IconButton, Menu, MenuItem } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useSelector } from 'react-redux';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-toastify';
import apiConfig from '../api/apiConfig';
import FilterListIcon from '@mui/icons-material/FilterList';

const Dashboard = () => {
  const [loading, setLoading] = useState(false); // State for loader
  const [anchorEl, setAnchorEl] = useState(null); // State for filter/sort menu
  const open = Boolean(anchorEl);

  const gridData = [
    { id: 1, name: 'John Doe', role: 'Auditor' },
    { id: 2, name: 'Jane Smith', role: 'Manager' },
    { id: 3, name: 'Alice Johnson', role: 'Analyst' },
  ];

  const gridColumns = [
    { headerName: 'ID', field: 'id', flex: 1 },
    { headerName: 'TIN', field: 'tin', flex: 1 },
    { headerName: 'Taxpayer Name', field: 'taxpayer_name', flex: 2 },
    { headerName: 'Segmentation', field: 'segmentation', flex: 1 },
    { headerName: 'Taxpayer Type', field: 'taxpayer_type', flex: 1 },
    { headerName: 'Tax Account Number', field: 'tax_account_number', flex: 1 },
    { headerName: 'Assessment Number', field: 'assessment_number', flex: 1 },
    { headerName: 'Form Version', field: 'form_version', flex: 1 },
    { headerName: 'Tax Period Year', field: 'tax_period_year', flex: 1 },
    { headerName: 'Tax Period Month', field: 'tax_period_month', flex: 1 },
    { headerName: 'Received Date', field: 'received_date', flex: 1 },
    { headerName: 'Entry Date', field: 'entry_date', flex: 1 },
    { headerName: 'Due Date', field: 'due_date', flex: 1 },
    { headerName: 'Total Sales Income', field: 'total_sales_income', flex: 1 },
    { headerName: 'Exempt Sales', field: 'exempt_sales', flex: 1 },
    { headerName: 'Zero Rated Sales', field: 'zero_rated_sales', flex: 1 },
    { headerName: 'Add Exempt and Zero Rated Sales', field: 'add_exempt_and_zero_rated_sales', flex: 1 },
    { headerName: 'GST Taxable Sales', field: 'gst_taxable_sales', flex: 1 },
    { headerName: 'Output Debits', field: 'output_debits', flex: 1 },
    { headerName: 'Deferred Import Liabilities', field: 'deferred_import_liabilities', flex: 1 },
    { headerName: 'GST Paid on Inputs', field: 'gst_paid_on_inputs', flex: 1 },
    { headerName: 'GST Paid Exempt Sales', field: 'gst_paid_exempt_sales', flex: 1 },
    { headerName: 'GST Paid Private', field: 'gst_paid_private', flex: 1 },
    { headerName: 'Add Private and Exempt GST Paid', field: 'add_private_and_exempt_gst_paid', flex: 1 },
    { headerName: 'Input Credits', field: 'input_credits', flex: 1 },
    { headerName: 'Deduct Input Credits', field: 'deduct_input_credits', flex: 1 },
    { headerName: 'GST Payable', field: 'gst_payable', flex: 1 },
    { headerName: 'GST Refundable', field: 'gst_refundable', flex: 1 },
    { headerName: 'GST Sec65A Credit Allowable', field: 'gst_sec65a_credit_allowable', flex: 1 },
    { headerName: 'Sector Activity', field: 'sector_activity', flex: 1 },
    { headerName: 'Province', field: 'province', flex: 1 },
    { headerName: 'Enterprise Activity', field: 'enterprise_activity', flex: 1 },
    { headerName: 'Enterprise Activity Code', field: 'enterprise_activity_code', flex: 1 },
    { headerName: 'Created Date', field: 'created_date', flex: 1 },
    { headerName: 'Updated Date', field: 'updated_date', flex: 1 },
    { headerName: 'Created By', field: 'created_by', flex: 1 },
    { headerName: 'Updated By', field: 'updated_by', flex: 1 },
  ];

  const token = useSelector((state) => state.auth.token);

  const handleFileUpload = async () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv';
    fileInput.onchange = async (event) => {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        setLoading(true); // Show loader
        try {
          const response = await axiosInstance.post(apiConfig.uploadGstCsv, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          });
          console.log('File uploaded successfully:', response.data);
          toast.success('File uploaded successfully!');
        } catch (error) {
          console.error('File upload failed:', error);
          toast.error('File upload failed. Please try again.');
        } finally {
          setLoading(false); // Hide loader
        }
      }
    };
    fileInput.click();
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFilterSortOption = (option) => {
    console.log(`Selected option: ${option}`);
    // Implement filter/sort logic here
    handleMenuClose();
  };

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
          onClick={handleFileUpload}
          disabled={loading} // Disable button while loading
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Upload File'}
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="#">
                Home
              </Link>
              <Typography color="text.primary">Dashboard</Typography>
            </Breadcrumbs>
            <IconButton onClick={handleMenuOpen}>
              <FilterListIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
              <MenuItem onClick={() => handleFilterSortOption('Sort by Name')}>Sort by Name</MenuItem>
              <MenuItem onClick={() => handleFilterSortOption('Sort by Role')}>Sort by Role</MenuItem>
              <MenuItem onClick={() => handleFilterSortOption('Filter by Role: Auditor')}>Filter by Role: Auditor</MenuItem>
            </Menu>
          </Box>

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
              defaultColDef={{
                sortable: true,
                filter: true,
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;