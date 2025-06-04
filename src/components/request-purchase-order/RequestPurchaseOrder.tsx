import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, Chip, Grid2, IconButton, Paper } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CreateRequestPurchaseOrderDialog from './create/CreateRequestPurchaseOrder';
import ConfirmationDialog from '../confirmation/ConfirmationModal';
import { pencilIcon, trashIcon } from '../../shared/icon/icon';

const RequestPurchaseOrder: React.FC = () => {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<any>(null);
  const [ordersData, setOrdersData] = useState<any[]>([
    {
      id: 1,
      supplierId: 101,
      quantity: 50,
      costPrice: 200,
      status: 'Pending',
      totalAmount: 10000,
      orderDate: '2024-03-01',
    },
  ]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'supplierId', headerName: 'Supplier ID', width: 100, flex: 1 },
    { field: 'quantity', headerName: 'Quantity', width: 100, flex: 1 },
    { field: 'costPrice', headerName: 'Cost Price', width: 100, flex: 1 },
    { field: 'totalAmount', headerName: 'Total Amount', width: 120, flex: 1 },
    { field: 'orderDate', headerName: 'Order Date', width: 120, flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      flex: 1,
      renderCell: (params) => {
        let color;
        switch (params.value) {
          case 'Approve':
            color = 'success';
            break;
          case 'Reject':
            color = 'error';
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
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton
            size='small'
            onClick={() => {
              setOpenCreateDialog(true);
              setOpenEditDialog(true);
              setCurrentOrder(params.row);
            }}
          >
            <img width={18} height={18} src={pencilIcon} alt='Edit' />
          </IconButton>
          <IconButton
            size='small'
            onClick={() => {
              setOpenConfirmDelete(true);
              setCurrentOrder(params.row);
            }}
          >
            <img width={18} height={18} src={trashIcon} alt='Delete' />
          </IconButton>
        </Box>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  const handleDeleteOrder = (id: number) => {
    setOrdersData(ordersData.filter((order) => order.id !== id));
  };

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
        onClick={() => setOpenCreateDialog(true)}
      >
        <AddOutlinedIcon fontSize={'small'} /> New Request Order
      </Button>

      <Grid2 container alignItems={'center'}>
        <Grid2 size={12}>
          <Paper sx={{ p: 0 }}>
            <DataGrid
              rows={ordersData}
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

      <CreateRequestPurchaseOrderDialog
        open={openCreateDialog}
        isEdit={openEditDialog}
        order={currentOrder}
        onClose={(order) => {
          if (order && order.id) {
            if (openEditDialog) {
              setOrdersData(ordersData.map((o) => (o.id === order.id ? order : o)));
            } else {
              setOrdersData([...ordersData, order]);
            }
          }
          setOpenEditDialog(false);
          setOpenCreateDialog(false);
        }}
      />

      <ConfirmationDialog
        open={openConfirmDelete}
        title='Delete Order'
        description='Are you sure you want to delete this request purchase order?'
        type='warning'
        onClose={() => setOpenConfirmDelete(false)}
        onConfirm={() => {
          handleDeleteOrder(currentOrder.id);
          setOpenConfirmDelete(false);
        }}
      />
    </>
  );
};

export default RequestPurchaseOrder;
