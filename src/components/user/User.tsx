import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Avatar, Box, Button, Chip, Grid2, IconButton, Paper, Typography } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { pencilIcon, trashIcon } from '../../shared/icon/icon';
import CreateUserDialog from './create/CreateUser';
import ConfirmationDialog from '../confirmation/ConfirmationModal';
import { useStore } from '../../store';
import { Users } from '../../shared/models/user';
import { Roles } from '../../shared/models/role';

const User: React.FC = () => {
  const usersList = useStore((state) => state.users.usersList);
  const rolesList = useStore((state) => state.roles.rolesList);
  const fetchAllRoles = useStore((state) => state.fetchAllRoles);
  const fetchAllUsers = useStore((state) => state.fetchAllUsers);
  const deleteUser = useStore((state) => state.deleteUser);

  const [openCreateUser, setOpenCreateUser] = useState(false);
  const [openEditUser, setOpenEditUser] = useState(false);
  const [openConfirmDelete, setConfirmDelete] = useState(false);
  const [usersData, setUsersData] = useState<Users[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const columnsUser: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 60,
    },
    {
      field: 'username',
      headerName: 'Name',
      width: 220,
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Avatar
            src={'https://assets.minimals.cc/public/assets/images/mock/avatar/avatar-15.webp'}
            alt='Avatar'
            sx={{ width: 40, height: 40 }}
          />

          <Box>
            <Typography
              variant='body2'
              fontWeight={600}
              mb={0}
              sx={{ color: 'var(--palette-text-primary)' }}
            >
              {params.row.username}
            </Typography>
            <Typography fontSize={'13px'} mt={0.5} sx={{ color: 'var(--palette-text-secondary)' }}>
              {params.row.email}
            </Typography>
          </Box>
        </Box>
      ),
    },
    { field: 'contactInfo', headerName: 'Contact Info', width: 300 },
    {
      field: 'roleGuid',
      headerName: 'Role',
      width: 100,
      renderCell: (params) =>
        rolesList?.find((role: Roles) => role.guid === params.row.roleGuid)?.roleName || '',
    },
    // {
    //   field: 'active',
    //   headerName: 'Status',
    //   width: 120,
    //   renderCell: (params) => {
    //     return (
    //       <Chip
    //         color={params.value ? 'success' : 'error'}
    //         label={params.value ? 'Active' : 'Inactive'}
    //       />
    //     );
    //   },
    // },
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
              setOpenCreateUser(true);
              setOpenEditUser(true);
              setCurrentUser(params.row);
            }}
          >
            <img width={18} height={18} src={pencilIcon} alt='' />
          </IconButton>
          <IconButton
            size='small'
            onClick={() => {
              setConfirmDelete(true);
              setCurrentUser(params.row);
            }}
          >
            <img width={18} height={18} src={trashIcon} alt='' />
          </IconButton>
        </Box>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  useEffect(() => {
    fetchAllUsers();
    fetchAllRoles();
  }, []);

  useEffect(() => {
    if (usersList) {
      setUsersData(usersList);
    }
  }, [usersList]);

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
        onClick={() => setOpenCreateUser(true)}
      >
        <AddOutlinedIcon fontSize={'small'} /> New user
      </Button>

      <Grid2 container alignItems={'center'}>
        <Grid2 size={12}>
          <Paper sx={{ p: 0 }}>
            <DataGrid
              rows={usersData}
              columns={columnsUser}
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

      <CreateUserDialog
        open={openCreateUser}
        isEdit={openEditUser}
        user={currentUser}
        onClose={() => {
          setOpenEditUser(false);
          setOpenCreateUser(false);
        }}
      />

      <ConfirmationDialog
        open={openConfirmDelete}
        title='Delete user'
        description='Are you sure you want to delete this user?'
        type='warning'
        onClose={() => setConfirmDelete(false)}
        onConfirm={async () => {
          await deleteUser(currentUser.id);
          setConfirmDelete(false);
        }}
      />
    </>
  );
};

export default User;
