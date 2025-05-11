import React from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Avatar, Box, Chip, Grid2, IconButton, Paper, Typography } from '@mui/material';
import { pencilIcon, trashIcon } from '../../shared/icon/icon';

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
            {params.row.customer.name}
          </Typography>
          <Typography fontSize={'13px'} mt={0.5} sx={{ color: 'var(--palette-text-secondary)' }}>
            {params.row.customer.email}
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    field: 'date',
    headerName: 'Date',
    width: 150,
    renderCell: (params) => (
      <Box>
        <Typography fontSize={'0.875rem'} value='body2'>
          {params.value}
        </Typography>
        <Typography sx={{ color: 'var(--palette-text-secondary)' }} variant='caption'>
          {params.row.time}
        </Typography>
      </Box>
    ),
  },
  {
    field: 'items',
    headerName: 'Items',
    width: 80,
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 120,
  },
  {
    field: 'status',
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

const ordersData = [
  {
    id: '#6010',
    customer: {
      avatar: '/path/to/avatar1.png',
      name: 'Jayvion Simon',
      email: 'nannie.abernathy70@yahoo.com',
    },
    date: '10 Mar 2025',
    time: '3:28 pm',
    items: 6,
    price: '$484.15',
    status: 'Refunded',
  },
  {
    id: '#6011',
    customer: {
      avatar: '/path/to/avatar2.png',
      name: 'Lucian Obrien',
      email: 'ashlynn.ohara62@gmail.com',
    },
    date: '09 Mar 2025',
    time: '2:28 pm',
    items: 1,
    price: '$83.74',
    status: 'Completed',
  },
  {
    id: '#60110',
    customer: {
      avatar: '/path/to/avatar3.png',
      name: 'Soren Durham',
      email: 'vergie.block82@hotmail.com',
    },
    date: '28 Feb 2025',
    time: '5:28 am',
    items: 5,
    price: '$400.41',
    status: 'Pending',
  },
  {
    id: '#60111',
    customer: {
      avatar: '/path/to/avatar4.png',
      name: 'Cortez Herring',
      email: 'vito.hudson@hotmail.com',
    },
    date: '27 Feb 2025',
    time: '4:28 am',
    items: 1,
    price: '$83.74',
    status: 'Completed',
  },
  {
    id: '#60112',
    customer: {
      avatar: '/path/to/avatar5.png',
      name: 'Brycen Jimenez',
      email: 'tyrel.greenholt@gmail.com',
    },
    date: '26 Feb 2025',
    time: '3:28 am',
    items: 6,
    price: '$484.15',
    status: 'Refunded',
  },
];

const paginationModel = { page: 0, pageSize: 5 };

const Order: React.FC = () => {
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
