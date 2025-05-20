import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, Grid2, IconButton, Paper } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { pencilIcon, trashIcon } from '../../shared/icon/icon';
import ConfirmationDialog from '../confirmation/ConfirmationModal';
import { TransferRequests } from '../../shared/models/transfer-request';
import { useStore } from '../../store';
import CreateTransferRequestDialog from './create/CreateTransferRequest';

const TransferRequest: React.FC = () => {
  const [openCreateTransferRequest, setOpenCreateTransferRequest] = useState(false);
  const [openEditTransferRequest, setOpenEditTransferRequest] = useState(false);
  const [openConfirmDelete, setConfirmDelete] = useState(false);
  const [transferRequestsData, setTransferRequestsData] = useState<TransferRequests[]>([]);
  const [currentTransferRequest, setCurrentTransferRequest] = useState<TransferRequests | null>(
    null,
  );

  const fetchAllTransferRequests = useStore((state) => state.fetchAllTransferRequests);
  const fetchAllUsers = useStore((state) => state.fetchAllUsers);
  const fetchAllProducts = useStore((state) => state.fetchAllProducts);
  const deleteTransferRequest = useStore((state) => state.deleteTransferRequest);
  const transferRequestsList = useStore((state) => state.transferRequests.transferRequestsList);
  const usersList = useStore((state) => state.users.usersList);
  const productsList = useStore((state) => state.products.productsList);

  useEffect(() => {
    fetchAllTransferRequests();
    fetchAllUsers();
    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (transferRequestsList) {
      setTransferRequestsData(transferRequestsList);
    }
  }, [transferRequestsList]);

  const columnsTransferRequest: GridColDef[] = [
    { field: 'guid', headerName: 'ID', width: 80 },
    {
      field: 'fromInventoryGuid',
      headerName: 'From Inventory',
      width: 230,
      flex: 1,
    },
    {
      field: 'toInventoryGuid',
      headerName: 'To Inventory',
      width: 80,
      flex: 1,
    },
    {
      field: 'productGuid',
      headerName: 'Product',
      width: 80,
      flex: 1,
      renderCell: (params) => {
        const product = productsList?.find((product) => product.guid === params.row.productGuid);
        return product?.name;
      },
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
      width: 80,
      flex: 1,
      renderCell: (params) => {
        const user = usersList?.find((user) => user.guid === params.row.userGuid);
        return user?.username;
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
              setOpenCreateTransferRequest(true);
              setOpenEditTransferRequest(true);
              setCurrentTransferRequest(params.row);
            }}
          >
            <img width={18} height={18} src={pencilIcon} alt='' />
          </IconButton>
          <IconButton
            size='small'
            onClick={() => {
              setConfirmDelete(true);
              setCurrentTransferRequest(params.row);
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
        onClick={() => setOpenCreateTransferRequest(true)}
      >
        <AddOutlinedIcon fontSize={'small'} /> New transfer request
      </Button>

      <Grid2 container alignItems={'center'}>
        <Grid2 size={12}>
          <Paper sx={{ p: 0 }}>
            <DataGrid
              getRowId={(row) => row.guid}
              rows={transferRequestsData}
              columns={columnsTransferRequest}
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

      <CreateTransferRequestDialog
        open={openCreateTransferRequest}
        isEdit={openEditTransferRequest}
        transferRequest={currentTransferRequest}
        onClose={() => {
          setOpenEditTransferRequest(false);
          setOpenCreateTransferRequest(false);
        }}
      />

      <ConfirmationDialog
        open={openConfirmDelete}
        title='Delete transfer request'
        description='Are you sure you want to delete this transfer request?'
        type='warning'
        onClose={() => setConfirmDelete(false)}
        onConfirm={async () => {
          await deleteTransferRequest(currentTransferRequest!.guid);
          setConfirmDelete(false);
        }}
      />
    </>
  );
};

export default TransferRequest;
