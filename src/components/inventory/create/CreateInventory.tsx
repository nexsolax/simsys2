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

interface Props {
  open: boolean;
  isEdit?: boolean;
  inventory?: any;
  onClose: (values: any) => void;
}

const CreateInventoryDialog: React.FC<Props> = ({ open, isEdit, inventory, onClose }) => {
  const [inventoryData, setInventoryData] = useState<any>(null);
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

  useEffect(() => {
    if (isEdit && inventory) {
      setInventoryData(inventory);
    } else {
      setInventoryData(null);
    }
  }, [isEdit, inventory]);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    address: Yup.string().required('Address is required'),
    description: Yup.string().required('Description is required'),
    locationId: Yup.number().required('Location is required'),
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>{isEdit ? 'Edit Inventory' : 'New Inventory'}</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            name: inventoryData ? inventoryData.name : '',
            address: inventoryData ? inventoryData.address : '',
            description: inventoryData ? inventoryData.description : '',
            locationId: inventoryData ? inventoryData.locationId : '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            let inventoryData;
            if (!isEdit) {
              inventoryData = {
                ...values,
                id: 10,
              };
            } else {
              inventoryData = {
                ...values,
                id: inventory.id,
              };
            }
            console.log('Inventory Data:', inventoryData);
            onClose(inventoryData);
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
                    name='address'
                    label='Address'
                    value={values.address}
                    onChange={handleChange}
                    error={touched.address && Boolean(errors.address)}
                    helperText={touched.address && errors.address}
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
                  <FormControl fullWidth>
                    <InputLabel>Location</InputLabel>
                    <Field
                      as={Select}
                      name='locationId'
                      label='Location'
                      value={values.locationId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {locationsData.map((location) => (
                        <MenuItem key={location.id} value={location.id}>
                          <ListItemText primary={location.locationName} />
                        </MenuItem>
                      ))}
                    </Field>
                    <Typography
                      variant='caption'
                      color='error'
                      sx={{ marginLeft: 2, marginTop: '4px' }}
                    >
                      <ErrorMessage name='locationId' />
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
