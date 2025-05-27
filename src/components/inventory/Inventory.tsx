import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, Grid2, IconButton, Paper } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { pencilIcon, trashIcon } from '../../shared/icon/icon';
import ConfirmationDialog from '../confirmation/ConfirmationModal';
import CreateInventoryDialog from './create/CreateInventory';
import { Inventories } from '../../shared/models/inventory';
import { useStore } from '../../store';

const Inventory: React.FC = () => {
  const [openCreateInventory, setOpenCreateInventory] = useState(false);
  const [openEditInventory, setOpenEditInventory] = useState(false);
  const [openConfirmDelete, setConfirmDelete] = useState(false);
  const [inventoriesData, setInventoriesData] = useState<Inventories[]>([]);
  const [currentInventory, setCurrentInventory] = useState<any>(null);

  const fetchAllInventories = useStore((state) => state.fetchAllInventories);
  const fetchAllUsers = useStore((state) => state.fetchAllUsers);
  const deleteInventory = useStore((state) => state.deleteInventory);
  const inventoriesList = useStore((state) => state.inventories.inventoriesList);
  const usersList = useStore((state) => state.users.usersList);

  useEffect(() => {
    fetchAllInventories();
    fetchAllUsers();
  }, []);

  useEffect(() => {
    if (inventoriesList) {
      setInventoriesData(inventoriesList);
    }
  }, [inventoriesList]);

  const columnsInventory: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 80 },
    {
      field: 'name',
      headerName: 'Name',
      width: 230,
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
      field: 'userGuid',
      headerName: 'User',
      width: 120,
      flex: 1,
      renderCell: (params) => {
        const user = usersList?.find((user) => user.guid === params.row.userGuid);
        return user ? user?.username : '';
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
        onClose={() => {
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
        onConfirm={async () => {
          await deleteInventory(currentInventory.guid);
          setConfirmDelete(false);
        }}
      />
    </>
  );
};

export default Inventory;
