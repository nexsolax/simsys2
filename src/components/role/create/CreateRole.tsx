import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Grid2 as Grid,
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useStore } from '../../../store';
import { RoleCreateRequest, Roles, RoleUpdateRequest } from '../../../shared/models/role';

interface Props {
  open: boolean;
  isEdit?: boolean;
  role?: Roles | null;
  onClose: () => void;
}

const CreateRoleDialog: React.FC<Props> = ({ open, isEdit, role, onClose }) => {
  const [roleData, setRoleData] = useState<Roles | null>(null);

  const fetchAllRoles = useStore((state) => state.fetchAllRoles);
  const createRole = useStore((state) => state.createRole);
  const updateRole = useStore((state) => state.updateRole);

  useEffect(() => {
    if (isEdit && role) {
      setRoleData(role);
    } else {
      setRoleData(null);
    }
  }, [isEdit, role]);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>{isEdit ? 'Edit Role' : 'New Role'}</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            name: roleData ? roleData.roleName : '',
            description: roleData ? roleData.description : '',
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            if (!isEdit) {
              const roleCreate: RoleCreateRequest = {
                roleName: values.name,
                description: values.description,
              };
              await createRole(roleCreate);
            } else {
              const roleUpdate: RoleUpdateRequest = {
                roleName: values.name,
                description: values.description,
              };
              await updateRole(roleData!.id, roleUpdate);
            }
            await fetchAllRoles();
            onClose();
          }}
        >
          {({ errors, touched, handleChange, handleSubmit, values }) => (
            <Form onSubmit={handleSubmit}>
              <Grid container spacing={3} mt={2}>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    name='name'
                    label='Name'
                    value={values.name}
                    onChange={handleChange}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    name='description'
                    label='Description'
                    value={values.description}
                    onChange={handleChange}
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent='flex-end' mt={2}>
                <Button
                  sx={{
                    color: 'var(--palette-grey-800)',
                    bg: 'var(--palette-common-white)',
                    borderColor: 'transparent',
                    mr: 2,
                  }}
                  onClick={onClose}
                  variant='outlined'
                >
                  Cancel
                </Button>
                <Button
                  sx={{ bgcolor: 'var(--palette-grey-800)', color: 'var(--palette-common-white)' }}
                  type='submit'
                  variant='contained'
                >
                  {isEdit ? 'Save' : 'Create'}
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRoleDialog;
