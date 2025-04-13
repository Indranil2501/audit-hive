import { Box, Breadcrumbs, Button, Card, CardContent, CircularProgress, Link, Typography } from '@mui/material';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import apiConfig from '../api/apiConfig';
import axiosInstance from '../api/axiosInstance';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [gridData, setGridData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20);
  const [filteredCount, setFilteredCount] = useState(0);
  const gridApiRef = useRef(null);

  const gridColumns = [
    { headerName: 'ID', field: 'id', width: 100 },
    { headerName: 'TIN', field: 'tin', width: 150 },
    { headerName: 'Taxpayer Name', field: 'taxpayer_name', width: 200 },
    { headerName: 'Segmentation', field: 'segmentation', width: 150 },
    { headerName: 'Taxpayer Type', field: 'taxpayer_type', width: 150 },
    { headerName: 'Tax Account Number', field: 'tax_account_number', width: 200 },
    { headerName: 'Assessment Number', field: 'assessment_number', width: 200 },
    { headerName: 'Form Version', field: 'form_version', width: 150 },
    { headerName: 'Tax Period Year', field: 'tax_period_year', width: 150 },
    { headerName: 'Tax Period Month', field: 'tax_period_month', width: 150 },
    { headerName: 'Received Date', field: 'received_date', width: 150 },
    { headerName: 'Entry Date', field: 'entry_date', width: 150 },
    { headerName: 'Due Date', field: 'due_date', width: 150 },
    { headerName: 'Total Sales Income', field: 'total_sales_income', width: 200 },
    { headerName: 'Exempt Sales', field: 'exempt_sales', width: 150 },
    { headerName: 'Zero Rated Sales', field: 'zero_rated_sales', width: 200 },
    { headerName: 'Add Exempt and Zero Rated Sales', field: 'add_exempt_and_zero_rated_sales', width: 250 },
    { headerName: 'GST Taxable Sales', field: 'gst_taxable_sales', width: 200 },
    { headerName: 'Output Debits', field: 'output_debits', width: 150 },
    { headerName: 'Deferred Import Liabilities', field: 'deferred_import_liabilities', width: 250 },
    { headerName: 'GST Paid on Inputs', field: 'gst_paid_on_inputs', width: 200 },
    { headerName: 'GST Paid Exempt Sales', field: 'gst_paid_exempt_sales', width: 200 },
    { headerName: 'GST Paid Private', field: 'gst_paid_private', width: 200 },
    { headerName: 'Add Private and Exempt GST Paid', field: 'add_private_and_exempt_gst_paid', width: 250 },
    { headerName: 'Input Credits', field: 'input_credits', width: 150 },
    { headerName: 'Deduct Input Credits', field: 'deduct_input_credits', width: 200 },
    { headerName: 'GST Payable', field: 'gst_payable', width: 150 },
    { headerName: 'GST Refundable', field: 'gst_refundable', width: 150 },
    { headerName: 'GST Sec65A Credit Allowable', field: 'gst_sec65a_credit_allowable', width: 250 },
    { headerName: 'Sector Activity', field: 'sector_activity', width: 200 },
    { headerName: 'Province', field: 'province', width: 150 },
    { headerName: 'Enterprise Activity', field: 'enterprise_activity', width: 200 },
    { headerName: 'Enterprise Activity Code', field: 'enterprise_activity_code', width: 200 },
    { headerName: 'Created Date', field: 'created_date', width: 150 },
    { headerName: 'Updated Date', field: 'updated_date', width: 150 },
    { headerName: 'Created By', field: 'created_by', width: 150 },
    { headerName: 'Updated By', field: 'updated_by', width: 150 },
  ];

  const defaultColDef = {
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
    floatingFilter: true,
  };

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

  const fetchGridData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/taxdata?type=GST&tax_period_year=2021&tax_period_month=2&pageSize=${pageSize}&pageNumber=${currentPage}`
      );
      setGridData(response.data.data);
      setTotalRecords(response.data.total_records);
      setFilteredCount(response.data.total_records);
    } catch (error) {
      console.error('Error fetching grid data:', error);
      toast.error('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onGridReady = (params) => {
    gridApiRef.current = params.api;
  };

  const onFilterChanged = () => {
    if (gridApiRef.current) {
      const filteredRows = gridApiRef.current.getDisplayedRowCount();
      setFilteredCount(filteredRows);
    }
  };

  useEffect(() => {
    fetchGridData();
  }, [currentPage]);

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
              {/* <Typography variant="body2" color="text.secondary">
                {filteredCount} of {totalRecords} rows
              </Typography> */}
            </Breadcrumbs>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              onClick={() => {
                if (gridApiRef.current) {
                  gridApiRef.current.setFilterModel(null);
                  setFilteredCount(totalRecords);
                }
              }}
              sx={{
                textTransform: 'none',
                marginLeft: 2,
              }}
            >
              Clear Filters
            </Button>
          </Box>

          {/* ag-Grid */}
          <Box
            className="ag-theme-alpine"
            sx={{
              flex: 1,
              height: '100%',
              width: '100%',
              overflowX: 'auto',
              overflowY: 'auto',
            }}
          >
            <AgGridReact
              rowData={gridData}
              columnDefs={gridColumns}
              domLayout="normal"
              defaultColDef={defaultColDef}
              onGridReady={onGridReady}
              onFilterChanged={onFilterChanged}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;