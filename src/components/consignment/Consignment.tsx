import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Avatar, Box, Button, Grid2, IconButton, Paper, Typography } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { useStore } from '../../store';
import { trashIcon } from '../../shared/icon/icon';
import { pencilIcon } from '../../shared/icon/icon';
import ConfirmationDialog from '../confirmation/ConfirmationModal';
import CreateConsignmentDialog from './create/CreateConsignment';

const Consignment: React.FC = () => {
  const fetchAllConsignments = useStore((state) => state.fetchAllConsignments);
  const fetchAllSuppliers = useStore((state) => state.fetchAllSuppliers);
  const fetchAllPurchaseOrders = useStore((state) => state.fetchAllPurchaseOrders);
  const deleteConsignment = useStore((state) => state.deleteConsignment);
  const consignmentsList = useStore((state) => state.consignments.consignmentsList);
  const suppliersList = useStore((state) => state.suppliers.suppliersList);
  const purchaseOrdersList = useStore((state) => state.purchaseOrders.purchaseOrdersList);

  const [openCreateConsignment, setOpenCreateConsignment] = useState(false);
  const [openEditConsignment, setOpenEditConsignment] = useState(false);
  const [openConfirmDelete, setConfirmDelete] = useState(false);
  const [currentConsignment, setCurrentConsignment] = useState<any>(null);

  useEffect(() => {
    fetchAllConsignments();
    fetchAllSuppliers();
    fetchAllPurchaseOrders();
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 40 },
    {
      field: 'name',
      headerName: 'Consignment',
      width: 200,
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
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
              {params.row.description}
            </Typography>
          </Box>
        </Box>
      ),
    },
    { field: 'sku', headerName: 'SKU', width: 100, flex: 1 },
    { field: 'payPrice', headerName: 'Pay Price', width: 150, flex: 1 },
    { field: 'totalPrice', headerName: 'Total Price', width: 150, flex: 1 },
    { field: 'quantity', headerName: 'Quantity', width: 150, flex: 1 },
    {
      field: 'supplier',
      headerName: 'Supplier',
      width: 150,
      flex: 1,
      renderCell: (params) => (
        <Box>
          <Typography
            variant='body2'
            fontWeight={600}
            mb={0}
            sx={{ color: 'var(--palette-text-primary)' }}
          >
            {suppliersList?.find((supplier) => supplier.guid === params.row.supplierGuid)?.name} ||
            {'Unassigned'}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'purchaseOrder',
      headerName: 'Purchase Order',
      width: 150,
      flex: 1,
      renderCell: (params) => (
        <Box>
          <Typography
            variant='body2'
            fontWeight={600}
            mb={0}
            sx={{ color: 'var(--palette-text-primary)' }}
          >
            {purchaseOrdersList?.find(
              (purchaseOrder) => purchaseOrder.guid === params.row.purchaseOrderGuid,
            )?.description || 'Unassigned'}
          </Typography>
        </Box>
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
              setOpenCreateConsignment(true);
              setOpenEditConsignment(true);
              setCurrentConsignment(params.row);
            }}
          >
            <img width={18} height={18} src={pencilIcon} alt='' />
          </IconButton>
          <IconButton
            size='small'
            onClick={() => {
              setConfirmDelete(true);
              setCurrentConsignment(params.row);
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
        onClick={() => setOpenCreateConsignment(true)}
      >
        <AddOutlinedIcon fontSize={'small'} /> New consignment
      </Button>

      <Grid2 container alignItems={'center'}>
        <Grid2 size={12}>
          <Paper sx={{ p: 0 }}>
            <DataGrid
              rows={consignmentsList}
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

      <CreateConsignmentDialog
        open={openCreateConsignment}
        isEdit={openEditConsignment}
        consignment={currentConsignment}
        onClose={() => {
          setOpenEditConsignment(false);
          setOpenCreateConsignment(false);
        }}
      />

      <ConfirmationDialog
        open={openConfirmDelete}
        title='Delete consignment'
        description='Are you sure you want to delete this consignment?'
        type='warning'
        onClose={() => setConfirmDelete(false)}
        onConfirm={async () => {
          await deleteConsignment(currentConsignment.guid);
          await fetchAllConsignments();
          setConfirmDelete(false);
        }}
      />
    </>
  );
};

export default Consignment;
