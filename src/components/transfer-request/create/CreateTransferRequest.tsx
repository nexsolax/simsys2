import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Grid2 as Grid,
  FormControl,
  Typography,
  MenuItem,
  ListItemText,
  Select,
  InputLabel,
} from '@mui/material';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';

import { useStore } from '../../../store';
import {
  CreateTransferRequest,
  TransferRequests,
  UpdateTransferRequest,
} from '../../../shared/models/transfer-request';

interface Props {
  open: boolean;
  isEdit?: boolean;
  transferRequest?: TransferRequests | null;
  onClose: () => void;
}

const CreateTransferRequestDialog: React.FC<Props> = ({
  open,
  isEdit,
  transferRequest,
  onClose,
}) => {
  const [transferRequestData, setTransferRequestData] = useState<TransferRequests | null>(null);

  const inventoriesList = useStore((state) => state.inventories.inventoriesList);
  const usersList = useStore((state) => state.users.usersList);
  const productsList = useStore((state) => state.products.productsList);
  const createTransferRequest = useStore((state) => state.createTransferRequest);
  const updateTransferRequest = useStore((state) => state.updateTransferRequest);
  const fetchAllTransferRequests = useStore((state) => state.fetchAllTransferRequests);

  useEffect(() => {
    if (isEdit && transferRequest) {
      setTransferRequestData(transferRequest);
    } else {
      setTransferRequestData(null);
    }
  }, [isEdit, transferRequest]);

  const validationSchema = Yup.object({
    fromInventoryGuid: Yup.string().required('From inventory is required'),
    toInventoryGuid: Yup.string().required('To inventory is required'),
    userGuid: Yup.string().required('User is required'),
    productGuid: Yup.string().required('Product is required'),
    quantity: Yup.number().required('Quantity is required'),
    note: Yup.string().required('Note is required'),
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>{isEdit ? 'Edit Transfer Request' : 'New Transfer Request'}</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            fromInventoryGuid: transferRequestData ? transferRequestData.fromInventoryGuid : '',
            toInventoryGuid: transferRequestData ? transferRequestData.toInventoryGuid : '',
            userGuid: transferRequestData ? transferRequestData.userGuid : '',
            productGuid: transferRequestData ? transferRequestData.productGuid : '',
            quantity: transferRequestData ? transferRequestData.quantity : '',
            note: transferRequestData ? transferRequestData.note : '',
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            if (!isEdit) {
              const newTransferRequest: CreateTransferRequest = {
                ...values,
                quantity: Number(values.quantity),
              };
              await createTransferRequest(newTransferRequest);
            } else {
              const updatedTransferRequest: UpdateTransferRequest = {
                ...values,
                quantity: Number(values.quantity),
              };
              await updateTransferRequest(updatedTransferRequest, transferRequestData!.guid);
            }
            fetchAllTransferRequests();
            onClose();
          }}
        >
          {({ errors, touched, handleChange, handleSubmit, values }) => (
            <Form onSubmit={handleSubmit}>
              <Grid container spacing={3} mt={2}>
                <Grid size={6}>
                  <FormControl fullWidth>
                    <InputLabel>From Inventory</InputLabel>
                    <Field
                      as={Select}
                      name='fromInventoryGuid'
                      label='From Inventory'
                      value={values.fromInventoryGuid}
                      onChange={handleChange}
                    >
                      {inventoriesList?.map((inventory) => (
                        <MenuItem key={inventory.id} value={inventory.guid}>
                          <ListItemText primary={inventory.name} />
                        </MenuItem>
                      ))}
                    </Field>
                    <Typography
                      variant='caption'
                      color='error'
                      sx={{ marginLeft: 2, marginTop: '4px' }}
                    >
                      <ErrorMessage name='fromInventoryGuid' />
                    </Typography>
                  </FormControl>
                </Grid>
                <Grid size={6}>
                  <FormControl fullWidth>
                    <InputLabel>To Inventory</InputLabel>
                    <Field
                      as={Select}
                      name='toInventoryGuid'
                      label='To Inventory'
                      value={values.toInventoryGuid}
                      onChange={handleChange}
                    >
                      {inventoriesList?.map((inventory) => (
                        <MenuItem key={inventory.id} value={inventory.guid}>
                          <ListItemText primary={inventory.name} />
                        </MenuItem>
                      ))}
                    </Field>
                    <Typography
                      variant='caption'
                      color='error'
                      sx={{ marginLeft: 2, marginTop: '4px' }}
                    >
                      <ErrorMessage name='toInventoryGuid' />
                    </Typography>
                  </FormControl>
                </Grid>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    name='quantity'
                    label='Quantity'
                    value={values.quantity}
                    onChange={handleChange}
                    error={touched.quantity && Boolean(errors.quantity)}
                    helperText={touched.quantity && errors.quantity}
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    name='note'
                    label='Note'
                    value={values.note}
                    onChange={handleChange}
                    error={touched.note && Boolean(errors.note)}
                    helperText={touched.note && errors.note}
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
                <Grid size={12}>
                  <FormControl fullWidth>
                    <InputLabel>Product</InputLabel>
                    <Field
                      as={Select}
                      name='productGuid'
                      label='Product'
                      value={values.productGuid}
                      onChange={handleChange}
                    >
                      {productsList?.map((product) => (
                        <MenuItem key={product.id} value={product.guid}>
                          <ListItemText primary={product.name} />
                        </MenuItem>
                      ))}
                    </Field>
                    <Typography
                      variant='caption'
                      color='error'
                      sx={{ marginLeft: 2, marginTop: '4px' }}
                    >
                      <ErrorMessage name='productGuid' />
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

export default CreateTransferRequestDialog;
