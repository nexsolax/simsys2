import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Avatar, Box, Button, Chip, Grid2, IconButton, Paper, Typography } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { useStore } from '../../store';
import { pencilIcon, trashIcon } from '../../shared/icon/icon';
import CreateSupplierDialog from './create/CreateSupplier';
import ConfirmationDialog from '../confirmation/ConfirmationModal';
import { Suppliers } from '../../shared/models/supplier';

const Supplier: React.FC = () => {
  const fetchAllSuppliers = useStore((state) => state.fetchAllSuppliers);
  const deleteSupplier = useStore((state) => state.deleteSupplier);
  const suppliersList = useStore((state) => state.suppliers.suppliersList);

  const [openCreateSupplier, setOpenCreateSupplier] = useState(false);
  const [openEditSupplier, setOpenEditSupplier] = useState(false);
  const [openConfirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    fetchAllSuppliers();
  }, []);

  const [currentSupplier, setCurrentSupplier] = useState<Suppliers>();

  const columnsSupplier: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 60,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Avatar alt='Avatar' sx={{ width: 40, height: 40 }}>
            {params.row.name.charAt(0).toUpperCase()}
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
    { field: 'phone', headerName: 'Phone number', width: 180 },
    { field: 'address', headerName: 'Address', width: 220 },
    // {
    //   field: 'rating',
    //   headerName: 'Rating',
    //   width: 120,
    //   renderCell: (params) => {
    //     return (
    //       <Chip
    //         color={params.value >= 4 ? 'success' : params.value >= 2.5 ? 'warning' : 'error'}
    //         label={params.value ? params.value?.toFixed(1) : 'N/A'}
    //       />
    //     );
    //   },
    // },
    {
      field: 'isActive',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => {
        return (
          <Chip
            color={params.value === 'Active' ? 'success' : 'error'}
            label={params.value === 'Active' ? 'Active' : 'Inactive'}
          />
        );
      },
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
              setOpenCreateSupplier(true);
              setOpenEditSupplier(true);
              setCurrentSupplier(params.row);
            }}
          >
            <img width={18} height={18} src={pencilIcon} alt='' />
          </IconButton>
          <IconButton
            size='small'
            onClick={() => {
              setConfirmDelete(true);
              setCurrentSupplier(params.row);
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
        onClick={() => setOpenCreateSupplier(true)}
      >
        <AddOutlinedIcon fontSize={'small'} /> New supplier
      </Button>

      <Grid2 container alignItems={'center'}>
        <Grid2 size={12}>
          <Paper sx={{ p: 0 }}>
            <DataGrid
              rows={suppliersList}
              columns={columnsSupplier}
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

      <CreateSupplierDialog
        open={openCreateSupplier}
        isEdit={openEditSupplier}
        supplier={currentSupplier}
        onClose={() => {
          setOpenEditSupplier(false);
          setOpenCreateSupplier(false);
        }}
      />

      <ConfirmationDialog
        open={openConfirmDelete}
        title='Delete supplier'
        description='Are you sure you want to delete this supplier?'
        type='warning'
        onClose={() => setConfirmDelete(false)}
        onConfirm={async () => {
          await deleteSupplier(currentSupplier!.guid);
          await fetchAllSuppliers();
          setConfirmDelete(false);
        }}
      />
    </>
  );
};

export default Supplier;
