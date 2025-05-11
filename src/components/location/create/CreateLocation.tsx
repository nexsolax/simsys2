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

interface Props {
  open: boolean;
  isEdit?: boolean;
  location?: any;
  onClose: (values: any) => void;
}

const CreateLocationDialog: React.FC<Props> = ({ open, isEdit, location, onClose }) => {
  const [locationData, setLocationData] = useState<any>(null);

  useEffect(() => {
    if (isEdit && location) {
      setLocationData(location);
    } else {
      setLocationData(null);
    }
  }, [isEdit, location]);

  const validationSchema = Yup.object({
    locationName: Yup.string().required('Name is required'),
    address: Yup.string().required('Address is required'),
    description: Yup.string().required('Description is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>{isEdit ? 'Edit Location' : 'New Location'}</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            locationName: locationData ? locationData.locationName : '',
            address: locationData ? locationData.address : '',
            description: locationData ? locationData.description : '',
            phoneNumber: locationData ? locationData.phoneNumber : '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            let locationData;
            if (!isEdit) {
              locationData = {
                ...values,
                id: 10,
              };
            } else {
              locationData = {
                ...values,
                id: location.id,
              };
            }
            console.log('Location Data:', locationData);
            onClose(locationData);
          }}
        >
          {({ errors, touched, handleChange, handleSubmit, values }) => (
            <Form onSubmit={handleSubmit}>
              <Grid container spacing={3} mt={2}>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    name='locationName'
                    label='Name'
                    value={values.locationName}
                    onChange={handleChange}
                    error={touched.locationName && Boolean(errors.locationName)}
                    helperText={touched.locationName && errors.locationName}
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
                  <TextField
                    fullWidth
                    name='phoneNumber'
                    label='Phone'
                    value={values.phoneNumber}
                    onChange={handleChange}
                    error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
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

export default CreateLocationDialog;
