import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Avatar, Box, Button, Chip, Grid2, IconButton, Paper, Typography } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { useStore } from '../../store';
import { trashIcon } from '../../shared/icon/icon';
import { pencilIcon } from '../../shared/icon/icon';
import ConfirmationDialog from '../confirmation/ConfirmationModal';
import CreateCustomerDialog from './create/CreateCustomer';

const Customer: React.FC = () => {
  const fetchAllCustomers = useStore((state) => state.fetchAllCustomers);
  const deleteCustomer = useStore((state) => state.deleteCustomer);
  const customersList = useStore((state) => state.customers.customersList);

  const [customersData, setCustomersData] = useState<any[]>();
  const [openCreateCustomer, setOpenCreateCustomer] = useState(false);
  const [openEditCustomer, setOpenEditCustomer] = useState(false);
  const [openConfirmDelete, setConfirmDelete] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<any>(null);

  useEffect(() => {
    fetchAllCustomers();
  }, []);

  useEffect(() => {
    if (customersList && customersList.length > 0) {
      setCustomersData(customersList);
    }
  }, [customersList]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 40 },
    {
      field: 'name',
      headerName: 'Customer',
      width: 200,
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Avatar alt='Avatar' sx={{ width: 40, height: 40 }}>
            {params.row.name.charAt(0)}
          </Avatar>

          <Box>
            <Typography
              variant='body2'
              fontWeight={600}
              mb={0}
              sx={{ color: 'var(--palette-text-primary)' }}
            >
              {params.row.name}
            </Typography>
            <Typography fontSize={'13px'} mt={0.5} sx={{ color: 'var(--palette-text-secondary)' }}>
              {params.row.email}
            </Typography>
          </Box>
        </Box>
      ),
    },
    { field: 'phone', headerName: 'Phone', width: 100, flex: 1 },
    { field: 'address', headerName: 'Address', width: 100, flex: 1 },
    { field: 'bankcard', headerName: 'Bank Card', width: 100, flex: 1 },
    { field: 'createdDate', headerName: 'Created Date', width: 120 },
    { field: 'updatedDate', headerName: 'Updated Date', width: 120 },
    {
      field: 'status',
      headerName: 'Status',
      width: 80,
      renderCell: (params) => (
        <Chip
          color={params.value ? 'success' : 'error'}
          label={params.value ? 'Active' : 'Inactive'}
        />
      ),
    },
    {
      field: 'functions',
      headerName: '',
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton
            size='small'
            onClick={() => {
              setOpenCreateCustomer(true);
              setOpenEditCustomer(true);
              setCurrentCustomer(params.row);
            }}
          >
            <img width={18} height={18} src={pencilIcon} alt='' />
          </IconButton>
          <IconButton
            size='small'
            onClick={() => {
              setConfirmDelete(true);
              setCurrentCustomer(params.row);
            }}
          >
            <img width={18} height={18} src={trashIcon} alt='' />
          </IconButton>
        </Box>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <>
      <Button
        sx={{
          position: 'absolute',
          right: '40px',
          top: '16px',
          width: 'fit-content',
          bgcolor: 'var(--palette-grey-800)',
          color: 'var(--palette-common-white)',
          padding: '8px',
          gap: '4px',
          fontSize: '13px',
        }}
        type='submit'
        variant='contained'
        fullWidth
        onClick={() => setOpenCreateCustomer(true)}
      >
        <AddOutlinedIcon fontSize={'small'} /> New customer
      </Button>

      <Grid2 container alignItems={'center'}>
        <Grid2 size={12}>
          <Paper sx={{ p: 0 }}>
            <DataGrid
              rows={customersData}
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              disableRowSelectionOnClick
              className='datagrid-minimals-custom'
              sx={{ minHeight: 500, maxHeight: 500 }}
            />
          </Paper>
        </Grid2>
      </Grid2>

      <CreateCustomerDialog
        open={openCreateCustomer}
        isEdit={openEditCustomer}
        customer={currentCustomer}
        onClose={() => {
          setOpenEditCustomer(false);
          setOpenCreateCustomer(false);
        }}
      />

      <ConfirmationDialog
        open={openConfirmDelete}
        title='Delete customer'
        description='Are you sure you want to delete this customer?'
        type='warning'
        onClose={() => setConfirmDelete(false)}
        onConfirm={async () => {
          await deleteCustomer(currentCustomer.id);
          await fetchAllCustomers();
          setConfirmDelete(false);
        }}
      />
    </>
  );
};

export default Customer;
