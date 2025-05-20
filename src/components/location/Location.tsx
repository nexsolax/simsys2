import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, Grid2, IconButton, Paper } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { pencilIcon, trashIcon } from '../../shared/icon/icon';
import ConfirmationDialog from '../confirmation/ConfirmationModal';
import CreateLocationDialog from './create/CreateLocation';
import { Locations } from '../../shared/models/location';
import { useStore } from '../../store';

const Location: React.FC = () => {
  const [openCreateLocation, setOpenCreateLocation] = useState(false);
  const [openEditLocation, setOpenEditLocation] = useState(false);
  const [openConfirmDelete, setConfirmDelete] = useState(false);
  const [locationsData, setLocationsData] = useState<Locations[]>([]);
  const [currentLocation, setCurrentLocation] = useState<Locations | null>(null);

  const fetchAllLocations = useStore((state) => state.fetchAllLocations);
  const fetchAllInventories = useStore((state) => state.fetchAllInventories);
  const deleteLocation = useStore((state) => state.deleteLocation);
  const inventoriesList = useStore((state) => state.inventories.inventoriesList);
  const locationsList = useStore((state) => state.locations.locationsList);
  useEffect(() => {
    fetchAllLocations();
    fetchAllInventories();
  }, []);

  useEffect(() => {
    if (locationsList) {
      setLocationsData(locationsList);
    }
  }, [locationsList]);

  const columnsLocation: GridColDef[] = [
    { field: 'guid', headerName: 'ID', width: 80 },
    {
      field: 'locationName',
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
      field: 'inventoryGuid',
      headerName: 'Inventory',
      width: 80,
      flex: 1,
      renderCell: (params) => {
        const inventory = inventoriesList?.find(
          (inventory) => inventory.guid === params.row.inventoryGuid,
        );
        return inventory?.name;
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
              getRowId={(row) => row.guid}
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
        onClose={() => {
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
        onConfirm={async () => {
          await deleteLocation(currentLocation!.guid);
          setConfirmDelete(false);
        }}
      />
    </>
  );
};

export default Location;
