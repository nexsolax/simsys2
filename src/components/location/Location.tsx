import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, Grid2, IconButton, Paper } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { pencilIcon, trashIcon } from '../../shared/icon/icon';
import ConfirmationDialog from '../confirmation/ConfirmationModal';
import CreateLocationDialog from './create/CreateLocation';

const Location: React.FC = () => {
  const [openCreateLocation, setOpenCreateLocation] = useState(false);
  const [openEditLocation, setOpenEditLocation] = useState(false);
  const [openConfirmDelete, setConfirmDelete] = useState(false);
  const [locationsData, setLocationsData] = useState<any[]>([
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
  ]);
  const [currentLocation, setCurrentLocation] = useState<any>(null);

  const columnsLocation: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 80 },
    {
      field: 'locationName',
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
      field: 'phoneNumber',
      headerName: 'Phone Number',
      width: 80,
      flex: 1,
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
              setOpenCreateLocation(true);
              setOpenEditLocation(true);
              setCurrentLocation(params.row);
            }}
          >
            <img width={18} height={18} src={pencilIcon} alt='' />
          </IconButton>
          <IconButton
            size='small'
            onClick={() => {
              setConfirmDelete(true);
              setCurrentLocation(params.row);
            }}
          >
            <img width={18} height={18} src={trashIcon} alt='' />
          </IconButton>
        </Box>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  const handleDeleteLocation = (id: number) => {
    const newCategoriesData = locationsData.filter((location) => location.id !== id);
    setLocationsData(newCategoriesData);
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
        onClick={() => setOpenCreateLocation(true)}
      >
        <AddOutlinedIcon fontSize={'small'} /> New location
      </Button>

      <Grid2 container alignItems={'center'}>
        <Grid2 size={12}>
          <Paper sx={{ p: 0 }}>
            <DataGrid
              getRowId={(row) => row.id}
              rows={locationsData}
              columns={columnsLocation}
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

      <CreateLocationDialog
        open={openCreateLocation}
        isEdit={openEditLocation}
        location={currentLocation}
        onClose={(location) => {
          if (location && location.id) {
            if (openEditLocation) {
              const index = locationsData.findIndex((u) => u.id === location.id);
              const newCategoriesData = [...locationsData];
              newCategoriesData[index] = location;
              setLocationsData(newCategoriesData);
            } else {
              setLocationsData([...locationsData, location]);
            }
          }
          setOpenEditLocation(false);
          setOpenCreateLocation(false);
        }}
      />

      <ConfirmationDialog
        open={openConfirmDelete}
        title='Delete location'
        description='Are you sure you want to delete this location?'
        type='warning'
        onClose={() => setConfirmDelete(false)}
        onConfirm={() => {
          handleDeleteLocation(currentLocation.id);
          setConfirmDelete(false);
        }}
      />
    </>
  );
};

export default Location;
