import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, Grid2, IconButton, Paper } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { pencilIcon, trashIcon } from '../../shared/icon/icon';
import ConfirmationDialog from '../confirmation/ConfirmationModal';
import CreateInventoryDialog from './create/CreateInventory';

const Inventory: React.FC = () => {
  const [openCreateInventory, setOpenCreateInventory] = useState(false);
  const [openEditInventory, setOpenEditInventory] = useState(false);
  const [openConfirmDelete, setConfirmDelete] = useState(false);
  const [inventoriesData, setInventoriesData] = useState<any[]>([
    {
      id: 1,
      name: 'Kho áo thun tai ngắn',
      address: 'Kho 1',
      description: 'Kho 1',
      quantity: 100,
      locationId: 1,
    },
    {
      id: 2,
      name: 'Kho áo thun tay dài',
      address: 'Kho 2',
      description: 'Kho 2',
      quantity: 100,
      locationId: 2,
    },
    {
      id: 3,
      name: 'Kho áo thun thể thao',
      address: 'Kho 3',
      description: 'Kho 3',
      quantity: 100,
      locationId: 3,
    },
    {
      id: 4,
      name: 'Kho áo thun ba lỗ',
      address: 'Kho 4',
      description: 'Kho 4',
      quantity: 100,
      locationId: 4,
    },
    {
      id: 5,
      name: 'Kho áo thun sweater',
      address: 'Kho 5',
      description: 'Kho 5',
      quantity: 100,
      locationId: 5,
    },
  ]);
  const locationsData = [
    {
      id: 1,
      locationName: 'Kệ áo thun tai ngắn',
      address: 'Kệ 1',
      description: 'Kệ 1',
      phoneNumber: '0909123123',
    },
    {
      id: 2,
      locationName: 'Kệ áo thun tay dài',
      address: 'Kệ 2',
      description: 'Kệ 2',
      phoneNumber: '0909090909',
    },
    {
      id: 3,
      locationName: 'Kệ áo thun thể thao',
      address: 'Kệ 3',
      description: 'Kệ 3',
      phoneNumber: '0908322323',
    },
    {
      id: 4,
      locationName: 'Kệ áo thun ba lỗ',
      address: 'Kệ 4',
      description: 'Kệ 4',
      phoneNumber: '0909090909',
    },
    {
      id: 5,
      locationName: 'Kệ áo thun sweater',
      address: 'Kệ 5',
      description: 'Kệ 5',
      phoneNumber: '0933333333',
    },
  ];
  const [currentInventory, setCurrentInventory] = useState<any>(null);

  const columnsInventory: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 80 },
    {
      field: 'name',
      headerName: 'Name',
      width: 230,
      flex: 1,
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 80,
      flex: 1,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 80,
      flex: 1,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 80,
      flex: 1,
    },
    {
      field: 'locationId',
      headerName: 'Location',
      width: 80,
      flex: 1,
      renderCell: (params) => {
        const location = locationsData.find((location) => location.id === params.row.locationId);
        return location ? location.locationName : '';
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
              setOpenCreateInventory(true);
              setOpenEditInventory(true);
              setCurrentInventory(params.row);
            }}
          >
            <img width={18} height={18} src={pencilIcon} alt='' />
          </IconButton>
          <IconButton
            size='small'
            onClick={() => {
              setConfirmDelete(true);
              setCurrentInventory(params.row);
            }}
          >
            <img width={18} height={18} src={trashIcon} alt='' />
          </IconButton>
        </Box>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  const handleDeleteInventory = (id: number) => {
    const newCategoriesData = inventoriesData.filter((inventory) => inventory.id !== id);
    setInventoriesData(newCategoriesData);
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
        onClick={() => setOpenCreateInventory(true)}
      >
        <AddOutlinedIcon fontSize={'small'} /> New inventory
      </Button>

      <Grid2 container alignItems={'center'}>
        <Grid2 size={12}>
          <Paper sx={{ p: 0 }}>
            <DataGrid
              getRowId={(row) => row.id}
              rows={inventoriesData}
              columns={columnsInventory}
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

      <CreateInventoryDialog
        open={openCreateInventory}
        isEdit={openEditInventory}
        inventory={currentInventory}
        onClose={(inventory) => {
          if (inventory && inventory.id) {
            if (openEditInventory) {
              const index = inventoriesData.findIndex((u) => u.id === inventory.id);
              const newCategoriesData = [...inventoriesData];
              newCategoriesData[index] = inventory;
              setInventoriesData(newCategoriesData);
            } else {
              setInventoriesData([...inventoriesData, inventory]);
            }
          }
          setOpenEditInventory(false);
          setOpenCreateInventory(false);
        }}
      />

      <ConfirmationDialog
        open={openConfirmDelete}
        title='Delete inventory'
        description='Are you sure you want to delete this inventory?'
        type='warning'
        onClose={() => setConfirmDelete(false)}
        onConfirm={() => {
          handleDeleteInventory(currentInventory.id);
          setConfirmDelete(false);
        }}
      />
    </>
  );
};

export default Inventory;
