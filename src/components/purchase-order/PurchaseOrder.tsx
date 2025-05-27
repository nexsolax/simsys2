import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, Chip, Grid2, IconButton, Paper, Typography } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { PurchaseOrderDetail, PurchaseOrders } from '../../shared/models/purchase-order';
import { useStore } from '../../store';
import { pencilIcon, trashIcon } from '../../shared/icon/icon';
import CreatePurchaseOrderDialog from './create/CreatePurchaseOrder';
import ConfirmationDialog from '../confirmation/ConfirmationModal';

const PurchaseOrder: React.FC = () => {
  const fetchAllPurchaseOrders = useStore((state) => state.fetchAllPurchaseOrders);
  const fetchAllSuppliers = useStore((state) => state.fetchAllSuppliers);
  const fetchAllProducts = useStore((state) => state.fetchAllProducts);
  const deletePurchaseOrder = useStore((state) => state.deletePurchaseOrder);
  const purchaseOrdersList = useStore((state) => state.purchaseOrders.purchaseOrdersList);
  const suppliersList = useStore((state) => state.suppliers.suppliersList);
  const productsList = useStore((state) => state.products.productsList);
  const [ordersData, setOrdersData] = useState<PurchaseOrders[]>([]);
  const [openCreatePurchaseOrder, setOpenCreatePurchaseOrder] = useState(false);
  const [openEditPurchaseOrder, setOpenEditPurchaseOrder] = useState(false);
  const [currentPurchaseOrder, setCurrentPurchaseOrder] = useState<PurchaseOrders | null>(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  useEffect(() => {
    fetchAllPurchaseOrders();
    fetchAllSuppliers();
    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (purchaseOrdersList) {
      setOrdersData(purchaseOrdersList);
    }
  }, [purchaseOrdersList]);

  const columns: GridColDef[] = [
    {
      field: 'guid',
      headerName: 'ID',
      width: 120,
      renderCell: (params) => (
        <Typography variant='body2'>
          {params.row.guid.slice(0, 3) + '...' + params.row.guid.slice(-3)}
        </Typography>
      ),
    },
    {
      field: 'supplierId',
      headerName: 'Supplier',
      width: 100,
      flex: 1,
      renderCell: (params) => {
        const supplier = suppliersList?.find(
          (supplier) => supplier.guid === params.row.supplierGuid,
        );
        return <Typography variant='body2'>{supplier?.name}</Typography>;
      },
    },
    { field: 'description', headerName: 'Description', width: 300, flex: 1 },
    {
      field: 'purchaseOrderDetails',
      headerName: 'Products',
      width: 300,
      flex: 1,
      renderCell: (params) => {
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {params.row.purchaseOrderDetails.map((detail: PurchaseOrderDetail, index: number) => {
              const product = productsList?.find((product) => product.guid === detail.productGuid);
              return (
                <Box
                  key={detail.guid}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <Typography variant='body2' textTransform='capitalize'>
                    {index + 1}. {product?.name} ({product?.variant.size} - {product?.variant.color}
                    )
                  </Typography>
                  <Typography variant='body2'>Quantity: {detail.quantity}</Typography>
                </Box>
              );
            })}
          </Box>
        );
      },
    },
    { field: 'totalPrice', headerName: 'Total Price', width: 100, flex: 1 },
    {
      field: 'isActive',
      headerName: 'Status',
      width: 80,
      flex: 1,
      renderCell: (params) => {
        let color;
        switch (params.value) {
          case 'approve':
            color = 'success';
            break;
          case 'reject':
            color = 'error';
            break;
          case 'in process':
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
      renderCell: (params) => {
        return (
          <Box>
            <IconButton
              size='small'
              onClick={() => {
                setOpenEditPurchaseOrder(true);
                setCurrentPurchaseOrder(params.row);
              }}
            >
              <img width={18} height={18} src={pencilIcon} alt='' />
            </IconButton>
            <IconButton
              size='small'
              onClick={() => {
                setOpenConfirmDelete(true);
                setCurrentPurchaseOrder(params.row);
              }}
            >
              <img width={18} height={18} src={trashIcon} alt='' />
            </IconButton>
          </Box>
        );
      },
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
        onClick={() => setOpenCreatePurchaseOrder(true)}
      >
        <AddOutlinedIcon fontSize={'small'} /> New purchase order
      </Button>

      <Grid2 container alignItems={'center'}>
        <Grid2 size={12}>
          <Paper sx={{ p: 0 }}>
            <DataGrid
              rows={ordersData}
              columns={columns}
              getRowId={(row) => row.guid}
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

      <CreatePurchaseOrderDialog
        open={openCreatePurchaseOrder}
        isEdit={openEditPurchaseOrder}
        purchaseOrder={currentPurchaseOrder}
        onClose={() => setOpenCreatePurchaseOrder(false)}
      />

      <ConfirmationDialog
        open={openConfirmDelete}
        title='Delete Purchase Order'
        description='Are you sure you want to delete this purchase order?'
        type='warning'
        onClose={() => setOpenConfirmDelete(false)}
        onConfirm={() => {
          deletePurchaseOrder(currentPurchaseOrder!.guid);
          setOpenConfirmDelete(false);
        }}
      />
    </>
  );
};

export default PurchaseOrder;
