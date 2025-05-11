import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, Grid2, IconButton, Paper } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { pencilIcon, trashIcon } from '../../shared/icon/icon';
import ConfirmationDialog from '../confirmation/ConfirmationModal';
import CreateRoleDialog from './create/CreateRole';
import { useStore } from '../../store';

const Role: React.FC = () => {
  const rolesList = useStore((state) => state.roles.rolesList);
  const fetchAllRoles = useStore((state) => state.fetchAllRoles);
  const deleteRole = useStore((state) => state.deleteRole);

  const [openCreateRole, setOpenCreateRole] = useState(false);
  const [openEditRole, setOpenEditRole] = useState(false);
  const [openConfirmDelete, setConfirmDelete] = useState(false);
  const [rolesData, setRolesData] = useState<any[]>([
    {
      id: 1,
      name: 'Staff',
    },
    {
      id: 2,
      name: 'Manager',
    },
  ]);
  const [currentRole, setCurrentRole] = useState<any>(null);

  const columnsRole: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 80 },
    {
      field: 'roleName',
      headerName: 'Name',
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
      field: 'functions',
      headerName: '',
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton
            size='small'
            onClick={() => {
              setOpenCreateRole(true);
              setOpenEditRole(true);
              setCurrentRole(params.row);
            }}
          >
            <img width={18} height={18} src={pencilIcon} alt='' />
          </IconButton>
          <IconButton
            size='small'
            onClick={() => {
              setConfirmDelete(true);
              setCurrentRole(params.row);
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
    fetchAllRoles();
  }, []);

  useEffect(() => {
    if (rolesList) {
      const newRolesData = rolesList.map((role: any) => ({
        ...role,
        id: role.roleId,
      }));
      setRolesData(newRolesData);
    }
  }, [rolesList]);

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
        onClick={() => setOpenCreateRole(true)}
      >
        <AddOutlinedIcon fontSize={'small'} /> New role
      </Button>

      <Grid2 container alignItems={'center'}>
        <Grid2 size={12}>
          <Paper sx={{ p: 0 }}>
            <DataGrid
              rows={rolesData}
              columns={columnsRole}
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

      <CreateRoleDialog
        open={openCreateRole}
        isEdit={openEditRole}
        role={currentRole}
        onClose={() => {
          setOpenEditRole(false);
          setOpenCreateRole(false);
        }}
      />

      <ConfirmationDialog
        open={openConfirmDelete}
        title='Delete role'
        description='Are you sure you want to delete this role?'
        type='warning'
        onClose={() => setConfirmDelete(false)}
        onConfirm={() => {
          deleteRole(currentRole.id);
          setConfirmDelete(false);
        }}
      />
    </>
  );
};

export default Role;
