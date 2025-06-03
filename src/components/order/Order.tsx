import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Avatar, Box, Chip, Grid2, IconButton, Paper, Typography } from '@mui/material';
import { pencilIcon, trashIcon } from '../../shared/icon/icon';
import { useStore } from '../../store';
import { Orders } from '../../shared/models/order';

const Order: React.FC = () => {
  const fetchAllOrders = useStore((state) => state.fetchAllOrders);
  const fetchAllCustomers = useStore((state) => state.fetchAllCustomers);
  const ordersList = useStore((state) => state.orders.ordersList);
  const customersList = useStore((state) => state.customers.customersList);

  const [ordersData, setOrdersData] = useState<Orders[]>([]);

  useEffect(() => {
    fetchAllOrders();
    fetchAllCustomers();
  }, []);

  useEffect(() => {
    if (ordersList) {
      setOrdersData(ordersList);
    }
  }, [ordersList]);

  const columnsOrder: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Order',
      width: 80,
      renderCell: (params) => (
        <Typography fontSize={'0.875rem'} value='body2'>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'customer.name',
      headerName: 'Customer',
      width: 250,
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Avatar
            src={'https://assets.minimals.cc/public/assets/images/mock/avatar/avatar-2.webp'}
            alt='Avatar'
            sx={{ width: 40, height: 40 }}
          />

          <Box>
            <Typography
              variant='body2'
              fontWeight={600}
              mb={0}
              sx={{ color: 'var(--palette-text-primary)' }}
            >
              {customersList?.find((customer) => customer.guid === params.row.customerGuid)?.name}
            </Typography>
            <Typography fontSize={'13px'} mt={0.5} sx={{ color: 'var(--palette-text-secondary)' }}>
              {customersList?.find((customer) => customer.guid === params.row.customerGuid)?.email}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 150,
      renderCell: (params) => (
        <Box>
          <Typography fontSize={'0.875rem'} value='body2'>
            {params.row.description}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'totalPrice',
      headerName: 'Total Price',
      width: 120,
    },
    {
      field: 'isActive',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => {
        let color;
        switch (params.value) {
          case 'Refunded':
            color = 'default';
            break;
          case 'Completed':
            color = 'success';
            break;
          case 'Pending':
            color = 'warning';
            break;
          default:
            color = 'default';
            break;
        }
        return <Chip label={params.value} color={color} />;
      },
    },
    {
      field: 'functions',
      headerName: '',
      width: 80,
      sortable: false,
      renderCell: () => (
        <Box>
          <IconButton size='small'>
            <img width={18} height={18} src={pencilIcon} alt='' />
          </IconButton>
          <IconButton size='small'>
            <img width={18} height={18} src={trashIcon} alt='' />
          </IconButton>
        </Box>
      ),
    },
  ];
  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Grid2 container alignItems={'center'}>
      <Grid2 size={12}>
        <Paper sx={{ p: 0 }}>
          <DataGrid
            rows={ordersData}
            columns={columnsOrder}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
              },
            }}
            className='datagrid-minimals-custom'
            sx={{ minHeight: 500, maxHeight: 500 }}
          />
        </Paper>
      </Grid2>
    </Grid2>
  );
};

export default Order;
