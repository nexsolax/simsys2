import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Grid2 as Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ListItemText,
  Typography,
} from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import {
  CreateInventoryRequest,
  Inventories,
  UpdateInventoryRequest,
} from '../../../shared/models/inventory';
import { useStore } from '../../../store';

interface Props {
  open: boolean;
  isEdit?: boolean;
  inventory?: any;
  onClose: () => void;
}

const CreateInventoryDialog: React.FC<Props> = ({ open, isEdit, inventory, onClose }) => {
  const [inventoryData, setInventoryData] = useState<Inventories | null>(null);

  const fetchAllInventories = useStore((state) => state.fetchAllInventories);
  const createInventory = useStore((state) => state.createInventory);
  const updateInventory = useStore((state) => state.updateInventory);
  const usersList = useStore((state) => state.users.usersList);

  useEffect(() => {
    if (isEdit && inventory) {
      setInventoryData(inventory);
    } else {
      setInventoryData(null);
    }
  }, [isEdit, inventory]);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    quantity: Yup.number().required('Quantity is required'),
    userGuid: Yup.string().required('User is required'),
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>{isEdit ? 'Edit Inventory' : 'New Inventory'}</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            name: inventoryData ? inventoryData.name : '',
            description: inventoryData ? inventoryData.description : '',
            quantity: inventoryData ? inventoryData.quantity : '',
            userGuid: inventoryData ? inventoryData.userGuid : '',
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            if (!isEdit) {
              const newInventory: CreateInventoryRequest = {
                ...values,
                quantity: Number(values.quantity),
              };
              await createInventory(newInventory);
            } else {
              const updatedInventory: UpdateInventoryRequest = {
                ...values,
                quantity: Number(values.quantity),
              };
              await updateInventory(updatedInventory, inventoryData!.guid);
            }
            fetchAllInventories();
            onClose();
          }}
        >
          {({ errors, touched, handleChange, handleBlur, handleSubmit, values }) => (
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
                <Grid size={12}>
                  <TextField
                    fullWidth
                    type='number'
                    name='quantity'
                    label='Quantity'
                    value={values.quantity}
                    onChange={handleChange}
                    error={touched.quantity && Boolean(errors.quantity)}
                    helperText={touched.quantity && errors.quantity}
                  />
                </Grid>
                <Grid size={12}>
                  <FormControl fullWidth>
                    <InputLabel>User</InputLabel>
                    <Field
                      as={Select}
                      name='userGuid'
                      label='User'
                      value={values.userGuid}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {usersList?.map((user) => (
                        <MenuItem key={user.id} value={user.guid}>
                          <ListItemText primary={user.username} />
                        </MenuItem>
                      ))}
                    </Field>
                    <Typography
                      variant='caption'
                      color='error'
                      sx={{ marginLeft: 2, marginTop: '4px' }}
                    >
                      <ErrorMessage name='userGuid' />
                    </Typography>
                  </FormControl>
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

export default CreateInventoryDialog;
