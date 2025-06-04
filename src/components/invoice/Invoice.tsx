import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Avatar, Box, Chip, Grid2, IconButton, Paper, Typography } from '@mui/material';
import { pencilIcon, trashIcon } from '../../shared/icon/icon';

const columnsInvoice: GridColDef[] = [
  {
    field: 'customer',
    headerName: 'Customer',
    width: 250,
    flex: 1,
    renderCell: (params) => (
      <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Avatar
          alt={params.value.name}
          sx={{ width: 40, height: 40, bgcolor: `${params.value.avatarColor}` }}
        >
          {params.value.name[0]}
        </Avatar>

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
            {params.row.customer.invoiceNumber}
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    field: 'createDate',
    headerName: 'Created',
    width: 180,
    renderCell: (params) => (
      <Box>
        <Typography fontSize={'0.875rem'} value='body2'>
          {params.value}
        </Typography>
        <Typography sx={{ color: 'var(--palette-text-secondary)' }} variant='caption'>
          {params.row.createTime}
        </Typography>
      </Box>
    ),
  },
  {
    field: 'dueDate',
    headerName: 'Due',
    width: 180,
    renderCell: (params) => (
      <Box>
        <Typography fontSize={'0.875rem'} value='body2'>
          {params.value}
        </Typography>
        <Typography sx={{ color: 'var(--palette-text-secondary)' }} variant='caption'>
          {params.row.dueTime}
        </Typography>
      </Box>
    ),
  },
  {
    field: 'amount',
    headerName: 'Amount',
    width: 120,
  },
  {
    field: 'sent',
    headerName: 'Sent',
    width: 80,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 150,
    renderCell: (params) => (
      <Chip
        label={params.value}
        color={
          params.value === 'Paid' ? 'success' : params.value === 'Pending' ? 'warning' : 'error'
        }
      />
    ),
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

const invoicesData = [
  {
    id: 1,
    customer: {
      name: 'Amiah Pruitt',
      invoiceNumber: 'INV-19919',
      avatarColor: 'green',
    },
    createDate: '19 Feb 2025',
    createTime: '3:28 pm',
    dueDate: '14 Apr 2025',
    dueTime: '10:28 am',
    amount: '$2,331.63',
    sent: 9,
    status: 'Paid',
  },
  {
    id: 2,
    customer: {
      name: 'Ariana Lang',
      invoiceNumber: 'INV-19918',
      avatarColor: 'green',
    },
    createDate: '20 Feb 2025',
    createTime: '3:28 pm',
    dueDate: '13 Apr 2025',
    dueTime: '9:28 am',
    amount: '$2,372.93',
    sent: 4,
    status: 'Overdue',
  },
  {
    id: 3,
    customer: {
      name: 'Lawson Bass',
      invoiceNumber: 'INV-19917',
      avatarColor: 'blue',
    },
    createDate: '21 Feb 2025',
    createTime: '3:28 pm',
    dueDate: '12 Apr 2025',
    dueTime: '8:28 am',
    amount: '$2,283.97',
    sent: 9,
    status: 'Paid',
  },
  {
    id: 4,
    customer: {
      name: 'Selina Boyer',
      invoiceNumber: 'INV-19916',
      avatarColor: 'orange',
    },
    createDate: '22 Feb 2025',
    createTime: '3:28 pm',
    dueDate: '11 Apr 2025',
    dueTime: '7:28 am',
    amount: '$2,251.84',
    sent: 8,
    status: 'Pending',
  },
  {
    id: 5,
    customer: {
      name: 'Angelique Morse',
      invoiceNumber: 'INV-19915',
      avatarColor: 'green',
    },
    createDate: '23 Feb 2025',
    createTime: '3:28 pm',
    dueDate: '10 Apr 2025',
    dueTime: '6:28 am',
    amount: '$2,343.51',
    sent: 11,
    status: 'Paid',
  },
];

const paginationModel = { page: 0, pageSize: 5 };

const Invoice: React.FC = () => {
  return (
    <Grid2 container alignItems={'center'}>
      <Grid2 size={12}>
        <Paper sx={{ p: 0 }}>
          <DataGrid
            rows={invoicesData}
            columns={columnsInvoice}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            className='datagrid-minimals-custom'
            sx={{ minHeight: 500, maxHeight: 500 }}
          />
        </Paper>
      </Grid2>
    </Grid2>
  );
};

export default Invoice;
